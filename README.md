# ⏳ Timezy - Kuasai Waktu, Raih Prestasi

<div align="center">
  <p><b>Platform manajemen waktu dan produktivitas all-in-one yang dirancang khusus untuk mahasiswa ambisius dan kolaborator modern.</b></p>
</div>

---

## ✨ Deskripsi Proyek
<img width="1919" height="880" alt="image" src="https://github.com/user-attachments/assets/3c9f70b1-320a-4a35-a26a-9f3779fd7cea" />

**Timezy** adalah aplikasi web produktivitas yang dirancang untuk mengatasi masalah manajemen waktu yang berantakan. Menggabungkan estetika antarmuka kelas premium (didukung *Dark Mode* penuh) dengan fungsi nyata, Timezy menggabungkan papan Kanban, pencatatan berbasis riwayat, manajemen jadwal, dan teknik fokus Pomodoro di dalam satu atap yang mulus. Saatnya berhenti berpindah-pindah aplikasi dan mulai fokus pada apa yang penting!

---

## 🚀 Fitur Utama (Features)

1. **📱 Dashboard Cerdas & Analitik**
   - Ringkasan komprehensif dari aktivitas harian dan tenggat waktu (deadline) mendatang.
   - Grafik interaktif (didukung oleh *Recharts*) yang menampilkan distribusi waktu dan persentase produktivitas mingguan.
     <img width="1919" height="880" alt="image" src="https://github.com/user-attachments/assets/6b0eb581-da91-44ad-afaf-2049c40590dd" />
   
2. **✅ Papan Tugas (Kanban Board)**


   - Sistem **Drag-and-Drop** yang sangat mulus untuk memindahkan tugas antara kolom *Belum Dimulai*, *Sedang Berlangsung*, dan *Selesai*.
   - Fitur CRUD lengkap (Tambah, Edit, Hapus) dengan label prioritas bawaan.
      <img width="1919" height="880" alt="image" src="https://github.com/user-attachments/assets/7e98b801-cc1f-4d68-8378-68844b67ac7b" />
      <img width="1919" height="880" alt="image" src="https://github.com/user-attachments/assets/60edc225-1b15-4a78-9c62-0de6fb9ea1fc" />
3. **📅 Sistem Jadwal & Notifikasi (Calendar)**
   

   - Kalender manajemen waktu yang memungkinkan pengguna menyusun jadwal rapat atau kegiatan.
   - Terintegrasi secara bawaan dengan **Browser Web Notifications** untuk memberikan peringatan tepat waktu sebelum jadwal berlangsung.
     <img width="1919" height="880" alt="image" src="https://github.com/user-attachments/assets/52c0797f-593e-401a-b77e-b1fa00442dad" />
     <img width="1919" height="880" alt="image" src="https://github.com/user-attachments/assets/e44c9c17-a03e-4fec-a954-e29d4c4495fd" />
     <img width="1919" height="880" alt="image" src="https://github.com/user-attachments/assets/b42de7bd-22c1-4731-9efd-5c4b8c0beccb" />


4. **Mode Fokus Pintar (Focus Timer)**
   - Pengatur waktu hitung mundur (*countdown*) berdesain minimalis tanpa gangguan visual (distraction-free).
   - Memiliki modal konfigurasi pintar dengan berbagai **Preset Rekomendasi** (seperti *Pomodoro Klasik*, *Deep Work*, atau *Sesi Kilat*).
     <img width="1919" height="880" alt="image" src="https://github.com/user-attachments/assets/1effa5c7-a2b8-4b06-b0e4-9f4736f4dd4c" />
     <img width="1919" height="880" alt="image" src="https://github.com/user-attachments/assets/7fd25d85-6c6c-4fda-9b2d-b395e81df095" />
   
5. **📝 Catatan Terstruktur dengan Riwayat (Time-Machine Notes)**
   - *Note Explorer* bergaya profesional untuk mengelola multi-catatan dengan berbagai kategori.
   - **Sistem Riwayat (Version History)**: Jangan takut salah ketik atau data hilang! Setiap kali kamu klik "Simpan", sistem membuat snapshot. Kamu bisa menarik kembali (*restore*) catatanmu ke versi masa lalu kapan pun kamu mau.
   - Chat Ai untuk membantu anda dalam menulis catatan atau belajar
     <img width="1919" height="880" alt="image" src="https://github.com/user-attachments/assets/501d8d94-76eb-4b6e-a7cb-f7765db831e4" />
     <img width="1919" height="880" alt="image" src="https://github.com/user-attachments/assets/a6a40525-41d4-4478-9041-e6baf26baaf0" />
     <img width="1919" height="880" alt="image" src="https://github.com/user-attachments/assets/1a1f4d17-06e5-4a77-850a-ff4f469db78b" />
     <img width="437" height="777" alt="image" src="https://github.com/user-attachments/assets/032993d9-fd73-4e54-9cc4-a7c531b549c4" />
     <img width="439" height="288" alt="image" src="https://github.com/user-attachments/assets/ef8fa835-599f-4816-be67-5beb03fbc0d1" />

   
6. **🔒 Flow Autentikasi & Landing Page Dinamis**
   - *Landing Page* indah dengan animasi (*Framer Motion*) yang terasa hidup.
   - Alur *Login* dan *Register* modern yang terhubung langsung dengan Dashboard utama.

---

## 💻 Panduan Instalasi & Menjalankan (Getting Started)

Ikuti langkah-langkah mudah di bawah ini untuk menjalankan Timezy di komputer lokal Anda.

### 1. Persiapan Awal (Prasyarat)
Pastikan Anda sudah menginstal alat-alat berikut di komputer Anda:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (Sangat disarankan versi LTS terbaru)

### 2. Kloning Repositori
Gunakan Terminal atau Command Prompt, lalu klon repositori ini ke dalam direktori lokal Anda:
```bash
git clone <MASUKKAN_URL_GITHUB_ATAU_REPO_KAMU_DISINI>
```

Masuk ke dalam folder proyek yang baru saja di-kloning:
```bash
cd Timezy
```

### 3. Instalasi Dependensi (NPM)
Proyek ini menggunakan banyak modul canggih masa kini. Instal seluruh dependensinya agar proyek bisa berjalan dengan mengetikkan:
```bash
npm install
```
*(Proses ini akan mengunduh React, Vite, Tailwind, Framer Motion, Recharts, Hello-Pangea DnD, dll).*

### 4. Menjalankan Server Pengembangan (Dev Server)
Setelah instalasi selesai, kamu bisa menyalakan server lokal aplikasi dengan perintah penutup ini:
```bash
npm run dev
```

### 5. Buka di Browser
Lihat bagian *output* di terminal Anda. Biasanya, aplikasi dapat diakses dengan membuka *browser* dan pergi ke alamat:
```text
http://localhost:5173
```
atau
```text
http://localhost:3000
```
*(Secara otomatis VITE akan menugaskan port yang tersedia).*

---

## 🛠️ Teknologi di Balik Layar (Tech Stack)
- **Framework Utama**: React.js (via Vite untuk kecepatan kompilasi super)
- **Desain & Styling**: Tailwind CSS (Didukung Native Dark Mode)
- **Routing**: React Router DOM
- **Animasi & Transisi**: Framer Motion
- **Visualisasi Data (Grafik)**: Recharts
- **Sistem Drag & Drop**: @hello-pangea/dnd
- **Manajemen State Global**: React Context API
- **Database / Penyimpanan Lokal**: Browser Local Storage API (Data 100% aman tersimpan di komputermu sendiri)

---

*Didesain dan dikembangkan dengan ❤️ untuk membantu dunia bekerja lebih cerdas.*
