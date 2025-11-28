# 🚀 Manual Deployment Steps - Akuntasi Mitra

Jika automated deployment mengalami masalah, ikuti langkah manual ini.

---

## ✅ Backend Sudah Deployed!

**Backend URL:** `https://akuntasi-mitra-production.up.railway.app`  
**Status:** ✅ Running di Railway  
**Database:** PostgreSQL (Railway)

---

## 📱 Deploy Frontend ke Vercel (Manual)

### Opsi 1: Via Vercel Dashboard (Termudah)

1. **Buka Vercel Dashboard**
   - https://vercel.com/dashboard

2. **Import Project**
   - Klik "Add New..." → "Project"
   - Klik "Import Git Repository"
   - Pilih repository: `rivzee/Akuntasi-Mitra`
   - Klik "Import"

3. **Configure Project**
   - **Framework Preset:** Next.js
   - **Root Directory:** `Website-Dashboard/frontend`
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

4. **Add Environment Variable**
   - Klik "Environment Variables"
   - Add variable:
     - **Name:** `NEXT_PUBLIC_API_URL`
     - **Value:** `https://akuntasi-mitra-production.up.railway.app`
     - **Environments:** Production, Preview, Development (pilih semua)

5. **Deploy**
   - Klik "Deploy"
   - Tunggu 2-3 menit
   - Catat URL yang diberikan (misal: `akuntasi-mitra-frontend.vercel.app`)

---

### Opsi 2: Via Vercel CLI

Jika CLI sudah login:

```bash
cd Website-Dashboard/frontend

# Deploy
vercel

# Jawab pertanyaan:
# - Set up and deploy? Y
# - Which scope? [Pilih akun Anda]
# - Link to existing project? N
# - Project name? akuntasi-mitra-frontend
# - In which directory is your code located? ./
# - Want to override settings? N

# Set environment variable
vercel env add NEXT_PUBLIC_API_URL
# Masukkan: https://akuntasi-mitra-production.up.railway.app
# Pilih: Production, Preview, Development

# Deploy to production
vercel --prod
```

---

## 🔧 Post-Deployment Configuration

Setelah frontend deploy, **CATAT URL FRONTEND** (misal: `https://akuntasi-mitra-frontend.vercel.app`)

### 1. Update Railway Environment Variables

```bash
cd Website-Dashboard/backend

# Update FRONTEND_URL
railway variables set FRONTEND_URL="https://akuntasi-mitra-frontend.vercel.app"

# Update GOOGLE_CALLBACK_URL
railway variables set GOOGLE_CALLBACK_URL="https://akuntasi-mitra-production.up.railway.app/auth/google/callback"
```

Atau via Railway Dashboard:
1. Buka https://railway.app/dashboard
2. Pilih project "empowering-flexibility"
3. Klik service "Akuntasi-Mitra"
4. Klik tab "Variables"
5. Edit `FRONTEND_URL` → `https://akuntasi-mitra-frontend.vercel.app`
6. Edit `GOOGLE_CALLBACK_URL` → `https://akuntasi-mitra-production.up.railway.app/auth/google/callback`
7. Klik "Deploy" untuk apply changes

---

### 2. Update Google OAuth Console

1. **Buka Google Cloud Console**
   - https://console.cloud.google.com/apis/credentials

2. **Pilih OAuth 2.0 Client ID Anda**

3. **Update Authorized JavaScript origins**
   - Tambahkan: `https://akuntasi-mitra-frontend.vercel.app`
   - (Jangan hapus yang lama, tambahkan saja)

4. **Update Authorized redirect URIs**
   - Tambahkan: `https://akuntasi-mitra-production.up.railway.app/auth/google/callback`
   - (Jangan hapus yang lama, tambahkan saja)

5. **Save**

---

## 🧪 Testing Deployment

### 1. Test Backend

Buka browser: `https://akuntasi-mitra-production.up.railway.app`

Jika muncul response (bukan 502), backend berjalan!

### 2. Test Frontend

Buka browser: `https://akuntasi-mitra-frontend.vercel.app`

Seharusnya muncul landing page aplikasi.

### 3. Test Login

1. **Login dengan Email/Password**
   - Email: `admin@akuntasi.com`
   - Password: `admin123`

2. **Login dengan Google OAuth**
   - Klik "Login with Google"
   - Pilih akun Google
   - Seharusnya berhasil login

### 4. Test Fitur Utama

- ✅ Dashboard loading
- ✅ Create order
- ✅ Upload document
- ✅ View payments
- ✅ Manage users (admin)

---

## 🐛 Troubleshooting

### Frontend tidak bisa fetch API

**Cek:**
1. `NEXT_PUBLIC_API_URL` di Vercel benar
2. Backend URL accessible
3. CORS settings di backend

**Fix:**
- Redeploy frontend setelah update env var
- Check browser console untuk error

### Google OAuth Error

**Cek:**
1. Redirect URI di Google Console sama persis
2. `GOOGLE_CLIENT_ID` dan `GOOGLE_CLIENT_SECRET` benar
3. `GOOGLE_CALLBACK_URL` di Railway benar

**Fix:**
- Update Google Console dengan URL production
- Restart Railway service

### Backend Crashed

**Cek Railway Logs:**
```bash
cd Website-Dashboard/backend
railway logs
```

**Common Issues:**
- DATABASE_URL tidak ter-set
- Prisma migration belum jalan
- Environment variables salah

**Fix:**
- Check semua env vars di Railway dashboard
- Redeploy service

---

## 📊 Deployment Checklist

- [ ] Backend deployed ke Railway
- [ ] PostgreSQL database created
- [ ] All environment variables set di Railway
- [ ] Frontend deployed ke Vercel
- [ ] `NEXT_PUBLIC_API_URL` set di Vercel
- [ ] `FRONTEND_URL` updated di Railway
- [ ] `GOOGLE_CALLBACK_URL` updated di Railway
- [ ] Google OAuth redirect URIs updated
- [ ] Test login dengan email/password
- [ ] Test login dengan Google OAuth
- [ ] Test semua fitur utama

---

## 🎯 URLs Summary

**Backend (Railway):**
- URL: `https://akuntasi-mitra-production.up.railway.app`
- Dashboard: https://railway.app/dashboard

**Frontend (Vercel):**
- URL: `https://akuntasi-mitra-frontend.vercel.app` (atau URL yang Anda dapat)
- Dashboard: https://vercel.com/dashboard

**Google OAuth:**
- Console: https://console.cloud.google.com/apis/credentials

---

## 🆘 Need Help?

1. Check Railway logs: `railway logs`
2. Check Vercel deployment logs di dashboard
3. Check browser console untuk frontend errors
4. Review `DEPLOYMENT_GUIDE.md` untuk detail lengkap

---

**Good luck! 🚀**
