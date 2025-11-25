# 🔧 Manual Setup - Database Migration

## ⚠️ **IMPORTANT: Run These Commands Manually**

Karena ada permission error, silakan jalankan command berikut **secara manual** di terminal backend:

### **Step 1: Stop Backend Server**
Tekan `Ctrl+C` di terminal backend yang running

### **Step 2: Run Migration**
```bash
cd backend
npx prisma migrate dev --name add_user_address_and_service_fields
```

Jika ada prompt:
- "Do you want to continue?" → Ketik `y` dan Enter
- "Enter a name for the new migration" → Tekan Enter (sudah ada nama)

### **Step 3: Generate Prisma Client**
```bash
npx prisma generate
```

### **Step 4: Restart Backend**
```bash
npm run start:dev
```

---

## ✅ **What Was Changed:**

### **1. Prisma Schema Updates:**

#### **User Model:**
```prisma
model User {
  // ... existing fields
  address   String?  // ✅ NEW: Alamat user (optional)
  // ...
}
```

#### **ServicePackage Model:**
```prisma
model ServicePackage {
  // ... existing fields
  duration    String?  // ✅ NEW: Durasi layanan
  category    String?  // ✅ NEW: Kategori layanan
  createdAt   DateTime @default(now())  // ✅ NEW
  updatedAt   DateTime @updatedAt  // ✅ NEW
  // ...
}
```

### **2. Backend Service Updates:**

#### **users.service.ts:**
- ✅ Accept `address` field in create method
- ✅ Return user with all fields

#### **services.service.ts:**
- ✅ Accept `duration`, `category`, `isActive` fields
- ✅ Set default values
- ✅ Order by createdAt desc

---

## 🧪 **Testing After Migration:**

### **Test Create User:**
```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "+62 812 3456 7890",
    "address": "Jl. Test No. 123, Jakarta",
    "role": "KLIEN"
  }'
```

### **Test Create Service:**
```bash
curl -X POST http://localhost:3001/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pembukuan Bulanan",
    "description": "Layanan pembukuan bulanan untuk UMKM",
    "price": 500000,
    "duration": "1 Month",
    "category": "Pembukuan",
    "isActive": true
  }'
```

---

## 🔍 **Verify Migration:**

### **Check Database:**
```bash
npx prisma studio
```

Buka `http://localhost:5555` dan cek:
- ✅ User table punya column `address`
- ✅ ServicePackage table punya column `duration`, `category`, `createdAt`, `updatedAt`

---

## ❌ **If Migration Fails:**

### **Option 1: Reset Database (⚠️ Will delete all data)**
```bash
npx prisma migrate reset
npx prisma generate
npm run start:dev
```

### **Option 2: Push Schema (Without migration)**
```bash
npx prisma db push
npx prisma generate
npm run start:dev
```

---

## 📝 **After Successful Migration:**

1. ✅ Backend akan restart otomatis
2. ✅ Refresh frontend (F5)
3. ✅ Login ulang jika perlu
4. ✅ Test CRUD operations:
   - Create user dengan address
   - Create service dengan duration & category
   - Update & Delete should work

---

## 🆘 **Still Having Issues?**

Jika masih error setelah migration:

1. **Check backend logs** untuk error message
2. **Check database** dengan Prisma Studio
3. **Clear browser cache** (Ctrl+Shift+Delete)
4. **Restart both servers**:
   ```bash
   # Backend
   Ctrl+C
   npm run start:dev
   
   # Frontend
   Ctrl+C
   npm run dev
   ```

---

**Last Updated:** 2025-11-25 22:00
**Status:** Waiting for manual migration
