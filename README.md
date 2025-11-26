# 🧾 Akuntasi Mitra - Sistem Manajemen Akuntansi

Platform manajemen akuntansi modern untuk menghubungkan klien dengan akuntan profesional.

![Status](https://img.shields.io/badge/status-production--ready-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

---

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Deployment](#-deployment)
- [Dokumentasi](#-dokumentasi)
- [Struktur Project](#-struktur-project)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Fitur Utama

### 👤 Untuk Klien
- 📝 Order layanan akuntansi
- 📤 Upload dokumen keuangan
- 💳 Pembayaran online
- 📊 Tracking progress pekerjaan
- 📥 Download hasil laporan

### 👨‍💼 Untuk Akuntan
- 📋 Kelola order klien
- 📂 Akses dokumen klien
- 📤 Upload hasil pekerjaan
- ⏱️ Tracking waktu kerja
- 💰 Lihat pendapatan

### 🔐 Untuk Admin
- 👥 Kelola user (Klien & Akuntan)
- 📦 Kelola paket layanan
- 💵 Kelola pembayaran
- 📈 Dashboard analytics
- 📊 Laporan aktivitas

### 🌟 Fitur Tambahan
- 🔐 Google OAuth Login
- 📧 Email notifications
- 🎨 Modern & responsive UI
- 🌙 Dark mode support
- 📱 Mobile-friendly
- 🔒 Secure authentication
- 📊 Real-time updates

---

## 🛠️ Tech Stack

### Backend
- **Framework:** NestJS 11
- **Database:** PostgreSQL (Production) / SQLite (Development)
- **ORM:** Prisma
- **Authentication:** JWT + Passport
- **Email:** MailerSend
- **Language:** TypeScript

### Frontend
- **Framework:** Next.js 14
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **State Management:** React Query (TanStack Query)
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Language:** TypeScript

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- npm atau yarn
- Git

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/akuntasi-mitra.git
   cd akuntasi-mitra
   ```

2. **Setup Backend**
   ```bash
   cd Website-Dashboard/backend
   npm install
   
   # Copy environment variables
   cp .env.example .env
   # Edit .env dengan credentials Anda
   
   # Setup database
   npx prisma migrate dev
   npx prisma db seed
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   
   # Copy environment variables
   cp .env.example .env.local
   # Edit .env.local dengan API URL
   ```

4. **Run Development**
   
   Terminal 1 (Backend):
   ```bash
   cd Website-Dashboard/backend
   npm run start:dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd Website-Dashboard/frontend
   npm run dev
   ```

5. **Open Browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

### Default Login Credentials

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

## 🌐 Deployment

### Quick Deploy (Recommended)

**Vercel (Frontend) + Railway (Backend)**

```bash
# Install CLI tools
npm install -g vercel @railway/cli

# Deploy Backend
cd Website-Dashboard/backend
railway login
railway init
railway add  # Pilih PostgreSQL
railway up

# Deploy Frontend
cd ../frontend
vercel login
vercel --prod
```

### Dokumentasi Deployment

- **Quick Guide:** [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)
- **Full Guide:** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Workflow:** [.agent/workflows/deploy.md](./.agent/workflows/deploy.md)

### Platform Options

| Platform | Frontend | Backend | Database | Biaya |
|----------|----------|---------|----------|-------|
| Vercel + Railway | ✅ | ✅ | ✅ | $0-10/bulan |
| VPS (DigitalOcean) | ✅ | ✅ | ✅ | $6-12/bulan |
| Docker | ✅ | ✅ | ✅ | Varies |

---

## 📚 Dokumentasi

### Setup Guides
- [Google OAuth Setup](./GOOGLE_OAUTH_SETUP.md)
- [Email Setup](./EMAIL_SETUP.md)
- [Testing Register](./TESTING_REGISTER.md)
- [Panduan Komponen Responsif](./PANDUAN_KOMPONEN_RESPONSIF.md)

### Implementation
- [Frontend Implementation Guide](./Website-Dashboard/frontend/IMPLEMENTATION_GUIDE.md)
- [UI/UX Improvements](./PENINGKATAN_UI_UX.md)

---

## 📁 Struktur Project

```
akuntasi-mitra/
├── Website-Dashboard/
│   ├── backend/                 # NestJS Backend
│   │   ├── src/
│   │   │   ├── auth/           # Authentication module
│   │   │   ├── users/          # Users module
│   │   │   ├── orders/         # Orders module
│   │   │   ├── payments/       # Payments module
│   │   │   ├── services/       # Services module
│   │   │   ├── documents/      # Documents module
│   │   │   └── prisma/         # Prisma service
│   │   ├── prisma/
│   │   │   ├── schema.prisma   # Database schema
│   │   │   └── seed.ts         # Database seeder
│   │   └── package.json
│   │
│   └── frontend/               # Next.js Frontend
│       ├── src/
│       │   ├── app/            # App router pages
│       │   │   ├── dashboard/  # Dashboard pages
│       │   │   ├── login/      # Login page
│       │   │   └── register/   # Register page
│       │   ├── components/     # Reusable components
│       │   ├── utils/          # Utility functions
│       │   └── lib/            # Libraries & configs
│       └── package.json
│
├── .agent/
│   └── workflows/
│       └── deploy.md           # Deployment workflow
│
├── DEPLOYMENT_GUIDE.md         # Full deployment guide
├── QUICK_DEPLOY.md            # Quick deployment guide
├── README.md                  # This file
└── .gitignore
```

---

## 🔐 Environment Variables

### Backend (.env)

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# JWT
JWT_SECRET="your-secret-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3001/auth/google/callback"

# Email
MAILERSEND_API_KEY="your-api-key"
EMAIL_FROM="noreply@yourdomain.com"

# Frontend
FRONTEND_URL="http://localhost:3000"

# Port
PORT=3001
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

---

## 📡 API Documentation

### Authentication

```
POST   /auth/register          # Register new user
POST   /auth/login             # Login with email/password
GET    /auth/google            # Login with Google
GET    /auth/google/callback   # Google OAuth callback
GET    /auth/profile           # Get current user profile
```

### Users

```
GET    /users                  # Get all users (Admin only)
GET    /users/:id              # Get user by ID
PATCH  /users/:id              # Update user
DELETE /users/:id              # Delete user (Admin only)
```

### Orders

```
GET    /orders                 # Get all orders
POST   /orders                 # Create new order
GET    /orders/:id             # Get order by ID
PATCH  /orders/:id             # Update order
DELETE /orders/:id             # Delete order
```

### Payments

```
GET    /payments               # Get all payments
POST   /payments               # Create payment
GET    /payments/:id           # Get payment by ID
PATCH  /payments/:id           # Update payment status
```

### Services

```
GET    /services               # Get all service packages
POST   /services               # Create service package
GET    /services/:id           # Get service by ID
PATCH  /services/:id           # Update service
DELETE /services/:id           # Delete service
```

---

## 🧪 Testing

### Backend Tests

```bash
cd Website-Dashboard/backend

# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Frontend Tests

```bash
cd Website-Dashboard/frontend

# Run tests (if configured)
npm run test
```

---

## 🔧 Development

### Backend Development

```bash
cd Website-Dashboard/backend

# Development mode with hot reload
npm run start:dev

# Debug mode
npm run start:debug

# Production build
npm run build
npm run start:prod
```

### Frontend Development

```bash
cd Website-Dashboard/frontend

# Development server
npm run dev

# Production build
npm run build
npm start

# Lint
npm run lint
```

### Database Management

```bash
cd Website-Dashboard/backend

# Create migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Reset database
npx prisma migrate reset

# Seed database
npx prisma db seed

# Open Prisma Studio
npx prisma studio
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Developer:** Your Name
- **Contact:** your.email@example.com

---

## 🙏 Acknowledgments

- NestJS Team
- Next.js Team
- Prisma Team
- All open source contributors

---

## 📞 Support

Jika ada pertanyaan atau masalah:

1. Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. Check [Issues](https://github.com/YOUR_USERNAME/akuntasi-mitra/issues)
3. Create new issue

---

**Made with ❤️ for better accounting management**
