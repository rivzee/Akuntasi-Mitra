# 🚀 Quick Deployment Guide

Panduan cepat untuk deploy aplikasi Akuntasi Mitra ke production.

## 📋 Pilihan Platform

### Opsi 1: Vercel + Railway (Recommended) ⭐

**Kelebihan:**
- ✅ Paling mudah dan cepat
- ✅ Free tier tersedia
- ✅ Auto SSL/HTTPS
- ✅ Auto scaling
- ✅ CI/CD built-in

**Biaya:** $0-10/bulan

**Langkah:**
1. Install CLI tools:
   ```bash
   npm install -g vercel @railway/cli
   ```

2. Deploy Backend ke Railway:
   ```bash
   cd Website-Dashboard/backend
   railway login
   railway init
   railway add  # Pilih PostgreSQL
   railway up
   ```

3. Set environment variables di Railway dashboard

4. Deploy Frontend ke Vercel:
   ```bash
   cd ../frontend
   vercel login
   vercel
   vercel --prod
   ```

5. Set `NEXT_PUBLIC_API_URL` di Vercel dashboard

**Detail lengkap:** Lihat `.agent/workflows/deploy.md`

---

### Opsi 2: VPS (DigitalOcean, AWS, etc)

**Kelebihan:**
- ✅ Full control
- ✅ Bisa custom setup
- ✅ Lebih murah untuk scale besar

**Biaya:** $6-12/bulan

**Langkah:**
1. Setup server Ubuntu 22.04
2. Install Node.js, PostgreSQL, Nginx
3. Clone repository
4. Setup environment variables
5. Build & run dengan PM2
6. Configure Nginx reverse proxy
7. Setup SSL dengan Let's Encrypt

**Detail lengkap:** Lihat `DEPLOYMENT_GUIDE.md` → Section VPS

---

### Opsi 3: Docker

**Kelebihan:**
- ✅ Consistent environment
- ✅ Easy to scale
- ✅ Portable

**Langkah:**
1. Build Docker images
2. Deploy ke platform pilihan (Railway, DigitalOcean, AWS)

**Detail lengkap:** Lihat `DEPLOYMENT_GUIDE.md` → Section Docker

---

## ⚡ Super Quick Start (5 menit)

Untuk testing deployment cepat:

### 1. Deploy Backend ke Railway

```bash
cd Website-Dashboard/backend
npx @railway/cli login
npx @railway/cli init
npx @railway/cli add  # Pilih PostgreSQL
npx @railway/cli up
```

### 2. Deploy Frontend ke Vercel

```bash
cd ../frontend
npx vercel
```

### 3. Set Environment Variables

**Railway (Backend):**
- Buka https://railway.app/dashboard
- Set semua env vars dari `.env.example`

**Vercel (Frontend):**
- Buka https://vercel.com/dashboard
- Set `NEXT_PUBLIC_API_URL` ke Railway backend URL

---

## 🔐 Environment Variables Checklist

### Backend (Railway)

```bash
DATABASE_URL=<auto-set-by-railway>
JWT_SECRET=<generate-random-32-chars>
GOOGLE_CLIENT_ID=<from-google-console>
GOOGLE_CLIENT_SECRET=<from-google-console>
GOOGLE_CALLBACK_URL=https://your-backend.railway.app/auth/google/callback
MAILERSEND_API_KEY=<from-mailersend>
EMAIL_FROM=noreply@yourdomain.com
FRONTEND_URL=https://your-frontend.vercel.app
PORT=3001
```

### Frontend (Vercel)

```bash
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

---

## 🧪 Test Production Build Locally

Sebelum deploy, test dulu di local:

### Backend

```bash
cd Website-Dashboard/backend
npm run build
npm run start:prod
```

### Frontend

```bash
cd Website-Dashboard/frontend
npm run build
npm start
```

---

## 📊 Monitoring

### Railway
- Logs: `railway logs`
- Dashboard: https://railway.app/dashboard

### Vercel
- Logs: Vercel Dashboard → Deployments
- Analytics: Vercel Dashboard → Analytics

---

## 🆘 Troubleshooting

### Backend tidak bisa connect ke database
```bash
railway logs
```
Check DATABASE_URL di environment variables

### Frontend tidak bisa fetch API
- Verify `NEXT_PUBLIC_API_URL` di Vercel
- Check CORS settings di backend
- Pastikan backend accessible

### Google OAuth error
- Update redirect URIs di Google Console
- Verify `GOOGLE_CALLBACK_URL` sama dengan yang di Google Console

---

## 📚 Resources

- **Full Deployment Guide:** `DEPLOYMENT_GUIDE.md`
- **Deployment Workflow:** `.agent/workflows/deploy.md`
- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs
- **Google OAuth Setup:** `GOOGLE_OAUTH_SETUP.md`

---

## 🎯 Recommended Flow

1. ✅ Test production build locally
2. ✅ Deploy backend ke Railway
3. ✅ Deploy frontend ke Vercel
4. ✅ Set all environment variables
5. ✅ Update Google OAuth settings
6. ✅ Test live application
7. ✅ Setup custom domain (optional)
8. ✅ Setup monitoring & backups

---

**Need help?** Check the full guides or Railway/Vercel documentation.

**Ready to deploy?** Run: `cd Website-Dashboard/backend && railway login`
