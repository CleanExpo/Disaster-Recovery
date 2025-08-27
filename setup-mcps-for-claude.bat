@echo off
echo ========================================
echo Setting up MCPs for Claude Code
echo ========================================
echo.

:: Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo Running with administrator privileges...
) else (
    echo Please run this script as Administrator
    pause
    exit /b 1
)

:: Create Claude configuration directory
set CLAUDE_CONFIG_DIR=%APPDATA%\Claude
if not exist "%CLAUDE_CONFIG_DIR%" (
    echo Creating Claude configuration directory...
    mkdir "%CLAUDE_CONFIG_DIR%"
)

:: Copy configuration file
echo Copying MCP configuration to Claude directory...
copy /Y "claude_desktop_config.json" "%CLAUDE_CONFIG_DIR%\claude_desktop_config.json"

:: Install Playwright MCP server
echo.
echo Installing Playwright MCP server...
call npm install -g @modelcontextprotocol/server-playwright

:: Build Context7 if needed
echo.
echo Checking Context7 build...
if not exist "context7\dist\index.js" (
    echo Building Context7...
    cd context7
    call npm install
    call npm run build
    cd ..
) else (
    echo Context7 already built.
)

:: Build Sequential Thinking if needed
echo.
echo Checking Sequential Thinking build...
if not exist "WSL-Deployment-Sequential-Thinking\dist\cli.js" (
    echo Building Sequential Thinking...
    cd WSL-Deployment-Sequential-Thinking
    call npm install
    call npm run build
    cd ..
) else (
    echo Sequential Thinking already built.
)

echo.
echo ========================================
echo MCP Setup Complete!
echo ========================================
echo.
echo Configuration has been copied to: %CLAUDE_CONFIG_DIR%\claude_desktop_config.json
echo.
echo Please restart Claude Code for changes to take effect.
echo Then run /mcp to verify the servers are configured.
echo.
pause