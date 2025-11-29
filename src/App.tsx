import React, { useState, useEffect } from 'react'
import Formatter from './components/Formatter'
import UuidGenerator from './components/UuidGenerator'
import EpochConverter from './components/EpochConverter'
import { getFormatterOverviewByTab, getUuidOverviewByVersion, getEpochOverview } from './pageOverviewContent'
import { getTranslations, languageNames } from './i18n'
import type { ActiveTab, LanguageCode, UuidVersion } from './types'
import { detectLanguageFromPath, stripLanguagePrefix, buildPathWithLanguage } from './routing'

declare global {
  interface Window {
    kofiWidgetOverlay?: {
      draw: (...args: any[]) => void
    }
  }
}

type View = 'formatter' | 'uuid' | 'epoch' | 'notfound'

export default function App(){
  const [language, setLanguage] = useState<LanguageCode>(() => {
    if(typeof window !== 'undefined'){
      const pathLang = detectLanguageFromPath(window.location.pathname)
      if(pathLang === 'id'){
        return 'id'
      }
      try{
        const stored = window.localStorage.getItem('tulkit-language')
        if(stored === 'id' || stored === 'en'){
          return stored
        }
      }catch{
        // ignore
      }
    }
    return 'en'
  })
  const [activeTab, setActiveTab] = useState<ActiveTab>('auto')
  const [view, setView] = useState<View>('formatter')
  const [uuidVersion, setUuidVersion] = useState<UuidVersion>('v4')

  useEffect(()=>{
    if(typeof window === 'undefined') return
    const current = window.location.pathname
    const relative = stripLanguagePrefix(current)
    const target = buildPathWithLanguage(relative, language)
    if(target !== current){
      const nextUrl = `${target}${window.location.search}`
      window.history.replaceState(null, '', nextUrl)
    }
  },[language])

  useEffect(()=>{
    document.documentElement.lang = language
  },[language])

  useEffect(()=>{
    try{
      window.localStorage.setItem('tulkit-language', language)
    }catch{
      // ignore
    }
  },[language])

  const translations = getTranslations(language)
  const { app: appCopy, headingByTab, descriptionByTab, uuidDescriptionByVersion } = translations

  const formatterOverview = getFormatterOverviewByTab(language)[activeTab]
  const uuidOverview = getUuidOverviewByVersion(language)[uuidVersion]
  const epochOverview = getEpochOverview(language)

  const seoHeading =
    view === 'uuid'
      ? `${appCopy.seoTitles.uuid} ${uuidVersion.toUpperCase()}`
      : view === 'epoch'
        ? appCopy.seoTitles.epoch
        : view === 'notfound'
          ? appCopy.seoTitles.notFound
          : activeTab === 'auto'
            ? appCopy.seoTitles.formatterDefault
            : `${headingByTab[activeTab as Exclude<ActiveTab,'auto'>]} — Tulkit`

  useEffect(()=>{
    document.title = seoHeading
  },[seoHeading])

  useEffect(()=>{
    const path = stripLanguagePrefix(window.location.pathname).toLowerCase()
    if(path === '/' || path === ''){
      setView('formatter')
    }else if(path.startsWith('/converter/epoch')){
      setView('epoch')
    }else if(path.startsWith('/generator/uuid') || path.startsWith('/uuid')){
      setView('uuid')
    }else if(path.startsWith('/formatter')){
      setView('formatter')
    }else{
      setView('notfound')
    }
  },[])

  useEffect(()=>{
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if(!meta) return

    if(view === 'uuid'){
      meta.content = uuidDescriptionByVersion[uuidVersion]
      return
    }

    if(view === 'epoch'){
      meta.content = appCopy.epochMetaDescription
      return
    }

    if(view === 'notfound'){
      meta.content = appCopy.notFoundMetaDescription
      return
    }

    const key: ActiveTab = activeTab || 'auto'
    meta.content = descriptionByTab[key]
  },[view, activeTab, uuidVersion, descriptionByTab, uuidDescriptionByVersion, appCopy])

  useEffect(()=>{
    if(typeof window === 'undefined') return
    const relativePath = stripLanguagePrefix(window.location.pathname) || '/'
    const origin = window.location.origin.replace(/\/+$/,'')
    const ensureSlash = (path:string)=>path.startsWith('/') ? path : `/${path}`
    const enPath = ensureSlash(relativePath === '' ? '/' : relativePath)
    const idPath = buildPathWithLanguage(enPath, 'id')
    const defaultHref = `${origin}/`
    const alternates = [
      { href: `${origin}${enPath}`, hreflang: 'en' },
      { href: `${origin}${idPath}`, hreflang: 'id-ID' },
      { href: defaultHref, hreflang: 'x-default' }
    ]
    alternates.forEach(({ href, hreflang })=>{
      let link = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`)
      if(!link){
        link = document.createElement('link')
        link.rel = 'alternate'
        link.setAttribute('hreflang', hreflang)
        document.head.appendChild(link)
      }
      link.href = href
    })
  },[view, activeTab, uuidVersion, language])

  useEffect(()=>{
    if(typeof window === 'undefined') return
    const relativePath = stripLanguagePrefix(window.location.pathname) || '/'
    const origin = window.location.origin.replace(/\/+$/,'')
    const ensureSlash = (path:string)=>path.startsWith('/') ? path : `/${path}`
    const currentPath = buildPathWithLanguage(ensureSlash(relativePath), language)
    const canonicalHref = `${origin}${currentPath}`
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if(!canonical){
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalHref
  },[view, activeTab, uuidVersion, language])

  useEffect(()=>{
    const existing = document.getElementById('kofi-overlay-widget')
    if(existing) return

    const script = document.createElement('script')
    script.id = 'kofi-overlay-widget'
    script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'
    script.async = true
    script.onload = ()=>{
      if(window.kofiWidgetOverlay){
        window.kofiWidgetOverlay.draw('tulkit', {
          type: 'floating-chat',
          'floating-chat.donateButton.text': 'Donate',
          'floating-chat.donateButton.background-color': '#323842',
          'floating-chat.donateButton.text-color': '#fff'
        })
      }
    }
    document.body.appendChild(script)
  },[])

  function goToFormatter(){
    const url = `${buildPathWithLanguage('/formatter', language)}${window.location.search}`
    window.history.replaceState(null, '', url)
    setView('formatter')
  }

  function goToUuid(){
    const url = `${buildPathWithLanguage('/generator/uuid', language)}${window.location.search}`
    window.history.replaceState(null, '', url)
    setView('uuid')
  }

  function goToEpoch(){
    const url = `${buildPathWithLanguage('/converter/epoch', language)}${window.location.search}`
    window.history.replaceState(null, '', url)
    setView('epoch')
  }

  return (
    <div className="app">
      <header>
        <div className="container">
          <div className="brand">
            <div className="brand-logo">
              <img src="/logo-tulkit.jpg" alt={appCopy.logoAlt} loading="lazy" />
            </div>
            <div className="brand-text">
              <h1>{appCopy.brandHeading}</h1>
              <p>{appCopy.brandSubheading}</p>
              <p className="brand-note">
                {appCopy.brandNote}
              </p>
            </div>
          </div>
          <div className="header-actions">
            <nav className="top-nav">
              <a
                href={buildPathWithLanguage('/formatter', language)}
                className={`top-nav-item ${view === 'formatter' ? 'active' : ''}`}
                onClick={e=>{
                  e.preventDefault()
                  goToFormatter()
                }}
              >
                {appCopy.navFormatter}
              </a>
              <a
                href={buildPathWithLanguage('/generator/uuid', language)}
                className={`top-nav-item ${view === 'uuid' ? 'active' : ''}`}
                onClick={e=>{
                  e.preventDefault()
                  goToUuid()
                }}
              >
                {appCopy.navUuid}
              </a>
              <a
                href={buildPathWithLanguage('/converter/epoch', language)}
                className={`top-nav-item ${view === 'epoch' ? 'active' : ''}`}
                onClick={e=>{
                  e.preventDefault()
                  goToEpoch()
                }}
              >
                {appCopy.navEpoch}
              </a>
            </nav>
            <label className="language-switcher">
              <span>{appCopy.languageSwitcherLabel}</span>
              <select
                value={language}
                onChange={e=>setLanguage(e.target.value as LanguageCode)}
              >
                {Object.entries(languageNames).map(([code, label])=>(
                  <option key={code} value={code}>{label}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </header>
      {view !== 'notfound' && (
        <section className="seo-blurb">
          <div className="container">
            <h2>{seoHeading}</h2>
            {view === 'formatter' && (
              <>
                {appCopy.seoBlurb.formatter.map(text=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'uuid' && (
              <>
                {appCopy.seoBlurb.uuid.map(text=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'epoch' && (
              <>
                {appCopy.seoBlurb.epoch.map(text=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
          </div>
        </section>
      )}
      <main className="container">
        {view === 'formatter' && <Formatter onTabChange={setActiveTab} language={language} />}
        {view === 'uuid' && <UuidGenerator onVersionChange={setUuidVersion} language={language} />}
        {view === 'epoch' && <EpochConverter language={language} />}
        {view === 'notfound' && (
          <div className="not-found-card">
            <h2>{appCopy.notFoundHeading}</h2>
            <p>{appCopy.notFoundBody}</p>
            <button type="button" className="toolbar-button" onClick={goToFormatter}>
              {appCopy.goToFormatterCta}
            </button>
          </div>
        )}
      </main>
      {view !== 'notfound' && (
        <section className="page-overview">
          <div className="container">
            {view === 'formatter' && (
              <>
                <h2>{formatterOverview.heading}</h2>
                {formatterOverview.paragraphs.map(text=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'uuid' && (
              <>
                <h2>{uuidOverview.heading}</h2>
                {uuidOverview.paragraphs.map(text=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'epoch' && (
              <>
                <h2>{epochOverview.heading}</h2>
                {epochOverview.paragraphs.map(text=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
          </div>
        </section>
      )}
      <footer>
        <div className="container"><small>{appCopy.footerNote}</small></div>
      </footer>
    </div>
  )
}
