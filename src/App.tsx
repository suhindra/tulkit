import React, { useState, useEffect, useMemo } from 'react'
const Formatter = React.lazy(()=>import('./components/Formatter'))
const Minifier = React.lazy(()=>import('./components/Minifier'))
const UuidGenerator = React.lazy(()=>import('./components/UuidGenerator'))
const EpochConverter = React.lazy(()=>import('./components/EpochConverter'))
const LoremIpsumGenerator = React.lazy(()=>import('./components/LoremIpsumGenerator'))
const Encoder = React.lazy(()=>import('./components/Encoder'))
const Decoder = React.lazy(()=>import('./components/Decoder'))
const HashGenerator = React.lazy(()=>import('./components/HashGenerator'))
import { useLocation, useNavigate } from 'react-router-dom'
import { getFormatterOverviewByTab, getUuidOverviewByVersion, getEpochOverview } from './pageOverviewContent'
import { getTranslations, languageNames } from './i18n'
import type { ActiveTab, CodecSubtool, LanguageCode, MinifyTab, UuidVersion } from './types'
import { detectLanguageFromPath, stripLanguagePrefix, buildPathWithLanguage } from './routing'
import { Helmet } from 'react-helmet-async'

type View = 'formatter' | 'minify' | 'uuid' | 'epoch' | 'encode' | 'decode' | 'lorem' | 'hash' | 'notfound'

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
  if(normalized.startsWith('/generator/hash') || normalized.startsWith('/hash')){
    return 'hash'
  }
  if(normalized.startsWith('/encode')){
    return 'encode'
  }
  if(normalized.startsWith('/decode')){
    return 'decode'
  }
  if(normalized.startsWith('/minify')){
    return 'minify'
  }
  if(normalized.startsWith('/generator/lorem')){
    return 'lorem'
  }
  if(normalized.startsWith('/formatter')){
    return 'formatter'
  }
  return 'notfound'
}

function getCodecSlugFromPath(path: string): CodecSubtool{
  const normalized = path.toLowerCase()
  const segments = normalized.split('/')
  const slug = segments[2]
  if(slug === 'base32' || slug === 'base58' || slug === 'hex'){
    return slug
  }
  if(slug === 'base64'){
    return 'base64'
  }
  return 'default'
}

type HashAlgorithmKey = 'sha1' | 'sha256' | 'sha512'

function getHashSlugFromPath(path: string): HashAlgorithmKey{
  const normalized = path.toLowerCase()
  const segments = normalized.split('/')
  // paths like /generator/hash/sha256 or /hash/sha256
  const slug = segments[3] || segments[2]
  if(slug === 'sha1' || slug === 'sha512'){
    return slug
  }
  return 'sha256'
}

