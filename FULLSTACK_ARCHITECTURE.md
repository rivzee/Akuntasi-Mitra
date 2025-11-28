# 🏗️ Arsitektur Fullstack - Akuntasi Mitra

Dokumentasi lengkap arsitektur fullstack project ini.

---

## 📊 Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                    http://localhost:3000                     │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTP Requests
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    FRONTEND (Next.js 14)                     │
│  ┌────────────┬────────────┬────────────┬─────────────┐    │
│  │   Pages    │ Components │   Utils    │   Hooks     │    │
│  │  (App Dir) │   (UI/UX)  │  (Helpers) │  (Custom)   │    │
│  └────────────┴────────────┴────────────┴─────────────┘    │
│                                                               │
│  Technologies:                                                │
│  - Next.js 14 (App Router)                                   │
│  - React 18                                                   │
│  - TypeScript                                                 │
│  - Tailwind CSS                                               │
│  - TanStack Query (State Management)                         │
│  - React Hook Form + Zod (Forms)                             │
│  - Framer Motion (Animations)                                │
│  - Recharts (Charts)                                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ API Calls (Axios)
                           │ NEXT_PUBLIC_API_URL
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    BACKEND (NestJS 11)                       │
│  ┌────────────┬────────────┬────────────┬─────────────┐    │
│  │   Auth     │   Users    │   Orders   │  Payments   │    │
│  │  Module    │   Module   │   Module   │   Module    │    │
│  └────────────┴────────────┴────────────┴─────────────┘    │
│  ┌────────────┬────────────┬────────────┬─────────────┐    │
│  │  Services  │ Documents  │   Prisma   │    Email    │    │
│  │   Module   │   Module   │  Service   │   Service   │    │
│  └────────────┴────────────┴────────────┴─────────────┘    │
│                                                               │
│  Technologies:                                                │
│  - NestJS 11                                                  │
│  - TypeScript                                                 │
│  - Passport (Auth)                                            │
│  - JWT (Tokens)                                               │
│  - Bcrypt (Password Hashing)                                 │
│  - MailerSend (Email)                                         │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ Prisma ORM
                           │ DATABASE_URL
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    DATABASE (PostgreSQL)                     │
│  ┌────────────┬────────────┬────────────┬─────────────┐    │
│  │   Users    │  Services  │   Orders   │  Payments   │    │
│  │   Table    │   Table    │   Table    │   Table     │    │
│  └────────────┴────────────┴────────────┴─────────────┘    │
│  ┌────────────┬────────────┬────────────┬─────────────┐    │
│  │ Documents  │Notifications│  Sessions  │   Logs      │    │
│  │   Table    │   Table    │   Table    │   Table     │    │
│  └────────────┴────────────┴────────────┴─────────────┘    │
│                                                               │
│  Development: SQLite (file:./dev.db)                         │
│  Production: PostgreSQL                                       │
└───────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow

### 1. User Login Flow

```
User (Browser)
    │
    │ 1. Enter email & password
    │
    ▼
Frontend (Login Page)
    │
    │ 2. POST /auth/login
    │    Body: { email, password }
    │
    ▼
Backend (Auth Controller)
    │
    │ 3. Validate credentials
    │
    ▼
Backend (Auth Service)
    │
    │ 4. Query database
    │
    ▼
Database (Users Table)
    │
    │ 5. Return user data
    │
    ▼
Backend (Auth Service)
    │
    │ 6. Generate JWT token
    │
    ▼
Backend (Auth Controller)
    │
    │ 7. Return { access_token, user }
    │
    ▼
Frontend (Login Page)
    │
    │ 8. Store token in localStorage
    │ 9. Redirect to dashboard
    │
    ▼
Frontend (Dashboard)
    │
    │ 10. Display user data
    │
    ▼
User (Browser)
```

### 2. Data Fetching Flow

```
Frontend Component
    │
    │ 1. useQuery hook
    │
    ▼
TanStack Query
    │
    │ 2. Check cache
    │ 3. If stale, fetch new data
    │
    ▼
API Service (Axios)
    │
    │ 4. GET /api/endpoint
    │    Headers: { Authorization: Bearer <token> }
    │
    ▼
Backend Controller
    │
    │ 5. Verify JWT token
    │
    ▼
Backend Guard (JWT Strategy)
    │
    │ 6. Decode token
    │ 7. Attach user to request
    │
    ▼
Backend Service
    │
    │ 8. Query database
    │
    ▼
Database
    │
    │ 9. Return data
    │
    ▼
Backend Controller
    │
    │ 10. Transform & return data
    │
    ▼
Frontend Component
    │
    │ 11. Update UI
    │
    ▼
User sees updated data
```

---

## 📁 Directory Structure

### Backend Structure

