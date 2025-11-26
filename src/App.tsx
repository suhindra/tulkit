import React, { useState } from 'react'
import Formatter, { type ActiveTab } from './components/Formatter'

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
  const seoHeading = activeTab === 'auto' ? 'Tulkit — Web Formatter' : `Tulkit — ${headingByTab[activeTab]}`

  return (
    <div className="app">
      <header>
        <div className="container">
          <div className="brand">
            <div className="brand-logo">
              <img src="/logo-tulkit.png" alt="Tulkit Online logo" loading="lazy" />
            </div>
            <div className="brand-text">
              <h1>Tulkit — Web Formatter</h1>
              <p>Quick formatter for HTML / CSS / JS / JSON / SQL</p>
              <p className="brand-note">
                All formatting happens in your browser only; your code never leaves your device.
              </p>
            </div>
          </div>
        </div>
      </header>
      <section className="seo-blurb">
        <div className="container">
          <h2>{seoHeading}</h2>
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
        </div>
      </section>
      <main className="container">
        <Formatter onTabChange={setActiveTab} />
      </main>
      <footer>
        <div className="container"><small>Prototype — Tulkit Web Formatter</small></div>
      </footer>
    </div>
  )
}
