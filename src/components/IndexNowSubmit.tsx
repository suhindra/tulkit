import React, { useEffect, useMemo, useState } from 'react'
import { getTranslations } from '../i18n'
import type { LanguageCode } from '../types'

type IndexNowSubmitProps = {
  language: LanguageCode
  currentUrl: string
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

type Status = {
  state: SubmitState
  message?: string
}

const STORAGE_KEYS = {
  key: 'tulkit-indexnow-key',
  host: 'tulkit-indexnow-host',
  keyLocation: 'tulkit-indexnow-key-location'
}

const FIXED_KEY = '74756c6b69742e6f6e6c696e65'
const FIXED_HOST = 'tulkit.online'

function readStored(key: string): string{
  if(typeof window === 'undefined') return ''
  try{
    return window.localStorage.getItem(key) || ''
  }catch{
    return ''
  }
}

function writeStored(key: string, value: string){
  if(typeof window === 'undefined') return
  try{
    if(value){
      window.localStorage.setItem(key, value)
    }else{
      window.localStorage.removeItem(key)
    }
  }catch{
    // ignore storage errors
  }
}

export default function IndexNowSubmit({ language, currentUrl }: IndexNowSubmitProps){
  const { app: { indexNow: copy } } = getTranslations(language)
  const defaultHost = useMemo(()=>{
    return FIXED_HOST
  },[])
  const defaultSitemapUrl = useMemo(()=>{
    return `https://${FIXED_HOST}/sitemap.xml`
  },[])

  const [key] = useState<string>(FIXED_KEY)
  const [host] = useState<string>(FIXED_HOST)
  const [keyLocation] = useState<string>(`https://${FIXED_HOST}/${FIXED_KEY}.txt`)
  const [status, setStatus] = useState<Status>({ state: 'idle' })
  const [copied, setCopied] = useState(false)
  const [sitemapUrl, setSitemapUrl] = useState<string>(defaultSitemapUrl)
  const [sitemapStatus, setSitemapStatus] = useState<string>('')
  const [sitemapLoading, setSitemapLoading] = useState(false)
  const [sitemapUrls, setSitemapUrls] = useState<string[]>([])
  const [selectedUrls, setSelectedUrls] = useState<Set<string>>(new Set())

  useEffect(()=>{
    if(!sitemapUrl && defaultSitemapUrl){
      setSitemapUrl(defaultSitemapUrl)
    }
  },[defaultSitemapUrl, sitemapUrl])

  const resolvedHost = host || defaultHost
  const resolvedKeyLocation = keyLocation || (key && resolvedHost ? `https://${resolvedHost}/${key}.txt` : '')
  const urlsToSubmit = useMemo(()=>{
    if(selectedUrls.size > 0){
      return Array.from(selectedUrls)
    }
    return []
  },[selectedUrls])
  const pingUrls = useMemo(()=>{
    if(!key) return []
    return urlsToSubmit.map(url=>`https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${encodeURIComponent(key)}`)
  },[urlsToSubmit, key])
  const primaryUrl = pingUrls[0] ? urlsToSubmit[0] : ''
  const pingUrl = pingUrls[0] || ''
  const keyFilename = key ? `${key}.txt` : ''
  const keyFileUrl = resolvedKeyLocation || (resolvedHost && key ? `https://${resolvedHost}/${key}.txt` : '')

  async function handleSubmit(){
    if(!key){
      setStatus({ state: 'error', message: copy.missingKey })
      return
    }
    if(urlsToSubmit.length === 0){
      setStatus({ state: 'error', message: copy.missingSelection || copy.missingUrl })
      return
    }
    if(!resolvedHost){
      setStatus({ state: 'error', message: copy.missingHost })
      return
    }

    setStatus({ state: 'submitting', message: copy.submittingLabel })

    const payload = {
      host: resolvedHost,
      key,
      keyLocation: resolvedKeyLocation || undefined,
      urlList: urlsToSubmit
    }

    try{
      const response = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if(response.ok){
        setStatus({ state: 'success', message: copy.successMessage })
        return
      }

      let errorText = ''
      try{
        errorText = await response.text()
      }catch{
        // ignore
      }
      setStatus({
        state: 'error',
        message: `${copy.errorPrefix}${errorText || response.statusText || response.status}`
      })
    }catch(error){
      const message = error instanceof Error ? error.message : String(error)
      setStatus({ state: 'error', message: `${copy.errorPrefix}${message}` })
    }
  }

  async function handleCopyPing(url = pingUrl){
    if(!url) return
    try{
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(()=>setCopied(false), 1600)
    }catch(error){
      const message = error instanceof Error ? error.message : String(error)
      setStatus({ state: 'error', message: `${copy.errorPrefix}${message}` })
    }
  }

  function handleOpenPing(url = pingUrl){
    if(!url) return
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  async function handleLoadSitemap(){
    if(!sitemapUrl){
      setSitemapStatus(copy.sitemapEmpty)
      return
    }
    setSitemapLoading(true)
    setSitemapStatus(copy.sitemapLoading)
    try{
      const response = await fetch(sitemapUrl)
      if(!response.ok){
        throw new Error(`${response.status} ${response.statusText}`)
      }
      const text = await response.text()
      const parser = new DOMParser()
      const doc = parser.parseFromString(text, 'application/xml')
      const locs = Array.from(doc.getElementsByTagName('loc')).map(node=>node.textContent?.trim() || '').filter(Boolean)
      const unique = Array.from(new Set(locs))
      const valid = unique.filter(url=>{
        try{
          new URL(url)
          return true
        }catch{
          return false
        }
      })
      setSitemapUrls(valid)
      setSelectedUrls(new Set())
      if(valid.length > 0){
        setSitemapStatus(copy.sitemapLoaded.replace('{count}', String(valid.length)))
      }else{
        setSitemapStatus(copy.sitemapEmpty)
      }
    }catch(error){
      const message = error instanceof Error ? error.message : String(error)
      setSitemapStatus(`${copy.sitemapErrorPrefix}${message}`)
      setSitemapUrls([])
      setSelectedUrls(new Set())
    }finally{
      setSitemapLoading(false)
    }
  }

  function toggleUrl(url: string){
    setSelectedUrls(prev=>{
      const next = new Set(prev)
      if(next.has(url)){
        next.delete(url)
      }else{
        next.add(url)
      }
      return next
    })
  }

  function selectAll(){
    setSelectedUrls(new Set(sitemapUrls))
  }

  function clearSelection(){
    setSelectedUrls(new Set())
  }

  const submitLabel = selectedUrls.size > 0 ? copy.submitSelectedLabel : copy.submitLabel
  const selectedCountLabel = copy.selectedCount.replace('{count}', String(selectedUrls.size))

  function handleDownloadKey(){
    if(!key) return
    const blob = new Blob([key], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = keyFilename || 'indexnow-key.txt'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="encode-card indexnow-card" aria-label={copy.heading}>
      <div className="indexnow-header">
        <div>
          <h2>{copy.heading}</h2>
          <p className="encode-card-subtitle">{copy.description}</p>
        </div>
        <span className="indexnow-badge">IndexNow</span>
      </div>

      <div className="indexnow-grid">
        <label className="indexnow-field">
          <span>{copy.keyLabel}</span>
          <input
            type="text"
            value={key}
            readOnly
            disabled
            placeholder="9f9d054bb6304fe083e3a9ba5d0203cd"
            autoComplete="off"
          />
          <span className="indexnow-hint">{copy.keyHelp}</span>
        </label>
        <label className="indexnow-field">
          <span>{copy.hostLabel}</span>
          <input
            type="text"
            value={host}
            readOnly
            disabled
            placeholder={defaultHost || 'www.example.com'}
            autoComplete="off"
          />
          <span className="indexnow-hint">{copy.hostHelp}</span>
        </label>
        <label className="indexnow-field indexnow-full">
          <span>{copy.keyLocationLabel}</span>
          <input
            type="text"
            value={keyLocation}
            readOnly
            disabled
            placeholder={resolvedHost && key ? `https://${resolvedHost}/${key}.txt` : 'https://www.example.com/your-key.txt'}
            autoComplete="off"
          />
          <span className="indexnow-hint">{copy.keyLocationHelp}</span>
        </label>
      </div>

      <div className="indexnow-grid">
        <label className="indexnow-field indexnow-full">
          <span>{copy.sitemapLabel}</span>
          <div className="indexnow-inline-row">
            <input
              type="text"
              value={sitemapUrl}
              readOnly
              disabled
              placeholder={defaultSitemapUrl || 'https://example.com/sitemap.xml'}
              autoComplete="off"
            />
            <button
              type="button"
              className="toolbar-button"
              onClick={handleLoadSitemap}
              disabled={sitemapLoading}
            >
              {sitemapLoading ? copy.sitemapLoading : copy.loadSitemap}
            </button>
          </div>
          <span className="indexnow-hint">{copy.sitemapHelp}</span>
          {sitemapStatus && <span className="indexnow-status inline">{sitemapStatus}</span>}
        </label>
      </div>

      {sitemapUrls.length > 0 && (
        <div className="indexnow-sitemap">
          <div className="indexnow-sitemap-header">
            <div className="indexnow-sitemap-title">
              <span className="indexnow-label">{copy.sitemapUrlListLabel}</span>
              <span className="indexnow-hint">{selectedCountLabel}</span>
            </div>
            <div className="indexnow-note-actions">
              <button type="button" className="toolbar-button" onClick={selectAll}>
                {copy.selectAll}
              </button>
              <button type="button" className="toolbar-button" onClick={clearSelection}>
                {copy.clearSelection}
              </button>
            </div>
          </div>
          <div className="indexnow-sitemap-list">
            {sitemapUrls.map(url=>(
              <label key={url} className="indexnow-sitemap-item">
                <input
                  type="checkbox"
                  checked={selectedUrls.has(url)}
                  onChange={()=>toggleUrl(url)}
                />
                <span className="indexnow-sitemap-url">{url}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="indexnow-note">
        <div className="indexnow-note-header">
          <span className="indexnow-label">{copy.keyFileLabel}</span>
          <span className="indexnow-hint">{copy.keyFileHelp}</span>
        </div>
        <div className="indexnow-note-body">
          <div className="indexnow-note-text">
            <div className="indexnow-hint">{copy.keyFileNote}</div>
            {key && (
              <code className="indexnow-inline">{keyFileUrl || `https://${resolvedHost || 'your-domain.com'}/${key}.txt`}</code>
            )}
          </div>
          <div className="indexnow-note-actions">
            <button
              type="button"
              className="toolbar-button"
              onClick={handleDownloadKey}
              disabled={!key}
            >
              {copy.downloadKey}
            </button>
          </div>
        </div>
      </div>

      <div className="indexnow-actions">
        <button
          type="button"
          className="toolbar-button"
          onClick={handleSubmit}
          disabled={status.state === 'submitting' || !key || !resolvedHost || urlsToSubmit.length === 0}
        >
          {status.state === 'submitting' ? copy.submittingLabel : submitLabel}
        </button>
        <button
          type="button"
          className="toolbar-button"
          onClick={handleOpenPing}
          disabled={!pingUrl}
        >
          {copy.openPing}
        </button>
        <button
          type="button"
          className={`toolbar-button ${copied ? 'success' : ''}`}
          onClick={handleCopyPing}
          disabled={!pingUrl}
        >
          {copied ? '✓ ' : '📋 '}{copied ? copy.copied : copy.copyPingUrl}
        </button>
        {status.message && (
          <span className={`indexnow-status ${status.state}`}>
            {status.message}
          </span>
        )}
      </div>

      <div className="indexnow-ping">
        <div className="indexnow-ping-header">
          <span className="indexnow-label">{copy.pingUrlLabel}</span>
          <span className="indexnow-hint">{copy.pingUrlHelp}</span>
        </div>
        <div className="indexnow-ping-actions">
          <input
            type="text"
            className="indexnow-ping-input"
            value={pingUrl}
            readOnly
          />
        </div>
        {pingUrls.length > 1 && (
          <div className="indexnow-ping-list">
            {pingUrls.map((url, idx)=>(
              <div key={url} className="indexnow-ping-row">
                <span className="indexnow-hint">{`Ping ${idx + 1}`}</span>
                <div className="indexnow-ping-actions">
                  <input type="text" className="indexnow-ping-input" value={url} readOnly />
                  <button
                    type="button"
                    className="toolbar-button"
                    onClick={()=>handleOpenPing(url)}
                  >
                    {copy.openPing}
                  </button>
                  <button
                    type="button"
                    className="toolbar-button"
                    onClick={()=>handleCopyPing(url)}
                  >
                    {copy.copyPingUrl}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
