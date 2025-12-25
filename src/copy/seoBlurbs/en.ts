import type { SeoBlurbCopy } from '../../i18n'

const seoBlurb: SeoBlurbCopy = {
      generator: [
        'Collection of four powerful generator tools to streamline your development workflow: UUID Generator for creating unique identifiers, Lorem Ipsum Generator for placeholder content, Hash Generator for checksums and fingerprints, and Case Converter for transforming naming conventions.',
        'All tools run entirely in your browser with no data uploads or server dependencies. Perfect for rapid prototyping, testing, design mockups, and everyday development tasks that require quick text generation and transformation.'
      ],
      uuidOverview: [
        [
          'Choose from three UUID versions: v1 for time-based IDs that embed creation order, v4 for high-entropy random identifiers, or v7 for sortable time-ordered values. Generate single or bulk UUIDs directly in your browser with control over formatting.',
          'All UUID generation uses the Web Crypto API for maximum security and quality. No server uploads, no external dependencies—just privacy-first UUID creation that runs entirely on your machine for databases, APIs, and microservice architectures.'
        ],
        [
          'UUID v1 is ideal for logs, background jobs, and import batches where creation-order sorting provides value. UUID v4 works well for public IDs, database keys, and anywhere you need pure randomness.',
          'UUID v7 combines timestamp ordering with strong randomness—perfect for analytics pipelines, append-only databases, and write-heavy tables where monotonic IDs improve performance without leaking hardware metadata.'
        ]
      ],
      converterOverview: [
        'Convert Unix epoch timestamps to human-readable dates and back again instantly. Paste a Unix value in seconds or milliseconds to see when it happens in UTC, GMT, and your local time zone.',
        'Tulkit\'s epoch converter runs entirely in your browser using the built-in JavaScript date APIs. No data uploads, no external dependencies—just fast, accurate conversion for debugging logs, syncing events, and understanding when things happened across time zones.'
      ],
      hashOverview: [
        'Choose between three cryptographic hash algorithms—SHA-1, SHA-256, and SHA-512—to generate checksums, fingerprints, and digests for your data. Each algorithm offers different security levels and output sizes to match your specific use case.',
        'All hashing happens in your browser using the Web Crypto API, so your data never leaves your machine. Ideal for verifying file integrity, creating cache keys, generating test fixtures, or debugging how values appear in logs and databases.'
      ],
      securityOverview: [
        'Open the security workspace to explore JWT tools without uploading any token or secret. Tulkit keeps decoding, verification, and signing fully local so private payloads stay private.',
        'Jump into the decoder to inspect headers and claims or the encoder to sign fresh HS256/384/512 tokens for tests and demos.'
      ],
      encodeOverview: [
        'Convert text to four different encoding formats: Base64 for MIME attachments and APIs, Base32 for case-insensitive systems and TOTP seeds, Base58 for Bitcoin addresses and short IDs, or hexadecimal for protocols and checksums.',
        'All encoding runs locally in your browser without uploading data to any server. Perfect for preparing payloads for APIs, creating secure URLs, embedding binary data, or transforming strings for storage and transmission.'
      ],
      decodeOverview: [
        'Reverse the encoding process instantly: convert Base64, Base32, Base58, or hexadecimal strings back to readable text. Inspect API responses, debug encoded payloads, verify blockchain transactions, or recover original data from any encoded format.',
        'Decoding happens entirely in your browser for maximum privacy. No server uploads, no external dependencies—just fast, reliable conversion that helps you understand and work with encoded data directly.'
      ],
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
      ],
      case: [
        'Convert variable and function names between camelCase, snake_case, PascalCase, kebab-case, and other conventions directly in your browser. Paste any identifier and see instant transformations across all formats without uploading anything to a server.',
        'Helpful when refactoring codebases, adapting API responses to match your naming style, preparing code examples, or integrating systems that follow different naming conventions.'
      ],
      url: [
        'Encode URL parameters and special characters for use in web addresses, API calls, and query strings. Paste regular text or a full URL to encode it safely for transmission, or paste an encoded URL to decode it back to readable form instantly.',
        'Tulkit handles encoding and decoding entirely in your browser using the native URL encoding standard. Perfect for debugging API requests, preparing parameters for web forms, embedding data in URLs, or inspecting query strings from logs and analytics.'
      ],
      pantoneHub: [
        'Work with Pantone colors from both directions: convert HEX values to their nearest Pantone swatches using ΔE distance, or browse the Pantone palette to copy HEX/RGB equivalents.',
        'Tulkit keeps both workflows local in your browser so designers, developers, and marketers can stay in sync without juggling desktop plugins.'
      ],
      pantone: [
        'Paste a HEX value and Tulkit computes the closest Pantone color using ΔE distance so you can match brand palettes, packaging, or print assets without opening a desktop tool.',
        'Preview both swatches, compare RGB values, and copy the Pantone code instantly—all processing stays local in your browser for quick handoffs to designers and print vendors.'
      ],
      pantoneCatalog: [
        'Browse Tulkit’s Pantone palette when you need the HEX or RGB value for a specific swatch. Filter by code or name, view a live preview, and copy the exact digital color for your guidelines.',
        'Use the catalog when translating print specs back into design tokens, prepping front-end themes from Pantone references, or sharing links to swatches with teammates.'
      ],
      jwt: {
        overview: [
          'Decode JWT headers and payloads locally without uploading tokens or secrets. Tulkit surfaces malformed segments, shows expiration at a glance, and normalizes Base64URL values for quick inspection.',
          'Verify HS256/384/512 signatures by supplying the shared secret, or craft fresh example tokens in-browser so debugging and demos stay private.'
        ],
        decode: [
          'Paste any JWT to inspect the header and payload instantly in your browser. Tulkit normalizes Base64URL, flags malformed segments, and shows expiration so you can audit tokens safely.',
          'Add your HS256/384/512 shared secret to verify the signature locally—useful for debugging auth flows or checking third-party tokens without exposing secrets.'
        ],
        encode: [
          'Edit header and payload JSON, pick HS256/384/512, and sign a JWT entirely in your browser. Tulkit keeps your shared secret local so fixtures and demo tokens stay private.',
          'Great for mocking authentication flows, generating short-lived tokens for tests, or sharing reproducible JWT examples with teammates.'
        ]
      },
      regex: [
        'Experiment with JavaScript regular expressions using live sample text, highlight previews, and capture-group tables. You can see how each flag—global, case-insensitive, multi-line, dotall, Unicode, or sticky—changes the matches in real time.',
        'All pattern testing runs locally in your browser so you can safely debug proprietary logs, payloads, or snippets while iterating on search-and-replace logic for editors, ETL jobs, and validation rules.'
      ]
    }

export default seoBlurb
