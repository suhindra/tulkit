import type { ActiveTab, LanguageCode, UuidVersion } from './types'
import { getTranslations, type OverviewContent } from './i18n'

export type { OverviewContent }

export function getFormatterOverviewByTab(language: LanguageCode): Record<ActiveTab,OverviewContent>{
  return getTranslations(language).overviews.formatter
}

export function getUuidOverviewByVersion(language: LanguageCode): Record<UuidVersion,OverviewContent>{
  return getTranslations(language).overviews.uuid
}

export function getEpochOverview(language: LanguageCode): OverviewContent{
  return getTranslations(language).overviews.epoch
}

export function getCaseOverview(language: LanguageCode): OverviewContent{
  return getTranslations(language).overviews.case
}
export function getUrlOverview(language: LanguageCode): OverviewContent{
  return getTranslations(language).overviews.url
}