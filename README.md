# 🌸 My Daily Planner

My Daily Planner adalah aplikasi pencatat kegiatan harian berbasis **React Native** yang dibangun menggunakan **Expo** dan **AsyncStorage**. Aplikasi ini memungkinkan pengguna untuk mencatat aktivitas harian, mencari catatan, menandai tugas yang telah selesai, menghapus catatan, serta menyimpan data secara lokal sehingga tetap tersedia meskipun aplikasi ditutup dan dibuka kembali.

---

## ✨ Fitur Aplikasi

### ✅ Level 1 (Fitur Wajib)

- ➕ Menambah catatan baru (Create)
- 📖 Menampilkan daftar catatan (Read)
- 🗑️ Menghapus catatan (Delete)
- ✅ Validasi input agar tidak kosong
- 💾 Penyimpanan data menggunakan AsyncStorage
- 🔄 Data tetap tersimpan setelah aplikasi ditutup (Persistence)
- 📋 Menampilkan daftar menggunakan FlatList
- 📭 Empty State saat belum ada catatan

### ✅ Level 2 (Pengembangan)

- 🌙 Dark Mode (tersimpan menggunakan AsyncStorage)
- 🔍 Search catatan berdasarkan teks
- ✅ Toggle status selesai
- ⚠️ Konfirmasi sebelum menghapus catatan

### ⭐ Bonus

- 📅 Timestamp pada setiap catatan

---

## 🛠️ Tech Stack

- React Native
- Expo SDK 54
- JavaScript (ES6)
- AsyncStorage
- Expo Go

---

## 📱 Tampilan Aplikasi

### 1. Halaman Utama

Menampilkan daftar catatan, kolom input, tombol tambah, dan kolom pencarian.

![Halaman Utama](page1.jpeg)

---

### 2. Dark Mode

Menampilkan tampilan aplikasi ketika Dark Mode diaktifkan.

![Dark Mode](page2.jpeg)

---

### 3. Toggle Status Selesai

Menampilkan catatan yang telah ditandai selesai dengan tanda centang dan teks tercoret.

![Toggle Complete](page3.jpeg)

---

### 4. Bukti Persistensi AsyncStorage

Data tetap tersimpan setelah aplikasi ditutup dan dibuka kembali.

![Persistensi](page4.jpeg)

---

## 💾 Penyimpanan Data

Aplikasi menggunakan **AsyncStorage** untuk menyimpan data secara lokal.

Data yang disimpan meliputi:

- Daftar catatan
- Status Dark Mode

Seluruh data akan tetap tersedia meskipun aplikasi ditutup dan dibuka kembali.

---

## 🚀 Cara Menjalankan Project

### 1. Clone Repository

```bash
git clone https://github.com/misyesinaga1-alt/NoteKeeper.git
```

### 2. Masuk ke Folder Project

```bash
cd NoteKeeper
```

### 3. Install Dependency

```bash
npm install
```

atau

```bash
npx expo install
```

### 4. Jalankan Aplikasi

```bash
npx expo start
```

Kemudian scan QR Code menggunakan aplikasi **Expo Go**.

---

## 📱 Expo Snack

Aplikasi juga dapat dicoba secara langsung melalui Expo Snack:

**https://snack.expo.dev/@misyesinaga/notekeeper**

---

## 📂 Repository GitHub

Repository proyek dapat diakses melalui:

**https://github.com/misyesinaga1-alt/NoteKeeper**

---

## 👩‍💻 Developer

**Misye Retno Wulansari Br. Sinaga**

GitHub:
https://github.com/misyesinaga1-alt

---

## 📄 Lisensi

Project ini dibuat untuk memenuhi tugas **Misi 12 – Build a Persistent App** pada mata kuliah **React Native**.
