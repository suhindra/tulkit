import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import criticalStyles from './index.css?inline'
import './analytics'
const asyncStylesHref = new URL('./async-styles.css', import.meta.url).href

type ViewPreload = {
  match: (path: string) => boolean
  href: string
}

const viewPreloads: ViewPreload[] = [
  {
    match: path => path.startsWith('/formatter'),
    href: new URL('./components/Formatter.tsx', import.meta.url).href
  },
  {
    match: path => path.startsWith('/minify'),
    href: new URL('./components/Minifier.tsx', import.meta.url).href
  },
  {
    match: path => path.startsWith('/encode'),
    href: new URL('./components/Encoder.tsx', import.meta.url).href
  },
  {
    match: path => path.startsWith('/decode'),
    href: new URL('./components/Decoder.tsx', import.meta.url).href
  },
  {
    match: path => path.startsWith('/generator/uuid') || path.startsWith('/uuid'),
    href: new URL('./components/UuidGenerator.tsx', import.meta.url).href
  },
  {
    match: path => path.startsWith('/generator/lorem'),
    href: new URL('./components/LoremIpsumGenerator.tsx', import.meta.url).href
  },
  {
    match: path => path.startsWith('/generator/hash') || path.startsWith('/hash'),
    href: new URL('./components/HashGenerator.tsx', import.meta.url).href
  },
  {
    match: path => path.startsWith('/converter/epoch'),
    href: new URL('./components/EpochConverter.tsx', import.meta.url).href
  },
  {
    match: path => path.startsWith('/converter/case'),
    href: new URL('./components/CaseConverter.tsx', import.meta.url).href
  },
  {
    match: path => path.startsWith('/converter/url'),
    href: new URL('./components/UrlEncoder.tsx', import.meta.url).href
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
  if(typeof document === 'undefined') return
  const normalized = path.toLowerCase()
  viewPreloads.forEach(({ match, href }) => {
    if(match(normalized)){
      if(document.querySelector(`link[data-preloaded-module="${href}"]`)) return
      const link = document.createElement('link')
      link.rel = 'modulepreload'
      link.href = href
      link.setAttribute('data-preloaded-module', href)
      document.head.appendChild(link)
    }
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
