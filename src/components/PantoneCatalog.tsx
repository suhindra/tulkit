import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { LanguageCode } from '../types'
import { getTranslations } from '../i18n'
import {
  PANTONE_COLORS,
  type PantoneColor,
  getPantoneSlug,
  findPantoneBySlug
} from '../data/pantoneColors'
import { buildPathWithLanguage } from '../routing'

type Props = {
  language: LanguageCode
  slug: string | null
}

export default function PantoneCatalog({ language, slug }: Props){
  const { pantoneCatalog, pantone } = getTranslations(language)
  const navigate = useNavigate()
  const location = useLocation()
  const slugMatch = useMemo(()=> (slug ? findPantoneBySlug(slug) : null), [slug])
  const [search, setSearch] = useState('')
  const [selectedColor, setSelectedColor] = useState<PantoneColor | null>(()=> slugMatch || PANTONE_COLORS[0] || null)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const basePath = '/pantone/pantone-to-hex'

  useEffect(()=>{
    if(slug){
      if(slugMatch){
        setSelectedColor(slugMatch)
      }
      return
    }
    if(!selectedColor && PANTONE_COLORS.length > 0){
      setSelectedColor(PANTONE_COLORS[0])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[slug, slugMatch])

  useEffect(()=>{
    if(!copiedField) return
    const timeoutId = window.setTimeout(()=>setCopiedField(null), 1500)
    return ()=>window.clearTimeout(timeoutId)
  },[copiedField])

  const filteredColors = useMemo(()=>{
    const term = search.trim().toLowerCase()
    if(!term){
      return PANTONE_COLORS
    }
    return PANTONE_COLORS.filter(color=>{
      const haystack = `${color.name} ${color.code} ${color.hex}`.toLowerCase()
      return haystack.includes(term)
    })
  },[search])

  useEffect(()=>{
    if(!selectedColor){
      if(filteredColors.length > 0){
        const fallback = filteredColors[0] || null
        setSelectedColor(fallback)
        syncUrlToColor(fallback, { replace: true })
      }else if(slug){
        syncUrlToColor(null, { replace: true })
      }
      return
    }
    const exists = filteredColors.some(color => color.code === selectedColor.code)
    if(!exists){
      const fallback = filteredColors[0] || null
      setSelectedColor(fallback)
      syncUrlToColor(fallback, { replace: true })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[filteredColors])

  function syncUrlToColor(color: PantoneColor | null, options: { replace?: boolean } = {}){
    const { replace = false } = options
    const slugSegment = color ? `/${getPantoneSlug(color.code)}` : ''
    const relative = `${basePath}${slugSegment}`
    const target = buildPathWithLanguage(relative, language)
    if(target !== location.pathname){
      navigate(target, { replace })
    }
  }

  function handleSelect(color: PantoneColor){
    setSelectedColor(color)
    syncUrlToColor(color)
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

  const converterHref = buildPathWithLanguage('/pantone/hex-to-pantone', language)
  const slugNotFound = Boolean(slug && !slugMatch)

  return (
    <div className="pantone-tool pantone-catalog">
      <div className="pantone-header">
        <h2>{pantoneCatalog.title}</h2>
        <p>{pantoneCatalog.description}</p>
      </div>
      <div className="pantone-card pantone-catalog-grid">
        <aside className="pantone-catalog-list">
          <label htmlFor="pantone-catalog-search">{pantoneCatalog.searchLabel}</label>
          <div className="pantone-catalog-search">
            <input
              id="pantone-catalog-search"
              value={search}
              placeholder={pantoneCatalog.searchPlaceholder}
              onChange={event=>setSearch(event.target.value)}
              autoComplete="off"
              spellCheck={false}
            />
            {search && (
              <button type="button" onClick={()=>setSearch('')} className="pantone-catalog-clear">
                {pantoneCatalog.clearSearch}
              </button>
            )}
          </div>
          <p className="pantone-catalog-list-heading">{pantoneCatalog.listHeading}</p>
          {filteredColors.length === 0 && (
            <p className="pantone-catalog-empty">{pantoneCatalog.emptyState}</p>
          )}
          <ul>
            {filteredColors.map(color=>{
              const colorSlug = getPantoneSlug(color.code)
              const href = buildPathWithLanguage(`${basePath}/${colorSlug}`, language)
              const isActive = selectedColor ? selectedColor.code === color.code : false
              return (
                <li key={color.code}>
                  <a
                    href={href}
                    className={`pantone-catalog-item ${isActive ? 'active' : ''}`}
                    onClick={event=>{
                      event.preventDefault()
                      handleSelect(color)
                    }}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span className="pantone-catalog-item-name">{color.name}</span>
                    <span className="pantone-catalog-item-code">{color.code}</span>
                    <span className="pantone-catalog-item-hex">{color.hex}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </aside>
        <section className="pantone-catalog-detail">
          {slugNotFound && (
            <div className="pantone-catalog-empty">
              {pantoneCatalog.notFoundMessage}
            </div>
          )}
          {!slugNotFound && selectedColor && (
            <>
              <div className="pantone-detail-card">
                <div className="pantone-detail-swatch" style={{ backgroundColor: selectedColor.hex }} />
                <h3>{selectedColor.name}</h3>
                <div className="pantone-detail-meta">
                  <DetailRow label={pantone.codeLabel} value={selectedColor.code} />
                  <DetailRow
                    label={pantone.hexLabel}
                    value={selectedColor.hex}
                    actionLabel={copiedField === 'hex' ? pantone.copySuccess : pantone.copyLabel}
                    isActive={copiedField === 'hex'}
                    onAction={()=>handleCopy(selectedColor.hex, 'hex')}
                  />
                  <DetailRow
                    label={pantone.rgbLabel}
                    value={selectedColor.rgb}
                    actionLabel={copiedField === 'rgb' ? pantone.copySuccess : pantone.copyLabel}
                    isActive={copiedField === 'rgb'}
                    onAction={()=>handleCopy(selectedColor.rgb, 'rgb')}
                  />
                </div>
              </div>
              <div className="pantone-catalog-cta">
                <p>{pantoneCatalog.converterCta}</p>
                <a href={converterHref} className="toolbar-button">
                  {pantoneCatalog.converterCtaButton}
                </a>
              </div>
            </>
          )}
          {!slugNotFound && !selectedColor && (
            <div className="pantone-catalog-empty">
              {pantoneCatalog.emptyState}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

type DetailRowProps = {
  label: string
  value: string
  actionLabel?: string
  onAction?: ()=>void
  isActive?: boolean
}

function DetailRow({ label, value, actionLabel, onAction, isActive }: DetailRowProps){
  return (
    <div className="pantone-detail-row">
      <div>
        <span className="pantone-detail-label">{label}</span>
        <code>{value}</code>
      </div>
      {actionLabel && onAction && (
        <button
          type="button"
          className={`pantone-copy ${isActive ? 'pantone-copy-active' : ''}`}
          onClick={onAction}
          title={actionLabel}
          aria-label={actionLabel}
        >
          <span className="pantone-copy-icon" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
