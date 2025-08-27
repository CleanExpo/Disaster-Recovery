@echo off
echo ================================
echo R6 Digital Design Analysis
echo Using Playwright MCP
echo ================================
echo.

REM Run the Playwright analysis
echo Starting Playwright analysis...
node analyze-r6-design.js

echo.
echo ================================
echo Analysis Complete!
echo ================================
echo.
echo Check the following outputs:
echo - r6-digital-homepage.png (Homepage screenshot)
echo - r6-digital-fullpage.png (Full page screenshot)
echo - Console output above for design details
echo.
pause