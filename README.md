# Lahap!

Demo Web : https://mamincoty-lab.github.io/sistem-penjualan-kas-bank-warung-makan-Lahap/

Aplikasi sederhana untuk penjualan serta pencatatan kas dan bank warung makan.

## Struktur

```text
frontend/
  index.html
  styles.css
  app.js
backend/
  app.js
  schema.sql
```

## ERD tiga entitas

```text
menu_items (1) ──────< sales (1) ──────< cash_bank_transactions
                         menu_item_id       sale_id (opsional)
```

- `menu_items`: daftar menu dan harga.
- `sales`: transaksi penjualan dan metode pembayaran.
- `cash_bank_transactions`: pemasukan/pengeluaran di akun Kas atau Bank.

## Menjalankan

1. Buka Supabase SQL Editor, jalankan seluruh isi `backend/schema.sql`.
2. Pastikan Node.js versi 18 atau lebih baru tersedia karena backend memakai `fetch` bawaan Node.
3. Buka atau buat file `.env` di folder proyek. Isi URL proyek dan `service_role` key dari **Supabase Dashboard → Project Settings → API**, lalu tentukan PIN owner. File `.env` hanya dibaca backend; jangan unggah atau kirim file ini.

```powershell
code .env
node backend/app.js
```

Isi `.env` dengan format berikut:

```dotenv
SUPABASE_URL=https://project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=service-role-key-anda
OWNER_APPROVAL_PIN=pin-owner-sekaligus-login-owner
SESSION_SECRET=isi-dengan-random-string-panjang
```

4. Buka `http://localhost:3000`.

Gunakan `service_role` key hanya di `.env` backend. Jangan pernah memasukkannya ke frontend atau membagikannya. Jika key pernah terekspos, segera rotasi dari Supabase Dashboard.

Halaman awal menyediakan pilihan langsung ke tampilan Owner atau Kasir tanpa PIN maupun kata sandi. Pilihan ini hanya membedakan tampilan dan bukan mekanisme keamanan; gunakan hanya pada lingkungan tepercaya. PIN owner (`OWNER_APPROVAL_PIN`) tetap digunakan untuk persetujuan tindakan sensitif. `SESSION_SECRET` digunakan untuk menandatangani sesi (jika tidak diisi, backend memakai `SUPABASE_SERVICE_ROLE_KEY`). Sesi berlaku 12 jam. Tampilan kasir berfokus pada POS; owner memiliki dashboard dan administrasi.

Untuk demo GitHub Pages, deploy ulang backend Vercel setelah perubahan ini. `CORS_ORIGINS` di Vercel harus mengizinkan `https://mamincoty-lab.github.io`; backend juga harus memiliki `OWNER_APPROVAL_PIN` dan kredensial Supabase yang valid.

Untuk memasang fitur **Reset pencatatan**, jalankan ulang seluruh `backend/schema.sql` di Supabase SQL Editor setelah memperbarui aplikasi. Tombol Reset pencatatan menghapus transaksi, penjualan, pesanan, hutang/piutang, anggaran, rekonsiliasi, dan penutupan kas; menu, pengaturan, serta audit log tetap tersimpan. Tindakan ini memerlukan PIN owner dan tidak dapat dibatalkan.

