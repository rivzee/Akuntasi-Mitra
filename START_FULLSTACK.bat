@echo off
title FULLSTACK - Backend + Frontend
echo ========================================
echo  STARTING FULLSTACK APPLICATION
echo ========================================
echo.
echo Starting Backend and Frontend servers...
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Press Ctrl+C in each window to stop
echo ========================================
echo.

:: Start Backend in new window
start "Backend Server - Port 3001" cmd /k "cd Website-Dashboard\backend && npm run start:dev"

:: Wait 5 seconds for backend to start
timeout /t 5 /nobreak

:: Start Frontend in new window
start "Frontend Server - Port 3000" cmd /k "cd Website-Dashboard\frontend && npm run dev"

:: Wait 3 seconds
timeout /t 3 /nobreak

:: Open browser
echo.
echo Opening browser...
start http://localhost:3000

echo.
echo ========================================
echo  FULLSTACK APPLICATION STARTED!
echo ========================================
echo.
echo Backend: http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Default Login:
echo   Email: admin@akuntasi.com
echo   Password: admin123
echo.
echo Close this window to keep servers running.
echo ========================================
pause
