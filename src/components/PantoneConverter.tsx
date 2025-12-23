import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { LanguageCode } from '../types'
import { getTranslations } from '../i18n'
import { findClosestPantones, PANTONE_COLORS } from '../data/pantoneColors'
import chroma from 'chroma-js'

type Props = {
  language: LanguageCode
}

type PantoneMatch = {
  color: typeof PANTONE_COLORS[number]
  distance: number
}

function isValidHex(value: string): boolean {
  const cleaned = value.trim().replace(/^#/, '')
  return /^[a-f0-9]{3}$|^[a-f0-9]{6}$/i.test(cleaned)
}

function normalizeHex(value: string): string {
  let normalized = value.trim()
  if(!normalized.startsWith('#')){
    normalized = `#${normalized}`
  }
  if(normalized.length === 4){
    normalized = `#${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}${normalized[3]}${normalized[3]}`
  }
  return normalized.toUpperCase()
}

function getRgbLabel(hex: string): string {
  try{
    const [r, g, b] = chroma(hex).rgb()
    return `${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}`
  }catch{
    return ''
  }
}

export default function PantoneConverter({ language }: Props){
  const { pantone } = getTranslations(language)
  const location = useLocation()
  const navigate = useNavigate()

  const [hexInput, setHexInput] = useState('')
  const [displayHex, setDisplayHex] = useState('')
  const [pantoneMatches, setPantoneMatches] = useState<PantoneMatch[]>([])
  const [error, setError] = useState<string | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [pickerHue, setPickerHue] = useState(210)
  const [pickerSat, setPickerSat] = useState(70)
  const [pickerLight, setPickerLight] = useState(55)
  const [pickerPreview, setPickerPreview] = useState('#2F6BFF')

  useEffect(()=>{
    const params = new URLSearchParams(location.search)
    const hexParam = params.get('hex')
    if(hexParam && isValidHex(hexParam)){
      const normalized = normalizeHex(hexParam)
      setHexInput(normalized)
      setDisplayHex(normalized)
      convertHex(normalized, { updateUrl: false })
    }else if(!hexParam && location.search){
      setHexInput('')
      setDisplayHex('')
      setPantoneMatches([])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location.search])

  useEffect(()=>{
    if(!copiedField) return
    const timeoutId = window.setTimeout(()=>setCopiedField(null), 1500)
    return ()=>window.clearTimeout(timeoutId)
  },[copiedField])

  const userRgb = useMemo(()=> (displayHex ? getRgbLabel(displayHex) : ''), [displayHex])

  function handleInputChange(raw: string){
    const value = raw.replace(/[^a-f0-9#]/gi,'').toUpperCase()
    setHexInput(value)
    if(!value.trim()){
      setDisplayHex('')
      setPantoneMatches([])
      setError(null)
      if(location.search){
        navigate(location.pathname, { replace: true })
      }
      return
    }
    if(isValidHex(value)){
      const normalized = normalizeHex(value)
      setDisplayHex(normalized)
      setError(null)
    }
  }

  function handlePickColor(value: string){
    const normalized = normalizeHex(value)
    setHexInput(normalized)
    setDisplayHex(normalized)
    convertHex(normalized)
  }
  function openPickerPanel(){
    const source = displayHex && isValidHex(displayHex) ? displayHex : '#2F6BFF'
    try{
      const [h, s, l] = chroma(source).hsl()
      setPickerHue(Number.isFinite(h) ? Math.max(0, Math.min(360, h)) : 0)
      setPickerSat(Math.round((Number.isFinite(s) ? s : 0) * 100))
      setPickerLight(Math.round((Number.isFinite(l) ? l : 0.5) * 100))
      setPickerPreview(source)
    }catch{
      setPickerHue(210)
      setPickerSat(70)
      setPickerLight(55)
      setPickerPreview('#2F6BFF')
    }
    setPickerOpen(true)
  }

  function updatePickerPreview(next: { hue?: number; sat?: number; light?: number }){
    const hue = next.hue ?? pickerHue
    const sat = next.sat ?? pickerSat
    const light = next.light ?? pickerLight
    setPickerHue(hue)
    setPickerSat(sat)
    setPickerLight(light)
    try{
      const hex = chroma.hsl(hue, sat / 100, light / 100).hex().toUpperCase()
      setPickerPreview(hex)
    }catch{
      // ignore preview failure
    }
  }

  function applyPickerColor(){
    setPickerOpen(false)
    handlePickColor(pickerPreview)
  }

  function closePicker(){
    setPickerOpen(false)
  }

  function handleCopy(value: string, field: string){
    if(!value) return
    try{
      navigator.clipboard.writeText(value)
      setCopiedField(field)
    }catch{
      alert(pantone.copyError)
    }
  }

  function convertHex(hex?: string, options: { updateUrl?: boolean } = {}){
    const { updateUrl = true } = options
    const candidate = (hex ?? hexInput).trim()
    if(!candidate){
      setError(null)
      setPantoneMatches([])
      setDisplayHex('')
      if(updateUrl && location.search){
        navigate(location.pathname, { replace: true })
      }
      return
    }

    if(!isValidHex(candidate)){
      setError(pantone.invalidHex)
      setPantoneMatches([])
      return
    }

    try{
      const normalized = normalizeHex(candidate)
      setHexInput(normalized)
      setDisplayHex(normalized)
      const matches = findClosestPantones(normalized, 3)
      setPantoneMatches(matches)
      setError(null)

      if(updateUrl){
        const nextQuery = `?hex=${normalized.substring(1)}`
        if(location.search !== nextQuery){
          navigate(`${location.pathname}${nextQuery}`, { replace: true })
        }
      }
    }catch{
      setError(pantone.invalidHex)
      setPantoneMatches([])
    }
  }

  const primaryMatch = pantoneMatches[0] ?? null
  const pantoneResult = primaryMatch?.color ?? null
  const distanceLabel = primaryMatch ? `ΔE ${primaryMatch.distance.toFixed(2)}` : '—'
  const additionalMatches = pantoneMatches.slice(1)
  const canConvert = isValidHex(hexInput.trim())

  return (
    <div className="pantone-tool">
      <div className="pantone-header">
        <h2>{pantone.title}</h2>
        <p>{pantone.description}</p>
      </div>
      <div className="encode-card pantone-card">
        <div className="pantone-grid">
          <div className="pantone-preview" style={{ backgroundColor: displayHex || '#f4f4f5' }}>
            <span className="pantone-preview-hex">{displayHex || pantone.hexPlaceholder}</span>
            {userRgb && <span className="pantone-preview-rgb">{pantone.rgbLabel}: {userRgb}</span>}
          </div>
          <div className="pantone-form">
            <label htmlFor="pantone-hex">{pantone.inputLabel}</label>
            <div className="pantone-input-row">
              <input
                id="pantone-hex"
                className={`pantone-input ${error ? 'pantone-input-error' : ''}`}
                value={hexInput}
                onChange={(event)=>handleInputChange(event.target.value)}
                placeholder={pantone.hexPlaceholder}
                spellCheck={false}
                autoComplete="off"
                onKeyDown={event=>{
                  if(event.key === 'Enter'){
                    event.preventDefault()
                    convertHex()
                  }
                }}
              />
              <button
                type="button"
                className="pantone-picker-toggle"
                onClick={openPickerPanel}
              >
                {pantone.pickerLabel}
              </button>
            </div>
            {error && <p className="pantone-error" role="alert">{error}</p>}
            <div className="pantone-actions">
              <button
                type="button"
                className="toolbar-button"
                onClick={()=>convertHex()}
                disabled={!canConvert}
              >
                {pantone.convertBtn}
              </button>
            </div>
          </div>
        </div>
        {pantoneResult && !error && (
          <div className="pantone-result">
            <h3>{pantone.matchHeading}</h3>
            <div className="pantone-info-grid">
              <PantoneInfoRow
                label={pantone.nameLabel}
                value={pantoneResult.name}
                copyKey="name"
                onCopy={handleCopy}
                copiedField={copiedField}
                copyLabel={pantone.copyLabel}
                copySuccess={pantone.copySuccess}
              />
              <PantoneInfoRow
                label={pantone.codeLabel}
                value={pantoneResult.code}
                copyKey="code"
                onCopy={handleCopy}
                copiedField={copiedField}
                copyLabel={pantone.copyLabel}
                copySuccess={pantone.copySuccess}
              />
              <PantoneInfoRow
                label={pantone.hexLabel}
                value={pantoneResult.hex}
                copyKey="pantone-hex"
                onCopy={handleCopy}
                copiedField={copiedField}
                copyLabel={pantone.copyLabel}
                copySuccess={pantone.copySuccess}
              />
              <PantoneInfoRow
                label={pantone.rgbLabel}
                value={pantoneResult.rgb}
                copyKey="pantone-rgb"
                onCopy={handleCopy}
                copiedField={copiedField}
                copyLabel={pantone.copyLabel}
                copySuccess={pantone.copySuccess}
              />
              <PantoneInfoRow
                label={pantone.distanceLabel}
                value={distanceLabel}
                copyKey="pantone-distance"
                onCopy={handleCopy}
                copiedField={copiedField}
                copyLabel={pantone.copyLabel}
                copySuccess={pantone.copySuccess}
                copyable={false}
              />
            </div>
            <div className="pantone-comparison">
              <PantoneSwatch
                title={pantone.yourColorLabel}
                hex={displayHex}
                rgb={userRgb}
                copyKey="user-hex"
                onCopy={handleCopy}
                copiedField={copiedField}
                copyLabel={pantone.copyLabel}
                copySuccess={pantone.copySuccess}
              />
              <PantoneSwatch
                title={pantone.pantoneColorLabel}
                hex={pantoneResult.hex}
                rgb={pantoneResult.rgb}
                copyKey="pantone-match-hex"
                onCopy={handleCopy}
                copiedField={copiedField}
                copyLabel={pantone.copyLabel}
                copySuccess={pantone.copySuccess}
              />
            </div>
            {additionalMatches.length > 0 && (
              <div className="pantone-alt-matches">
                <p className="pantone-alt-heading">{pantone.alternatesHeading}</p>
                <div className="pantone-alt-grid">
                  {additionalMatches.map((match, index)=>{
                    const altKey = `alt-${match.color.code}-${index}`
                    return (
                      <div className="pantone-alt-card" key={altKey}>
                        <div className="pantone-alt-header">
                          <span className="pantone-alt-rank">{pantone.matchRankLabel} #{index + 2}</span>
                          <span className="pantone-alt-distance">ΔE {match.distance.toFixed(2)}</span>
                        </div>
                        <div className="pantone-alt-body">
                          <div className="pantone-alt-color" style={{ backgroundColor: match.color.hex }} />
                          <div className="pantone-alt-details">
                            <strong>{match.color.name}</strong>
                            <span>{match.color.code}</span>
                            <code>{match.color.hex}</code>
                            <span>{pantone.rgbLabel}: {match.color.rgb}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          className={`pantone-copy ${copiedField === altKey ? 'pantone-copy-active' : ''}`}
                          onClick={()=>handleCopy(match.color.hex, altKey)}
                          title={copiedField === altKey ? pantone.copySuccess : pantone.copyLabel}
                          aria-label={copiedField === altKey ? pantone.copySuccess : pantone.copyLabel}
                        >
                          <span className="pantone-copy-icon" aria-hidden="true" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {pickerOpen && (
        <div className="pantone-picker-overlay" role="dialog" aria-modal="true">
          <div className="pantone-picker-panel">
            <div className="pantone-picker-header">
              <h4>{pantone.pickerLabel}</h4>
              <button type="button" className="pantone-picker-close" onClick={closePicker}>×</button>
            </div>
            <div className="pantone-picker-preview" style={{ backgroundColor: pickerPreview }}>
              <code>{pickerPreview}</code>
            </div>
            <label>
              Hue
              <input
                type="range"
                min="0"
                max="360"
                value={pickerHue}
                onChange={(event)=>updatePickerPreview({ hue: Number(event.target.value) })}
              />
            </label>
            <label>
              Saturation
              <input
                type="range"
                min="0"
                max="100"
                value={pickerSat}
                onChange={(event)=>updatePickerPreview({ sat: Number(event.target.value) })}
              />
            </label>
            <label>
              Lightness
              <input
                type="range"
                min="0"
                max="100"
                value={pickerLight}
                onChange={(event)=>updatePickerPreview({ light: Number(event.target.value) })}
              />
            </label>
            <div className="pantone-picker-actions">
              <button type="button" className="toolbar-button" onClick={applyPickerColor}>
                {pantone.convertBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

type InfoProps = {
  label: string
  value: string
  copyKey: string
  copiedField: string | null
  copyLabel: string
  copySuccess: string
  onCopy: (value: string, field: string)=>void
  copyable?: boolean
}

function PantoneInfoRow({ label, value, copyKey, copiedField, copyLabel, copySuccess, onCopy, copyable = true }: InfoProps){
  return (
    <div className="pantone-info-row">
      <span>{label}</span>
      <div>
        <code>{value}</code>
        {copyable && (
          <button
            type="button"
            className={`pantone-copy ${copiedField === copyKey ? 'pantone-copy-active' : ''}`}
            onClick={()=>onCopy(value, copyKey)}
            title={copiedField === copyKey ? copySuccess : copyLabel}
            aria-label={copiedField === copyKey ? copySuccess : copyLabel}
          >
            <span className="pantone-copy-icon" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}

type SwatchProps = {
  title: string
  hex: string
  rgb: string
  copyKey: string
  copiedField: string | null
  copyLabel: string
  copySuccess: string
  onCopy: (value: string, field: string)=>void
}

function PantoneSwatch({ title, hex, rgb, copyKey, copiedField, copyLabel, copySuccess, onCopy }: SwatchProps){
  return (
    <div className="pantone-swatch">
      <div className="pantone-swatch-box" style={{ backgroundColor: hex }} />
      <div className="pantone-swatch-body">
        <p className="pantone-swatch-title">{title}</p>
        <code className="pantone-swatch-hex">{hex}</code>
        {rgb && <span className="pantone-swatch-rgb">RGB {rgb}</span>}
      </div>
      <button
        type="button"
        className={`pantone-copy ${copiedField === copyKey ? 'pantone-copy-active' : ''}`}
        onClick={()=>onCopy(hex, copyKey)}
        title={copiedField === copyKey ? copySuccess : copyLabel}
        aria-label={copiedField === copyKey ? copySuccess : copyLabel}
      >
        <span className="pantone-copy-icon" aria-hidden="true" />
      </button>
    </div>
  )
}
