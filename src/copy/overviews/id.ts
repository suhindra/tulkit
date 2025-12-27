import type { OverviewCopy } from '../../i18n'

const overviews: OverviewCopy = {
    home: {
      heading: 'Tulkit Web Tools',
      subheading: 'Kumpulan utilitas web cepat dan privat untuk developer, penulis, dan desainer',
      tools: [
        {
          title: 'Pemformat Web',
          description: 'Format HTML, CSS, JavaScript, JSON, SQL, YAML, XML, atau PHP di browser dengan deteksi bahasa otomatis.',
          path: '/formatter',
          icon: '✨',
          category: 'formatting'
        },
        {
          title: 'Minifier',
          description: 'Padatkan HTML, CSS, JavaScript, atau JSON langsung di browser tanpa perlu build tools.',
          path: '/minify',
          icon: '📦',
          category: 'optimization'
        },
        {
          title: 'Generator UUID',
          description: 'Hasilkan UUID v1, v4, atau v7 dalam jumlah banyak dengan opsi format dan huruf besar yang dapat disesuaikan.',
          path: '/generator/uuid',
          icon: '🎲',
          category: 'generation'
        },
        {
          title: 'Konverter Epoch',
          description: 'Konversi antara Unix timestamp dan tanggal yang mudah dibaca di zona waktu apa pun secara instan.',
          path: '/converter/epoch',
          icon: '⏰',
          category: 'conversion'
        },
        {
          title: 'Encoder',
          description: 'Enkode teks ke Base64, Base32, Base58, atau hex di browser Anda.',
          path: '/encode',
          icon: '🔐',
          category: 'encoding'
        },
        {
          title: 'Decoder',
          description: 'Dekode Base64, Base32, Base58, atau hex kembali menjadi teks yang mudah dibaca tanpa meninggalkan browser.',
          path: '/decode',
          icon: '🔓',
          category: 'encoding'
        },
        {
          title: 'Generator Hash',
          description: 'Buat hash SHA-1, SHA-256, atau SHA-512 untuk teks apa pun menggunakan Web Crypto API.',
          path: '/generator/hash',
          icon: '#️⃣',
          category: 'security'
        },
        {
          title: 'Decoder & Encoder JWT',
          description: 'Dekode JWT, verifikasi tanda tangan HS256/384/512 dengan secret bersama, dan buat token baru langsung di browser.',
          path: '/security/jwt',
          icon: '🛡️',
          category: 'security'
        },
        {
          title: 'Generator Lorem Ipsum',
          description: 'Buat paragraf dummy untuk mockup desain dengan jumlah paragraf dan panjang yang dapat disesuaikan.',
          path: '/generator/lorem',
          icon: '📝',
          category: 'generation'
        },
        {
          title: 'Case Converter',
          description: 'Konversi nama antara camelCase, snake_case, PascalCase, kebab-case, dan format lainnya.',
          path: '/converter/case',
          icon: '🔤',
          category: 'conversion'
        },
        {
          title: 'Encoder URL',
          description: 'Enkode dan dekode parameter URL serta karakter khusus langsung di browser.',
          path: '/converter/url',
          icon: '🔗',
          category: 'conversion'
        },
        {
          title: 'Konverter Pantone',
          description: 'Cari kecocokan Pantone terdekat untuk warna HEX dengan jarak ΔE dan pratinjau swatch.',
          path: '/pantone/hex-to-pantone',
          icon: '🎨',
          category: 'conversion'
        },
        {
          title: 'Pantone ke HEX',
          description: 'Jelajahi daftar Pantone dan salin kode HEX atau RGB langsung dari browser.',
          path: '/pantone/pantone-to-hex',
          icon: '🗂️',
          category: 'conversion'
        },
        {
          title: 'Regex Tester',
          description: 'Uji pola regex JavaScript lengkap dengan flag dan capture group langsung di browser.',
          path: '/converter/regex',
          icon: '🧪',
          category: 'conversion'
        }
      ]
    },
    jwtOverview: {
      heading: 'Alat Keamanan & JWT',
      subheading: 'Dekode, verifikasi, dan tanda tangani JSON Web Token secara lokal di browser Anda',
      tools: [
        {
          title: 'Decoder JWT',
          description: 'Tempel JWT untuk melihat header/payload, cek kedaluwarsa, dan verifikasi tanda tangan HS256/384/512 dengan secret bersama.',
          path: '/security/jwt/decode',
          icon: '🛡️',
          category: 'security'
        },
        {
          title: 'Encoder JWT',
          description: 'Sunting JSON header/payload, pilih HS256/384/512, dan tanda tangani token langsung di browser tanpa mengunggah secret.',
          path: '/security/jwt/encode',
          icon: '🛡️',
          category: 'security'
        }
      ]
    },
    generator: {
      heading: 'Tools Generator',
      subheading: 'Buat pengenal unik, konten placeholder, hash, dan konversi konvensi penamaan',
      tools: [
        {
          title: 'Generator UUID',
          description: 'Hasilkan UUID v1, v4, atau v7 dalam jumlah banyak dengan opsi format dan huruf besar yang dapat disesuaikan.',
          path: '/generator/uuid',
          icon: '🎲',
          category: 'generation'
        },
        {
          title: 'Generator Lorem Ipsum',
          description: 'Buat paragraf dummy untuk mockup desain dengan jumlah paragraf dan panjang yang dapat disesuaikan.',
          path: '/generator/lorem',
          icon: '📝',
          category: 'generation'
        },
        {
          title: 'Generator Hash',
          description: 'Buat hash SHA-1, SHA-256, atau SHA-512 untuk teks apa pun menggunakan Web Crypto API.',
          path: '/generator/hash',
          icon: '#️⃣',
          category: 'security'
        }
      ]
    },
    uuidOverview: {
      heading: 'Generator UUID',
      subheading: 'Hasilkan UUID v1 (berbasis waktu), v4 (acak), atau v7 (urut waktu) kapan saja',
      tools: [
        {
          title: 'UUID v1 — Berbasis waktu',
          description: 'Buat UUID berbasis waktu yang menyertakan stempel waktu dan petunjuk node agar mudah diurutkan berdasarkan waktu pembuatan.',
          path: '/generator/uuid/uuid-v1',
          icon: '🆔',
          category: 'generator'
        },
        {
          title: 'UUID v4 — Acak',
          description: 'Hasilkan UUID acak dengan 122 bit entropi kriptografis untuk pengenal publik atau primary key.',
          path: '/generator/uuid/uuid-v4',
          icon: '🆔',
          category: 'generator'
        },
        {
          title: 'UUID v7 — Urut waktu',
          description: 'Buat UUID yang bisa diurutkan karena diawali timestamp namun tetap acak—ramah untuk database dan log append-only.',
          path: '/generator/uuid/uuid-v7',
          icon: '🆔',
          category: 'generator'
        }
      ]
    },
    converterOverview: {
      heading: 'Tools Converter',
      subheading: 'Konversi antara konvensi penamaan, ubah timestamp Unix, dan sesuaikan zona waktu secara instan',
      tools: [
        {
          title: 'Konverter Epoch',
          description: 'Konversi timestamp Unix ke tanggal yang mudah dibaca dan sebaliknya. Periksa waktu epoch dalam detik, milidetik, dan berbagai zona waktu.',
          path: '/converter/epoch',
          icon: '⏱️',
          category: 'conversion'
        },
        {
          title: 'Case Converter',
          description: 'Konversi nama antara camelCase, snake_case, PascalCase, kebab-case, dan format lainnya.',
          path: '/converter/case',
          icon: '🔤',
          category: 'conversion'
        },
        {
          title: 'Encoder URL',
          description: 'Enkode dan dekode parameter URL serta karakter khusus untuk transmisi yang aman di alamat web.',
          path: '/converter/url',
          icon: '🔗',
          category: 'conversion'
        },
        {
          title: 'Konverter Pantone',
          description: 'Samakan warna HEX dengan swatch Pantone memakai jarak ΔE dan salin kodenya seketika.',
          path: '/pantone/hex-to-pantone',
          icon: '🎨',
          category: 'conversion'
        },
        {
          title: 'Pantone ke HEX',
          description: 'Buka daftar Pantone, filter berdasarkan nama/kode, dan salin HEX atau RGB-nya.',
          path: '/pantone/pantone-to-hex',
          icon: '🗂️',
          category: 'conversion'
        },
        {
          title: 'Regex Tester',
          description: 'Eksperimen dengan regex, flag, dan capture group menggunakan teks contoh langsung di browser.',
          path: '/converter/regex',
          icon: '🧪',
          category: 'conversion'
        }
      ]
    },
    hashOverview: {
      heading: 'Hash Generator',
      subheading: 'Buat hash SHA-1, SHA-256, atau SHA-512 untuk verifikasi data, checksum, dan keperluan keamanan',
      tools: [
        {
          title: 'SHA-1 Hash',
          description: 'Buat hash SHA-1 sepanjang 40 karakter. Cocok untuk sistem lama yang masih butuh kompatibilitas.',
          path: '/generator/hash/sha1',
          icon: '#️⃣',
          category: 'security'
        },
        {
          title: 'SHA-256 Hash',
          description: 'Buat hash SHA-256 sepanjang 64 karakter—standar industri untuk keamanan dan verifikasi data.',
          path: '/generator/hash/sha256',
          icon: '#️⃣',
          category: 'security'
        },
        {
          title: 'SHA-512 Hash',
          description: 'Buat hash SHA-512 sepanjang 128 karakter untuk tingkat keamanan tertinggi.',
          path: '/generator/hash/sha512',
          icon: '#️⃣',
          category: 'security'
        }
      ]
    },
    securityOverview: {
      heading: 'Alat Keamanan',
      subheading: 'Periksa dan tanda tangani JWT langsung di browser agar token dan secret tetap lokal.',
      tools: [
        {
          title: 'Alat JWT',
          description: 'Buka ruang kerja JWT untuk melihat decoder dan encoder dalam satu tempat.',
          path: '/security/jwt',
          icon: '🛡️',
          category: 'security'
        }
      ]
    },
    encodeOverview: {
      heading: 'Encoder',
      subheading: 'Ubah teks ke Base64, Base32, Base58, atau hex untuk pengiriman dan penyimpanan data',
      tools: [
        {
          title: 'Encoder Base64',
          description: 'Ubah teks ke Base64—format paling umum untuk mengirim data lewat email dan API.',
          path: '/encode/base64',
          icon: '🔐',
          category: 'encoding'
        },
        {
          title: 'Encoder Base32',
          description: 'Ubah teks ke Base32 untuk label DNS, kode TOTP, atau sistem yang tidak bedakan huruf besar/kecil.',
          path: '/encode/base32',
          icon: '🔐',
          category: 'encoding'
        },
        {
          title: 'Encoder Base58',
          description: 'Buat string Base58 yang mudah dibaca untuk alamat Bitcoin dan ID pendek.',
          path: '/encode/base58',
          icon: '🔐',
          category: 'encoding'
        },
        {
          title: 'Encoder Hex',
          description: 'Ubah teks ke heksadesimal untuk protokol, checksum, dan kebutuhan debugging.',
          path: '/encode/hex',
          icon: '🔐',
          category: 'encoding'
        }
      ]
    },
    decodeOverview: {
      heading: 'Decoder',
      subheading: 'Kembalikan Base64, Base32, Base58, atau hex ke teks yang bisa dibaca',
      tools: [
        {
          title: 'Decoder Base64',
          description: 'Kembalikan string Base64 ke teks asli—cocok untuk memeriksa data dari API atau email.',
          path: '/decode/base64',
          icon: '🔓',
          category: 'encoding'
        },
        {
          title: 'Decoder Base32',
          description: 'Kembalikan nilai Base32 ke teks biasa, berguna untuk cek kode TOTP atau DNS.',
          path: '/decode/base32',
          icon: '🔓',
          category: 'encoding'
        },
        {
          title: 'Decoder Base58',
          description: 'Kembalikan string Base58 ke teks untuk verifikasi alamat blockchain atau ID pendek.',
          path: '/decode/base58',
          icon: '🔓',
          category: 'encoding'
        },
        {
          title: 'Decoder Hex',
          description: 'Kembalikan nilai hex ke teks yang bisa dibaca dengan cepat dan akurat.',
          path: '/decode/hex',
          icon: '🔓',
          category: 'encoding'
        }
      ]
    },
    formatter: {
      auto: {
        heading: 'Sekilas Pemformat Web — Tulkit',
        paragraphs: [
          'Sebagian developer menjaga kode tetap rapi, sementara yang lain bergerak cepat dan meninggalkan skrip yang sulit dibaca. Pemformat web Tulkit dibuat untuk merapikan potongan kasar itu agar lebih mudah dipindai rekan kerja, reviewer, dan diri Anda di masa depan.',
          'Pemformat memeriksa potongan yang Anda tempel atau unggah, menentukan apakah itu HTML, CSS, JavaScript, JSON, SQL, atau PHP, lalu menerapkan indentasi yang konsisten pada setiap baris. Setelah struktur bersih, Anda bisa menyalin, mengunduh, atau membagikan hasil format tanpa perlu IDE lengkap atau pipeline build.',
          'Semua pekerjaan ini berlangsung langsung di browser Anda. Tulkit tidak mengunggah kode ke server atau menyimpannya secara jarak jauh, sehingga aman untuk repositori privat, pekerjaan klien, dan potongan internal yang tidak boleh keluar dari perangkat.',
          'Pemformat seperti ini sangat membantu ketika Anda membuka berkas tanpa indentasi, menempel kode dari blog, atau menerima potongan dari orang yang tidak mengikuti panduan gaya tim Anda. Beberapa klik biasanya cukup untuk membuatnya siap dibaca dan direview.',
          'Cara pakainya sederhana: seret berkas ke editor atau tempel kode Anda, biarkan Tulkit mendeteksi bahasa, lalu klik Format. Sesuaikan ukuran tab bila ingin jarak berbeda, dan setelah puas gunakan aksi Salin atau Unduh sebelum menekan Bersihkan untuk mulai lagi.'
        ]
      },
      html: {
        heading: 'Sekilas Pemformat HTML — Tulkit',
        paragraphs: [
          'Konten Sekilas untuk slug pemformat HTML. Jelaskan jenis potongan HTML apa yang biasa dirapikan di sini dan manfaatnya.',
          'Ganti paragraf placeholder ini dengan salinan Anda sendiri; teks ini hanya muncul pada slug /formatter/html.'
        ]
      },
      css: {
        heading: 'Sekilas Pemformat CSS — Tulkit',
        paragraphs: [
          'Konten Sekilas untuk slug pemformat CSS. Terangkan bagaimana Tulkit dapat merapikan stylesheet, kelas utilitas, atau gaya komponen.',
          'Perbarui salinan ini agar fokus pada alur kerja CSS, SCSS, atau Tailwind yang paling penting bagi pengguna Anda.'
        ]
      },
      js: {
        heading: 'Sekilas Pemformat JavaScript — Tulkit',
        paragraphs: [
          'Konten Sekilas untuk slug pemformat JavaScript. Bahas tentang pemformatan potongan, modul, atau keluaran debug dari log.',
          'Anda juga bisa menyebutkan bagaimana alat ini cocok dengan pengembangan front-end atau Node.js.'
        ]
      },
      json: {
        heading: 'Sekilas Pemformat JSON — Tulkit',
        paragraphs: [
          'Konten Sekilas untuk slug pemformat JSON. Jelaskan bagaimana tim dapat mempercantik respons API, konfigurasi, atau payload event di sini.',
          'Sesuaikan teks ini untuk menonjolkan manfaat validasi, kolaborasi, atau debugging khusus untuk kasus JSON Anda.'
        ]
      },
      sql: {
        heading: 'Sekilas Pemformat SQL — Tulkit',
        paragraphs: [
          'Konten Sekilas untuk slug pemformat SQL. Jelaskan bagaimana Tulkit membantu membuat query panjang lebih mudah dibaca dan dibagikan.',
          'Sesuaikan salinan ini untuk menyebut database, ORM, atau alat pelaporan yang paling relevan bagi audiens Anda.'
        ]
      },
      php: {
        heading: 'Sekilas Pemformat PHP — Tulkit',
        paragraphs: [
          'Konten Sekilas untuk slug pemformat PHP. Terangkan bagaimana alat ini membantu proyek Laravel, WordPress, atau PHP lainnya.',
          'Perbarui placeholder ini agar sesuai dengan framework, CMS, atau library yang ingin Anda bidik untuk SEO.'
        ]
      },
      xml: {
        heading: 'Sekilas Pemformat XML — Tulkit',
        paragraphs: [
          'Konten Sekilas untuk slug pemformat XML. Jelaskan bagaimana Tulkit membantu merapikan berkas konfigurasi, sitemap, atau payload XML lainnya.',
          'Sesuaikan teks ini agar menonjolkan tools atau platform berbasis XML yang paling relevan bagi pengguna Anda.'
        ]
      },
      yaml: {
        heading: 'Sekilas Pemformat YAML — Tulkit',
        paragraphs: [
          'Konten Sekilas untuk slug pemformat YAML. Jelaskan bagaimana Tulkit membantu merapikan konfigurasi CI, manifest infrastruktur, atau berkas YAML lain agar aman diedit.',
          'Perbarui teks ini untuk menonjolkan tool deployment, platform CI, atau stack infrastruktur yang paling relevan bagi audiens Anda.'
        ]
      }
    },
    uuid: {
      v1: {
        heading: 'Sekilas Generator UUID v1 — Tulkit',
        paragraphs: [
          'Konten Sekilas untuk slug generator UUID v1. Jelaskan kapan UUID berbasis waktu masuk akal di stack Anda.',
          'Ganti salinan ini dengan contoh Anda sendiri, seperti log, job latar belakang, atau impor batch.'
        ]
      },
      v4: {
        heading: 'Sekilas Generator UUID v4 — Tulkit',
        paragraphs: [
          'Konten Sekilas untuk slug generator UUID v4. Deskripsikan penggunaan umum pengenal acak di aplikasi Anda.',
          'Anda bisa menyebut URL publik, primary key database, atau skenario lain ketika v4 menjadi default yang baik.'
        ]
      },
      v7: {
        heading: 'Sekilas Generator UUID v7 — Tulkit',
        paragraphs: [
          'Konten Sekilas untuk slug generator UUID v7. Jelaskan bagaimana ID berurutan waktu membantu tabel dengan banyak penulisan atau analitik.',
          'Sesuaikan teks ini untuk fokus pada database atau pipeline event tempat UUID v7 bersinar bagi pengguna Anda.'
        ]
      }
    },
    epoch: {
      heading: 'Sekilas Konverter Epoch — Tulkit',
      paragraphs: [
        'Epoch time, kadang disebut Unix time atau POSIX time, menghitung berapa detik yang berlalu sejak 1 Januari 1970 pukul 00:00:00 UTC. Karena angkanya sama di negara mana pun, ia menjadi cara praktis bagi sistem dan API untuk merujuk momen tertentu.',
        'Konverter epoch Tulkit mengubah angka timestamp mentah menjadi tanggal dan waktu yang mudah dibaca, dan sebaliknya. Anda bisa menempel nilai seperti 1764298543 untuk melihat kapan itu terjadi di UTC, format panjang ala GMT, atau zona waktu pilihan Anda, lalu menyalin hasilnya untuk dokumentasi, catatan debugging, atau balasan dukungan.',
        'Saat berangkat dari tanggal menuju angka, Anda dapat bereksperimen dengan berbagai zona waktu dan langsung melihat kecocokan detik dan milidetik Unix. Ini memudahkan menyelaraskan log, menjadwalkan job, atau membandingkan catatan antar layanan yang mungkin menyimpan timestamp dalam format berbeda.',
        'Semua perhitungan berjalan sepenuhnya di browser menggunakan API tanggal JavaScript bawaan, jadi tidak ada data event atau potongan log yang diunggah ke server saat Anda menelusuri timestamp.'
      ]
    },
    encode: {
      default: {
        heading: 'Sekilas Encoder — Tulkit',
        paragraphs: [
          'Istilah Base64 berasal dari skema content-transfer encoding di MIME: cara mengubah data biner menjadi deretan karakter ASCII yang aman dibaca. Secara sederhana, Base64 memecah byte menjadi potongan 6 bit lalu memetakan tiap potongan ke salah satu dari 64 simbol yang terdiri dari huruf, angka, dan beberapa tanda baca.',
          'Karena keluarannya hanya berisi karakter yang "aman", Base64 cocok untuk mengirimkan data melalui sistem yang awalnya didesain untuk teks, bukan byte mentah. Lampiran email, dokumen XML atau JSON yang perlu menyisipkan blob biner, hingga banyak API HTTP mengandalkan Base64 agar data tetap utuh meskipun melewati jalur yang tidak sepenuhnya 8-bit clean.',
          'Angka "64" pada Base64 merujuk pada ukuran alfabetnya: A-Z, a-z, 0-9, ditambah dua simbol yang sedikit berbeda antar standar (misalnya + dan / pada RFC 4648). Encoder Tulkit membantu Anda berpindah antara teks UTF-8, hex, Base64, Base32, dan Base58 sehingga lebih mudah melihat apa yang benar-benar dikirim di jaringan, men-debug payload, atau membuat nilai uji untuk alat lain langsung dari browser.'
        ]
      },
      base64: {
        heading: 'Sekilas Encoder Base64 — Tulkit',
        paragraphs: [
          'Encoder Base64 Tulkit mengubah teks UTF-8 atau byte mentah menjadi alfabet familiar A-Z, a-z, 0-9 plus + dan /. Varian aman-URL juga tersedia sehingga string siap dipakai untuk JWT, cookie, atau URL bertanda tangan.',
          'Gunakan ketika Anda perlu menormalkan padding, membersihkan whitespace, atau memastikan apa yang akan dikirim melalui API yang mengharuskan payload Base64 untuk lampiran, sertifikat, atau header HTTP.'
        ]
      },
      base32: {
        heading: 'Sekilas Encoder Base32 — Tulkit',
        paragraphs: [
          'Base32 merepresentasikan data dengan alfabet terbatas yang tetap mudah dibaca pada sistem yang tidak peka huruf besar kecil seperti label DNS atau kode pemulihan.',
          'Tulkit menghasilkan output huruf besar sesuai RFC 4648 sehingga Anda bisa menyiapkan seed TOTP, membuat kode pemulihan, atau menyematkan pengenal yang harus tahan terhadap OCR dan pengetikan ulang.'
        ]
      },
      base58: {
        heading: 'Sekilas Encoder Base58 — Tulkit',
        paragraphs: [
          'Base58 menghilangkan karakter mirip sehingga nilai terenkode lebih ramah manusia namun tetap ringkas. Alfabet Bitcoin menjadi standar de facto untuk alamat dompet dan payload blockchain.',
          'Buat nilai tersebut langsung di browser untuk kode undangan, ID pendek, atau fixture integrasi blockchain tanpa repot mengatur alat desktop.'
        ]
      },
      hex: {
        heading: 'Sekilas Encoder Hex — Tulkit',
        paragraphs: [
          'Encoding hex menuliskan setiap byte sebagai dua karakter heksadesimal sehingga cocok untuk log, checksum, dan protokol yang membutuhkan ASCII deterministik.',
          'Tulkit menghasilkan string hex huruf kecil sehingga Anda bisa menyalin kunci, salt, atau payload biner ke CLI, file environment, atau dokumentasi tanpa kejutan.'
        ]
      }
    },
    minify: {
      heading: 'Sekilas Minifier — Tulkit',
      paragraphs: [
        'Kadang Anda hanya perlu mengecilkan snippet sebelum dikirim—entah itu blok CSS dalam CMS, JavaScript inline untuk email, atau include HTML yang dibagikan ke tim lain. Minifier Tulkit dibuat untuk alur tersebut dengan membiarkan Anda menempel kode, memilih tab bahasa, lalu memadatkannya seketika di browser.',
        'Minifikasi HTML dan XML menjaga struktur tag tetap valid sembari memangkas atribut serta whitespace. CSS menggunakan csso agar selector tetap aman tanpa karakter berlebih. JavaScript memanfaatkan build Terser untuk memadatkan script inline tanpa harus membuka tooling Node.js. JSON cukup diubah menjadi satu baris sehingga payload tetap valid tetapi lebih ringan.',
        'Karena semua proses berjalan lokal, Anda bisa meminify snippet yang mengandung data sensitif tanpa khawatir keluar dari perangkat. Setelah selesai, salin atau unduh hasilnya dan tempelkan langsung ke proyek Anda.'
      ]
    },
    hash: {
      heading: 'Sekilas Generator Hash — Tulkit',
      paragraphs: [
        'Fungsi hash seperti SHA-1, SHA-256, dan SHA-512 mengubah teks apa pun menjadi sidik jari berdimensi tetap yang mudah dibandingkan namun sulit dibalik. Developer mengandalkan digest ini untuk checksum, kunci cache, dan fixture pengujian di berbagai alat dan bahasa.',
        'Generator hash Tulkit dibuat untuk alur sehari-hari itu: tempel potongan teks, pilih algoritma, lalu hitung digest hex deterministik sepenuhnya di browser Anda. Karena berjalan di atas Web Crypto API, input tidak pernah keluar dari perangkat dan hasilnya selaras dengan CLI atau library umum.',
        'Gunakan alat ini untuk memverifikasi unduhan, membuat ID stabil untuk blok konfigurasi, atau sekadar melihat bagaimana sebuah nilai akan direpresentasikan di log dan kolom database tanpa meninggalkan browser.'
      ]
    },
    decode: {
      default: {
        heading: 'Sekilas Decoder — Tulkit',
        paragraphs: [
          'Ketika Anda menerima Base64, Base32, Base58, atau hex dari API atau berkas log, langkah pertama biasanya mengembalikannya ke teks yang bisa dibaca. Decoder Tulkit berfokus pada alur kerja itu sehingga Anda bisa dengan cepat melihat isi sebenarnya dari nilai yang terenkode.',
          'Tempel string terenkode, pilih encoding yang sesuai, dan Tulkit akan mendekodekannya ke teks UTF-8 atau byte mentah sehingga Anda dapat memeriksa payload, menelusuri masalah integrasi, atau menyalin contoh yang bersih ke dokumentasi — semuanya tanpa mengunggah data ke server mana pun.'
        ]
      },
      base64: {
        heading: 'Sekilas Decoder Base64 — Tulkit',
        paragraphs: [
          'Saat bertemu blob Base64, Tulkit langsung menunjukkan isinya. Tempel nilai tersebut dan decoder akan menangani alfabet standar serta aman-URL, memperbaiki padding, dan menampilkan byte asli sebagai teks yang bisa dibaca.',
          'Sangat pas untuk membongkar header Authorization, payload API yang samar, atau segmen JWT ketika Anda perlu mengaudit isi yang dikirim.'
        ]
      },
      base32: {
        heading: 'Sekilas Decoder Base32 — Tulkit',
        paragraphs: [
          'Dekode Base32 berguna saat menelusuri secret TOTP, URI provisioning, atau kode pemulihan vendor yang mengandalkan huruf besar dan angka.',
          'Tulkit memberi tahu jika ada karakter tidak valid dan memperlihatkan teks hasil decode sehingga Anda bisa memverifikasi apa yang disimpan perangkat atau API sebelum digunakan pelanggan.'
        ]
      },
      base58: {
        heading: 'Sekilas Decoder Base58 — Tulkit',
        paragraphs: [
          'Alamat dompet, content identifier, dan token bergaya blockchain sering datang sebagai Base58. Tulkit mengubahnya kembali menjadi byte mentah sehingga Anda bisa memeriksa byte versi, payload, atau checksum.',
          'Ini cara mudah memvalidasi alamat yang ditempel pengguna, menguji integrasi, atau menjelaskan arti string Base58 tertentu di dokumentasi.'
        ]
      },
      hex: {
        heading: 'Sekilas Decoder Hex — Tulkit',
        paragraphs: [
          'Dump hex mudah membuat bingung ketika dilihat di konsol atau tiket dukungan. Tulkit mengembalikan pasangan tersebut menjadi teks atau data biner secara instan.',
          'Gunakan decoder untuk memeriksa potongan log, mengecek kunci, atau memastikan payload yang Anda tangkap benar-benar sesuai dengan byte yang diharapkan.'
        ]
      }
    },
    lorem: {
      heading: 'Sekilas Generator Lorem Ipsum — Tulkit',
      paragraphs: [
        'Lorem ipsum adalah teks dummy klasik yang sudah lama dipakai di dunia percetakan, desain, dan pengembangan antarmuka untuk menggantikan tulisan asli. Teks ini berakar dari karya Latin kuno, lalu diadopsi para typesetter sejak 1500‑an dan akhirnya dibundel ke dalam software desktop publishing sebagai contoh isi bawaan.',
        'Alasan lorem ipsum populer adalah karena pola huruf dan panjang katanya mirip bahasa nyata, sehingga layout tampak realistis tanpa membuat pembaca terpaku pada kalimatnya. Ini membantu desainer menilai spasi, hirarki, dan komposisi visual tanpa terdistraksi oleh placeholder generik seperti “content here, content here”.',
        'Meski terlihat acak, blok lorem ipsum standar sebenarnya disusun dari potongan teks Cicero di “De Finibus Bonorum et Malorum” yang dipotong dan diacak seiring waktu. Generator modern mengambil akar Latin tersebut dan merangkainya kembali agar tetap terasa familiar sekaligus aman dipakai di beragam konteks.',
        'Generator lorem ipsum Tulkit mengikuti semangat itu: ia menyusun paragraf yang wajar dari kumpulan kalimat, memungkinkan Anda memilih jumlah paragraf dan panjang kalimat, serta tetap menyediakan pembuka klasik “Lorem ipsum dolor sit amet…” bila diinginkan. Semua berjalan lokal di browser sehingga aman digunakan untuk mockup, prototipe, maupun proyek klien.'
      ]
    },
    case: {
      heading: 'Sekilas Case Converter — Tulkit',
      paragraphs: [
        'Nama variabel, nama fungsi, dan identifier mengikuti konvensi penamaan yang berbeda tergantung bahasa pemrograman, framework, atau panduan gaya tim. camelCase umum dalam JavaScript dan Java, snake_case adalah standar Python dan SQL, sementara PascalCase muncul di nama kelas di banyak bahasa.',
        'Saat refaktor kode, menggabungkan sistem yang pakai konvensi berbeda, atau menyiapkan contoh dokumentasi, kebutuhan konversi antar kasus jadi mendesak. Alih-alih menulis ulang setiap identifier secara manual, Case Converter Tulkit memungkinkan Anda paste teks dan langsung melihatnya transformasi ke camelCase, snake_case, PascalCase, kebab-case, dan banyak lagi.',
        'Alat ini menangani input multi-kata secara cerdas, menghormati delimiter dan batasan yang sudah ada, serta menghasilkan output bersih siap dipaste ulang ke editor Anda. Semua transformasi terjadi lokal di browser, sehingga aman mengkonversi identifier dari repo pribadi, file konfigurasi, atau sistem internal tanpa mengupload apa pun ke server.',
        'Gunakan saat refaktor nama variabel di seluruh codebase, menyesuaikan respons API agar cocok dengan gaya penamaan Anda, menyiapkan contoh kode untuk dokumentasi, atau sekadar bereksperimen melihat bagaimana identifier baru akan terlihat di berbagai konvensi.'
      ]
    },
    jwt: {
      heading: 'Sekilas Decoder & Encoder JWT — Tulkit',
      paragraphs: [
        'Setiap segmen JSON Web Token adalah string Base64URL. Tulkit mendekode header dan payload secara lokal, menandai token yang salah format, serta menampilkan waktu kedaluwarsa tanpa mengirimkan secret ke mana pun.',
        'Masukkan secret HS256/HS384/HS512 untuk memverifikasi tanda tangan, atau edit JSON lalu tanda tangani token baru di browser agar fixture uji dan debugging tetap privat.'
      ]
    },
    regex: {
      heading: 'Sekilas Regex Tester — Tulkit',
      paragraphs: [
        'Ekspresi reguler memudahkan mencari dan memodifikasi teks, tetapi menyusun pola yang tepat biasanya butuh percobaan berkali-kali. Regex Tester Tulkit mempermudah proses tersebut dengan highlight instan saat Anda menempelkan teks contoh dan menyesuaikan pola.',
        'Anda bisa menyalakan atau mematikan flag global, sensitif huruf, multi-line, dotall, Unicode, hingga sticky untuk melihat dampaknya, lalu memeriksa setiap capture group bernomor maupun bernama di tabel yang rapi. Semuanya terjadi lokal di browser sehingga aman dipakai untuk kode atau log internal.'
      ]
    },
    url: {
      heading: 'Sekilas Encoder URL — Tulkit',
      paragraphs: [
        'URL hanya dapat berisi karakter tak tercadang (huruf, angka, dan tanda "-", "_", ".", "~") di sebagian besar bagiannya. Karakter lain—termasuk spasi, titik koma, dan simbol khusus—harus dikodekan menjadi representasi persen (disebut "URL encoded" atau "percent-encoded") sebelum dapat digunakan dalam URL. Misalnya, spasi menjadi %20, "?" menjadi %3F, dan "&" menjadi %26.',
        'Banyak karakter membawa makna khusus dalam URL: "&" memisahkan parameter, "?" memulai string query, "#" menandai fragment. Ketika karakter tersebut muncul sebagai data yang seharusnya dikodekan, bukan delimitator, maka harus diproduksi dalam bentuk persen-encoded agar parser URL membacanya dengan benar dan tidak salah tafsir struktur URL.',
        'Encoder URL Tulkit memungkinkan Anda mengkonversi teks biasa ke bentuk URL-encoded dengan cepat, dan sebaliknya mendekodekan URL yang sudah dikodekan kembali ke teks yang dapat dibaca—tanpa perlu mengunggah data apa pun ke server eksternal. Semua pengolahan terjadi secara lokal di browser Anda.',
        'Gunakan untuk mengkodekan parameter dalam query string, mendekodekan URL dari log atau database, membangun URL secara terprogram, atau menyiapkan contoh dokumentasi API. Encoder ini mendukung seluruh rentang karakter UTF-8 dan sesuai dengan standar RFC 3986 untuk pengkodean URL.'
      ]
    },
    pantone: {
      heading: 'Sekilas Konverter Pantone — Tulkit',
      paragraphs: [
        'Mencari padanan Pantone untuk warna digital biasanya membutuhkan plugin atau software khusus. Tulkit membandingkan warna HEX Anda dengan palet Pantone terkurasi memakai jarak ΔE di ruang warna LAB sehingga Anda tahu swatch mana yang paling mendekati dan seberapa besar perbedaannya.',
        'Hasilnya berguna saat menyiapkan spesifikasi cetak, menyelaraskan token desain dengan tinta Pantone, atau menjawab pertanyaan tim marketing tanpa meninggalkan browser. Salin kode Pantone atau hex-nya langsung dan kirimkan ke desainer maupun vendor dengan percaya diri.'
      ]
    },
    pantoneCatalog: {
      heading: 'Sekilas Pantone ke HEX — Tulkit',
      paragraphs: [
        'Jika Anda sudah memiliki kode Pantone dan tinggal membutuhkan nilai digitalnya, katalog Pantone ke HEX Tulkit menghadirkan seluruh palet di satu tempat. Filter berdasarkan nama atau kode, lihat swatch langsung, lalu salin nilai HEX atau RGB tanpa membuka software desain.',
        'Setiap entri menampilkan kode Pantone resmi beserta HEX dan RGB, sehingga tim brand, percetakan, dan marketing bisa menjaga konsistensi antara aset cetak dan digital. Semua berjalan lokal di browser sehingga aman dibagikan saat review atau saat mencocokkan warna dengan cepat.'
      ]
    }
  }

export default overviews
