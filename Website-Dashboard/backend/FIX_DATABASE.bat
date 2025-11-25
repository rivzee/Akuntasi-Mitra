@echo off
echo ==========================================
echo      RISA BUR - DATABASE FIX TOOL
echo ==========================================
echo.
echo [PENTING] Mohon tutup terminal BACKEND yang sedang berjalan sebelum lanjut!
echo Jika tidak ditutup, proses akan gagal karena file terkunci.
echo.
pause

echo.
echo 1. Generating Prisma Client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo Gagal generate client. Pastikan backend sudah mati.
    pause
    exit /b
)

echo.
echo 2. Updating Database Schema...
call npx prisma db push --accept-data-loss
if %errorlevel% neq 0 (
    echo Gagal update database.
    pause
    exit /b
)

echo.
echo 3. Seeding Data (Mengisi data awal)...
call npx ts-node prisma/seed.ts
if %errorlevel% neq 0 (
    echo Gagal seeding data.
    pause
    exit /b
)

echo.
echo ==========================================
echo      SUKSES! DATABASE TELAH DIPERBAIKI
echo ==========================================
echo.
echo Data Login Baru:
echo Admin: admin@akuntan.com / 123456
echo Akuntan: akuntan@akuntan.com / 123456
echo Klien: klien@akuntan.com / 123456
echo.
echo Silakan jalankan kembali backend dengan: npm run start:dev
echo.
pause
