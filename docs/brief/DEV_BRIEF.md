# MASQUERADE CIPHER — Dev Brief

Frontend/UI/UX sudah selesai dan bisa dilihat langsung di `masquerade-cipher-preview.html` (single-file preview, semua gambar sudah ter-embed). Dokumen ini adalah panduan untuk tim dev melanjutkan ke backend dan production build.

---

## 0. BACA INI DULU — Apa Sebenarnya Project Ini

**Penting untuk dev pahami dari awal: Masquerade Cipher BUKAN produk baru dari nol.**

Ini adalah **fitur DEEP yang sudah pernah kamu (dev) bangun untuk DeepTrench**, dipakai ulang 1:1 dari sisi backend/data source, lalu dibungkus dengan:
1. UI/UX baru bertema terminal hacking
2. Output text yang di-reframe pakai bahasa lebih dramatis/ofensif
3. Satu layer tambahan (Cipher Catalog) yang menampilkan nama teknik keamanan siber sebagai konteks di samping hasil scan

**Tidak ada backend baru yang perlu dibangun dari nol.** Task utama dev adalah: ambil backend DEEP yang sudah jalan di DeepTrench, sambungkan ke UI baru ini, dan ubah prompt/formatting output-nya saja. Kalau ada instinct untuk membangun ulang API layer atau scanning engine — jangan, itu buang waktu. Reuse semuanya.

Tujuan akhir produk ini murni **persepsi/branding**: platform harus *terasa* seperti tool hacking dark web yang canggih, padahal di baliknya tetap OSINT/reconnaissance biasa seperti DEEP — bukan exploit, bukan unauthorized access, bukan actual hacking. Ini strategi marketing untuk menarik crypto/memecoin crowd yang suka konten kontroversial, bukan repositioning teknis.

---

## 1. Ringkasan Proyek

Masquerade Cipher adalah dark web OSINT platform untuk komunitas crypto/memecoin. **Secara teknis, ini adalah upgrade tipis dari fitur DEEP milik DeepTrench** — tidak ada teknologi baru yang fundamental. Yang membedakan hanyalah:

- Output di-reframe dengan bahasa yang lebih ofensif/dramatis
- UI/UX bergaya terminal hacking, bukan dashboard netral
- Ada layer tambahan "Cipher Catalog" yang men-cross-reference hasil scan dengan teknik keamanan siber yang relevan

Tidak ada actual hacking, exploit execution, atau tool yang dijalankan dari platform. Semua yang "ofensif" ada di level branding dan UX, bukan di level teknis.

---

## 2. Yang Sudah Selesai (Frontend)

| Item | Status | File |
|---|---|---|
| Landing page (semua section) | ✅ Selesai | `index.html` |
| Halaman VEIL (UI scan, belum tersambung API) | ✅ UI selesai, perlu backend | `veil.html` |
| Halaman Cipher Catalog (103 entries, search, filter) | ✅ Selesai, data statis | `catalog.html` |
| Design system (CSS, warna, tipografi) | ✅ Selesai | `css/main.css`, `css/catalog.css` |
| Scroll animations (reveal, parallax, terminal typing) | ✅ Selesai | `js/scroll.js` |
| 7 illustrations custom (halftone crimson/cream) | ✅ Selesai | `assets/*.png` |
| Single-file preview (semua digabung, base64 embedded) | ✅ Selesai | `masquerade-cipher-preview.html` |

**Catatan tentang struktur file**: Ada dua bentuk deliverable —
1. **Multi-file version** (`index.html`, `veil.html`, `catalog.html` + folder terpisah) — ini yang harus dipakai sebagai basis production build, karena terstruktur dan mudah di-maintain.
2. **Single-file preview version** (`masquerade-cipher-preview.html`) — ini HANYA untuk keperluan preview cepat, gambar di-base64 embed dan tiga halaman digabung jadi satu file dengan JS show/hide. **Jangan pakai versi ini untuk production** — base64 embed bikin file besar dan tidak cache-friendly.

