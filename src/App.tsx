import React, { useState, useEffect } from 'react'
import Formatter, { type ActiveTab } from './components/Formatter'
import UuidGenerator from './components/UuidGenerator'

type View = 'formatter' | 'uuid'

const headingByTab: Record<Exclude<ActiveTab,'auto'>, string> = {
  html: 'HTML Formatter',
  css: 'CSS Formatter',
  js: 'JavaScript Formatter',
  json: 'JSON Formatter',
  sql: 'SQL Formatter',
  php: 'PHP Formatter'
}

export default function App(){
  const [activeTab, setActiveTab] = useState<ActiveTab>('auto')
  const [view, setView] = useState<View>('formatter')

  const seoHeading =
    view === 'uuid'
      ? 'Tulkit — UUID Generator'
      : activeTab === 'auto'
        ? 'Tulkit — Web Formatter'
        : `Tulkit — ${headingByTab[activeTab]}`

  useEffect(()=>{
    const path = window.location.pathname.toLowerCase()
    if(path.startsWith('/generator/uuid') || path.startsWith('/uuid')){
      setView('uuid')
    }else if(path.startsWith('/formatter')){
      setView('formatter')
    }
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

  return (
    <div className="app">
      <header>
        <div className="container">
          <div className="brand">
            <div className="brand-logo">
              <img src="/logo-tulkit.jpg" alt="Tulkit Online logo" loading="lazy" />
            </div>
            <div className="brand-text">
              <h1>Tulkit — Web Tools</h1>
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
          </nav>
        </div>
      </header>
      <section className="seo-blurb">
        <div className="container">
          <h2>{seoHeading}</h2>
          {view === 'formatter' ? (
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
          ) : (
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
        </div>
      </section>
      <main className="container">
        {view === 'formatter' ? (
          <Formatter onTabChange={setActiveTab} />
        ) : (
          <UuidGenerator />
        )}
      </main>
      <footer>
        <div className="container"><small>Prototype — Tulkit Web Tools</small></div>
      </footer>
    </div>
  )
}
