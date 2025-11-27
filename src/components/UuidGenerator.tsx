import React, { useState, useEffect } from 'react'
import { v1 as uuidV1, v4 as uuidV4 } from 'uuid'

export type UuidVersion = 'v1' | 'v4' | 'v7'

const uuidVersions: UuidVersion[] = ['v1','v4','v7']

const uuidVersionLabels: Record<UuidVersion,string> = {
  v1: 'UUID v1',
  v4: 'UUID v4',
  v7: 'UUID v7'
}

type UuidVersionInfo = {
  title: string
  description: string
  tips?: string[]
}

const uuidVersionInfo: Record<UuidVersion,UuidVersionInfo> = {
  v1: {
    title: 'UUID v1 — time‑based',
    description: 'Includes a timestamp component so values roughly follow creation time. Useful when you want IDs that are unique and tend to sort by creation order.',
    tips: [
      'May leak timing patterns, so avoid for security‑sensitive identifiers.',
      'Works well for logs, background jobs, or import batches.'
    ]
  },
  v4: {
    title: 'UUID v4 — random',
    description: 'Purely random identifiers with 122 bits of entropy. A good default when you need unique IDs without any embedded meaning.',
    tips: [
      'Great for public IDs in URLs or database primary keys.',
      'Best choice when you do not need ordering by creation time.'
    ]
  },
  v7: {
    title: 'UUID v7 — ordered by time',
    description: 'Newer UUID version that combines a timestamp prefix with random bits. Designed to be sortable while avoiding v1’s MAC‑address style concerns.',
    tips: [
      'Ideal for databases that benefit from append‑friendly, monotonic IDs.',
      'Useful for analytics, events, and write‑heavy tables.'
    ]
  }
}

type UuidGeneratorProps = {
  onVersionChange?: (version: UuidVersion) => void
}

function createUuidV7(): string {
  const bytes = new Uint8Array(16)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(bytes)
  } else {
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = Math.floor(Math.random() * 256)
    }
  }

  const time = Date.now()
  bytes[0] = (time >>> 24) & 0xff
  bytes[1] = (time >>> 16) & 0xff
  bytes[2] = (time >>> 8) & 0xff
  bytes[3] = time & 0xff

  bytes[6] = (bytes[6] & 0x0f) | 0x70
  bytes[8] = (bytes[8] & 0x3f) | 0x80

  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20)
  ].join('-')
}

function createUuid(version: UuidVersion): string {
  switch(version){
    case 'v1': return uuidV1()
    case 'v7': return createUuidV7()
    case 'v4':
    default: return uuidV4()
  }
}

export default function UuidGenerator({ onVersionChange }: UuidGeneratorProps = {}){
  const [count, setCount] = useState<number>(5)
  const [version, setVersion] = useState<UuidVersion>('v4')
  const [uppercase, setUppercase] = useState(false)
  const [withHyphens, setWithHyphens] = useState(true)
  const [withBraces, setWithBraces] = useState(false)
  const [uuids, setUuids] = useState<string[]>([])

  useEffect(()=>{
    const path = window.location.pathname.toLowerCase()
    const match = path.match(/^\/(?:generator\/)?uuid(?:\/([^/]+))?/)
    if(match){
      const slug = (match[1] || '').toLowerCase()
      if(slug === 'uuid-v1') setVersion('v1')
      else if(slug === 'uuid-v7') setVersion('v7')
      else setVersion('v4')
    }
  },[])

  useEffect(()=>{
    const baseTitle = 'Tulkit — UUID Generator'
    const suffix = version.toUpperCase()
    document.title = `${baseTitle} ${suffix}`
  },[version])

  useEffect(()=>{
    onVersionChange?.(version)
  },[version, onVersionChange])

  function updateUrlForVersion(next:UuidVersion){
    const slug =
      next === 'v1' ? 'uuid-v1'
      : next === 'v7' ? 'uuid-v7'
      : ''
    const base = '/generator/uuid'
    const path = slug ? `${base}/${slug}` : base
    const url = `${path}${window.location.search}`
    window.history.replaceState(null, '', url)
  }

  function formatUuid(raw:string){
    let value = raw
    if (!withHyphens) {
      value = value.replace(/-/g, '')
    }
    if (withBraces) {
      value = `{${value}}`
    }
    if (uppercase) {
      value = value.toUpperCase()
    }
    return value
  }

  function generate(){
    const safeCount = Math.min(Math.max(count || 1, 1), 100)
    const list: string[] = []
    for (let i = 0; i < safeCount; i++) {
      list.push(formatUuid(createUuid(version)))
    }
    setUuids(list)
  }

  async function copyAll(){
    try{
      await navigator.clipboard.writeText(uuids.join('\n'))
      alert('UUIDs copied to clipboard')
    }catch(e){
      alert('Clipboard failed: '+String(e))
    }
  }

  return (
    <div className="uuid-card">
      <div className="uuid-tabs">
        {uuidVersions.map(v=>(
          <button
            key={v}
            type="button"
            className={`uuid-tab ${version === v ? 'active' : ''}`}
            onClick={()=>{
              setVersion(v)
              updateUrlForVersion(v)
            }}
          >
            {uuidVersionLabels[v]}
          </button>
        ))}
      </div>
      <div className="uuid-controls">
        <div className="uuid-field">
          <label htmlFor="uuid-count">How many UUIDs?</label>
          <input
            id="uuid-count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={e=>setCount(Number(e.target.value))}
          />
        </div>
        <div className="uuid-options">
          <label>
            <input
              type="checkbox"
              checked={uppercase}
              onChange={e=>setUppercase(e.target.checked)}
            />
            Uppercase
          </label>
          <label>
            <input
              type="checkbox"
              checked={withHyphens}
              onChange={e=>setWithHyphens(e.target.checked)}
            />
            Include hyphens
          </label>
          <label>
            <input
              type="checkbox"
              checked={withBraces}
              onChange={e=>setWithBraces(e.target.checked)}
            />
            Surround with braces
          </label>
        </div>
        <div className="uuid-actions">
          <button
            type="button"
            className="toolbar-format uuid-generate-button"
            onClick={generate}
          >
            Generate UUIDs
          </button>
          <button
            type="button"
            className="toolbar-button uuid-copy-button"
            onClick={copyAll}
            disabled={!uuids.length}
          >
            Copy all
          </button>
        </div>
      </div>
      <div className="uuid-info">
        <h3>{uuidVersionInfo[version].title}</h3>
        <p>{uuidVersionInfo[version].description}</p>
        {uuidVersionInfo[version].tips && (
          <ul>
            {uuidVersionInfo[version].tips!.map(tip=>(
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="uuid-output">
        {uuids.length === 0 ? (
          <p className="uuid-placeholder">Click “Generate UUIDs” to create identifiers.</p>
        ) : (
          <pre>
            {uuids.join('\n')}
          </pre>
        )}
      </div>
    </div>
  )
}
