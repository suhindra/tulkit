import React, { useState, useEffect, useMemo } from 'react'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/github.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { type LanguageCode, type MinifyTab } from '../types'
import { getTranslations } from '../i18n'
import { buildPathWithLanguage, stripLanguagePrefix } from '../routing'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('json', json)

const MINIFIER_SETTINGS_KEY = 'tulkit-minifier-settings'

type MinifierState = {
  tab?: MinifyTab
}

function readSettings(): MinifierState | null{
  if(typeof window === 'undefined') return null
  try{
    const raw = window.localStorage.getItem(MINIFIER_SETTINGS_KEY)
    return raw ? JSON.parse(raw) : null
  }catch{
    return null
  }
}

const minifyTabs: MinifyTab[] = ['auto','html','css','js','json']
const tabSlugs: Record<MinifyTab,string> = {
  auto: 'auto',
  html: 'html',
  css: 'css',
  js: 'javascript',
  json: 'json'
}

const slugToTab: Record<string,MinifyTab> = {
  auto: 'auto',
  html: 'html',
  css: 'css',
  javascript: 'js',
  js: 'js',
  json: 'json'
}

const highlightLanguageMap: Record<Exclude<MinifyTab,'auto'>,string> = {
  html: 'xml',
  css: 'css',
  js: 'javascript',
  json: 'json'
}

type Props = {
  language: LanguageCode
  onTabChange?: (tab: MinifyTab) => void
}

type EditorPane = 'input' | 'output'

function escapeHtml(str: string){
  return str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;')
}

function detectTab(text: string): Exclude<MinifyTab,'auto'>{
  const trimmed = text.trim()
  if(trimmed.startsWith('<')) return 'html'
  if(trimmed.startsWith('{') || trimmed.startsWith('[')){
    try{
      JSON.parse(trimmed)
      return 'json'
    }catch{/* ignore */}
  }
  if(/\b(function|=>|const|let|var|console\.log)\b/.test(trimmed)) return 'js'
  return 'css'
}

async function minifyHtml(text: string){
  const module = await import('html-minifier-terser')
  return module.minify(text, {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    keepClosingSlash: true,
    useShortDoctype: true,
    minifyCSS: false,
    minifyJS: false,
    decodeEntities: true
  })
}

async function minifyCss(text: string){
  const cssoModule = await import('csso')
  const csso = (cssoModule as any).default || cssoModule
  return csso.minify(text, { restructure: false }).css
}

async function minifyJs(text: string){
  const terserModule = await import('terser')
  const result = await terserModule.minify(text, {
    compress: true,
    mangle: true,
    format: { comments: false }
  })
  if(!result.code){
    throw new Error('No output from Terser')
  }
  return result.code
}

async function minifyJson(text: string){
  const parsed = JSON.parse(text)
  return JSON.stringify(parsed)
}

