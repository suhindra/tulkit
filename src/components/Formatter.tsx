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
type EditorPane = 'input' | 'output'

type FormatterProps = {
  onTabChange?: (tab: ActiveTab) => void
}

type LangInfo = {
  title: string
  description: string
  tips?: string[]
  link?: {href: string, label: string}
}

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

const langInfo: Record<ActiveTab,LangInfo> = {
  auto: {
    title: 'Autodetect Formatting',
    description: 'Tulkit inspects your snippet for tags, braces, JSON structures, or SQL keywords and picks a formatter automatically. Use this when you often switch between languages and want a fast, no-click workflow.',
    tips: [
      'If detection misses, pick a language tab manually to override it.',
      'Autodetect favors safe defaults, so ambiguous input falls back to HTML.'
    ]
  },
  html: {
    title: 'HTML Beautifier',
    description: 'Clean up markup for landing pages, emails, or CMS snippets. Nested tags are indented using the tab size you choose so copied code stays readable in reviews.',
    tips: [
      'Great for tidying inline SVG and template partials.',
      'Pair with Copy to move formatted markup directly into CMS editors.'
    ]
  },
  css: {
    title: 'CSS Formatter',
    description: 'Normalize spacing between selectors and declarations for CSS, SCSS, or even Tailwind utility blocks. Helps spot duplicate rules before committing.',
    tips: [
      'Use smaller tab sizes for utility-first frameworks.',
      'Drag a stylesheet into the editor to scan larger files quickly.'
    ]
  },
  js: {
    title: 'JavaScript Formatter',
    description: 'Ideal for cleaning up quick experiments, codepen exports, or snippets pasted from logs. Handles ES modules, arrow functions, and async code.',
    tips: [
      'Set tab size to 2 spaces to match most React/Node conventions.',
      'Works nicely for TypeScript transpiled output when you need to inspect it.'
    ]
  },
  json: {
    title: 'JSON Prettifier',
    description: 'Validate and pretty-print API payloads, config files, or OpenAPI fragments. Tulkit parses the JSON to make sure the structure is valid before reformatting.',
    tips: [
      'Use Copy to send formatted payloads to your teammates.',
      'If parsing fails, the error message points to the problematic character.'
    ]
  },
  sql: {
    title: 'SQL Formatter',
    description: 'Makes long SELECT queries readable with consistent keyword casing and indentation. Handy for sharing Postgres/MySQL queries or debugging ORMs.',
    tips: [
      'Supports JOIN, CTE, INSERT, UPDATE, and DELETE statements.',
      'Great companion when pasting queries into code reviews or documentation.'
    ]
  },
  php: {
    title: 'PHP Formatter',
    description: 'Powered by Prettier PHP, perfect for Laravel, WordPress, or legacy snippets. Tulkit loads the formatter on demand so the UI stays fast.',
    tips: [
      'Tab width and print width map directly to Prettier options.',
      'Formatting runs entirely in your browser to keep proprietary code private.'
    ]
  }
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

export default function Formatter({ onTabChange }: FormatterProps = {}){
  const [lang, setLang] = useState<Lang>('html')
  const [activeTab, setActiveTab] = useState<ActiveTab>('auto')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [tabWidth, setTabWidth] = useState<number>(2)
  const [printWidth, setPrintWidth] = useState<number>(80)
  const [loadingFormatter, setLoadingFormatter] = useState(false)
  const [renderedOutput, setRenderedOutput] = useState('')
  const [activePane, setActivePane] = useState<EditorPane>('input')

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

  useEffect(()=>{
    onTabChange?.(activeTab)
  },[activeTab, onTabChange])

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
    setActivePane('output')
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
          <div className="editor-tabs">
            <button
              type="button"
              className={`editor-tab ${activePane==='input' ? 'active' : ''}`}
              onClick={()=>setActivePane('input')}
            >
              Input
            </button>
            <button
              type="button"
              className={`editor-tab ${activePane==='output' ? 'active' : ''}`}
              onClick={()=>setActivePane('output')}
              disabled={!output}
            >
              Output
            </button>
          </div>
          <div className="editor-pane">
            {activePane === 'input' ? (
              <textarea
                value={input}
                onChange={e=>setInput(e.target.value)}
                onDragOver={e=>e.preventDefault()}
                onDrop={onDropToInput}
                placeholder="Paste your code or drag a file here"
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
            onClick={()=>{
              setInput('')
              setOutput('')
              setRenderedOutput('')
              setActivePane('input')
            }}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="lang-info">
        <h3>{langInfo[activeTab].title}</h3>
        <p>{langInfo[activeTab].description}</p>
        {langInfo[activeTab].tips && (
          <ul>
            {langInfo[activeTab].tips!.map((tip)=>(
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export type { ActiveTab }
