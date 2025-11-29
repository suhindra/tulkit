import React, { useState, useEffect } from 'react'
import Formatter, { type ActiveTab } from './components/Formatter'
import UuidGenerator, { type UuidVersion } from './components/UuidGenerator'
import EpochConverter from './components/EpochConverter'
import { formatterOverviewByTab, uuidOverviewByVersion, epochOverview } from './pageOverviewContent'

declare global {
  interface Window {
    kofiWidgetOverlay?: {
      draw: (...args: any[]) => void
    }
  }
}

type View = 'formatter' | 'uuid' | 'epoch' | 'notfound'

const headingByTab: Record<Exclude<ActiveTab,'auto'>, string> = {
  html: 'HTML Formatter',
  css: 'CSS Formatter',
  js: 'JavaScript Formatter',
  json: 'JSON Formatter',
  sql: 'SQL Formatter',
  php: 'PHP Formatter'
}

const descriptionByTab: Record<ActiveTab, string> = {
  auto:
    'Format HTML, CSS, JavaScript, JSON, SQL, or PHP in one place. Tulkit autodetects your language and cleans up snippets directly in your browser.',
  html:
    'Use Tulkit to beautify HTML for landing pages, emails, and CMS snippets so nested tags stay readable in editors and code reviews.',
  css:
    'Clean up CSS, SCSS, and utility classes with Tulkit so selectors and declarations are consistently indented for easier debugging.',
  js:
    'Format JavaScript snippets, ES modules, and async code with Tulkit to quickly tidy experiments, code samples, or log output.',
  json:
    'Pretty‑print and validate JSON payloads, configs, and API responses using Tulkit directly in your browser.',
  sql:
    'Reformat long SQL queries with Tulkit so SELECT, JOIN, and CTE statements are easier to read and share.',
  php:
    'Tidy up PHP snippets for Laravel, WordPress, and other projects using Tulkit’s in‑browser formatter.'
}

const uuidDescriptionByVersion: Record<UuidVersion, string> = {
  v1:
    'Generate time‑based UUID v1 values with Tulkit when you want identifiers that roughly follow creation order for logs, jobs, or import batches.',
  v4:
    'Generate random UUID v4 identifiers in bulk with Tulkit directly in your browser using the Web Crypto API for secure, high‑quality IDs.',
  v7:
    'Generate time‑ordered UUID v7 identifiers with Tulkit so your IDs stay sortable while still including strong randomness.'
}