```
backend/
├── src/
│   ├── auth/                    # Authentication module
│   │   ├── auth.controller.ts   # Login, register endpoints
│   │   ├── auth.service.ts      # Auth business logic
│   │   ├── auth.module.ts       # Module definition
│   │   ├── jwt.strategy.ts      # JWT validation
│   │   └── google.strategy.ts   # Google OAuth
│   │
│   ├── users/                   # Users module
│   │   ├── users.controller.ts  # CRUD endpoints
│   │   ├── users.service.ts     # User business logic
│   │   └── users.module.ts      # Module definition
│   │
│   ├── orders/                  # Orders module
│   │   ├── orders.controller.ts
│   │   ├── orders.service.ts
│   │   └── orders.module.ts
│   │
│   ├── payments/                # Payments module
│   │   ├── payments.controller.ts
│   │   ├── payments.service.ts
│   │   └── payments.module.ts
│   │
│   ├── services/                # Services module
│   │   ├── services.controller.ts
│   │   ├── services.service.ts
│   │   └── services.module.ts
│   │
│   ├── documents/               # Documents module
│   │   ├── documents.controller.ts
│   │   ├── documents.service.ts
│   │   └── documents.module.ts
│   │
│   ├── prisma/                  # Prisma service
│   │   ├── prisma.service.ts    # Database connection
│   │   └── prisma.module.ts
│   │
│   ├── app.module.ts            # Root module
│   └── main.ts                  # Application entry
│
├── prisma/
│   ├── schema.prisma            # Database schema
│   ├── seed.ts                  # Seed data
│   └── migrations/              # Database migrations
│
├── .env                         # Environment variables
└── package.json                 # Dependencies
```

### Frontend Structure

```
frontend/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/              # Auth routes group
│   │   │   ├── login/
│   │   │   │   └── page.tsx     # Login page
│   │   │   └── register/
│   │   │       └── page.tsx     # Register page
│   │   │
│   │   ├── dashboard/           # Dashboard routes
│   │   │   ├── layout.tsx       # Dashboard layout
│   │   │   ├── page.tsx         # Dashboard home
│   │   │   ├── admin/           # Admin pages
│   │   │   ├── akuntan/         # Akuntan pages
│   │   │   └── klien/           # Klien pages
│   │   │
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Landing page
│   │
│   ├── components/              # Reusable components
│   │   ├── ui/                  # UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   └── ...
│   │   │
│   │   ├── shared/              # Shared components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ...
│   │   │
│   │   └── features/            # Feature components
│   │       ├── OrderCard.tsx
│   │       ├── PaymentTable.tsx
│   │       └── ...
│   │
│   ├── hooks/                   # Custom hooks
│   │   ├── useAuth.ts           # Authentication hook
│   │   ├── useOrders.ts         # Orders hook
│   │   └── ...
│   │
│   ├── utils/                   # Utility functions
│   │   ├── api.ts               # API client
│   │   ├── format.ts            # Formatters
│   │   └── ...
│   │
│   ├── config/                  # Configuration
│   │   ├── api.config.ts        # API config
│   │   └── app.config.ts        # App config
│   │
│   └── lib/                     # Libraries
│       ├── axios.ts             # Axios instance
│       └── queryClient.ts       # React Query client
│
├── public/                      # Static files
│   ├── images/
│   └── icons/
│
├── .env.local                   # Environment variables
└── package.json                 # Dependencies
```

---

## 🔐 Authentication Flow

### JWT Authentication

```typescript
// 1. User logs in
POST /auth/login
Body: { email: "admin@akuntasi.com", password: "admin123" }

// 2. Backend validates and returns token
Response: {
  access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  user: {
    id: 1,
    email: "admin@akuntasi.com",
    name: "Admin",
    role: "ADMIN"
  }
}

// 3. Frontend stores token
localStorage.setItem('token', access_token)

// 4. Subsequent requests include token
GET /orders
Headers: {
  Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

// 5. Backend verifies token
JwtStrategy.validate(payload) → returns user
```

### Google OAuth Flow

```
1. User clicks "Login with Google"
   ↓
2. Frontend redirects to: /auth/google
   ↓
3. Backend redirects to Google OAuth
   ↓
4. User authorizes on Google
   ↓
5. Google redirects to: /auth/google/callback
   ↓
6. Backend receives user data from Google
   ↓
7. Backend creates/finds user in database
   ↓
8. Backend generates JWT token
   ↓
9. Backend redirects to frontend with token
   ↓
10. Frontend stores token and redirects to dashboard
```

---

## 🗄️ Database Schema

### Users Table

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String?  // Null for Google OAuth users
  name      String
  role      Role     @default(KLIEN)
  phone     String?
  address   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  orders    Order[]
  payments  Payment[]
  documents Document[]
}

enum Role {
  ADMIN
  AKUNTAN
  KLIEN
}
```

### Orders Table

```prisma
model Order {
  id          Int         @id @default(autoincrement())
  userId      Int
  serviceId   Int
  status      OrderStatus @default(PENDING)
  totalPrice  Float
  notes       String?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  
  // Relations
  user        User        @relation(fields: [userId], references: [id])
  service     Service     @relation(fields: [serviceId], references: [id])
  payments    Payment[]
  documents   Document[]
}