export default function Minifier({ language, onTabChange }: Props){
  const location = useLocation()
  const navigate = useNavigate()
  const saved = readSettings()
  const [activeTab, setActiveTab] = useState<MinifyTab>(saved?.tab || 'auto')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [renderedOutput, setRenderedOutput] = useState('')
  const [minifying, setMinifying] = useState(false)
  const [activePane, setActivePane] = useState<EditorPane>('input')
  const locale = getTranslations(language)
  const formatterCopy = locale.formatter
  const minifierInfo = locale.minifierLangInfo
  const infoKey: MinifyTab = activeTab === 'auto' ? 'auto' : activeTab
  const activeInfo = minifierInfo[infoKey]

  useEffect(()=>{
    if(typeof window === 'undefined') return
    window.localStorage.setItem(MINIFIER_SETTINGS_KEY, JSON.stringify({ tab: activeTab }))
  },[activeTab])

  useEffect(()=>{
    onTabChange?.(activeTab)
  },[activeTab, onTabChange])

  useEffect(()=>{
    let initial: MinifyTab | undefined
    const path = stripLanguagePrefix(location.pathname).toLowerCase()
    const match = path.match(/^\/minify(?:\/([^/]+))?/)
    if(match){
      const slug = (match[1] || 'auto').toLowerCase()
      initial = slugToTab[slug] || 'auto'
    }
    if(initial && initial !== activeTab){
      setActiveTab(initial)
    }
  },[location.pathname, activeTab])

  function updateUrl(tab: MinifyTab){
    const slug = tabSlugs[tab]
    const path = tab === 'auto' ? '/minify' : `/minify/${slug}`
    navigate(buildPathWithLanguage(path, language), { replace: true })
  }

  async function runMinify(){
    if(!input.trim()){
      setOutput('')
      setRenderedOutput('')
      setActivePane('input')
      return
    }
    const target = activeTab === 'auto' ? detectTab(input) : activeTab
    setMinifying(true)
    try{
      let result = ''
      if(target === 'html'){
        result = await minifyHtml(input)
      }else if(target === 'css'){
        result = await minifyCss(input)
      }else if(target === 'js'){
        result = await minifyJs(input)
      }else{
        result = await minifyJson(input)
      }
      setOutput(result)
      const languageKey = target === 'html' ? 'xml' : highlightLanguageMap[target]
      try{
        const highlighted = hljs.highlight(result, { language: languageKey }).value
        setRenderedOutput(highlighted)
      }catch{
        setRenderedOutput(escapeHtml(result))
      }
      setActivePane('output')
    }catch(e: any){
      alert(formatterCopy.copyErrorPrefix + (e?.message || String(e)))
    }finally{
      setMinifying(false)
    }
  }

  async function onCopy(){
    try{
      await navigator.clipboard.writeText(output)
      alert(formatterCopy.copySuccess)
    }catch(e){
      alert(formatterCopy.copyErrorPrefix+String(e))
    }
  }

  return (
    <div className="formatter">
      <div className="lang-tabs">
        {minifyTabs.map(tab=>(
          <button
            key={tab}
            type="button"
            className={`lang-tab ${activeTab===tab ? 'active' : ''}`}
            onClick={()=>{
              setActiveTab(tab)
              updateUrl(tab)
            }}
          >
            {tab === 'auto' ? formatterCopy.autodetectLabel : formatterCopy.langLabels[tab as Exclude<MinifyTab,'auto'>]}
          </button>
        ))}
      </div>

      <div className="editor-frame">
        <div className="editor">
          <div className="editor-tabs">
            <button
              type="button"
              className={`editor-tab ${activePane==='input' ? 'active' : ''}`}
              onClick={()=>setActivePane('input')}
            >
              {formatterCopy.inputTab}
            </button>
            <button
              type="button"
              className={`editor-tab ${activePane==='output' ? 'active' : ''}`}
              onClick={()=>setActivePane('output')}
              disabled={!output}
            >
              {formatterCopy.outputTab}
            </button>
          </div>
          <div className="editor-pane">
            {activePane === 'input' ? (
              <textarea
                value={input}
                onChange={e=>setInput(e.target.value)}
                placeholder={formatterCopy.placeholder}
              />
            ) : (
              <pre className="hljs editor-output">
                <code
                  className="hljs"
                  dangerouslySetInnerHTML={{__html: renderedOutput || escapeHtml(output)}}
                />
              </pre>
            )}
          </div>
        </div>
      </div>

      <div className="toolbar">
        <div className="toolbar-left">
          <button
            type="button"
            className="toolbar-format"
            onClick={runMinify}
            disabled={minifying}
          >
            {minifying ? formatterCopy.minifyingLabel : formatterCopy.minifyLabel}
          </button>
        </div>
        <div className="toolbar-right">
          <button type="button" className="toolbar-button" onClick={onCopy} disabled={!output}>
            {formatterCopy.copyLabel}
          </button>
          <button
            type="button"
            className="toolbar-button"
            onClick={()=>{
              setInput('')
              setOutput('')
              setRenderedOutput('')
              setActivePane('input')
            }}
          >
            {formatterCopy.clearLabel}
          </button>
        </div>
      </div>

      <div className="lang-info">
        <h3>{activeInfo.title}</h3>
        <p>{activeInfo.description}</p>
        {activeInfo.tips && (
          <ul>
            {activeInfo.tips.map(tip=>(
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
