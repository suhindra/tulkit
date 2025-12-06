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

type LoremCopy = {
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

type AppCopy = {
  logoAlt: string
  brandHeading: string
  brandSubheading: string
  brandNote: string
  navFormatter: string
  navMinify: string
  navUuid: string
  navEpoch: string
  navEncode: string
  navDecode: string
  navLorem: string
  navHash: string
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
    notFound: string
  }
  seoBlurb: {
    formatter: Record<ActiveTab,string[]>
    uuid: Record<UuidVersion,string[]>
    epoch: string[]
    encode: Record<CodecSubtool,string[]>
    minify: Record<ActiveTab,string[]>
    decode: Record<CodecSubtool,string[]>
    lorem: string[]
    hash: Record<'sha1' | 'sha256' | 'sha512',string[]>
  }
  notFoundHeading: string
  notFoundBody: string
  goToFormatterCta: string
  footerNote: string
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
  notFoundMetaDescription: string
}

type OverviewCopy = {
  formatter: Record<ActiveTab,OverviewContent>
  uuid: Record<UuidVersion,OverviewContent>
  epoch: OverviewContent
  encode: Record<CodecSubtool,OverviewContent>
  minify: OverviewContent
  decode: Record<CodecSubtool,OverviewContent>
  lorem: OverviewContent
  hash: OverviewContent
}

