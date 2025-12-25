import React, { useEffect, useMemo, useState } from 'react'
import { getTranslations } from '../i18n'
import type { LanguageCode } from '../types'
import {
  DEFAULT_PAYLOAD,
  SUPPORTED_ALGS,
  type SupportedAlg,
  base64UrlDecode,
  bytesToText,
  tryParseJson,
  verifyHmac
} from './jwtUtils'

type DecodedToken = {
  header: Record<string, unknown> | null
  payload: Record<string, unknown> | null
  headerSegment: string
  payloadSegment: string
  signatureSegment: string
  signingInput: string
}

type VerificationState =
  | { status: 'idle' }
  | { status: 'missing-secret' }
  | { status: 'no-signature' }
  | { status: 'unsupported'; algorithm?: string }
  | { status: 'checking' }
  | { status: 'valid' }
  | { status: 'invalid' }
  | { status: 'error'; message: string }

function parseToken(token: string): DecodedToken{
  const clean = token.trim()
  if(!clean){
    throw new Error('Empty token')
  }
  const parts = clean.split('.')
  if(parts.length < 2){
    throw new Error('JWT must have at least header and payload segments')
  }
  const [headerSegment, payloadSegment, signatureSegment = ''] = parts
  const headerBytes = base64UrlDecode(headerSegment)
  const payloadBytes = base64UrlDecode(payloadSegment)
  const header = tryParseJson<Record<string, unknown>>(headerBytes)
  const payload = tryParseJson<Record<string, unknown>>(payloadBytes)
  return {
    header,
    payload,
    headerSegment,
    payloadSegment,
    signatureSegment,
    signingInput: `${headerSegment}.${payloadSegment}`
  }
}

function prettyJson(value: Record<string, unknown> | null): string{
  if(!value){
    return ''
  }
  try{
    return JSON.stringify(value, null, 2)
  }catch{
    return ''
  }
}

function getHeaderAlg(header: Record<string, unknown> | null): SupportedAlg | null{
  const algValue = header?.alg
  if(typeof algValue === 'string' && SUPPORTED_ALGS.includes(algValue as SupportedAlg)){
    return algValue as SupportedAlg
  }
  return null
}

function getExpiration(payload: Record<string, unknown> | null){
  const exp = payload?.exp
  if(typeof exp !== 'number'){
    return null
  }
  const nowSeconds = Math.floor(Date.now()/1000)
  return {
    exp,
    expired: exp < nowSeconds
  }
}

type JwtDecoderProps = {
  language: LanguageCode
}

