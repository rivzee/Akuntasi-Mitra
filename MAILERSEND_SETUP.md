# 📧 MailerSend Setup Guide

Panduan setup MailerSend untuk email notifications (gratis 12,000 email/bulan).

---

## Step 1: Buat Akun MailerSend

1. Kunjungi: https://www.mailersend.com/
2. Klik **"Start for free"**
3. Sign up dengan email atau Google
4. Verify email Anda

---

## Step 2: Dapatkan API Key

1. Login ke MailerSend dashboard
2. Klik **"API Tokens"** di sidebar
3. Klik **"Generate new token"**
4. Beri nama: `Akuntasi Mitra Production`
5. Pilih scope: **Full access** (atau minimal: Email sending)
6. Klik **"Create token"**
7. **COPY token** yang muncul (hanya muncul sekali!)

---

## Step 3: Verify Domain (Opsional tapi Recommended)

### Jika Punya Domain Sendiri:

1. Klik **"Domains"** di sidebar
2. Klik **"Add domain"**
3. Masukkan domain Anda (misal: `akuntasi-mitra.com`)
4. Tambahkan DNS records yang diberikan ke domain provider Anda
5. Klik **"Verify"**

### Jika Belum Punya Domain:

Gunakan domain trial dari MailerSend:
- Email akan dikirim dari: `trial-xxx@trial.mailersend.com`
- **Catatan:** Email hanya bisa dikirim ke email yang sudah di-verify di MailerSend
- Untuk production, sebaiknya verify domain sendiri

---

## Step 4: Set Environment Variables

### Development (Local)

Edit `Website-Dashboard/backend/.env`:

```env
MAILERSEND_API_KEY="mlsn.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
EMAIL_FROM="noreply@trial-xxx.trial.mailersend.com"
```

Ganti dengan:
- API key dari Step 2
- Email from sesuai domain yang di-verify

### Production (Railway)

```bash
cd Website-Dashboard/backend
railway variables set MAILERSEND_API_KEY="mlsn.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
railway variables set EMAIL_FROM="noreply@yourdomain.com"
```

---

## Step 5: Test Email

### Test di Local:

1. Restart backend:
   ```bash
   # Stop backend (Ctrl+C)
   npm run start:dev
   ```

2. Test register user baru
3. Check email inbox untuk verification email

### Test di Production:

Setelah deploy, test dengan register user baru.

---

## Fitur Email yang Digunakan

Aplikasi mengirim email untuk:

1. **Welcome Email** - Saat user register
2. **Password Reset** - Saat user lupa password
3. **Order Confirmation** - Saat order dibuat
4. **Payment Confirmation** - Saat payment berhasil
5. **Order Status Update** - Saat status order berubah

---

## Troubleshooting

### Email tidak terkirim

1. **Check API key** - Pastikan benar dan aktif
2. **Check domain** - Pastikan domain sudah verified
3. **Check logs** - Lihat error di backend logs
4. **Check quota** - Pastikan belum exceed 12,000 email/bulan

### Email masuk spam

1. **Verify domain** - Setup SPF, DKIM, DMARC records
2. **Warm up domain** - Kirim email secara bertahap
3. **Avoid spam words** - Jangan gunakan kata-kata spam di subject/body

---

## Alternative: Skip Email untuk Sekarang

Jika ingin deploy tanpa email dulu:

1. Set dummy values:
   ```env
   MAILERSEND_API_KEY="dummy-key"
   EMAIL_FROM="noreply@example.com"
   ```

2. Email notifications akan error, tapi aplikasi tetap jalan
3. Bisa setup nanti setelah deploy

---

## Free Tier Limits

- ✅ 12,000 emails/bulan
- ✅ Email analytics
- ✅ Email templates
- ✅ API access
- ✅ SMTP access
- ❌ Dedicated IP (paid)
- ❌ Priority support (paid)

---

## Next Steps

Setelah setup MailerSend:
1. ✅ Update environment variables
2. ✅ Restart backend
3. ✅ Test email sending
4. ✅ Continue deployment

---

**MailerSend Dashboard:** https://app.mailersend.com/
