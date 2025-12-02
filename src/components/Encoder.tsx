import React, { useState } from 'react'
import type { LanguageCode } from '../types'
import { getTranslations } from '../i18n'

type InputEncoding = 'text-utf8' | 'base64' | 'base32' | 'base58' | 'hex'
type OutputEncoding = 'text-utf8' | 'base64' | 'base64url' | 'base32' | 'base58' | 'hex'

type Props = {
  language: LanguageCode
  initialInputEncoding?: InputEncoding
  initialOutputEncoding?: OutputEncoding
}

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

export default function Encoder({ language, initialInputEncoding, initialOutputEncoding }: Props){
  const { encoder: encoderCopy } = getTranslations(language)
  const [inputEncoding, setInputEncoding] = useState<InputEncoding>(initialInputEncoding || 'text-utf8')
  const [outputEncoding, setOutputEncoding] = useState<OutputEncoding>(initialOutputEncoding || 'base64')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)

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
      <div className="encode-controls">
        <div className="encode-field">
          <label htmlFor="encode-input-encoding">{encoderCopy.inputEncodingLabel}</label>
          <select
            id="encode-input-encoding"
            value={inputEncoding}
            onChange={e=>setInputEncoding(e.target.value as InputEncoding)}
          >
            <option value="text-utf8">{encoderCopy.inputEncodingUtf8}</option>
            <option value="base64">{encoderCopy.inputEncodingBase64}</option>
            <option value="base32">{encoderCopy.inputEncodingBase32}</option>
            <option value="base58">{encoderCopy.inputEncodingBase58}</option>
            <option value="hex">{encoderCopy.inputEncodingHex}</option>
          </select>
        </div>
        <div className="encode-field">
          <label htmlFor="encode-output-encoding">{encoderCopy.outputEncodingLabel}</label>
          <select
            id="encode-output-encoding"
            value={outputEncoding}
            onChange={e=>setOutputEncoding(e.target.value as OutputEncoding)}
          >
            <option value="base64">{encoderCopy.outputEncodingBase64}</option>
            <option value="base64url">{encoderCopy.outputEncodingBase64Url}</option>
            <option value="base32">{encoderCopy.outputEncodingBase32}</option>
            <option value="base58">{encoderCopy.outputEncodingBase58}</option>
            <option value="hex">{encoderCopy.outputEncodingHex}</option>
            <option value="text-utf8">{encoderCopy.outputEncodingText}</option>
          </select>
        </div>
        <div className="encode-actions">
          <button
            type="button"
            className="toolbar-button"
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
