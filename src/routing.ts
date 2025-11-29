import type { LanguageCode } from './types'

const LANGUAGE_PREFIX: Record<LanguageCode,string> = {
  en: '',
  id: '/id-ID'
}

export function detectLanguageFromPath(pathname: string): LanguageCode{
  if(pathname === '/id-ID' || pathname === '/id-ID/' || pathname.startsWith('/id-ID/')){
    return 'id'
  }
  return 'en'
}

export function stripLanguagePrefix(pathname: string): string{
  if(!pathname) return '/'
  if(pathname === '/id-ID' || pathname === '/id-ID/'){
    return '/'
  }
  if(pathname.startsWith('/id-ID/')){
    const remainder = pathname.slice('/id-ID'.length)
    return remainder || '/'
  }
  return pathname
}

export function buildPathWithLanguage(path: string, language: LanguageCode): string{
  const normalized = path && path !== '' ? path : '/'
  const prefix = LANGUAGE_PREFIX[language]
  if(!prefix){
    return normalized
  }
  if(normalized === '/'){
    return `${prefix}/`
  }
  return `${prefix}${normalized}`
}
