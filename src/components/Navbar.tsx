import React, { useState, useRef, useEffect } from 'react'
import type { LanguageCode, View } from '../types'
import { buildPathWithLanguage } from '../routing'
import { navItems, categoryLabels, type NavCategory } from '../navbarConfig'

interface NavbarProps {
  currentView: View
  language: LanguageCode
  onNavigate: (path: string) => void
  onLanguageChange: (lang: LanguageCode) => void
}

export default function Navbar({
  currentView,
  language,
  onNavigate,
  onLanguageChange
}: NavbarProps) {
  const [openDropdown, setOpenDropdown] = useState<NavCategory | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  // Get unique categories in order
  const categories = Array.from(new Set(navItems.map(item => item.category)))
    .sort((a, b) => ['formatter', 'minify', 'generators', 'converters', 'codecs'].indexOf(a) - ['formatter', 'minify', 'generators', 'converters', 'codecs'].indexOf(b))

  // Items that appear as direct buttons (no dropdown)
  const directItems = navItems.filter(item => item.category === 'formatter' || item.category === 'minify')

  // Items that appear in dropdowns
  const dropdownCategories = categories.filter(cat => cat !== 'formatter' && cat !== 'minify')

  // Get items for a category
  const getItemsForCategory = (cat: NavCategory) => {
    return navItems.filter(item => item.category === cat)
  }

  // Detect current category
  const getCurrentCategory = () => {
    const current = navItems.find(item => {
      if (currentView === 'formatter') return item.category === 'formatter'
      if (currentView === 'minify') return item.category === 'minify'
      if (currentView === 'uuid') return item.path.includes('uuid')
      if (currentView === 'lorem') return item.path.includes('lorem')
      if (currentView === 'hash') return item.path.includes('hash')
      if (currentView === 'case') return item.path.includes('case')
      if (currentView === 'epoch') return item.category === 'converters'
      if (currentView === 'encode') return item.path.includes('encode')
      if (currentView === 'decode') return item.path.includes('decode')
      return false
    })
    return current?.category || null
  }

  const currentCategory = getCurrentCategory()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault()
    setOpenDropdown(null)
    onNavigate(buildPathWithLanguage(path, language))
  }

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-container">
        {/* Direct navigation items */}
        <div className="navbar-items">
          {directItems.map(item => (
            <a
              key={item.path}
              href={buildPathWithLanguage(item.path, language)}
              className={`navbar-link ${currentView === 'formatter' && item.category === 'formatter' ? 'active' : ''} ${currentView === 'minify' && item.category === 'minify' ? 'active' : ''}`}
              onClick={e => handleNavClick(e, item.path)}
              title={item.label}
            >
              {item.icon && <span className="navbar-icon">{item.icon}</span>}
              <span className="navbar-label">{item.label}</span>
            </a>
          ))}

          {/* Dropdown items */}
          {dropdownCategories.map(category => {
            const categoryItems = getItemsForCategory(category)
            const isOpen = openDropdown === category
            const isCurrent = currentCategory === category

            return (
              <div key={category} className="navbar-dropdown-wrapper">
                <button
                  className={`navbar-dropdown-toggle ${isOpen ? 'open' : ''} ${isCurrent ? 'active' : ''}`}
                  onClick={() => setOpenDropdown(isOpen ? null : category)}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                >
                  <span className="navbar-label">{categoryLabels[category]}</span>
                  <span className="navbar-chevron">▼</span>
                </button>

                {isOpen && (
                  <div className="navbar-dropdown-menu">
                    {categoryItems.map(item => (
                      <a
                        key={item.path}
                        href={buildPathWithLanguage(item.path, language)}
                        className={`navbar-dropdown-item ${
                          (currentView === 'uuid' && item.path.includes('uuid')) ||
                          (currentView === 'lorem' && item.path.includes('lorem')) ||
                          (currentView === 'hash' && item.path.includes('hash')) ||
                          (currentView === 'case' && item.path.includes('case')) ||
                          (currentView === 'epoch' && item.path.includes('epoch')) ||
                          (currentView === 'encode' && item.path.includes('encode')) ||
                          (currentView === 'decode' && item.path.includes('decode'))
                            ? 'active'
                            : ''
                        }`}
                        onClick={e => handleNavClick(e, item.path)}
                      >
                        {item.icon && <span className="navbar-dropdown-icon">{item.icon}</span>}
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Language switcher */}
        <div className="navbar-actions">
          <button
            className="navbar-lang-toggle"
            onClick={() => onLanguageChange(language === 'en' ? 'id' : 'en')}
            title={`Switch to ${language === 'en' ? 'Indonesian' : 'English'}`}
            aria-label="Language switcher"
          >
            <span className="navbar-flag">🌐</span>
            <span className="navbar-lang-code">{language.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
