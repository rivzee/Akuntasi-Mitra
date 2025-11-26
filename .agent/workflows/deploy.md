---
description: Deploy aplikasi ke production (Vercel + Railway)
---

# Workflow Deployment - Akuntasi Mitra

Workflow ini akan memandu Anda deploy aplikasi ke production menggunakan:
- **Vercel** untuk Frontend (Next.js)
- **Railway** untuk Backend (NestJS) + Database (PostgreSQL)

---

## Prerequisites

Sebelum mulai, pastikan Anda punya:
- [ ] Akun GitHub (untuk push code)
- [ ] Akun Vercel (https://vercel.com)
- [ ] Akun Railway (https://railway.app)
- [ ] Git sudah terinstall
- [ ] Node.js 20+ terinstall

---

## Part 1: Persiapan Repository

### 1. Inisialisasi Git (jika belum)

```bash
cd c:\Users\Administrator\Downloads\Websie_Mitra\Akuntasi-Mitra
git init
git add .
git commit -m "Initial commit - ready for deployment"
```

### 2. Push ke GitHub

Buat repository baru di GitHub, lalu:

```bash
git remote add origin https://github.com/YOUR_USERNAME/akuntasi-mitra.git
git branch -M main
git push -u origin main
```

---

## Part 2: Deploy Backend ke Railway

### 1. Install Railway CLI

```bash
npm install -g @railway/cli
```

### 2. Login ke Railway

```bash
railway login
```

### 3. Deploy Backend

```bash
cd Website-Dashboard/backend
railway init
```

Pilih:
- "Create a new project"
- Beri nama: "akuntasi-mitra-backend"

### 4. Tambahkan PostgreSQL Database

```bash
railway add
```

Pilih: "PostgreSQL"

### 5. Set Environment Variables

Railway akan otomatis set `DATABASE_URL`. Tambahkan yang lain:

```bash
railway variables set JWT_SECRET="ganti-dengan-secret-key-yang-kuat-minimal-32-karakter"
railway variables set GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
railway variables set GOOGLE_CLIENT_SECRET="your-google-client-secret"
railway variables set MAILERSEND_API_KEY="your-mailersend-api-key"
railway variables set EMAIL_FROM="noreply@yourdomain.com"
railway variables set FRONTEND_URL="https://your-frontend-url.vercel.app"
railway variables set PORT="3001"
```

**PENTING**: Ganti semua nilai di atas dengan credentials Anda yang sebenarnya!

### 6. Deploy Backend

```bash
railway up
```

### 7. Generate Domain untuk Backend

```bash
railway domain
```

Catat URL yang diberikan (misal: `akuntasi-mitra-backend.up.railway.app`)

### 8. Run Database Migration

```bash
railway run npx prisma migrate deploy
railway run npx prisma db seed
```

### 9. Verify Backend Running

Buka browser dan akses: `https://your-backend-url.railway.app`

---

## Part 3: Deploy Frontend ke Vercel

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

Jawab pertanyaan:
- Set up and deploy? **Y**
- Which scope? Pilih akun Anda
- Link to existing project? **N**
- Project name? **akuntasi-mitra-frontend** (atau nama lain)
- In which directory is your code located? **./** (enter)
- Want to override settings? **N**

### 4. Set Environment Variable

```bash
vercel env add NEXT_PUBLIC_API_URL
```

Masukkan nilai: `https://your-backend-url.railway.app` (URL dari Railway step 7)

Pilih environment: **Production, Preview, Development** (pilih semua)

### 5. Deploy ke Production

```bash
vercel --prod
```

### 6. Catat Frontend URL

Vercel akan memberikan URL production (misal: `akuntasi-mitra-frontend.vercel.app`)

---

## Part 4: Update Google OAuth Settings

### 1. Buka Google Cloud Console

https://console.cloud.google.com/apis/credentials

### 2. Update OAuth Client

Pilih OAuth 2.0 Client ID Anda, lalu tambahkan:

**Authorized JavaScript origins:**
- `https://your-frontend-url.vercel.app`

**Authorized redirect URIs:**
- `https://your-backend-url.railway.app/auth/google/callback`

### 3. Update Railway Environment Variable

```bash
cd ../../Website-Dashboard/backend
railway variables set GOOGLE_CALLBACK_URL="https://your-backend-url.railway.app/auth/google/callback"
```

---

## Part 5: Update Backend FRONTEND_URL

Sekarang kita tahu URL frontend, update di Railway:

```bash
railway variables set FRONTEND_URL="https://your-frontend-url.vercel.app"
```

---

## Part 6: Verification & Testing

### 1. Test Backend API

```bash
curl https://your-backend-url.railway.app
```

### 2. Test Frontend

Buka browser: `https://your-frontend-url.vercel.app`

### 3. Test Login Flow

- Coba register user baru
- Coba login dengan email/password
- Coba login dengan Google OAuth

### 4. Test Dashboard

- Login sebagai admin: `admin@akuntasi.com` / `admin123`
- Cek semua fitur berfungsi

---

## Part 7: Setup Custom Domain (Opsional)

### Untuk Frontend (Vercel)

1. Buka Vercel Dashboard → Project Settings → Domains
2. Tambahkan domain Anda (misal: `akuntasi-mitra.com`)
3. Update DNS records sesuai instruksi Vercel

### Untuk Backend (Railway)

1. Buka Railway Dashboard → Project → Settings → Domains
2. Tambahkan custom domain (misal: `api.akuntasi-mitra.com`)
3. Update DNS records sesuai instruksi Railway

### Update Environment Variables

Setelah custom domain aktif:

```bash
# Update Frontend
cd Website-Dashboard/frontend
vercel env add NEXT_PUBLIC_API_URL
# Masukkan: https://api.akuntasi-mitra.com

# Update Backend
cd ../backend
railway variables set FRONTEND_URL="https://akuntasi-mitra.com"
railway variables set GOOGLE_CALLBACK_URL="https://api.akuntasi-mitra.com/auth/google/callback"
```

### Update Google OAuth lagi

Tambahkan custom domain ke Google Cloud Console.

---

## Troubleshooting

### Backend tidak bisa connect ke database

```bash
railway logs
```

Cek error di logs. Pastikan DATABASE_URL sudah ter-set otomatis.

### Frontend tidak bisa fetch API

1. Cek `NEXT_PUBLIC_API_URL` di Vercel dashboard
2. Pastikan backend URL benar dan accessible
3. Cek CORS settings di backend

### Google OAuth error

1. Pastikan redirect URI di Google Console sama persis dengan backend URL
2. Pastikan `GOOGLE_CLIENT_ID` dan `GOOGLE_CLIENT_SECRET` benar
3. Cek `FRONTEND_URL` di Railway variables

### Database migration error

```bash
railway run npx prisma generate
railway run npx prisma migrate reset --force
railway run npx prisma db seed
```

---

## Monitoring & Maintenance

### Check Backend Logs

```bash
cd Website-Dashboard/backend
railway logs
```

### Check Frontend Logs

Buka Vercel Dashboard → Project → Deployments → View Function Logs

### Redeploy Backend

```bash
cd Website-Dashboard/backend
railway up
```

### Redeploy Frontend

```bash
cd Website-Dashboard/frontend
vercel --prod
```

---

## Environment Variables Checklist

### Backend (Railway)

- [x] `DATABASE_URL` (auto-set oleh Railway)
- [ ] `JWT_SECRET`
- [ ] `GOOGLE_CLIENT_ID`
- [ ] `GOOGLE_CLIENT_SECRET`
- [ ] `GOOGLE_CALLBACK_URL`
- [ ] `MAILERSEND_API_KEY`
- [ ] `EMAIL_FROM`
- [ ] `FRONTEND_URL`
- [ ] `PORT`

### Frontend (Vercel)

- [ ] `NEXT_PUBLIC_API_URL`

---

## Next Steps After Deployment

1. **Setup Monitoring**: Gunakan Railway/Vercel analytics
2. **Setup Backups**: Railway PostgreSQL auto-backup, tapi bisa setup manual backup juga
3. **Setup CI/CD**: Connect GitHub untuk auto-deploy on push
4. **Security**: Review semua environment variables, pastikan aman
5. **Performance**: Monitor response time dan optimize jika perlu

---

**Selamat! Aplikasi Anda sudah live di production! 🎉**
