import type { LanguageCode } from './types'
import type { LoremCopy } from './i18n'
import en from './copy/lorem/en'
import id from './copy/lorem/id'

const copies: Record<LanguageCode,LoremCopy> = {
  en,
  id
}

export function getLoremCopy(language: LanguageCode = 'en'): LoremCopy{
  return copies[language] || copies.en
}
