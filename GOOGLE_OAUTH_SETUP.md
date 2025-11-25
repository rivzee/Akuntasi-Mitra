# Panduan Setup Google OAuth untuk Login Google

## Status Saat Ini
❌ **GOOGLE_CLIENT_ID dan GOOGLE_CLIENT_SECRET masih berisi placeholder**

File `backend/.env` Anda saat ini berisi:
```
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET_HERE
```

Ini adalah nilai **PLACEHOLDER** yang harus diganti dengan kredensial asli dari Google Cloud Console.

## Langkah-Langkah yang Harus Dilakukan

### 1. Dapatkan Kredensial dari Google Cloud Console

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Login dengan akun Google Anda
3. Buat project baru atau pilih project yang sudah ada
4. Pergi ke **APIs & Services** > **Credentials**
5. Klik **CREATE CREDENTIALS** > **OAuth client ID**
6. Pilih **Web application**
7. Isi:
   - **Name**: `Web Client` (atau nama lain)
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: `http://localhost:3001/auth/google/callback`
8. Klik **CREATE**
9. **SALIN** Client ID dan Client Secret yang muncul

### 2. Update File .env

**PENTING**: Anda harus mengganti SELURUH teks placeholder dengan kredensial asli!

**SEBELUM (SALAH - masih placeholder):**
```env
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET_HERE
```

**SESUDAH (BENAR - dengan kredensial asli):**
```env
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-AbCdEfGhIjKlMnOpQrStUvWxYz
```

### 3. Cara Mengganti di File .env

1. Buka file `backend/.env` di VS Code (sudah terbuka)
2. Cari baris yang berisi `GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE`
3. **Hapus** teks `YOUR_GOOGLE_CLIENT_ID_HERE`
4. **Paste** Client ID asli yang Anda salin dari Google Cloud Console
5. Cari baris yang berisi `GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET_HERE`
6. **Hapus** teks `YOUR_GOOGLE_CLIENT_SECRET_HERE`
7. **Paste** Client Secret asli yang Anda salin dari Google Cloud Console
8. **SIMPAN** file dengan `Ctrl+S`

### 4. Restart Backend

Setelah menyimpan file `.env` dengan kredensial yang benar:

```bash
# Di terminal backend, tekan Ctrl+C untuk stop
# Lalu jalankan ulang:
npm run start:dev
```

### 5. Verifikasi

Setelah backend restart, Anda akan melihat di console:
```
✅ GOOGLE_CLIENT_ID is loaded: 123456789-...
```

Jika masih muncul:
```
❌ GOOGLE_CLIENT_ID is MISSING or UNDEFINED
```

Berarti file `.env` belum tersimpan dengan benar atau masih berisi placeholder.

## Troubleshooting

### Error: "invalid_client"
- **Penyebab**: Client ID atau Client Secret salah/masih placeholder
- **Solusi**: Pastikan Anda sudah mengganti dengan kredensial asli dari Google Cloud Console

### Error: "redirect_uri_mismatch"
- **Penyebab**: Redirect URI di Google Cloud Console tidak sesuai
- **Solusi**: Pastikan di Google Cloud Console, Authorized redirect URIs berisi: `http://localhost:3001/auth/google/callback`

### Kredensial tidak terbaca
- **Penyebab**: File `.env` belum tersimpan
- **Solusi**: Tekan `Ctrl+S` untuk menyimpan file, lalu restart backend

## Contoh Kredensial yang Benar

**Client ID** biasanya berbentuk:
```
123456789012-abc123def456ghi789jkl012mno345pq.apps.googleusercontent.com
```

**Client Secret** biasanya berbentuk:
```
GOCSPX-AbCdEfGhIjKlMnOpQrStUvWxYz12
```

Jika kredensial Anda **TIDAK** berbentuk seperti di atas, berarti Anda belum mendapatkan kredensial asli dari Google Cloud Console.

## Catatan Penting

- **JANGAN** commit file `.env` ke Git (sudah ada di `.gitignore`)
- **JANGAN** share kredensial ini ke publik
- Kredensial ini hanya untuk development di localhost
- Untuk production, Anda perlu kredensial yang berbeda dengan domain yang sesuai
