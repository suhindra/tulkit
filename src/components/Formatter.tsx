import React, { useState, useEffect, useMemo } from 'react'
import 'highlight.js/styles/github.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { formatterLangs, type ActiveTab, type FormatterLang, type LanguageCode } from '../types'
import { getTranslations } from '../i18n'
import { buildPathWithLanguage, stripLanguagePrefix } from '../routing'

const FORMATTER_SETTINGS_KEY = 'tulkit-formatter-settings'

type FormatterPersistedState = {
  activeTab?: ActiveTab
  tabWidth?: number
  printWidth?: number
  lang?: FormatterLang
}

function readFormatterSettings(): FormatterPersistedState | null{
  if(typeof window === 'undefined') return null
  try{
    const raw = window.localStorage.getItem(FORMATTER_SETTINGS_KEY)
    return raw ? JSON.parse(raw) : null
  }catch{
    return null
  }
}

function isFormatterLang(value: unknown): value is FormatterLang{
  return formatterLangs.includes(value as FormatterLang)
}

function isActiveTabValue(value: unknown): value is ActiveTab{
  return value === 'auto' || isFormatterLang(value)
}

type Lang = FormatterLang
type EditorPane = 'input' | 'output'

type FormatterProps = {
  onTabChange?: (tab: ActiveTab) => void
  language: LanguageCode
}

const tabSlugs: Record<ActiveTab,string> = {
  auto: 'auto',
  html: 'html',
  xml: 'xml',
  yaml: 'yaml',
  css: 'css',
  js: 'javascript',
  json: 'json',
  sql: 'sql',
  php: 'php'
}

const slugToTab: Record<string,ActiveTab> = {
  auto: 'auto',
  html: 'html',
  xml: 'xml',
  yaml: 'yaml',
  yml: 'yaml',
  css: 'css',
  javascript: 'js',
  js: 'js',
  json: 'json',
  sql: 'sql',
  php: 'php'
}

const highlightLanguageMap: Record<Lang,string> = {
  html: 'xml',
  xml: 'xml',
  yaml: 'yaml',
  css: 'css',
  js: 'javascript',
  json: 'json',
  sql: 'sql',
  php: 'php'
}

type BeautifyModule = typeof import('js-beautify')
type SqlFormatterModule = typeof import('sql-formatter')
type HighlightCore = typeof import('highlight.js/lib/core')

let beautifyModulePromise: Promise<BeautifyModule> | null = null
let sqlFormatterPromise: Promise<SqlFormatterModule> | null = null
let highlightCorePromise: Promise<any> | null = null
const registeredHighlightLanguages = new Set<string>()

const highlightLanguageLoaders: Record<string, () => Promise<any>> = {
  xml: ()=>import('highlight.js/lib/languages/xml'),
  yaml: ()=>import('highlight.js/lib/languages/yaml'),
  css: ()=>import('highlight.js/lib/languages/css'),
  javascript: ()=>import('highlight.js/lib/languages/javascript'),
  json: ()=>import('highlight.js/lib/languages/json'),
  sql: ()=>import('highlight.js/lib/languages/sql'),
  php: ()=>import('highlight.js/lib/languages/php')
}

async function loadBeautifyModule(){
  if(!beautifyModulePromise){
    beautifyModulePromise = import('js-beautify')
  }
  return beautifyModulePromise
}

async function loadSqlFormatterModule(){
  if(!sqlFormatterPromise){
    sqlFormatterPromise = import('sql-formatter')
  }
  return sqlFormatterPromise
}

async function loadHighlightCore(){
  if(!highlightCorePromise){
    highlightCorePromise = import('highlight.js/lib/core').then(mod=> (mod as any).default || mod)
  }
  return highlightCorePromise
}

async function getHighlighter(language: Lang){
  const key = highlightLanguageMap[language]
  const loader = highlightLanguageLoaders[key]
  const core = await loadHighlightCore()
  if(loader && !registeredHighlightLanguages.has(key)){
    const module = await loader()
    const languageModule = (module as any).default || module
    core.registerLanguage(key, languageModule)
    registeredHighlightLanguages.add(key)
  }
  return core
}

function escapeHtml(str: string){
  return str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;')
}

