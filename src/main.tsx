import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import criticalStyles from './index.css?inline'
import './analytics'
const asyncStylesHref = new URL('./async-styles.css', import.meta.url).href
const viewModules = import.meta.glob('./components/*.tsx')
const preloadedModules = new Set<keyof typeof viewModules>()

type ViewPreload = {
  match: (path: string) => boolean
  importKey: keyof typeof viewModules
}

const viewPreloads: ViewPreload[] = [
  {
    match: path => path.startsWith('/formatter'),
    importKey: './components/Formatter.tsx'
  },
  {
    match: path => path.startsWith('/minify'),
    importKey: './components/Minifier.tsx'
  },
  {
    match: path => path.startsWith('/encode'),
    importKey: './components/Encoder.tsx'
  },
  {
    match: path => path.startsWith('/decode'),
    importKey: './components/Decoder.tsx'
  },
  {
    match: path => path.startsWith('/generator/uuid') || path.startsWith('/uuid'),
    importKey: './components/UuidGenerator.tsx'
  },
  {
    match: path => path.startsWith('/generator/lorem'),
    importKey: './components/LoremIpsumGenerator.tsx'
  },
  {
    match: path => path.startsWith('/generator/hash') || path.startsWith('/hash'),
    importKey: './components/HashGenerator.tsx'
  },
  {
    match: path => path.startsWith('/converter/epoch'),
    importKey: './components/EpochConverter.tsx'
  },
  {
    match: path => path.startsWith('/converter/case'),
    importKey: './components/CaseConverter.tsx'
  },
  {
    match: path => path.startsWith('/converter/url'),
    importKey: './components/UrlEncoder.tsx'
  },
  {
    match: path => path.startsWith('/converter/regex'),
    importKey: './components/RegexTester.tsx'
  }
]

if(typeof window !== 'undefined'){
  const redirectTarget = window.sessionStorage.getItem('tulkit-redirect')
  if(redirectTarget && (window.location.pathname === '/' || window.location.pathname === '')){
    window.sessionStorage.removeItem('tulkit-redirect')
    try{
      window.history.replaceState(null, '', redirectTarget + window.location.search)
    }catch{
      // fallback
      window.location.replace(redirectTarget + window.location.search)
    }
  }
}

function preloadModulesForPath(path: string){
  if(typeof window === 'undefined') return
  const normalized = path.toLowerCase()
  viewPreloads.forEach(({ match, importKey }) => {
    if(!match(normalized)) return
    if(preloadedModules.has(importKey)) return
    const loadModule = viewModules[importKey]
    if(!loadModule) return
    preloadedModules.add(importKey)
    loadModule().catch(()=>{
      preloadedModules.delete(importKey)
    })
  })
}

function injectCriticalStyles(){
  if(typeof document === 'undefined') return
  if(document.getElementById('tulkit-critical-styles')) return
  const style = document.createElement('style')
  style.id = 'tulkit-critical-styles'
  style.textContent = criticalStyles
  document.head.appendChild(style)
}

function loadDeferredStyles(){
  if(typeof document === 'undefined') return
  if(document.getElementById('tulkit-async-styles')) return
  const link = document.createElement('link')
  link.id = 'tulkit-async-styles'
  link.rel = 'preload'
  link.as = 'style'
  link.href = asyncStylesHref
  link.addEventListener('load', ()=>{
    link.rel = 'stylesheet'
    link.as = ''
  })
  document.head.appendChild(link)

  if(!document.getElementById('tulkit-async-styles-fallback')){
    const fallback = document.createElement('noscript')
    fallback.id = 'tulkit-async-styles-fallback'
    fallback.innerHTML = `<link rel=\"stylesheet\" href=\"${asyncStylesHref}\">`
    document.head.appendChild(fallback)
  }
}

preloadModulesForPath(window.location.pathname || '/')
injectCriticalStyles()
loadDeferredStyles()

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)
