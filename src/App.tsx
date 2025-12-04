import React, { useState, useEffect, useMemo } from 'react'
import Formatter from './components/Formatter'
import UuidGenerator from './components/UuidGenerator'
import EpochConverter from './components/EpochConverter'
import LoremIpsumGenerator from './components/LoremIpsumGenerator'
const Encoder = React.lazy(()=>import('./components/Encoder'))
const Decoder = React.lazy(()=>import('./components/Decoder'))
import { useLocation, useNavigate } from 'react-router-dom'
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

type View = 'formatter' | 'uuid' | 'epoch' | 'encode' | 'decode' | 'lorem' | 'notfound'

function getViewFromPath(path: string): View{
  const normalized = path.toLowerCase()
  if(normalized === '/' || normalized === ''){
    return 'formatter'
  }
  if(normalized.startsWith('/converter/epoch')){
    return 'epoch'
  }
  if(normalized.startsWith('/generator/uuid') || normalized.startsWith('/uuid')){
    return 'uuid'
  }
  if(normalized.startsWith('/encode')){
    return 'encode'
  }
  if(normalized.startsWith('/decode')){
    return 'decode'
  }
  if(normalized.startsWith('/generator/lorem')){
    return 'lorem'
  }
  if(normalized.startsWith('/formatter')){
    return 'formatter'
  }
  return 'notfound'
}

