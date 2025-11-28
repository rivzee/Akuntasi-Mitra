# ✅ Fullstack Setup Checklist - Akuntasi Mitra

Panduan lengkap untuk memastikan backend dan frontend terintegrasi dengan sempurna.

---

## 📋 Status Project

### Backend (NestJS) ✅
- [x] NestJS 11 installed
- [x] Prisma ORM configured
- [x] Authentication modules (JWT + Google OAuth)
- [x] CORS enabled
- [x] API endpoints ready
- [ ] Environment variables configured
- [ ] Database migrated
- [ ] Running on port 3001

### Frontend (Next.js) ✅
- [x] Next.js 14 installed
- [x] Tailwind CSS configured
- [x] API config setup
- [x] Components ready
- [ ] Environment variables configured
- [ ] Connected to backend
- [ ] Running on port 3000

---

## 🚀 Setup Steps

### Step 1: Backend Environment Setup

**File: `Website-Dashboard/backend/.env`**

```env
# Database (Development - SQLite)
DATABASE_URL="file:./dev.db"

# Database (Production - PostgreSQL)
# DATABASE_URL="postgresql://user:password@localhost:5432/akuntasi_mitra"

# JWT Secret
JWT_SECRET="akuntasi-mitra-super-secret-key-2025-production-12345678"

# Google OAuth (Get from https://console.cloud.google.com)
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3001/auth/google/callback"

# Email Service (MailerSend)
MAILERSEND_API_KEY="mlsn.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
EMAIL_FROM="noreply@akuntasi-mitra.com"

# Frontend URL
FRONTEND_URL="http://localhost:3000"

# Server Port
PORT=3001
```

**Action Required:**
1. ✅ Copy `.env.example` to `.env`
2. ⚠️ Update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
3. ⚠️ Update `MAILERSEND_API_KEY` (optional untuk development)

---

### Step 2: Frontend Environment Setup

**File: `Website-Dashboard/frontend/.env.local`**

```env
# Backend API URL
NEXT_PUBLIC_API_URL="http://localhost:3001"

# App Configuration
NEXT_PUBLIC_APP_NAME="Akuntasi Mitra"
NEXT_PUBLIC_APP_VERSION="1.0.0"

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true

# File Upload
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
NEXT_PUBLIC_ALLOWED_FILE_TYPES="image/jpeg,image/png,image/jpg,application/pdf"
```

**Action Required:**
1. ✅ Create `.env.local` file
2. ✅ Set `NEXT_PUBLIC_API_URL` to backend URL

---

### Step 3: Database Setup

**Commands:**

```bash
# Navigate to backend
cd Website-Dashboard/backend

# Install dependencies (if not done)
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database with initial data
npx prisma db seed
```

**Expected Result:**
- ✅ Database created (`dev.db` for SQLite)
- ✅ Tables created (users, orders, payments, services, etc.)
- ✅ Seed data inserted (admin, akuntan, klien users)

---

### Step 4: Start Backend Server

**Commands:**

```bash
# From backend directory
npm run start:dev
```

**Expected Output:**
```
✅ GOOGLE_CLIENT_ID is loaded: 1234567890...
------------------------------------------------
[Nest] Application successfully started
[Nest] Listening on http://localhost:3001
```

**Test Backend:**
Open browser: http://localhost:3001
- Should see: "Cannot GET /" or similar (this is OK!)

**Test API:**
- http://localhost:3001/auth/profile (should return 401 Unauthorized - OK!)
- http://localhost:3001/services (should return services list)

---

### Step 5: Start Frontend Server

**Commands:**

```bash
# Navigate to frontend (new terminal)
cd Website-Dashboard/frontend

# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
✓ Ready in 2.5s
○ Local: http://localhost:3000
```

**Test Frontend:**
Open browser: http://localhost:3000
- Should see: Landing page or login page

---

### Step 6: Test Fullstack Integration

#### Test 1: Login with Default Credentials

**URL:** http://localhost:3000/login

