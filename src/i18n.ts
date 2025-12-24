import type { ActiveTab, CodecSubtool, FormatterLang, LanguageCode, MinifyTab, UuidVersion } from './types'

type LangInfo = {
  title: string
  description: string
  tips?: string[]
}

export type OverviewContent = {
  heading: string
  paragraphs: string[]
}

type FormatterCopy = {
  autodetectLabel: string
  inputTab: string
  outputTab: string
  placeholder: string
  formatLabel: string
  formattingLabel: string
  tabSizeLabel: string
  downloadLabel: string
  copyLabel: string
  clearLabel: string
  copySuccess: string
  copyErrorPrefix: string
  minifyLabel: string
  minifyingLabel: string
  minifyUnsupportedLabel: string
  minifyErrorPrefix: string
  langLabels: Record<FormatterLang,string>
  langInfo: Record<ActiveTab,LangInfo>
}

type UuidCopy = {
  tabLabels: Record<UuidVersion,string>
  info: Record<UuidVersion,LangInfo>
  countLabel: string
  uppercaseLabel: string
  hyphenLabel: string
  bracesLabel: string
  generateLabel: string
  copyAllLabel: string
  placeholder: string
  copySuccess: string
  copyErrorPrefix: string
}

type EpochCopy = {
  currentPrefix: string
  modeSeconds: string
  modeMilliseconds: string
  useCurrentTime: string
  epochToDateHeading: string
  timezoneLabel: string
  timezonePlaceholder: string
  epochLabel: string
  epochPlaceholderSeconds: string
  epochPlaceholderMilliseconds: string
  utcLabel: string
  localLabel: string
  gmtLabel: string
  dateToEpochHeading: string
  dateInputLabel: string
  dateInputNote: string
  browserDefaultLabel: string
  unixSecondsLabel: string
  unixMillisecondsLabel: string
  copyLabel: string
  copySuccess: string
  copyErrorPrefix: string
}

type UrlEncoderCopy = {
  heading: string
  subheading: string
  placeholder: string
  encode: string
  decode: string
  clear: string
  clearTooltip: string
  copy: string
  copied: string
  copyTooltip: string
  swap: string
  swapTooltip: string
  error: string
  info: {
    title: string
    description: string
    tips?: string[]
  }
  overview?: {
    useCases: string[]
    benefits: string[]
  }
}

type RegexFlagKey = 'g' | 'i' | 'm' | 's' | 'u' | 'y'

type RegexTesterCopy = {
  heading: string
  subheading: string
  patternLabel: string
  patternPlaceholder: string
  sampleLabel: string
  samplePlaceholder: string
  flagsLabel: string
  flags: Record<RegexFlagKey,{ label: string; description: string }>
  emptyPatternHint: string
  summaryLabel: string
  noMatchesLabel: string
  invalidPatternPrefix: string
  previewLabel: string
  emptyPreviewLabel: string
  matchesHeading: string
  matchColumn: string
  indexColumn: string
  groupsColumn: string
  noGroupsLabel: string
  emptyGroupValue: string
  numberedGroupLabel: string
  namedGroupLabel: string
}

type PantoneCopy = {
  title: string
  description: string
  inputLabel: string
  hexPlaceholder: string
  convertBtn: string
  invalidHex: string
  hexLabel: string
  rgbLabel: string
  distanceLabel: string
  pantoneLabel: string
  codeLabel: string
  nameLabel: string
  yourColorLabel: string
  pantoneColorLabel: string
  matchHeading: string
  comparisonHeading: string
  alternatesHeading: string
  matchRankLabel: string
  pickerLabel: string
  copyLabel: string
  copySuccess: string
  copyError: string
}

type PantoneCatalogCopy = {
  title: string
  description: string
  searchLabel: string
  searchPlaceholder: string
  clearSearch: string
  listHeading: string
  emptyState: string
  detailHeading: string
  notFoundMessage: string
  converterCta: string
  converterCtaButton: string
}

type PantoneLandingCopy = {
  title: string
  description: string
  intro: string
  hexTitle: string
  hexDescription: string
  hexFeatures: string[]
  hexCta: string
  catalogTitle: string
  catalogDescription: string
  catalogFeatures: string[]
  catalogCta: string
}

export type LoremCopy = {
  paragraphCountLabel: string
  classicPrefixLabel: string
  lengthLabel: string
  lengthShort: string
  lengthMedium: string
  lengthLong: string
  generateLabel: string
  copyLabel: string
  copySuccess: string
  copyErrorPrefix: string
  referencesHeading: string
  standardHeading: string
  standardBody: string
  cicero1Heading: string
  cicero1Latin: string
  cicero1TranslationHeading: string
  cicero1Translation: string
  cicero2Heading: string
  cicero2Latin: string
  cicero2TranslationHeading: string
  cicero2Translation: string
}

type EncoderCopy = {
  inputEncodingLabel: string
  inputEncodingUtf8: string
  inputEncodingBase64: string
  inputEncodingBase32: string
  inputEncodingBase58: string
  inputEncodingHex: string
  outputEncodingLabel: string
  outputEncodingBase64: string
  outputEncodingBase64Url: string
  outputEncodingBase32: string
  outputEncodingBase58: string
  outputEncodingHex: string
  outputEncodingText: string
  inputLabel: string
  inputPlaceholder: string
  outputLabel: string
  outputPlaceholder: string
  convertLabel: string
  copyLabel: string
  copySuccess: string
  copyErrorPrefix: string
  inputErrorPrefix: string
}

type HashCopy = {
  algorithmLabel: string
  algorithmSha1: string
  algorithmSha256: string
  algorithmSha512: string
  inputLabel: string
  inputPlaceholder: string
  outputLabel: string
  outputPlaceholder: string
  generateLabel: string
  hashingLabel: string
  copyLabel: string
  copySuccess: string
  copyErrorPrefix: string
  inputErrorPrefix: string
}

type IndexNowCopy = {
  heading: string
  description: string
  keyLabel: string
  keyHelp: string
  hostLabel: string
  hostHelp: string
  keyLocationLabel: string
  keyLocationHelp: string
  currentUrlLabel: string
  submitLabel: string
  submittingLabel: string
  successMessage: string
  errorPrefix: string
  missingKey: string
  missingUrl: string
  missingHost: string
  openPing: string
  copyPingUrl: string
  copied: string
  pingUrlLabel: string
  pingUrlHelp: string
  keyFileLabel: string
  keyFileHelp: string
  keyFileNote: string
  downloadKey: string
  sitemapLabel: string
  sitemapHelp: string
  loadSitemap: string
  sitemapLoading: string
  sitemapLoaded: string
  sitemapEmpty: string
  sitemapErrorPrefix: string
  sitemapUrlListLabel: string
  selectAll: string
  clearSelection: string
  selectedCount: string
  submitSelectedLabel: string
  missingSelection: string
}

type AppCopy = {
  logoAlt: string
  brandHeading: string
  brandSubheading: string
  brandNote: string
  navGenerator: string
  navConverters: string
  navFormatter: string
  navMinify: string
  navUuid: string
  navEpoch: string
  navEncode: string
  navDecode: string
  navLorem: string
  navHash: string
  navCase: string
  navUrl: string
  navPantone: string
  navPantoneCatalog: string
  navRegex: string
  languageSwitcherLabel: string
  seoTitles: {
    formatterDefault: string
    formatterHtml: string
    formatterXml: string
    formatterYaml: string
    formatterCss: string
    formatterJs: string
    formatterJson: string
    formatterSql: string
    formatterPhp: string
    minify: string
    minifyHtml: string
    minifyXml: string
    minifyCss: string
    minifyJs: string
    minifyJson: string
    uuid: string
    uuidV1: string
    uuidV4: string
    uuidV7: string
    epoch: string
    encode: string
    decode: string
    encodeBase64: string
    encodeBase32: string
    encodeBase58: string
    encodeHex: string
    decodeBase64: string
    decodeBase32: string
    decodeBase58: string
    decodeHex: string
    lorem: string
    hash: string
    case: string
    url: string
    pantoneHub: string
    pantone: string
    pantoneCatalog: string
    pantoneCatalogColor: string
    regex: string
    indexNowAdmin?: string
    notFound: string
  }
  breadcrumbTitles: {
    encode: Record<CodecSubtool,string>
    decode: Record<CodecSubtool,string>
  }
  indexNow: IndexNowCopy
  notFoundHeading: string
  notFoundBody: string
  goToFormatterCta: string
  footerNote: string
  footerLinks: {
    formatting: Array<{ label: string; path: string }>
    optimization: Array<{ label: string; path: string }>
    conversion: Array<{ label: string; path: string }>
    encoding: Array<{ label: string; path: string }>
    generation: Array<{ label: string; path: string }>
    security: Array<{ label: string; path: string }>
  }
  epochMetaDescription: string
  encodeMetaDescription: string
  decodeMetaDescription: string
  encodeBase64MetaDescription: string
  encodeBase32MetaDescription: string
  encodeBase58MetaDescription: string
  encodeHexMetaDescription: string
  minifyMetaDescription: string
  decodeBase64MetaDescription: string
  decodeBase32MetaDescription: string
  decodeBase58MetaDescription: string
  decodeHexMetaDescription: string
  loremMetaDescription: string
  hashMetaDescription: Record<'sha1' | 'sha256' | 'sha512',string>
  caseMetaDescription: string
  urlMetaDescription: string
  pantoneHubMetaDescription: string
  pantoneMetaDescription: string
  pantoneCatalogMetaDescription: string
  pantoneCatalogColorMetaDescription: string
  regexMetaDescription: string
  indexNowMetaDescription: string
  notFoundMetaDescription: string
}

export type SeoBlurbCopy = {
  generator: string[]
  uuidOverview: string[][]
  converterOverview: string[]
  hashOverview: string[]
  encodeOverview: string[]
  decodeOverview: string[]
  formatter: Record<ActiveTab,string[]>
  uuid: Record<UuidVersion,string[]>
  epoch: string[]
  encode: Record<CodecSubtool,string[]>
  minify: Record<ActiveTab,string[]>
  decode: Record<CodecSubtool,string[]>
  lorem: string[]
  hash: Record<'sha1' | 'sha256' | 'sha512',string[]>
  case: string[]
  url: string[]
  pantoneHub: string[]
  pantone: string[]
  pantoneCatalog: string[]
  regex: string[]
}

type HomeTool = {
  title: string
  description: string
  path: string
  icon: string
  category: string
}

type HomeContent = {
  heading: string
  subheading: string
  tools: HomeTool[]
}

