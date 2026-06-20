@echo off
title GRUPEN - Subida automatica al repositorio
cd /d "%~dp0"
echo ============================================================
echo   GRUPEN - Subida automatica al repositorio (GitHub)
echo   Cada cambio en esta carpeta se sube solo.
echo   Deja esta ventana abierta. Cierrala para detener.
echo ============================================================
echo.
node autopush.js
echo.
echo (El vigilante se detuvo)
pause