**Credentials:**
```
Admin:
Email: admin@akuntasi.com
Password: admin123

Akuntan:
Email: akuntan@akuntasi.com
Password: akuntan123

Klien:
Email: klien@akuntasi.com
Password: klien123
```

**Expected:**
- ✅ Login successful
- ✅ Redirect to dashboard
- ✅ User data displayed

#### Test 2: API Communication

**Open Browser DevTools (F12) → Network Tab**

Login and check:
- ✅ POST request to `http://localhost:3001/auth/login`
- ✅ Response status: 200 OK
- ✅ Response contains: `{ access_token: "...", user: {...} }`

#### Test 3: Dashboard Features

After login, test:
- ✅ Dashboard loads
- ✅ Statistics displayed
- ✅ Tables show data
- ✅ No CORS errors in console

---

## 🔧 Troubleshooting

### Problem 1: CORS Error

**Error:**
```
Access to fetch at 'http://localhost:3001/auth/login' from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

**Solution:**
Backend `main.ts` should have:
```typescript
app.enableCors();
```

Or with options:
```typescript
app.enableCors({
  origin: 'http://localhost:3000',
  credentials: true,
});
```

---

### Problem 2: Connection Refused

**Error:**
```
Failed to fetch
net::ERR_CONNECTION_REFUSED
```

**Solution:**
1. Check backend is running on port 3001
2. Check `NEXT_PUBLIC_API_URL` in frontend `.env.local`
3. Restart both servers

---

### Problem 3: 401 Unauthorized

**Error:**
```
401 Unauthorized
```

**Solution:**
1. Check credentials are correct
2. Check JWT_SECRET is set in backend `.env`
3. Check database has seed data
4. Run: `npx prisma db seed`

---

### Problem 4: Database Error

**Error:**
```
PrismaClientInitializationError
```

**Solution:**
```bash
cd Website-Dashboard/backend
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

---

### Problem 5: Google OAuth Not Working

**Error:**
```
invalid_client
```

**Solution:**
1. Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`
2. Setup Google OAuth: See `GOOGLE_OAUTH_SETUP.md`
3. Add authorized redirect URI: `http://localhost:3001/auth/google/callback`

---

## 📊 Integration Checklist

### Backend ✅
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file configured
- [ ] Database migrated (`npx prisma migrate dev`)
- [ ] Database seeded (`npx prisma db seed`)
- [ ] Server running on port 3001
- [ ] CORS enabled
- [ ] API endpoints responding

### Frontend ✅
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` file created
- [ ] `NEXT_PUBLIC_API_URL` set correctly
- [ ] Server running on port 3000
- [ ] Can access login page
- [ ] No build errors

### Integration ✅
- [ ] Frontend can call backend API
- [ ] Login works
- [ ] Dashboard loads
- [ ] Data displays correctly
- [ ] No CORS errors
- [ ] No console errors

---

## 🎯 Quick Start Commands

**Terminal 1 (Backend):**
```bash
cd Website-Dashboard/backend
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

**Terminal 2 (Frontend):**
```bash
cd Website-Dashboard/frontend
npm install
npm run dev
```

**Terminal 3 (Optional - Prisma Studio):**
```bash
cd Website-Dashboard/backend
npx prisma studio
```

---

## 🌐 URLs

| Service | URL | Status |
|---------|-----|--------|
| Frontend | http://localhost:3000 | ⏳ |
| Backend API | http://localhost:3001 | ⏳ |
| Prisma Studio | http://localhost:5555 | ⏳ |

---

## 📝 Next Steps After Setup

1. ✅ Test all user roles (Admin, Akuntan, Klien)
2. ✅ Test CRUD operations
3. ✅ Test file upload
4. ✅ Test payment flow
5. ✅ Setup Google OAuth (optional)
6. ✅ Setup Email service (optional)
7. 🚀 Deploy to production

---

## 🆘 Need Help?

Check these files:
- `README.md` - General overview
- `DEPLOY_NOW.md` - Deployment guide
- `GOOGLE_OAUTH_SETUP.md` - Google OAuth setup
- `EMAIL_SETUP.md` - Email configuration

---

**Ready to start? Run the Quick Start Commands above! 🚀**