export type OverviewCopy = {
  home: HomeContent
  generator: HomeContent
  uuidOverview: HomeContent
  converterOverview: HomeContent
  hashOverview: HomeContent
  encodeOverview: HomeContent
  decodeOverview: HomeContent
  formatter: Record<ActiveTab,OverviewContent>
  uuid: Record<UuidVersion,OverviewContent>
  epoch: OverviewContent
  encode: Record<CodecSubtool,OverviewContent>
  minify: OverviewContent
  decode: Record<CodecSubtool,OverviewContent>
  lorem: OverviewContent
  hash: OverviewContent
  case: OverviewContent
  url: OverviewContent
  pantone: OverviewContent
  pantoneCatalog: OverviewContent
  regex: OverviewContent
}

type Translation = {
  headingByTab: Record<Exclude<ActiveTab,'auto'>,string>
  descriptionByTab: Record<ActiveTab,string>
  uuidDescriptionByVersion: Record<UuidVersion,string>
  formatter: FormatterCopy
  minifierLangInfo: Record<MinifyTab,LangInfo>
  uuid: UuidCopy
  epoch: EpochCopy
  urlEncoder: UrlEncoderCopy
  regexTester: RegexTesterCopy
  encoder: EncoderCopy
  hash: HashCopy
  pantone: PantoneCopy
  pantoneLanding: PantoneLandingCopy
  pantoneCatalog: PantoneCatalogCopy
  app: AppCopy
}

const formatterLangLabelsBase: Record<FormatterLang,string> = {
  html: 'HTML',
  xml: 'XML',
  yaml: 'YAML',
  css: 'CSS',
  js: 'JavaScript',
  json: 'JSON',
  sql: 'SQL',
  php: 'PHP'
}

