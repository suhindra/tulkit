import React, { useState, useEffect } from 'react'
import type { LanguageCode } from '../types'
import { getTranslations } from '../i18n'
import { buildPathWithLanguage, stripLanguagePrefix } from '../routing'

type InputEncoding = 'text-utf8' | 'base64' | 'base32' | 'base58' | 'hex'
type OutputEncoding = 'text-utf8' | 'base64' | 'base64url' | 'base32' | 'base58' | 'hex'

type Props = {
  language: LanguageCode
  initialInputEncoding?: InputEncoding
  initialOutputEncoding?: OutputEncoding
  variant?: 'encode' | 'decode'
}

type EncodeMode =
  | 'encode-base64'
  | 'encode-base32'
  | 'encode-base58'
  | 'encode-hex'
  | 'decode-base64'
  | 'decode-base32'
  | 'decode-base58'
  | 'decode-hex'

function textToBytes(value: string): Uint8Array{
  return new TextEncoder().encode(value)
}

function bytesToText(bytes: Uint8Array): string{
  try{
    return new TextDecoder('utf-8', { fatal: false }).decode(bytes)
  }catch{
    return ''
  }
}

function bytesToBase64(bytes: Uint8Array, urlSafe = false): string{
  let binary = ''
  for(let i=0;i<bytes.length;i+=1){
    binary += String.fromCharCode(bytes[i])
  }
  const base = btoa(binary)
  if(!urlSafe){
    return base
  }
  return base.replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')
}

