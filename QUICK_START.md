# 🚀 Quick Start Script - Fullstack Setup

Jalankan script ini untuk setup fullstack project secara otomatis.

---

## Setup Backend

```powershell
# Navigate to backend
cd Website-Dashboard\backend

# Install dependencies
npm install

# Setup environment (copy dan edit manual)
# Copy .env.example to .env, then edit:
# - GOOGLE_CLIENT_ID
# - GOOGLE_CLIENT_SECRET
# - JWT_SECRET (optional, sudah ada default)

# Generate Prisma client
npx prisma generate

# Run database migration
npx prisma migrate dev --name init

# Seed database with initial data
npx prisma db seed

# Start backend server
npm run start:dev
```

Backend akan running di: **http://localhost:3001**

---

## Setup Frontend

**Buka terminal baru:**

```powershell
# Navigate to frontend
cd Website-Dashboard\frontend

# Install dependencies
npm install

# Create .env.local file
echo NEXT_PUBLIC_API_URL=http://localhost:3001 > .env.local
echo NEXT_PUBLIC_APP_NAME=Akuntasi Mitra >> .env.local
echo NEXT_PUBLIC_APP_VERSION=1.0.0 >> .env.local

# Start frontend server
npm run dev
```

Frontend akan running di: **http://localhost:3000**

---

## Test Login

Buka browser: **http://localhost:3000/login**

**Default Credentials:**

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

---

## Prisma Studio (Optional)

**Buka terminal ketiga:**

```powershell
cd Website-Dashboard\backend
npx prisma studio
```

Prisma Studio akan running di: **http://localhost:5555**

---

## Environment Variables

### Backend (.env)

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="akuntasi-mitra-super-secret-key-2025-production-12345678"
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3001/auth/google/callback"
MAILERSEND_API_KEY="mlsn.xxxxxxxx"
EMAIL_FROM="noreply@akuntasi-mitra.com"
FRONTEND_URL="http://localhost:3000"
PORT=3001
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Akuntasi Mitra
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
NEXT_PUBLIC_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg,application/pdf
```

---

## Troubleshooting

### Backend tidak bisa start

```powershell
cd Website-Dashboard\backend
rm -rf node_modules
rm package-lock.json
npm install
npx prisma generate
npm run start:dev
```

### Frontend tidak bisa start

```powershell
cd Website-Dashboard\frontend
rm -rf node_modules
rm -rf .next
rm package-lock.json
npm install
npm run dev
```

### Database error

```powershell
cd Website-Dashboard\backend
rm prisma\dev.db
npx prisma migrate reset
npx prisma db seed
```

---

**Selamat! Fullstack project sudah siap! 🎉**