export default function App(){
  const location = useLocation()
  const navigate = useNavigate()
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
  const [uuidVersion, setUuidVersion] = useState<UuidVersion>('v4')
  const relativePath = useMemo(()=>stripLanguagePrefix(location.pathname) || '/', [location.pathname])
  const view = useMemo(()=>getViewFromPath(relativePath), [relativePath])

  useEffect(()=>{
    const detected = detectLanguageFromPath(location.pathname)
    if(detected !== 'en'){
      setLanguage(prev=>prev === detected ? prev : detected)
    }
  },[location.pathname])

  useEffect(()=>{
    const current = location.pathname
    const relative = stripLanguagePrefix(current) || '/'
    const target = buildPathWithLanguage(relative, language)
    if(target !== current){
      const nextUrl = `${target}${location.search}`
      navigate(nextUrl, { replace: true })
    }
  },[language, location.pathname, location.search, navigate])

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
  const encodeOverview = translations.overviews.encode
  const loremOverview = translations.overviews.lorem

  const seoHeading =
    view === 'uuid'
      ? `${appCopy.seoTitles.uuid} ${uuidVersion.toUpperCase()}`
      : view === 'epoch'
        ? appCopy.seoTitles.epoch
        : view === 'encode'
          ? appCopy.seoTitles.encode
          : view === 'decode'
            ? appCopy.seoTitles.decode
            : view === 'lorem'
              ? appCopy.seoTitles.lorem
              : view === 'notfound'
                ? appCopy.seoTitles.notFound
                : activeTab === 'auto'
                  ? appCopy.seoTitles.formatterDefault
                  : `${headingByTab[activeTab as Exclude<ActiveTab,'auto'>]} — Tulkit`

  useEffect(()=>{
    document.title = seoHeading
  },[seoHeading])

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

    if(view === 'encode'){
      meta.content = appCopy.encodeMetaDescription
      return
    }

    if(view === 'decode'){
      meta.content = appCopy.decodeMetaDescription
      return
    }

    if(view === 'lorem'){
      meta.content = appCopy.loremMetaDescription
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
    const origin = window.location.origin.replace(/\/+$/,'')
    const ensureSlash = (path:string)=>path.startsWith('/') ? path : `/${path}`
    const normalized = relativePath === '' ? '/' : relativePath
    const enPath = ensureSlash(normalized)
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
  },[relativePath, view, activeTab, uuidVersion, language])

  useEffect(()=>{
    if(typeof window === 'undefined') return
    const origin = window.location.origin.replace(/\/+$/,'')
    const ensureSlash = (path:string)=>path.startsWith('/') ? path : `/${path}`
    const currentPath = buildPathWithLanguage(ensureSlash(relativePath || '/'), language)
    const canonicalHref = `${origin}${currentPath}`
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if(!canonical){
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalHref
  },[relativePath, view, activeTab, uuidVersion, language])

  useEffect(()=>{
    if(typeof window === 'undefined') return

    const existing = document.getElementById('tulkit-breadcrumb-schema')
    if(view === 'notfound'){
      if(existing){
        existing.remove()
      }
      return
    }

    const origin = window.location.origin.replace(/\/+$/,'')
    const ensureSlash = (path:string)=>path.startsWith('/') ? path : `/${path}`
    const currentPath = buildPathWithLanguage(ensureSlash(relativePath || '/'), language)
    const currentUrl = `${origin}${currentPath}`
    const homePath = buildPathWithLanguage('/', language)
    const homeUrl = `${origin}${homePath}`

    const homeName = language === 'id' ? 'Beranda' : 'Home'
    let pageName = seoHeading

    if(view === 'formatter'){
      pageName = appCopy.navFormatter
    }else if(view === 'uuid'){
      pageName = `${appCopy.navUuid} ${uuidVersion.toUpperCase()}`
    }else if(view === 'epoch'){
      pageName = appCopy.navEpoch
    }else if(view === 'encode'){
      pageName = appCopy.navEncode
    }else if(view === 'decode'){
      pageName = appCopy.navDecode
    }else if(view === 'lorem'){
      pageName = appCopy.navLorem
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: homeName,
          item: homeUrl
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: pageName,
          item: currentUrl
        }
      ]
    }

    let script = existing as HTMLScriptElement | null
    if(!script){
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'tulkit-breadcrumb-schema'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(jsonLd)
  },[view, language, seoHeading, appCopy, uuidVersion, relativePath])

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

  const appendSearch = (path: string)=>{
    const basePath = buildPathWithLanguage(path, language)
    return location.search ? `${basePath}${location.search}` : basePath
  }

  function goToFormatter(){
    navigate(appendSearch('/formatter'))
  }

  function goToUuid(){
    navigate(appendSearch('/generator/uuid'))
  }

  function goToEpoch(){
    navigate(appendSearch('/converter/epoch'))
  }

  function goToEncode(){
    navigate(appendSearch('/encode'))
  }

  function goToDecode(){
    navigate(appendSearch('/decode'))
  }

  function goToLorem(){
    navigate(appendSearch('/generator/lorem'))
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
              <a
                href={buildPathWithLanguage('/encode', language)}
                className={`top-nav-item ${view === 'encode' ? 'active' : ''}`}
                onClick={e=>{
                  e.preventDefault()
                  goToEncode()
                }}
              >
                {appCopy.navEncode}
              </a>
              <a
                href={buildPathWithLanguage('/decode', language)}
                className={`top-nav-item ${view === 'decode' ? 'active' : ''}`}
                onClick={e=>{
                  e.preventDefault()
                  goToDecode()
                }}
              >
                {appCopy.navDecode}
              </a>
              <a
                href={buildPathWithLanguage('/generator/lorem', language)}
                className={`top-nav-item ${view === 'lorem' ? 'active' : ''}`}
                onClick={e=>{
                  e.preventDefault()
                  goToLorem()
                }}
              >
                {appCopy.navLorem}
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
            {view === 'encode' && (
              <>
                {appCopy.seoBlurb.encode.map(text=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'decode' && (
              <>
                {appCopy.seoBlurb.decode.map(text=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'lorem' && (
              <>
                {appCopy.seoBlurb.lorem.map(text=>(
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
        {view === 'encode' && (
          <React.Suspense fallback={<div className="encode-card">{'Loading…'}</div>}>
            <Encoder language={language} />
          </React.Suspense>
        )}
        {view === 'decode' && (
          <React.Suspense fallback={<div className="encode-card">{'Loading…'}</div>}>
            <Decoder language={language} />
          </React.Suspense>
        )}
        {view === 'lorem' && <LoremIpsumGenerator language={language} />}
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
            {view === 'encode' && (
              <>
                <h2>{encodeOverview.heading}</h2>
                {encodeOverview.paragraphs.map(text=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'decode' && (
              <>
                <h2>{translations.overviews.decode.heading}</h2>
                {translations.overviews.decode.paragraphs.map(text=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'lorem' && (
              <>
                <h2>{loremOverview.heading}</h2>
                {loremOverview.paragraphs.map(text=>(
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
