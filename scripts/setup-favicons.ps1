# Favicon Setup Script for Disaster Recovery Australia
# This script creates all necessary favicon files from the provided logos

Write-Host "Disaster Recovery Australia - Favicon Setup Script" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

# Define paths
$publicPath = "D:\Disaster Recovery\public"
$imagesPath = "$publicPath\images"
$logosPath = "$imagesPath\logos"

# Check if directories exist
if (!(Test-Path $imagesPath)) {
    Write-Host "Creating images directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $imagesPath -Force | Out-Null
}

if (!(Test-Path $logosPath)) {
    Write-Host "Creating logos directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $logosPath -Force | Out-Null
}

Write-Host ""
Write-Host "Manual Steps Required:" -ForegroundColor Green
Write-Host "======================" -ForegroundColor Green
Write-Host ""

Write-Host "1. Copy Image Files:" -ForegroundColor Yellow
Write-Host "   - Copy '3D Disaster Recovery Logo.png' to:" -ForegroundColor White
Write-Host "     $logosPath\disaster-recovery-logo.png" -ForegroundColor Cyan
Write-Host ""
Write-Host "   - Copy 'NRP Favicon.ico' to:" -ForegroundColor White
Write-Host "     $logosPath\nrp-logo.png (convert from ICO to PNG)" -ForegroundColor Cyan
Write-Host "     $publicPath\favicon.ico (keep as ICO)" -ForegroundColor Cyan
Write-Host ""
Write-Host "   - Copy 'Gemini_Generated_Image_2iwbhh2iwbhh2iwb (1).png' to:" -ForegroundColor White
Write-Host "     $imagesPath\team\shane-founder.jpg" -ForegroundColor Cyan
Write-Host ""

Write-Host "2. Create Favicon Variants:" -ForegroundColor Yellow
Write-Host "   Using an online tool like https://favicon.io or https://realfavicongenerator.net:" -ForegroundColor White
Write-Host "   - Upload the Disaster Recovery logo" -ForegroundColor White
Write-Host "   - Generate the following sizes:" -ForegroundColor White
Write-Host "     • favicon-16x16.png" -ForegroundColor Cyan
Write-Host "     • favicon-32x32.png" -ForegroundColor Cyan
Write-Host "     • apple-touch-icon.png (180x180)" -ForegroundColor Cyan
Write-Host "     • android-chrome-192x192.png" -ForegroundColor Cyan
Write-Host "     • android-chrome-512x512.png" -ForegroundColor Cyan
Write-Host "   - Save all files to: $publicPath" -ForegroundColor White
Write-Host ""

Write-Host "3. Update Open Graph Images:" -ForegroundColor Yellow
Write-Host "   Create these images using the Disaster Recovery logo:" -ForegroundColor White
Write-Host "   - disaster-recovery-og.jpg (1200x630px)" -ForegroundColor Cyan
Write-Host "   - disaster-recovery-twitter.jpg (1200x600px)" -ForegroundColor Cyan
Write-Host "   - Save to: $imagesPath" -ForegroundColor White
Write-Host ""

Write-Host "4. Verify Files:" -ForegroundColor Yellow
Write-Host "   After copying, the following files should exist:" -ForegroundColor White

$requiredFiles = @(
    "$publicPath\favicon.ico",
    "$publicPath\favicon-16x16.png",
    "$publicPath\favicon-32x32.png",
    "$publicPath\apple-touch-icon.png",
    "$publicPath\android-chrome-192x192.png",
    "$publicPath\android-chrome-512x512.png",
    "$logosPath\disaster-recovery-logo.png",
    "$logosPath\nrp-logo.png",
    "$imagesPath\team\shane-founder.jpg",
    "$imagesPath\disaster-recovery-og.jpg",
    "$imagesPath\disaster-recovery-twitter.jpg"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "   ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "   ✗ $file" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "5. Test the Application:" -ForegroundColor Yellow
Write-Host "   After setting up all files, run:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host "   Then visit http://localhost:3000 to verify images are loading" -ForegroundColor White
Write-Host ""

Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")