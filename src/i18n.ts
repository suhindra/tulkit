import type { ActiveTab, FormatterLang, LanguageCode, UuidVersion } from './types'

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

type AppCopy = {
  logoAlt: string
  brandHeading: string
  brandSubheading: string
  brandNote: string
  navFormatter: string
  navUuid: string
  navEpoch: string
  languageSwitcherLabel: string
  seoTitles: {
    formatterDefault: string
    uuid: string
    epoch: string
    notFound: string
  }
  seoBlurb: {
    formatter: string[]
    uuid: string[]
    epoch: string[]
  }
  notFoundHeading: string
  notFoundBody: string
  goToFormatterCta: string
  footerNote: string
  epochMetaDescription: string
  notFoundMetaDescription: string
}

type OverviewCopy = {
  formatter: Record<ActiveTab,OverviewContent>
  uuid: Record<UuidVersion,OverviewContent>
  epoch: OverviewContent
}

type Translation = {
  headingByTab: Record<Exclude<ActiveTab,'auto'>,string>
  descriptionByTab: Record<ActiveTab,string>
  uuidDescriptionByVersion: Record<UuidVersion,string>
  formatter: FormatterCopy
  uuid: UuidCopy
  epoch: EpochCopy
  app: AppCopy
  overviews: OverviewCopy
}

const formatterLangLabelsBase: Record<FormatterLang,string> = {
  html: 'HTML',
  css: 'CSS',
  js: 'JavaScript',
  json: 'JSON',
  sql: 'SQL',
  php: 'PHP'
}

const en: Translation = {
  headingByTab: {
    html: 'HTML Formatter',
    css: 'CSS Formatter',
    js: 'JavaScript Formatter',
    json: 'JSON Formatter',
    sql: 'SQL Formatter',
    php: 'PHP Formatter'
  },
  descriptionByTab: {
    auto:
      'Format HTML, CSS, JavaScript, JSON, SQL, or PHP in one place. Tulkit autodetects your language and cleans up snippets directly in your browser.',
    html:
      'Use Tulkit to beautify HTML for landing pages, emails, and CMS snippets so nested tags stay readable in editors and code reviews.',
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
      }
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
  app: {
    logoAlt: 'Tulkit Online logo',
    brandHeading: 'Web Tools — Tulkit',
    brandSubheading: 'Quick tools for HTML / CSS / JS / JSON / SQL / UUIDs',
    brandNote: 'All formatting and generation happens in your browser only; your code never leaves your device.',
    navFormatter: 'Formatter',
    navUuid: 'UUID Generator',
    navEpoch: 'Epoch Converter',
    languageSwitcherLabel: 'Language',
    seoTitles: {
      formatterDefault: 'Web Formatter — Tulkit',
      uuid: 'UUID Generator — Tulkit',
      epoch: 'Epoch Converter — Tulkit',
      notFound: 'Page not found — Tulkit'
    },
    seoBlurb: {
      formatter: [
        'A fast WebFormatter alternative for HTML, CSS, JavaScript, SQL, JSON, and PHP. Tulkit lets developers, technical writers, and QA teams tidy up code directly in the browser without installing extra tools. Paste a snippet from your editor or drag a file, then get a clean result that is ready for documentation, pull requests, or debugging sessions.',
        'The formatter includes syntax highlighting, tab width controls, and automatic language detection, so it is a handy companion whether you are polishing front-end assets or reviewing database queries. All formatting stays local in your browser for maximum privacy.'
      ],
      uuid: [
        'Generate one or many RFC-4122 compliant UUID v4 values directly in your browser. Control casing and formatting to match how your application expects IDs.',
        'UUIDs are generated using the Web Crypto API when available, so identifiers are high-quality and never sent to a server.'
      ],
      epoch: [
        'Convert Unix epoch timestamps to readable dates and back again in seconds. Paste a value in seconds or milliseconds and see matching UTC, GMT, and time-zone aware local output.',
        'You can also pick a date and time, copy the resulting Unix values for use in APIs or database queries, and adjust the time zone to see how the same instant appears around the world.'
      ]
    },
    notFoundHeading: 'Page not found',
    notFoundBody:
      'The link you followed does not match any Tulkit tools. You can jump back to the formatter, UUID generator, or epoch converter using the buttons above.',
    goToFormatterCta: 'Go to Web Formatter',
    footerNote: 'Prototype — Tulkit Web Tools',
    epochMetaDescription:
      'Convert Unix epoch timestamps to readable dates and back again with Tulkit. Quickly switch between seconds, milliseconds, UTC, and local time directly in your browser.',
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
    }
  }
}

