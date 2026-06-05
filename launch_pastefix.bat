@echo off
setlocal
pushd "%~dp0"

set "PORT=5173"
set "URL=http://127.0.0.1:%PORT%/?tool=pastefix"
set "LOG=%CD%\dev-server.log"

set "HTTP_PROXY="
set "HTTPS_PROXY="
set "ALL_PROXY="
set "GIT_HTTP_PROXY="
set "GIT_HTTPS_PROXY="
set "NPM_CONFIG_OFFLINE=false"

powershell -NoProfile -ExecutionPolicy Bypass -Command "try { Invoke-WebRequest -Uri 'http://127.0.0.1:5173' -UseBasicParsing -TimeoutSec 2 | Out-Null; exit 0 } catch { exit 1 }"
if errorlevel 1 (
  echo Starting TinyLocal Tools...
  start "TinyLocal Tools Dev Server" /min cmd /c "cd /d "%CD%" && npm run dev -- --host 127.0.0.1 --port %PORT% > "%LOG%" 2>&1"
  timeout /t 5 /nobreak >nul
)

start "" "%URL%"
exit /b 0
