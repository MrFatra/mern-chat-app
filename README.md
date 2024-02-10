# MERN Chat App

## Deskripsi Proyek

Proyek "Chat App" ini bertujuan untuk mengembangkan aplikasi obrolan real-time menggunakan stack MERN (MongoDB, Express.js, React, dan Node.js). Aplikasi ini dirancang untuk memberikan pengguna pengalaman berkomunikasi yang interaktif dan responsif.

## Fitur Utama

1. **Pendaftaran Pengguna**: Pengguna dapat membuat akun dengan menyediakan informasi dasar dan menggunakan akun tersebut untuk masuk ke aplikasi.

2. **Obrolan Real-Time**: Aplikasi mendukung obrolan real-time antarpengguna. Pengguna dapat membuat ruang obrolan, mengundang teman, dan berkomunikasi secara langsung.

3. **Profil Pengguna**: Setiap pengguna memiliki profil dengan nama lengkap, foto profil, status (online/offline), dan gender.

## Teknologi yang Digunakan

### Frontend (React)
- React untuk pengembangan antarmuka pengguna yang responsif.
- Zustand untuk manajemen state aplikasi.
- Socket.IO untuk komunikasi real-time antara klien dan server.

### Backend (Node.js dan Express.js)
- Node.js untuk menjalankan server aplikasi.
- Express.js sebagai kerangka kerja web untuk menangani permintaan HTTP.
- MongoDB sebagai basis data untuk menyimpan informasi pengguna, pesan, dan data lainnya.
- Mongoose sebagai ODM (Object Data Modeling) untuk memudahkan interaksi dengan MongoDB.
- JWT untuk penanganan cookie session dan autentifikasi pengguna.
- Socket.IO untuk menangani koneksi dan komunikasi real-time antara klien dan server.

## Cara Menjalankan Proyek

1. **Persyaratan Prasyarat:**
    - Node.js dan npm terinstal.
    - MongoDB terpasang dan berjalan.

2. **Menyiapkan Backend:**
    - Masuk ke direktori `backend`.
    - Jalankan `npm install` untuk menginstal dependensi.
    - Konfigurasi file `.env`.

3. **Menyiapkan Frontend:**
    - Masuk ke direktori `frontend`.
    - Jalankan `npm install` untuk menginstal dependensi.

4. **Akses Aplikasi:**
    - Jalankan `frontend` pada direktori root proyek dengan perintah `npm run client`
    - Jalankan `backend` pada direktori root proyek dengan perintah `npm run server`
    - Buka browser dan akses `http://localhost:5173` (default vite server) untuk mengakses aplikasi Chat.

## Kontribusi

Jika Anda ingin berkontribusi pada proyek ini, silakan buka _issue_ atau _pull request_ di repositori proyek ini.

Semoga proyek "Chat App" ini memberikan pengalaman obrolan yang menyenangkan dan bermanfaat bagi penggunanya!
