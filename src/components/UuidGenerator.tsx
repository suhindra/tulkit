import React, { useState, useEffect } from 'react'
import { v1 as uuidV1, v4 as uuidV4 } from 'uuid'
import { useLocation, useNavigate } from 'react-router-dom'
import type { LanguageCode, UuidVersion } from '../types'
import { getTranslations } from '../i18n'
import { buildPathWithLanguage, stripLanguagePrefix } from '../routing'

const uuidVersions: UuidVersion[] = ['v1','v4','v7']

type UuidGeneratorProps = {
  onVersionChange?: (version: UuidVersion) => void
  language: LanguageCode
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

export default function UuidGenerator({ onVersionChange, language }: UuidGeneratorProps){
  const location = useLocation()
  const navigate = useNavigate()
  const [count, setCount] = useState<number>(5)
  const [version, setVersion] = useState<UuidVersion>('v4')
  const [uppercase, setUppercase] = useState(false)
  const [withHyphens, setWithHyphens] = useState(true)
  const [withBraces, setWithBraces] = useState(false)
  const [uuids, setUuids] = useState<string[]>([])
  const uuidCopy = getTranslations(language).uuid

  useEffect(()=>{
    const path = stripLanguagePrefix(location.pathname).toLowerCase()
    const match = path.match(/^\/(?:generator\/)?uuid(?:\/([^/]+))?/)
    if(match){
      const slug = (match[1] || '').toLowerCase()
      if(slug === 'uuid-v1') setVersion('v1')
      else if(slug === 'uuid-v7') setVersion('v7')
      else setVersion('v4')
    }
  },[location.pathname])

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
    const url = `${buildPathWithLanguage(path, language)}${location.search}`
    navigate(url, { replace: true })
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
      alert(uuidCopy.copySuccess)
    }catch(e){
      alert(uuidCopy.copyErrorPrefix+String(e))
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
            {uuidCopy.tabLabels[v]}
          </button>
        ))}
      </div>
      <div className="uuid-controls">
        <div className="uuid-field">
          <label htmlFor="uuid-count">{uuidCopy.countLabel}</label>
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
            {uuidCopy.uppercaseLabel}
          </label>
          <label>
            <input
              type="checkbox"
              checked={withHyphens}
              onChange={e=>setWithHyphens(e.target.checked)}
            />
            {uuidCopy.hyphenLabel}
          </label>
          <label>
            <input
              type="checkbox"
              checked={withBraces}
              onChange={e=>setWithBraces(e.target.checked)}
            />
            {uuidCopy.bracesLabel}
          </label>
        </div>
        <div className="uuid-actions">
          <button
            type="button"
            className="toolbar-format uuid-generate-button"
            onClick={generate}
          >
            {uuidCopy.generateLabel}
          </button>
          <button
            type="button"
            className="toolbar-button uuid-copy-button"
            onClick={copyAll}
            disabled={!uuids.length}
          >
            {uuidCopy.copyAllLabel}
          </button>
        </div>
      </div>
      <div className="uuid-info">
        <h3>{uuidCopy.info[version].title}</h3>
        <p>{uuidCopy.info[version].description}</p>
        {uuidCopy.info[version].tips && (
          <ul>
            {uuidCopy.info[version].tips!.map(tip=>(
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="uuid-output">
        {uuids.length === 0 ? (
          <p className="uuid-placeholder">{uuidCopy.placeholder}</p>
        ) : (
          <pre>
            {uuids.join('\n')}
          </pre>
        )}
      </div>
    </div>
  )
}
