# 🚀 Deploy Sekarang - Tanpa Email Service

Quick deployment guide tanpa setup email dulu.

---

## Kenapa Skip Email Dulu?

- ✅ Deploy lebih cepat
- ✅ Aplikasi tetap 100% fungsional
- ✅ Bisa tambah email nanti kapan saja
- ⚠️ Email notifications tidak aktif (tapi tidak error)

---

## Step-by-Step Deployment

### 1. Install Railway CLI

```bash
npm install -g @railway/cli
```

### 2. Login ke Railway

```bash
railway login
```

Browser akan terbuka, login dengan GitHub.

### 3. Deploy Backend

```bash
cd Website-Dashboard/backend
railway init
```

Pilih:
- **"Create a new project"**
- Nama project: `akuntasi-mitra-backend`

### 4. Tambah PostgreSQL

```bash
railway add
```

Pilih: **PostgreSQL**

### 5. Set Environment Variables

```bash
railway variables set JWT_SECRET="akuntasi-mitra-super-secret-key-2025-production-12345678"
railway variables set GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
railway variables set GOOGLE_CLIENT_SECRET="your-google-client-secret"
railway variables set MAILERSEND_API_KEY="dummy-key-will-setup-later"
railway variables set EMAIL_FROM="noreply@example.com"
railway variables set FRONTEND_URL="http://localhost:3000"
railway variables set PORT="3001"
```

**PENTING:** Ganti `GOOGLE_CLIENT_ID` dan `GOOGLE_CLIENT_SECRET` dengan yang asli!

### 6. Deploy Backend

```bash
railway up
```

Tunggu sampai selesai (1-2 menit).

### 7. Generate Public Domain

```bash
railway domain
```

Railway akan generate URL seperti: `akuntasi-mitra-backend.up.railway.app`

**CATAT URL INI!** Kita butuh untuk frontend.

### 8. Run Database Migration

```bash
railway run npx prisma migrate deploy
railway run npx prisma db seed
```

### 9. Verify Backend

Buka browser: `https://your-backend-url.railway.app`

Jika muncul response (bukan error), backend berhasil!

---

## Deploy Frontend

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login ke Vercel

```bash
vercel login
```

### 3. Deploy Frontend

```bash
cd ../frontend
vercel
```

Jawab:
- Set up and deploy? **Y**
- Which scope? Pilih akun Anda
- Link to existing project? **N**
- Project name? **akuntasi-mitra**
- Directory? **./** (tekan Enter)
- Override settings? **N**

### 4. Set Environment Variable

```bash
vercel env add NEXT_PUBLIC_API_URL
```

Masukkan: `https://your-backend-url.railway.app` (dari step 7 backend)

Pilih: **Production, Preview, Development** (spasi untuk select, enter untuk confirm)

### 5. Deploy Production

```bash
vercel --prod
```

Vercel akan generate URL seperti: `akuntasi-mitra.vercel.app`

**CATAT URL INI!**

---

## Update Configuration

### 1. Update Backend FRONTEND_URL

```bash
cd ../../Website-Dashboard/backend
railway variables set FRONTEND_URL="https://your-frontend.vercel.app"
railway variables set GOOGLE_CALLBACK_URL="https://your-backend.railway.app/auth/google/callback"
```

### 2. Update Google OAuth

1. Buka: https://console.cloud.google.com/apis/credentials
2. Pilih OAuth Client ID Anda
3. Tambahkan:

**Authorized JavaScript origins:**
- `https://your-frontend.vercel.app`

**Authorized redirect URIs:**
- `https://your-backend.railway.app/auth/google/callback`

4. Klik **Save**

---

## Testing

### 1. Buka Frontend

`https://your-frontend.vercel.app`

### 2. Test Login

**Admin:**
- Email: `admin@akuntasi.com`
- Password: `admin123`

### 3. Test Register

Buat user baru (email notification tidak akan dikirim, tapi register tetap berhasil)

### 4. Test Google OAuth

Klik "Login with Google" - harus berhasil redirect dan login

---

## Troubleshooting

### Backend error

```bash
railway logs
```

Check error di logs.

### Frontend tidak bisa fetch API

1. Check `NEXT_PUBLIC_API_URL` di Vercel dashboard
2. Pastikan backend URL benar
3. Test backend URL di browser

### Google OAuth error

1. Pastikan redirect URI di Google Console **SAMA PERSIS** dengan backend URL
2. Check `GOOGLE_CLIENT_ID` dan `GOOGLE_CLIENT_SECRET` benar
3. Clear browser cache dan coba lagi

---

## Setup Email Nanti

Kapan siap setup email:

1. Baca: `MAILERSEND_SETUP.md`
2. Dapatkan API key dari MailerSend
3. Update Railway variables:
   ```bash
   railway variables set MAILERSEND_API_KEY="mlsn.xxxxx"
   railway variables set EMAIL_FROM="noreply@yourdomain.com"
   ```
4. Done! Email akan langsung aktif.

---

## URLs Penting

**Frontend:** `https://your-frontend.vercel.app`
**Backend:** `https://your-backend.railway.app`
**Railway Dashboard:** https://railway.app/dashboard
**Vercel Dashboard:** https://vercel.com/dashboard

---

## Next Steps

Setelah deploy berhasil:

1. ✅ Test semua fitur
2. ✅ Setup custom domain (opsional)
3. ✅ Setup MailerSend (opsional)
4. ✅ Setup monitoring
5. ✅ Share dengan users!

---

**Siap deploy? Jalankan command pertama:**

```bash
npm install -g @railway/cli
railway login
```
