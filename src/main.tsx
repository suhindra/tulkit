import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import criticalStyles from './index.css?inline'
import './analytics'
const asyncStylesHref = new URL('./async-styles.css', import.meta.url).href

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
