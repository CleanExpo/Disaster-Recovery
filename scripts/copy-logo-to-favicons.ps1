# PowerShell script to copy new logo to favicon locations
$sourceLogo = "D:\Disaster Recovery\public\logos\3D Disaster Recovery Logo Image.png"
$publicDir = "D:\Disaster Recovery\public"

# List of favicon files to create
$faviconFiles = @(
    "favicon.ico",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "icon-72x72.png",
    "icon-96x96.png",
    "icon-128x128.png",
    "icon-144x144.png",
    "icon-152x152.png",
    "icon-192x192.png",
    "icon-384x384.png",
    "icon-512x512.png",
    "apple-touch-icon.png"
)

Write-Host "Copying new logo to favicon locations..." -ForegroundColor Cyan

# Check if source file exists
if (Test-Path $sourceLogo) {
    Write-Host "Found source logo: $sourceLogo" -ForegroundColor Green
    
    foreach ($favicon in $faviconFiles) {
        $destination = Join-Path $publicDir $favicon
        
        # Copy the logo to each favicon location
        Copy-Item -Path $sourceLogo -Destination $destination -Force
        Write-Host "Created: $favicon" -ForegroundColor Green
    }
    
    Write-Host "`nAll favicon files updated successfully!" -ForegroundColor Green
} else {
    Write-Host "Error: Source logo not found: $sourceLogo" -ForegroundColor Red
    exit 1
}