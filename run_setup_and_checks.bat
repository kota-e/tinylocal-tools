@echo off
setlocal

pushd "%~dp0"

set "LOG=%CD%\setup-checks.log"
set "NPM_CACHE=%TEMP%\tinylocal-tools-npm-cache"

if not exist "package.json" (
  echo [ERROR] package.json was not found.
  echo Please run this file from the safe-text-tools folder.
  pause
  exit /b 1
)

echo TinyLocal Tools setup started.
echo Folder: %CD%
echo Log: %LOG%
echo NPM cache: %NPM_CACHE%
echo.

echo TinyLocal Tools setup log > "%LOG%"
echo Folder: %CD% >> "%LOG%"
echo NPM cache: %NPM_CACHE% >> "%LOG%"

set "HTTP_PROXY="
set "HTTPS_PROXY="
set "ALL_PROXY="
set "GIT_HTTP_PROXY="
set "GIT_HTTPS_PROXY="
set "NPM_CONFIG_OFFLINE=false"

if exist "%NPM_CACHE%" rmdir /s /q "%NPM_CACHE%"

echo [1/4] Installing npm dependencies...
echo [1/4] npm install >> "%LOG%"
call npm install --offline=false --cache "%NPM_CACHE%" >> "%LOG%" 2>&1
if errorlevel 1 goto failed

echo.
echo [2/4] Running TypeScript check...
echo [2/4] npm run lint >> "%LOG%"
call npm run lint >> "%LOG%" 2>&1
if errorlevel 1 goto failed

echo.
echo [3/4] Running unit tests...
echo [3/4] npm test >> "%LOG%"
call npm test >> "%LOG%" 2>&1
if errorlevel 1 goto failed

echo.
echo [4/4] Building production files...
echo [4/4] npm run build >> "%LOG%"
call npm run build >> "%LOG%" 2>&1
if errorlevel 1 goto failed

echo.
echo SUCCESS: setup, tests, and build completed.
echo SUCCESS: setup, tests, and build completed. >> "%LOG%"
echo Please tell Codex: batch done.
pause
exit /b 0

:failed
echo.
echo ERROR: one step failed.
echo ERROR: one step failed. >> "%LOG%"
echo Please tell Codex: batch failed.
echo Codex can read this log file: %LOG%
pause
exit /b 1
