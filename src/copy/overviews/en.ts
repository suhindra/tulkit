import type { OverviewCopy } from '../../i18n'

const overviews: OverviewCopy = {
    home: {
      heading: 'Tulkit Web Tools',
      subheading: 'A collection of fast, privacy-first web utilities for developers, writers, and designers',
      tools: [
        {
          title: 'Web Formatter',
          description: 'Format HTML, CSS, JavaScript, JSON, SQL, YAML, XML, or PHP in your browser with automatic language detection.',
          path: '/formatter',
          icon: '✨',
          category: 'formatting'
        },
        {
          title: 'Minifier',
          description: 'Compress HTML, CSS, JavaScript, or JSON snippets directly in your browser without build tools.',
          path: '/minify',
          icon: '📦',
          category: 'optimization'
        },
        {
          title: 'UUID Generator',
          description: 'Generate v1, v4, or v7 UUIDs in bulk with customizable formatting and casing options.',
          path: '/generator/uuid',
          icon: '🎲',
          category: 'generation'
        },
        {
          title: 'Epoch Converter',
          description: 'Convert between Unix timestamps and readable dates in any timezone instantly.',
          path: '/converter/epoch',
          icon: '⏰',
          category: 'conversion'
        },
        {
          title: 'Encoder',
          description: 'Encode text to Base64, Base32, Base58, or hex in your browser.',
          path: '/encode',
          icon: '🔐',
          category: 'encoding'
        },
        {
          title: 'Decoder',
          description: 'Decode Base64, Base32, Base58, or hex back into readable text without leaving your browser.',
          path: '/decode',
          icon: '🔓',
          category: 'encoding'
        },
        {
          title: 'Hash Generator',
          description: 'Generate SHA-1, SHA-256, or SHA-512 hashes for any text using the Web Crypto API.',
          path: '/generator/hash',
          icon: '#️⃣',
          category: 'security'
        },
        {
          title: 'JWT Decoder',
          description: 'Decode JWTs and verify HS256/384/512 signatures locally with your shared secret.',
          path: '/security/jwt/decode',
          icon: '🛡️',
          category: 'security'
        },
        {
          title: 'JWT Encoder',
          description: 'Edit header/payload JSON and sign new JWTs (HS256/384/512) entirely in your browser.',
          path: '/security/jwt/encode',
          icon: '🛡️',
          category: 'security'
        },
        {
          title: 'Lorem Ipsum Generator',
          description: 'Create placeholder paragraphs for design mockups with customizable paragraph count and length.',
          path: '/generator/lorem',
          icon: '📝',
          category: 'generation'
        },
        {
          title: 'Case Converter',
          description: 'Convert names between camelCase, snake_case, PascalCase, kebab-case, and more formats.',
          path: '/converter/case',
          icon: '🔤',
          category: 'conversion'
        },
        {
          title: 'URL Encoder',
          description: 'Encode and decode URL parameters, handling special characters and percent-encoding.',
          path: '/converter/url',
          icon: '🔗',
          category: 'conversion'
        },
        {
          title: 'Pantone Converter',
          description: 'Find the closest Pantone color for any HEX value using ΔE distance and copy-ready codes.',
          path: '/pantone/hex-to-pantone',
          icon: '🎨',
          category: 'conversion'
        },
        {
          title: 'Pantone to HEX',
          description: 'Browse Pantone swatches and copy their HEX or RGB values directly from your browser.',
          path: '/pantone/pantone-to-hex',
          icon: '🗂️',
          category: 'conversion'
        },
        {
          title: 'Regex Tester',
          description: 'Test JavaScript regular expressions, flags, and capture groups entirely in your browser.',
          path: '/converter/regex',
          icon: '🧪',
          category: 'conversion'
        }
      ]
    },
    generator: {
      heading: 'Generator Tools',
      subheading: 'Create unique identifiers, placeholder content, hashes, and convert naming conventions',
      tools: [
        {
          title: 'UUID Generator',
          description: 'Generate v1, v4, or v7 UUIDs in bulk with customizable formatting and casing options.',
          path: '/generator/uuid',
          icon: '🎲',
          category: 'generation'
        },
        {
          title: 'Lorem Ipsum Generator',
          description: 'Create placeholder paragraphs for design mockups with customizable paragraph count and length.',
          path: '/generator/lorem',
          icon: '📝',
          category: 'generation'
        },
        {
          title: 'Hash Generator',
          description: 'Generate SHA-1, SHA-256, or SHA-512 hashes for any text using the Web Crypto API.',
          path: '/generator/hash',
          icon: '#️⃣',
          category: 'security'
        }
      ]
    },
    uuidOverview: {
      heading: 'UUID Generator',
      subheading: 'Generate UUID v1 (time-based), v4 (random), or v7 (ordered by time) identifiers',
      tools: [
        {
          title: 'UUID v1 — Time-based',
          description: 'Generate time-based UUIDs that embed a timestamp and node hint for creation-order sorting.',
          path: '/generator/uuid/uuid-v1',
          icon: '🆔',
          category: 'generator'
        },
        {
          title: 'UUID v4 — Random',
          description: 'Create high-entropy random UUIDs with 122 bits of cryptographic randomness.',
          path: '/generator/uuid/uuid-v4',
          icon: '🆔',
          category: 'generator'
        },
        {
          title: 'UUID v7 — Ordered by Time',
          description: 'Generate sortable UUIDs combining timestamp prefix with random bits for databases.',
          path: '/generator/uuid/uuid-v7',
          icon: '🆔',
          category: 'generator'
        }
      ]
    },
    converterOverview: {
      heading: 'Converter Tools',
      subheading: 'Convert between naming conventions, transform Unix timestamps, and adjust time zones instantly',
      tools: [
        {
          title: 'Epoch Converter',
          description: 'Convert Unix timestamps to readable dates and back again. Inspect epoch times in seconds, milliseconds, and multiple time zones.',
          path: '/converter/epoch',
          icon: '⏱️',
          category: 'conversion'
        },
        {
          title: 'Case Converter',
          description: 'Convert names between camelCase, snake_case, PascalCase, kebab-case, and more formats.',
          path: '/converter/case',
          icon: '🔤',
          category: 'conversion'
        },
        {
          title: 'URL Encoder',
          description: 'Encode and decode URL parameters and special characters for safe transmission in web addresses.',
          path: '/converter/url',
          icon: '🔗',
          category: 'conversion'
        },
        {
          title: 'Pantone Converter',
          description: 'Match HEX values to Pantone colors using ΔE distance with copy-ready codes.',
          path: '/pantone/hex-to-pantone',
          icon: '🎨',
          category: 'conversion'
        },
        {
          title: 'Pantone to HEX',
          description: 'Open a Pantone palette, filter by name or code, and grab HEX/RGB equivalents instantly.',
          path: '/pantone/pantone-to-hex',
          icon: '🗂️',
          category: 'conversion'
        },
        {
          title: 'Regex Tester',
          description: 'Quickly experiment with regex patterns, flags, and capture groups using sample text, all in your browser.',
          path: '/converter/regex',
          icon: '🧪',
          category: 'conversion'
        }
      ]
    },
    hashOverview: {
      heading: 'Hash Generator',
      subheading: 'Generate SHA-1, SHA-256, or SHA-512 hashes for checksums, fingerprints, and cryptographic purposes',
      tools: [
        {
          title: 'SHA-1 Hash',
          description: 'Generate 40-character SHA-1 hashes for any text input. Use for legacy systems and compatibility.',
          path: '/generator/hash/sha1',
          icon: '#️⃣',
          category: 'security'
        },
        {
          title: 'SHA-256 Hash',
          description: 'Create 64-character SHA-256 hashes, the industry standard for security and checksums.',
          path: '/generator/hash/sha256',
          icon: '#️⃣',
          category: 'security'
        },
        {
          title: 'SHA-512 Hash',
          description: 'Generate 128-character SHA-512 hashes for maximum security and collision resistance.',
          path: '/generator/hash/sha512',
          icon: '#️⃣',
          category: 'security'
        }
      ]
    },
    securityOverview: {
      heading: 'Security Tools',
      subheading: 'Inspect and sign JWTs locally so secrets and tokens stay in your browser.',
      tools: [
        {
          title: 'JWT Tools',
          description: 'Open the JWT workspace to browse decoding and signing utilities in one place.',
          path: '/security/jwt',
          icon: '🛡️',
          category: 'security'
        }
      ]
    },
    jwtOverview: {
      heading: 'JWT Tools',
      subheading: 'Decode, verify, and sign JSON Web Tokens locally in your browser',
      tools: [
        {
          title: 'JWT Decoder',
          description: 'Paste a JWT to decode header/payload and verify HS256/384/512 signatures with a shared secret.',
          path: '/security/jwt/decode',
          icon: '🛡️',
          category: 'security'
        },
        {
          title: 'JWT Encoder',
          description: 'Edit header and payload JSON, choose HS256/384/512, and sign a new JWT without uploading secrets.',
          path: '/security/jwt/encode',
          icon: '🛡️',
          category: 'security'
        }
      ]
    },
    encodeOverview: {
      heading: 'Encoder',
      subheading: 'Convert text to Base64, Base32, Base58, or hexadecimal for transport and storage',
      tools: [
        {
          title: 'Base64 Encoder',
          description: 'Encode text to Base64, the most common encoding for data transmission and MIME attachments.',
          path: '/encode/base64',
          icon: '🔐',
          category: 'encoding'
        },
        {
          title: 'Base32 Encoder',
          description: 'Encode to Base32 for case-insensitive systems, DNS labels, and TOTP seeds.',
          path: '/encode/base32',
          icon: '🔐',
          category: 'encoding'
        },
        {
          title: 'Base58 Encoder',
          description: 'Create human-friendly Base58 encoded strings for Bitcoin addresses and short IDs.',
          path: '/encode/base58',
          icon: '🔐',
          category: 'encoding'
        },
        {
          title: 'Hex Encoder',
          description: 'Convert text to hexadecimal for protocols, checksums, and deterministic ASCII output.',
          path: '/encode/hex',
          icon: '🔐',
          category: 'encoding'
        }
      ]
    },
    decodeOverview: {
      heading: 'Decoder',
      subheading: 'Decode Base64, Base32, Base58, or hexadecimal back into readable text',
      tools: [
        {
          title: 'Base64 Decoder',
          description: 'Decode Base64 strings to recover original text, perfect for inspecting encoded data.',
          path: '/decode/base64',
          icon: '🔓',
          category: 'encoding'
        },
        {
          title: 'Base32 Decoder',
          description: 'Decode Base32 encoded values back to plain text, useful for TOTP and DNS entries.',
          path: '/decode/base32',
          icon: '🔓',
          category: 'encoding'
        },
        {
          title: 'Base58 Decoder',
          description: 'Convert Base58 strings back to text for blockchain and short ID verification.',
          path: '/decode/base58',
          icon: '🔓',
          category: 'encoding'
        },
        {
          title: 'Hex Decoder',
          description: 'Translate hexadecimal values back to readable text quickly and accurately.',
          path: '/decode/hex',
          icon: '🔓',
          category: 'encoding'
        }
      ]
    },
    formatter: {
      auto: {
        heading: 'Web Formatter — About',
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
      heading: 'Epoch Converter — About',
      paragraphs: [
        'Epoch time, sometimes called Unix time or POSIX time, counts how many seconds have passed since 1 January 1970 at 00:00:00 UTC. Because this number is the same no matter which country or time zone you are in, it is a convenient way for systems and APIs to talk about a specific instant in time.',
        'Tulkit’s epoch converter turns those raw timestamp numbers into readable dates and times, and back again. You can paste a value like 1764298543 to see when it happens in UTC, GMT-style long form, or your preferred time zone, then copy the formatted result for documentation, debugging notes, or support replies.',
        'When you go the other direction—starting from a date—you can experiment with different time zones and immediately see the matching Unix seconds and milliseconds. This makes it easier to align logs, schedule jobs, or compare records between services that may all be storing timestamps in slightly different formats.',
        'All calculations run entirely in your browser using the built-in JavaScript date APIs, so none of your event data or log excerpts are uploaded to a server while you are exploring timestamps.'
      ]
    },
    encode: {
      default: {
        heading: 'Encoder — About',
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
      heading: 'Minifier — About',
      paragraphs: [
        'Sometimes you just need to shrink a snippet before shipping it—maybe it is a CSS block going into a CMS, inline JavaScript for an email, or an HTML include that you hand off to another team. Tulkit’s minifier focuses on that workflow by letting you paste code, pick the matching language tab, and compress it instantly in your browser.',
        'HTML and XML minification keeps closing tags valid while trimming attributes and whitespace. CSS minification relies on csso to drop redundant characters without rewriting your selectors. JavaScript minification uses Terser’s browser build so you can squeeze inline scripts without touching Node.js tooling. JSON minification simply strips spaces while keeping your data intact.',
        'Because everything runs locally, you can confidently minify snippets that contain API keys, proprietary markup, or private customer data. Once you are done, copy or download the compressed result and drop it straight into your project.'
      ]
    },
    hash: {
      heading: 'Hash Generator — About',
      paragraphs: [
        'Hash functions like SHA-1, SHA-256, and SHA-512 turn arbitrary text into fixed-length fingerprints that are easy to compare but hard to reverse. Developers rely on these digests for checksums, cache keys, and test fixtures across many tools and languages.',
        'Tulkit’s hash generator focuses on that day-to-day workflow: paste any snippet, pick an algorithm, and compute a deterministic hex digest entirely in your browser. Because everything runs on top of the Web Crypto API, inputs never leave your device and the results match what you would see from common CLIs and libraries.',
        'Use it to verify file downloads, generate stable IDs for configuration blocks, or quickly inspect how a value will be represented in logs and database fields without leaving the browser.'
      ]
    },
    decode: {
      default: {
        heading: 'Decoder — About',
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
      heading: 'Lorem Ipsum Generator — About',
      paragraphs: [
        'Lorem ipsum is a long‑lived dummy text used by printers, designers, and front‑end developers to stand in for real copy. It grew out of classical Latin writing, was adopted by typesetters in the 1500s, and later shipped with desktop publishing tools as convenient sample content.',
        'People rely on lorem ipsum because its letters and word lengths resemble natural English, so layouts look realistic without inviting readers to focus on the wording itself. That makes it easier to judge spacing, hierarchy, and visual balance instead of getting distracted by “content here, content here” placeholders.',
        'Although it can look random, the traditional lorem ipsum block is based on passages from Cicero’s “De Finibus Bonorum et Malorum”, trimmed and jumbled over time. Modern generators remix those Latin roots into chunks that feel familiar while avoiding embarrassing or out‑of‑place phrases.',
        'Tulkit’s lorem ipsum generator follows that spirit: it assembles sensible paragraphs from a pool of sentences, lets you pick how much text you need, and keeps a classic “Lorem ipsum dolor sit amet…” opening when you want it. Everything runs locally in your browser so you can use it freely in mockups, prototypes, and client work.'
      ]
    },
    case: {
      heading: 'Case Converter — About',
      paragraphs: [
        'Variable names, function names, and identifiers follow different naming conventions depending on the language, framework, or team style guide. camelCase is common in JavaScript and Java, snake_case is standard in Python and SQL, while PascalCase appears in class names across many languages.',
        'When you refactor code, integrate systems that use different conventions, or prepare examples for documentation, converting between these cases quickly becomes essential. Rather than manually rewriting each identifier, Tulkit\'s case converter lets you paste text and instantly see it transformed into camelCase, snake_case, PascalCase, kebab-case, and more.',
        'The tool handles multi-word inputs intelligently, respects existing delimiters and boundaries, and produces clean output ready to paste back into your editor. All transformations happen locally in your browser, so you can safely convert identifiers from private repositories, configuration files, or internal systems without uploading anything to a server.',
        'Use it when refactoring variable names across a codebase, adapting API responses to match your naming style, preparing code examples for documentation, or simply experimenting with how a new identifier would look in different conventions.'
      ]
    },
    jwt: {
      decode: {
        heading: 'JWT Decoder — About',
        paragraphs: [
          'JWT segments are Base64URL strings. Tulkit decodes header and payload locally, highlights malformed tokens, surfaces expiration timestamps, and lets you verify HS256/384/512 signatures with your shared secret—all without leaving the browser.',
          'Use it to inspect Authorization headers, debug login flows, or audit third-party tokens safely without copying secrets into external tools.'
        ]
      },
      encode: {
        heading: 'JWT Encoder — About',
        paragraphs: [
          'Craft test tokens quickly by editing JSON for the header and payload, then signing with HS256/384/512 using your own secret. Tulkit keeps all signing local so fixtures, demos, and debugging tokens stay private.',
          'Great for mocking auth flows, generating short-lived tokens, or sharing reproducible examples with teammates without exposing secrets to a server.'
        ]
      }
    },
    regex: {
      heading: 'Regex Tester — About',
      paragraphs: [
        'Regular expressions are powerful search patterns, but crafting the right one usually takes iteration. Tulkit’s Regex Tester lets you paste sample text, tweak your pattern, and immediately see highlights for every match without touching a terminal or IDE.',
        'Toggle the global, case-insensitive, multi-line, dotall, Unicode, or sticky flags to understand how they affect the result, and inspect each capture group—numbered or named—in a structured table. Everything runs locally in your browser so you can safely test proprietary snippets, logs, or payloads.'
      ]
    },
    url: {
      heading: 'URL Encoder — About',
      paragraphs: [
        'URLs can only contain unreserved characters (alphanumeric, hyphen, underscore, period, and tilde) and reserved characters in specific contexts. When you need to include spaces, special characters, or international text in URLs or query parameters, they must be percent-encoded (URL encoded) to ensure safe transmission and correct interpretation by servers and applications.',
        'Common characters like spaces, ampersands, question marks, and hashes have special meaning in URLs. For example, spaces become %20, ampersands separate parameters with &, and question marks introduce query strings. When these characters appear in user-provided data—like search terms, form values, or message content—they must be encoded to prevent syntax conflicts and misinterpretation.',
        'Tulkit\'s URL encoder lets you quickly convert plain text to percent-encoded format and decode encoded URLs back to readable text. Whether you\'re building dynamic URLs for API calls, preparing form submissions, debugging encoded query strings from logs, or embedding special characters in hyperlinks, the tool handles encoding and decoding without uploading data to any server.',
        'The encoder supports the full range of UTF-8 characters, respects RFC 3986 standards, and provides instant feedback. Use it when constructing URLs programmatically, inspecting encoded parameters from browser consoles, troubleshooting 404 errors from encoding mismatches, or preparing safe URLs that contain user-generated content or international text.'
      ]
    },
    pantone: {
      heading: 'Pantone Converter — About',
      paragraphs: [
        'Matching HEX colors to Pantone swatches normally requires separate desktop software. Tulkit compares your HEX color to a curated Pantone palette using ΔE distance (LAB color space) so you can see the nearest swatch and the exact difference between the two.',
        'It is perfect for preparing print-ready specs, aligning design tokens with ink libraries, or answering “what’s the Pantone equivalent?” without leaving the browser. Copy the Pantone code or HEX instantly and hand it to designers, marketers, or vendors with confidence.'
      ]
    },
    pantoneCatalog: {
      heading: 'Pantone to HEX — About',
      paragraphs: [
        'When you already have a Pantone code and simply need the digital HEX or RGB equivalent, Tulkit’s Pantone to HEX lookup keeps the entire swatch library within reach. Browse the palette by name or code, view a live swatch, and copy the HEX or RGB value without opening design suites.',
        'Each entry includes the official Pantone code, HEX, and RGB representation so brand, packaging, and marketing teams can keep print and digital assets aligned. Everything runs in your browser, so you can check colors and share links to specific swatches quickly during reviews.'
      ]
    }
  }

export default overviews
