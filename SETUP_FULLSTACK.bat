@echo off
echo ========================================
echo  FULLSTACK SETUP - Akuntasi Mitra
echo ========================================
echo.

echo [1/5] Checking Backend Dependencies...
cd Website-Dashboard\backend
if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo Backend dependencies already installed.
)

echo.
echo [2/5] Generating Prisma Client...
call npx prisma generate

echo.
echo [3/5] Checking Database...
if not exist "prisma\dev.db" (
    echo Creating database and running migrations...
    call npx prisma migrate dev --name init
    echo.
    echo Seeding database...
    call npx prisma db seed
) else (
    echo Database already exists.
)

echo.
echo [4/5] Checking Frontend Dependencies...
cd ..\frontend
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed.
)

echo.
echo [5/5] Creating Frontend Environment File...
if not exist ".env.local" (
    echo Creating .env.local...
    (
        echo NEXT_PUBLIC_API_URL=http://localhost:3001
        echo NEXT_PUBLIC_APP_NAME=Akuntasi Mitra
        echo NEXT_PUBLIC_APP_VERSION=1.0.0
        echo NEXT_PUBLIC_ENABLE_ANALYTICS=false
        echo NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
        echo NEXT_PUBLIC_MAX_FILE_SIZE=10485760
        echo NEXT_PUBLIC_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg,application/pdf
    ) > .env.local
    echo .env.local created successfully!
) else (
    echo .env.local already exists.
)

cd ..\..

echo.
echo ========================================
echo  SETUP COMPLETE!
echo ========================================
echo.
echo Next steps:
echo.
echo 1. Configure backend/.env file:
echo    - Set GOOGLE_CLIENT_ID
echo    - Set GOOGLE_CLIENT_SECRET
echo    - Set JWT_SECRET (optional)
echo.
echo 2. Start Backend (Terminal 1):
echo    cd Website-Dashboard\backend
echo    npm run start:dev
echo.
echo 3. Start Frontend (Terminal 2):
echo    cd Website-Dashboard\frontend
echo    npm run dev
echo.
echo 4. Open browser:
echo    http://localhost:3000
echo.
echo Default Login:
echo    Email: admin@akuntasi.com
echo    Password: admin123
echo.
echo ========================================
pause
