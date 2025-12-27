import React, { useState, useEffect, useMemo } from 'react'
import Navbar from './components/Navbar'
const Formatter = React.lazy(()=>import('./components/Formatter'))
const Minifier = React.lazy(()=>import('./components/Minifier'))
const UuidGenerator = React.lazy(()=>import('./components/UuidGenerator'))
const EpochConverter = React.lazy(()=>import('./components/EpochConverter'))
const LoremIpsumGenerator = React.lazy(()=>import('./components/LoremIpsumGenerator'))
const Encoder = React.lazy(()=>import('./components/Encoder'))
const Decoder = React.lazy(()=>import('./components/Decoder'))
const HashGenerator = React.lazy(()=>import('./components/HashGenerator'))
const CaseConverter = React.lazy(()=>import('./components/CaseConverter'))
const UrlEncoder = React.lazy(()=>import('./components/UrlEncoder'))
const RegexTester = React.lazy(()=>import('./components/RegexTester'))
const PantoneConverter = React.lazy(()=>import('./components/PantoneConverter'))
const PantoneLanding = React.lazy(()=>import('./components/PantoneLanding'))
const PantoneCatalog = React.lazy(()=>import('./components/PantoneCatalog'))
const JwtDecoder = React.lazy(()=>import('./components/JwtDecoder'))
const JwtEncoder = React.lazy(()=>import('./components/JwtEncoder'))
import IndexNowSubmit from './components/IndexNowSubmit'
import { useLocation, useNavigate } from 'react-router-dom'
import { loadOverviewContent, type OverviewCopy } from './pageOverviewContent'
import { loadSeoBlurbs } from './seoBlurbs'
import { getTranslations, type SeoBlurbCopy } from './i18n'
import { formatterLangs, type ActiveTab, type CodecSubtool, type LanguageCode, type MinifyTab, type UuidVersion } from './types'
import { detectLanguageFromPath, stripLanguagePrefix, buildPathWithLanguage } from './routing'
import { findPantoneBySlug } from './data/pantoneColors'
import { Helmet } from 'react-helmet-async'
import './components/Breadcrumb.css'

type View = 'home' | 'generator' | 'formatter' | 'minify' | 'uuid' | 'uuid-overview' | 'epoch' | 'converter-overview' | 'encode' | 'encode-overview' | 'decode' | 'decode-overview' | 'lorem' | 'hash' | 'hash-overview' | 'case' | 'url' | 'security-overview' | 'jwt-overview' | 'jwt-decode' | 'jwt-encode' | 'pantone' | 'pantone-hub' | 'pantone-catalog' | 'regex' | 'indexnow-admin' | 'notfound'

