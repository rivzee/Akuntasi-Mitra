# 🚀 Panduan Deployment - Akuntasi Mitra

Panduan lengkap untuk deploy aplikasi **Akuntasi Mitra** (NestJS Backend + Next.js Frontend) ke production.

---

## 📋 Daftar Isi

1. [Persiapan Sebelum Deploy](#persiapan-sebelum-deploy)
2. [Opsi Deployment](#opsi-deployment)
   - [Vercel (Recommended untuk Frontend)](#1-vercel-recommended-untuk-frontend)
   - [Railway (Full Stack)](#2-railway-full-stack)
   - [VPS/Cloud Server](#3-vpscloud-server)
   - [Docker](#4-docker)
3. [Environment Variables](#environment-variables)
4. [Database Migration](#database-migration)
5. [Testing Production Build](#testing-production-build)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 Persiapan Sebelum Deploy

### 1. Checklist Umum

- [ ] Pastikan semua fitur berfungsi di local
- [ ] Test production build di local
- [ ] Siapkan database production (PostgreSQL/MySQL untuk production)
- [ ] Siapkan environment variables
- [ ] Setup Google OAuth credentials untuk production domain
- [ ] Setup email service (MailerSend) untuk production

### 2. Update Database untuk Production

**PENTING**: SQLite tidak cocok untuk production. Ganti dengan PostgreSQL atau MySQL.

#### Ubah Prisma Schema

Edit `backend/prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // atau "mysql"
  url      = env("DATABASE_URL")
}
```

#### Install Database Driver

```bash
# Untuk PostgreSQL
cd backend
npm install pg

# Untuk MySQL
npm install mysql2
```

---

## 🌐 Opsi Deployment

### 1. Vercel (Recommended untuk Frontend)

**Cocok untuk**: Frontend Next.js (gratis untuk hobby projects)

#### A. Deploy Frontend ke Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login ke Vercel**
   ```bash
   vercel login
   ```

3. **Deploy Frontend**
   ```bash
   cd Website-Dashboard/frontend
   vercel
   ```

4. **Set Environment Variables di Vercel Dashboard**
   - Buka [vercel.com/dashboard](https://vercel.com/dashboard)
   - Pilih project Anda
   - Settings → Environment Variables
   - Tambahkan:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-url.com
     ```

5. **Deploy Production**
   ```bash
   vercel --prod
   ```

#### B. Deploy Backend (Pilih salah satu)

**Opsi 1: Railway** (Recommended)
- Lihat [Railway Full Stack](#2-railway-full-stack)

**Opsi 2: Render.com**
- Gratis untuk backend
- Support PostgreSQL gratis
- Mudah setup

**Opsi 3: Heroku**
- Berbayar (mulai $5/bulan)
- Reliable dan mudah

---

### 2. Railway (Full Stack)

**Cocok untuk**: Deploy backend + frontend + database dalam satu platform

#### Setup Railway

1. **Buat Akun di Railway**
   - Kunjungi [railway.app](https://railway.app)
   - Sign up dengan GitHub

2. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

3. **Login**
   ```bash
   railway login
   ```

#### Deploy Backend

1. **Buat Project Baru**
   ```bash
   cd Website-Dashboard/backend
   railway init
   ```

2. **Tambahkan PostgreSQL Database**
   ```bash
   railway add --database postgresql
   ```

3. **Set Environment Variables**
   ```bash
   railway variables set JWT_SECRET="your-secret-key-here"
   railway variables set GOOGLE_CLIENT_ID="your-google-client-id"
   railway variables set GOOGLE_CLIENT_SECRET="your-google-client-secret"
   railway variables set MAILERSEND_API_KEY="your-mailersend-key"
   railway variables set FRONTEND_URL="https://your-frontend-url.vercel.app"
   ```

4. **Deploy**
   ```bash
   railway up
   ```

5. **Run Migrations**
   ```bash
   railway run npx prisma migrate deploy
   railway run npx prisma db seed
   ```

#### Deploy Frontend

1. **Buat Project Baru**
   ```bash
   cd Website-Dashboard/frontend
   railway init
   ```

2. **Set Environment Variables**
   ```bash
   railway variables set NEXT_PUBLIC_API_URL="https://your-backend-url.railway.app"
   ```

3. **Deploy**
   ```bash
   railway up
   ```

---

### 3. VPS/Cloud Server

**Cocok untuk**: Full control, custom setup (DigitalOcean, AWS EC2, Google Cloud, dll)

#### Persiapan Server

1. **Buat VPS** (Ubuntu 22.04 LTS recommended)
2. **SSH ke Server**
   ```bash
   ssh root@your-server-ip
   ```

3. **Install Dependencies**
   ```bash
   # Update system
   apt update && apt upgrade -y
   
   # Install Node.js 20.x
   curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
   apt install -y nodejs
   
   # Install PostgreSQL
   apt install -y postgresql postgresql-contrib
   
   # Install Nginx
   apt install -y nginx
   
   # Install PM2
   npm install -g pm2
   ```

#### Setup Database

```bash
# Login ke PostgreSQL
sudo -u postgres psql

# Buat database dan user
CREATE DATABASE akuntasi_mitra;
CREATE USER mitra_user WITH PASSWORD 'your-strong-password';
GRANT ALL PRIVILEGES ON DATABASE akuntasi_mitra TO mitra_user;
\q
```

#### Deploy Backend

```bash
# Clone repository atau upload files
cd /var/www
git clone your-repo-url
cd Akuntasi-Mitra/Website-Dashboard/backend

# Install dependencies
npm install

# Setup .env
nano .env
```

Isi `.env`:
```env
DATABASE_URL="postgresql://mitra_user:your-strong-password@localhost:5432/akuntasi_mitra"
JWT_SECRET="your-jwt-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
MAILERSEND_API_KEY="your-mailersend-key"
FRONTEND_URL="https://yourdomain.com"
PORT=3001
```

```bash
# Run migrations
npx prisma migrate deploy
npx prisma db seed

# Build
npm run build

# Start with PM2
pm2 start dist/main.js --name backend
pm2 save
pm2 startup
```

#### Deploy Frontend

```bash
cd /var/www/Akuntasi-Mitra/Website-Dashboard/frontend

# Install dependencies
npm install

# Setup .env.local
nano .env.local
```

Isi `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

```bash
# Build
npm run build

# Start with PM2
pm2 start npm --name frontend -- start
pm2 save
```

#### Setup Nginx

```bash
nano /etc/nginx/sites-available/akuntasi-mitra
```

Isi konfigurasi:
```nginx
# Backend
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
ln -s /etc/nginx/sites-available/akuntasi-mitra /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

#### Setup SSL dengan Let's Encrypt

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificates
certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com

# Auto-renewal
certbot renew --dry-run
```

---

### 4. Docker

**Cocok untuk**: Deployment yang konsisten di berbagai environment

#### Backend Dockerfile

Buat `backend/Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build
RUN npm run build

# Expose port
EXPOSE 3001

# Start
CMD ["npm", "run", "start:prod"]
```

#### Frontend Dockerfile

Buat `frontend/Dockerfile`:

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
```

#### Docker Compose

Buat `docker-compose.yml` di root:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: akuntasi_mitra
      POSTGRES_USER: mitra_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./Website-Dashboard/backend
    ports:
      - "3001:3001"
    environment:
      DATABASE_URL: postgresql://mitra_user:${DB_PASSWORD}@postgres:5432/akuntasi_mitra
      JWT_SECRET: ${JWT_SECRET}
      GOOGLE_CLIENT_ID: ${GOOGLE_CLIENT_ID}
      GOOGLE_CLIENT_SECRET: ${GOOGLE_CLIENT_SECRET}
      MAILERSEND_API_KEY: ${MAILERSEND_API_KEY}
      FRONTEND_URL: ${FRONTEND_URL}
    depends_on:
      - postgres
    command: sh -c "npx prisma migrate deploy && npx prisma db seed && npm run start:prod"

  frontend:
    build: ./Website-Dashboard/frontend
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: ${NEXT_PUBLIC_API_URL}
    depends_on:
      - backend

volumes:
  postgres_data:
```

#### Deploy dengan Docker

```bash
# Build dan start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="https://api.yourdomain.com/auth/google/callback"

# Email
MAILERSEND_API_KEY="your-mailersend-api-key"
EMAIL_FROM="noreply@yourdomain.com"

# Frontend URL
FRONTEND_URL="https://yourdomain.com"

# Port
PORT=3001
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

---

## 🗄️ Database Migration

### Production Migration

```bash
# Generate migration
npx prisma migrate dev --name init

# Deploy to production
npx prisma migrate deploy

# Seed database
npx prisma db seed
```

### Backup Database

```bash
# PostgreSQL backup
pg_dump -U mitra_user akuntasi_mitra > backup.sql

# Restore
psql -U mitra_user akuntasi_mitra < backup.sql
```

---

## 🧪 Testing Production Build

### Test Backend Locally

```bash
cd backend

# Build
npm run build

# Run production
npm run start:prod
```

### Test Frontend Locally

```bash
cd frontend

# Build
npm run build

# Run production
npm start
```

---

## 🔍 Troubleshooting

### Backend tidak bisa connect ke database

```bash
# Check connection string
echo $DATABASE_URL

# Test PostgreSQL connection
psql $DATABASE_URL

# Check Prisma Client
npx prisma generate
```

### Frontend tidak bisa fetch API

- Pastikan `NEXT_PUBLIC_API_URL` benar
- Check CORS settings di backend
- Verify API endpoint accessible

### Google OAuth Error

- Update Authorized redirect URIs di Google Console
- Add production URLs:
  - `https://api.yourdomain.com/auth/google/callback`
- Update Authorized JavaScript origins:
  - `https://yourdomain.com`

### PM2 Process Crashed

```bash
# Check logs
pm2 logs

# Restart
pm2 restart all

# Monitor
pm2 monit
```

---

## 📊 Monitoring & Maintenance

### Setup Monitoring

```bash
# PM2 monitoring
pm2 install pm2-logrotate

# Check status
pm2 status

# Monitor resources
pm2 monit
```

### Regular Maintenance

```bash
# Update dependencies
npm update

# Clean cache
npm cache clean --force

# Restart services
pm2 restart all
```

---

## 🎯 Rekomendasi Platform

| Platform | Frontend | Backend | Database | Harga | Cocok Untuk |
|----------|----------|---------|----------|-------|-------------|
| **Vercel + Railway** | ✅ | ✅ | ✅ | $5-10/bulan | Startup, MVP |
| **Railway** | ✅ | ✅ | ✅ | $5-20/bulan | Small-Medium |
| **VPS (DigitalOcean)** | ✅ | ✅ | ✅ | $6-12/bulan | Full Control |
| **Docker + VPS** | ✅ | ✅ | ✅ | $6-12/bulan | Scalable |

---

## 📞 Support

Jika ada pertanyaan atau masalah saat deployment, silakan:
1. Check dokumentasi platform yang digunakan
2. Review error logs dengan teliti
3. Pastikan semua environment variables sudah benar

---

**Good luck dengan deployment! 🚀**
