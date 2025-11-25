# CRUD Troubleshooting Guide

## ❌ **Masalah: Create, Update, Delete Failed**

### **Langkah Debugging:**

#### 1. **Cek Browser Console**
Buka browser console (F12) dan lihat error message:
```
- 🔵 Log biru = Request berhasil dikirim
- ✅ Log hijau = Response berhasil diterima
- ❌ Log merah = Error terjadi
```

#### 2. **Common Errors & Solutions:**

##### **A. CORS Error**
```
Error: Access to XMLHttpRequest has been blocked by CORS policy
```

**Solution:**
Backend sudah enable CORS di `main.ts`:
```typescript
app.enableCors({
  origin: 'http://localhost:3000',
  credentials: true,
});
```

Pastikan frontend running di `http://localhost:3000`

---

##### **B. 401 Unauthorized**
```
Error: Unauthorized (401)
```

**Solution:**
1. Login ulang untuk mendapatkan token baru
2. Cek localStorage apakah ada user data:
```javascript
// Di browser console:
localStorage.getItem('user')
```

3. Jika tidak ada, login kembali

---

##### **C. 404 Not Found**
```
Error: Cannot POST /users (404)
```

**Solution:**
1. Cek backend running di `http://localhost:3001`
2. Cek endpoint di browser: `http://localhost:3001/users`
3. Pastikan backend controller sudah registered

---

##### **D. 400 Bad Request**
```
Error: Bad Request (400)
```

**Solution:**
1. Cek data yang dikirim di console
2. Pastikan semua required fields terisi
3. Cek format data (email, number, dll)

**Required Fields:**

**Users:**
- fullName: string (required)
- email: string (required, valid email)
- password: string (required for create)
- role: 'ADMIN' | 'AKUNTAN' | 'KLIEN' (required)
- phone: string (optional)
- address: string (optional)

**Services:**
- name: string (required)
- description: string (required)
- price: number (required, >= 0)
- duration: string (required)
- category: string (required)
- isActive: boolean (default: true)

---

##### **E. 500 Internal Server Error**
```
Error: Internal Server Error (500)
```

**Solution:**
1. Cek backend terminal untuk error details
2. Cek database connection
3. Cek Prisma schema

---

### **3. Manual Testing dengan cURL**

#### **Create User:**
```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "KLIEN"
  }'
```

#### **Update User:**
```bash
curl -X PUT http://localhost:3001/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Updated Name"
  }'
```

#### **Delete User:**
```bash
curl -X DELETE http://localhost:3001/users/USER_ID
```

#### **Create Service:**
```bash
curl -X POST http://localhost:3001/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Service",
    "description": "Test description",
    "price": 500000,
    "duration": "1 Month",
    "category": "Pembukuan",
    "isActive": true
  }'
```

---

### **4. Cek Backend Logs**

Terminal backend akan menampilkan:
```
[Nest] INFO  [RouterExplorer] Mapped {/users, POST} route
[Nest] INFO  [RouterExplorer] Mapped {/users/:id, PUT} route
[Nest] INFO  [RouterExplorer] Mapped {/users/:id, DELETE} route
```

Jika tidak ada, berarti controller belum registered.

---

### **5. Cek Database**

Gunakan Prisma Studio:
```bash
cd backend
npx prisma studio
```

Buka `http://localhost:5555` untuk melihat data di database.

---

### **6. Test dengan Postman/Insomnia**

1. Import collection atau buat request manual
2. Set base URL: `http://localhost:3001`
3. Test endpoints:
   - GET /users
   - POST /users
   - PUT /users/:id
   - DELETE /users/:id
   - GET /services
   - POST /services
   - PUT /services/:id
   - DELETE /services/:id

---

### **7. Common Issues:**

#### **Password tidak ter-hash**
Jika password disimpan plain text, update backend service:

```typescript
// users.service.ts
import * as bcrypt from 'bcrypt';

async create(data: any) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return this.prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
}
```

#### **Email sudah terdaftar**
Backend akan return error jika email sudah ada:
```
Error: Email sudah terdaftar
```

Gunakan email yang berbeda atau delete user lama.

---

### **8. Environment Variables**

Pastikan `.env.local` di frontend sudah benar:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_TIMEOUT=30000
```

Dan `.env` di backend:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="your-secret-key"
```

---

### **9. Quick Fix Checklist:**

- [ ] Backend running di port 3001
- [ ] Frontend running di port 3000
- [ ] Database connected
- [ ] User logged in (token ada di localStorage)
- [ ] CORS enabled di backend
- [ ] All required fields filled
- [ ] Data format correct
- [ ] No console errors

---

### **10. Debug Mode**

Aktifkan debug mode dengan membuka browser console dan jalankan:

```javascript
// Enable verbose logging
localStorage.setItem('debug', 'true');

// Disable verbose logging
localStorage.removeItem('debug');
```

Sekarang semua API calls akan di-log dengan detail.

---

## 🆘 **Still Not Working?**

Jika masih error, screenshot:
1. Browser console error
2. Backend terminal error
3. Network tab di DevTools (F12 > Network)
4. Request payload
5. Response data

Dan share untuk debugging lebih lanjut.

---

**Last Updated:** 2025-11-25
**Version:** 1.0.0
