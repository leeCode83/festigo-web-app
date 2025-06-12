# 🎉 Festigo - Web App Pencari Festival & Acara

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/leecode83/festigo-web-app)
[![Stars](https://img.shields.io/github/stars/leecode83/festigo-web-app.svg)](https://github.com/leecode83/festigo-web-app/stargazers)
[![Forks](https://img.shields.io/github/forks/leecode83/festigo-web-app.svg)](https://github.com/leecode83/festigo-web-app/network/members)

Selamat datang di **Festigo**! Aplikasi web yang dirancang untuk membantu Anda menemukan berbagai festival dan acara menarik di sekitar Anda. Jangan lewatkan keseruan lagi!

![Festigo Hero Image](https://i.imgur.com/your-hero-image.png)  ## 📖 Tentang Festigo

Seringkali kita melewatkan acara atau festival seru hanya karena kurangnya informasi. **Festigo** hadir sebagai solusi untuk masalah tersebut. Aplikasi ini adalah platform terpusat di mana pengguna dapat dengan mudah mencari, menemukan, dan mendapatkan detail tentang berbagai acara, mulai dari konser musik, festival budaya, pameran seni, hingga seminar edukatif.

Tujuan utama kami adalah menghubungkan orang-orang dengan minat yang sama melalui acara dan festival, serta memberikan panggung bagi para penyelenggara untuk mempromosikan acara mereka kepada audiens yang lebih luas.

## ✨ Fitur Utama

Festigo dilengkapi dengan berbagai fitur yang akan meningkatkan pengalaman Anda dalam mencari acara:

* **🔍 Pencarian Acara:** Cari acara berdasarkan nama, kategori, lokasi, atau tanggal.
* **🗂️ Kategori Beragam:** Jelajahi acara berdasarkan kategori seperti Musik, Seni, Olahraga, Makanan & Minuman, dan banyak lagi.
* **🗺️ Tampilan Peta Interaktif:** Lihat lokasi acara secara visual melalui peta untuk mempermudah perencanaan perjalanan Anda. (Fitur dalam pengembangan)
* **💬 Diskusi & Ulasan:** Berinteraksi dengan pengguna lain, ajukan pertanyaan di forum diskusi, dan berikan ulasan setelah Anda menghadiri sebuah acara.
* **👤 Profil Pengguna:** Buat profil Anda, simpan acara favorit, dan lihat riwayat acara yang pernah Anda ikuti.
* **갤러리 Galeri Acara:** Lihat foto-foto dari acara yang telah berlangsung untuk merasakan kembali keseruannya.
* **🔐 Otentikasi Aman:** Sistem login dan registrasi yang aman untuk melindungi data pengguna.

## 💻 Halaman-Halaman

Aplikasi ini memiliki beberapa halaman utama:

* **Beranda:** Menampilkan acara-acara yang sedang tren dan rekomendasi acara untuk Anda.
* **Jelajahi (Discover):** Halaman untuk menjelajahi semua acara yang tersedia dengan berbagai filter.
* **Detail Acara:** Menampilkan informasi lengkap tentang satu acara, termasuk deskripsi, jadwal, lokasi, galeri, dan ulasan dari pengguna lain.
* **Detail Kategori:** Menampilkan semua acara dalam satu kategori tertentu.
* **Forum Diskusi:** Tempat pengguna dapat memulai atau berpartisipasi dalam diskusi terkait acara.
* **Profil:** Halaman pribadi pengguna untuk mengelola informasi, melihat ulasan, dan acara yang disimpan.
* **Login & Signup:** Halaman untuk otentikasi pengguna.

## 🚀 Manfaat Aplikasi

* **Bagi Pengguna:**
    * Tidak akan ketinggalan informasi acara atau festival menarik.
    * Memudahkan perencanaan untuk menghadiri acara.
    * Terhubung dengan komunitas yang memiliki minat yang sama.
* **Bagi Penyelenggara Acara:**
    * Platform yang efektif untuk mempromosikan acara.
    * Menjangkau audiens yang lebih relevan dan tertarget.

## 🛠️ Cara Inisiasi Proyek

Tertarik untuk mencoba atau berkontribusi pada proyek ini? Ikuti langkah-langkah berikut untuk menjalankan aplikasi ini di lingkungan lokal Anda.

### Prasyarat

Pastikan Anda sudah menginstal:
* [Node.js](https://nodejs.org/) (v18.x atau lebih tinggi)
* [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)
* [Docker](https://www.docker.com/) (untuk menjalankan database)

### Instalasi Sisi Server (Backend)

1.  **Clone repository:**
    ```bash
    git clone [https://github.com/leecode83/festigo-web-app.git](https://github.com/leecode83/festigo-web-app.git)
    cd festigo-web-app/server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Database (dengan Docker):**
    Jalankan perintah berikut dari direktori `server` untuk memulai kontainer database PostgreSQL:
    ```bash
    docker-compose up -d
    ```

4.  **Terapkan Migrasi Database:**
    Gunakan Prisma untuk menerapkan skema database:
    ```bash
    npx prisma migrate dev
    ```

5.  **Jalankan Server:**
    ```bash
    npm run start:dev
    ```
    Server akan berjalan di `http://localhost:3000`.

### Instalasi Sisi Klien (Frontend)

1.  **Buka terminal baru dan masuk ke direktori `client`:**
    ```bash
    cd ../client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Jalankan Aplikasi Klien:**
    ```bash
    npm run dev
    ```
    Aplikasi React (Next.js) akan berjalan di `http://localhost:3001`.

4.  **Buka di Browser:**
    Buka `http://localhost:3001` di browser Anda untuk melihat aplikasi beraksi!

## 🙌 Kontribusi & Masukan

Proyek ini masih dalam tahap pengembangan dan saya sangat terbuka untuk segala bentuk kritik, saran, maupun kontribusi dari siapa pun. Jika Anda menemukan bug, memiliki ide untuk fitur baru, atau ingin membantu mengembangkan proyek ini, jangan ragu untuk:

* **Membuat *Issue*** di repositori GitHub ini.
* **Melakukan *Fork*** pada proyek ini dan membuat *Pull Request*.

Setiap kontribusi, sekecil apa pun, akan sangat saya hargai! Mari kita bangun platform ini bersama-sama.