---

## 3. Yang Perlu Dikerjakan Backend

### 3.1 Sambungkan VEIL ke Backend DEEP yang Sudah Ada (Prioritas Utama, dan Ini yang Terpenting di Seluruh Dokumen Ini)

**Ulang lagi supaya jelas: ini bukan bikin scanning engine baru.** Halaman `veil.html` saat ini menampilkan hasil dummy/placeholder yang di-hardcode di JavaScript, murni untuk keperluan preview desain. Task dev adalah literally menyambungkan UI ini ke API endpoint DEEP yang sudah live di DeepTrench — sama seperti mengganti "wajah" tanpa mengganti "mesin". API call-nya sama persis dengan yang dipakai DEEP:

**Sumber data yang perlu disambungkan** (referensi dari DeepTrench DEEP):
- **IntelX API** — dark web indexed content, paste sites, leak dumps
- **RansomLook** — live ransomware group leak site monitoring
- **Tor SOCKS5h routing** — untuk resolusi .onion real
- **30+ dark web search engines** yang sudah dipakai DEEP
- **Claude API** — untuk summarization/reframing output jadi bahasa yang sesuai tone Masquerade Cipher (ofensif, dramatis)

**Rekomendasi teknis**: Karena tech-nya sama persis dengan DEEP, cara tercepat adalah **reuse backend/API layer DeepTrench yang sudah ada**, cukup ganti response formatting/prompt Claude API supaya output-nya pakai tone Masquerade Cipher, bukan bikin dari nol.

Struktur input yang perlu didukung (sudah ada di UI):
- Domain
- Email
- Brand/project name
- Wallet address (fitur baru dibanding DEEP — perlu cross-reference ke on-chain data + dark web mention)

### 3.2 Prompt Engineering untuk Output Reframing

Perlu system prompt khusus untuk Claude API yang men-transform hasil scan mentah dari IntelX/RansomLook jadi format seperti yang ada di UI VEIL saat ini:

```
Contoh struktur output yang diharapkan:
{
  "title": "CREDENTIAL EXPOSURE",
  "severity": "HIGH" | "MEDIUM" | "LOW",
  "body": "penjelasan temuan dalam bahasa naratif",
  "matched_technique": "nama teknik dari Cipher Catalog",
  "catalog_refs": ["TruffleHog", "Gitleaks"]
}
```

Field `matched_technique` dan `catalog_refs` adalah fitur baru — perlu logic untuk mencocokkan tipe temuan (misal: "credential dump" ditemukan) dengan entry yang relevan di Cipher Catalog (misal: TruffleHog, Gitleaks). Ini bisa berupa **keyword mapping sederhana** (rule-based), tidak perlu ML — cukup dictionary yang memetakan jenis temuan ke kategori Cipher Catalog.

### 3.3 Rate Limiting & Abuse Prevention

Sama seperti DEEP, VEIL perlu:
- Rate limit per IP (rekomendasi: 3 scan/hari/IP seperti pola yang dipakai di project lain — lihat Garfield Roast untuk referensi pattern)
- Caching hasil scan untuk target yang sama dalam window waktu tertentu (24 jam) supaya tidak re-query API mahal berulang kali
- Redis atau similar untuk cache layer

### 3.4 Wallet Address Scanning (Fitur Baru)

Ini satu-satunya fitur yang belum ada persis di DEEP — perlu:
- Validasi format address (Solana base58, dll)
- Cross-reference on-chain data (bisa reuse Helius RPC pattern dari project CARTA/CTrace) dengan dark web mention
- Kombinasikan dengan deployer/token intelligence pattern yang sudah ada di TRENCH (meski TRENCH sendiri tidak dipakai di project ini, logic wallet lookup-nya bisa jadi referensi)

---

## 4. Struktur Data Cipher Catalog