function minifyTabFromActive(tab: ActiveTab): MinifyTab{
  if(tab === 'html' || tab === 'css' || tab === 'js' || tab === 'json'){
    return tab
  }
  return 'auto'
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
  const encodeSlug = useMemo<CodecSubtool>(()=> (view === 'encode' ? getCodecSlugFromPath(relativePath) : 'default'), [view, relativePath])
  const decodeSlug = useMemo<CodecSubtool>(()=> (view === 'decode' ? getCodecSlugFromPath(relativePath) : 'default'), [view, relativePath])
  const hashSlug = useMemo<HashAlgorithmKey>(()=> (view === 'hash' ? getHashSlugFromPath(relativePath) : 'sha256'), [view, relativePath])

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

  const activeMinifyTab = useMemo(()=>minifyTabFromActive(activeTab), [activeTab])
  const formatterOverview = getFormatterOverviewByTab(language)[activeTab]
  const minifyOverview = translations.overviews.minify
  const uuidOverview = getUuidOverviewByVersion(language)[uuidVersion]
  const epochOverview = getEpochOverview(language)
  const encodeOverview = translations.overviews.encode[encodeSlug]
  const decodeOverview = translations.overviews.decode[decodeSlug]
  const loremOverview = translations.overviews.lorem
  const hashOverview = translations.overviews.hash
  const encodeSeoBlurb = appCopy.seoBlurb.encode[encodeSlug]
  const decodeSeoBlurb = appCopy.seoBlurb.decode[decodeSlug]
  const uuidSeoBlurb = appCopy.seoBlurb.uuid[uuidVersion]
  const formatterSeoBlurb = appCopy.seoBlurb.formatter[activeTab] || appCopy.seoBlurb.formatter.auto
  const minifySeoBlurb = appCopy.seoBlurb.minify[activeMinifyTab] || appCopy.seoBlurb.minify.auto
  const hashSeoBlurb = appCopy.seoBlurb.hash[hashSlug]

  const seoHeading = useMemo(()=>{
    if(view === 'uuid'){
      if(uuidVersion === 'v1') return appCopy.seoTitles.uuidV1 || `${appCopy.seoTitles.uuid} V1`
      if(uuidVersion === 'v4') return appCopy.seoTitles.uuidV4 || `${appCopy.seoTitles.uuid} V4`
      if(uuidVersion === 'v7') return appCopy.seoTitles.uuidV7 || `${appCopy.seoTitles.uuid} V7`
      return appCopy.seoTitles.uuid
    }
    if(view === 'epoch'){
      return appCopy.seoTitles.epoch
    }
    if(view === 'hash'){
      return appCopy.seoTitles.hash
    }
    if(view === 'encode'){
      if(encodeSlug === 'base64') return appCopy.seoTitles.encodeBase64
      if(encodeSlug === 'base32') return appCopy.seoTitles.encodeBase32
      if(encodeSlug === 'base58') return appCopy.seoTitles.encodeBase58
      if(encodeSlug === 'hex') return appCopy.seoTitles.encodeHex
      return appCopy.seoTitles.encode
    }
    if(view === 'decode'){
      if(decodeSlug === 'base64') return appCopy.seoTitles.decodeBase64
      if(decodeSlug === 'base32') return appCopy.seoTitles.decodeBase32
      if(decodeSlug === 'base58') return appCopy.seoTitles.decodeBase58
      if(decodeSlug === 'hex') return appCopy.seoTitles.decodeHex
      return appCopy.seoTitles.decode
    }
    if(view === 'minify'){
      if(activeMinifyTab === 'html') return appCopy.seoTitles.minifyHtml || appCopy.seoTitles.minify
      if(activeMinifyTab === 'xml') return appCopy.seoTitles.minifyXml || appCopy.seoTitles.minify
      if(activeMinifyTab === 'css') return appCopy.seoTitles.minifyCss || appCopy.seoTitles.minify
      if(activeMinifyTab === 'js') return appCopy.seoTitles.minifyJs || appCopy.seoTitles.minify
      if(activeMinifyTab === 'json') return appCopy.seoTitles.minifyJson || appCopy.seoTitles.minify
      return appCopy.seoTitles.minify
    }
    if(view === 'lorem'){
      return appCopy.seoTitles.lorem
    }
    if(view === 'notfound'){
      return appCopy.seoTitles.notFound
    }
    if(activeTab === 'auto'){
      return appCopy.seoTitles.formatterDefault
    }
    if(activeTab === 'html') return appCopy.seoTitles.formatterHtml || `${headingByTab.html} — Tulkit`
    if(activeTab === 'xml') return appCopy.seoTitles.formatterXml || `${headingByTab.xml} — Tulkit`
    if(activeTab === 'yaml') return appCopy.seoTitles.formatterYaml || `${headingByTab.yaml} — Tulkit`
    if(activeTab === 'css') return appCopy.seoTitles.formatterCss || `${headingByTab.css} — Tulkit`
    if(activeTab === 'js') return appCopy.seoTitles.formatterJs || `${headingByTab.js} — Tulkit`
    if(activeTab === 'json') return appCopy.seoTitles.formatterJson || `${headingByTab.json} — Tulkit`
    if(activeTab === 'sql') return appCopy.seoTitles.formatterSql || `${headingByTab.sql} — Tulkit`
    if(activeTab === 'php') return appCopy.seoTitles.formatterPhp || `${headingByTab.php} — Tulkit`
    return appCopy.seoTitles.formatterDefault
  },[view, uuidVersion, appCopy, activeTab, headingByTab, encodeSlug, decodeSlug, activeMinifyTab])

  const metaDescription = useMemo(()=>{
    if(view === 'uuid'){
      return uuidDescriptionByVersion[uuidVersion]
    }
    if(view === 'epoch'){
      return appCopy.epochMetaDescription
    }
    if(view === 'encode'){
      let selected = appCopy.encodeMetaDescription
      if(encodeSlug === 'base64') selected = appCopy.encodeBase64MetaDescription
      else if(encodeSlug === 'base32') selected = appCopy.encodeBase32MetaDescription
      else if(encodeSlug === 'base58') selected = appCopy.encodeBase58MetaDescription
      else if(encodeSlug === 'hex') selected = appCopy.encodeHexMetaDescription
      return selected
    }
    if(view === 'decode'){
      let selected = appCopy.decodeMetaDescription
      if(decodeSlug === 'base64') selected = appCopy.decodeBase64MetaDescription
      else if(decodeSlug === 'base32') selected = appCopy.decodeBase32MetaDescription
      else if(decodeSlug === 'base58') selected = appCopy.decodeBase58MetaDescription
      else if(decodeSlug === 'hex') selected = appCopy.decodeHexMetaDescription
      return selected
    }
    if(view === 'minify'){
      const map = appCopy.minifyMetaDescription
      return map[activeMinifyTab] || map.auto
    }
    if(view === 'hash'){
      const map = appCopy.hashMetaDescription
      return map[hashSlug] || map.sha256
    }
    if(view === 'lorem'){
      return appCopy.loremMetaDescription
    }
    if(view === 'notfound'){
      return appCopy.notFoundMetaDescription
    }
    const key: ActiveTab = activeTab || 'auto'
    return descriptionByTab[key]
  },[view, uuidVersion, appCopy, activeTab, descriptionByTab, uuidDescriptionByVersion, encodeSlug, decodeSlug, activeMinifyTab, hashSlug])

  useEffect(()=>{
    if(typeof document === 'undefined') return
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if(!meta){
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = metaDescription
  },[metaDescription])

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
    }else if(view === 'minify'){
      pageName = appCopy.navMinify
    }else if(view === 'uuid'){
      pageName = `${appCopy.navUuid} ${uuidVersion.toUpperCase()}`
    }else if(view === 'epoch'){
      pageName = appCopy.navEpoch
    }else if(view === 'encode'){
      pageName = appCopy.navEncode
    }else if(view === 'decode'){
      pageName = appCopy.navDecode
    }else if(view === 'hash'){
      pageName = appCopy.navHash
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

  function goToMinify(){
    navigate(appendSearch('/minify'))
  }

  function goToHash(){
    navigate(appendSearch('/generator/hash'))
  }

  function goToLorem(){
    navigate(appendSearch('/generator/lorem'))
  }

  return (
    <div className="app">
      <Helmet>
        <title>{seoHeading}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
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
                href={buildPathWithLanguage('/minify', language)}
                className={`top-nav-item ${view === 'minify' ? 'active' : ''}`}
                onClick={e=>{
                  e.preventDefault()
                  goToMinify()
                }}
              >
                {appCopy.navMinify}
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
                href={buildPathWithLanguage('/generator/hash', language)}
                className={`top-nav-item ${view === 'hash' ? 'active' : ''}`}
                onClick={e=>{
                  e.preventDefault()
                  goToHash()
                }}
              >
                {appCopy.navHash}
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
                {formatterSeoBlurb.map(text=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'uuid' && (
              <>
                {uuidSeoBlurb.map(text=>(
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
                {encodeSeoBlurb.map(text=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'minify' && (
              <>
                {minifySeoBlurb.map(text=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'hash' && (
              <>
                {hashSeoBlurb.map(text=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'decode' && (
              <>
                {decodeSeoBlurb.map(text=>(
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
        {view === 'formatter' && (
          <React.Suspense fallback={<div className="formatter">{'Loading…'}</div>}>
            <Formatter onTabChange={setActiveTab} language={language} />
          </React.Suspense>
        )}
        {view === 'minify' && (
          <React.Suspense fallback={<div className="formatter">{'Loading…'}</div>}>
            <Minifier language={language} onTabChange={setActiveTab} />
          </React.Suspense>
        )}
        {view === 'uuid' && (
          <React.Suspense fallback={<div className="encode-card">{'Loading…'}</div>}>
            <UuidGenerator onVersionChange={setUuidVersion} language={language} />
          </React.Suspense>
        )}
        {view === 'epoch' && (
          <React.Suspense fallback={<div className="encode-card">{'Loading…'}</div>}>
            <EpochConverter language={language} />
          </React.Suspense>
        )}
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
        {view === 'hash' && (
          <React.Suspense fallback={<div className="encode-card">{'Loading…'}</div>}>
            <HashGenerator language={language} />
          </React.Suspense>
        )}
        {view === 'lorem' && (
          <React.Suspense fallback={<div className="encode-card">{'Loading…'}</div>}>
            <LoremIpsumGenerator language={language} />
          </React.Suspense>
        )}
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
            {view === 'minify' && (
              <>
                <h2>{minifyOverview.heading}</h2>
                {minifyOverview.paragraphs.map(text=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'decode' && (
              <>
                <h2>{decodeOverview.heading}</h2>
                {decodeOverview.paragraphs.map(text=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'hash' && (
              <>
                <h2>{hashOverview.heading}</h2>
                {hashOverview.paragraphs.map(text=>(
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
