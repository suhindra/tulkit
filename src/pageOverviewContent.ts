import type { LanguageCode } from './types'
import type { OverviewContent, OverviewCopy } from './i18n'
import enOverviews from './copy/overviews/en'

export type { OverviewContent }

const loaders: Partial<Record<LanguageCode, () => Promise<{ default: OverviewCopy }>>> = {
  id: () => import('./copy/overviews/id')
}

const cache = new Map<LanguageCode,OverviewCopy>()

export async function loadOverviewContent(language: LanguageCode): Promise<OverviewCopy>{
  if(language === 'en'){
    cache.set('en', enOverviews)
    return enOverviews
  }
  const cached = cache.get(language)
  if(cached){
    return cached
  }
  const loader = loaders[language]
  if(!loader){
    return enOverviews
  }
  const module = await loader()
  cache.set(language, module.default)
  return module.default
}