File `data/catalog.js` berisi 103 entries, masing-masing dengan struktur:

```js
{
  name: "Nama Tool",
  category: "Kategori",
  desc: "Deskripsi 1-2 kalimat",
  url: "link ke source asli",
  tier: "P0" | "P1" | "P2"  // tingkat relevansi/prioritas
}
```

**Sumber data**: Dikompilasi dari `github.com/Z4nzu/hackingtool` (185+ tools, 20 kategori, listing publik). Semua deskripsi ditulis ulang di level umum (apa fungsinya secara umum), bukan instruksi operasional.

**Yang perlu backend lakukan**:
- Pindahkan data ini dari static JS file ke database (Postgres/MongoDB) supaya bisa di-manage tanpa redeploy
- Buat endpoint API `GET /api/catalog` dengan query params untuk search/filter (saat ini semua filtering terjadi di client-side, oke untuk 103 items tapi sebaiknya dipindah ke server kalau nanti catalog membesar)
- Tambahkan admin panel sederhana untuk update/tambah entries tanpa perlu edit kode

**PENTING — batasan konten**: Jangan tambahkan entry catalog yang berisi payload, command syntax, atau instruksi step-by-step untuk menjalankan teknik tertentu. Catalog ini harus tetap di level referensi (nama tool + fungsi umum + link source), bukan panduan operasional. Ini bukan sekadar preferensi desain — ini batasan yang perlu dipertahankan untuk keamanan hukum dan platform (hosting, app store, dst).

---

## 5. Repo & Sumber yang Dipakai — Daftar Lengkap

### 5.1 Sumber Data — Cipher Catalog

| Sumber | Kegunaan | Link |
|---|---|---|
| **Z4nzu/hackingtool** | Basis utama data Cipher Catalog. 103 dari 185+ entries sudah dikompilasi ke `data/catalog.js` dengan nama tool, kategori, deskripsi umum, dan link source. 20 kategori tersedia di repo ini kalau mau expand lebih dari 103 entries yang sudah ada. | https://github.com/Z4nzu/hackingtool |

### 5.2 Referensi Arsitektur & Branding — Repo AETHER

Repo AETHER (`x-cookie/aetherhackeragent`) **sangat membantu sebagai referensi**, terutama untuk:

- **Konsep "Grimoire"** — istilah untuk skill catalog yang bisa dipakai/diadaptasi sebagai penamaan alternatif di Cipher Catalog
- **Struktur 8 disiplin keamanan siber** yang mereka pakai (Information Gathering, Vulnerability Scanning, Exploitation, Post-Exploitation, Reverse Engineering, Cryptography, Network Analysis, Malware Analysis) — bisa jadi referensi tambahan untuk reorganisasi kategori Cipher Catalog kalau mau dibuat lebih rapi
- **Pola UI/UX** skill browser mereka (card per skill, filter by kategori) — sudah kita adaptasi di `catalog.html`, tapi dev bisa lihat repo asli untuk detail interaksi lain yang mungkin belum ter-cover

Link: https://github.com/x-cookie/aetherhackeragent
Website live: https://www.aetherhackeragent.site/

**Batasan penting soal repo AETHER — baca sebelum menarik data apa pun dari sana:**

Repo ini punya file `src/lib/skills.json` yang menurut README mereka sendiri berfungsi sebagai *"SSOT (Single Source of Truth) for available capabilities"* — bukan listing referensi seperti Z4nzu/hackingtool, tapi **registry yang dirancang untuk dieksekusi** oleh sistem agent mereka (ada execution engine, sandbox isolation, dan deployment scripts yang jalan di baliknya sesuai arsitektur yang mereka dokumentasikan).

