import React, { useState, useCallback } from 'react'
import type { LanguageCode } from '../types'

type CaseType = 'camelCase' | 'pascalCase' | 'snake_case' | 'kebab-case' | 'SCREAMING_SNAKE_CASE' | 'dot.case' | 'space'

interface CaseConverterProps {
  language: LanguageCode
}

const caseConverters: Record<CaseType, (str: string) => string> = {
  camelCase: (str: string) => {
    return str
      .toLowerCase()
      .replace(/[-_.\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
      .replace(/^./, (c) => c.toLowerCase())
  },
  pascalCase: (str: string) => {
    return str
      .toLowerCase()
      .replace(/[-_.\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
      .replace(/^./, (c) => c.toUpperCase())
  },
  snake_case: (str: string) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/[-.\s]+/g, '_')
      .toLowerCase()
  },
  'kebab-case': (str: string) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[_.\s]+/g, '-')
      .toLowerCase()
  },
  SCREAMING_SNAKE_CASE: (str: string) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/[-.\s]+/g, '_')
      .toUpperCase()
  },
  'dot.case': (str: string) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1.$2')
      .replace(/[-_\s]+/g, '.')
      .toLowerCase()
  },
  space: (str: string) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/[-_.]+/g, ' ')
      .toLowerCase()
  }
}

const translations = {
  en: {
    heading: 'Text Case Converter',
    inputPlaceholder: 'Enter text to convert...',
    copy: 'Copy',
    copySuccess: 'Copied to clipboard!',
    copyError: 'Failed to copy',
    clear: 'Clear',
    cases: {
      camelCase: 'camelCase',
      pascalCase: 'PascalCase',
      snake_case: 'snake_case',
      'kebab-case': 'kebab-case',
      SCREAMING_SNAKE_CASE: 'SCREAMING_SNAKE_CASE',
      'dot.case': 'dot.case',
      space: 'space case'
    }
  },
  id: {
    heading: 'Konverter Kasus Teks',
    inputPlaceholder: 'Masukkan teks untuk dikonversi...',
    copy: 'Salin',
    copySuccess: 'Disalin ke clipboard!',
    copyError: 'Gagal menyalin',
    clear: 'Hapus',
    cases: {
      camelCase: 'camelCase',
      pascalCase: 'PascalCase',
      snake_case: 'snake_case',
      'kebab-case': 'kebab-case',
      SCREAMING_SNAKE_CASE: 'SCREAMING_SNAKE_CASE',
      'dot.case': 'dot.case',
      space: 'space case'
    }
  }
}

export default function CaseConverter({ language }: CaseConverterProps) {
  const t = translations[language]
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState<CaseType | null>(null)

  const convertCase = useCallback((type: CaseType): string => {
    if (!input.trim()) return ''
    try {
      return caseConverters[type](input)
    } catch {
      return ''
    }
  }, [input])

  const handleCopy = useCallback(async (type: CaseType) => {
    const text = convertCase(type)
    if (!text) return

    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      // Fallback
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
        setCopied(type)
        setTimeout(() => setCopied(null), 2000)
      } catch {
        // ignore
      }
      document.body.removeChild(textarea)
    }
  }, [convertCase])

  const caseTypes: CaseType[] = ['camelCase', 'pascalCase', 'snake_case', 'kebab-case', 'SCREAMING_SNAKE_CASE', 'dot.case', 'space']

  return (
    <div className="encode-card">
      <h2>{t.heading}</h2>

      <div className="encode-input-section">
        <textarea
          className="encode-textarea"
          placeholder={t.inputPlaceholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck="false"
        />
        <button
          type="button"
          className="toolbar-button"
          onClick={() => setInput('')}
          disabled={!input}
        >
          {t.clear}
        </button>
      </div>

      <div className="case-converter-outputs">
        {caseTypes.map((type) => {
          const converted = convertCase(type)
          const isCopied = copied === type

          return (
            <div key={type} className="case-converter-output">
              <div className="case-converter-label">{t.cases[type]}</div>
              <div className="case-converter-value">{converted}</div>
              <button
                type="button"
                className={`toolbar-button ${isCopied ? 'success' : ''}`}
                onClick={() => handleCopy(type)}
                disabled={!converted}
                title={isCopied ? t.copySuccess : t.copy}
              >
                {isCopied ? '✓' : t.copy}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
