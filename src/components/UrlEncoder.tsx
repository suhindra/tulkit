import React, { useState, useMemo } from 'react'
import { getTranslations } from '../i18n'
import { LanguageCode } from '../types'

interface UrlEncoderProps {
  language: LanguageCode
}

export default function UrlEncoder({ language }: UrlEncoderProps) {
  const { urlEncoder: copy } = getTranslations(language)
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [copied, setCopied] = useState(false)

  const output = useMemo(() => {
    if (!input) return ''
    try {
      if (mode === 'encode') {
        return encodeURIComponent(input)
      } else {
        return decodeURIComponent(input)
      }
    } catch {
      return copy.error
    }
  }, [input, mode, copy.error])

  const handleCopy = () => {
    if (output && output !== copy.error) {
      navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClear = () => {
    setInput('')
  }

  const handleSwap = () => {
    setInput(output)
    setMode(mode === 'encode' ? 'decode' : 'encode')
  }

  return (
    <div className="encode-card">
      <h2>{copy.heading}</h2>
      <p className="encode-card-subtitle">{copy.subheading}</p>

      <div className="url-encoder-container">
        <div className="url-encoder-modes">
          <button
            className={`url-mode-button ${mode === 'encode' ? 'active' : ''}`}
            onClick={() => setMode('encode')}
          >
            {copy.encode}
          </button>
          <button
            className={`url-mode-button ${mode === 'decode' ? 'active' : ''}`}
            onClick={() => setMode('decode')}
          >
            {copy.decode}
          </button>
        </div>

        <div className="url-encoder-panes">
          <div className="url-encoder-input">
            <label className="url-encoder-label">Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={copy.placeholder}
              className="url-encoder-textarea"
              spellCheck="false"
            />
          </div>

          <div className="url-encoder-output">
            <label className="url-encoder-label">Output</label>
            <pre className="url-encoder-result">
              <code>{output}</code>
            </pre>
          </div>
        </div>

        <div className="url-encoder-toolbar">
          <div className="url-toolbar-group">
            <button
              type="button"
              className="toolbar-button"
              onClick={handleClear}
              disabled={!input}
              title={copy.clearTooltip}
            >
              🗑️ {copy.clear}
            </button>
          </div>
          <div className="url-toolbar-group">
            <button
              type="button"
              className={`toolbar-button ${copied ? 'success' : ''}`}
              onClick={handleCopy}
              disabled={!output || output === copy.error}
              title={copy.copyTooltip}
            >
              {copied ? '✓ ' : '📋 '}{copied ? copy.copied : copy.copy}
            </button>
            <button
              type="button"
              className="toolbar-button"
              onClick={handleSwap}
              disabled={!output || output === copy.error}
              title={copy.swapTooltip}
            >
              ⇄ {copy.swap}
            </button>
          </div>
        </div>

        <div className="url-encoder-info">
          <h3>{copy.info.title}</h3>
          <p>{copy.info.description}</p>
          {copy.info.tips && copy.info.tips.length > 0 && (
            <ul className="url-encoder-tips">
              {copy.info.tips.map((tip) => (
                <li key={tip}>💡 {tip}</li>
              ))}
            </ul>
          )}
        </div>

        {copy.overview && (
          <div className="url-encoder-overview">
            <div className="overview-section">
              <h3>🎯 Use Cases</h3>
              <ul className="overview-list">
                {copy.overview.useCases.map((useCase) => (
                  <li key={useCase}>{useCase}</li>
                ))}
              </ul>
            </div>

            <div className="overview-section">
              <h3>✨ Benefits</h3>
              <ul className="overview-list">
                {copy.overview.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
