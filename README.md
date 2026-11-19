## Overall Task

- [x] Semua task utama sudah dikerjakan.

## Bonus

- [x] Sorting
- [x] Pagination

## Directory Folder : 
- **backend** : Folder backend menggunakan Node + Express dan MySQL
- **frontend** : Folder untuk frontend menggunakan React JS

## Stack : 
- Node : v26.13.1
- Express : 5.3.0
- React JS : 
- MySQL : 8.4.9


## Cara Run Backend

1. Pastikan **Node.js** (v26.13.1) dan **MySQL** (8.4.9) sudah ter-install.

2. Masuk ke folder backend:
   ```bash
   cd backend
   ```

3. Install semua library:
   ```bash
   npm install
   ```

4. Buat file `.env` dengan menyalin `example.env`, lalu isi sesuai konfigurasi MySQL kamu:
   ```bash
   cp example.env .env
   ```

5. Seed Data yang ada di folder data dengan cara:
   ```bash
   npm run seed
   ```
   lalu ctrl + c agar dapat keluar lalu Data sudah masuk ke db anda.

6. Jalankan server:
   ```bash
   npm run dev
   ```


## Cara Run Frontend

1. Setelah di clone masuk ke folder front end lalu jalankan:
   ```bash
   npm install
   ```
2. pastikan PORT api localhost sama dengan yang ada di file api/api.js
3. jalankan react
   ```bash
   npm run dev
   ```

## Notes

# Supaya database dibuat otomatis kalau belum ada, tambahkan kode berikut **di atas** `await db.authenticate();`:

```js
const tmp = new Sequelize('', db.config.username, db.config.password, db.options);
await tmp.getQueryInterface().createDatabase(db.config.database);
await tmp.close();
```

# Saya menggunakan ID menggunakan Nama Table_ID agar dapat lebih gampang dipahami.