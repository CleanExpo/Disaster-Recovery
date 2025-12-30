@echo off
REM Quick Claude Account Switcher
REM Usage: claude-switch [account-name|auto]

if "%1"=="" (
    powershell -ExecutionPolicy Bypass -File "%~dp0claude-account-manager.ps1" status
) else if "%1"=="auto" (
    powershell -ExecutionPolicy Bypass -File "%~dp0claude-account-manager.ps1" auto
) else if "%1"=="help" (
    powershell -ExecutionPolicy Bypass -File "%~dp0claude-account-manager.ps1" help
) else (
    powershell -ExecutionPolicy Bypass -File "%~dp0claude-account-manager.ps1" switch %1
)
