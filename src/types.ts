export const formatterLangs = ['html','xml','yaml','css','js','json','sql','php'] as const

export type FormatterLang = typeof formatterLangs[number]

export type ActiveTab = 'auto' | FormatterLang

export type LanguageCode = 'en' | 'id'

export type UuidVersion = 'v1' | 'v4' | 'v7'

export type MinifyTab = 'auto' | 'html' | 'css' | 'js' | 'json'

export type CodecSubtool = 'default' | 'base64' | 'base32' | 'base58' | 'hex'

export type View =
  | 'home'
  | 'generator'
  | 'formatter'
  | 'minify'
  | 'uuid'
  | 'uuid-overview'
  | 'hash-overview'
  | 'encode-overview'
  | 'decode-overview'
  | 'converter-overview'
  | 'epoch'
  | 'encode'
  | 'decode'
  | 'lorem'
  | 'hash'
  | 'case'
  | 'url'
  | 'regex'
  | 'indexnow-admin'
  | 'notfound'
