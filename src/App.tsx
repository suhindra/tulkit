import React, { useState, useEffect, useMemo } from 'react'
import Navbar from './components/Navbar'
import Formatter from './components/Formatter'
const Minifier = React.lazy(()=>import('./components/Minifier'))
const UuidGenerator = React.lazy(()=>import('./components/UuidGenerator'))
const EpochConverter = React.lazy(()=>import('./components/EpochConverter'))
const LoremIpsumGenerator = React.lazy(()=>import('./components/LoremIpsumGenerator'))
const Encoder = React.lazy(()=>import('./components/Encoder'))
const Decoder = React.lazy(()=>import('./components/Decoder'))
const HashGenerator = React.lazy(()=>import('./components/HashGenerator'))
const CaseConverter = React.lazy(()=>import('./components/CaseConverter'))
import { useLocation, useNavigate } from 'react-router-dom'
import { getFormatterOverviewByTab, getUuidOverviewByVersion, getEpochOverview, getCaseOverview } from './pageOverviewContent'
import { getTranslations } from './i18n'
import { formatterLangs, type ActiveTab, type CodecSubtool, type LanguageCode, type MinifyTab, type UuidVersion } from './types'
import { detectLanguageFromPath, stripLanguagePrefix, buildPathWithLanguage } from './routing'
import { Helmet } from 'react-helmet-async'