function getViewFromPath(path: string): View{
  const normalized = path.toLowerCase()
  const clean = normalized === '/' || normalized === '' ? '/' : normalized.replace(/\/+$/,'')
  if(clean === '/'){
    return 'home'
  }
  if(clean === '/generator'){
    return 'generator'
  }
  if(clean === '/generator/uuid'){
    return 'uuid-overview'
  }
  if(clean.startsWith('/generator/uuid') || clean.startsWith('/uuid')){
    return 'uuid'
  }
  if(clean === '/generator/hash'){
    return 'hash-overview'
  }
  if(clean.startsWith('/generator/hash') || clean.startsWith('/hash')){
    return 'hash'
  }
  if(clean.startsWith('/converter/case')){
    return 'case'
  }
  if(clean.startsWith('/generator/lorem')){
    return 'lorem'
  }
  if(clean === '/encode'){
    return 'encode-overview'
  }
  if(clean.startsWith('/encode')){
    return 'encode'
  }
  if(clean === '/decode'){
    return 'decode-overview'
  }
  if(clean.startsWith('/decode')){
    return 'decode'
  }
  if(clean === '/security' || clean === '/security/'){
    return 'security-overview'
  }
  if(clean === '/security/jwt' || clean === '/security/jwt/' || clean === '/jwt'){
    return 'jwt-overview'
  }
  if(clean === '/security/jwt/decode' || clean === '/security/jwt/decode/' || clean === '/jwt/decode'){
    return 'jwt-decode'
  }
  if(clean === '/security/jwt/encode' || clean === '/security/jwt/encode/' || clean === '/jwt/encode'){
    return 'jwt-encode'
  }
  if(clean === '/admin/indexnow'){
    return 'indexnow-admin'
  }
  if(clean === '/converter'){
    return 'converter-overview'
  }
  if(clean.startsWith('/converter/epoch')){
    return 'epoch'
  }
  if(clean.startsWith('/converter/url')){
    return 'url'
  }
  if(clean.startsWith('/pantone/pantone-to-hex')){
    return 'pantone-catalog'
  }
  if(clean === '/pantone' || clean === '/pantone/'){
    return 'pantone-hub'
  }
  if(clean.startsWith('/pantone/hex-to-pantone')){
    return 'pantone'
  }
  if(clean.startsWith('/converter/pantone')){
    return 'pantone'
  }
  if(clean.startsWith('/converter/regex') || clean.startsWith('/regex')){
    return 'regex'
  }
  if(clean.startsWith('/minify')){
    return 'minify'
  }
  if(clean.startsWith('/formatter')){
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
const PLACEHOLDER_CARD_COUNT = 6

function ToolsGridSkeleton(){
  return (
    <>
      <div className="skeleton-heading" aria-hidden="true" />
      <div className="skeleton-subheading" aria-hidden="true" />
      <div className="tools-grid" aria-hidden="true">
        {Array.from({ length: PLACEHOLDER_CARD_COUNT }).map((_, index)=>(
          <div key={index} className="tool-card skeleton-card">
            <div className="tool-icon placeholder-icon" />
            <div className="tool-badge placeholder-badge" />
            <div className="placeholder-line title" />
            <div className="placeholder-line body" />
            <div className="placeholder-line body short" />
          </div>
        ))}
      </div>
    </>
  )
}

function ParagraphSkeleton({ lines = 3 }: { lines?: number }){
  return (
    <div className="paragraph-skeleton" aria-hidden="true">
      <div className="skeleton-heading short" />
      {Array.from({ length: lines }).map((_, index)=>(
        <div key={index} className="placeholder-line paragraph" />
      ))}
    </div>
  )
}

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

function getCodecDetailName(type: 'encode' | 'decode', slug: CodecSubtool, appCopy: AppCopy): string | null{
  if(slug === 'default') return null
  const map = type === 'encode' ? appCopy.breadcrumbTitles.encode : appCopy.breadcrumbTitles.decode
  return map[slug] || null
}

function getBasePathForView(view: View, relativePath: string): string | null{
  switch(view){
    case 'home':
      return null
    case 'generator':
      return null
    case 'uuid-overview':
      return null
    case 'hash-overview':
      return null
    case 'encode-overview':
      return null
    case 'decode-overview':
      return null
    case 'indexnow-admin':
      return null
    case 'converter-overview':
      return null
    case 'formatter':
      return relativePath === '/' ? '/' : '/formatter'
    case 'minify':
      return '/minify'
    case 'uuid':
      return relativePath.startsWith('/uuid') ? '/uuid' : '/generator/uuid'
    case 'epoch':
      return '/converter'
    case 'case':
      return '/converter'
    case 'regex':
      return '/converter'
    case 'encode':
      return '/encode'
    case 'decode':
      return '/decode'
    case 'lorem':
      return '/generator/lorem'
    case 'hash':
      return relativePath.startsWith('/hash') ? '/hash' : '/generator/hash'
    case 'url':
      return '/converter'
    case 'security-overview':
      return '/security'
    case 'jwt-overview':
      return '/security/jwt'
    case 'jwt-decode':
      return '/security/jwt'
    case 'jwt-encode':
      return '/security/jwt'
    case 'pantone-hub':
      return '/pantone'
    case 'pantone':
      return '/pantone'
    case 'pantone-catalog':
      return '/pantone/pantone-to-hex'
    default:
      return null
  }
}

function getBaseLabelForView(view: View, appCopy: AppCopy): string {
  switch(view){
    case 'home': return ''
    case 'generator': return ''
    case 'uuid-overview': return ''
    case 'hash-overview': return ''
    case 'encode-overview': return ''
    case 'decode-overview': return ''
    case 'indexnow-admin': return appCopy.indexNow.heading
    case 'converter-overview': return ''
    case 'formatter': return appCopy.navFormatter
    case 'minify': return appCopy.navMinify
    case 'uuid': return appCopy.navUuid
    case 'epoch': return appCopy.navConverters
    case 'encode': return appCopy.navEncode
    case 'decode': return appCopy.navDecode
    case 'lorem': return appCopy.navLorem
    case 'hash': return appCopy.navHash
    case 'security-overview': return appCopy.navJwt
    case 'jwt-overview': return appCopy.jwtOverviewLabel || appCopy.seoTitles.jwt
    case 'case': return appCopy.navConverters
    case 'url': return appCopy.navConverters
    case 'jwt-decode': return appCopy.jwtOverviewLabel || appCopy.seoTitles.jwt
    case 'jwt-encode': return appCopy.jwtOverviewLabel || appCopy.seoTitles.jwt
    case 'pantone-hub': return appCopy.navPantone
    case 'pantone': return appCopy.navPantone
    case 'pantone-catalog': return appCopy.navPantoneCatalog
    case 'regex': return appCopy.navConverters
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
  pantoneLanding: ReturnType<typeof getTranslations>['pantoneLanding']
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
  hashSlug,
  pantoneLanding
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
  if(view === 'jwt-decode'){
    return { name: appCopy.seoTitles.jwtDecode, url: currentUrl }
  }
  if(view === 'jwt-encode'){
    return { name: appCopy.seoTitles.jwtEncode, url: currentUrl }
  }
  if(view === 'url'){
    return { name: appCopy.navUrl, url: currentUrl }
  }
  if(view === 'pantone-hub'){
    return { name: appCopy.navPantone, url: currentUrl }
  }
  if(view === 'pantone'){
    return { name: pantoneLanding.hexTitle, url: currentUrl }
  }
  if(view === 'pantone-catalog'){
    const slug = getPantoneCatalogSlugFromPath(relativePath)
    if(slug){
      const color = findPantoneBySlug(slug)
      if(color){
        return { name: `${color.code} — ${color.name}`, url: currentUrl }
      }
    }
    return { name: appCopy.navPantoneCatalog, url: currentUrl }
  }
  if(view === 'regex'){
    return { name: appCopy.navRegex, url: currentUrl }
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

function getPantoneCatalogSlugFromPath(path: string): string | null{
  const match = path.match(/^\/pantone\/pantone-to-hex\/([^/]+)(?:\/)?/)
  return match ? match[1].toLowerCase() : null
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
  const [overviews, setOverviews] = useState<OverviewCopy | null>(null)
  const [seoBlurbs, setSeoBlurbs] = useState<SeoBlurbCopy | null>(null)
  const [uiBreadcrumbs, setUiBreadcrumbs] = useState<BreadcrumbItem[]>([])
  const relativePath = useMemo(()=>stripLanguagePrefix(location.pathname) || '/', [location.pathname])
  const view = useMemo(()=>getViewFromPath(relativePath), [relativePath])
  const encodeSlug = useMemo<CodecSubtool>(()=> (view === 'encode' ? getCodecSlugFromPath(relativePath) : 'default'), [view, relativePath])
  const decodeSlug = useMemo<CodecSubtool>(()=> (view === 'decode' ? getCodecSlugFromPath(relativePath) : 'default'), [view, relativePath])
  const hashSlug = useMemo<HashAlgorithmKey>(()=> (view === 'hash' ? getHashSlugFromPath(relativePath) : 'sha256'), [view, relativePath])
  const pantoneCatalogSlug = useMemo(()=> (view === 'pantone-catalog' ? getPantoneCatalogSlugFromPath(relativePath) : null), [view, relativePath])
  const pantoneCatalogColor = useMemo(()=> (pantoneCatalogSlug ? findPantoneBySlug(pantoneCatalogSlug) : null), [pantoneCatalogSlug])
  const effectiveFormatterTab = useMemo<ActiveTab>(()=> (view === 'formatter' ? formatterTab : 'auto'), [view, formatterTab])
  const effectiveMinifyTab = useMemo<MinifyTab>(()=> (view === 'minify' ? minifierTab : 'auto'), [view, minifierTab])
  const currentFullUrl = useMemo(()=>{
    if(typeof window === 'undefined') return ''
    return window.location.href
  },[location.pathname, location.search])

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

  useEffect(()=>{
    let cancelled = false
    setOverviews(null)
    loadOverviewContent(language).then(copy=>{
      if(!cancelled){
        setOverviews(copy)
      }
    })
    return ()=>{ cancelled = true }
  },[language])

  useEffect(()=>{
    let cancelled = false
    setSeoBlurbs(null)
    loadSeoBlurbs(language).then(copy=>{
      if(!cancelled){
        setSeoBlurbs(copy)
      }
    })
    return ()=>{ cancelled = true }
  },[language])

  const translations = getTranslations(language)
  const {
    app: appCopy,
    headingByTab,
    descriptionByTab,
    uuidDescriptionByVersion,
    minifierLangInfo,
    uuid: uuidCopy,
    hash: hashCopy,
    pantoneLanding: pantoneLandingCopy
  } = translations

  const homeOverview = overviews?.home
  const generatorOverview = overviews?.generator
  const uuidOverviewContent = overviews?.uuidOverview
  const converterOverviewContent = overviews?.converterOverview
  const hashOverviewContent = overviews?.hashOverview
  const securityOverviewContent = overviews?.securityOverview
  const jwtOverviewContent = overviews?.jwtOverview
  const encodeOverviewContent = overviews?.encodeOverview
  const decodeOverviewContent = overviews?.decodeOverview
  const formatterOverview = overviews?.formatter[effectiveFormatterTab]
  const minifyOverview = overviews?.minify
  const uuidOverview = overviews?.uuid[uuidVersion]
  const epochOverview = overviews?.epoch
  const caseOverview = overviews?.case
  const urlOverview = overviews?.url
  const pantoneOverview = overviews?.pantone
  const pantoneCatalogOverview = overviews?.pantoneCatalog
  const regexOverview = overviews?.regex
  const encodeOverview = overviews?.encode[encodeSlug]
  const decodeOverview = overviews?.decode[decodeSlug]
  const loremOverview = overviews?.lorem
  const hashOverview = overviews?.hash
  const jwtDecodeOverview = overviews?.jwt.decode
  const jwtEncodeOverview = overviews?.jwt.encode
  const generatorSeoBlurb = seoBlurbs?.generator || []
  const uuidOverviewSeoBlurb = seoBlurbs?.uuidOverview || []
  const hashOverviewSeoBlurb = seoBlurbs?.hashOverview || []
  const encodeOverviewSeoBlurb = seoBlurbs?.encodeOverview || []
  const decodeOverviewSeoBlurb = seoBlurbs?.decodeOverview || []
  const securityOverviewSeoBlurb = seoBlurbs?.securityOverview || []
  const jwtOverviewSeoBlurb = seoBlurbs?.jwt?.overview || []
  const converterOverviewSeoBlurb = seoBlurbs?.converterOverview || []
  const encodeSeoBlurb = (seoBlurbs?.encode && seoBlurbs.encode[encodeSlug]) || []
  const decodeSeoBlurb = (seoBlurbs?.decode && seoBlurbs.decode[decodeSlug]) || []
  const uuidSeoBlurb = (seoBlurbs?.uuid && seoBlurbs.uuid[uuidVersion]) || []
  const formatterSeoBlurb = (seoBlurbs?.formatter && (seoBlurbs.formatter[effectiveFormatterTab] || seoBlurbs.formatter.auto)) || []
  const minifySeoBlurb = (seoBlurbs?.minify && (seoBlurbs.minify[effectiveMinifyTab] || seoBlurbs.minify.auto)) || []
  const hashSeoBlurb = (seoBlurbs?.hash && seoBlurbs.hash[hashSlug]) || []
  const epochSeoBlurb = seoBlurbs?.epoch || []
  const loremSeoBlurb = seoBlurbs?.lorem || []
  const caseSeoBlurb = seoBlurbs?.case || []
  const urlSeoBlurb = seoBlurbs?.url || []
  const jwtDecodeSeoBlurb = seoBlurbs?.jwt?.decode || []
  const jwtEncodeSeoBlurb = seoBlurbs?.jwt?.encode || []
  const pantoneHubSeoBlurb = seoBlurbs?.pantoneHub || []
  const pantoneSeoBlurb = seoBlurbs?.pantone || []
  const pantoneCatalogSeoBlurb = seoBlurbs?.pantoneCatalog || []
  const regexSeoBlurb = seoBlurbs?.regex || []
  const pantoneCatalogSeoBlurbResolved = useMemo(()=>{
    if(pantoneCatalogColor){
      if(language === 'id'){
        return [
          `Swatch Pantone ${pantoneCatalogColor.code} (${pantoneCatalogColor.name}) dengan HEX ${pantoneCatalogColor.hex} dan RGB ${pantoneCatalogColor.rgb}. Salin nilainya atau bagikan tautan ini ke tim.`,
          'Gunakan detail ini untuk menjaga konsistensi brand saat mengubah spesifikasi Pantone ke aset digital atau token desain.'
        ]
      }
      return [
        `See Pantone ${pantoneCatalogColor.code} (${pantoneCatalogColor.name}) with HEX ${pantoneCatalogColor.hex} and RGB ${pantoneCatalogColor.rgb}. Copy the digital values or share this link with your team.`,
        'Use this swatch page when translating print specs back to digital assets, checking brand consistency, or grabbing a quick HEX value for design tokens.'
      ]
    }
    return pantoneCatalogSeoBlurb
  },[pantoneCatalogColor, language, pantoneCatalogSeoBlurb])

  const pantoneCatalogOverviewResolved = useMemo(()=>{
    if(pantoneCatalogColor){
      const heading = `Pantone ${pantoneCatalogColor.code} — ${pantoneCatalogColor.name} (HEX ${pantoneCatalogColor.hex})`
      if(language === 'id'){
        return {
          heading,
          paragraphs: [
            `Lihat swatch Pantone ${pantoneCatalogColor.code} (${pantoneCatalogColor.name}) lengkap dengan HEX ${pantoneCatalogColor.hex} dan RGB ${pantoneCatalogColor.rgb}. Salin nilai digital atau bagikan tautan warna ini dengan cepat.`,
            'Cocok untuk mencocokkan aset cetak ke token desain, mengecek konsistensi brand, atau mengambil nilai HEX untuk front-end secara instan.'
          ]
        }
      }
      return {
        heading,
        paragraphs: [
          `View Pantone ${pantoneCatalogColor.code} (${pantoneCatalogColor.name}) with live HEX ${pantoneCatalogColor.hex} and RGB ${pantoneCatalogColor.rgb} values. Copy them or share this color link instantly with teammates.`,
          'Perfect for translating print specs to digital assets, sanity-checking brand consistency, or pulling a fast HEX value for design tokens.'
        ]
      }
    }
    return pantoneCatalogOverview || null
  },[pantoneCatalogColor, language, pantoneCatalogOverview])
  const seoHeading = useMemo(()=>{
    if(view === 'home'){
      return 'Tulkit — Web Tools for Developers'
    }
    if(view === 'generator'){
      return 'Generator Tools — Tulkit'
    }
    if(view === 'indexnow-admin'){
      return `${appCopy.indexNow.heading} — Tulkit`
    }
    if(view === 'uuid-overview'){
      return 'UUID Generator — Tulkit'
    }
    if(view === 'converter-overview'){
      return 'Converter Tools — Tulkit'
    }
    if(view === 'hash-overview'){
      return 'Hash Generator — Tulkit'
    }
    if(view === 'encode-overview'){
      return 'Encoder — Tulkit'
    }
    if(view === 'decode-overview'){
      return 'Decoder — Tulkit'
    }
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
    if(view === 'security-overview'){
      return appCopy.seoTitles.security || appCopy.navJwt
    }
    if(view === 'jwt-overview'){
      return appCopy.seoTitles.jwt
    }
    if(view === 'jwt-decode'){
      return appCopy.seoTitles.jwtDecode
    }
    if(view === 'jwt-encode'){
      return appCopy.seoTitles.jwtEncode
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
    if(view === 'url'){
      return appCopy.seoTitles.url
    }
    if(view === 'pantone-hub'){
      return appCopy.seoTitles.pantoneHub
    }
    if(view === 'pantone'){
      return appCopy.seoTitles.pantone
    }
    if(view === 'pantone-catalog'){
      if(pantoneCatalogColor){
        const template = appCopy.seoTitles.pantoneCatalogColor || appCopy.seoTitles.pantoneCatalog
        return template
          .replace('{code}', pantoneCatalogColor.code)
          .replace('{name}', pantoneCatalogColor.name)
          .replace('{hex}', pantoneCatalogColor.hex)
      }
      return appCopy.seoTitles.pantoneCatalog
    }
    if(view === 'regex'){
      return appCopy.seoTitles.regex
    }
    if(view === 'indexnow-admin'){
      return appCopy.seoTitles.indexNowAdmin || `${appCopy.indexNow.heading} — Tulkit`
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
  },[view, uuidVersion, appCopy, effectiveFormatterTab, headingByTab, encodeSlug, decodeSlug, effectiveMinifyTab, pantoneCatalogColor])

  const metaDescription = useMemo(()=>{
    if(view === 'home'){
      return appCopy.homeMetaDescription || 'Fast, privacy-first web tools for developers. Format code, generate UUIDs, convert timestamps, encode/decode, create hashes, and more - all in your browser.'
    }
    if(view === 'generator'){
      return appCopy.generatorMetaDescription || 'Collection of generator tools for developers: UUID, Lorem Ipsum, Hash Generator, and Case Converter - all in your browser.'
    }
    if(view === 'uuid-overview'){
      return appCopy.uuidOverviewMetaDescription || 'UUID Generator with v1 (time-based), v4 (random), and v7 (ordered by time) versions. Generate unique identifiers directly in your browser.'
    }
    if(view === 'converter-overview'){
      return appCopy.converterOverviewMetaDescription || 'Collection of converter tools for developers: Convert Unix timestamps to readable dates, adjust time zones, and work with epoch times instantly.'
    }
    if(view === 'hash-overview'){
      return appCopy.hashOverviewMetaDescription || 'Hash Generator with SHA-1, SHA-256, and SHA-512 algorithms. Create cryptographic hashes and checksums directly in your browser.'
    }
    if(view === 'encode-overview'){
      return appCopy.encodeOverviewMetaDescription || 'Encode text to Base64, Base32, Base58, or hexadecimal. Perfect for data transmission, MIME attachments, and cryptographic applications.'
    }
    if(view === 'decode-overview'){
      return appCopy.decodeOverviewMetaDescription || 'Decode Base64, Base32, Base58, or hexadecimal back to readable text. Inspect encoded data instantly in your browser.'
    }
    if(view === 'security-overview'){
      return appCopy.securityMetaDescription || appCopy.jwtMetaDescription || appCopy.jwtOverviewMetaDescription || ''
    }
    if(view === 'jwt-overview'){
      return appCopy.jwtMetaDescription || appCopy.jwtOverviewMetaDescription || appCopy.jwtDecodeMetaDescription || appCopy.jwtEncodeMetaDescription || ''
    }
    if(view === 'jwt-decode'){
      return appCopy.jwtDecodeMetaDescription || appCopy.jwtMetaDescription || ''
    }
    if(view === 'jwt-encode'){
      return appCopy.jwtEncodeMetaDescription || appCopy.jwtMetaDescription || ''
    }
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
    if(view === 'url'){
      return appCopy.urlMetaDescription
    }
    if(view === 'pantone-hub'){
      return appCopy.pantoneHubMetaDescription
    }
    if(view === 'pantone'){
      return appCopy.pantoneMetaDescription
    }
    if(view === 'pantone-catalog'){
      if(pantoneCatalogColor){
        const template = appCopy.pantoneCatalogColorMetaDescription || appCopy.pantoneCatalogMetaDescription
        return template
          .replace('{code}', pantoneCatalogColor.code)
          .replace('{name}', pantoneCatalogColor.name)
          .replace('{hex}', pantoneCatalogColor.hex)
      }
      return appCopy.pantoneCatalogMetaDescription
    }
    if(view === 'regex'){
      return appCopy.regexMetaDescription
    }
    if(view === 'indexnow-admin'){
      return appCopy.indexNowMetaDescription
    }
    if(view === 'notfound'){
      return appCopy.notFoundMetaDescription
    }
    const key: ActiveTab = effectiveFormatterTab || 'auto'
    return descriptionByTab[key]
  },[view, uuidVersion, appCopy, effectiveFormatterTab, descriptionByTab, uuidDescriptionByVersion, encodeSlug, decodeSlug, effectiveMinifyTab, hashSlug, pantoneCatalogColor])

  const pantoneBreadcrumbJsonLd = useMemo(()=>{
    if(typeof window === 'undefined') return null
    if(view !== 'pantone-catalog' || !pantoneCatalogColor || !pantoneCatalogSlug) return null
    const origin = window.location.origin.replace(/\/+$/,'')
    const homeUrl = `${origin}${buildPathWithLanguage('/', language)}`
    const catalogUrl = `${origin}${buildPathWithLanguage('/pantone/pantone-to-hex', language)}`
    const colorUrl = `${origin}${buildPathWithLanguage(`/pantone/pantone-to-hex/${pantoneCatalogSlug}`, language)}`
    const breadcrumbs = [
      { name: language === 'id' ? 'Beranda' : 'Home', url: homeUrl },
      { name: translations.app.navPantoneCatalog, url: catalogUrl },
      { name: `${pantoneCatalogColor.code} — ${pantoneCatalogColor.name}`, url: colorUrl }
    ]
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index)=>({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    }
  },[view, pantoneCatalogColor, pantoneCatalogSlug, language, translations.app.navPantoneCatalog])

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
    if(view === 'notfound' || view === 'home'){
      if(existing){
        existing.remove()
      }
      setUiBreadcrumbs([])
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
    }else if(view === 'uuid-overview'){
      pageName = appCopy.navUuid
    }else if(view === 'generator'){
      pageName = appCopy.navGenerator
    }else if(view === 'epoch'){
      pageName = appCopy.navEpoch
    }else if(view === 'converter-overview'){
      pageName = appCopy.navConverters
    }else if(view === 'encode'){
      pageName = appCopy.navEncode
    }else if(view === 'encode-overview'){
      pageName = appCopy.navEncode
    }else if(view === 'decode'){
      pageName = appCopy.navDecode
    }else if(view === 'decode-overview'){
      pageName = appCopy.navDecode
    }else if(view === 'hash'){
      pageName = appCopy.navHash
    }else if(view === 'hash-overview'){
      pageName = appCopy.navHash
    }else if(view === 'security-overview'){
      pageName = appCopy.navJwt
    }else if(view === 'jwt-overview'){
      pageName = appCopy.jwtOverviewLabel || appCopy.seoTitles.jwt
    }else if(view === 'lorem'){
      pageName = appCopy.navLorem
    }else if(view === 'case'){
      pageName = appCopy.navCase
    }else if(view === 'url'){
      pageName = appCopy.navUrl
    }else if(view === 'pantone'){
      pageName = appCopy.navPantone
    }else if(view === 'pantone-catalog'){
      pageName = appCopy.navPantoneCatalog
    }else if(view === 'regex'){
      pageName = appCopy.navRegex
    }

    const breadcrumbs: BreadcrumbItem[] = [
      { name: homeName, url: homeUrl }
    ]

    const basePath = getBasePathForView(view, normalizedRelative)
    
    // Add parent breadcrumb for generator sub-pages
    if(basePath && (view === 'uuid' || view === 'hash' || view === 'lorem')){
      const generatorUrl = `${origin}${buildPathWithLanguage('/generator', language)}`
      if(generatorUrl !== homeUrl && generatorUrl !== currentUrl){
        breadcrumbs.push({ name: appCopy.navGenerator, url: generatorUrl })
      }
    }

    // Add parent breadcrumb for security tools
    if(view === 'jwt-overview' || view === 'jwt-decode' || view === 'jwt-encode'){
      const securityUrl = `${origin}${buildPathWithLanguage('/security', language)}`
      if(securityUrl !== homeUrl && securityUrl !== currentUrl){
        breadcrumbs.push({ name: appCopy.navJwt, url: securityUrl })
      }
    }
    
    if(basePath){
      const baseUrl = `${origin}${buildPathWithLanguage(basePath, language)}`
      if(baseUrl !== homeUrl && baseUrl !== currentUrl){
        const baseLabel = (getBaseLabelForView(view, appCopy) || pageName || '').trim()
        if(baseLabel){
          breadcrumbs.push({ name: baseLabel, url: baseUrl })
        }
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
      hashSlug,
      pantoneLanding: pantoneLandingCopy
    })

    const finalItem = detailItem || { name: pageName, url: currentUrl }
    const duplicateIndex = breadcrumbs.findIndex(item => item.url === finalItem.url)
    if(duplicateIndex === -1){
      breadcrumbs.push(finalItem)
    }else{
      breadcrumbs[duplicateIndex] = finalItem
    }

    setUiBreadcrumbs(breadcrumbs)

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

  function handleBreadcrumbClick(url: string){
    if(typeof window !== 'undefined'){
      try{
        const parsed = new URL(url)
        navigate(parsed.pathname + (parsed.search || ''))
        return
      }catch{
        // fall through
      }
    }
    navigate(url)
  }

  return (
    <div className="app">
      <Helmet>
        <title>{seoHeading}</title>
        <meta name="description" content={metaDescription} />
        {pantoneBreadcrumbJsonLd && (
          <script type="application/ld+json">
            {JSON.stringify(pantoneBreadcrumbJsonLd)}
          </script>
        )}
      </Helmet>
      <React.Suspense fallback={null}>
        <Navbar
          currentView={view}
          language={language}
          onNavigate={(path: string) => navigate(path)}
          onLanguageChange={setLanguage}
        />
      </React.Suspense>
      {uiBreadcrumbs.length > 1 && (
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <div>
            <ol className="breadcrumb-list">
              {uiBreadcrumbs.map((item, index)=>{
                const isLast = index === uiBreadcrumbs.length - 1
                return (
                  <li key={item.url} className="breadcrumb-item">
                    {!isLast ? (
                      <>
                        <button
                          type="button"
                          onClick={()=>handleBreadcrumbClick(item.url)}
                          className="breadcrumb-link"
                        >
                          {item.name}
                        </button>
                        <span className="breadcrumb-separator">/</span>
                      </>
                    ) : (
                      <span className="breadcrumb-current">{item.name}</span>
                    )}
                  </li>
                )
              })}
            </ol>
          </div>
        </nav>
      )}
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
      {view !== 'notfound' && view !== 'home' && view !== 'uuid-overview' && view !== 'converter-overview' && view !== 'hash-overview' && view !== 'encode-overview' && view !== 'decode-overview' && view !== 'security-overview' && view !== 'indexnow-admin' && (
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
            {view === 'epoch' && epochSeoBlurb.length > 0 && (
              <>
                {epochSeoBlurb.map((text: string)=>(
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
            {view === 'jwt-overview' && (
              <>
                {jwtOverviewSeoBlurb.map((text: string)=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'jwt-decode' && (
              <>
                {jwtDecodeSeoBlurb.map((text: string)=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'jwt-encode' && (
              <>
                {jwtEncodeSeoBlurb.map((text: string)=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'lorem' && loremSeoBlurb.length > 0 && (
              <>
                {loremSeoBlurb.map((text: string)=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'case' && caseSeoBlurb.length > 0 && (
              <>
                {caseSeoBlurb.map((text: string)=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'url' && urlSeoBlurb.length > 0 && (
              <>
                {urlSeoBlurb.map((text: string)=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'pantone-hub' && pantoneHubSeoBlurb.length > 0 && (
              <>
                {pantoneHubSeoBlurb.map((text: string)=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'pantone' && pantoneSeoBlurb.length > 0 && (
              <>
                {pantoneSeoBlurb.map((text: string)=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'pantone-catalog' && pantoneCatalogSeoBlurbResolved.length > 0 && (
              <>
                {pantoneCatalogSeoBlurbResolved.map((text: string)=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'regex' && regexSeoBlurb.length > 0 && (
              <>
                {regexSeoBlurb.map((text: string)=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
            {view === 'generator' && (
              <>
                {generatorSeoBlurb.map((text: string)=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            )}
          </div>
        </section>
      )}
      {view === 'hash-overview' && (
        <section className="seo-blurb">
          <div className="container">
            <h2>{seoHeading}</h2>
            <>
              {hashOverviewSeoBlurb.map((text: string)=>(
                <p key={text}>{text}</p>
              ))}
            </>
          </div>
        </section>
      )}
      {view === 'security-overview' && (
        <section className="seo-blurb">
          <div className="container">
            <h2>{seoHeading}</h2>
            <>
              {securityOverviewSeoBlurb.map((text: string)=>(
                <p key={text}>{text}</p>
              ))}
            </>
          </div>
        </section>
      )}
      {view === 'uuid-overview' && (
        <section className="seo-blurb">
          <div className="container">
            <h2>{seoHeading}</h2>
            <>
              {uuidOverviewSeoBlurb[0]?.map((text: string)=>(
                <p key={text}>{text}</p>
              ))}
            </>
            <div style={{marginTop: '20px'}}>
              <>
                {uuidOverviewSeoBlurb[1]?.map((text: string)=>(
                  <p key={text}>{text}</p>
                ))}
              </>
            </div>
          </div>
        </section>
      )}
      {view === 'converter-overview' && (
        <section className="seo-blurb">
          <div className="container">
            <h2>{seoHeading}</h2>
            <>
              {converterOverviewSeoBlurb.map((text: string)=>(
                <p key={text}>{text}</p>
              ))}
            </>
          </div>
        </section>
      )}
      {view === 'encode-overview' && (
        <section className="seo-blurb">
          <div className="container">
            <h2>{seoHeading}</h2>
            <>
              {encodeOverviewSeoBlurb.map((text: string)=>(
                <p key={text}>{text}</p>
              ))}
            </>
          </div>
        </section>
      )}
      {view === 'decode-overview' && (
        <section className="seo-blurb">
          <div className="container">
            <h2>{seoHeading}</h2>
            <>
              {decodeOverviewSeoBlurb.map((text: string)=>(
                <p key={text}>{text}</p>
              ))}
            </>
          </div>
        </section>
      )}
      <main className="container">
        {view === 'home' && (
          <section className="home-overview">
            {homeOverview ? (
              <>
                <h1>{homeOverview.heading}</h1>
                <p className="subheading">{homeOverview.subheading}</p>
                <div className="tools-grid">
                  {homeOverview.tools.map(tool => (
                    <a 
                      key={tool.path}
                      href={buildPathWithLanguage(tool.path, language)}
                      className="tool-card"
                    >
                      <div className="tool-icon">{tool.icon}</div>
                      <div className="tool-badge">{tool.category}</div>
                      <h2>{tool.title}</h2>
                      <p>{tool.description}</p>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <ToolsGridSkeleton />
            )}
          </section>
        )}
        {view === 'generator' && (
          <section className="home-overview">
            {generatorOverview ? (
              <>
                <h1>{generatorOverview.heading}</h1>
                <p className="subheading">{generatorOverview.subheading}</p>
                <div className="tools-grid">
                  {generatorOverview.tools.map(tool => (
                    <a 
                      key={tool.path}
                      href={buildPathWithLanguage(tool.path, language)}
                      className="tool-card"
                    >
                      <div className="tool-icon">{tool.icon}</div>
                      <div className="tool-badge">{tool.category}</div>
                      <h2>{tool.title}</h2>
                      <p>{tool.description}</p>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <ToolsGridSkeleton />
            )}
          </section>
        )}
        {view === 'uuid-overview' && (
          <section className="home-overview">
            {uuidOverviewContent ? (
              <>
                <h1>{uuidOverviewContent.heading}</h1>
                <p className="subheading">{uuidOverviewContent.subheading}</p>
                <div className="tools-grid">
                  {uuidOverviewContent.tools.map(tool => (
                    <a 
                      key={tool.path}
                      href={buildPathWithLanguage(tool.path, language)}
                      className="tool-card"
                    >
                      <div className="tool-icon">{tool.icon}</div>
                      <div className="tool-badge">{tool.category}</div>
                      <h2>{tool.title}</h2>
                      <p>{tool.description}</p>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <ToolsGridSkeleton />
            )}
          </section>
        )}
        {view === 'converter-overview' && (
          <section className="home-overview">
            {converterOverviewContent ? (
              <>
                <h1>{converterOverviewContent.heading}</h1>
                <p className="subheading">{converterOverviewContent.subheading}</p>
                <div className="tools-grid">
                  {converterOverviewContent.tools.map(tool => (
                    <a 
                      key={tool.path}
                      href={buildPathWithLanguage(tool.path, language)}
                      className="tool-card"
                    >
                      <div className="tool-icon">{tool.icon}</div>
                      <div className="tool-badge">{tool.category}</div>
                      <h2>{tool.title}</h2>
                      <p>{tool.description}</p>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <ToolsGridSkeleton />
            )}
          </section>
        )}
        {view === 'hash-overview' && (
          <section className="home-overview">
            {hashOverviewContent ? (
              <>
                <h1>{hashOverviewContent.heading}</h1>
                <p className="subheading">{hashOverviewContent.subheading}</p>
                <div className="tools-grid">
                  {hashOverviewContent.tools.map(tool => (
                    <a 
                      key={tool.path}
                      href={buildPathWithLanguage(tool.path, language)}
                      className="tool-card"
                    >
                      <div className="tool-icon">{tool.icon}</div>
                      <div className="tool-badge">{tool.category}</div>
                      <h2>{tool.title}</h2>
                      <p>{tool.description}</p>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <ToolsGridSkeleton />
            )}
          </section>
        )}
        {view === 'security-overview' && (
          <section className="home-overview">
            {securityOverviewContent ? (
              <>
                <h1>{securityOverviewContent.heading}</h1>
                <p className="subheading">{securityOverviewContent.subheading}</p>
                <div className={securityOverviewContent.tools.length <= 2 ? 'tools-grid centered-grid' : 'tools-grid'}>
                  {securityOverviewContent.tools.map(tool => (
                    <a
                      key={tool.path}
                      href={buildPathWithLanguage(tool.path, language)}
                      className="tool-card"
                    >
                      <div className="tool-icon">{tool.icon}</div>
                      <div className="tool-badge">{tool.category}</div>
                      <h2>{tool.title}</h2>
                      <p>{tool.description}</p>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <ToolsGridSkeleton />
            )}
          </section>
        )}
        {view === 'jwt-overview' && (
          <section className="home-overview">
            {jwtOverviewContent ? (
              <>
                <h1>{jwtOverviewContent.heading}</h1>
                <p className="subheading">{jwtOverviewContent.subheading}</p>
                <div className="tools-grid">
                  {jwtOverviewContent.tools.map(tool => (
                    <a
                      key={tool.path}
                      href={buildPathWithLanguage(tool.path, language)}
                      className="tool-card"
                    >
                      <div className="tool-icon">{tool.icon}</div>
                      <div className="tool-badge">{tool.category}</div>
                      <h2>{tool.title}</h2>
                      <p>{tool.description}</p>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <ToolsGridSkeleton />
            )}
          </section>
        )}
        {view === 'encode-overview' && (
          <section className="home-overview">
            {encodeOverviewContent ? (
              <>
                <h1>{encodeOverviewContent.heading}</h1>
                <p className="subheading">{encodeOverviewContent.subheading}</p>
                <div className="tools-grid">
                  {encodeOverviewContent.tools.map(tool => (
                    <a 
                      key={tool.path}
                      href={buildPathWithLanguage(tool.path, language)}
                      className="tool-card"
                    >
                      <div className="tool-icon">{tool.icon}</div>
                      <div className="tool-badge">{tool.category}</div>
                      <h2>{tool.title}</h2>
                      <p>{tool.description}</p>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <ToolsGridSkeleton />
            )}
          </section>
        )}
        {view === 'decode-overview' && (
          <section className="home-overview">
            {decodeOverviewContent ? (
              <>
                <h1>{decodeOverviewContent.heading}</h1>
                <p className="subheading">{decodeOverviewContent.subheading}</p>
                <div className="tools-grid">
                  {decodeOverviewContent.tools.map(tool => (
                    <a 
                      key={tool.path}
                      href={buildPathWithLanguage(tool.path, language)}
                      className="tool-card"
                    >
                      <div className="tool-icon">{tool.icon}</div>
                      <div className="tool-badge">{tool.category}</div>
                      <h2>{tool.title}</h2>
                      <p>{tool.description}</p>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <ToolsGridSkeleton />
            )}
          </section>
        )}
        {view === 'formatter' && (
          <React.Suspense fallback={<div className="formatter">{'Loading…'}</div>}>
            <Formatter onTabChange={setFormatterTab} language={language} />
          </React.Suspense>
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
        {view === 'jwt-decode' && (
          <React.Suspense fallback={<div className="encode-card">{'Loading…'}</div>}>
            <JwtDecoder language={language} />
          </React.Suspense>
        )}
        {view === 'jwt-encode' && (
          <React.Suspense fallback={<div className="encode-card">{'Loading…'}</div>}>
            <JwtEncoder language={language} />
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
        {view === 'url' && (
          <React.Suspense fallback={<div className="encode-card">{'Loading…'}</div>}>
            <UrlEncoder language={language} />
          </React.Suspense>
        )}
        {view === 'pantone-hub' && (
          <React.Suspense fallback={<div className="encode-card">{'Loading…'}</div>}>
            <PantoneLanding language={language} />
          </React.Suspense>
        )}
        {view === 'pantone' && (
          <React.Suspense fallback={<div className="encode-card">{'Loading…'}</div>}>
            <PantoneConverter language={language} />
          </React.Suspense>
        )}
        {view === 'pantone-catalog' && (
          <React.Suspense fallback={<div className="encode-card">{'Loading…'}</div>}>
            <PantoneCatalog language={language} slug={pantoneCatalogSlug} />
          </React.Suspense>
        )}
        {view === 'regex' && (
          <React.Suspense fallback={<div className="encode-card">{'Loading…'}</div>}>
            <RegexTester language={language} />
          </React.Suspense>
        )}
        {view === 'indexnow-admin' && (
          <IndexNowSubmit language={language} currentUrl={currentFullUrl} />
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
      {view !== 'notfound' && view !== 'home' && view !== 'generator' && view !== 'uuid-overview' && view !== 'hash-overview' && view !== 'encode-overview' && view !== 'decode-overview' && view !== 'indexnow-admin' && (
        <section className="page-overview">
          <div className="container">
            {view === 'formatter' && (
              formatterOverview ? (
                <>
                  <h2>{formatterOverview.heading}</h2>
                  {formatterOverview.paragraphs.map(text=>(
                    <p key={text}>{text}</p>
                  ))}
                </>
              ) : <ParagraphSkeleton lines={4} />
            )}
            {view === 'uuid' && (
              uuidOverview ? (
                <>
                  <h2>{uuidOverview.heading}</h2>
                  {uuidOverview.paragraphs.map(text=>(
                    <p key={text}>{text}</p>
                  ))}
                </>
              ) : <ParagraphSkeleton lines={4} />
            )}
            {view === 'epoch' && (
              epochOverview ? (
                <>
                  <h2>{epochOverview.heading}</h2>
                  {epochOverview.paragraphs.map(text=>(
                    <p key={text}>{text}</p>
                  ))}
                </>
              ) : <ParagraphSkeleton lines={4} />
            )}
            {view === 'encode' && (
              encodeOverview ? (
                <>
                  <h2>{encodeOverview.heading}</h2>
                  {encodeOverview.paragraphs.map(text=>(
                    <p key={text}>{text}</p>
                  ))}
                </>
              ) : <ParagraphSkeleton lines={4} />
            )}
            {view === 'minify' && (
              minifyOverview ? (
                <>
                  <h2>{minifyOverview.heading}</h2>
                  {minifyOverview.paragraphs.map(text=>(
                    <p key={text}>{text}</p>
                  ))}
                </>
              ) : <ParagraphSkeleton lines={4} />
            )}
            {view === 'decode' && (
              decodeOverview ? (
                <>
                  <h2>{decodeOverview.heading}</h2>
                  {decodeOverview.paragraphs.map(text=>(
                    <p key={text}>{text}</p>
                  ))}
                </>
              ) : <ParagraphSkeleton lines={4} />
            )}
            {view === 'hash' && (
              hashOverview ? (
                <>
                  <h2>{hashOverview.heading}</h2>
                  {hashOverview.paragraphs.map(text=>(
                    <p key={text}>{text}</p>
                  ))}
                </>
              ) : <ParagraphSkeleton lines={4} />
            )}
            {view === 'jwt-decode' && (
              jwtDecodeOverview ? (
                <>
                  <h2>{jwtDecodeOverview.heading}</h2>
                  {jwtDecodeOverview.paragraphs.map(text=>(
                    <p key={text}>{text}</p>
                  ))}
                </>
              ) : <ParagraphSkeleton lines={4} />
            )}
            {view === 'jwt-encode' && (
              jwtEncodeOverview ? (
                <>
                  <h2>{jwtEncodeOverview.heading}</h2>
                  {jwtEncodeOverview.paragraphs.map(text=>(
                    <p key={text}>{text}</p>
                  ))}
                </>
              ) : <ParagraphSkeleton lines={4} />
            )}
            {view === 'lorem' && (
              loremOverview ? (
                <>
                  <h2>{loremOverview.heading}</h2>
                  {loremOverview.paragraphs.map(text=>(
                    <p key={text}>{text}</p>
                  ))}
                </>
              ) : <ParagraphSkeleton lines={4} />
            )}
            {view === 'case' && (
              caseOverview ? (
                <>
                  <h2>{caseOverview.heading}</h2>
                  {caseOverview.paragraphs.map(text=>(
                    <p key={text}>{text}</p>
                  ))}
                </>
              ) : <ParagraphSkeleton lines={4} />
            )}
            {view === 'url' && (
              urlOverview ? (
                <>
                  <h2>{urlOverview.heading}</h2>
                  {urlOverview.paragraphs.map(text=>(
                    <p key={text}>{text}</p>
                  ))}
                </>
              ) : <ParagraphSkeleton lines={4} />
            )}
            {view === 'pantone-hub' && (
              pantoneOverview ? (
                <>
                  <h2>{pantoneOverview.heading}</h2>
                  {pantoneOverview.paragraphs.map(text=>(
                    <p key={text}>{text}</p>
                  ))}
                </>
              ) : <ParagraphSkeleton lines={4} />
            )}
            {view === 'pantone' && (
              pantoneOverview ? (
                <>
                  <h2>{pantoneOverview.heading}</h2>
                  {pantoneOverview.paragraphs.map(text=>(
                    <p key={text}>{text}</p>
                  ))}
                </>
              ) : <ParagraphSkeleton lines={4} />
            )}
            {view === 'pantone-catalog' && (
              pantoneCatalogOverviewResolved ? (
                <>
                  <h2>{pantoneCatalogOverviewResolved.heading}</h2>
                  {pantoneCatalogOverviewResolved.paragraphs.map(text=>(
                    <p key={text}>{text}</p>
                  ))}
                </>
              ) : <ParagraphSkeleton lines={4} />
            )}
            {view === 'regex' && (
              regexOverview ? (
                <>
                  <h2>{regexOverview.heading}</h2>
                  {regexOverview.paragraphs.map(text=>(
                    <p key={text}>{text}</p>
                  ))}
                </>
              ) : <ParagraphSkeleton lines={4} />
            )}
          </div>
        </section>
      )}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-links-grid">
              {Object.entries(appCopy.footerLinks).map(([category, links]) => (
                <div key={category} className="footer-column">
                  <p className="footer-heading">
                    {category === 'formatting' && 'Formatting'}
                    {category === 'optimization' && 'Optimization'}
                    {category === 'conversion' && 'Conversion'}
                    {category === 'encoding' && 'Encoding'}
                    {category === 'generation' && 'Generation'}
                    {category === 'security' && 'Security'}
                  </p>
                  <ul className="footer-link-list">
                    {links.map(link => (
                      <li key={link.path}>
                        <a href={buildPathWithLanguage(link.path, language)}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="footer-note">
              <small>{appCopy.footerNote}</small>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
