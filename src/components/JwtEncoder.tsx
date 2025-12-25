import React, { useState } from 'react'
import { getTranslations } from '../i18n'
import type { LanguageCode } from '../types'
import {
  DEFAULT_HEADER,
  DEFAULT_PAYLOAD,
  SAMPLE_SECRET,
  SUPPORTED_ALGS,
  type SupportedAlg,
  base64UrlEncode,
  signHmac,
  textToBytes
} from './jwtUtils'

type JwtEncoderProps = {
  language: LanguageCode
}

export default function JwtEncoder({ language }: JwtEncoderProps){
  const { jwt: copy } = getTranslations(language)
  const [builderHeader, setBuilderHeader] = useState(DEFAULT_HEADER)
  const [builderPayload, setBuilderPayload] = useState(DEFAULT_PAYLOAD)
  const [builderSecret, setBuilderSecret] = useState(SAMPLE_SECRET)
  const [builderAlg, setBuilderAlg] = useState<SupportedAlg>('HS256')
  const [builderOutput, setBuilderOutput] = useState('')
  const [builderError, setBuilderError] = useState('')
  const [isSigning, setIsSigning] = useState(false)

  async function buildToken(
    header: Record<string, unknown>,
    payload: Record<string, unknown>,
    secretValue: string,
    alg: SupportedAlg
  ){
    const headerSegment = base64UrlEncode(textToBytes(JSON.stringify({ ...header, alg })))
    const payloadSegment = base64UrlEncode(textToBytes(JSON.stringify(payload)))
    const signingInput = `${headerSegment}.${payloadSegment}`
    const signature = await signHmac(signingInput, secretValue, alg)
    return `${signingInput}.${signature}`
  }

  async function handleSign(){
    setBuilderError('')
    setBuilderOutput('')
    setIsSigning(true)
    try{
      const headerObj = JSON.parse(builderHeader) as Record<string, unknown>
      const payloadObj = JSON.parse(builderPayload) as Record<string, unknown>
      const token = await buildToken(headerObj, payloadObj, builderSecret, builderAlg)
      setBuilderOutput(token)
    }catch(err){
      const message = err instanceof Error ? err.message : String(err)
      setBuilderError(`${copy.builder.errorPrefix}${message}`)
    }finally{
      setIsSigning(false)
    }
  }

  async function handleCopy(value: string){
    if(!value) return
    try{
      await navigator.clipboard.writeText(value)
    }catch{
      // best-effort copy
    }
  }

  return (
    <div className="jwt-stack">
      <div className="encode-card jwt-card">
        <h2>{copy.builder.heading}</h2>
        <p className="encode-card-subtitle">{copy.builder.description}</p>
        <div className="jwt-builder-grid">
          <div className="jwt-column">
            <label className="encode-textarea-label" htmlFor="jwt-header">{copy.builder.headerLabel}</label>
            <textarea
              id="jwt-header"
              value={builderHeader}
              onChange={event=>setBuilderHeader(event.target.value)}
              placeholder={copy.builder.headerPlaceholder}
              spellCheck="false"
            />
          </div>
          <div className="jwt-column">
            <label className="encode-textarea-label" htmlFor="jwt-payload">{copy.builder.payloadLabel}</label>
            <textarea
              id="jwt-payload"
              value={builderPayload}
              onChange={event=>setBuilderPayload(event.target.value)}
              placeholder={copy.builder.payloadPlaceholder}
              spellCheck="false"
            />
          </div>
        </div>
        <div className="jwt-builder-controls">
          <div className="jwt-field">
            <label htmlFor="jwt-builder-secret">{copy.builder.secretLabel}</label>
            <input
              id="jwt-builder-secret"
              type="text"
              value={builderSecret}
              onChange={event=>setBuilderSecret(event.target.value)}
              placeholder={SAMPLE_SECRET}
            />
            <small className="jwt-hint">{copy.builder.secretHelper}</small>
          </div>
          <div className="jwt-field">
            <label htmlFor="jwt-builder-alg">{copy.builder.algorithmLabel}</label>
            <select id="jwt-builder-alg" value={builderAlg} onChange={event=>setBuilderAlg(event.target.value as SupportedAlg)}>
              {SUPPORTED_ALGS.map(alg=>(
                <option key={alg} value={alg}>{alg}</option>
              ))}
            </select>
          </div>
          <div className="jwt-actions">
            <button type="button" className="toolbar-button" onClick={handleSign} disabled={isSigning}>
              {isSigning ? copy.builder.signingLabel : copy.builder.signButton}
            </button>
            <button type="button" className="toolbar-button secondary" onClick={()=>handleCopy(builderOutput)} disabled={!builderOutput}>
              {copy.builder.copyOutput}
            </button>
          </div>
        </div>
        <div className="jwt-builder-output">
          <label className="encode-textarea-label" htmlFor="jwt-output">{copy.builder.outputLabel}</label>
          <textarea
            id="jwt-output"
            value={builderOutput}
            readOnly
            placeholder={copy.builder.outputPlaceholder}
            spellCheck="false"
          />
          {builderError && <div className="jwt-error">{builderError}</div>}
        </div>
      </div>
    </div>
  )
}