const id: Translation = {
  headingByTab: {
    html: 'Pemformat HTML',
    css: 'Pemformat CSS',
    js: 'Pemformat JavaScript',
    json: 'Pemformat JSON',
    sql: 'Pemformat SQL',
    php: 'Pemformat PHP'
  },
  descriptionByTab: {
    auto:
      'Format HTML, CSS, JavaScript, JSON, SQL, atau PHP di satu tempat. Tulkit mendeteksi bahasa secara otomatis dan merapikan potongan kode langsung di browser Anda.',
    html:
      'Gunakan Tulkit untuk merapikan HTML untuk landing page, email, dan potongan CMS sehingga tag bertingkat tetap mudah dibaca di editor dan saat code review.',
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
      }
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
  app: {
    logoAlt: 'Logo Tulkit Online',
    brandHeading: 'Peralatan Web — Tulkit',
    brandSubheading: 'Alat cepat untuk HTML / CSS / JS / JSON / SQL / UUID',
    brandNote: 'Semua pemformatan dan pembuatan berjalan di browser Anda saja; kode tidak pernah keluar dari perangkat.',
    navFormatter: 'Pemformat',
    navUuid: 'Generator UUID',
    navEpoch: 'Konverter Epoch',
    languageSwitcherLabel: 'Bahasa',
    seoTitles: {
      formatterDefault: 'Pemformat Web — Tulkit',
      uuid: 'Generator UUID — Tulkit',
      epoch: 'Konverter Epoch — Tulkit',
      notFound: 'Halaman tidak ditemukan — Tulkit'
    },
    seoBlurb: {
      formatter: [
        'Alternatif WebFormatter yang cepat untuk HTML, CSS, JavaScript, SQL, JSON, dan PHP. Tulkit membantu developer, penulis teknis, dan tim QA merapikan kode langsung di browser tanpa memasang alat tambahan. Tempel potongan dari editor atau seret berkas, lalu dapatkan hasil bersih yang siap untuk dokumentasi, pull request, atau sesi debugging.',
        'Pemformat ini memiliki highlight sintaks, pengaturan lebar tab, dan deteksi bahasa otomatis sehingga cocok mendampingi pekerjaan Anda baik saat memoles aset front-end maupun meninjau query database. Semua pemformatan tetap lokal di browser demi privasi maksimal.'
      ],
      uuid: [
        'Buat satu atau banyak UUID v4 sesuai RFC-4122 langsung di browser. Atur huruf dan format agar sesuai kebutuhan aplikasi Anda.',
        'UUID dibuat menggunakan Web Crypto API ketika tersedia, sehingga hasilnya berkualitas tinggi dan tidak pernah dikirim ke server.'
      ],
      epoch: [
        'Konversi timestamp Unix ke tanggal yang mudah dibaca dan sebaliknya dalam hitungan detik. Tempel nilai dalam detik atau milidetik untuk melihat keluaran UTC, GMT, dan zona waktu lokal.',
        'Anda juga bisa memilih tanggal dan waktu, menyalin nilai Unix untuk API atau query database, serta mengganti zona waktu untuk melihat bagaimana momen yang sama muncul di berbagai wilayah.'
      ]
    },
    notFoundHeading: 'Halaman tidak ditemukan',
    notFoundBody:
      'Tautan yang Anda ikuti tidak cocok dengan alat Tulkit mana pun. Gunakan tombol di atas untuk kembali ke pemformat, generator UUID, atau konverter epoch.',
    goToFormatterCta: 'Buka Pemformat Web',
    footerNote: 'Prototype — Tulkit Web Tools',
    epochMetaDescription:
      'Konversikan timestamp Unix ke tanggal yang mudah dibaca dan sebaliknya dengan Tulkit. Beralih cepat antara detik, milidetik, UTC, dan waktu lokal langsung di browser Anda.',
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
