import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { LanguageCode } from '../types'
import { getTranslations } from '../i18n'
import { buildPathWithLanguage, stripLanguagePrefix } from '../routing'

type Props = {
  language: LanguageCode
}

type HashAlgorithm = 'sha1' | 'sha256' | 'sha512'

function bytesToHex(bytes: Uint8Array): string{
  const parts: string[] = []
  for(let i=0;i<bytes.length;i+=1){
    parts.push(bytes[i].toString(16).padStart(2,'0'))
  }
  return parts.join('')
}

function detectHashAlgorithmFromPath(pathname: string): HashAlgorithm{
  const path = stripLanguagePrefix(pathname).toLowerCase()
  const match = path.match(/^\/(?:generator\/hash|hash)(?:\/([^/]+))?/)
  const slug = match && match[1]
  if(slug === 'sha1' || slug === 'sha512'){
    return slug
  }
  return 'sha256'
}

function buildUrlForAlgorithm(algorithm: HashAlgorithm, language: LanguageCode, currentSearch: string): string{
  const base = '/generator/hash'
  const suffix = algorithm === 'sha1' ? '/sha1' : algorithm === 'sha512' ? '/sha512' : '/sha256'
  const path = `${base}${suffix}`
  const withLang = buildPathWithLanguage(path, language)
  return `${withLang}${currentSearch}`
}

export default function HashGenerator({ language }: Props){
  const { hash: hashCopy } = getTranslations(language)
  const location = useLocation()
  const navigate = useNavigate()
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('sha256')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isHashing, setIsHashing] = useState(false)

  useEffect(()=>{
    const next = detectHashAlgorithmFromPath(location.pathname)
    setAlgorithm(prev=> (prev === next ? prev : next))
  },[location.pathname])

  function applyAlgorithm(next: HashAlgorithm){
    setAlgorithm(next)
    const nextUrl = buildUrlForAlgorithm(next, language, location.search)
    navigate(nextUrl, { replace: true })
  }

  async function generate(){
    setError(null)
    if(!input){
      setOutput('')
      return
    }

    if(typeof window === 'undefined' || !window.crypto || !window.crypto.subtle){
      setError(hashCopy.inputErrorPrefix+'Web Crypto API is not available in this environment.')
      setOutput('')
      return
    }

    setIsHashing(true)
    try{
      const encoder = new TextEncoder()
      const data = encoder.encode(input)
      const algoName = algorithm === 'sha1' ? 'SHA-1' : algorithm === 'sha256' ? 'SHA-256' : 'SHA-512'
      const digest = await window.crypto.subtle.digest(algoName, data)
      const bytes = new Uint8Array(digest)
      setOutput(bytesToHex(bytes))
    }catch(e){
      setError(hashCopy.inputErrorPrefix+String(e))
      setOutput('')
    }finally{
      setIsHashing(false)
    }
  }

  async function copy(){
    try{
      await navigator.clipboard.writeText(output)
      alert(hashCopy.copySuccess)
    }catch(e){
      alert(hashCopy.copyErrorPrefix+String(e))
    }
  }

  return (
    <div className="encode-card">
      <div className="lang-tabs encode-modes">
        <button
          type="button"
          className={`lang-tab ${algorithm === 'sha1' ? 'active' : ''}`}
          onClick={()=>applyAlgorithm('sha1')}
        >
          {hashCopy.algorithmSha1}
        </button>
        <button
          type="button"
          className={`lang-tab ${algorithm === 'sha256' ? 'active' : ''}`}
          onClick={()=>applyAlgorithm('sha256')}
        >
          {hashCopy.algorithmSha256}
        </button>
        <button
          type="button"
          className={`lang-tab ${algorithm === 'sha512' ? 'active' : ''}`}
          onClick={()=>applyAlgorithm('sha512')}
        >
          {hashCopy.algorithmSha512}
        </button>
      </div>
      <div className="encode-controls">
        <div className="encode-actions">
          <button
            type="button"
            className="toolbar-format"
            onClick={generate}
            disabled={isHashing}
          >
            {isHashing ? hashCopy.hashingLabel : hashCopy.generateLabel}
          </button>
          <button
            type="button"
            className="toolbar-button"
            onClick={copy}
            disabled={!output}
          >
            {hashCopy.copyLabel}
          </button>
        </div>
      </div>
      <div className="encode-grid">
        <div className="encode-column">
          <label className="encode-textarea-label" htmlFor="hash-input">
            {hashCopy.inputLabel}
          </label>
          <textarea
            id="hash-input"
            value={input}
            onChange={e=>setInput(e.target.value)}
            rows={8}
            placeholder={hashCopy.inputPlaceholder}
          />
        </div>
        <div className="encode-column">
          <label className="encode-textarea-label" htmlFor="hash-output">
            {hashCopy.outputLabel}
          </label>
          <textarea
            id="hash-output"
            value={output}
            readOnly
            rows={8}
            placeholder={hashCopy.outputPlaceholder}
          />
          {error && (
            <p className="encode-error">{error}</p>
          )}
        </div>
      </div>
    </div>
  )
}