type Translation = {
  headingByTab: Record<Exclude<ActiveTab,'auto'>,string>
  descriptionByTab: Record<ActiveTab,string>
  uuidDescriptionByVersion: Record<UuidVersion,string>
  formatter: FormatterCopy
  minifierLangInfo: Record<MinifyTab,LangInfo>
  uuid: UuidCopy
  epoch: EpochCopy
  lorem: LoremCopy
  encoder: EncoderCopy
  hash: HashCopy
  app: AppCopy
  overviews: OverviewCopy
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
  lorem: {
    paragraphCountLabel: 'How many paragraphs?',
    classicPrefixLabel: 'Start with “Lorem ipsum dolor sit amet…”',
    lengthLabel: 'Sentence length',
    lengthShort: 'Short',
    lengthMedium: 'Medium',
    lengthLong: 'Long',
    generateLabel: 'Generate lorem ipsum',
    copyLabel: 'Copy',
    copySuccess: 'Lorem ipsum copied to clipboard',
    copyErrorPrefix: 'Clipboard failed: ',
    referencesHeading: 'Classic Lorem Ipsum sources',
    standardHeading: 'The standard Lorem Ipsum passage, used since the 1500s',
    standardBody:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    cicero1Heading: 'Section 1.10.32 of “De Finibus Bonorum et Malorum” (Cicero, 45 BC)',
    cicero1Latin:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    cicero1TranslationHeading: '1914 English translation by H. Rackham',
    cicero1Translation:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?',
    cicero2Heading: 'Section 1.10.33 of “De Finibus Bonorum et Malorum” (Cicero, 45 BC)',
    cicero2Latin:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    cicero2TranslationHeading: '1914 English translation by H. Rackham',
    cicero2Translation:
      'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.'
  },
  app: {
    logoAlt: 'Tulkit Online logo',
    brandHeading: 'Web Tools — Tulkit',
    brandSubheading: 'Small browser tools for everyday development tasks',
    brandNote: 'All formatting and generation happens in your browser only; your code never leaves your device.',
    navFormatter: 'Formatter',
    navUuid: 'UUID Generator',
    navEpoch: 'Epoch Converter',
    navEncode: 'Encoder',
    navMinify: 'Minifier',
    navDecode: 'Decoder',
    navLorem: 'Lorem Ipsum',
    navHash: 'Hash Generator',
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
      notFound: 'Page not found — Tulkit'
    },
    seoBlurb: {
      formatter: {
        auto: [
          'A fast WebFormatter alternative for HTML, CSS, JavaScript, SQL, JSON, and PHP. Tulkit lets developers, technical writers, and QA teams tidy up code directly in the browser without installing extra tools. Paste a snippet from your editor or drag a file, then get a clean result that is ready for documentation, pull requests, or debugging sessions.',
          'The formatter includes syntax highlighting, tab width controls, and automatic language detection, so it is a handy companion whether you are polishing front-end assets or reviewing database queries. All formatting stays local in your browser for maximum privacy.'
        ],
        html: [
          'Use Tulkit’s HTML formatter to clean up landing pages, email templates, or CMS snippets so nested tags stay readable when you paste them back into editors.',
          'It is perfect for inline SVG or templated components when you just need consistent indentation without firing up a full IDE.'
        ],
        css: [
          'Normalize selectors, utility classes, and component styles so spacing and braces line up before you share a stylesheet.',
          'Tulkit respects your preferred tab width, making it easy to tidy SCSS, Tailwind blocks, or designer handoffs directly in the browser.'
        ],
        js: [
          'Clean up JavaScript or TypeScript snippets copied from experiments, code pens, or log output in seconds.',
          'The formatter handles modules, async functions, and arrow-heavy code so you can inspect logic without fighting indentation.'
        ],
        json: [
          'Pretty-print JSON payloads, configs, or API responses while keeping the structure valid the entire time.',
          'It is ideal for debugging webhook payloads, editing service configs, or sharing readable examples with teammates.'
        ],
        sql: [
          'Reflow long SQL queries so SELECT, JOIN, and CTE clauses become easier to scan before handing them to reviewers.',
          'Great for documenting analytics queries or inspecting ORM-generated statements without opening a database IDE.'
        ],
        php: [
          'Tidy PHP snippets for WordPress, Laravel, or legacy projects without booting a local stack.',
          'Tulkit streams the PHP formatter on demand so you can clean up Blade templates, controllers, or helpers entirely in the browser.'
        ],
        xml: [
          'Format XML sitemaps, feeds, or config files so attributes and nested elements stay aligned.',
          'Helpful when you review API responses, sitemap indexes, or system descriptors that become messy after multiple edits.'
        ],
        yaml: [
          'Keep YAML manifests, CI configs, and infrastructure files safe to edit by enforcing consistent indentation.',
          'Tulkit is useful for tidying snippets copied from docs or chat before you commit them back to the repo.'
        ]
      },
      uuid: {
        v1: [
          'Generate UUID v1 identifiers that embed a timestamp and node hint so IDs roughly follow creation order right in your browser.',
          'Great for log processors, background jobs, or import batches where chronological grouping matters more than total randomness.'
        ],
        v4: [
          'Generate one or many RFC-4122 compliant UUID v4 values directly in your browser. Control casing and formatting to match how your application expects IDs.',
          'UUIDs are generated using the Web Crypto API when available, so identifiers are high-quality and never sent to a server.'
        ],
        v7: [
          'Create UUID v7 values that stay sortable by time while still providing strong randomness for safety.',
          'Use them for analytics pipelines, append-only databases, or queues that benefit from monotonic IDs without leaking hardware metadata.'
        ]
      },
      epoch: [
        'Convert Unix epoch timestamps to readable dates and back again in seconds. Paste a value in seconds or milliseconds and see matching UTC, GMT, and time-zone aware local output.',
        'You can also pick a date and time, copy the resulting Unix values for use in APIs or database queries, and adjust the time zone to see how the same instant appears around the world.'
      ],
      encode: {
        default: [
          'Convert between text, hex, and Base64 directly in your browser. Paste any UTF-8 text, Base64 value, or hex string and Tulkit will normalize it into the format you need.',
          'This encoder is handy when you are working with HTTP headers, JWT segments, configuration secrets, or binary blobs and need to quickly inspect or re-encode them without leaving the browser.'
        ],
        base64: [
          'Convert UTF-8 text to standard or URL-safe Base64 instantly. Tulkit normalizes padding and strips stray whitespace so you can drop the output into Authorization headers, MIME attachments, or JWT claims without extra cleanup.',
          'Use this when you want to double-check how secrets, certificates, or binary blobs will travel through systems that only accept ASCII characters.'
        ],
        base32: [
          'Encode values with the RFC 4648 Base32 alphabet that is often used for DNS-safe identifiers, recovery codes, or TOTP seeds.',
          'Tulkit keeps spacing consistent and avoids accidental padding so you can copy the result directly into provisioning flows or API payloads.'
        ],
        base58: [
          'Produce Base58 strings that skip confusing characters like 0/O or I/l while still packing a lot of information into a short value.',
          'Helpful for blockchain-style addresses, invite codes, or short IDs that humans need to read or dictate without mistakes.'
        ],
        hex: [
          'Turn any text into lowercase hex pairs to mirror how binaries, hashes, or signatures are represented in most CLI tools.',
          'Great for inspecting payloads, computing fixtures by hand, or sharing deterministic values with QA and back-end teammates.'
        ]
      },
      minify: {
        auto: [
          'Minify HTML, XML, CSS, JavaScript, or JSON right in your browser. Paste the asset you plan to ship, click Minify, and Tulkit will strip whitespace, collapse attributes, and shrink payload size without sending code anywhere.',
          'Useful when you need production-ready snippets for embeds, email templates, configuration blobs, or inline scripts and styles but do not want to wire up a full build step just to compress a quick fix.'
        ],
        html: [
          'Compress landing pages, email templates, or embeds by stripping whitespace, comments, and redundant attributes while keeping HTML semantics intact.',
          'Ideal when you need to hand off a small snippet to marketing or documentation teams and want it as light as possible.'
        ],
        xml: [
          'Minify XML sitemaps, feeds, and configuration files without breaking tag casing or required closing tags.',
          'Handy when you want to ship compact XML payloads to partners or CDNs and cannot rely on server-side tooling.'
        ],
        css: [
          'Shrink CSS or SCSS output by removing whitespace and redundant tokens using csso’s browser build.',
          'Great for inline style blocks in CMSs, email templates, or design systems where every byte counts.'
        ],
        js: [
          'Use the built-in Terser bundle to minify inline JavaScript, feature flags, or widget snippets without leaving the browser.',
          'Perfect when you are tweaking a small script inside a CMS or support reply and still want a compact production version.'
        ],
        json: [
          'Flatten configuration files, API payloads, or localization bundles into the smallest possible JSON without introducing errors.',
          'Helpful when you need to embed JSON in query parameters, data attributes, or migration files and want to save space.'
        ]
      },
      hash: {
        sha1: [
          'Generate SHA-1 digests for any text directly in your browser. Tulkit uses the Web Crypto API so hashes are computed locally and never leave your device.',
          'Use SHA-1 here only for compatibility with legacy systems that still expect it, such as old APIs or archival tools, while keeping the workflow quick and browser-based.'
        ],
        sha256: [
          'Generate SHA-256 hashes for snippets, configuration blocks, or small files directly in your browser. Tulkit relies on the Web Crypto API so digests match common CLI tools and libraries.',
          'Use the SHA-256 view when you want modern, widely supported fingerprints for downloads, fixtures, or cache keys without leaving the browser.'
        ],
        sha512: [
          'Compute SHA-512 hashes entirely in your browser for cases where you prefer longer, more robust digests for archival or security-adjacent workflows.',
          'This mode is useful when experimenting with signature schemes, long-term storage, or systems that standardize on SHA-512 while still benefiting from Tulkit’s in-browser convenience.'
        ]
      },
      decode: {
        default: [
          'Decode Base64, Base32, Base58, or hex back into readable text without leaving your browser. Paste any encoded value and Tulkit will show both the UTF-8 text and raw bytes.',
          'This decoder is useful when inspecting tokens, payloads, or binary blobs that you receive from APIs and need to turn back into something human-friendly for debugging or documentation.'
        ],
        base64: [
          'Paste Base64 or Base64URL strings and Tulkit will normalize padding, swap URL-safe characters, and show you the decoded text immediately.',
          'Ideal for debugging JWT payloads, email attachments, or Authorization headers that hide their meaning behind Base64.'
        ],
        base32: [
          'Quickly decode Base32 values that appear in provisioning URIs, backup codes, or DNS-friendly identifiers.',
          'Tulkit uppercases everything for you and reveals the UTF-8 text or bytes so you can confirm what a device or API really stored.'
        ],
        base58: [
          'Inspect Base58 strings that use the Bitcoin alphabet and avoid ambiguous characters. Tulkit converts them back into raw bytes and readable text in one click.',
          'Helpful when you want to validate blockchain addresses, short invite codes, or shareable tokens without reaching for a CLI.'
        ],
        hex: [
          'Turn long hex dumps back into words or binary data so you can see what was actually captured in a log, packet trace, or checksum.',
          'Useful when double-checking keys, binary payloads, or signature material that engineers typically pass around as hex.'
        ]
      },
      lorem: [
        'Generate reusable lorem ipsum placeholder text directly in your browser. Adjust the number of paragraphs and sentence length so your mockups and design drafts feel realistic without writing copy by hand.',
        'Tulkit keeps all lorem generation in your browser, making it a quick helper when building wireframes, UI components, or content layouts.'
      ]
    },
    notFoundHeading: 'Page not found',
    notFoundBody:
      'The link you followed does not match any Tulkit tools. You can jump back to the formatter, UUID generator, or epoch converter using the buttons above.',
    goToFormatterCta: 'Go to Web Formatter',
    footerNote: 'Prototype — Tulkit Web Tools',
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
    notFoundMetaDescription:
      'The page you were looking for on Tulkit could not be found. Browse the web formatter, UUID generator, or epoch converter tools instead.'
  },
  overviews: {
    formatter: {
      auto: {
        heading: 'Web Formatter — Tulkit overview',
        paragraphs: [
          'Some developers keep their code perfectly aligned, while others move fast and end up with scripts that are hard to scan. Tulkit’s web formatter is designed to quickly tidy those rough snippets so they are easier for teammates, reviewers, and your future self to read.',
          'The formatter looks at the snippet you paste or upload, figures out whether it is HTML, CSS, JavaScript, JSON, SQL, or PHP, then applies consistent indentation to each line. Once the structure is cleaned up, you can copy, download, or share the formatted version without touching a full IDE or build pipeline.',
          'All of this work happens directly in your browser. Tulkit does not upload your code to a server or store it remotely, which makes the tool suitable for private repositories, client work, and internal snippets that should never leave your machine.',
          'This kind of formatter is especially helpful when you open a file with no indentation, paste code copied from a blog post, or receive a snippet from someone who does not follow your team’s style guide. A few clicks are usually enough to turn it into something readable and ready for review.',
          'Using the tool is straightforward: drag a file into the editor or paste your code, let Tulkit detect the language, then click Format. Adjust the tab size if you want different spacing, and when you are happy with the result, use the Copy or Download actions before hitting Clear to start again.'
        ]
      },
      html: {
        heading: 'HTML Formatter overview',
        paragraphs: [
          'Overview content for the HTML formatter slug. Explain what kind of HTML snippets people usually format here and how it helps.',
          'Replace these placeholder paragraphs with your own copy; this text only appears on the /formatter/html slug.'
        ]
      },
      css: {
        heading: 'CSS Formatter overview',
        paragraphs: [
          'Overview content for the CSS formatter slug. Describe how Tulkit can clean up stylesheets, utility classes, or component styles.',
          'Update this copy to focus on the CSS, SCSS, or Tailwind workflows that matter most to your users.'
        ]
      },
      js: {
        heading: 'JavaScript Formatter overview',
        paragraphs: [
          'Overview content for the JavaScript formatter slug. Talk about formatting snippets, modules, or debug output pasted from logs.',
          'You can also mention how this tool fits into front-end or Node.js development in your own words.'
        ]
      },
      json: {
        heading: 'JSON Formatter overview',
        paragraphs: [
          'Overview content for the JSON formatter slug. Describe how teams can prettify API responses, configs, or event payloads here.',
          'Adjust this text to highlight validation, collaboration, or debugging benefits specific to your JSON use cases.'
        ]
      },
      sql: {
        heading: 'SQL Formatter overviews',
        paragraphs: [
          'Overview content for the SQL formatter slug. Explain how Tulkit helps make long queries readable and shareable.',
          'Customize this copy to mention the databases, ORMs, or reporting tools that are most relevant to your audience.'
        ]
      },
      php: {
        heading: 'PHP Formatter overview',
        paragraphs: [
          'Overview content for the PHP formatter slug. Describe how this helps with Laravel, WordPress, or other PHP projects.',
          'Update these placeholders to match the frameworks, CMSs, or libraries that you want to target for SEO.'
        ]
      },
      xml: {
        heading: 'XML Formatter overview',
        paragraphs: [
          'Overview content for the XML formatter slug. Explain how Tulkit helps clean up XML config files, sitemaps, or API payloads so they are easier to review.',
          'Update this copy to highlight the specific XML-based tools, platforms, or workflows that matter most to your users.'
        ]
      },
      yaml: {
        heading: 'YAML Formatter overview',
        paragraphs: [
          'Overview content for the YAML formatter slug. Describe how Tulkit helps tidy CI configs, infrastructure manifests, or other YAML-based configuration files.',
          'Adjust this text to focus on the deployment tools, CI platforms, or infrastructure stacks that are most relevant to your audience.'
        ]
      }
    },
    uuid: {
      v1: {
        heading: 'UUID v1 generator overview',
        paragraphs: [
          'Overview content for the UUID v1 generator slug. Explain when time-based UUIDs make sense in your stack.',
          'Replace this copy with your own examples, such as logs, background jobs, or batch imports.'
        ]
      },
      v4: {
        heading: 'UUID v4 generator overview',
        paragraphs: [
          'Overview content for the UUID v4 generator slug. Describe typical use cases for random identifiers in your applications.',
          'You can mention public URLs, database primary keys, or any scenarios where v4 is a good default.'
        ]
      },
      v7: {
        heading: 'UUID v7 generator overview',
        paragraphs: [
          'Overview content for the UUID v7 generator slug. Explain how time-ordered IDs help with write-heavy tables or analytics.',
          'Customize this text to focus on the databases or event pipelines where UUID v7 shines for your users.'
        ]
      }
    },
    epoch: {
      heading: 'Epoch Converter — Tulkit overview',
      paragraphs: [
        'Epoch time, sometimes called Unix time or POSIX time, counts how many seconds have passed since 1 January 1970 at 00:00:00 UTC. Because this number is the same no matter which country or time zone you are in, it is a convenient way for systems and APIs to talk about a specific instant in time.',
        'Tulkit’s epoch converter turns those raw timestamp numbers into readable dates and times, and back again. You can paste a value like 1764298543 to see when it happens in UTC, GMT-style long form, or your preferred time zone, then copy the formatted result for documentation, debugging notes, or support replies.',
        'When you go the other direction—starting from a date—you can experiment with different time zones and immediately see the matching Unix seconds and milliseconds. This makes it easier to align logs, schedule jobs, or compare records between services that may all be storing timestamps in slightly different formats.',
        'All calculations run entirely in your browser using the built-in JavaScript date APIs, so none of your event data or log excerpts are uploaded to a server while you are exploring timestamps.'
      ]
    },
    encode: {
      default: {
        heading: 'Encoder — Tulkit overview',
        paragraphs: [
          'Base64 originally appeared as a MIME content-transfer encoding: a way to represent arbitrary binary data using only readable ASCII characters. In practice, it works by slicing bytes into 6-bit chunks, then mapping each chunk to one of 64 symbols made up of letters, digits, and a couple of punctuation characters.',
          'Because Base64 output uses only safe characters, it is ideal for transporting data through systems that were designed for text rather than raw bytes. Email attachments, XML or JSON documents that need to embed binary blobs, and many HTTP APIs all rely on Base64 to keep data intact even when intermediate systems are not 8-bit clean.',
          'The "64" in Base64 refers to the size of the alphabet: A-Z, a-z, 0-9, plus two extra symbols that vary slightly between standards (such as + and / in RFC 4648). Tulkit’s encoder lets you move between UTF-8 text, hex, Base64, Base32, and Base58 so you can inspect what is actually being sent over the wire, debug payloads, or generate test values for other tools without leaving your browser.'
        ]
      },
      base64: {
        heading: 'Base64 encoder overview',
        paragraphs: [
          'Tulkit’s Base64 encoder turns UTF-8 text or raw bytes into the familiar alphabet of A-Z, a-z, 0-9, plus + and /. It also supports the URL-safe flavor so you can prepare strings for JWTs, cookies, or signed URLs.',
          'Use it when you need to normalize padding, strip whitespace, or double-check what will be sent through APIs that expect Base64 payloads for attachments, certificates, or HTTP headers.'
        ]
      },
      base32: {
        heading: 'Base32 encoder overview',
        paragraphs: [
          'Base32 represents data with a restricted alphabet that stays legible even in case-insensitive systems such as DNS labels or backup codes.',
          'Tulkit emits uppercase RFC 4648 output, making it easy to provision TOTP seeds, generate recovery codes, or embed identifiers that must survive OCR and transcription.'
        ]
      },
      base58: {
        heading: 'Base58 encoder overview',
        paragraphs: [
          'Base58 drops visually confusing characters so the encoded value is friendlier for humans while still compact. The Bitcoin alphabet is the de facto standard for wallet addresses and blockchain payloads.',
          'Generate those values directly in your browser to craft shareable invite codes, short IDs, or fixtures for blockchain integrations without worrying about desktop tooling.'
        ]
      },
      hex: {
        heading: 'Hex encoder overview',
        paragraphs: [
          'Hex encoding spells out every byte as two hexadecimal characters, which makes it perfect for logs, checksums, and protocols that like deterministic ASCII.',
          'Tulkit produces lowercase hex strings so you can copy keys, salts, or binary payloads into CLIs, environment files, or documentation with zero surprises.'
        ]
      }
    },
    minify: {
      heading: 'Minifier — Tulkit overview',
      paragraphs: [
        'Sometimes you just need to shrink a snippet before shipping it—maybe it is a CSS block going into a CMS, inline JavaScript for an email, or an HTML include that you hand off to another team. Tulkit’s minifier focuses on that workflow by letting you paste code, pick the matching language tab, and compress it instantly in your browser.',
        'HTML and XML minification keeps closing tags valid while trimming attributes and whitespace. CSS minification relies on csso to drop redundant characters without rewriting your selectors. JavaScript minification uses Terser’s browser build so you can squeeze inline scripts without touching Node.js tooling. JSON minification simply strips spaces while keeping your data intact.',
        'Because everything runs locally, you can confidently minify snippets that contain API keys, proprietary markup, or private customer data. Once you are done, copy or download the compressed result and drop it straight into your project.'
      ]
    },
    hash: {
      heading: 'Hash Generator — Tulkit overview',
      paragraphs: [
        'Hash functions like SHA-1, SHA-256, and SHA-512 turn arbitrary text into fixed-length fingerprints that are easy to compare but hard to reverse. Developers rely on these digests for checksums, cache keys, and test fixtures across many tools and languages.',
        'Tulkit’s hash generator focuses on that day-to-day workflow: paste any snippet, pick an algorithm, and compute a deterministic hex digest entirely in your browser. Because everything runs on top of the Web Crypto API, inputs never leave your device and the results match what you would see from common CLIs and libraries.',
        'Use it to verify file downloads, generate stable IDs for configuration blocks, or quickly inspect how a value will be represented in logs and database fields without leaving the browser.'
      ]
    },
    decode: {
      default: {
        heading: 'Decoder — Tulkit overview',
        paragraphs: [
          'When you receive Base64, Base32, Base58, or hex from an API or log file, the first step is often to turn it back into readable text. Tulkit’s decoder focuses on that workflow, letting you quickly inspect what an encoded value really contains.',
          'Paste an encoded string, pick the matching encoding, and Tulkit will decode it to UTF-8 text or raw bytes so you can verify payloads, troubleshoot integration issues, or share clean examples in documentation — all without uploading data to any server.'
        ]
      },
      base64: {
        heading: 'Base64 decoder overview',
        paragraphs: [
          'When you run into Base64 blobs, Tulkit shows what is inside right away. Paste the value and the decoder will handle both standard and URL-safe alphabets, fix padding, and reveal the original bytes as readable text.',
          'That is perfect for reversing Authorization headers, opaque API payloads, or JWT segments when you need to audit exactly what the sender included.'
        ]
      },
      base32: {
        heading: 'Base32 decoder overview',
        paragraphs: [
          'Base32 decoding is useful when troubleshooting time-based one-time password secrets, provisioning URIs, or vendor-specific recovery codes that rely on uppercase letters and digits.',
          'Tulkit flags invalid characters and shows the resulting text so you can verify what a device or API is storing before you roll it out to customers.'
        ]
      },
      base58: {
        heading: 'Base58 decoder overview',
        paragraphs: [
          'Wallet addresses, content identifiers, and other blockchain-style tokens often arrive as Base58. Tulkit converts them back into raw bytes so you can inspect version bytes, payloads, or checksums.',
          'It is an easy way to validate addresses pasted by users, unit-test integrations, or explain what a given Base58 string represents in documentation.'
        ]
      },
      hex: {
        heading: 'Hex decoder overview',
        paragraphs: [
          'Hex dumps tend to obscure meaning when you are looking at them in a console or support ticket. Tulkit turns those pairs back into text or binary data instantly.',
          'Use the decoder to inspect log fragments, verify keys, or confirm that the payload you captured really matches the bytes you expect.'
        ]
      }
    },
    lorem: {
      heading: 'Lorem Ipsum Generator — Tulkit overview',
      paragraphs: [
        'Lorem ipsum is a long‑lived dummy text used by printers, designers, and front‑end developers to stand in for real copy. It grew out of classical Latin writing, was adopted by typesetters in the 1500s, and later shipped with desktop publishing tools as convenient sample content.',
        'People rely on lorem ipsum because its letters and word lengths resemble natural English, so layouts look realistic without inviting readers to focus on the wording itself. That makes it easier to judge spacing, hierarchy, and visual balance instead of getting distracted by “content here, content here” placeholders.',
        'Although it can look random, the traditional lorem ipsum block is based on passages from Cicero’s “De Finibus Bonorum et Malorum”, trimmed and jumbled over time. Modern generators remix those Latin roots into chunks that feel familiar while avoiding embarrassing or out‑of‑place phrases.',
        'Tulkit’s lorem ipsum generator follows that spirit: it assembles sensible paragraphs from a pool of sentences, lets you pick how much text you need, and keeps a classic “Lorem ipsum dolor sit amet…” opening when you want it. Everything runs locally in your browser so you can use it freely in mockups, prototypes, and client work.'
      ]
    }
  }
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
    copySuccess: 'UUID berhasil disalin',
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
    copySuccess: 'Nilai hasil konversi berhasil disalin',
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
  lorem: {
    paragraphCountLabel: 'Berapa banyak paragraf?',
    classicPrefixLabel: 'Mulai dengan “Lorem ipsum dolor sit amet…”',
    lengthLabel: 'Panjang kalimat',
    lengthShort: 'Pendek',
    lengthMedium: 'Sedang',
    lengthLong: 'Panjang',
    generateLabel: 'Buat lorem ipsum',
    copyLabel: 'Salin',
    copySuccess: 'Teks lorem ipsum berhasil disalin',
    copyErrorPrefix: 'Gagal menyalin: ',
    referencesHeading: 'Sumber klasik Lorem Ipsum',
    standardHeading: 'Paragraf standar Lorem Ipsum yang dipakai sejak 1500‑an',
    standardBody:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    cicero1Heading: 'Bagian 1.10.32 dari “De Finibus Bonorum et Malorum” (Cicero, 45 SM)',
    cicero1Latin:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    cicero1TranslationHeading: 'Terjemahan Inggris 1914 oleh H. Rackham',
    cicero1Translation:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?',
    cicero2Heading: 'Bagian 1.10.33 dari “De Finibus Bonorum et Malorum” (Cicero, 45 SM)',
    cicero2Latin:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    cicero2TranslationHeading: 'Terjemahan Inggris 1914 oleh H. Rackham',
    cicero2Translation:
      'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.'
  },
  app: {
    logoAlt: 'Logo Tulkit Online',
    brandHeading: 'Peralatan Web — Tulkit',
    brandSubheading: 'Kumpulan alat web ringan untuk kebutuhan developer sehari-hari',
    brandNote: 'Semua pemformatan dan pembuatan berjalan di browser Anda saja; kode tidak pernah keluar dari perangkat.',
    navFormatter: 'Pemformat',
    navUuid: 'Generator UUID',
    navEpoch: 'Konverter Epoch',
    navEncode: 'Encoder',
    navMinify: 'Minifier',
    navDecode: 'Decoder',
    navLorem: 'Generator Lorem Ipsum',
    navHash: 'Generator Hash',
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
      notFound: 'Halaman tidak ditemukan — Tulkit'
    },
    seoBlurb: {
      formatter: {
        auto: [
          'Alternatif WebFormatter yang cepat untuk HTML, CSS, JavaScript, SQL, JSON, dan PHP. Tulkit membantu developer, penulis teknis, dan tim QA merapikan kode langsung di browser tanpa memasang alat tambahan. Tempel potongan dari editor atau seret berkas, lalu dapatkan hasil bersih yang siap untuk dokumentasi, pull request, atau sesi debugging.',
          'Pemformat ini memiliki highlight sintaks, pengaturan lebar tab, dan deteksi bahasa otomatis sehingga cocok mendampingi pekerjaan Anda baik saat memoles aset front-end maupun meninjau query database. Semua pemformatan tetap lokal di browser demi privasi maksimal.'
        ],
        html: [
          'Gunakan pemformat HTML Tulkit untuk merapikan landing page, template email, atau potongan CMS agar tag bertingkat tetap mudah dibaca saat ditempel kembali ke editor.',
          'Cocok untuk SVG inline atau komponen templat ketika Anda hanya perlu indentasi konsisten tanpa membuka IDE penuh.'
        ],
        css: [
          'Normalkan selector, kelas utilitas, dan gaya komponen sehingga jarak dan kurung kurawal rapi sebelum membagikan stylesheet.',
          'Tulkit mengikuti lebar tab pilihan Anda sehingga mudah membersihkan SCSS, blok Tailwind, atau hasil handoff desainer langsung di browser.'
        ],
        js: [
          'Rapikan potongan JavaScript atau TypeScript dari eksperimen, codepen, atau output log dalam hitungan detik.',
          'Pemformat ini menangani modul, fungsi async, dan kode penuh arrow sehingga Anda bisa fokus ke logika tanpa repot indentasi.'
        ],
        json: [
          'Cetak cantik payload JSON, konfigurasi, atau respons API sambil memastikan strukturnya tetap valid.',
          'Pas untuk men-debug payload webhook, mengedit konfigurasi layanan, atau berbagi contoh yang mudah dibaca ke tim.'
        ],
        sql: [
          'Susun ulang query SQL panjang agar klausa SELECT, JOIN, dan CTE gampang dipindai sebelum direview.',
          'Ideal saat mendokumentasikan query analitik atau memeriksa pernyataan hasil ORM tanpa membuka IDE database.'
        ],
        php: [
          'Rapikan potongan PHP untuk WordPress, Laravel, atau proyek legacy tanpa menyalakan stack lokal.',
          'Tulkit memuat pemformat PHP sesuai kebutuhan sehingga Anda bisa membersihkan template Blade, controller, atau helper langsung di browser.'
        ],
        xml: [
          'Format sitemap, feed, atau berkas konfigurasi XML agar atribut dan elemen bertingkat tetap sejajar.',
          'Berguna ketika meninjau respons API, indeks sitemap, atau deskriptor sistem yang jadi berantakan setelah banyak revisi.'
        ],
        yaml: [
          'Jaga manifest, konfigurasi CI, dan berkas infrastruktur berbasis YAML tetap aman diedit dengan indentasi konsisten.',
          'Tulkit memudahkan merapikan cuplikan dari dokumentasi atau chat sebelum dikomit kembali ke repo.'
        ]
      },
      uuid: {
        v1: [
          'Buat UUID v1 yang menyertakan stempel waktu dan petunjuk node sehingga ID cenderung mengikuti urutan pembuatan, semuanya langsung di browser Anda.',
          'Cocok untuk log, job latar belakang, atau proses impor yang membutuhkan pengelompokan kronologis tanpa menyiapkan layanan tambahan.'
        ],
        v4: [
          'Buat satu atau banyak UUID v4 sesuai RFC-4122 langsung di browser. Atur huruf dan format agar sesuai kebutuhan aplikasi Anda.',
          'UUID dibuat menggunakan Web Crypto API ketika tersedia, sehingga hasilnya berkualitas tinggi dan tidak pernah dikirim ke server.'
        ],
        v7: [
          'Hasilkan UUID v7 yang tetap berurutan waktu namun tetap memiliki entropi kuat sehingga aman dipakai untuk ID publik.',
          'Gunakan untuk pipeline analitik, basis data append-only, atau antrean yang diuntungkan dari ID monotonic tanpa membocorkan informasi perangkat.'
        ]
      },
      epoch: [
        'Konversi timestamp Unix ke tanggal yang mudah dibaca dan sebaliknya dalam hitungan detik. Tempel nilai dalam detik atau milidetik untuk melihat keluaran UTC, GMT, dan zona waktu lokal.',
        'Anda juga bisa memilih tanggal dan waktu, menyalin nilai Unix untuk API atau query database, serta mengganti zona waktu untuk melihat bagaimana momen yang sama muncul di berbagai wilayah.'
      ],
      encode: {
        default: [
          'Konversi antara teks, hex, dan Base64 langsung di browser Anda. Tempel teks UTF-8, nilai Base64, atau string hex lalu biarkan Tulkit mengubahnya ke format yang Anda perlukan.',
          'Encoder ini berguna ketika Anda bekerja dengan header HTTP, segmen JWT, secret konfigurasi, atau blob biner dan ingin memeriksa atau menormalkan encoding tanpa membuka CLI terpisah.'
        ],
        base64: [
          'Ubah teks UTF-8 ke Base64 standar atau aman-URL secara instan. Tulkit menormalkan padding dan menghapus spasi berlebih sehingga output siap ditempel ke header Authorization, lampiran MIME, atau klaim JWT tanpa edit tambahan.',
          'Gunakan saat Anda ingin memastikan secret, sertifikat, atau blob biner akan berjalan mulus di sistem yang hanya menerima karakter ASCII.'
        ],
        base32: [
          'Encode nilai dengan alfabet Base32 RFC 4648 yang sering dipakai untuk pengenal aman-DNS, kode pemulihan, atau seed TOTP.',
          'Tulkit menjaga jarak dan padding tetap konsisten sehingga hasilnya bisa langsung ditempel ke alur provisioning atau payload API.'
        ],
        base58: [
          'Buat string Base58 yang menghindari karakter membingungkan seperti 0/O atau I/l namun tetap padat informasi.',
          'Cocok untuk alamat bergaya blockchain, kode undangan, atau ID pendek yang harus dibacakan manusia tanpa salah.'
        ],
        hex: [
          'Ubah teks menjadi pasangan hex huruf kecil seperti yang biasa Anda lihat di banyak alat CLI.',
          'Berguna untuk memeriksa payload, menyiapkan fixture manual, atau membagikan nilai deterministik ke tim QA dan backend.'
        ]
      },
      minify: {
        auto: [
          'Padatkan HTML, XML, CSS, JavaScript, atau JSON langsung di browser Anda. Tempel kode yang ingin dikirim, klik Minify, dan Tulkit akan memangkas whitespace serta atribut berlebih tanpa mengunggah apa pun.',
          'Cocok ketika Anda perlu snippet siap produksi untuk embed, template email, atau konfigurasi kecil namun tidak mau repot menyiapkan pipeline build hanya demi mengecilkan perbaikan cepat.'
        ],
        html: [
          'Kecilkan template landing page, email, atau embed dengan menghapus whitespace, komentar, dan atribut berlebih sambil menjaga struktur HTML tetap sah.',
          'Pas ketika Anda menyerahkan snippet ringan ke tim marketing atau dokumentasi tanpa bantuan pipeline build.'
        ],
        xml: [
          'Minify sitemap, feed, atau berkas konfigurasi XML tanpa merusak huruf besar kecil atau tag penutup wajib.',
          'Bermanfaat saat ingin mengirim payload XML yang ringkas ke partner atau CDN tetapi tidak punya tooling server.'
        ],
        css: [
          'Padatkan CSS atau keluaran SCSS memakai csso agar selector tetap aman tetapi byte berkurang.',
          'Ideal untuk blok style inline di CMS, template email, atau komponen desain yang sensitif terhadap ukuran.'
        ],
        js: [
          'Gunakan bundle Terser bawaan untuk memadatkan JavaScript inline, feature flag, atau snippet widget tanpa meninggalkan browser.',
          'Sangat membantu ketika mengedit skrip kecil di CMS atau balasan dukungan namun tetap ingin versi produksi yang ringkas.'
        ],
        json: [
          'Ubah konfigurasi, payload API, atau bundle lokalisasi menjadi JSON satu baris tanpa mengubah isinya.',
          'Mudah ketika Anda perlu menaruh JSON di parameter query, atribut data, atau berkas migrasi supaya hemat ruang.'
        ]
      },
      hash: {
        sha1: [
          'Buat hash SHA-1 dari teks apa pun langsung di browser Anda ketika perlu kompatibilitas dengan sistem lama. Tulkit memanfaatkan Web Crypto API agar perhitungan digest berlangsung lokal dan tidak meninggalkan perangkat.',
          'Gunakan mode SHA-1 ini hanya ketika Anda berurusan dengan API atau alat lama yang masih mengharuskannya, sambil tetap menikmati alur kerja ringan di browser.'
        ],
        sha256: [
          'Buat hash SHA-256 untuk snippet, blok konfigurasi, atau berkas kecil langsung di browser Anda. Tulkit mengandalkan Web Crypto API sehingga digest selaras dengan hasil banyak CLI dan library populer.',
          'Mode SHA-256 cocok ketika Anda membutuhkan sidik jari modern yang luas dukungannya untuk unduhan, fixture, atau kunci cache tanpa harus membuka terminal.'
        ],
        sha512: [
          'Hitung hash SHA-512 sepenuhnya di browser untuk kasus yang membutuhkan digest lebih panjang, misalnya skenario arsip atau alur kerja yang bersinggungan dengan keamanan.',
          'Mode ini membantu saat bereksperimen dengan skema tanda tangan, penyimpanan jangka panjang, atau sistem yang menstandarkan SHA-512 sambil tetap memanfaatkan kenyamanan Tulkit di browser.'
        ]
      },
      decode: {
        default: [
          'Dekode Base64, Base32, Base58, atau hex kembali menjadi teks yang bisa dibaca tanpa meninggalkan browser Anda. Tempel nilai terenkode dan biarkan Tulkit menampilkan teks UTF-8 serta byte mentahnya.',
          'Decoder ini membantu saat Anda memeriksa token, payload, atau blob biner dari API dan perlu mengembalikannya ke bentuk yang mudah dibaca untuk debugging atau dokumentasi.'
        ],
        base64: [
          'Tempel string Base64 atau Base64URL dan Tulkit akan menormalkan padding, mengganti karakter aman-URL, lalu menampilkan teks hasil decode.',
          'Sempurna untuk men-debug payload JWT, lampiran email, atau header Authorization yang sering menyembunyikan data penting di balik Base64.'
        ],
        base32: [
          'Dekode cepat nilai Base32 yang muncul di URI provisioning, kode cadangan, atau pengenal ramah DNS.',
          'Tulkit mengubahnya ke huruf besar dan menampilkan teks UTF-8 atau byte mentah agar Anda tahu apa yang sebenarnya disimpan perangkat atau API.'
        ],
        base58: [
          'Periksa string Base58 beralfabet Bitcoin tanpa takut salah baca karakter mirip.',
          'Tulkit mengubahnya kembali ke byte mentah dan teks sehingga Anda bisa memvalidasi alamat blockchain, kode undangan, atau token ringkas tanpa CLI.'
        ],
        hex: [
          'Kembalikan dump hex panjang menjadi teks atau data biner sehingga Anda bisa melihat isi log, trace paket, atau checksum.',
          'Bermanfaat saat mengecek ulang kunci, payload biner, atau materi signature yang biasanya dibagikan sebagai hex.'
        ]
      },
      lorem: [
        'Buat teks placeholder lorem ipsum langsung di browser Anda. Atur jumlah paragraf dan panjang kalimat sehingga mockup dan rancangan UI terasa lebih realistis tanpa menulis teks manual.',
        'Tulkit menjalankan generator ini sepenuhnya di sisi klien, sehingga praktis untuk wireframe, komponen antarmuka, atau layout konten tanpa mengirim data ke server.'
      ]
    },
    notFoundHeading: 'Halaman tidak ditemukan',
    notFoundBody:
      'Tautan yang Anda ikuti tidak cocok dengan alat Tulkit mana pun. Gunakan tombol di atas untuk kembali ke pemformat, generator UUID, atau konverter epoch.',
    goToFormatterCta: 'Buka Pemformat Web',
    footerNote: 'Prototype — Tulkit Web Tools',
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
    notFoundMetaDescription:
      'Halaman Tulkit yang Anda cari tidak ditemukan. Jelajahi alat pemformat web, generator UUID, atau konverter epoch sebagai gantinya.'
  },
  overviews: {
    formatter: {
      auto: {
        heading: 'Ikhtisar Pemformat Web — Tulkit',
        paragraphs: [
          'Sebagian developer menjaga kode tetap rapi, sementara yang lain bergerak cepat dan meninggalkan skrip yang sulit dibaca. Pemformat web Tulkit dibuat untuk merapikan potongan kasar itu agar lebih mudah dipindai rekan kerja, reviewer, dan diri Anda di masa depan.',
          'Pemformat memeriksa potongan yang Anda tempel atau unggah, menentukan apakah itu HTML, CSS, JavaScript, JSON, SQL, atau PHP, lalu menerapkan indentasi yang konsisten pada setiap baris. Setelah struktur bersih, Anda bisa menyalin, mengunduh, atau membagikan hasil format tanpa perlu IDE lengkap atau pipeline build.',
          'Semua pekerjaan ini berlangsung langsung di browser Anda. Tulkit tidak mengunggah kode ke server atau menyimpannya secara jarak jauh, sehingga aman untuk repositori privat, pekerjaan klien, dan potongan internal yang tidak boleh keluar dari perangkat.',
          'Pemformat seperti ini sangat membantu ketika Anda membuka berkas tanpa indentasi, menempel kode dari blog, atau menerima potongan dari orang yang tidak mengikuti panduan gaya tim Anda. Beberapa klik biasanya cukup untuk membuatnya siap dibaca dan direview.',
          'Cara pakainya sederhana: seret berkas ke editor atau tempel kode Anda, biarkan Tulkit mendeteksi bahasa, lalu klik Format. Sesuaikan ukuran tab bila ingin jarak berbeda, dan setelah puas gunakan aksi Salin atau Unduh sebelum menekan Bersihkan untuk mulai lagi.'
        ]
      },
      html: {
        heading: 'Ikhtisar Pemformat HTML',
        paragraphs: [
          'Konten ikhtisar untuk slug pemformat HTML. Jelaskan jenis potongan HTML apa yang biasa dirapikan di sini dan manfaatnya.',
          'Ganti paragraf placeholder ini dengan salinan Anda sendiri; teks ini hanya muncul pada slug /formatter/html.'
        ]
      },
      css: {
        heading: 'Ikhtisar Pemformat CSS',
        paragraphs: [
          'Konten ikhtisar untuk slug pemformat CSS. Terangkan bagaimana Tulkit dapat merapikan stylesheet, kelas utilitas, atau gaya komponen.',
          'Perbarui salinan ini agar fokus pada alur kerja CSS, SCSS, atau Tailwind yang paling penting bagi pengguna Anda.'
        ]
      },
      js: {
        heading: 'Ikhtisar Pemformat JavaScript',
        paragraphs: [
          'Konten ikhtisar untuk slug pemformat JavaScript. Bahas tentang pemformatan potongan, modul, atau keluaran debug dari log.',
          'Anda juga bisa menyebutkan bagaimana alat ini cocok dengan pengembangan front-end atau Node.js.'
        ]
      },
      json: {
        heading: 'Ikhtisar Pemformat JSON',
        paragraphs: [
          'Konten ikhtisar untuk slug pemformat JSON. Jelaskan bagaimana tim dapat mempercantik respons API, konfigurasi, atau payload event di sini.',
          'Sesuaikan teks ini untuk menonjolkan manfaat validasi, kolaborasi, atau debugging khusus untuk kasus JSON Anda.'
        ]
      },
      sql: {
        heading: 'Ikhtisar Pemformat SQL',
        paragraphs: [
          'Konten ikhtisar untuk slug pemformat SQL. Jelaskan bagaimana Tulkit membantu membuat query panjang lebih mudah dibaca dan dibagikan.',
          'Sesuaikan salinan ini untuk menyebut database, ORM, atau alat pelaporan yang paling relevan bagi audiens Anda.'
        ]
      },
      php: {
        heading: 'Ikhtisar Pemformat PHP',
        paragraphs: [
          'Konten ikhtisar untuk slug pemformat PHP. Terangkan bagaimana alat ini membantu proyek Laravel, WordPress, atau PHP lainnya.',
          'Perbarui placeholder ini agar sesuai dengan framework, CMS, atau library yang ingin Anda bidik untuk SEO.'
        ]
      },
      xml: {
        heading: 'Ikhtisar Pemformat XML',
        paragraphs: [
          'Konten ikhtisar untuk slug pemformat XML. Jelaskan bagaimana Tulkit membantu merapikan berkas konfigurasi, sitemap, atau payload XML lainnya.',
          'Sesuaikan teks ini agar menonjolkan tools atau platform berbasis XML yang paling relevan bagi pengguna Anda.'
        ]
      },
      yaml: {
        heading: 'Ikhtisar Pemformat YAML',
        paragraphs: [
          'Konten ikhtisar untuk slug pemformat YAML. Jelaskan bagaimana Tulkit membantu merapikan konfigurasi CI, manifest infrastruktur, atau berkas YAML lain agar aman diedit.',
          'Perbarui teks ini untuk menonjolkan tool deployment, platform CI, atau stack infrastruktur yang paling relevan bagi audiens Anda.'
        ]
      }
    },
    uuid: {
      v1: {
        heading: 'Ikhtisar generator UUID v1',
        paragraphs: [
          'Konten ikhtisar untuk slug generator UUID v1. Jelaskan kapan UUID berbasis waktu masuk akal di stack Anda.',
          'Ganti salinan ini dengan contoh Anda sendiri, seperti log, job latar belakang, atau impor batch.'
        ]
      },
      v4: {
        heading: 'Ikhtisar generator UUID v4',
        paragraphs: [
          'Konten ikhtisar untuk slug generator UUID v4. Deskripsikan penggunaan umum pengenal acak di aplikasi Anda.',
          'Anda bisa menyebut URL publik, primary key database, atau skenario lain ketika v4 menjadi default yang baik.'
        ]
      },
      v7: {
        heading: 'Ikhtisar generator UUID v7',
        paragraphs: [
          'Konten ikhtisar untuk slug generator UUID v7. Jelaskan bagaimana ID berurutan waktu membantu tabel dengan banyak penulisan atau analitik.',
          'Sesuaikan teks ini untuk fokus pada database atau pipeline event tempat UUID v7 bersinar bagi pengguna Anda.'
        ]
      }
    },
    epoch: {
      heading: 'Ikhtisar Konverter Epoch — Tulkit',
      paragraphs: [
        'Epoch time, kadang disebut Unix time atau POSIX time, menghitung berapa detik yang berlalu sejak 1 Januari 1970 pukul 00:00:00 UTC. Karena angkanya sama di negara mana pun, ia menjadi cara praktis bagi sistem dan API untuk merujuk momen tertentu.',
        'Konverter epoch Tulkit mengubah angka timestamp mentah menjadi tanggal dan waktu yang mudah dibaca, dan sebaliknya. Anda bisa menempel nilai seperti 1764298543 untuk melihat kapan itu terjadi di UTC, format panjang ala GMT, atau zona waktu pilihan Anda, lalu menyalin hasilnya untuk dokumentasi, catatan debugging, atau balasan dukungan.',
        'Saat berangkat dari tanggal menuju angka, Anda dapat bereksperimen dengan berbagai zona waktu dan langsung melihat kecocokan detik dan milidetik Unix. Ini memudahkan menyelaraskan log, menjadwalkan job, atau membandingkan catatan antar layanan yang mungkin menyimpan timestamp dalam format berbeda.',
        'Semua perhitungan berjalan sepenuhnya di browser menggunakan API tanggal JavaScript bawaan, jadi tidak ada data event atau potongan log yang diunggah ke server saat Anda menelusuri timestamp.'
      ]
    },
    encode: {
      default: {
        heading: 'Ikhtisar Encoder — Tulkit',
        paragraphs: [
          'Istilah Base64 berasal dari skema content-transfer encoding di MIME: cara mengubah data biner menjadi deretan karakter ASCII yang aman dibaca. Secara sederhana, Base64 memecah byte menjadi potongan 6 bit lalu memetakan tiap potongan ke salah satu dari 64 simbol yang terdiri dari huruf, angka, dan beberapa tanda baca.',
          'Karena keluarannya hanya berisi karakter yang "aman", Base64 cocok untuk mengirimkan data melalui sistem yang awalnya didesain untuk teks, bukan byte mentah. Lampiran email, dokumen XML atau JSON yang perlu menyisipkan blob biner, hingga banyak API HTTP mengandalkan Base64 agar data tetap utuh meskipun melewati jalur yang tidak sepenuhnya 8-bit clean.',
          'Angka "64" pada Base64 merujuk pada ukuran alfabetnya: A-Z, a-z, 0-9, ditambah dua simbol yang sedikit berbeda antar standar (misalnya + dan / pada RFC 4648). Encoder Tulkit membantu Anda berpindah antara teks UTF-8, hex, Base64, Base32, dan Base58 sehingga lebih mudah melihat apa yang benar-benar dikirim di jaringan, men-debug payload, atau membuat nilai uji untuk alat lain langsung dari browser.'
        ]
      },
      base64: {
        heading: 'Ikhtisar encoder Base64',
        paragraphs: [
          'Encoder Base64 Tulkit mengubah teks UTF-8 atau byte mentah menjadi alfabet familiar A-Z, a-z, 0-9 plus + dan /. Varian aman-URL juga tersedia sehingga string siap dipakai untuk JWT, cookie, atau URL bertanda tangan.',
          'Gunakan ketika Anda perlu menormalkan padding, membersihkan whitespace, atau memastikan apa yang akan dikirim melalui API yang mengharuskan payload Base64 untuk lampiran, sertifikat, atau header HTTP.'
        ]
      },
      base32: {
        heading: 'Ikhtisar encoder Base32',
        paragraphs: [
          'Base32 merepresentasikan data dengan alfabet terbatas yang tetap mudah dibaca pada sistem yang tidak peka huruf besar kecil seperti label DNS atau kode pemulihan.',
          'Tulkit menghasilkan output huruf besar sesuai RFC 4648 sehingga Anda bisa menyiapkan seed TOTP, membuat kode pemulihan, atau menyematkan pengenal yang harus tahan terhadap OCR dan pengetikan ulang.'
        ]
      },
      base58: {
        heading: 'Ikhtisar encoder Base58',
        paragraphs: [
          'Base58 menghilangkan karakter mirip sehingga nilai terenkode lebih ramah manusia namun tetap ringkas. Alfabet Bitcoin menjadi standar de facto untuk alamat dompet dan payload blockchain.',
          'Buat nilai tersebut langsung di browser untuk kode undangan, ID pendek, atau fixture integrasi blockchain tanpa repot mengatur alat desktop.'
        ]
      },
      hex: {
        heading: 'Ikhtisar encoder Hex',
        paragraphs: [
          'Encoding hex menuliskan setiap byte sebagai dua karakter heksadesimal sehingga cocok untuk log, checksum, dan protokol yang membutuhkan ASCII deterministik.',
          'Tulkit menghasilkan string hex huruf kecil sehingga Anda bisa menyalin kunci, salt, atau payload biner ke CLI, file environment, atau dokumentasi tanpa kejutan.'
        ]
      }
    },
    minify: {
      heading: 'Ikhtisar Minifier — Tulkit',
      paragraphs: [
        'Kadang Anda hanya perlu mengecilkan snippet sebelum dikirim—entah itu blok CSS dalam CMS, JavaScript inline untuk email, atau include HTML yang dibagikan ke tim lain. Minifier Tulkit dibuat untuk alur tersebut dengan membiarkan Anda menempel kode, memilih tab bahasa, lalu memadatkannya seketika di browser.',
        'Minifikasi HTML dan XML menjaga struktur tag tetap valid sembari memangkas atribut serta whitespace. CSS menggunakan csso agar selector tetap aman tanpa karakter berlebih. JavaScript memanfaatkan build Terser untuk memadatkan script inline tanpa harus membuka tooling Node.js. JSON cukup diubah menjadi satu baris sehingga payload tetap valid tetapi lebih ringan.',
        'Karena semua proses berjalan lokal, Anda bisa meminify snippet yang mengandung data sensitif tanpa khawatir keluar dari perangkat. Setelah selesai, salin atau unduh hasilnya dan tempelkan langsung ke proyek Anda.'
      ]
    },
    hash: {
      heading: 'Ikhtisar Generator Hash — Tulkit',
      paragraphs: [
        'Fungsi hash seperti SHA-1, SHA-256, dan SHA-512 mengubah teks apa pun menjadi sidik jari berdimensi tetap yang mudah dibandingkan namun sulit dibalik. Developer mengandalkan digest ini untuk checksum, kunci cache, dan fixture pengujian di berbagai alat dan bahasa.',
        'Generator hash Tulkit dibuat untuk alur sehari-hari itu: tempel potongan teks, pilih algoritma, lalu hitung digest hex deterministik sepenuhnya di browser Anda. Karena berjalan di atas Web Crypto API, input tidak pernah keluar dari perangkat dan hasilnya selaras dengan CLI atau library umum.',
        'Gunakan alat ini untuk memverifikasi unduhan, membuat ID stabil untuk blok konfigurasi, atau sekadar melihat bagaimana sebuah nilai akan direpresentasikan di log dan kolom database tanpa meninggalkan browser.'
      ]
    },
    decode: {
      default: {
        heading: 'Ikhtisar Decoder — Tulkit',
        paragraphs: [
          'Ketika Anda menerima Base64, Base32, Base58, atau hex dari API atau berkas log, langkah pertama biasanya mengembalikannya ke teks yang bisa dibaca. Decoder Tulkit berfokus pada alur kerja itu sehingga Anda bisa dengan cepat melihat isi sebenarnya dari nilai yang terenkode.',
          'Tempel string terenkode, pilih encoding yang sesuai, dan Tulkit akan mendekodekannya ke teks UTF-8 atau byte mentah sehingga Anda dapat memeriksa payload, menelusuri masalah integrasi, atau menyalin contoh yang bersih ke dokumentasi — semuanya tanpa mengunggah data ke server mana pun.'
        ]
      },
      base64: {
        heading: 'Ikhtisar decoder Base64',
        paragraphs: [
          'Saat bertemu blob Base64, Tulkit langsung menunjukkan isinya. Tempel nilai tersebut dan decoder akan menangani alfabet standar serta aman-URL, memperbaiki padding, dan menampilkan byte asli sebagai teks yang bisa dibaca.',
          'Sangat pas untuk membongkar header Authorization, payload API yang samar, atau segmen JWT ketika Anda perlu mengaudit isi yang dikirim.'
        ]
      },
      base32: {
        heading: 'Ikhtisar decoder Base32',
        paragraphs: [
          'Dekode Base32 berguna saat menelusuri secret TOTP, URI provisioning, atau kode pemulihan vendor yang mengandalkan huruf besar dan angka.',
          'Tulkit memberi tahu jika ada karakter tidak valid dan memperlihatkan teks hasil decode sehingga Anda bisa memverifikasi apa yang disimpan perangkat atau API sebelum digunakan pelanggan.'
        ]
      },
      base58: {
        heading: 'Ikhtisar decoder Base58',
        paragraphs: [
          'Alamat dompet, content identifier, dan token bergaya blockchain sering datang sebagai Base58. Tulkit mengubahnya kembali menjadi byte mentah sehingga Anda bisa memeriksa byte versi, payload, atau checksum.',
          'Ini cara mudah memvalidasi alamat yang ditempel pengguna, menguji integrasi, atau menjelaskan arti string Base58 tertentu di dokumentasi.'
        ]
      },
      hex: {
        heading: 'Ikhtisar decoder Hex',
        paragraphs: [
          'Dump hex mudah membuat bingung ketika dilihat di konsol atau tiket dukungan. Tulkit mengembalikan pasangan tersebut menjadi teks atau data biner secara instan.',
          'Gunakan decoder untuk memeriksa potongan log, mengecek kunci, atau memastikan payload yang Anda tangkap benar-benar sesuai dengan byte yang diharapkan.'
        ]
      }
    },
    lorem: {
      heading: 'Ikhtisar Generator Lorem Ipsum — Tulkit',
      paragraphs: [
        'Lorem ipsum adalah teks dummy klasik yang sudah lama dipakai di dunia percetakan, desain, dan pengembangan antarmuka untuk menggantikan tulisan asli. Teks ini berakar dari karya Latin kuno, lalu diadopsi para typesetter sejak 1500‑an dan akhirnya dibundel ke dalam software desktop publishing sebagai contoh isi bawaan.',
        'Alasan lorem ipsum populer adalah karena pola huruf dan panjang katanya mirip bahasa nyata, sehingga layout tampak realistis tanpa membuat pembaca terpaku pada kalimatnya. Ini membantu desainer menilai spasi, hirarki, dan komposisi visual tanpa terdistraksi oleh placeholder generik seperti “content here, content here”.',
        'Meski terlihat acak, blok lorem ipsum standar sebenarnya disusun dari potongan teks Cicero di “De Finibus Bonorum et Malorum” yang dipotong dan diacak seiring waktu. Generator modern mengambil akar Latin tersebut dan merangkainya kembali agar tetap terasa familiar sekaligus aman dipakai di beragam konteks.',
        'Generator lorem ipsum Tulkit mengikuti semangat itu: ia menyusun paragraf yang wajar dari kumpulan kalimat, memungkinkan Anda memilih jumlah paragraf dan panjang kalimat, serta tetap menyediakan pembuka klasik “Lorem ipsum dolor sit amet…” bila diinginkan. Semua berjalan lokal di browser sehingga aman digunakan untuk mockup, prototipe, maupun proyek klien.'
      ]
    }
  }
}

export const translations: Record<LanguageCode,Translation> = { en, id }

export function getTranslations(language: LanguageCode = 'en'): Translation{
  return translations[language] || translations.en
}

export const languageNames: Record<LanguageCode,string> = {
  en: 'English',
  id: 'Bahasa Indonesia'
}