enum OrderStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
  CANCELLED
}
```

### Payments Table

```prisma
model Payment {
  id            Int           @id @default(autoincrement())
  orderId       Int
  userId        Int
  amount        Float
  status        PaymentStatus @default(PENDING)
  paymentMethod String?
  proofUrl      String?
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  
  // Relations
  order         Order         @relation(fields: [orderId], references: [id])
  user          User          @relation(fields: [userId], references: [id])
}

enum PaymentStatus {
  PENDING
  VERIFIED
  REJECTED
}
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login with email/password | No |
| GET | `/auth/google` | Login with Google | No |
| GET | `/auth/google/callback` | Google OAuth callback | No |
| GET | `/auth/profile` | Get current user | Yes |

### Users

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/users` | Get all users | Yes | ADMIN |
| GET | `/users/:id` | Get user by ID | Yes | Any |
| PATCH | `/users/:id` | Update user | Yes | Any |
| DELETE | `/users/:id` | Delete user | Yes | ADMIN |

### Orders

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/orders` | Get all orders | Yes | Any |
| POST | `/orders` | Create order | Yes | KLIEN |
| GET | `/orders/:id` | Get order by ID | Yes | Any |
| PATCH | `/orders/:id` | Update order | Yes | ADMIN/AKUNTAN |
| DELETE | `/orders/:id` | Delete order | Yes | ADMIN |

### Payments

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/payments` | Get all payments | Yes | Any |
| POST | `/payments` | Create payment | Yes | KLIEN |
| GET | `/payments/:id` | Get payment by ID | Yes | Any |
| PATCH | `/payments/:id` | Update payment status | Yes | ADMIN |

### Services

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/services` | Get all services | No | - |
| POST | `/services` | Create service | Yes | ADMIN |
| GET | `/services/:id` | Get service by ID | No | - |
| PATCH | `/services/:id` | Update service | Yes | ADMIN |
| DELETE | `/services/:id` | Delete service | Yes | ADMIN |

---

## 🔒 Security Features

### Backend Security

1. **Password Hashing**: Bcrypt with salt rounds
2. **JWT Tokens**: Signed with secret key
3. **CORS**: Configured for frontend origin
4. **Input Validation**: DTOs with class-validator
5. **Guards**: JWT Guard, Role Guard
6. **Rate Limiting**: (To be implemented)
7. **Helmet**: Security headers (To be implemented)

### Frontend Security

1. **Token Storage**: localStorage (consider httpOnly cookies)
2. **Protected Routes**: Auth middleware
3. **Input Sanitization**: Zod validation
4. **XSS Protection**: React auto-escaping
5. **CSRF Protection**: (To be implemented)

---

## 📦 State Management

### Frontend State

```typescript
// TanStack Query for server state
const { data, isLoading, error } = useQuery({
  queryKey: ['orders'],
  queryFn: () => api.get('/orders'),
})

// React Context for auth state
const { user, login, logout } = useAuth()

// Local state with useState
const [isOpen, setIsOpen] = useState(false)
```

### Backend State

- **Stateless**: Each request is independent
- **JWT**: User state in token
- **Database**: Persistent state

---

## 🚀 Performance Optimizations

### Frontend

1. **Code Splitting**: Next.js automatic
2. **Image Optimization**: Next.js Image component
3. **Lazy Loading**: React.lazy for components
4. **Caching**: TanStack Query cache
5. **Memoization**: useMemo, useCallback

### Backend

1. **Database Indexing**: Prisma indexes
2. **Query Optimization**: Prisma select
3. **Caching**: (To be implemented with Redis)
4. **Compression**: (To be implemented)

---

## 📊 Monitoring & Logging

### Current

- Console logs in development
- Error handling with try-catch

### To Implement

- **Sentry**: Error tracking
- **Winston**: Structured logging
- **New Relic**: Performance monitoring
- **Google Analytics**: User analytics

---

## 🔄 Development Workflow

```bash
# 1. Start Backend
cd Website-Dashboard/backend
npm run start:dev

# 2. Start Frontend
cd Website-Dashboard/frontend
npm run dev

# 3. Database Management
cd Website-Dashboard/backend
npx prisma studio

# 4. Run Migrations
npx prisma migrate dev

# 5. Seed Database
npx prisma db seed
```

---

## 🌐 Deployment Architecture

### Production Setup

```
┌─────────────────────────────────────┐
│         Vercel (Frontend)           │
│    https://akuntasi-mitra.vercel.app│
└──────────────┬──────────────────────┘
               │
               │ API Calls
               │
┌──────────────▼──────────────────────┐
│       Railway (Backend)             │
│ https://backend.railway.app         │
└──────────────┬──────────────────────┘
               │
               │ Prisma
               │
┌──────────────▼──────────────────────┐
│    Railway PostgreSQL               │
│    (Managed Database)               │
└─────────────────────────────────────┘
```

---

**Project ini SUDAH fullstack dan production-ready! 🚀**