export default function App(){
  const [activeTab, setActiveTab] = useState<ActiveTab>('auto')
  const [view, setView] = useState<View>('formatter')
  const [uuidVersion, setUuidVersion] = useState<UuidVersion>('v4')

  const formatterOverview = formatterOverviewByTab[activeTab]
  const uuidOverview = uuidOverviewByVersion[uuidVersion]

  const seoHeading =
    view === 'uuid'
      ? 'UUID Generator — Tulkit'
      : view === 'epoch'
        ? 'Epoch Converter — Tulkit'
        : view === 'notfound'
          ? 'Page not found — Tulkit'
          : activeTab === 'auto'
            ? 'Web Formatter — Tulkit'
            : `${headingByTab[activeTab]} — Tulkit`

  useEffect(()=>{
    document.title = seoHeading
  },[seoHeading])

  useEffect(()=>{
    const path = window.location.pathname.toLowerCase()
    if(path === '/' || path === ''){
      setView('formatter')
    }else if(path.startsWith('/converter/epoch')){
      setView('epoch')
    }else if(path.startsWith('/generator/uuid') || path.startsWith('/uuid')){
      setView('uuid')
    }else if(path.startsWith('/formatter')){
      setView('formatter')
    }else{
      setView('notfound')
    }
  },[])

  useEffect(()=>{
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if(!meta) return

    if(view === 'uuid'){
      meta.content = uuidDescriptionByVersion[uuidVersion]
      return
    }

    if(view === 'epoch'){
      meta.content =
        'Convert Unix epoch timestamps to readable dates and back again with Tulkit. Quickly switch between seconds, milliseconds, UTC, and local time directly in your browser.'
      return
    }

    if(view === 'notfound'){
      meta.content =
        'The page you were looking for on Tulkit could not be found. Browse the web formatter, UUID generator, or epoch converter tools instead.'
      return
    }

    const key: ActiveTab = activeTab || 'auto'
    meta.content = descriptionByTab[key]
  },[view, activeTab, uuidVersion])

  useEffect(()=>{
    const existing = document.getElementById('kofi-overlay-widget')
    if(existing) return

    const script = document.createElement('script')
    script.id = 'kofi-overlay-widget'
    script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'
    script.async = true
    script.onload = ()=>{
      if(window.kofiWidgetOverlay){
        window.kofiWidgetOverlay.draw('tulkit', {
          type: 'floating-chat',
          'floating-chat.donateButton.text': 'Donate',
          'floating-chat.donateButton.background-color': '#323842',
          'floating-chat.donateButton.text-color': '#fff'
        })
      }
    }
    document.body.appendChild(script)
  },[])

  function goToFormatter(){
    const url = `/formatter${window.location.search}`
    window.history.replaceState(null, '', url)
    setView('formatter')
  }

  function goToUuid(){
    const url = `/generator/uuid${window.location.search}`
    window.history.replaceState(null, '', url)
    setView('uuid')
  }

  function goToEpoch(){
    const url = `/converter/epoch${window.location.search}`
    window.history.replaceState(null, '', url)
    setView('epoch')
  }

  return (
    <div className="app">
      <header>
        <div className="container">
          <div className="brand">
            <div className="brand-logo">
              <img src="/logo-tulkit.jpg" alt="Tulkit Online logo" loading="lazy" />
            </div>
            <div className="brand-text">
              <h1>Web Tools — Tulkit</h1>
              <p>Quick tools for HTML / CSS / JS / JSON / SQL / UUIDs</p>
              <p className="brand-note">
                All formatting and generation happens in your browser only; your code never leaves your device.
              </p>
            </div>
          </div>
          <nav className="top-nav">
            <button
              type="button"
              className={`top-nav-item ${view === 'formatter' ? 'active' : ''}`}
              onClick={goToFormatter}
            >
              Formatter
            </button>
            <button
              type="button"
              className={`top-nav-item ${view === 'uuid' ? 'active' : ''}`}
              onClick={goToUuid}
            >
              UUID Generator
            </button>
            <button
              type="button"
              className={`top-nav-item ${view === 'epoch' ? 'active' : ''}`}
              onClick={goToEpoch}
            >
              Epoch Converter
            </button>
          </nav>
        </div>
      </header>
      {view !== 'notfound' && (
        <section className="seo-blurb">
          <div className="container">
            <h2>{seoHeading}</h2>
            {view === 'formatter' && (
              <>
                <p>
                  A fast WebFormatter alternative for HTML, CSS, JavaScript, SQL, JSON, and PHP. Tulkit lets developers, technical
                  writers, and QA teams tidy up code directly in the browser without installing extra tools. Paste a snippet from
                  your editor or drag a file, then get a clean result that is ready for documentation, pull requests, or debugging sessions.
                </p>
                <p>
                  The formatter includes syntax highlighting, tab width controls, and automatic language detection, so it is a handy
                  companion whether you are polishing front-end assets or reviewing database queries. All formatting stays local in your
                  browser for maximum privacy.
                </p>
              </>
            )}
            {view === 'uuid' && (
              <>
                <p>
                  Generate one or many RFC‑4122 compliant UUID v4 values directly in your browser. Control casing and formatting to match
                  how your application expects IDs.
                </p>
                <p>
                  UUIDs are generated using the Web Crypto API when available, so identifiers are high‑quality and never sent to a server.
                </p>
              </>
            )}
            {view === 'epoch' && (
              <>
                <p>
                  Convert Unix epoch timestamps to readable dates and back again in seconds. Paste a value in seconds or milliseconds and
                  see matching UTC, GMT, and time-zone aware local output.
                </p>
                <p>
                  You can also pick a date and time, copy the resulting Unix values for use in APIs or database queries, and adjust the
                  time zone to see how the same instant appears around the world.
                </p>
              </>
            )}
          </div>
        </section>
      )}
      <main className="container">
        {view === 'formatter' && <Formatter onTabChange={setActiveTab} />}
        {view === 'uuid' && <UuidGenerator onVersionChange={setUuidVersion} />}
        {view === 'epoch' && <EpochConverter />}
        {view === 'notfound' && (
          <div className="not-found-card">
            <h2>Page not found</h2>
            <p>
              The link you followed does not match any Tulkit tools. You can jump back to the formatter, UUID generator, or epoch
              converter using the buttons above.
            </p>
            <button type="button" className="toolbar-button" onClick={goToFormatter}>
              Go to Web Formatter
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
          </div>
        </section>
      )}
      <footer>
        <div className="container"><small>Prototype — Tulkit Web Tools</small></div>
      </footer>
    </div>
  )
}