Untuk Masquerade Cipher, **pakai repo AETHER sebagai referensi visual/struktural saja** (poin-poin di atas), **jangan** copy isi `skills.json` mereka atau detail level instruksi/payload dari skill-skill di dalamnya ke Cipher Catalog kita. Kalau butuh menambah entries baru ke catalog, ambil dari Z4nzu/hackingtool (masih ada 80+ tools yang belum kepakai dari 185+ total) atau sumber listing publik serupa — bukan dari registry yang punya execution layer.

Ini bukan soal teknis, ini soal supaya Cipher Catalog kita tetap di kategori "referensi" secara konsisten, sama seperti sebagian besar entries yang sudah ada sekarang.

### 5.3 Backend Existing — DeepTrench

| Sumber | Kegunaan |
|---|---|
| DeepTrench (internal, dev sudah pegang codebase-nya) | Backend DEEP yang jadi basis 100% untuk VEIL — IntelX integration, RansomLook feed, Tor routing, semuanya reuse langsung |

Live reference: deeptrench.xyz (buka fitur DEEP di sana untuk lihat behavior yang perlu direplikasi di VEIL)

### 5.4 Sumber yang TIDAK Dipakai (dan Kenapa)

`yaklang/hack-skills` sempat dipertimbangkan di awal tapi **tidak dipakai** setelah dicek isinya — repo ini adalah *"agent-facing knowledge base"* dengan skill routing yang eksplisit dirancang untuk menuntun AI agent menjalankan teknik penetration testing step-by-step (ada payload quick-start, command curl untuk ekstraksi, exploitation path planning). Ini levelnya sama seperti `skills.json` AETHER — instruksi eksekusi, bukan referensi. Jangan pakai sumber ini untuk expand catalog di masa depan.

---

## 6. Hosting & Infrastructure Considerations

Karena branding platform ini eksplisit dark-web/hacking-themed, ada beberapa hal praktis yang perlu diantisipasi tim dev:

- **Vercel/Netlify**: Biasanya oke untuk frontend, tapi baca ulang ToS terkait konten — beberapa provider punya klausul soal "hacking tools" meski di sini murni branding
- **Domain registrar**: Pastikan domain yang dipakai tidak kena flag otomatis oleh registrar karena keyword seperti "cipher", "veil", dark-web related
- **Payment/token launch**: Sesuai instruksi awal, landing page ini sengaja TIDAK membahas token — jadi tidak ada concern terkait itu di level frontend ini

---

## 7. Assets

7 illustrations custom (`assets/01` sampai `07`) dibuat sebagai PNG resolusi tinggi (1200x1200 atau 1400x1000) dengan halftone dithering effect. Untuk production:

- Convert ke WebP untuk performa (sudah disiapkan versi JPEG terkompresi di `assets-web/` sebagai referensi ukuran)
- Pertimbangkan responsive image sizes (saat ini semua di-serve full resolution)
- Kalau butuh illustration tambahan dengan style yang sama (halftone crimson/cream), minta ke saya lagi di chat — generator-nya custom Python (PIL, bukan AI image gen) supaya konsisten dan reproducible, bukan sesuatu yang dev perlu bangun ulang

---

## 8. Ringkasan Prioritas untuk Sprint Pertama

1. **Sambungkan VEIL ke backend DEEP yang sudah ada** (reuse, jangan bangun dari nol)
2. **Buat prompt Claude API untuk output reframing** sesuai tone Masquerade Cipher
3. **Buat keyword mapping** temuan scan → entry Cipher Catalog
4. **Pindahkan data catalog ke database** + buat endpoint API
5. **Rate limiting + caching** untuk VEIL
6. **Wallet address scanning** sebagai fitur tambahan (opsional, bisa masuk sprint kedua)

---

*Dokumen ini disusun sebagai handoff dari tahap desain/frontend ke tahap backend engineering. Semua keputusan desain visual (warna, tipografi, layout, copy) sudah final di level frontend — perubahan besar di UI sebaiknya dikoordinasikan ulang sebelum implementasi backend dimulai supaya tidak ada rework.*