type View = 'formatter' | 'minify' | 'uuid' | 'epoch' | 'encode' | 'decode' | 'lorem' | 'hash' | 'case' | 'notfound'

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
  if(normalized.startsWith('/generator/case') || normalized.startsWith('/case')){
    return 'case'
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

type FormatterDetailTab = Exclude<ActiveTab,'auto'>
type MinifyDetailTab = Exclude<MinifyTab,'auto'>
type Translations = ReturnType<typeof getTranslations>
type AppCopy = Translations['app']
type MinifierInfo = Translations['minifierLangInfo']
type UuidCopy = Translations['uuid']
type HashCopy = Translations['hash']
type BreadcrumbItem = { name: string; url: string }

const FORMATTER_SETTINGS_KEY = 'tulkit-formatter-settings'
const MINIFIER_SETTINGS_KEY = 'tulkit-minifier-settings'

const formatterSlugToTabMap: Record<string,FormatterDetailTab> = {
  html: 'html',
  xml: 'xml',
  yaml: 'yaml',
  css: 'css',
  javascript: 'js',
  js: 'js',
  json: 'json',
  sql: 'sql',
  php: 'php',
  yml: 'yaml'
}

const minifySlugToTabMap: Record<string,MinifyDetailTab> = {
  html: 'html',
  css: 'css',
  javascript: 'js',
  js: 'js',
  json: 'json'
}

function getFormatterTabFromPath(path: string): FormatterDetailTab | null{
  const trimmed = path.replace(/\/+$/,'').toLowerCase()
  const match = trimmed.match(/^\/formatter\/(.+)/)
  if(!match) return null
  const slug = match[1]
  return formatterSlugToTabMap[slug] || null
}

function getMinifyTabFromPath(path: string): MinifyDetailTab | null{
  const trimmed = path.replace(/\/+$/,'').toLowerCase()
  const match = trimmed.match(/^\/minify\/(.+)/)
  if(!match) return null
  const slug = match[1]
  return minifySlugToTabMap[slug] || null
}

function getUuidVersionFromPath(path: string): UuidVersion{
  const trimmed = path.replace(/\/+$/,'').toLowerCase()
  const match = trimmed.match(/^\/(?:generator\/)?uuid(?:\/(.+))?/)
  const slug = match && match[1]
  if(slug === 'uuid-v1') return 'v1'
  if(slug === 'uuid-v7') return 'v7'
  return 'v4'
}

function stripTulkitSuffix(value: string): string{
  return value.replace(/\s+—\s+Tulkit$/,'').trim()
}

function getCodecDetailName(type: 'encode' | 'decode', slug: CodecSubtool, appCopy: AppCopy): string | null{
  if(slug === 'default') return null
  if(type === 'encode'){
    if(slug === 'base64') return stripTulkitSuffix(appCopy.seoTitles.encodeBase64)
    if(slug === 'base32') return stripTulkitSuffix(appCopy.seoTitles.encodeBase32)
    if(slug === 'base58') return stripTulkitSuffix(appCopy.seoTitles.encodeBase58)
    if(slug === 'hex') return stripTulkitSuffix(appCopy.seoTitles.encodeHex)
    return null
  }
  if(slug === 'base64') return stripTulkitSuffix(appCopy.seoTitles.decodeBase64)
  if(slug === 'base32') return stripTulkitSuffix(appCopy.seoTitles.decodeBase32)
  if(slug === 'base58') return stripTulkitSuffix(appCopy.seoTitles.decodeBase58)
  if(slug === 'hex') return stripTulkitSuffix(appCopy.seoTitles.decodeHex)
  return null
}

function getBasePathForView(view: View, relativePath: string): string | null{
  switch(view){
    case 'formatter':
      return relativePath === '/' ? '/' : '/formatter'
    case 'minify':
      return '/minify'
    case 'uuid':
      return relativePath.startsWith('/uuid') ? '/uuid' : '/generator/uuid'
    case 'epoch':
      return '/converter/epoch'
    case 'encode':
      return '/encode'
    case 'decode':
      return '/decode'
    case 'lorem':
      return '/generator/lorem'
    case 'hash':
      return relativePath.startsWith('/hash') ? '/hash' : '/generator/hash'
    case 'case':
      return relativePath.startsWith('/case') ? '/case' : '/generator/case'
    default:
      return null
  }
}

function getBaseLabelForView(view: View, appCopy: AppCopy): string {
  switch(view){
    case 'formatter': return appCopy.navFormatter
    case 'minify': return appCopy.navMinify
    case 'uuid': return appCopy.navUuid
    case 'epoch': return appCopy.navEpoch
    case 'encode': return appCopy.navEncode
    case 'decode': return appCopy.navDecode
    case 'lorem': return appCopy.navLorem
    case 'hash': return appCopy.navHash
    case 'case': return appCopy.navCase
    default: return ''
  }
}

type BreadcrumbArgs = {
  view: View
  relativePath: string
  currentUrl: string
  appCopy: AppCopy
  headingByTab: Record<FormatterDetailTab,string>
  minifierLangInfo: MinifierInfo
  uuidCopy: UuidCopy
  hashCopy: HashCopy
  encodeSlug: CodecSubtool
  decodeSlug: CodecSubtool
  hashSlug: HashAlgorithmKey
}

function buildDetailBreadcrumb({
  view,
  relativePath,
  currentUrl,
  appCopy,
  headingByTab,
  minifierLangInfo,
  uuidCopy,
  hashCopy,
  encodeSlug,
  decodeSlug,
  hashSlug
}: BreadcrumbArgs): BreadcrumbItem | null{
  if(view === 'formatter'){
    const tab = getFormatterTabFromPath(relativePath)
    if(tab){
      return { name: headingByTab[tab], url: currentUrl }
    }
    return null
  }
  if(view === 'minify'){
    const tab = getMinifyTabFromPath(relativePath)
    if(tab){
      const info = minifierLangInfo[tab]
      if(info){
        return { name: info.title, url: currentUrl }
      }
    }
    return null
  }
  if(view === 'uuid'){
    const version = getUuidVersionFromPath(relativePath)
    return { name: uuidCopy.tabLabels[version], url: currentUrl }
  }
  if(view === 'hash'){
    const labels: Record<HashAlgorithmKey,string> = {
      sha1: hashCopy.algorithmSha1,
      sha256: hashCopy.algorithmSha256,
      sha512: hashCopy.algorithmSha512
    }
    const algo = labels[hashSlug]
    if(algo){
      return { name: `${appCopy.navHash}: ${algo}`, url: currentUrl }
    }
    return null
  }
  if(view === 'encode'){
    const name = getCodecDetailName('encode', encodeSlug, appCopy)
    return name ? { name, url: currentUrl } : null
  }
  if(view === 'decode'){
    const name = getCodecDetailName('decode', decodeSlug, appCopy)
    return name ? { name, url: currentUrl } : null
  }
  return null
}

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

function isFormatterTabValue(value: unknown): value is ActiveTab{
  return value === 'auto' || formatterLangs.includes(value as (typeof formatterLangs)[number])
}

function isMinifyTabValue(value: unknown): value is MinifyTab{
  return value === 'auto' || value === 'html' || value === 'css' || value === 'js' || value === 'json'
}

function readStoredFormatterTab(): ActiveTab | null{
  if(typeof window === 'undefined') return null
  try{
    const raw = window.localStorage.getItem(FORMATTER_SETTINGS_KEY)
    if(!raw) return null
    const data = JSON.parse(raw)
    const candidate = data?.activeTab
    return isFormatterTabValue(candidate) ? candidate : null
  }catch{
    return null
  }
}

function readStoredMinifyTab(): MinifyTab | null{
  if(typeof window === 'undefined') return null
  try{
    const raw = window.localStorage.getItem(MINIFIER_SETTINGS_KEY)
    if(!raw) return null
    const data = JSON.parse(raw)
    const candidate = data?.tab
    return isMinifyTabValue(candidate) ? candidate : null
  }catch{
    return null
  }
}

function getInitialFormatterTab(): ActiveTab{
  if(typeof window === 'undefined') return 'auto'
  const relative = stripLanguagePrefix(window.location.pathname) || '/'
  const pathTab = getFormatterTabFromPath(relative)
  if(pathTab) return pathTab
  const stored = readStoredFormatterTab()
  return stored || 'auto'
}

function getInitialMinifierTab(): MinifyTab{
  if(typeof window === 'undefined') return 'auto'
  const relative = stripLanguagePrefix(window.location.pathname) || '/'
  const pathTab = getMinifyTabFromPath(relative)
  if(pathTab) return pathTab
  const stored = readStoredMinifyTab()
  return stored || 'auto'
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
  const [formatterTab, setFormatterTab] = useState<ActiveTab>(()=>getInitialFormatterTab())
  const [minifierTab, setMinifierTab] = useState<MinifyTab>(()=>getInitialMinifierTab())
  const [uuidVersion, setUuidVersion] = useState<UuidVersion>('v4')
  const relativePath = useMemo(()=>stripLanguagePrefix(location.pathname) || '/', [location.pathname])
  const view = useMemo(()=>getViewFromPath(relativePath), [relativePath])
  const encodeSlug = useMemo<CodecSubtool>(()=> (view === 'encode' ? getCodecSlugFromPath(relativePath) : 'default'), [view, relativePath])
  const decodeSlug = useMemo<CodecSubtool>(()=> (view === 'decode' ? getCodecSlugFromPath(relativePath) : 'default'), [view, relativePath])
  const hashSlug = useMemo<HashAlgorithmKey>(()=> (view === 'hash' ? getHashSlugFromPath(relativePath) : 'sha256'), [view, relativePath])
  const effectiveFormatterTab = useMemo<ActiveTab>(()=> (view === 'formatter' ? formatterTab : 'auto'), [view, formatterTab])
  const effectiveMinifyTab = useMemo<MinifyTab>(()=> (view === 'minify' ? minifierTab : 'auto'), [view, minifierTab])

  useEffect(()=>{
    if(view !== 'formatter') return
    const pathTab = getFormatterTabFromPath(relativePath)
    if(pathTab && pathTab !== formatterTab){
      setFormatterTab(pathTab)
    }
  },[view, relativePath, formatterTab])

  useEffect(()=>{
    if(view !== 'minify') return
    const pathTab = getMinifyTabFromPath(relativePath)
    if(pathTab && pathTab !== minifierTab){
      setMinifierTab(pathTab)
    }
  },[view, relativePath, minifierTab])

  useEffect(()=>{
    const detected = detectLanguageFromPath(location.pathname)
    if(detected !== 'en'){
      setLanguage((prev: LanguageCode)=>prev === detected ? prev : detected)
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
  const {
    app: appCopy,
    headingByTab,
    descriptionByTab,
    uuidDescriptionByVersion,
    minifierLangInfo,
    uuid: uuidCopy,
    hash: hashCopy
  } = translations

  const formatterOverview = getFormatterOverviewByTab(language)[effectiveFormatterTab]
  const minifyOverview = translations.overviews.minify
  const uuidOverview = getUuidOverviewByVersion(language)[uuidVersion]
  const epochOverview = getEpochOverview(language)
  const caseOverview = getCaseOverview(language)
  const encodeOverview = translations.overviews.encode[encodeSlug]
  const decodeOverview = translations.overviews.decode[decodeSlug]
  const loremOverview = translations.overviews.lorem
  const hashOverview = translations.overviews.hash
  const encodeSeoBlurb = appCopy.seoBlurb.encode[encodeSlug]
  const decodeSeoBlurb = appCopy.seoBlurb.decode[decodeSlug]
  const uuidSeoBlurb = appCopy.seoBlurb.uuid[uuidVersion]
  const formatterSeoBlurb = appCopy.seoBlurb.formatter[effectiveFormatterTab] || appCopy.seoBlurb.formatter.auto
  const minifySeoBlurb = appCopy.seoBlurb.minify[effectiveMinifyTab] || appCopy.seoBlurb.minify.auto
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
      if(effectiveMinifyTab === 'html') return appCopy.seoTitles.minifyHtml || appCopy.seoTitles.minify
      if(effectiveMinifyTab === 'css') return appCopy.seoTitles.minifyCss || appCopy.seoTitles.minify
      if(effectiveMinifyTab === 'js') return appCopy.seoTitles.minifyJs || appCopy.seoTitles.minify
      if(effectiveMinifyTab === 'json') return appCopy.seoTitles.minifyJson || appCopy.seoTitles.minify
      return appCopy.seoTitles.minify
    }
    if(view === 'lorem'){
      return appCopy.seoTitles.lorem
    }
    if(view === 'case'){
      return appCopy.seoTitles.case
    }
    if(view === 'notfound'){
      return appCopy.seoTitles.notFound
    }
    if(effectiveFormatterTab === 'auto'){
      return appCopy.seoTitles.formatterDefault
    }
    if(effectiveFormatterTab === 'html') return appCopy.seoTitles.formatterHtml || `${headingByTab.html} — Tulkit`
    if(effectiveFormatterTab === 'xml') return appCopy.seoTitles.formatterXml || `${headingByTab.xml} — Tulkit`
    if(effectiveFormatterTab === 'yaml') return appCopy.seoTitles.formatterYaml || `${headingByTab.yaml} — Tulkit`
    if(effectiveFormatterTab === 'css') return appCopy.seoTitles.formatterCss || `${headingByTab.css} — Tulkit`
    if(effectiveFormatterTab === 'js') return appCopy.seoTitles.formatterJs || `${headingByTab.js} — Tulkit`
    if(effectiveFormatterTab === 'json') return appCopy.seoTitles.formatterJson || `${headingByTab.json} — Tulkit`
    if(effectiveFormatterTab === 'sql') return appCopy.seoTitles.formatterSql || `${headingByTab.sql} — Tulkit`
    if(effectiveFormatterTab === 'php') return appCopy.seoTitles.formatterPhp || `${headingByTab.php} — Tulkit`
    return appCopy.seoTitles.formatterDefault
  },[view, uuidVersion, appCopy, effectiveFormatterTab, headingByTab, encodeSlug, decodeSlug, effectiveMinifyTab])

  const metaDescription = useMemo(()=>{
    if(view === 'uuid'){
      return uuidDescriptionByVersion[uuidVersion as UuidVersion]
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
      return appCopy.minifyMetaDescription[effectiveMinifyTab] || appCopy.minifyMetaDescription.auto
    }
    if(view === 'hash'){
      return appCopy.hashMetaDescription[hashSlug] || appCopy.hashMetaDescription.sha256
    }
    if(view === 'lorem'){
      return appCopy.loremMetaDescription
    }
    if(view === 'case'){
      return appCopy.caseMetaDescription
    }
    if(view === 'notfound'){
      return appCopy.notFoundMetaDescription
    }
    const key: ActiveTab = effectiveFormatterTab || 'auto'
    return descriptionByTab[key]
  },[view, uuidVersion, appCopy, effectiveFormatterTab, descriptionByTab, uuidDescriptionByVersion, encodeSlug, decodeSlug, effectiveMinifyTab, hashSlug])

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
  },[relativePath, view, uuidVersion, language])

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
  },[relativePath, view, uuidVersion, language])

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
    const normalizedRelative = relativePath || '/'
    const currentPath = buildPathWithLanguage(ensureSlash(normalizedRelative), language)
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
    }else if(view === 'case'){
      pageName = appCopy.navCase
    }

    const breadcrumbs: BreadcrumbItem[] = [
      { name: homeName, url: homeUrl }
    ]

    const basePath = getBasePathForView(view, normalizedRelative)
    if(basePath){
      const baseUrl = `${origin}${buildPathWithLanguage(basePath, language)}`
      if(baseUrl !== homeUrl && baseUrl !== currentUrl){
        const baseLabel = getBaseLabelForView(view, appCopy) || pageName
        breadcrumbs.push({ name: baseLabel, url: baseUrl })
      }
    }

    const detailItem = buildDetailBreadcrumb({
      view,
      relativePath: normalizedRelative,
      currentUrl,
      appCopy,
      headingByTab,
      minifierLangInfo,
      uuidCopy,
      hashCopy,
      encodeSlug,
      decodeSlug,
      hashSlug
    })

    const finalItem = detailItem || { name: pageName, url: currentUrl }
    const duplicateIndex = breadcrumbs.findIndex(item => item.url === finalItem.url)
    if(duplicateIndex === -1){
      breadcrumbs.push(finalItem)
    }else{
      breadcrumbs[duplicateIndex] = finalItem
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index)=>({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    }

    let script = existing as HTMLScriptElement | null
    if(!script){
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'tulkit-breadcrumb-schema'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(jsonLd)
  },[
    view,
    language,
    seoHeading,
    appCopy,
    uuidVersion,
    relativePath,
    headingByTab,
    minifierLangInfo,
    uuidCopy,
    hashCopy,
    encodeSlug,
    decodeSlug,
    hashSlug
  ])

  function goToFormatter(){
    navigate('/formatter')
  }

  return (
    <div className="app">
      <Helmet>
        <title>{seoHeading}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      <React.Suspense fallback={null}>
        <Navbar
          currentView={view}
          language={language}
          onNavigate={(path: string) => navigate(path)}
          onLanguageChange={setLanguage}
        />
      </React.Suspense>
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
        </div>
      </header>
      {view !== 'notfound' && (
        <section className="seo-blurb">
          <div className="container">
            <h2>{seoHeading}</h2>
            {view === 'formatter' && (
              <>
                {formatterSeoBlurb.map((text: string)=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'uuid' && (
              <>
                {uuidSeoBlurb.map((text: string)=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'epoch' && (
              <>
                {appCopy.seoBlurb.epoch.map((text: string)=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'encode' && (
              <>
                {encodeSeoBlurb.map((text: string)=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'minify' && (
              <>
                {minifySeoBlurb.map((text: string)=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'hash' && (
              <>
                {hashSeoBlurb.map((text: string)=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'decode' && (
              <>
                {decodeSeoBlurb.map((text: string)=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'lorem' && (
              <>
                {appCopy.seoBlurb.lorem.map((text: string)=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'case' && (
              <>
                {appCopy.seoBlurb.case.map((text: string)=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
          </div>
        </section>
      )}
      <main className="container">
        {view === 'formatter' && (
          <Formatter onTabChange={setFormatterTab} language={language} />
        )}
        {view === 'minify' && (
          <React.Suspense fallback={<div className="formatter">{'Loading…'}</div>}>
            <Minifier language={language} onTabChange={setMinifierTab} />
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
        {view === 'case' && (
          <React.Suspense fallback={<div className="encode-card">{'Loading…'}</div>}>
            <CaseConverter language={language} />
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
            {view === 'case' && (
              <>
                <h2>{caseOverview.heading}</h2>
                {caseOverview.paragraphs.map(text=>(
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
