import React, { useState, useEffect } from 'react'
import { js_beautify, html_beautify, css_beautify } from 'js-beautify'
import { format as formatSql } from 'sql-formatter'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'
import sql from 'highlight.js/lib/languages/sql'
import phpSyntax from 'highlight.js/lib/languages/php'
import 'highlight.js/styles/github.css'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('json', json)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('php', phpSyntax)

const langs = ['html','css','js','json','sql','php'] as const
type Lang = typeof langs[number]
type ActiveTab = 'auto' | Lang

const langLabels: Record<Lang,string> = {
  html: 'HTML',
  css: 'CSS',
  js: 'JavaScript',
  json: 'JSON',
  sql: 'SQL',
  php: 'PHP'
}

const tabSlugs: Record<ActiveTab,string> = {
  auto: 'auto',
  html: 'html',
  css: 'css',
  js: 'javascript',
  json: 'json',
  sql: 'sql',
  php: 'php'
}

const slugToTab: Record<string,ActiveTab> = {
  auto: 'auto',
  html: 'html',
  css: 'css',
  javascript: 'js',
  js: 'js',
  json: 'json',
  sql: 'sql',
  php: 'php'
}

function escapeHtml(str:string){
  return str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;')
}

function detectLang(text:string):Lang{
  const trimmed = text.trim()
  if(!trimmed) return 'json'

  if(trimmed.startsWith('<?php') || trimmed.includes('<?php')) return 'php'

  if(trimmed.startsWith('<')) return 'html'

  try{
    JSON.parse(trimmed)
    return 'json'
  }catch{}

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

export default function Formatter(){
  const [lang, setLang] = useState<Lang>('html')
  const [activeTab, setActiveTab] = useState<ActiveTab>('auto')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [tabWidth, setTabWidth] = useState<number>(2)
  const [printWidth, setPrintWidth] = useState<number>(80)
  const [loadingFormatter, setLoadingFormatter] = useState(false)
  const [renderedOutput, setRenderedOutput] = useState('')

  // Initialize tab from URL path or hash slug
  useEffect(()=>{
    let initial: ActiveTab | undefined

    const path = window.location.pathname.toLowerCase()
    const match = path.match(/^\/formatter(?:\/([^/]+))?/)
    if(match){
      const slug = (match[1] || 'auto').toLowerCase()
      initial = slugToTab[slug] || 'auto'
    }else{
      const rawHash = window.location.hash.replace(/^#/, '').toLowerCase()
      if(rawHash){
        initial = slugToTab[rawHash]
      }
    }

    if(!initial) return

    setActiveTab(initial)
    if(initial !== 'auto'){
      setLang(initial)
    }
  },[])

  function updateUrlForTab(tab:ActiveTab){
    const slug = tabSlugs[tab]
    const base = '/formatter'
    const path = tab === 'auto' ? base : `${base}/${slug}`
    const url = `${path}${window.location.search}`
    window.history.replaceState(null, '', url)
  }

  async function formatPhp(text:string):Promise<string>{
    setLoadingFormatter(true)
    try{
      const prettierModule = await import('prettier/standalone')
      const pluginPhpModule = await import('@prettier/plugin-php/standalone')
      const prettier: any = (prettierModule as any).default || prettierModule
      const pluginPhp: any = (pluginPhpModule as any).default || pluginPhpModule

      const formatted = prettier.format(text, {
        parser: 'php',
        plugins: [pluginPhp],
        tabWidth,
        printWidth
      })
      return formatted
    }finally{
      setLoadingFormatter(false)
    }
  }

  async function formatCode(text:string, l:Lang){
    try{
      switch(l){
        case 'html': return Promise.resolve(html_beautify(text, {indent_size:tabWidth}))
        case 'css': return Promise.resolve(css_beautify(text, {indent_size:tabWidth}))
        case 'js': return Promise.resolve(js_beautify(text, {indent_size:tabWidth}))
        case 'json': {
          const obj = JSON.parse(text)
          return Promise.resolve(JSON.stringify(obj,null,tabWidth))
        }
        case 'sql': return Promise.resolve(formatSql(text))
        case 'php': return formatPhp(text)
      }
    }catch(e:any){
      return `Error: ${e?.message||String(e)}`
    }
  }

  async function onFormat(){
    const effectiveLang = activeTab === 'auto' ? detectLang(input) : lang
    const res = await formatCode(input, effectiveLang)
    setOutput(res)
    const hlMap: Record<Lang,string> = {
      html: 'xml',
      css: 'css',
      js: 'javascript',
      json: 'json',
      sql: 'sql',
      php: 'php'
    }
    try{
      const highlighted = hljs.highlight(res, {language: hlMap[effectiveLang]}).value
      setRenderedOutput(highlighted)
    }catch{
      setRenderedOutput(escapeHtml(res))
    }
  }

  async function onCopy(){
    try{
      await navigator.clipboard.writeText(output)
      // small feedback
      alert('Copied to clipboard')
    }catch(e){
      alert('Clipboard failed: '+String(e))
    }
  }

  function onDownload(){
    const ext =
      lang === 'json' ? 'json'
      : lang === 'js' ? 'js'
      : lang === 'html' ? 'html'
      : lang === 'css' ? 'css'
      : lang === 'sql' ? 'sql'
      : 'php'
    const blob = new Blob([output], {type:'text/plain;charset=utf-8'})
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
    reader.onload = () => {
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
          Autodetect
        </button>
        {langs.map(l=>(
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
            {langLabels[l]}
          </button>
        ))}
      </div>

      <div className="editor-frame">
        <div className="editor">
          <textarea
            value={input}
            onChange={e=>setInput(e.target.value)}
            onDragOver={e=>e.preventDefault()}
            onDrop={onDropToInput}
            placeholder="Paste your code or drag a file here"
          />
          <pre className="hljs">
            <code
              className="hljs"
              dangerouslySetInnerHTML={{__html: renderedOutput || escapeHtml(output)}}
            />
          </pre>
        </div>
      </div>

      <div className="toolbar">
        <button
          type="button"
          onClick={onFormat}
          className="toolbar-format"
        >
          {loadingFormatter ? 'Formatting…' : 'Format'}
        </button>

      <div className="toolbar-right">
          <label className="toolbar-field">
            Tab size
            <input
              type="number"
              value={tabWidth}
              min={0}
              max={8}
              onChange={e=>setTabWidth(Number(e.target.value))}
            />
          </label>

          <button type="button" className="toolbar-button" onClick={onDownload}>Download</button>
          <button type="button" className="toolbar-button" onClick={onCopy}>Copy</button>
          <button
            type="button"
            className="toolbar-button"
            onClick={()=>{setInput(''); setOutput(''); setRenderedOutput('')}}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}