function base64ToBytes(value: string): Uint8Array{
  let clean = value.trim()
  clean = clean.replace(/-/g,'+').replace(/_/g,'/')
  const pad = clean.length % 4
  if(pad === 2){
    clean += '=='
  }else if(pad === 3){
    clean += '='
  }else if(pad === 1){
    throw new Error('Invalid Base64 length')
  }

  const binary = atob(clean)
  const bytes = new Uint8Array(binary.length)
  for(let i=0;i<binary.length;i+=1){
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

function bytesToHex(bytes: Uint8Array): string{
  const parts: string[] = []
  for(let i=0;i<bytes.length;i+=1){
    parts.push(bytes[i].toString(16).padStart(2,'0'))
  }
  return parts.join('')
}

function hexToBytes(value: string): Uint8Array{
  const clean = value.replace(/[\s-]/g,'').toLowerCase()
  const length = Math.floor(clean.length/2)
  const bytes = new Uint8Array(length)
  for(let i=0;i<length;i+=1){
    const byte = clean.slice(i*2, i*2+2)
    bytes[i] = Number.parseInt(byte, 16)
  }
  return bytes
}

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
const BASE32_LOOKUP: Record<string,number> = {}
for(let i=0;i<BASE32_ALPHABET.length;i+=1){
  BASE32_LOOKUP[BASE32_ALPHABET[i]] = i
}

function bytesToBase32(bytes: Uint8Array): string{
  let bits = 0
  let value = 0
  let output = ''

  for(let i=0;i<bytes.length;i+=1){
    value = (value<<8) | bytes[i]
    bits += 8
    while(bits >= 5){
      output += BASE32_ALPHABET[(value >>> (bits-5)) & 31]
      bits -= 5
    }
  }

  if(bits > 0){
    output += BASE32_ALPHABET[(value << (5-bits)) & 31]
  }

  return output
}

function base32ToBytes(value: string): Uint8Array{
  const clean = value.replace(/[\s=]/g,'').toUpperCase()
  let bits = 0
  let acc = 0
  const out: number[] = []

  for(let i=0;i<clean.length;i+=1){
    const ch = clean[i]
    const v = BASE32_LOOKUP[ch]
    if(v === undefined){
      throw new Error(`Invalid Base32 character: ${ch}`)
    }
    acc = (acc<<5) | v
    bits += 5
    if(bits >= 8){
      out.push((acc >>> (bits-8)) & 0xff)
      bits -= 8
    }
  }

  return new Uint8Array(out)
}

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
const BASE58_LOOKUP: Record<string,number> = {}
for(let i=0;i<BASE58_ALPHABET.length;i+=1){
  BASE58_LOOKUP[BASE58_ALPHABET[i]] = i
}

function bytesToBase58(bytes: Uint8Array): string{
  let zeros = 0
  while(zeros < bytes.length && bytes[zeros] === 0){
    zeros += 1
  }

  const digits: number[] = []

  for(let i=zeros;i<bytes.length;i+=1){
    let carry = bytes[i]
    for(let j=digits.length-1;j>=0;j-=1){
      carry += digits[j]*256
      digits[j] = carry % 58
      carry = (carry/58)|0
    }
    while(carry > 0){
      digits.unshift(carry % 58)
      carry = (carry/58)|0
    }
  }

  let output = BASE58_ALPHABET[0].repeat(zeros)
  for(const d of digits){
    output += BASE58_ALPHABET[d]
  }
  return output || BASE58_ALPHABET[0]
}

function base58ToBytes(value: string): Uint8Array{
  const clean = value.trim()
  if(clean === ''){
    return new Uint8Array(0)
  }

  let zeros = 0
  while(zeros < clean.length && clean[zeros] === BASE58_ALPHABET[0]){
    zeros += 1
  }

  const bytes: number[] = []

  for(let i=zeros;i<clean.length;i+=1){
    const ch = clean[i]
    const v = BASE58_LOOKUP[ch]
    if(v === undefined){
      throw new Error(`Invalid Base58 character: ${ch}`)
    }

    let carry = v
    for(let j=bytes.length-1;j>=0;j-=1){
      carry += bytes[j]*58
      bytes[j] = carry & 0xff
      carry >>= 8
    }
    while(carry > 0){
      bytes.unshift(carry & 0xff)
      carry >>= 8
    }
  }

  const out = new Uint8Array(zeros + bytes.length)
  out.fill(0, 0, zeros)
  out.set(bytes, zeros)
  return out
}

function detectEncodeModeFromPath(pathname: string): EncodeMode | null{
  const path = stripLanguagePrefix(pathname).toLowerCase()

  const encodeMatch = path.match(/^\/encode(?:\/([^/]+))?/)
  if(encodeMatch){
    const slug = encodeMatch[1]
    if(!slug) return 'encode-base64'
    if(slug === 'base64') return 'encode-base64'
    if(slug === 'base32') return 'encode-base32'
    if(slug === 'base58') return 'encode-base58'
    if(slug === 'hex') return 'encode-hex'
    return 'encode-base64'
  }

  const decodeMatch = path.match(/^\/decode(?:\/([^/]+))?/)
  if(decodeMatch){
    const slug = decodeMatch[1]
    if(!slug) return 'decode-base64'
    if(slug === 'base64') return 'decode-base64'
    if(slug === 'base32') return 'decode-base32'
    if(slug === 'base58') return 'decode-base58'
    if(slug === 'hex') return 'decode-hex'
    return 'decode-base64'
  }

  return null
}

function encodeModeToEncodings(mode: EncodeMode): { input: InputEncoding; output: OutputEncoding }{
  switch(mode){
    case 'encode-base64':
      return { input: 'text-utf8', output: 'base64' }
    case 'encode-base32':
      return { input: 'text-utf8', output: 'base32' }
    case 'encode-base58':
      return { input: 'text-utf8', output: 'base58' }
    case 'encode-hex':
      return { input: 'text-utf8', output: 'hex' }
    case 'decode-base64':
      return { input: 'base64', output: 'text-utf8' }
    case 'decode-base32':
      return { input: 'base32', output: 'text-utf8' }
    case 'decode-base58':
      return { input: 'base58', output: 'text-utf8' }
    case 'decode-hex':
      return { input: 'hex', output: 'text-utf8' }
  }
}

function buildUrlForMode(mode: EncodeMode, language: LanguageCode, currentSearch: string): string{
  const base =
    mode === 'encode-base64' || mode === 'encode-base32' || mode === 'encode-base58' || mode === 'encode-hex'
      ? '/encode'
      : '/decode'
  const suffix =
    mode === 'encode-base64' || mode === 'decode-base64'
      ? '/base64'
      : mode === 'encode-base32' || mode === 'decode-base32'
        ? '/base32'
        : mode === 'encode-base58' || mode === 'decode-base58'
          ? '/base58'
          : '/hex'

  const path = `${base}${suffix}`
  const withLang = buildPathWithLanguage(path, language)
  return `${withLang}${currentSearch}`
}

export default function Encoder({ language, initialInputEncoding, initialOutputEncoding, variant = 'encode' }: Props){
  const { encoder: encoderCopy } = getTranslations(language)
  const [inputEncoding, setInputEncoding] = useState<InputEncoding>(initialInputEncoding || 'text-utf8')
  const [outputEncoding, setOutputEncoding] = useState<OutputEncoding>(initialOutputEncoding || 'base64')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<EncodeMode | null>(null)

  useEffect(()=>{
    if(typeof window === 'undefined') return
    const mode = detectEncodeModeFromPath(window.location.pathname)
    if(!mode) return

    const encodings = encodeModeToEncodings(mode)
    setInputEncoding(encodings.input)
    setOutputEncoding(encodings.output)
    setMode(mode)
  },[])

  function applyMode(mode: EncodeMode){
    const encodings = encodeModeToEncodings(mode)
    setInputEncoding(encodings.input)
    setOutputEncoding(encodings.output)
    setMode(mode)

    if(typeof window === 'undefined') return
    const nextUrl = buildUrlForMode(mode, language, window.location.search)
    window.history.replaceState(null, '', nextUrl)
  }

  function convert(){
    setError(null)
    if(!input){
      setOutput('')
      return
    }

    let bytes: Uint8Array

    try{
      if(inputEncoding === 'text-utf8'){
        bytes = textToBytes(input)
      }else if(inputEncoding === 'base64'){
        bytes = base64ToBytes(input)
      }else if(inputEncoding === 'base32'){
        bytes = base32ToBytes(input)
      }else if(inputEncoding === 'base58'){
        bytes = base58ToBytes(input)
      }else{
        bytes = hexToBytes(input)
      }
    }catch(e){
      setError(encoderCopy.inputErrorPrefix+String(e))
      setOutput('')
      return
    }

    if(outputEncoding === 'text-utf8'){
      setOutput(bytesToText(bytes))
      return
    }

    if(outputEncoding === 'base64'){
      setOutput(bytesToBase64(bytes, false))
      return
    }

    if(outputEncoding === 'base64url'){
      setOutput(bytesToBase64(bytes, true))
      return
    }

    if(outputEncoding === 'base32'){
      setOutput(bytesToBase32(bytes))
      return
    }

    if(outputEncoding === 'base58'){
      setOutput(bytesToBase58(bytes))
      return
    }

    setOutput(bytesToHex(bytes))
  }

  async function copy(){
    try{
      await navigator.clipboard.writeText(output)
      alert(encoderCopy.copySuccess)
    }catch(e){
      alert(encoderCopy.copyErrorPrefix+String(e))
    }
  }

  return (
    <div className="encode-card">
      <div className="lang-tabs encode-modes">
        {variant === 'encode' && (
          <>
            <button
              type="button"
              className={`lang-tab ${mode === 'encode-base64' ? 'active' : ''}`}
              onClick={()=>applyMode('encode-base64')}
            >
              {encoderCopy.presetEncodeBase64}
            </button>
            <button
              type="button"
              className={`lang-tab ${mode === 'encode-base32' ? 'active' : ''}`}
              onClick={()=>applyMode('encode-base32')}
            >
              {encoderCopy.presetEncodeBase32}
            </button>
            <button
              type="button"
              className={`lang-tab ${mode === 'encode-base58' ? 'active' : ''}`}
              onClick={()=>applyMode('encode-base58')}
            >
              {encoderCopy.presetEncodeBase58}
            </button>
            <button
              type="button"
              className={`lang-tab ${mode === 'encode-hex' ? 'active' : ''}`}
              onClick={()=>applyMode('encode-hex')}
            >
              {encoderCopy.presetEncodeHex}
            </button>
          </>
        )}
        {variant === 'decode' && (
          <>
            <button
              type="button"
              className={`lang-tab ${mode === 'decode-base64' ? 'active' : ''}`}
              onClick={()=>applyMode('decode-base64')}
            >
              {encoderCopy.presetDecodeBase64}
            </button>
            <button
              type="button"
              className={`lang-tab ${mode === 'decode-base32' ? 'active' : ''}`}
              onClick={()=>applyMode('decode-base32')}
            >
              {encoderCopy.presetDecodeBase32}
            </button>
            <button
              type="button"
              className={`lang-tab ${mode === 'decode-base58' ? 'active' : ''}`}
              onClick={()=>applyMode('decode-base58')}
            >
              {encoderCopy.presetDecodeBase58}
            </button>
            <button
              type="button"
              className={`lang-tab ${mode === 'decode-hex' ? 'active' : ''}`}
              onClick={()=>applyMode('decode-hex')}
            >
              {encoderCopy.presetDecodeHex}
            </button>
          </>
        )}
      </div>
      <div className="encode-controls">
        <div className="encode-actions">
          <button
            type="button"
            className="toolbar-format"
            onClick={convert}
          >
            {encoderCopy.convertLabel}
          </button>
          <button
            type="button"
            className="toolbar-button"
            onClick={copy}
            disabled={!output}
          >
            {encoderCopy.copyLabel}
          </button>
        </div>
      </div>
      <div className="encode-grid">
        <div className="encode-column">
          <label className="encode-textarea-label" htmlFor="encode-input">
            {encoderCopy.inputLabel}
          </label>
          <textarea
            id="encode-input"
            value={input}
            onChange={e=>setInput(e.target.value)}
            rows={8}
            placeholder={encoderCopy.inputPlaceholder}
          />
        </div>
        <div className="encode-column">
          <label className="encode-textarea-label" htmlFor="encode-output">
            {encoderCopy.outputLabel}
          </label>
          <textarea
            id="encode-output"
            value={output}
            readOnly
            rows={8}
            placeholder={encoderCopy.outputPlaceholder}
          />
          {error && (
            <p className="encode-error">{error}</p>
          )}
        </div>
      </div>
    </div>
  )
}
