export const formatterLangs = ['html','xml','css','js','json','sql','php'] as const

export type FormatterLang = typeof formatterLangs[number]

export type ActiveTab = 'auto' | FormatterLang

export type LanguageCode = 'en' | 'id'

export type UuidVersion = 'v1' | 'v4' | 'v7'
