import type { LanguageCode } from './types'
import type { SeoBlurbCopy } from './i18n'
import enSeoBlurb from './copy/seoBlurbs/en'

const loaders: Partial<Record<LanguageCode, () => Promise<{ default: SeoBlurbCopy }>>> = {
  id: () => import('./copy/seoBlurbs/id')
}

const cache = new Map<LanguageCode,SeoBlurbCopy>()

export async function loadSeoBlurbs(language: LanguageCode): Promise<SeoBlurbCopy>{
  if(language === 'en'){
    cache.set('en', enSeoBlurb)
    return enSeoBlurb
  }
  const cached = cache.get(language)
  if(cached){
    return cached
  }
  const loader = loaders[language]
  if(!loader){
    return enSeoBlurb
  }
  const module = await loader()
  cache.set(language, module.default)
  return module.default
}
