# 📝 Panduan Testing Registrasi

## ✅ Perubahan yang Sudah Dilakukan:

### Backend (NestJS):
1. **users.service.ts** - Ditambahkan:
   - Field `phone` di parameter create function
   - Validasi email duplicate (cek email sudah terdaftar atau belum)
   - Error message yang jelas

2. **users.controller.ts** - Ditambahkan:
   - Try-catch dengan HTTP Exception
   - Status code 409 (CONFLICT) untuk email duplicate
   - Status code 400 (BAD_REQUEST) untuk error lainnya

### Frontend (Next.js):
1. **register/page.tsx** - Sudah ada:
   - Validasi email format (name@domain.com)
   - Validasi phone format (08xx, +628xx, 628xx)
   - Validasi password minimal 6 karakter
   - Error handling yang lengkap
   - Visual feedback (checkmark, error messages)

## 🧪 Cara Testing:

### Test 1: Registrasi Berhasil
```
1. Buka: http://localhost:3000/register
2. Isi form:
   - Nama: John Doe
   - Email: john@gmail.com (email pribadi asli)
   - Phone: 081234567890
   - Password: 123456
3. Klik "Daftar Sekarang"
4. Hasil: Alert sukses → Redirect ke /login
```

### Test 2: Email Sudah Terdaftar
```
1. Daftar dengan email yang sama
2. Hasil: Alert "Email sudah terdaftar. Silakan gunakan email lain atau login."
```

### Test 3: Email Tidak Valid
```
1. Isi email: johngmail.com (tanpa @)
2. Hasil: Error message "Email tidak valid. Gunakan email pribadi Anda yang aktif."
```

### Test 4: Phone Tidak Valid
```
1. Isi phone: 123 (terlalu pendek)
2. Hasil: Error message "Nomor telepon tidak valid. Format: 08xx atau +628xx"
```

### Test 5: Password Terlalu Pendek
```
1. Isi password: 12345 (kurang dari 6 karakter)
2. Hasil: Error message "Password minimal 6 karakter."
```

## 📊 Data yang Dikirim ke Backend:

```json
{
  "fullName": "John Doe",
  "email": "john@gmail.com",
  "phone": "081234567890",
  "password": "123456",
  "role": "KLIEN"
}
```

## 🔍 Cek Data di Database:

Setelah registrasi berhasil, cek database SQLite:

```bash
# Masuk ke folder backend
cd backend

# Buka Prisma Studio
npx prisma studio
```

Atau cek langsung di file database:
```
backend/prisma/dev.db
```

## ⚠️ Troubleshooting:

### Error: "Network Error"
- **Penyebab**: Backend tidak berjalan
- **Solusi**: Pastikan `npm run start:dev` berjalan di folder backend

### Error: "Gagal mendaftar"
- **Penyebab**: Backend error atau database issue
- **Solusi**: Cek console backend untuk error details

### Form tidak submit
- **Penyebab**: Validasi frontend gagal
- **Solusi**: Pastikan semua field valid (ada checkmark hijau)

## 🎯 Expected Behavior:

1. **Validasi Real-time**: 
   - Checkmark hijau muncul saat field valid
   - Error message muncul saat field tidak valid

2. **Submit Success**:
   - Alert dengan nama dan email
   - Redirect ke /login
   - Data tersimpan di database

3. **Submit Failed**:
   - Alert dengan error message yang jelas
   - Form tetap terisi (tidak reset)
   - User bisa perbaiki dan submit lagi

## 📞 Format Phone yang Valid:

✅ 081234567890
✅ +6281234567890
✅ 6281234567890
✅ 0812 3456 7890 (dengan spasi)

❌ 123 (terlalu pendek)
❌ abcd (bukan angka)
❌ 1234567890 (tidak dimulai dengan 0, +62, atau 62)

## 📧 Format Email yang Valid:

✅ john@gmail.com
✅ jane.doe@yahoo.com
✅ user123@outlook.com
✅ myemail@company.co.id

❌ johngmail.com (tanpa @)
❌ john@gmail (tanpa domain)
❌ @gmail.com (tanpa nama)
