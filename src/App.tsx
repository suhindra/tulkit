import React from 'react'
import Formatter from './components/Formatter'

export default function App(){
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
      <main className="container">
        <Formatter />
      </main>
      <footer>
        <div className="container"><small>Prototype — Tulkit Web Formatter</small></div>
      </footer>
    </div>
  )
}