const en: Translation = {
  headingByTab: {
    html: 'HTML Formatter',
    xml: 'XML Formatter',
    yaml: 'YAML Formatter',
    css: 'CSS Formatter',
    js: 'JavaScript Formatter',
    json: 'JSON Formatter',
    sql: 'SQL Formatter',
    php: 'PHP Formatter'
  },
  descriptionByTab: {
    auto:
      'Format HTML, XML, YAML, CSS, JavaScript, JSON, SQL, or PHP in one place. Tulkit autodetects your language and cleans up snippets directly in your browser.',
    html:
      'Use Tulkit to beautify HTML for landing pages, emails, and CMS snippets so nested tags stay readable in editors and code reviews.',
    xml:
      'Format XML for sitemaps, feeds, configuration files, or API responses so nested tags and attributes remain easy to scan.',
    yaml:
      'Pretty-print YAML configuration files, CI pipelines, or infrastructure manifests so indentation stays consistent and safe to edit.',
    css:
      'Clean up CSS, SCSS, and utility classes with Tulkit so selectors and declarations are consistently indented for easier debugging.',
    js:
      'Format JavaScript snippets, ES modules, and async code with Tulkit to quickly tidy experiments, code samples, or log output.',
    json:
      'Pretty-print and validate JSON payloads, configs, and API responses using Tulkit directly in your browser.',
    sql:
      'Reformat long SQL queries with Tulkit so SELECT, JOIN, and CTE statements are easier to read and share.',
    php:
      'Tidy up PHP snippets for Laravel, WordPress, and other projects using Tulkit’s in-browser formatter.'
  },
  uuidDescriptionByVersion: {
    v1:
      'Generate time-based UUID v1 values with Tulkit when you want identifiers that roughly follow creation order for logs, jobs, or import batches.',
    v4:
      'Generate random UUID v4 identifiers in bulk with Tulkit directly in your browser using the Web Crypto API for secure, high-quality IDs.',
    v7:
      'Generate time-ordered UUID v7 identifiers with Tulkit so your IDs stay sortable while still including strong randomness.'
  },
  formatter: {
    autodetectLabel: 'Autodetect',
    inputTab: 'Input',
    outputTab: 'Output',
    placeholder: 'Paste your code or drag a file here',
    formatLabel: 'Format',
    formattingLabel: 'Formatting…',
    tabSizeLabel: 'Tab size',
    downloadLabel: 'Download',
    copyLabel: 'Copy',
    clearLabel: 'Clear',
    copySuccess: 'Copied to clipboard',
    copyErrorPrefix: 'Clipboard failed: ',
    minifyLabel: 'Minify',
    minifyingLabel: 'Minifying…',
    minifyUnsupportedLabel: 'Minify is available for HTML, XML, CSS, JavaScript, or JSON.',
    minifyErrorPrefix: 'Minify failed: ',
    langLabels: formatterLangLabelsBase,
    langInfo: {
      auto: {
        title: 'Autodetect Formatting',
        description:
          'Tulkit inspects your snippet for tags, braces, JSON structures, or SQL keywords and picks a formatter automatically. Use this when you often switch between languages and want a fast, no-click workflow.',
        tips: [
          'If detection misses, pick a language tab manually to override it.',
          'Autodetect favors safe defaults, so ambiguous input falls back to HTML.'
        ]
      },
      html: {
        title: 'HTML Beautifier',
        description:
          'Clean up markup for landing pages, emails, or CMS snippets. Nested tags are indented using the tab size you choose so copied code stays readable in reviews.',
        tips: [
          'Great for tidying inline SVG and template partials.',
          'Pair with Copy to move formatted markup directly into CMS editors.'
        ]
      },
      css: {
        title: 'CSS Formatter',
        description:
          'Normalize spacing between selectors and declarations for CSS, SCSS, or even Tailwind utility blocks. Helps spot duplicate rules before committing.',
        tips: [
          'Use smaller tab sizes for utility-first frameworks.',
          'Drag a stylesheet into the editor to scan larger files quickly.'
        ]
      },
      js: {
        title: 'JavaScript Formatter',
        description:
          'Ideal for cleaning up quick experiments, codepen exports, or snippets pasted from logs. Handles ES modules, arrow functions, and async code.',
        tips: [
          'Set tab size to 2 spaces to match most React/Node conventions.',
          'Works nicely for TypeScript transpiled output when you need to inspect it.'
        ]
      },
      json: {
        title: 'JSON Prettifier',
        description:
          'Validate and pretty-print API payloads, config files, or OpenAPI fragments. Tulkit parses the JSON to make sure the structure is valid before reformatting.',
        tips: [
          'Use Copy to send formatted payloads to your teammates.',
          'If parsing fails, the error message points to the problematic character.'
        ]
      },
      sql: {
        title: 'SQL Formatter',
        description:
          'Makes long SELECT queries readable with consistent keyword casing and indentation. Handy for sharing Postgres/MySQL queries or debugging ORMs.',
        tips: [
          'Supports JOIN, CTE, INSERT, UPDATE, and DELETE statements.',
          'Great companion when pasting queries into code reviews or documentation.'
        ]
      },
      php: {
        title: 'PHP Formatter',
        description:
          'Powered by Prettier PHP, perfect for Laravel, WordPress, or legacy snippets. Tulkit loads the formatter on demand so the UI stays fast.',
        tips: [
          'Tab width and print width map directly to Prettier options.',
          'Formatting runs entirely in your browser to keep proprietary code private.'
        ]
      },
      xml: {
        title: 'XML Formatter',
        description:
          'Ideal for making XML sitemaps, feeds, and configuration files easier to read with consistent indentation and tag alignment.',
        tips: [
          'Useful for prettifying XML-based API responses before sharing them in docs or tickets.',
          'Combine with the JSON and SQL tabs when you work across multiple data formats.'
        ]
      },
      yaml: {
        title: 'YAML Formatter',
        description:
          'Keeps YAML config files, CI pipelines, and infrastructure manifests aligned so nested keys remain safe and easy to edit.',
        tips: [
          'Handy for cleaning up YAML copied from docs or shared in chat.',
          'Use smaller tab sizes to reduce line wrapping in deeply nested structures.'
        ]
      }
    }
  },
  minifierLangInfo: {
    auto: {
      title: 'Autodetect Minify Mode',
      description:
        'Paste any HTML, CSS, JavaScript, or JSON and Tulkit will choose the right minifier automatically so you can compress snippets without extra clicks.',
      tips: [
        'Great when you frequently switch between assets and just want to shrink whatever is in your clipboard.',
        'If detection guesses wrong, pick a language tab manually to lock the mode.'
      ]
    },
    html: {
      title: 'HTML Minifier',
      description:
        'Remove whitespace, comments, and redundant attributes from landing pages, emails, and embed snippets while keeping markup valid.',
      tips: [
        'Perfect for CMS snippets or documentation embeds where every byte counts.',
        'Pair with Preview to double-check that conditional comments are still intact before publishing.'
      ]
    },
    css: {
      title: 'CSS Minifier',
      description:
        'Use csso in your browser to squeeze inline styles, utility classes, or stylesheet fragments without touching a build pipeline.',
      tips: [
        'Helpful for tidying style blocks pasted into CMS fields or HTML emails.',
        'If you need to debug later, keep a formatted copy alongside the minified output.'
      ]
    },
    js: {
      title: 'JavaScript Minifier',
      description:
        'Powered by Terser, this mode strips whitespace, renames variables, and removes dead code so inline scripts stay fast and compact.',
      tips: [
        'Ideal for feature flags, small widgets, or snippets shared in support replies.',
        'Use the Copy button right after minifying to avoid sending the uncompressed version by accident.'
      ]
    },
    json: {
      title: 'JSON Minifier',
      description:
        'Flatten configuration files, localization bundles, or API payloads into a single line without changing their meaning.',
      tips: [
        'Great when embedding JSON inside query parameters or HTML data attributes.',
        'If you need a readable copy later, keep the source in version control and only minify the shared snippet.'
      ]
    }
  },
  uuid: {
    tabLabels: {
      v1: 'UUID v1',
      v4: 'UUID v4',
      v7: 'UUID v7'
    },
    info: {
      v1: {
        title: 'UUID v1 — time-based',
        description:
          'Includes a timestamp component so values roughly follow creation time. Useful when you want IDs that are unique and tend to sort by creation order.',
        tips: [
          'May leak timing patterns, so avoid for security-sensitive identifiers.',
          'Works well for logs, background jobs, or import batches.'
        ]
      },
      v4: {
        title: 'UUID v4 — random',
        description:
          'Purely random identifiers with 122 bits of entropy. A good default when you need unique IDs without any embedded meaning.',
        tips: [
          'Great for public IDs in URLs or database primary keys.',
          'Best choice when you do not need ordering by creation time.'
        ]
      },
      v7: {
        title: 'UUID v7 — ordered by time',
        description:
          'Newer UUID version that combines a timestamp prefix with random bits. Designed to be sortable while avoiding v1’s MAC-address style concerns.',
        tips: [
          'Ideal for databases that benefit from append-friendly, monotonic IDs.',
          'Useful for analytics, events, and write-heavy tables.'
        ]
      }
    },
    countLabel: 'How many UUIDs?',
    uppercaseLabel: 'Uppercase',
    hyphenLabel: 'Include hyphens',
    bracesLabel: 'Surround with braces',
    generateLabel: 'Generate UUIDs',
    copyAllLabel: 'Copy all',
    placeholder: 'Click “Generate UUIDs” to create identifiers.',
    copySuccess: 'UUIDs copied to clipboard',
    copyErrorPrefix: 'Clipboard failed: '
  },
  epoch: {
    currentPrefix: 'The current Unix epoch time is',
    modeSeconds: 'Unix seconds',
    modeMilliseconds: 'Unix milliseconds',
    useCurrentTime: 'Use current time',
    epochToDateHeading: 'Epoch to date',
    timezoneLabel: 'Time zone for date output',
    timezonePlaceholder: 'Type or adjust your time zone, e.g. America/Edmonton',
    epochLabel: 'Epoch value (seconds or milliseconds)',
    epochPlaceholderSeconds: 'e.g. 1732665600',
    epochPlaceholderMilliseconds: 'e.g. 1732665600000',
    utcLabel: 'UTC',
    localLabel: 'Local time',
    gmtLabel: 'Date and time (GMT)',
    dateToEpochHeading: 'Date to epoch',
    dateInputLabel: 'Date and time (selected time zone)',
    dateInputNote: 'Time zone for this date:',
    browserDefaultLabel: 'browser default',
    unixSecondsLabel: 'Unix seconds',
    unixMillisecondsLabel: 'Unix milliseconds',
    copyLabel: 'Copy',
    copySuccess: 'Copied to clipboard',
    copyErrorPrefix: 'Clipboard failed: '
  },
  urlEncoder: {
    heading: 'URL Encoder',
    subheading: 'Encode and decode URL parameters and special characters for safe transmission',
    placeholder: 'Paste text or a URL to encode, or an encoded URL to decode',
    encode: 'Encode',
    decode: 'Decode',
    clear: 'Clear',
    clearTooltip: 'Clear the input',
    copy: 'Copy',
    copied: 'Copied!',
    copyTooltip: 'Copy the result to clipboard',
    swap: 'Swap',
    swapTooltip: 'Use result as input and reverse the operation',
    error: 'Invalid input for decoding',
    info: {
      title: 'About URL Encoding',
      description: 'URL encoding (percent-encoding) converts special characters into a format that is safe for transmission in URLs and query strings. Spaces become %20, and other reserved characters like & ? # are encoded to prevent conflicts with URL syntax.',
      tips: [
        'Use Encode to prepare text for URLs, query parameters, or API requests',
        'Use Decode to inspect encoded URLs from your browser logs or API responses',
        'Common encoded characters: %20 (space), %26 (&), %3F (?), %23 (#), %2F (/)',
        'Invalid percent sequences like %GG will trigger an error—fix them before decoding'
      ]
    },
    overview: {
      useCases: [
        'Building URLs with dynamic parameters for APIs and web services',
        'Preparing form data and query strings for web requests',
        'Debugging and inspecting encoded URLs from browser logs',
        'Embedding special characters safely in URLs and hyperlinks'
      ],
      benefits: [
        'Prevents URL syntax conflicts by encoding reserved characters',
        'Supports international characters and special symbols in URLs',
        'Works entirely in your browser with no data uploaded',
        'Standards-compliant encoding using RFC 3986 specifications'
      ]
    }
  },
  regexTester: {
    heading: 'Regex Tester',
    subheading: 'Experiment with JavaScript regular expressions, flags, and capture groups entirely in your browser.',
    patternLabel: 'Pattern',
    patternPlaceholder: 'e.g. (\\w+)@(\\w+\\.\\w+)',
    sampleLabel: 'Test text',
    samplePlaceholder: 'Paste the text you want to inspect',
    flagsLabel: 'Flags',
    flags: {
      g: {
        label: 'Global',
        description: 'Find every possible match instead of stopping after the first result.'
      },
      i: {
        label: 'Ignore case',
        description: 'Treat uppercase and lowercase letters as the same.'
      },
      m: {
        label: 'Multi-line',
        description: 'Make ^ and $ match the start or end of each line.'
      },
      s: {
        label: 'Dotall',
        description: 'Allow the dot (.) token to match newline characters.'
      },
      u: {
        label: 'Unicode',
        description: 'Enable Unicode mode so escapes work with astral symbols.'
      },
      y: {
        label: 'Sticky',
        description: 'Only match starting at the current lastIndex position.'
      }
    },
    emptyPatternHint: 'Start by typing a regular expression.',
    summaryLabel: 'Matches found: {count}',
    noMatchesLabel: 'No matches yet.',
    invalidPatternPrefix: 'Pattern error: ',
    previewLabel: 'Preview with highlights',
    emptyPreviewLabel: 'Nothing to preview yet.',
    matchesHeading: 'Match details',
    matchColumn: 'Match',
    indexColumn: 'Index',
    groupsColumn: 'Capture groups',
    noGroupsLabel: 'No capture groups',
    emptyGroupValue: '—',
    numberedGroupLabel: 'Group {index}',
    namedGroupLabel: 'Named group {name}'
  },
  encoder: {
    inputEncodingLabel: 'Input encoding',
    inputEncodingUtf8: 'Text (UTF-8)',
    inputEncodingBase64: 'Base64 (standard or URL-safe)',
    inputEncodingBase32: 'Base32',
    inputEncodingBase58: 'Base58 (Bitcoin alphabet)',
    inputEncodingHex: 'Hex (lower or upper case)',
    outputEncodingLabel: 'Output encoding',
    outputEncodingBase64: 'Base64',
    outputEncodingBase64Url: 'Base64 (URL-safe)',
    outputEncodingBase32: 'Base32',
    outputEncodingBase58: 'Base58',
    outputEncodingHex: 'Hex (lower case)',
    outputEncodingText: 'Text (UTF-8)',
    inputLabel: 'Input',
    inputPlaceholder: 'Paste text, Base64, Base32, Base58, or hex to convert',
    outputLabel: 'Output',
    outputPlaceholder: 'Converted result will appear here',
    convertLabel: 'Convert',
    copyLabel: 'Copy',
    copySuccess: 'Converted value copied to clipboard',
    copyErrorPrefix: 'Clipboard failed: ',
    inputErrorPrefix: 'Could not decode input: ',
    presetEncodeBase64: 'Base64',
    presetEncodeBase32: 'Base32',
    presetEncodeBase58: 'Base58',
    presetEncodeHex: 'Hex',
    presetDecodeBase64: 'Base64',
    presetDecodeBase32: 'Base32',
    presetDecodeBase58: 'Base58',
    presetDecodeHex: 'Hex'
  },
  hash: {
    algorithmLabel: 'Hash algorithm',
    algorithmSha1: 'SHA-1',
    algorithmSha256: 'SHA-256',
    algorithmSha512: 'SHA-512',
    inputLabel: 'Input',
    inputPlaceholder: 'Paste text to hash (UTF-8)',
    outputLabel: 'Hex digest',
    outputPlaceholder: 'Hash output will appear here',
    generateLabel: 'Generate hash',
    hashingLabel: 'Hashing…',
    copyLabel: 'Copy',
    copySuccess: 'Hash copied to clipboard',
    copyErrorPrefix: 'Clipboard failed: ',
    inputErrorPrefix: 'Could not compute hash: '
  },
  pantone: {
    title: 'HEX to Pantone Converter',
    description: 'Paste any HEX color to instantly calculate the closest Pantone swatch using ΔE distance.',
    inputLabel: 'Hex color',
    hexPlaceholder: '#2F6BFF',
    convertBtn: 'Find Pantone match',
    invalidHex: 'Enter a valid 3 or 6 digit hex color (with or without #).',
    hexLabel: 'Hex',
    rgbLabel: 'RGB',
    distanceLabel: 'ΔE distance',
    pantoneLabel: 'Closest Pantone match',
    codeLabel: 'Pantone code',
    nameLabel: 'Name',
    yourColorLabel: 'Your color',
    pantoneColorLabel: 'Pantone color',
    matchHeading: 'Match details',
    comparisonHeading: 'Side-by-side comparison',
    alternatesHeading: 'Other close Pantone matches',
    matchRankLabel: 'Match',
    pickerLabel: 'Open color picker',
    copyLabel: 'Copy',
    copySuccess: 'Copied!',
    copyError: 'Failed to copy'
  },
  pantoneCatalog: {
    title: 'Pantone to HEX lookup',
    description: 'Browse every Pantone swatch in Tulkit’s palette and copy the HEX or RGB value directly from your browser.',
    searchLabel: 'Search Pantone swatches',
    searchPlaceholder: 'Type a Pantone code or name…',
    clearSearch: 'Clear',
    listHeading: 'Pantone palette',
    emptyState: 'No Pantone swatches match that search.',
    detailHeading: 'Color details',
    notFoundMessage: 'We could not find that Pantone code. Pick a color from the list instead.',
    converterCta: 'Need to convert HEX to Pantone?',
    converterCtaButton: 'Open HEX → Pantone'
  },
  pantoneLanding: {
    title: 'Pantone color tools',
    description: 'Pick the Pantone workflow you need: convert HEX values to the closest Pantone swatch or browse the Pantone palette and copy digital values.',
    intro: 'Tulkit keeps two complementary Pantone tools in your browser so you can move between print and digital specs without desktop software.',
    hexTitle: 'HEX → Pantone converter',
    hexDescription: 'Paste any HEX color to calculate the nearest Pantone swatch using LAB ΔE distance. Compare swatches side-by-side and copy Pantone codes instantly.',
    hexFeatures: [
      'ΔE distance for accuracy',
      'Copy Pantone code & RGB',
      'Shareable ?hex= links'
    ],
    hexCta: 'Open HEX → Pantone',
    catalogTitle: 'Pantone → HEX lookup',
    catalogDescription: 'Search the Pantone palette by code or name, view live swatches, then copy HEX or RGB values for your digital guidelines.',
    catalogFeatures: [
      'Filter by code or name',
      'Direct HEX/RGB copy',
      'Shareable color links'
    ],
    catalogCta: 'Open Pantone catalog'
  },
  app: {
    logoAlt: 'Tulkit Online logo',
    brandHeading: 'Web Tools — Tulkit',
    brandSubheading: 'Small browser tools for everyday development tasks',
    brandNote: 'All formatting and generation happens in your browser only; your code never leaves your device.',
    navGenerator: 'Generator',
    navConverters: 'Converters',
    navFormatter: 'Formatter',
    navUuid: 'UUID Generator',
    navEpoch: 'Epoch Converter',
    navEncode: 'Encoder',
    navMinify: 'Minifier',
    navDecode: 'Decoder',
    navLorem: 'Lorem Ipsum',
    navHash: 'Hash Generator',
    navCase: 'Case Converter',
    navUrl: 'URL Encoder',
    navPantone: 'Pantone Tools',
    navPantoneCatalog: 'Pantone to HEX',
    navRegex: 'Regex Tester',
    languageSwitcherLabel: 'Language',
    seoTitles: {
      formatterDefault: 'Web Formatter — Tulkit',
      formatterHtml: 'HTML Formatter — Tulkit',
      formatterXml: 'XML Formatter — Tulkit',
      formatterYaml: 'YAML Formatter — Tulkit',
      formatterCss: 'CSS Formatter — Tulkit',
    formatterJs: 'JavaScript Formatter — Tulkit',
    formatterJson: 'JSON Formatter — Tulkit',
    formatterSql: 'SQL Formatter — Tulkit',
    formatterPhp: 'PHP Formatter — Tulkit',
    minify: 'Minifier — Tulkit',
    minifyHtml: 'HTML Minifier — Tulkit',
    minifyXml: 'XML Minifier — Tulkit',
    minifyCss: 'CSS Minifier — Tulkit',
    minifyJs: 'JavaScript Minifier — Tulkit',
    minifyJson: 'JSON Minifier — Tulkit',
    uuid: 'UUID Generator — Tulkit',
      uuidV1: 'UUID v1 Generator — Tulkit',
      uuidV4: 'UUID v4 Generator — Tulkit',
      uuidV7: 'UUID v7 Generator — Tulkit',
      epoch: 'Epoch Converter - Unix Timestamp Converter — Tulkit',
      encode: 'Encoder — Tulkit',
      decode: 'Decoder — Tulkit',
      encodeBase64: 'Base64 Encoder — Tulkit',
      encodeBase32: 'Base32 Encoder — Tulkit',
      encodeBase58: 'Base58 Encoder — Tulkit',
      encodeHex: 'Hex Encoder — Tulkit',
      decodeBase64: 'Base64 Decoder — Tulkit',
      decodeBase32: 'Base32 Decoder — Tulkit',
      decodeBase58: 'Base58 Decoder — Tulkit',
      decodeHex: 'Hex Decoder — Tulkit',
      lorem: 'Lorem Ipsum Generator — Tulkit',
      hash: 'Hash Generator — Tulkit',
      case: 'Case Converter — Tulkit',
      url: 'URL Encoder — Tulkit',
      pantoneHub: 'Pantone Tools — Tulkit',
      pantone: 'Pantone Converter — Tulkit',
      pantoneCatalog: 'Pantone to HEX — Tulkit',
      pantoneCatalogColor: 'Pantone {code} to HEX ({hex}) — Tulkit',
      regex: 'Regex Tester — Tulkit',
      indexNowAdmin: 'IndexNow Submit — Tulkit',
      notFound: 'Page not found — Tulkit'
    },
    breadcrumbTitles: {
      encode: {
        default: 'Encoder',
        base64: 'Base64 Encoder',
        base32: 'Base32 Encoder',
        base58: 'Base58 Encoder',
        hex: 'Hex Encoder'
      },
      decode: {
        default: 'Decoder',
        base64: 'Base64 Decoder',
        base32: 'Base32 Decoder',
        base58: 'Base58 Decoder',
        hex: 'Hex Decoder'
      }
    },
    indexNow: {
      heading: 'IndexNow submit',
      description:
        'Ping IndexNow so Bing and Yandex re-crawl the URL you are on. Your key stays in this browser; if POST is blocked by CORS, use the GET link below.',
      keyLabel: 'IndexNow key',
      keyHelp: 'The same key you host at https://your-domain/<key>.txt. Tulkit stores it locally.',
      hostLabel: 'Site host',
      hostHelp: 'Defaults to the current host.',
      keyLocationLabel: 'Key file URL',
      keyLocationHelp: 'Leave blank to use https://{host}/{key}.txt',
      currentUrlLabel: 'Current URL',
      submitLabel: 'Submit current URL',
      submittingLabel: 'Submitting…',
      successMessage: 'URL submitted to IndexNow. Crawlers will fetch it soon.',
      errorPrefix: 'Submit failed: ',
      missingKey: 'Add your IndexNow key first.',
      missingUrl: 'Current URL is missing.',
      missingHost: 'Add a site host (e.g., example.com).',
      openPing: 'Open GET ping',
      copyPingUrl: 'Copy ping URL',
      copied: 'Copied',
      pingUrlLabel: 'Fallback GET ping',
      pingUrlHelp: 'If POST is blocked, open or copy this GET URL to trigger IndexNow manually.',
      keyFileLabel: 'Key file location',
      keyFileHelp: 'Place the key file at your site root so IndexNow can verify ownership.',
      keyFileNote: 'Host a static file named <key>.txt containing only the key string.',
      downloadKey: 'Download key.txt',
      sitemapLabel: 'Sitemap URL',
      sitemapHelp: 'Defaults to /sitemap.xml on this host. Load it to pick URLs to submit.',
      loadSitemap: 'Load sitemap',
      sitemapLoading: 'Loading sitemap…',
      sitemapLoaded: 'Sitemap loaded: {count} URLs found.',
      sitemapEmpty: 'No URLs found in this sitemap.',
      sitemapErrorPrefix: 'Failed to load sitemap: ',
    sitemapUrlListLabel: 'Select URLs to submit',
    selectAll: 'Select all',
    clearSelection: 'Clear',
    selectedCount: 'Selected: {count}',
    submitSelectedLabel: 'Submit selected URLs',
    missingSelection: 'Pick at least one URL to submit.'
  },
    notFoundHeading: 'Page not found',
    notFoundBody:
      'The link you followed does not match any Tulkit tools. You can jump back to the formatter, UUID generator, or epoch converter using the buttons above.',
    goToFormatterCta: 'Go to Web Formatter',
    footerNote: 'Prototype — Tulkit Web Tools',
    footerLinks: {
      formatting: [
        { label: 'Web Formatter', path: '/formatter' },
        { label: 'HTML Formatter', path: '/formatter/html' },
        { label: 'CSS Formatter', path: '/formatter/css' },
        { label: 'JavaScript Formatter', path: '/formatter/javascript' },
        { label: 'JSON Formatter', path: '/formatter/json' },
        { label: 'SQL Formatter', path: '/formatter/sql' },
        { label: 'PHP Formatter', path: '/formatter/php' },
        { label: 'XML Formatter', path: '/formatter/xml' },
        { label: 'YAML Formatter', path: '/formatter/yaml' }
      ],
      optimization: [
        { label: 'Minifier', path: '/minify' },
        { label: 'HTML Minifier', path: '/minify/html' },
        { label: 'CSS Minifier', path: '/minify/css' },
        { label: 'JavaScript Minifier', path: '/minify/javascript' },
        { label: 'JSON Minifier', path: '/minify/json' }
      ],
      conversion: [
        { label: 'Pantone Tools', path: '/pantone' },
        { label: 'Epoch Converter', path: '/converter/epoch' },
        { label: 'Case Converter', path: '/converter/case' },
        { label: 'URL Encoder', path: '/converter/url' },
        { label: 'Pantone Converter', path: '/pantone/hex-to-pantone' },
        { label: 'Pantone to HEX', path: '/pantone/pantone-to-hex' },
        { label: 'Regex Tester', path: '/converter/regex' }
      ],
      encoding: [
        { label: 'Encoder', path: '/encode' },
        { label: 'Base64 Encoder', path: '/encode/base64' },
        { label: 'Base32 Encoder', path: '/encode/base32' },
        { label: 'Base58 Encoder', path: '/encode/base58' },
        { label: 'Hex Encoder', path: '/encode/hex' },
        { label: 'Decoder', path: '/decode' },
        { label: 'Base64 Decoder', path: '/decode/base64' },
        { label: 'Base32 Decoder', path: '/decode/base32' },
        { label: 'Base58 Decoder', path: '/decode/base58' },
        { label: 'Hex Decoder', path: '/decode/hex' }
      ],
      generation: [
        { label: 'UUID Generator', path: '/generator/uuid' },
        { label: 'UUID v1', path: '/generator/uuid/uuid-v1' },
        { label: 'UUID v4', path: '/generator/uuid/uuid-v4' },
        { label: 'UUID v7', path: '/generator/uuid/uuid-v7' },
        { label: 'Lorem Ipsum', path: '/generator/lorem' }
      ],
      security: [
        { label: 'Hash Generator', path: '/generator/hash' },
        { label: 'SHA-1', path: '/generator/hash/sha1' },
        { label: 'SHA-256', path: '/generator/hash/sha256' },
        { label: 'SHA-512', path: '/generator/hash/sha512' }
      ]
    },
    epochMetaDescription:
      'Convert Unix epoch timestamps to readable dates and back again with Tulkit. Quickly switch between seconds, milliseconds, UTC, and local time directly in your browser.',
    encodeMetaDescription:
      'Convert between UTF-8 text, Base64, and hex encodings in your browser with Tulkit’s encoder tool. Paste values to normalize or inspect binary-safe data without using external CLIs.',
    decodeMetaDescription:
      'Decode Base64, Base32, Base58, and hex values in your browser with Tulkit’s decoder. Turn opaque encoded data back into readable text for debugging and inspection.',
    encodeBase64MetaDescription:
      'Encode UTF-8 text to standard or URL-safe Base64 in your browser with Tulkit’s Base64 encoder. Normalize header values, JWT segments, or binary snippets without touching external tools.',
    encodeBase32MetaDescription:
      'Convert UTF-8 text into Base32 using Tulkit’s encoder. Generate or inspect Base32 values for compatible protocols and systems directly in your browser.',
    encodeBase58MetaDescription:
      'Encode text into Base58 with Tulkit’s encoder, using the Bitcoin alphabet. Useful for creating human-friendly identifiers and working with blockchain-style payloads.',
    encodeHexMetaDescription:
      'Turn UTF-8 text into lowercase hex strings in your browser with Tulkit’s encoder. Ideal for inspecting binary data, keys, or protocol payloads without external CLIs.',
    minifyMetaDescription: {
      auto:
        'Minify HTML, CSS, JavaScript, or JSON directly in your browser with Tulkit. Paste a snippet, choose a tab, and ship smaller payloads without configuring build tooling.',
      html:
        'Trim whitespace, comments, and redundant attributes from landing pages or embeds using Tulkit’s in-browser HTML minifier so you can hand off lighter markup instantly.',
      css:
        'Compress CSS and SCSS output with Tulkit so inline styles shed whitespace and redundant tokens before you paste them into a CMS or email template.',
      js:
        'Use Tulkit to minify JavaScript snippets entirely in the browser, removing whitespace and dead code from inline scripts before they reach production.',
      json:
        'Flatten JSON payloads into compact one-line strings with Tulkit’s minifier—perfect for query parameters, data attributes, or configuration blobs where every byte matters.'
    },
    hashMetaDescription: {
      sha1:
        'Generate SHA-1 hashes entirely in your browser with Tulkit when you need compatibility with legacy systems. Paste any text to compute reproducible hex digests using the Web Crypto API.',
      sha256:
        'Generate SHA-256 hashes directly in your browser with Tulkit’s hash generator. Paste text to compute deterministic hex digests that match common CLI tools and libraries.',
      sha512:
        'Compute SHA-512 hashes in your browser with Tulkit, ideal for longer fingerprints used in archival or security-adjacent workflows. Digests are calculated locally using the Web Crypto API.'
    },
    decodeBase64MetaDescription:
      'Decode standard or URL-safe Base64 strings back into readable UTF-8 text in your browser with Tulkit’s Base64 decoder. Quickly inspect payloads, headers, or JWT segments.',
    decodeBase32MetaDescription:
      'Convert Base32-encoded values back into readable text using Tulkit’s decoder. Helpful when debugging systems that use Base32 for compact textual identifiers.',
    decodeBase58MetaDescription:
      'Decode Base58 strings that use the Bitcoin alphabet back to bytes and UTF-8 text with Tulkit’s decoder. Inspect blockchain-style identifiers or compact tokens directly in your browser.',
    decodeHexMetaDescription:
      'Turn hex strings back into readable text and raw bytes with Tulkit’s hex decoder. Useful for examining keys, binary blobs, or protocol messages without leaving your browser.',
    loremMetaDescription:
      'Generate lorem ipsum placeholder paragraphs in your browser with Tulkit. Control paragraph count and sentence length for design mockups, UI components, and content layouts.',
    caseMetaDescription:
      'Convert variable and function names between camelCase, snake_case, PascalCase, kebab-case, and more using Tulkit\'s case converter. Paste any identifier and see instant transformations across all naming conventions directly in your browser.',
    urlMetaDescription:
      'Encode and decode URL parameters, query strings, and special characters directly in your browser with Tulkit\'s URL encoder. Perfect for debugging API requests, preparing form data, and inspecting encoded URLs without leaving your desktop.',
    pantoneHubMetaDescription:
      'Choose between Tulkit’s HEX→Pantone converter and Pantone lookup catalog in one place. Convert digital colors to Pantone swatches or grab HEX codes from Pantone references.',
    pantoneMetaDescription:
      'Convert HEX values to their closest Pantone colors in your browser with Tulkit. Inspect ΔE distance, copy Pantone codes, and compare swatches instantly.',
    pantoneCatalogMetaDescription:
      'Browse Pantone swatches and copy HEX or RGB values instantly in your browser. Filter by code or name to grab the exact color for your next handoff.',
    pantoneCatalogColorMetaDescription:
      'View Pantone {code} ({name}) with HEX {hex} and RGB values. Copy this specific swatch directly from Tulkit’s Pantone catalog.',
    regexMetaDescription:
      'Test JavaScript regular expressions, toggle flags, and inspect capture groups entirely in your browser with Tulkit\'s regex tester.',
    indexNowMetaDescription:
      'Submit URLs to IndexNow from Tulkit. Host your key file at the site root, load sitemap URLs, and ping search engines via POST or GET.',
    notFoundMetaDescription:
      'The page you were looking for on Tulkit could not be found. Browse the web formatter, UUID generator, or epoch converter tools instead.'
  },

}

