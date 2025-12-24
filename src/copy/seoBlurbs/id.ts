import type { SeoBlurbCopy } from '../../i18n'

const seoBlurb: SeoBlurbCopy = {
      generator: [
        'Koleksi empat alat generator yang ampuh untuk memperlancar alur kerja pengembangan Anda: UUID Generator untuk membuat pengenal unik, Lorem Ipsum Generator untuk konten placeholder, Hash Generator untuk checksum dan sidik jari, serta Case Converter untuk mengubah konvensi penamaan.',
        'Semua alat berjalan sepenuhnya di browser Anda tanpa unggah data atau bergantung server. Sempurna untuk prototipe cepat, pengujian, mockup desain, dan tugas pengembangan harian yang memerlukan pembuatan teks dan transformasi cepat.'
      ],
      uuidOverview: [
        [
          'Pilih dari tiga versi UUID: v1 untuk ID berbasis waktu yang menyertakan urutan pembuatan, v4 untuk pengenal acak dengan entropi tinggi, atau v7 untuk nilai berurutan waktu yang dapat diurutkan. Hasilkan UUID tunggal atau massal langsung di browser dengan kontrol pemformatan penuh.',
          'Semua pembuatan UUID menggunakan Web Crypto API untuk keamanan dan kualitas maksimal. Tidak ada unggah server, tidak ada dependensi eksternal—hanya pembuatan UUID yang mengutamakan privasi dan berjalan sepenuhnya di mesin Anda untuk arsitektur database, API, dan microservice.'
        ],
        [
          'UUID v1 ideal untuk log, job latar belakang, dan proses impor yang mendapat nilai dari penyortiran berdasarkan urutan pembuatan. UUID v4 bekerja dengan baik untuk ID publik, kunci database, dan di mana pun Anda memerlukan keacakan murni.',
          'UUID v7 menggabungkan pengurutan timestamp dengan keacakan kuat—sempurna untuk pipeline analitik, database append-only, dan tabel write-heavy di mana ID monotonic meningkatkan performa tanpa membocorkan metadata perangkat keras.'
        ]
      ],
      converterOverview: [
        'Konversi timestamp Unix ke tanggal yang mudah dibaca dan sebaliknya secara instan. Tempel nilai Unix dalam detik atau milidetik untuk melihat kapan itu terjadi di UTC, GMT, dan zona waktu lokal Anda.',
        'Konverter epoch Tulkit berjalan sepenuhnya di browser menggunakan API tanggal JavaScript bawaan. Tidak ada unggah data, tidak ada dependensi eksternal—hanya konversi cepat dan akurat untuk debugging log, menyinkronkan event, dan memahami kapan terjadi sesuatu di berbagai zona waktu.'
      ],
      hashOverview: [
        'Pilih di antara tiga algoritma hash kriptografi—SHA-1, SHA-256, dan SHA-512—untuk menghasilkan checksum, sidik jari, dan digest untuk data Anda. Setiap algoritma menawarkan tingkat keamanan dan ukuran output yang berbeda untuk cocok dengan kasus penggunaan spesifik.',
        'Semua hashing terjadi di browser Anda menggunakan Web Crypto API, jadi data Anda tidak pernah meninggalkan mesin. Ideal untuk memverifikasi integritas berkas, membuat cache key, menghasilkan test fixture, atau debug bagaimana nilai muncul di log dan database.'
      ],
      encodeOverview: [
        'Konversi teks ke empat format enkoding berbeda: Base64 untuk lampiran MIME dan API, Base32 untuk sistem tak sensitif huruf dan seed TOTP, Base58 untuk alamat Bitcoin dan ID pendek, atau heksadesimal untuk protokol dan checksum.',
        'Semua enkoding berjalan lokal di browser tanpa mengunggah data ke server apa pun. Sempurna untuk menyiapkan payload untuk API, membuat URL aman, menyematkan data biner, atau mengubah string untuk penyimpanan dan transmisi.'
      ],
      decodeOverview: [
        'Balikkan proses enkoding secara instan: konversi string Base64, Base32, Base58, atau heksadesimal kembali ke teks yang mudah dibaca. Periksa respons API, debug payload terenkode, verifikasi transaksi blockchain, atau pulihkan data asli dari format terenkode apa pun.',
        'Dekoding terjadi sepenuhnya di browser Anda untuk privasi maksimal. Tidak ada unggah server, tidak ada dependensi eksternal—hanya konversi cepat dan dapat diandalkan yang membantu Anda memahami dan bekerja dengan data terenkode secara langsung.'
      ],
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
          'Gunakan mode SHA-1 ini hanya ketika Anda berurusan dengan API atau alat lama yang masih mengharuskannya, sambil tetap menikmati alur kerja yang cepat dan berbasis browser.'
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
      ],
      case: [
        'Konversi nama variabel dan fungsi antar camelCase, snake_case, PascalCase, kebab-case, dan konvensi penamaan lain langsung di browser Anda. Tempel identifier apa pun dan lihat transformasi instan ke berbagai format tanpa mengirim ke server.',
        'Berguna saat refaktor codebase, menyesuaikan respons API agar cocok gaya penamaan Anda, menyiapkan contoh kode, atau mengintegrasikan sistem yang pakai konvensi penamaan berbeda.'
      ],
      url: [
        'Enkode parameter URL dan karakter khusus untuk dipakai di alamat web, panggilan API, dan string query. Tempel teks biasa atau URL lengkap untuk mengenkodinya dengan aman untuk transmisi, atau tempel URL yang sudah dienkode untuk mendekodinya kembali menjadi bentuk yang bisa dibaca secara instan.',
        'Tulkit menangani enkode dan dekode sepenuhnya di browser Anda menggunakan standar URL encoding asli. Sempurna untuk men-debug permintaan API, menyiapkan parameter untuk form web, menyematkan data di URL, atau memeriksa query string dari log dan analitik.'
      ],
      pantoneHub: [
        'Gunakan warna Pantone dari dua arah: konversi HEX ke swatch Pantone terdekat dengan jarak ΔE, atau telusuri palet Pantone untuk menyalin padanan HEX/RGB-nya.',
        'Semua berjalan lokal di browser sehingga desainer, developer, dan marketer bisa tetap sinkron tanpa harus memasang plugin desktop.'
      ],
      pantone: [
        'Tempel warna HEX dan Tulkit akan menghitung kecocokan Pantone terdekat memakai jarak ΔE sehingga Anda bisa mencocokkan palet brand, kemasan, atau aset cetak tanpa membuka aplikasi desktop.',
        'Pratinjau kedua swatch, bandingkan nilai RGB, dan salin kode Pantone secara instan—semuanya berjalan lokal di browser sehingga aman digunakan dengan data desain internal.'
      ],
      pantoneCatalog: [
        'Jelajahi palet Pantone Tulkit saat Anda butuh nilai HEX atau RGB dari kode Pantone tertentu. Filter berdasarkan nama atau kode, lihat swatch langsung, dan salin nilainya tanpa software tambahan.',
        'Gunakan katalog ini ketika menerjemahkan spesifikasi cetak ke aset digital, membangun tema front-end dari referensi Pantone, atau berbagi tautan swatch spesifik kepada rekan tim.'
      ],
      regex: [
        'Eksperimen dengan ekspresi reguler JavaScript menggunakan teks contoh hidup, highlight instan, dan tabel grup tangkap. Aktifkan atau matikan flag global, tidak sensitif huruf, multi-line, dotall, Unicode, maupun sticky untuk melihat bagaimana hasilnya berubah seketika.',
        'Seluruh pengujian pola berjalan lokal di browser sehingga aman digunakan pada log, payload, atau potongan kode internal saat Anda menyempurnakan logika pencarian, validasi input, atau alur find-and-replace.'
      ]
    }

export default seoBlurb