export default function JwtDecoder({ language }: JwtDecoderProps){
  const { jwt: copy } = getTranslations(language)
  const [input, setInput] = useState('')
  const [secret, setSecret] = useState('')
  const [verifyAlgorithm, setVerifyAlgorithm] = useState<SupportedAlg>('HS256')
  const [decoded, setDecoded] = useState<DecodedToken | null>(null)
  const [decodeError, setDecodeError] = useState('')
  const [verification, setVerification] = useState<VerificationState>({ status: 'idle' })
  const [copyMessage, setCopyMessage] = useState('')

  useEffect(()=>{
    if(!input.trim()){
      setDecoded(null)
      setDecodeError('')
      setVerification({ status: 'idle' })
      return
    }
    try{
      const parsed = parseToken(input)
      setDecoded(parsed)
      setDecodeError('')
    }catch(err){
      const message = err instanceof Error ? err.message : String(err)
      setDecodeError(`${copy.decodeErrorPrefix}${message}`)
      setDecoded(null)
      setVerification({ status: 'idle' })
    }
  },[input, copy.decodeErrorPrefix])

  useEffect(()=>{
    let cancelled = false
    async function runVerification(){
      if(!decoded){
        setVerification({ status: 'idle' })
        return
      }
      if(!decoded.signatureSegment){
        setVerification({ status: 'no-signature' })
        return
      }
      const headerAlg = getHeaderAlg(decoded.header)
      const algorithm = headerAlg || verifyAlgorithm
      if(!secret.trim()){
        setVerification({ status: 'missing-secret' })
        return
      }
      if(!SUPPORTED_ALGS.includes(algorithm)){
        setVerification({ status: 'unsupported', algorithm: decoded.header?.alg as string })
        return
      }
      setVerification({ status: 'checking' })
      try{
        const ok = await verifyHmac(decoded.signingInput, decoded.signatureSegment, secret, algorithm)
        if(!cancelled){
          setVerification({ status: ok ? 'valid' : 'invalid' })
        }
      }catch(err){
        if(!cancelled){
          const message = err instanceof Error ? err.message : String(err)
          setVerification({ status: 'error', message: `${copy.signatureErrorPrefix}${message}` })
        }
      }
    }
    runVerification()
    return ()=>{ cancelled = true }
  },[decoded, secret, verifyAlgorithm, copy.signatureErrorPrefix])

  const expiration = useMemo(()=>getExpiration(decoded?.payload || null), [decoded?.payload])
  const headerText = useMemo(()=>prettyJson(decoded?.header || null), [decoded?.header])
  const payloadText = useMemo(()=>prettyJson(decoded?.payload || null), [decoded?.payload])

  const verificationLabel = useMemo(()=>{
    if(verification.status === 'valid') return copy.signatureVerified
    if(verification.status === 'invalid') return copy.signatureInvalid
    if(verification.status === 'missing-secret') return copy.signatureMissingSecret
    if(verification.status === 'no-signature') return copy.statusNoSignature
    if(verification.status === 'unsupported') return copy.signatureUnsupported
    if(verification.status === 'error') return verification.message
    if(verification.status === 'checking') return copy.verificationHeading
    return copy.verificationNote
  },[verification, copy.signatureInvalid, copy.signatureMissingSecret, copy.signatureUnsupported, copy.signatureVerified, copy.statusNoSignature, copy.verificationHeading, copy.verificationNote])

  const parseStatus = decoded ? copy.statusValid : decodeError ? copy.statusInvalid : ''
  const parseStatusClass = decodeError ? 'error' : decoded ? 'success' : ''

  function formatExpLabel(){
    if(!expiration) return null
    const date = new Date(expiration.exp*1000)
    const readable = date.toISOString()
    return `${copy.expiresLabel}: ${readable} (${expiration.expired ? copy.expiredLabel : copy.notExpiredLabel})`
  }

  async function handleCopy(value: string){
    if(!value) return
    try{
      await navigator.clipboard.writeText(value)
      setCopyMessage(copy.copiedLabel)
      setTimeout(()=>setCopyMessage(''), 1800)
    }catch(err){
      setCopyMessage(err instanceof Error ? err.message : String(err))
    }
  }

  function handleClear(){
    setInput('')
    setDecoded(null)
    setDecodeError('')
    setVerification({ status: 'idle' })
  }

  async function handleGenerateExample(){
    try{
      const header = { alg: 'HS256', typ: 'JWT' }
      const payload = JSON.parse(DEFAULT_PAYLOAD) as Record<string, unknown>
      const signingInput = `${btoa(JSON.stringify(header)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}.${btoa(JSON.stringify(payload)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}`
      // example token from defaults has no signature; keep empty signature
      setInput(`${signingInput}.`)
      setSecret('')
      setVerifyAlgorithm('HS256')
    }catch(err){
      const message = err instanceof Error ? err.message : String(err)
      setDecodeError(`${copy.decodeErrorPrefix}${message}`)
    }
  }

  const expirationLabel = formatExpLabel()

  return (
    <div className="jwt-stack">
      <div className="encode-card jwt-card">
        <h2>{copy.heading}</h2>
        <p className="encode-card-subtitle">{copy.subheading}</p>
        <div className="jwt-grid">
          <div className="jwt-column">
            <label className="encode-textarea-label" htmlFor="jwt-input">{copy.inputLabel}</label>
            <textarea
              id="jwt-input"
              value={input}
              onChange={event=>setInput(event.target.value)}
              placeholder={copy.inputPlaceholder}
              spellCheck="false"
            />
            <div className="jwt-actions">
              <button type="button" className="toolbar-button" onClick={handleGenerateExample}>
                {copy.generateExample}
              </button>
              <button type="button" className="toolbar-button secondary" onClick={handleClear}>
                {copy.clearLabel}
              </button>
              {copyMessage && <span className="jwt-copy-message">{copyMessage}</span>}
            </div>
            <p className="jwt-helper">{copy.helperText}</p>
            {parseStatus && (
              <div className={`jwt-status ${parseStatusClass || ''}`}>
                {parseStatus}
              </div>
            )}
            {decodeError && <div className="jwt-error">{decodeError}</div>}
          </div>
          <div className="jwt-column">
            <div className={`jwt-status ${verification.status === 'valid' ? 'success' : verification.status === 'invalid' || verification.status === 'error' ? 'error' : verification.status === 'unsupported' || verification.status === 'missing-secret' || verification.status === 'no-signature' ? 'warning' : verification.status === 'checking' ? 'info' : ''}`}>
              {verificationLabel}
            </div>
            <div className="jwt-field">
              <label htmlFor="jwt-secret">{copy.secretLabel}</label>
              <input
                id="jwt-secret"
                type="text"
                value={secret}
                onChange={event=>setSecret(event.target.value)}
                placeholder={copy.secretPlaceholder}
              />
            </div>
            <div className="jwt-field">
              <label htmlFor="jwt-alg">{copy.algorithmLabel}</label>
              <select id="jwt-alg" value={verifyAlgorithm} onChange={event=>setVerifyAlgorithm(event.target.value as SupportedAlg)}>
                {SUPPORTED_ALGS.map(alg=>(
                  <option key={alg} value={alg}>{alg}</option>
                ))}
              </select>
            </div>
            {expirationLabel && (
              <div className={`jwt-expiration ${expiration?.expired ? 'expired' : 'active'}`}>
                {expirationLabel}
              </div>
            )}
          </div>
        </div>
        <div className="jwt-panels">
          <div className="jwt-panel">
            <div className="jwt-panel-header">
              <span>{copy.decodedHeaderLabel}</span>
              <button type="button" className="toolbar-button secondary" onClick={()=>handleCopy(headerText)} disabled={!headerText}>
                {copy.copyLabel}
              </button>
            </div>
            <pre>{headerText || '—'}</pre>
          </div>
          <div className="jwt-panel">
            <div className="jwt-panel-header">
              <span>{copy.decodedPayloadLabel}</span>
              <button type="button" className="toolbar-button secondary" onClick={()=>handleCopy(payloadText)} disabled={!payloadText}>
                {copy.copyLabel}
              </button>
            </div>
            <pre>{payloadText || '—'}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}
