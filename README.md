# MhsDev - Sistem Kelola Data Mahasiswa

**MhsDev** adalah aplikasi manajemen data mahasiswa yang dibangun dengan arsitektur Full-Stack modern. Proyek ini dirancang untuk memberikan pengalaman pengelolaan data yang intuitif, aman, dan responsif.

---

## 🎓 Informasi Proyek
- **Pelatihan**: React Lanjutan
- **Keperluan**: Ujian Tengah Semester (UTS)
- **Nama**: Alwan
- **Instruktur**: Eka Rahma

---

## 🎯 Fitur Utama
- **Autentikasi Aman**: Sistem masuk (Login) dan daftar (Register) menggunakan JWT (JSON Web Tokens) dan Argon2 untuk hashing kata sandi.
- **Manajemen CRUD Lengkap**: Tambah, ubah, hapus, dan lihat detail data mahasiswa secara real-time.
- **Dashboard Statistik**: Ringkasan data (Total Mahasiswa, Status Aktif/Non-Aktif, Rerata IPK, dan Predikat Cum Laude).
- **Pelokalan Bahasa**: Antarmuka sepenuhnya dalam Bahasa Indonesia.
- **Desain Premium**: Menggunakan tema *Glassmorphism* yang modern dan responsif menggunakan TailwindCSS v4.
- **Aksesibilitas**: Dioptimalkan agar mudah digunakan oleh berbagai kalangan, termasuk orang awam.

---

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite, TailwindCSS v4, Lucide Icons, React Hot Toast.
- **Backend**: Node.js (Express 5), PostgreSQL.
- **Security**: JWT, HTTP-Only Cookies, Argon2 Hashing.

---

## 🚀 Cara Menjalankan Proyek

### Prasyarat
- Node.js (v18+)
- PostgreSQL
- pnpm atau npm

### Langkah Instalasi

1. **Klon Repositori**
   ```bash
   git clone <repository-url>
   cd uts-alwan-react-lanjutan
   ```

2. **Setup Backend**
   ```bash
   cd backend
   pnpm install
   # Sesuaikan konfigurasi .env untuk database PostgreSQL
   pnpm dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   pnpm install
   # Sesuaikan .env untuk VITE_API_URL
   pnpm dev
   ```

Akses aplikasi di: `http://localhost:5173`

---

## 📄 Lisensi
Proyek ini dilisensikan di bawah **MIT License**.

Copyright (c) 2026 Alwan.

---
*Dibuat dengan ❤️ oleh Alwan untuk UTS React Lanjutan.*
