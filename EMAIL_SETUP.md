# 📧 Setup Email Notification

## ✅ Yang Sudah Dibuat:

### 1. **Email Service** (`src/email/email.service.ts`)
- ✅ Menggunakan Nodemailer dengan Gmail SMTP
- ✅ Template HTML yang cantik untuk welcome email
- ✅ Error handling yang baik

### 2. **Email Module** (`src/email/email.module.ts`)
- ✅ Module untuk email service
- ✅ Di-export agar bisa digunakan di module lain

### 3. **Integration dengan Users Service**
- ✅ Email otomatis terkirim setelah registrasi berhasil
- ✅ Registrasi tetap sukses meski email gagal terkirim

---

## 🔧 Cara Setup Email (Gmail):

### Step 1: Buat App Password Gmail

1. **Buka Google Account Security**
   - URL: https://myaccount.google.com/security

2. **Aktifkan 2-Step Verification**
   - Jika belum aktif, aktifkan dulu
   - Ikuti instruksi Google

3. **Buat App Password**
   - Cari menu "App passwords" atau "Sandi aplikasi"
   - Pilih app: **Mail**
   - Pilih device: **Other (Custom name)**
   - Nama: **RISA BUR Backend**
   - Klik **Generate**

4. **Copy Password**
   - Google akan generate password 16 karakter
   - Format: `xxxx xxxx xxxx xxxx`
   - Copy password ini (tanpa spasi)

### Step 2: Update File .env

Buka file `backend/.env` dan tambahkan:

```env
# Email Configuration
EMAIL_USER=rivanzihidayatullah22@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
```

**Ganti dengan:**
- `EMAIL_USER`: Email Gmail Anda
- `EMAIL_PASS`: App Password yang baru dibuat (16 karakter)

### Step 3: Restart Backend

```bash
# Backend akan auto-restart jika menggunakan npm run start:dev
# Atau restart manual dengan Ctrl+C lalu npm run start:dev
```

---

## 🧪 Testing Email:

### Test 1: Registrasi Baru
```
1. Buka: http://localhost:3000/register
2. Isi form dengan email pribadi Anda
3. Klik "Daftar Sekarang"
4. Cek inbox email Anda
5. Email "🎉 Selamat Datang di RISA BUR!" akan masuk
```

### Test 2: Cek Console Backend
```
Jika berhasil:
✅ Email selamat datang terkirim ke user@gmail.com
✅ Email terkirim: <message-id>

Jika gagal:
⚠️ Gagal mengirim email, tapi registrasi tetap berhasil
❌ Gagal mengirim email: [error message]
```

---

## 📧 Email Template Preview:

Email yang dikirim berisi:
- ✅ Header gradient yang menarik
- ✅ Ucapan selamat datang personal
- ✅ 4 Fitur utama platform
- ✅ Button "Masuk ke Dashboard"
- ✅ Informasi akun (email & status)
- ✅ Footer dengan copyright

---

## ⚠️ Troubleshooting:

### Error: "Invalid login: 535-5.7.8 Username and Password not accepted"
**Penyebab**: App Password salah atau belum dibuat
**Solusi**: 
1. Pastikan 2-Step Verification aktif
2. Buat App Password baru
3. Copy paste dengan benar (tanpa spasi)

### Error: "self signed certificate in certificate chain"
**Penyebab**: SSL issue
**Solusi**: Tambahkan di email.service.ts:
```typescript
this.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { ... },
  tls: {
    rejectUnauthorized: false
  }
});
```

### Email masuk ke Spam
**Solusi**:
1. Tandai email sebagai "Not Spam"
2. Tambahkan sender ke contacts
3. Untuk production, gunakan domain email sendiri

### Email tidak terkirim tapi tidak ada error
**Cek**:
1. Pastikan EMAIL_USER dan EMAIL_PASS sudah di .env
2. Restart backend setelah update .env
3. Cek console backend untuk log

---

## 🚀 Next Steps (Opsional):

### 1. Email untuk Order Baru
Sudah ada function `sendOrderNotification()` di email.service.ts

### 2. Email untuk Reset Password
Bisa ditambahkan nanti

### 3. Email Template yang Lebih Kaya
- Tambahkan logo
- Gunakan email template builder
- Personalisasi lebih lanjut

### 4. Production Email Service
Untuk production, pertimbangkan:
- **SendGrid** (free tier 100 email/day)
- **Mailgun** (free tier 5000 email/month)
- **AWS SES** (sangat murah)
- **Resend** (modern, developer-friendly)

---

## 📊 Email Statistics:

Setelah email terkirim, Anda bisa:
- Cek di Gmail Sent folder
- Monitor di Google Account Activity
- Track dengan email service provider (untuk production)

---

## 🔒 Security Tips:

1. ✅ **Jangan commit .env ke Git**
   - Sudah ada di .gitignore
   - Gunakan .env.example sebagai template

2. ✅ **Gunakan App Password, bukan password asli**
   - Lebih aman
   - Bisa di-revoke kapan saja

3. ✅ **Untuk production:**
   - Gunakan environment variables di hosting
   - Jangan hardcode credentials
   - Gunakan email service provider profesional

---

## 📝 File yang Dibuat/Diubah:

1. ✅ `src/email/email.service.ts` - Email service dengan Nodemailer
2. ✅ `src/email/email.module.ts` - Email module
3. ✅ `src/users/users.module.ts` - Import EmailModule
4. ✅ `src/users/users.service.ts` - Kirim email setelah registrasi
5. ✅ `.env.example` - Template konfigurasi email
6. ✅ `package.json` - Installed nodemailer

---

**Selamat! Email notification sudah siap! 🎉**
