# 🚀 Panduan Setup & Cara Menjalankan

## 📋 Persyaratan

- Browser web modern (Chrome, Firefox, Safari, Edge)
- Koneksi internet (untuk peta dan CDN resources)
- Folder untuk menyimpan file-file kartu Valentine

## 💻 Cara Menjalankan Kartu Valentine

### Opsi 1: Membuka Langsung (Paling Mudah)
1. **Buka File Explorer** dan navigasi ke folder `VALENTINE`
2. **Double-click** file `index.html`
3. Browser akan membuka kartu Valentine secara otomatis

**Keuntungan:**
- Tidak perlu terminal atau konfigurasi
- Berfungsi offline untuk sebagian besar fitur
- Sangat cepat

**Catatan:**
- Beberapa fitur seperti peta memerlukan koneksi internet
- Audio mungkin tidak berfungsi di browser tertentu tanpa server

### Opsi 2: Menggunakan Python (Windows)

**Jika Python sudah terinstall:**

1. **Buka Command Prompt** (Tekan `Win + R`, ketik `cmd`, tekan Enter)
2. **Navigate ke folder:**
   ```
   cd "C:\Users\PC NEW\Downloads\VALENTINE"
   ```
3. **Jalankan server:**
   ```
   python -m http.server 8000
   ```
4. **Buka browser** dan ketik: `http://localhost:8000`
5. **Tekan Enter** untuk melihat kartu Valentine

**Untuk menghentikan server:** Tekan `Ctrl + C` di Command Prompt

### Opsi 3: Menggunakan Node.js (Windows)

**Jika Node.js sudah terinstall:**

1. **Buka Command Prompt** (Tekan `Win + R`, ketik `cmd`, tekan Enter)
2. **Navigate ke folder:**
   ```
   cd "C:\Users\PC NEW\Downloads\VALENTINE"
   ```
3. **Jalankan dengan npx:**
   ```
   npx http-server -p 8000
   ```
4. **Buka browser** dan ketik: `http://localhost:8000`
5. **Tekan Enter** untuk melihat kartu Valentine

**Untuk menghentikan server:** Tekan `Ctrl + C` di Command Prompt

### Opsi 4: Menggunakan PHP (Jika terinstall)

```bash
cd "C:\Users\PC NEW\Downloads\VALENTINE"
php -S localhost:8000
```

Kemudian buka: `http://localhost:8000`

### Opsi 5: Menggunakan Visual Studio Code (Recommended)

1. **Buka Visual Studio Code**
2. **File → Open Folder** dan pilih folder `VALENTINE`
3. **Install extension**: "Live Server" oleh Ritwick Dey
4. **Right-click** pada `index.html`
5. **Pilih** "Open with Live Server"
6. Browser akan terbuka otomatis dengan kartu Valentine

**Keuntungan:**
- Auto-reload saat file berubah
- Live preview yang sempurna
- Debugging tools terintegrasi

## 🌐 Mengakses dari Perangkat Lain

Jika ingin mengakses dari smartphone atau perangkat lain di jaringan yang sama:

1. Dapatkan **IP Address komputer** Anda:
   - Windows: Buka CMD, ketik `ipconfig`
   - Cari "IPv4 Address" (biasanya dimulai dengan 192.168 atau 10.)

2. Di perangkat lain, buka browser dan ketik:
   ```
   http://[IP_ADDRESS]:8000
   ```
   Contoh: `http://192.168.1.100:8000`

## 📂 Struktur File

```
VALENTINE/
├── index.html          # File HTML utama - Buka ini!
├── style.css          # Styling dan animasi
├── script.js          # Logika dan interaktivitas
├── README.md          # Dokumentasi lengkap
└── SETUP.md           # File ini
```

## 🎯 Fitur yang Memerlukan Internet

- **Peta Virtual**: Menggunakan OpenStreetMap
- **Beberapa Font**: Dari Google Fonts (jika ditambah di masa depan)
- **Ikon**: Font Awesome CDN

## 🔧 Troubleshooting

### Kartu tidak membuka
**Solusi:**
- Pastikan file `index.html`, `style.css`, dan `script.js` dalam folder yang sama
- Coba buka dengan browser berbeda
- Clear browser cache (Ctrl + Shift + Delete)

### Peta tidak muncul
**Solusi:**
- Pastikan ada koneksi internet
- Refresh halaman (F5)
- Clear cache browser

### Audio/Musik tidak bekerja
**Solusi:**
- Pastikan speaker menyala
- Coba di browser berbeda (Chrome recommended)
- Klik amplop atau elemen lain terlebih dahulu sebelum play music

### Foto tidak bisa diupload
**Solusi:**
- Pastikan file adalah gambar (JPG, PNG, GIF)
- Ukuran maksimal ~5MB
- Coba browser Chrome atau Firefox

### Server tidak bisa start
**Solusi:**
- Pastikan port 8000 tidak digunakan program lain
- Gunakan port berbeda: `python -m http.server 9000`
- Coba opsi pembukaan langsung (Opsi 1)

## 🎁 Tips Penggunaan

### Untuk Presentasi Romantis:
1. Gunakan **Opsi 4 atau 5** (dengan server)
2. Fullscreen browser (F11 atau fungsi fullscreen)
3. Surround dengan lilin dan bunga asli untuk efek maksimal
4. Putarkan musik dari tab Musik sambil membuka amplop

### Untuk Berbagi Online:
1. Unduh kartu menggunakan tombol "Unduh Kartu"
2. Edit file HTML yang diunduh jika perlu
3. Upload ke server web Anda atau bagikan file HTML
4. Atau gunakan tombol "Bagikan" untuk share langsung

### Untuk Menyimpan:
1. Screenshot halaman untuk gambar statis
2. Gunakan "Undo Kartu" untuk file HTML lengkap
3. Atau simpan bookmark di browser dengan Ctrl+D

## 📞 Support

Jika mengalami masalah:

1. **Pastikan semua 3 file** ada di folder yang sama
2. **Refresh browser** dengan Ctrl+F5 (hard refresh)
3. **Clear cache browser** dan coba lagi
4. **Coba browser berbeda** (Chrome, Firefox, Safari)
5. **Cek console browser** (F12) untuk error messages

## 🎉 Siap untuk Valentine!

Sekarang Anda siap menggunakan kartu Valentine interaktif yang indah ini!

Pilih opsi pembukaan yang paling sesuai dengan kebutuhan Anda dan nikmati!

**Semoga hari Valentine Anda spesial dan berkesan!** 💝

---

*Dibuat dengan 💕 untuk Valentine yang sempurna*