function detectLang(text: string): Lang{
  const trimmed = text.trim()
  if(!trimmed) return 'json'

  if(trimmed.startsWith('<?php') || trimmed.includes('<?php')) return 'php'

  if(trimmed.startsWith('<?xml')) return 'xml'

  if(trimmed.startsWith('<')) return 'html'

  try{
    JSON.parse(trimmed)
    return 'json'
  }catch{}

  if(trimmed.startsWith('---') || trimmed.includes(':\n') || trimmed.includes('\n- ')){
    return 'yaml'
  }

  const upper = trimmed.toUpperCase()
  if(upper.includes(' SELECT ') || upper.startsWith('SELECT ') || upper.startsWith('INSERT ') || upper.startsWith('UPDATE ') || upper.startsWith('DELETE ')){
    return 'sql'
  }

  if(trimmed.includes('function ') || trimmed.includes('=>') || trimmed.includes('console.log')){
    return 'js'
  }

  if(trimmed.includes('{') && trimmed.includes('}')) return 'js'

  return 'html'
}

export default function Formatter({ onTabChange, language }: FormatterProps){
  const location = useLocation()
  const navigate = useNavigate()
  const savedSettings = useMemo(()=>readFormatterSettings(),[])
  const [lang, setLang] = useState<Lang>(()=> {
    if(savedSettings && savedSettings.lang && isFormatterLang(savedSettings.lang)){
      return savedSettings.lang
    }
    return 'html'
  })
  const [activeTab, setActiveTab] = useState<ActiveTab>(()=> {
    if(savedSettings && savedSettings.activeTab && isActiveTabValue(savedSettings.activeTab)){
      return savedSettings.activeTab
    }
    return 'auto'
  })
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [tabWidth, setTabWidth] = useState<number>(()=> {
    if(savedSettings && typeof savedSettings.tabWidth === 'number' && Number.isFinite(savedSettings.tabWidth)){
      return Math.min(Math.max(savedSettings.tabWidth, 0), 8)
    }
    return 2
  })
  const [printWidth, setPrintWidth] = useState<number>(()=> {
    if(savedSettings && typeof savedSettings.printWidth === 'number' && Number.isFinite(savedSettings.printWidth)){
      return Math.min(Math.max(savedSettings.printWidth, 20), 200)
    }
    return 80
  })
  const [loadingFormatter, setLoadingFormatter] = useState(false)
  const [renderedOutput, setRenderedOutput] = useState('')
  const [activePane, setActivePane] = useState<EditorPane>('input')
  const formatterCopy = getTranslations(language).formatter
  const activeInfo = formatterCopy.langInfo[activeTab]

  useEffect(()=>{
    if(typeof window === 'undefined') return
    let initial: ActiveTab | undefined

    const path = stripLanguagePrefix(location.pathname).toLowerCase()
    const match = path.match(/^\/formatter(?:\/([^/]+))?/)
    if(match){
      const slug = (match[1] || 'auto').toLowerCase()
      initial = slugToTab[slug] || 'auto'
    }else{
      const rawHash = location.hash.replace(/^#/, '').toLowerCase()
      if(rawHash){
        initial = slugToTab[rawHash]
      }
    }

    if(!initial) return

    setActiveTab(initial)
    if(initial !== 'auto'){
      setLang(initial)
    }
  },[location.pathname, location.hash])

  useEffect(()=>{
    if(typeof window === 'undefined') return
    const payload: FormatterPersistedState = {
      activeTab,
      tabWidth,
      printWidth,
      lang
    }
    try{
      window.localStorage.setItem(FORMATTER_SETTINGS_KEY, JSON.stringify(payload))
    }catch{
      // ignore
    }
  },[activeTab, tabWidth, printWidth, lang])

  useEffect(()=>{
    onTabChange?.(activeTab)
  },[activeTab, onTabChange])

  function updateUrlForTab(tab: ActiveTab){
    const slug = tabSlugs[tab]
    const path = tab === 'auto' ? '/formatter' : `/formatter/${slug}`
    const url = `${buildPathWithLanguage(path, language)}${location.search}`
    navigate(url, { replace: true })
  }

  async function formatPhp(text: string): Promise<string>{
    const prettierModule = await import('prettier/standalone')
    const pluginPhpModule = await import('@prettier/plugin-php/standalone')
    const prettier: any = (prettierModule as any).default || prettierModule
    const pluginPhp: any = (pluginPhpModule as any).default || pluginPhpModule

    return prettier.format(text, {
      parser: 'php',
      plugins: [pluginPhp],
      tabWidth,
      printWidth
    })
  }

  async function formatYaml(text: string): Promise<string>{
    const prettierModule = await import('prettier/standalone')
    const yamlPluginModule = await import('prettier/plugins/yaml')
    const prettier: any = (prettierModule as any).default || prettierModule
    const yamlPlugin: any = (yamlPluginModule as any).default || yamlPluginModule

    return prettier.format(text, {
      parser: 'yaml',
      plugins: [yamlPlugin],
      tabWidth,
      printWidth
    })
  }

  async function formatCode(text: string, language: Lang){
    try{
      switch(language){
        case 'html': {
          const { html_beautify } = await loadBeautifyModule()
          return html_beautify(text, { indent_size: tabWidth })
        }
        case 'xml': {
          const { html_beautify } = await loadBeautifyModule()
          return html_beautify(text, { indent_size: tabWidth })
        }
        case 'yaml':
          return formatYaml(text)
        case 'css': {
          const { css_beautify } = await loadBeautifyModule()
          return css_beautify(text, { indent_size: tabWidth })
        }
        case 'js': {
          const { js_beautify } = await loadBeautifyModule()
          return js_beautify(text, { indent_size: tabWidth })
        }
        case 'json': {
          const obj = JSON.parse(text)
          return JSON.stringify(obj, null, tabWidth)
        }
        case 'sql': {
          const { format } = await loadSqlFormatterModule()
          return format(text)
        }
        case 'php': return formatPhp(text)
        default: return text
      }
    }catch(e: any){
      return `Error: ${e?.message || String(e)}`
    }
  }

  async function onFormat(){
    setLoadingFormatter(true)
    try{
      const effectiveLang = activeTab === 'auto' ? detectLang(input) : lang
      const res = await formatCode(input, effectiveLang)
      setOutput(res)
      try{
        const highlighter = await getHighlighter(effectiveLang)
        const highlighted = highlighter.highlight(res, { language: highlightLanguageMap[effectiveLang] }).value
        setRenderedOutput(highlighted)
      }catch{
        setRenderedOutput(escapeHtml(res))
      }
      setActivePane('output')
    }finally{
      setLoadingFormatter(false)
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

  function onDownload(){
    const ext =
      lang === 'json' ? 'json'
      : lang === 'js' ? 'js'
      : lang === 'html' ? 'html'
      : lang === 'xml' ? 'xml'
      : lang === 'yaml' ? 'yml'
      : lang === 'css' ? 'css'
      : lang === 'sql' ? 'sql'
      : 'php'
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `formatted.${ext}`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  function onDropToInput(e: React.DragEvent<HTMLTextAreaElement>){
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if(!file) return

    const reader = new FileReader()
    reader.onload = ()=>{
      const text = typeof reader.result === 'string' ? reader.result : ''
      setInput(text)
    }
    reader.readAsText(file)
  }

  return (
    <div className="formatter">
      <div className="lang-tabs">
        <button
          type="button"
          className={`lang-tab lang-tab-muted ${activeTab==='auto' ? 'active' : ''}`}
          onClick={()=>{
            setActiveTab('auto')
            updateUrlForTab('auto')
          }}
        >
          {formatterCopy.autodetectLabel}
        </button>
        {formatterLangs.map(l=>(
          <button
            key={l}
            type="button"
            className={`lang-tab ${activeTab===l ? 'active' : ''}`}
            onClick={()=>{
              setLang(l)
              setActiveTab(l)
              updateUrlForTab(l)
            }}
          >
            {formatterCopy.langLabels[l]}
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
                onDragOver={e=>e.preventDefault()}
                onDrop={onDropToInput}
                placeholder={formatterCopy.placeholder}
              />
            ) : (
              <pre className="hljs editor-output">
                <code
                  className="hljs"
                  dangerouslySetInnerHTML={{ __html: renderedOutput || escapeHtml(output) }}
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
            onClick={onFormat}
            className="toolbar-format"
            disabled={loadingFormatter}
          >
            {loadingFormatter ? formatterCopy.formattingLabel : formatterCopy.formatLabel}
          </button>
        </div>
        <div className="toolbar-right">
          <label className="toolbar-field">
            {formatterCopy.tabSizeLabel}
            <input
              type="number"
              value={tabWidth}
              min={0}
              max={8}
              onChange={e=>setTabWidth(Number(e.target.value))}
            />
          </label>
          <button type="button" className="toolbar-button" onClick={onDownload}>{formatterCopy.downloadLabel}</button>
          <button
            type="button"
            className="toolbar-button"
            onClick={onCopy}
            disabled={!output}
          >
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