const id: Translation = {
  headingByTab: {
    html: 'Pemformat HTML',
    xml: 'Pemformat XML',
    yaml: 'Pemformat YAML',
    css: 'Pemformat CSS',
    js: 'Pemformat JavaScript',
    json: 'Pemformat JSON',
    sql: 'Pemformat SQL',
    php: 'Pemformat PHP'
  },
  descriptionByTab: {
    auto:
      'Format HTML, XML, YAML, CSS, JavaScript, JSON, SQL, atau PHP di satu tempat. Tulkit mendeteksi bahasa secara otomatis dan merapikan potongan kode langsung di browser Anda.',
    html:
      'Gunakan Tulkit untuk merapikan HTML untuk landing page, email, dan potongan CMS sehingga tag bertingkat tetap mudah dibaca di editor dan saat code review.',
    xml:
      'Format XML untuk sitemap, feed, berkas konfigurasi, atau respons API sehingga tag dan atribut bertingkat tetap mudah dipindai.',
    yaml:
      'Rapiakan berkas konfigurasi YAML, pipeline CI, atau manifest infrastruktur agar indentasi tetap konsisten dan aman diedit.',
    css:
      'Bersihkan CSS, SCSS, dan kelas utilitas dengan Tulkit agar selector dan deklarasi memiliki indentasi konsisten sehingga mudah di-debug.',
    js:
      'Format potongan JavaScript, modul ES, dan kode async dengan Tulkit untuk merapikan eksperimen, contoh kode, atau output log dengan cepat.',
    json:
      'Cetak cantik dan validasi payload JSON, konfigurasi, dan respons API menggunakan Tulkit langsung di browser Anda.',
    sql:
      'Susun ulang query SQL panjang dengan Tulkit agar pernyataan SELECT, JOIN, dan CTE lebih mudah dibaca dan dibagikan.',
    php:
      'Rapikan potongan PHP untuk Laravel, WordPress, dan proyek lain menggunakan pemformat berbasis browser milik Tulkit.'
  },
  uuidDescriptionByVersion: {
    v1:
      'Hasilkan UUID v1 berbasis waktu dengan Tulkit saat Anda membutuhkan pengenal yang mengikuti urutan pembuatan untuk log, job, atau proses impor.',
    v4:
      'Hasilkan pengenal acak UUID v4 secara massal dengan Tulkit langsung di browser Anda menggunakan Web Crypto API untuk ID yang aman dan berkualitas tinggi.',
    v7:
      'Hasilkan UUID v7 berurutan waktu dengan Tulkit agar ID tetap mudah diurutkan sambil tetap menyertakan keacakan yang kuat.'
  },
  formatter: {
    autodetectLabel: 'Deteksi otomatis',
    inputTab: 'Input',
    outputTab: 'Output',
    placeholder: 'Tempelkan kode Anda atau seret berkas ke sini',
    formatLabel: 'Format',
    formattingLabel: 'Sedang memformat…',
    tabSizeLabel: 'Ukuran tab',
    downloadLabel: 'Unduh',
    copyLabel: 'Salin',
    clearLabel: 'Bersihkan',
    copySuccess: 'Berhasil disalin ke clipboard',
    copyErrorPrefix: 'Gagal menyalin: ',
    minifyLabel: 'Minify',
    minifyingLabel: 'Sedang memadatkan…',
    minifyUnsupportedLabel: 'Minify hanya tersedia untuk HTML, XML, CSS, JavaScript, atau JSON.',
    minifyErrorPrefix: 'Gagal memadatkan: ',
    langLabels: formatterLangLabelsBase,
    langInfo: {
      auto: {
        title: 'Pemformat Otomatis',
        description:
          'Tulkit memeriksa potongan kode Anda untuk mencari tag, kurung kurawal, struktur JSON, atau kata kunci SQL lalu memilih pemformat secara otomatis. Cocok saat Anda sering berpindah bahasa dan ingin alur kerja yang cepat tanpa banyak klik.',
        tips: [
          'Jika deteksi salah, pilih tab bahasa secara manual untuk menimpanya.',
          'Deteksi otomatis memprioritaskan default aman, jadi input ambigu akan kembali ke HTML.'
        ]
      },
      html: {
        title: 'Perapih HTML',
        description:
          'Rapiakan markup untuk landing page, email, atau potongan CMS. Tag bertingkat diberi indentasi sesuai ukuran tab pilihan Anda sehingga kode hasil salin tetap mudah dibaca saat review.',
        tips: [
          'Sangat cocok untuk merapikan SVG inline dan potongan template.',
          'Gunakan tombol Salin untuk memindahkan markup langsung ke editor CMS.'
        ]
      },
      css: {
        title: 'Pemformat CSS',
        description:
          'Menormalkan jarak antar selector dan deklarasi untuk CSS, SCSS, atau blok utilitas Tailwind. Membantu menemukan aturan duplikat sebelum commit.',
        tips: [
          'Gunakan ukuran tab lebih kecil untuk framework utility-first.',
          'Seret stylesheet ke editor untuk memeriksa berkas besar dengan cepat.'
        ]
      },
      js: {
        title: 'Pemformat JavaScript',
        description:
          'Ideal untuk merapikan eksperimen cepat, ekspor codepen, atau potongan yang ditempel dari log. Mendukung modul ES, fungsi panah, dan kode async.',
        tips: [
          'Atur ukuran tab ke 2 spasi agar sesuai konvensi React/Node.',
          'Juga nyaman untuk membaca output transpiler TypeScript saat perlu diperiksa.'
        ]
      },
      json: {
        title: 'Perapih JSON',
        description:
          'Validasi dan percantik payload API, berkas konfigurasi, atau fragmen OpenAPI. Tulkit mengurai JSON untuk memastikan strukturnya valid sebelum memformat ulang.',
        tips: [
          'Gunakan tombol Salin untuk mengirim payload rapi ke rekan tim.',
          'Jika parsing gagal, pesan kesalahan menunjukkan karakter bermasalah.'
        ]
      },
      sql: {
        title: 'Pemformat SQL',
        description:
          'Membuat query SELECT panjang lebih mudah dibaca dengan penulisan huruf kunci dan indentasi konsisten. Berguna saat berbagi query Postgres/MySQL atau men-debug ORM.',
        tips: [
          'Mendukung pernyataan JOIN, CTE, INSERT, UPDATE, dan DELETE.',
          'Teman baik ketika menempelkan query ke code review atau dokumentasi.'
        ]
      },
      php: {
        title: 'Pemformat PHP',
        description:
          'Didukung Prettier PHP, cocok untuk Laravel, WordPress, atau potongan kode legacy. Tulkit memuat pemformat sesuai kebutuhan agar UI tetap cepat.',
        tips: [
          'Lebar tab dan lebar cetak mengikuti opsi Prettier secara langsung.',
          'Pemformatan berjalan sepenuhnya di browser Anda sehingga kode tetap privat.'
        ]
      },
      xml: {
        title: 'Pemformat XML',
        description:
          'Cocok untuk merapikan sitemap, feed, berkas konfigurasi, atau respons XML dari API. Tulkit membantu membuat struktur tag yang dalam tetap mudah dibaca.',
        tips: [
          'Gunakan ukuran tab kecil untuk file XML dengan struktur sangat bertingkat.',
          'Gabungkan dengan tab JSON dan SQL saat bekerja dengan payload lintas format.'
        ]
      },
      yaml: {
        title: 'Pemformat YAML',
        description:
          'Membantu menjaga berkas konfigurasi YAML, pipeline CI, dan manifest infrastruktur tetap rapi sehingga kunci bertingkat mudah dipahami.',
        tips: [
          'Bagus untuk merapikan YAML yang disalin dari dokumentasi atau chat sebelum dikomit.',
          'Sesuaikan ukuran tab jika struktur YAML sangat dalam agar tetap nyaman dibaca.'
        ]
      }
    }
  },
  minifierLangInfo: {
    auto: {
      title: 'Mode Minify Otomatis',
      description:
        'Tempel HTML, CSS, JavaScript, atau JSON apa pun dan Tulkit akan memilih minifier yang tepat secara otomatis sehingga Anda bisa mengecilkan snippet tanpa klik tambahan.',
      tips: [
        'Cocok ketika Anda sering berganti jenis aset dan hanya ingin memadatkan apa pun yang ada di clipboard.',
        'Jika deteksi salah, pilih tab bahasa secara manual untuk mengunci mode.'
      ]
    },
    html: {
      title: 'Minifier HTML',
      description:
        'Hapus whitespace, komentar, dan atribut berlebih dari landing page, email, atau snippet embed sambil menjaga markup tetap valid.',
      tips: [
        'Pas untuk potongan CMS atau embed dokumentasi ketika setiap byte berarti.',
        'Gunakan Preview jika perlu memastikan komentar kondisional masih utuh sebelum diterbitkan.'
      ]
    },
    css: {
      title: 'Minifier CSS',
      description:
        'Gunakan csso langsung di browser untuk memadatkan style inline, kelas utilitas, atau potongan stylesheet tanpa menyentuh pipeline build.',
      tips: [
        'Berguna untuk merapikan blok style di CMS atau email HTML.',
        'Simpan salinan yang sudah diformat jika nanti perlu men-debug.'
      ]
    },
    js: {
      title: 'Minifier JavaScript',
      description:
        'Ditenagai Terser, mode ini mengecilkan whitespace, mengganti nama variabel, dan membuang kode mati sehingga skrip inline tetap ringkas.',
      tips: [
        'Ideal untuk feature flag, widget kecil, atau snippet yang dibagikan di balasan dukungan.',
        'Gunakan tombol Salin segera setelah minify agar tidak sengaja mengirim versi tidak terkompres.'
      ]
    },
    json: {
      title: 'Minifier JSON',
      description:
        'Ubah konfigurasi, bundle lokalisasi, atau payload API menjadi satu baris tanpa mengubah artinya.',
      tips: [
        'Cocok saat menaruh JSON di parameter query atau atribut data HTML.',
        'Simpan versi yang mudah dibaca di repositori dan hanya bagikan hasil minify-nya.'
      ]
    }
  },
  uuid: {
    tabLabels: {
      v1: 'UUID v1',
      v4: 'UUID v4',
      v7: 'UUID v7'
    },
    info: {
      v1: {
        title: 'UUID v1 — berbasis waktu',
        description:
          'Memuat komponen timestamp sehingga nilainya kurang lebih mengikuti waktu pembuatan. Berguna saat Anda membutuhkan ID unik yang cenderung terurut sesuai waktu dibuat.',
        tips: [
          'Bisa membocorkan pola waktu, jadi hindari untuk ID yang sensitif.',
          'Sangat cocok untuk log, job latar belakang, atau batch impor.'
        ]
      },
      v4: {
        title: 'UUID v4 — acak',
        description:
          'Pengenal acak dengan 122 bit entropi. Pilihan default yang baik saat Anda membutuhkan ID unik tanpa makna tambahan.',
        tips: [
          'Bagus untuk ID publik di URL atau primary key database.',
          'Paling tepat ketika Anda tidak memerlukan urutan berdasarkan waktu pembuatan.'
        ]
      },
      v7: {
        title: 'UUID v7 — terurut waktu',
        description:
          'Versi UUID terbaru yang menggabungkan prefiks timestamp dengan bit acak. Dirancang agar mudah diurutkan sambil menghindari kekhawatiran ala alamat MAC pada v1.',
        tips: [
          'Ideal untuk database yang diuntungkan oleh ID monotonic yang ramah append.',
          'Berguna untuk analitik, event, dan tabel dengan banyak penulisan.'
        ]
      }
    },
    countLabel: 'Berapa banyak UUID?',
    uppercaseLabel: 'Huruf besar',
    hyphenLabel: 'Sertakan tanda hubung',
    bracesLabel: 'Tambahkan kurung kurawal',
    generateLabel: 'Buat UUID',
    copyAllLabel: 'Salin semua',
    placeholder: 'Klik “Buat UUID” untuk membuat pengenal.',
    copySuccess: 'Berhasil disalin ke clipboard',
    copyErrorPrefix: 'Gagal menyalin: '
  },
  epoch: {
    currentPrefix: 'Waktu Unix epoch saat ini adalah',
    modeSeconds: 'Detik Unix',
    modeMilliseconds: 'Milidetik Unix',
    useCurrentTime: 'Gunakan waktu sekarang',
    epochToDateHeading: 'Epoch ke tanggal',
    timezoneLabel: 'Zona waktu untuk output tanggal',
    timezonePlaceholder: 'Ketik atau atur zona waktu Anda, mis. America/Edmonton',
    epochLabel: 'Nilai epoch (detik atau milidetik)',
    epochPlaceholderSeconds: 'contoh 1732665600',
    epochPlaceholderMilliseconds: 'contoh 1732665600000',
    utcLabel: 'UTC',
    localLabel: 'Waktu lokal',
    gmtLabel: 'Tanggal dan waktu (GMT)',
    dateToEpochHeading: 'Tanggal ke epoch',
    dateInputLabel: 'Tanggal dan waktu (zona waktu terpilih)',
    dateInputNote: 'Zona waktu untuk tanggal ini:',
    browserDefaultLabel: 'bawaan browser',
    unixSecondsLabel: 'Detik Unix',
    unixMillisecondsLabel: 'Milidetik Unix',
    copyLabel: 'Salin',
    copySuccess: 'Berhasil disalin ke clipboard',
    copyErrorPrefix: 'Gagal menyalin: '
  },
  urlEncoder: {
    heading: 'URL Encoder',
    subheading: 'Enkode dan dekode parameter URL serta karakter khusus untuk transmisi yang aman',
    placeholder: 'Tempel teks atau URL untuk dienkode, atau URL yang dienkode untuk didekode',
    encode: 'Enkode',
    decode: 'Dekode',
    clear: 'Hapus',
    clearTooltip: 'Hapus input',
    copy: 'Salin',
    copied: 'Berhasil disalin!',
    copyTooltip: 'Salin hasil ke clipboard',
    swap: 'Tukar',
    swapTooltip: 'Gunakan hasil sebagai input dan balikkan operasi',
    error: 'Input tidak valid untuk dekoding',
    info: {
      title: 'Tentang URL Encoding',
      description: 'URL encoding (percent-encoding) mengonversi karakter khusus ke format yang aman untuk transmisi dalam URL dan query string. Spasi menjadi %20, dan karakter cadangan lainnya seperti & ? # dikode untuk mencegah konflik dengan sintaks URL.',
      tips: [
        'Gunakan Enkode untuk menyiapkan teks untuk URL, parameter query, atau permintaan API',
        'Gunakan Dekode untuk memeriksa URL yang dienkode dari log browser atau respons API Anda',
        'Karakter yang umum dienkode: %20 (spasi), %26 (&), %3F (?), %23 (#), %2F (/)',
        'Urutan persen yang tidak valid seperti %GG akan memicu kesalahan—perbaiki sebelum mendekode'
      ]
    },
    overview: {
      useCases: [
        'Membangun URL dengan parameter dinamis untuk API dan layanan web',
        'Menyiapkan data form dan query string untuk permintaan web',
        'Men-debug dan memeriksa URL yang dikodekan dari log browser',
        'Menyematkan karakter khusus dengan aman di URL dan hyperlink'
      ],
      benefits: [
        'Mencegah konflik sintaks URL dengan mengenkode karakter yang dicadangkan',
        'Mendukung karakter internasional dan simbol khusus di URL',
        'Bekerja sepenuhnya di browser Anda tanpa mengunggah data',
        'Enkoding sesuai standar menggunakan spesifikasi RFC 3986'
      ]
    }
  },
  regexTester: {
    heading: 'Regex Tester',
    subheading: 'Uji ekspresi reguler JavaScript, flag, dan capture group langsung di browser Anda.',
    patternLabel: 'Pola',
    patternPlaceholder: 'mis. (\\w+)@(\\w+\\.\\w+)',
    sampleLabel: 'Teks uji',
    samplePlaceholder: 'Tempel teks yang ingin diperiksa',
    flagsLabel: 'Flag',
    flags: {
      g: {
        label: 'Global',
        description: 'Temukan semua kecocokan, bukan berhenti di kecocokan pertama.'
      },
      i: {
        label: 'Abaikan huruf besar',
        description: 'Perlakukan huruf kecil dan huruf besar sebagai karakter yang sama.'
      },
      m: {
        label: 'Multi-line',
        description: 'Buat ^ dan $ cocok di awal atau akhir setiap baris.'
      },
      s: {
        label: 'Dotall',
        description: 'Izinkan token titik (.) mencocokkan karakter newline.'
      },
      u: {
        label: 'Unicode',
        description: 'Aktifkan mode Unicode agar escape khusus dan simbol astral didukung.'
      },
      y: {
        label: 'Sticky',
        description: 'Cocokkan mulai dari posisi lastIndex saat ini saja.'
      }
    },
    emptyPatternHint: 'Mulai dengan mengetik ekspresi reguler.',
    summaryLabel: 'Jumlah kecocokan: {count}',
    noMatchesLabel: 'Belum ada kecocokan.',
    invalidPatternPrefix: 'Pola tidak valid: ',
    previewLabel: 'Pratinjau dengan highlight',
    emptyPreviewLabel: 'Belum ada teks untuk dipratinjau.',
    matchesHeading: 'Detail kecocokan',
    matchColumn: 'Cocokan',
    indexColumn: 'Indeks',
    groupsColumn: 'capture group',
    noGroupsLabel: 'Tidak ada capture group',
    emptyGroupValue: '—',
    numberedGroupLabel: 'Grup {index}',
    namedGroupLabel: 'Grup bernama {name}'
  },
  encoder: {
    inputEncodingLabel: 'Encoding input',
    inputEncodingUtf8: 'Teks (UTF-8)',
    inputEncodingBase64: 'Base64 (standar atau URL-safe)',
    inputEncodingBase32: 'Base32',
    inputEncodingBase58: 'Base58 (alfabet Bitcoin)',
    inputEncodingHex: 'Hex (huruf kecil/besar)',
    outputEncodingLabel: 'Encoding output',
    outputEncodingBase64: 'Base64',
    outputEncodingBase64Url: 'Base64 (aman untuk URL)',
    outputEncodingBase32: 'Base32',
    outputEncodingBase58: 'Base58',
    outputEncodingHex: 'Hex (huruf kecil)',
    outputEncodingText: 'Teks (UTF-8)',
    inputLabel: 'Input',
    inputPlaceholder: 'Tempel teks, Base64, Base32, Base58, atau hex untuk dikonversi',
    outputLabel: 'Output',
    outputPlaceholder: 'Hasil konversi akan muncul di sini',
    convertLabel: 'Konversi',
    copyLabel: 'Salin',
    copySuccess: 'Berhasil disalin ke clipboard',
    copyErrorPrefix: 'Gagal menyalin: ',
    inputErrorPrefix: 'Input tidak dapat didekode: ',
    presetEncodeBase64: 'Base64',
    presetEncodeBase32: 'Base32',
    presetEncodeBase58: 'Base58',
    presetEncodeHex: 'Hex',
    presetDecodeBase64: 'Base64',
    presetDecodeBase32: 'Base32',
    presetDecodeBase58: 'Base58',
    presetDecodeHex: 'Hex'
  },
  hash: {
    algorithmLabel: 'Algoritma hash',
    algorithmSha1: 'SHA-1',
    algorithmSha256: 'SHA-256',
    algorithmSha512: 'SHA-512',
    inputLabel: 'Input',
    inputPlaceholder: 'Tempel teks yang akan di-hash (UTF-8)',
    outputLabel: 'Digest hex',
    outputPlaceholder: 'Hasil hash akan muncul di sini',
    generateLabel: 'Buat hash',
    hashingLabel: 'Memproses…',
    copyLabel: 'Salin',
    copySuccess: 'Hash berhasil disalin ke clipboard',
    copyErrorPrefix: 'Gagal menyalin: ',
    inputErrorPrefix: 'Hash tidak dapat dihitung: '
  },
  pantone: {
    title: 'Konverter Hex ke Pantone',
    description: 'Tempel warna HEX apa pun untuk menghitung kecocokan Pantone terdekat dengan jarak ΔE.',
    inputLabel: 'Warna hex',
    hexPlaceholder: '#2F6BFF',
    convertBtn: 'Cari kecocokan Pantone',
    invalidHex: 'Masukkan warna hex 3 atau 6 digit (boleh tanpa #).',
    hexLabel: 'Hex',
    rgbLabel: 'RGB',
    distanceLabel: 'Jarak ΔE',
    pantoneLabel: 'Kecocokan Pantone terdekat',
    codeLabel: 'Kode Pantone',
    nameLabel: 'Nama',
    yourColorLabel: 'Warna Anda',
    pantoneColorLabel: 'Pantone',
    matchHeading: 'Detail kecocokan',
    comparisonHeading: 'Perbandingan',
    alternatesHeading: 'Pilihan Pantone terdekat lainnya',
    matchRankLabel: 'Kecocokan',
    pickerLabel: 'Buka pemilih warna',
    copyLabel: 'Salin',
    copySuccess: 'Berhasil disalin ke clipboard',
    copyError: 'Gagal menyalin'
  },
  pantoneCatalog: {
    title: 'Pantone ke HEX',
    description: 'Jelajahi katalog Pantone Tulkit dan salin kode HEX atau RGB langsung dari browser.',
    searchLabel: 'Cari Pantone',
    searchPlaceholder: 'Ketik kode atau nama Pantone…',
    clearSearch: 'Bersihkan',
    listHeading: 'Daftar Pantone',
    emptyState: 'Tidak ada Pantone yang cocok dengan pencarian ini.',
    detailHeading: 'Detail warna',
    notFoundMessage: 'Link ini tidak cocok dengan kode Pantone mana pun. Pilih warna dari daftar.',
    converterCta: 'Butuh konversi HEX ke Pantone?',
    converterCtaButton: 'Buka HEX → Pantone'
  },
  pantoneLanding: {
    title: 'Tools warna Pantone',
    description: 'Pilih alur Pantone yang Anda butuhkan: konversi warna HEX ke swatch Pantone terdekat atau jelajahi palet Pantone untuk menyalin nilai digitalnya.',
    intro: 'Tulkit menyediakan dua tool Pantone yang saling melengkapi langsung di browser, sehingga Anda bisa bolak-balik antara spesifikasi cetak dan digital tanpa software tambahan.',
    hexTitle: 'Konverter HEX → Pantone',
    hexDescription: 'Tempel warna HEX apa pun untuk menghitung swatch Pantone terdekat memakai jarak ΔE. Bandingkan swatch berdampingan dan salin kode Pantone seketika.',
    hexFeatures: [
      'Akurasi ΔE (LAB)',
      'Salin kode & RGB Pantone',
      'Link bagikan dengan ?hex='
    ],
    hexCta: 'Buka konverter HEX → Pantone',
    catalogTitle: 'Lookup Pantone → HEX',
    catalogDescription: 'Cari palet Pantone berdasarkan kode atau nama, lihat swatch langsung, lalu salin nilai HEX atau RGB untuk guideline digital Anda.',
    catalogFeatures: [
      'Filter nama/kode Pantone',
      'Salin HEX/RGB instan',
      'Link swatch yang bisa dibagi'
    ],
    catalogCta: 'Buka katalog Pantone'
  },
  app: {
    logoAlt: 'Logo Tulkit Online',
    brandHeading: 'Peralatan Web — Tulkit',
    brandSubheading: 'Kumpulan alat web ringan untuk kebutuhan developer sehari-hari',
    brandNote: 'Semua pemformatan dan pembuatan berjalan di browser Anda saja; kode tidak pernah keluar dari perangkat.',
    navGenerator: 'Generator',
    navConverters: 'Konverter',
    navFormatter: 'Pemformat',
    navUuid: 'Generator UUID',
    navEpoch: 'Konverter Epoch',
    navEncode: 'Encoder',
    navMinify: 'Minifier',
    navDecode: 'Decoder',
    navLorem: 'Generator Lorem Ipsum',
    navHash: 'Generator Hash',
    navCase: 'Konverter Case',
    navUrl: 'Encoder URL',
    navPantone: 'Tools Pantone',
    navPantoneCatalog: 'Pantone ke HEX',
    navRegex: 'Tester Regex',
    languageSwitcherLabel: 'Bahasa',
    seoTitles: {
      formatterDefault: 'Pemformat Web — Tulkit',
      formatterHtml: 'Pemformat HTML — Tulkit',
      formatterXml: 'Pemformat XML — Tulkit',
      formatterYaml: 'Pemformat YAML — Tulkit',
      formatterCss: 'Pemformat CSS — Tulkit',
    formatterJs: 'Pemformat JavaScript — Tulkit',
    formatterJson: 'Pemformat JSON — Tulkit',
    formatterSql: 'Pemformat SQL — Tulkit',
    formatterPhp: 'Pemformat PHP — Tulkit',
    minify: 'Minifier — Tulkit',
    minifyHtml: 'HTML Minifier — Tulkit',
    minifyXml: 'XML Minifier — Tulkit',
    minifyCss: 'CSS Minifier — Tulkit',
    minifyJs: 'JavaScript Minifier — Tulkit',
    minifyJson: 'JSON Minifier — Tulkit',
    uuid: 'Generator UUID — Tulkit',
      uuidV1: 'Generator UUID v1 — Tulkit',
      uuidV4: 'Generator UUID v4 — Tulkit',
      uuidV7: 'Generator UUID v7 — Tulkit',
      epoch: 'Konverter Epoch — Tulkit',
      encode: 'Encoder — Tulkit',
      decode: 'Decoder — Tulkit',
      encodeBase64: 'Encoder Base64 — Tulkit',
      encodeBase32: 'Encoder Base32 — Tulkit',
      encodeBase58: 'Encoder Base58 — Tulkit',
      encodeHex: 'Encoder Hex — Tulkit',
      decodeBase64: 'Decoder Base64 — Tulkit',
      decodeBase32: 'Decoder Base32 — Tulkit',
      decodeBase58: 'Decoder Base58 — Tulkit',
      decodeHex: 'Decoder Hex — Tulkit',
      lorem: 'Generator Lorem Ipsum — Tulkit',
      hash: 'Generator Hash — Tulkit',
      case: 'Konverter Case — Tulkit',
      url: 'Encoder URL — Tulkit',
      pantoneHub: 'Tools Pantone — Tulkit',
      pantone: 'Konverter Pantone — Tulkit',
      pantoneCatalog: 'Pantone ke HEX — Tulkit',
      pantoneCatalogColor: 'Pantone {code} ke HEX ({hex}) — Tulkit',
      regex: 'Regex Tester — Tulkit',
      indexNowAdmin: 'IndexNow Submit — Tulkit',
      notFound: 'Halaman tidak ditemukan — Tulkit'
    },
    breadcrumbTitles: {
      encode: {
        default: 'Encoder',
        base64: 'Encoder Base64',
        base32: 'Encoder Base32',
        base58: 'Encoder Base58',
        hex: 'Encoder Hex'
      },
      decode: {
        default: 'Decoder',
        base64: 'Decoder Base64',
        base32: 'Decoder Base32',
        base58: 'Decoder Base58',
        hex: 'Decoder Hex'
      }
    },
    indexNow: {
      heading: 'Ping IndexNow',
      description:
        'Kirim permintaan IndexNow untuk URL yang sedang dibuka. Kunci disimpan di browser saja; jika POST terblokir/CORS, pakai tautan GET di bawah.',
      keyLabel: 'Kunci IndexNow',
      keyHelp: 'Gunakan kunci yang disimpan di https://domain-anda/<key>.txt. Tersimpan lokal di browser.',
      hostLabel: 'Host situs',
      hostHelp: 'Default ke host saat ini.',
      keyLocationLabel: 'URL file kunci',
      keyLocationHelp: 'Biarkan kosong untuk https://{host}/{key}.txt',
      currentUrlLabel: 'URL sekarang',
      submitLabel: 'Submit URL ini',
      submittingLabel: 'Mengirim…',
      successMessage: 'URL dikirim ke IndexNow. Perayap akan mengambilnya sebentar lagi.',
      errorPrefix: 'Gagal kirim: ',
      missingKey: 'Masukkan kunci IndexNow dulu.',
      missingUrl: 'URL sekarang tidak tersedia.',
      missingHost: 'Isi host situs (mis. contoh.com).',
      openPing: 'Buka ping GET',
      copyPingUrl: 'Salin URL ping',
      copied: 'Tersalin',
      pingUrlLabel: 'Ping GET cadangan',
      pingUrlHelp: 'Kalau POST diblokir, buka atau salin URL GET ini untuk memicu IndexNow manual.',
      keyFileLabel: 'Lokasi file kunci',
      keyFileHelp: 'Simpan file kunci di root situs agar IndexNow bisa verifikasi kepemilikan.',
      keyFileNote: 'Host file statis bernama <key>.txt dengan isi hanya string kuncinya.',
      downloadKey: 'Unduh key.txt',
      sitemapLabel: 'URL Sitemap',
      sitemapHelp: 'Default ke /sitemap.xml di host ini. Muat untuk memilih URL yang mau dikirim.',
      loadSitemap: 'Muat sitemap',
      sitemapLoading: 'Memuat sitemap…',
      sitemapLoaded: 'Sitemap dimuat: {count} URL ditemukan.',
      sitemapEmpty: 'Tidak ada URL di sitemap ini.',
      sitemapErrorPrefix: 'Gagal memuat sitemap: ',
    sitemapUrlListLabel: 'Pilih URL yang akan dikirim',
    selectAll: 'Pilih semua',
    clearSelection: 'Bersihkan',
    selectedCount: 'Terpilih: {count}',
    submitSelectedLabel: 'Submit URL terpilih',
    missingSelection: 'Pilih minimal satu URL untuk dikirim.'
  },
    notFoundHeading: 'Halaman tidak ditemukan',
    notFoundBody:
      'Tautan yang Anda ikuti tidak cocok dengan alat Tulkit mana pun. Gunakan tombol di atas untuk kembali ke pemformat, generator UUID, atau konverter epoch.',
    goToFormatterCta: 'Buka Pemformat Web',
    footerNote: 'Prototype — Tulkit Web Tools',
    footerLinks: {
      formatting: [
        { label: 'Pemformat Web', path: '/formatter' },
        { label: 'Pemformat HTML', path: '/formatter/html' },
        { label: 'Pemformat CSS', path: '/formatter/css' },
        { label: 'Pemformat JavaScript', path: '/formatter/javascript' },
        { label: 'Pemformat JSON', path: '/formatter/json' },
        { label: 'Pemformat SQL', path: '/formatter/sql' },
        { label: 'Pemformat PHP', path: '/formatter/php' },
        { label: 'Pemformat XML', path: '/formatter/xml' },
        { label: 'Pemformat YAML', path: '/formatter/yaml' }
      ],
      optimization: [
        { label: 'Minifier', path: '/minify' },
        { label: 'Minifier HTML', path: '/minify/html' },
        { label: 'Minifier CSS', path: '/minify/css' },
        { label: 'Minifier JavaScript', path: '/minify/javascript' },
        { label: 'Minifier JSON', path: '/minify/json' }
      ],
      conversion: [
        { label: 'Tools Pantone', path: '/pantone' },
        { label: 'Konverter Epoch', path: '/converter/epoch' },
        { label: 'Konverter Case', path: '/converter/case' },
        { label: 'Encoder URL', path: '/converter/url' },
        { label: 'Konverter Pantone', path: '/pantone/hex-to-pantone' },
        { label: 'Pantone ke HEX', path: '/pantone/pantone-to-hex' },
        { label: 'Regex Tester', path: '/converter/regex' }
      ],
      encoding: [
        { label: 'Encoder', path: '/encode' },
        { label: 'Encoder Base64', path: '/encode/base64' },
        { label: 'Encoder Base32', path: '/encode/base32' },
        { label: 'Encoder Base58', path: '/encode/base58' },
        { label: 'Encoder Hex', path: '/encode/hex' },
        { label: 'Decoder', path: '/decode' },
        { label: 'Decoder Base64', path: '/decode/base64' },
        { label: 'Decoder Base32', path: '/decode/base32' },
        { label: 'Decoder Base58', path: '/decode/base58' },
        { label: 'Decoder Hex', path: '/decode/hex' }
      ],
      generation: [
        { label: 'Generator UUID', path: '/generator/uuid' },
        { label: 'UUID v1', path: '/generator/uuid/uuid-v1' },
        { label: 'UUID v4', path: '/generator/uuid/uuid-v4' },
        { label: 'UUID v7', path: '/generator/uuid/uuid-v7' },
        { label: 'Generator Lorem Ipsum', path: '/generator/lorem' }
      ],
      security: [
        { label: 'Generator Hash', path: '/generator/hash' },
        { label: 'SHA-1', path: '/generator/hash/sha1' },
        { label: 'SHA-256', path: '/generator/hash/sha256' },
        { label: 'SHA-512', path: '/generator/hash/sha512' }
      ]
    },
    epochMetaDescription:
      'Konversikan timestamp Unix ke tanggal yang mudah dibaca dan sebaliknya dengan Tulkit. Beralih cepat antara detik, milidetik, UTC, dan waktu lokal langsung di browser Anda.',
    encodeMetaDescription:
      'Konversikan teks UTF-8, Base64, dan hex dengan encoder Tulkit di browser Anda. Bantu memeriksa dan menormalkan data biner tanpa alat tambahan.',
    decodeMetaDescription:
      'Dekode nilai Base64, Base32, Base58, dan hex dengan decoder Tulkit di browser Anda. Ubah data terenkode menjadi teks yang mudah dibaca untuk debugging dan inspeksi payload.',
    encodeBase64MetaDescription:
      'Konversikan teks UTF-8 ke Base64 standar atau aman-URL dengan encoder Base64 Tulkit langsung di browser Anda. Cocok untuk header, segmen JWT, atau potongan biner.',
    encodeBase32MetaDescription:
      'Ubah teks UTF-8 menjadi Base32 menggunakan encoder Tulkit. Berguna untuk sistem dan protokol yang mengandalkan Base32 untuk pengenal teks yang ringkas.',
    encodeBase58MetaDescription:
      'Encode teks menjadi Base58 dengan encoder Tulkit menggunakan alfabet Bitcoin. Ideal untuk membuat pengenal yang ramah dibaca dan payload bergaya blockchain.',
    encodeHexMetaDescription:
      'Ubah teks UTF-8 menjadi string hex huruf kecil di browser Anda dengan encoder Tulkit. Tepat untuk memeriksa data biner, kunci, atau payload protokol tanpa CLI eksternal.',
    minifyMetaDescription: {
      auto:
        'Padatkan HTML, CSS, JavaScript, atau JSON langsung di browser Anda dengan minifier Tulkit. Tempel snippet, pilih tab, dan kirimkan payload lebih ringan tanpa ribet setup build.',
      html:
        'Hapus whitespace, komentar, dan atribut berlebih dari landing page atau embed memakai minifier HTML Tulkit sehingga markup siap dibagikan dalam hitungan detik.',
      css:
        'Kompres CSS atau keluaran SCSS dengan Tulkit agar style inline bebas whitespace dan token berlebih sebelum ditempel ke CMS atau template email.',
      js:
        'Gunakan Tulkit untuk memadatkan snippet JavaScript sepenuhnya di browser, menyingkirkan whitespace dan kode mati dari skrip kecil sebelum dipublikasikan.',
      json:
        'Ratakan payload JSON menjadi satu baris ringkas dengan minifier Tulkit—pas untuk parameter query, atribut data, atau konfigurasi yang harus hemat byte.'
    },
    hashMetaDescription: {
      sha1:
        'Buat hash SHA-1 langsung di browser Anda dengan generator hash Tulkit ketika masih perlu kompatibilitas dengan sistem lama. Tempel teks untuk menghitung digest hex yang konsisten memakai Web Crypto API.',
      sha256:
        'Buat hash SHA-256 langsung di browser Anda dengan generator hash Tulkit. Tempel teks untuk menghitung digest hex deterministik yang cocok dengan banyak CLI dan library populer.',
      sha512:
        'Hitung hash SHA-512 di browser menggunakan generator hash Tulkit, ideal untuk sidik jari panjang pada skenario arsip atau alur kerja yang bersinggungan dengan keamanan. Perhitungan digest berlangsung lokal memakai Web Crypto API.'
    },
    decodeBase64MetaDescription:
      'Dekode string Base64 standar atau aman-URL kembali menjadi teks UTF-8 yang mudah dibaca memakai decoder Base64 Tulkit. Cepat untuk memeriksa payload, header, atau segmen JWT.',
    decodeBase32MetaDescription:
      'Konversikan nilai Base32 kembali ke teks menggunakan decoder Tulkit. Membantu saat men-debug sistem yang memakai Base32 untuk pengenal teks yang ringkas.',
    decodeBase58MetaDescription:
      'Dekode string Base58 ber-alfabet Bitcoin kembali menjadi byte dan teks UTF-8 dengan decoder Tulkit. Periksa pengenal bergaya blockchain atau token ringkas langsung di browser.',
    decodeHexMetaDescription:
      'Ubah string hex kembali menjadi teks dan byte mentah dengan decoder hex Tulkit. Cocok untuk menelusuri kunci, blob biner, atau pesan protokol tanpa meninggalkan browser.',
    loremMetaDescription:
      'Buat paragraf lorem ipsum sebagai teks dummy di browser dengan Tulkit. Atur jumlah paragraf dan panjang kalimat untuk kebutuhan desain dan layout konten.',
    caseMetaDescription:
      'Konversi nama variabel dan fungsi antara camelCase, snake_case, PascalCase, kebab-case, dan lebih banyak lagi menggunakan Konverter Case Tulkit. Tempel pengenal apa saja dan lihat transformasi instan lintas semua konvensi penamaan langsung di browser.',
    urlMetaDescription:
      'Enkode dan dekode parameter URL serta karakter khusus langsung di browser dengan encoder URL Tulkit. Sempurna untuk men-debug permintaan API, menyiapkan data form, dan memeriksa URL terenkode tanpa meninggalkan desktop.',
    pantoneHubMetaDescription:
      'Pilih antara konverter HEX→Pantone dan katalog Pantone→HEX Tulkit di satu halaman. Cocok untuk menyamakan warna digital dengan swatch Pantone atau sebaliknya.',
    pantoneMetaDescription:
      'Konversikan warna HEX ke swatch Pantone terdekat di browser dengan Tulkit. Lihat jarak ΔE, bandingkan swatch, dan salin kode Pantone secara instan.',
    pantoneCatalogMetaDescription:
      'Lihat daftar warna Pantone dan salin kode HEX atau RGB secara instan. Filter berdasarkan nama atau kode Pantone langsung dari browser Anda.',
    pantoneCatalogColorMetaDescription:
      'Lihat Pantone {code} ({name}) lengkap dengan nilai HEX {hex} dan RGB. Salin detail swatch ini langsung dari katalog Pantone Tulkit.',
    regexMetaDescription:
      'Uji ekspresi reguler JavaScript, ubah flag, dan lihat capture group secara lokal di browser Anda dengan Regex Tester Tulkit.',
    indexNowMetaDescription:
      'Submit URL ke IndexNow langsung dari Tulkit. Host file kunci di root situs, muat URL sitemap, lalu ping mesin pencari via POST atau GET.',
    notFoundMetaDescription:
      'Halaman Tulkit yang Anda cari tidak ditemukan. Jelajahi alat pemformat web, generator UUID, atau konverter epoch sebagai gantinya.'
  },

}

export const translations: Record<LanguageCode,Translation> = { en, id }

export function getTranslations(language: LanguageCode = 'en'): Translation{
  return translations[language] || translations.en
}

export const languageNames: Record<LanguageCode,string> = {
  en: 'English',
  id: 'Bahasa Indonesia'
}
