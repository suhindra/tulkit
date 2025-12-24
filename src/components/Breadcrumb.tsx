import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getTranslations } from '../i18n'
import { detectLanguageFromPath, stripLanguagePrefix, buildPathWithLanguage } from '../routing'
import { navItems } from '../navbarConfig'
import type { LanguageCode } from '../types'
import './Breadcrumb.css'

export interface BreadcrumbItem {
  label: string
  path: string
}

const Breadcrumb: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const language = detectLanguageFromPath(location.pathname)
  const translations = getTranslations(language)
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const strippedPath = stripLanguagePrefix(location.pathname)
    
    // Home page
    if (strippedPath === '/' || strippedPath === '') {
      const homeItem = navItems.find(item => item.path === '/')
      if (homeItem) {
        return [
          { label: translations[homeItem.labelId as keyof typeof translations] || homeItem.label, path: '/' }
        ]
      }
      return [{ label: 'Home', path: '/' }]
    }

    const segments = strippedPath.split('/').filter(Boolean)
    const homeItem = navItems.find(item => item.path === '/')
    const breadcrumbs: BreadcrumbItem[] = [
      { 
        label: homeItem ? (translations[homeItem.labelId as keyof typeof translations] || homeItem.label) : 'Home', 
        path: '/' 
      }
    ]

    // Find matching nav item or build breadcrumb from path
    const currentPath = '/' + segments.join('/')
    
    // Attempt to match with navItems
    const matchedItem = navItems.find(item => item.path === currentPath)
    if (matchedItem) {
      breadcrumbs.push({
        label: translations[matchedItem.labelId as keyof typeof translations] || matchedItem.label,
        path: currentPath
      })
      return breadcrumbs
    }

    // Build breadcrumb from segments if no exact match found
    let currentBuildPath = ''
    segments.forEach((segment, index) => {
      currentBuildPath += '/' + segment
      
      // Format display name from segment
      const displayName = segment
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      // Check if this path matches any nav item
      const matchingNavItem = navItems.find(item => item.path === currentBuildPath)
      const label = matchingNavItem 
        ? (translations[matchingNavItem.labelId as keyof typeof translations] || matchingNavItem.label)
        : displayName

      breadcrumbs.push({
        label,
        path: currentBuildPath
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  const handleNavigate = (path: string) => {
    const fullPath = buildPathWithLanguage(path, language)
    navigate(fullPath)
  }

  if (breadcrumbs.length <= 1) {
    return null // Don't show breadcrumb on home page
  }

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <div>
        <ol className="breadcrumb-list">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="breadcrumb-item">
              {index < breadcrumbs.length - 1 ? (
                <>
                  <button
                    onClick={() => handleNavigate(crumb.path)}
                    className="breadcrumb-link"
                  >
                    {crumb.label}
                  </button>
                  <span className="breadcrumb-separator">/</span>
                </>
              ) : (
                <span className="breadcrumb-current">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}

export default Breadcrumb
