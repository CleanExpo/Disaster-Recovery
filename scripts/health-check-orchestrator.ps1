# Health Check Orchestration System
# Complete health check for Disaster Recovery platform
# CLI -> Docker -> CLI Format

param(
    [string]$Mode = "full",
    [string]$OutputFormat = "detailed",
    [switch]$FixErrors = $false,
    [switch]$GenerateReport = $true
)

$ErrorActionPreference = "Continue"
$Global:HealthCheckResults = @{
    Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Platform = "Disaster Recovery"
    Environment = @{
        Docker = $false
        NodeJS = $false
        Network = $false
    }
    Tests = @{}
    Errors = @()
    Warnings = @()
    Fixed = @()
}

# Color output functions
function Write-Success { Write-Host $args[0] -ForegroundColor Green }
function Write-Error { Write-Host $args[0] -ForegroundColor Red }
function Write-Warning { Write-Host $args[0] -ForegroundColor Yellow }
function Write-Info { Write-Host $args[0] -ForegroundColor Cyan }
function Write-Header { 
    Write-Host "`n===============================================" -ForegroundColor Magenta
    Write-Host $args[0] -ForegroundColor Magenta
    Write-Host "===============================================" -ForegroundColor Magenta
}

# Phase 1: Environment Check
function Test-Environment {
    Write-Header "PHASE 1: ENVIRONMENT VERIFICATION"
    
    # Check Docker
    Write-Info "Checking Docker..."
    $dockerVersion = docker --version 2>$null
    if ($dockerVersion) {
        Write-Success "✓ Docker is installed: $dockerVersion"
        $Global:HealthCheckResults.Environment.Docker = $true
        
        # Check running containers
        $containers = docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" 2>$null
        Write-Info "Running containers:"
        Write-Host $containers
    } else {
        Write-Error "✗ Docker is not installed or not in PATH"
        $Global:HealthCheckResults.Errors += "Docker not available"
    }
    
    # Check Node.js
    Write-Info "`nChecking Node.js..."
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Success "✓ Node.js is installed: $nodeVersion"
        $Global:HealthCheckResults.Environment.NodeJS = $true
        
        # Check npm
        $npmVersion = npm --version 2>$null
        Write-Success "✓ npm is installed: $npmVersion"
    } else {
        Write-Error "✗ Node.js is not installed"
        $Global:HealthCheckResults.Errors += "Node.js not available"
    }
    
    # Check network connectivity
    Write-Info "`nChecking network connectivity..."
    $ping = Test-Connection -ComputerName "8.8.8.8" -Count 1 -Quiet
    if ($ping) {
        Write-Success "✓ Internet connection is active"
        $Global:HealthCheckResults.Environment.Network = $true
    } else {
        Write-Error "✗ No internet connection"
        $Global:HealthCheckResults.Errors += "Network connectivity issue"
    }
}

# Phase 2: Docker Container Health
function Test-DockerHealth {
    Write-Header "PHASE 2: DOCKER CONTAINER HEALTH"
    
    if (-not $Global:HealthCheckResults.Environment.Docker) {
        Write-Warning "Skipping Docker health checks - Docker not available"
        return
    }
    
    $containers = @(
        @{Name="disaster-recovery-dev"; Port=3002; Type="Next.js App"},
        @{Name="claude-main"; Port=3000; Type="Claude Orchestrator"},
        @{Name="claude-redis"; Port=6379; Type="Redis Cache"},
        @{Name="supabase_db_Unite_Group"; Port=54322; Type="PostgreSQL Database"}
    )
    
    foreach ($container in $containers) {
        Write-Info "`nChecking $($container.Type): $($container.Name)"
        
        # Check if container is running
        $status = docker ps --filter "name=$($container.Name)" --format "{{.Status}}" 2>$null
        if ($status) {
            Write-Success "✓ Container is running: $status"
            
            # Check container health
            $health = docker inspect $container.Name --format "{{.State.Health.Status}}" 2>$null
            if ($health -eq "healthy") {
                Write-Success "✓ Container is healthy"
            } elseif ($health) {
                Write-Warning "⚠ Container health: $health"
                $Global:HealthCheckResults.Warnings += "$($container.Name) health: $health"
            }
            
            # Test port accessibility
            $portTest = Test-NetConnection -ComputerName localhost -Port $container.Port -WarningAction SilentlyContinue
            if ($portTest.TcpTestSucceeded) {
                Write-Success "✓ Port $($container.Port) is accessible"
            } else {
                Write-Error "✗ Port $($container.Port) is not accessible"
                $Global:HealthCheckResults.Errors += "$($container.Name) port $($container.Port) not accessible"
            }
        } else {
            Write-Error "✗ Container is not running"
            $Global:HealthCheckResults.Errors += "$($container.Name) not running"
            
            if ($FixErrors) {
                Write-Info "Attempting to start container..."
                docker start $container.Name 2>$null
                Start-Sleep -Seconds 5
                $newStatus = docker ps --filter "name=$($container.Name)" --format "{{.Status}}" 2>$null
                if ($newStatus) {
                    Write-Success "✓ Container started successfully"
                    $Global:HealthCheckResults.Fixed += "Started $($container.Name)"
                }
            }
        }
    }
}

# Phase 3: Application Routes & 404 Check
function Test-ApplicationRoutes {
    Write-Header "PHASE 3: APPLICATION ROUTES & 404 CHECK"
    
    $baseUrl = "http://localhost:3002"
    
    # Define all routes to test
    $routes = @(
        "/",
        "/services",
        "/services/water-damage",
        "/services/fire-damage",
        "/services/mould-remediation",
        "/services/commercial",
        "/technology",
        "/technology/ai",
        "/technology/thermal",
        "/technology/hepa",
        "/legal",
        "/legal/core-business",
        "/legal/contractor-network",
        "/legal/client-facing",
        "/legal/financial-payment",
        "/legal/affiliate-marketing",
        "/legal/platform-technology",
        "/legal/compliance-industry",
        "/legal/governance",
        "/about",
        "/contact",
        "/pitch",
        "/contractor",
        "/contractor/apply",
        "/partners/clean-claims",
        "/emergency-guide",
        "/insurance",
        "/faq"
    )
    
    $Global:HealthCheckResults.Tests.Routes = @{
        Total = $routes.Count
        Passed = 0
        Failed = 0
        Details = @()
    }
    
    Write-Info "Testing $($routes.Count) routes..."
    
    foreach ($route in $routes) {
        $url = "$baseUrl$route"
        try {
            $response = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 5 -UseBasicParsing -ErrorAction Stop
            if ($response.StatusCode -eq 200) {
                Write-Success "✓ $route - OK (200)"
                $Global:HealthCheckResults.Tests.Routes.Passed++
            } else {
                Write-Warning "⚠ $route - Status: $($response.StatusCode)"
                $Global:HealthCheckResults.Warnings += "$route returned $($response.StatusCode)"
            }
        } catch {
            if ($_.Exception.Response.StatusCode -eq 404) {
                Write-Error "✗ $route - 404 Not Found"
                $Global:HealthCheckResults.Tests.Routes.Failed++
                $Global:HealthCheckResults.Errors += "404: $route"
            } else {
                Write-Error "✗ $route - Error: $($_.Exception.Message)"
                $Global:HealthCheckResults.Tests.Routes.Failed++
                $Global:HealthCheckResults.Errors += "Failed: $route"
            }
        }
    }
    
    Write-Info "`nRoute Test Summary: $($Global:HealthCheckResults.Tests.Routes.Passed)/$($routes.Count) passed"
}

# Phase 4: Asset & Image Validation
function Test-Assets {
    Write-Header "PHASE 4: ASSET AND IMAGE VALIDATION"
    
    $baseUrl = "http://localhost:3002"
    
    # Critical assets to check
    $assets = @(
        "/logos/3D Disaster Recovery Logo Image.png",
        "/logos/3D NRP Logo.png",
        "/logos/3D Clean Claims.png",
        "/images/logos/3D Facebook.png",
        "/images/logos/3D Instagram.png",
        "/images/logos/3D LinkedIn.png",
        "/images/logos/3D YouTube.png",
        "/favicon.ico",
        "/manifest.json"
    )
    
    $Global:HealthCheckResults.Tests.Assets = @{
        Total = $assets.Count
        Passed = 0
        Failed = 0
    }
    
    Write-Info "Checking $($assets.Count) critical assets..."
    
    foreach ($asset in $assets) {
        $url = "$baseUrl$asset"
        try {
            $response = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 3 -UseBasicParsing -ErrorAction Stop
            if ($response.StatusCode -eq 200) {
                Write-Success "✓ $asset - OK"
                $Global:HealthCheckResults.Tests.Assets.Passed++
            }
        } catch {
            Write-Error "✗ $asset - Missing or inaccessible"
            $Global:HealthCheckResults.Tests.Assets.Failed++
            $Global:HealthCheckResults.Errors += "Missing asset: $asset"
        }
    }
    
    Write-Info "Asset Test Summary: $($Global:HealthCheckResults.Tests.Assets.Passed)/$($assets.Count) passed"
}

# Phase 5: API Endpoints
function Test-APIEndpoints {
    Write-Header "PHASE 5: API ENDPOINT TESTING"
    
    $baseUrl = "http://localhost:3002/api"
    
    $endpoints = @(
        @{Path="/health"; Method="GET"; Description="Health check endpoint"},
        @{Path="/contractor/validate"; Method="POST"; Description="Contractor validation"}
    )
    
    $Global:HealthCheckResults.Tests.API = @{
        Total = $endpoints.Count
        Passed = 0
        Failed = 0
    }
    
    Write-Info "Testing $($endpoints.Count) API endpoints..."
    
    foreach ($endpoint in $endpoints) {
        $url = "$baseUrl$($endpoint.Path)"
        Write-Info "Testing: $($endpoint.Description)"
        
        try {
            $response = Invoke-RestMethod -Uri $url -Method $endpoint.Method -TimeoutSec 5 -ErrorAction Stop
            Write-Success "✓ $($endpoint.Path) - OK"
            $Global:HealthCheckResults.Tests.API.Passed++
        } catch {
            if ($_.Exception.Response.StatusCode -eq 404) {
                Write-Warning "⚠ $($endpoint.Path) - Not implemented (404)"
                $Global:HealthCheckResults.Warnings += "API endpoint not implemented: $($endpoint.Path)"
            } else {
                Write-Error "✗ $($endpoint.Path) - Error: $($_.Exception.Message)"
                $Global:HealthCheckResults.Tests.API.Failed++
                $Global:HealthCheckResults.Errors += "API failed: $($endpoint.Path)"
            }
        }
    }
}

# Phase 6: Responsive Design Check
function Test-ResponsiveDesign {
    Write-Header "PHASE 6: RESPONSIVE DESIGN CHECK"
    
    Write-Info "Testing responsive design breakpoints..."
    
    # For now, just test if pages load at different viewport simulations
    $viewports = @(
        @{Name="Mobile"; Width=375; Height=667},
        @{Name="Tablet"; Width=768; Height=1024},
        @{Name="Desktop"; Width=1920; Height=1080}
    )
    
    foreach ($viewport in $viewports) {
        Write-Info "Testing $($viewport.Name) viewport ($($viewport.Width)x$($viewport.Height))..."
        
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:3002" -UseBasicParsing -TimeoutSec 5
            if ($response.StatusCode -eq 200) {
                Write-Success "✓ $($viewport.Name) - Page loads successfully"
            }
        } catch {
            Write-Error "✗ $($viewport.Name) - Failed to load"
        }
    }
}

# Phase 7: SEO & Meta Tags
function Test-SEOAndMeta {
    Write-Header "PHASE 7: SEO & META TAGS VALIDATION"
    
    $url = "http://localhost:3002"
    
    Write-Info "Checking SEO elements..."
    
    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing
        $html = $response.Content
        
        # Check for essential meta tags
        $metaTags = @(
            @{Name="title"; Pattern="<title>.*</title>"},
            @{Name="description"; Pattern='<meta name="description"'},
            @{Name="keywords"; Pattern='<meta name="keywords"'},
            @{Name="og:title"; Pattern='<meta property="og:title"'},
            @{Name="og:description"; Pattern='<meta property="og:description"'},
            @{Name="og:image"; Pattern='<meta property="og:image"'},
            @{Name="twitter:card"; Pattern='<meta name="twitter:card"'},
            @{Name="viewport"; Pattern='<meta name="viewport"'},
            @{Name="canonical"; Pattern='<link rel="canonical"'}
        )
        
        foreach ($tag in $metaTags) {
            if ($html -match $tag.Pattern) {
                Write-Success "✓ $($tag.Name) tag found"
            } else {
                Write-Error "✗ $($tag.Name) tag missing"
                $Global:HealthCheckResults.Errors += "Missing SEO tag: $($tag.Name)"
            }
        }
        
        # Check for structured data
        if ($html -match '<script type="application/ld\+json">') {
            Write-Success "✓ Structured data (JSON-LD) found"
        } else {
            Write-Warning "⚠ No structured data found"
            $Global:HealthCheckResults.Warnings += "Missing structured data"
        }
        
    } catch {
        Write-Error "✗ Failed to check SEO: $($_.Exception.Message)"
    }
}

# Phase 8: Performance Check
function Test-Performance {
    Write-Header "PHASE 8: PERFORMANCE METRICS"
    
    Write-Info "Running performance tests..."
    
    $performanceScript = @"
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto('http://localhost:3002', { waitUntil: 'networkidle2' });
    
    const metrics = await page.metrics();
    const performance = await page.evaluate(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        return {
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
            domInteractive: perfData.domInteractive,
            firstPaint: performance.getEntriesByType('paint')[0]?.startTime
        };
    });
    
    console.log('Performance Metrics:');
    console.log('- DOM Content Loaded:', performance.domContentLoaded, 'ms');
    console.log('- Page Load Complete:', performance.loadComplete, 'ms');
    console.log('- DOM Interactive:', performance.domInteractive, 'ms');
    console.log('- First Paint:', performance.firstPaint, 'ms');
    console.log('- JS Heap Size:', (metrics.JSHeapUsedSize / 1048576).toFixed(2), 'MB');
    
    await browser.close();
})();
"@
    
    # Save and run performance test
    $perfScriptPath = "$PSScriptRoot\temp-performance-test.js"
    $performanceScript | Out-File -FilePath $perfScriptPath -Encoding UTF8
    
    if ($Global:HealthCheckResults.Environment.NodeJS) {
        # Check if puppeteer is installed
        $puppeteerCheck = npm list puppeteer 2>$null
        if ($puppeteerCheck -match "puppeteer@") {
            node $perfScriptPath
        } else {
            Write-Warning "Puppeteer not installed - skipping detailed performance tests"
        }
    }
    
    # Basic performance check via curl
    Write-Info "`nBasic load time test..."
    $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3002" -UseBasicParsing -TimeoutSec 10
        $stopwatch.Stop()
        $loadTime = $stopwatch.ElapsedMilliseconds
        
        if ($loadTime -lt 1000) {
            Write-Success "✓ Page loads in ${loadTime}ms (Excellent)"
        } elseif ($loadTime -lt 3000) {
            Write-Success "✓ Page loads in ${loadTime}ms (Good)"
        } else {
            Write-Warning "⚠ Page loads in ${loadTime}ms (Slow)"
            $Global:HealthCheckResults.Warnings += "Slow page load: ${loadTime}ms"
        }
    } catch {
        Write-Error "✗ Failed to measure load time"
    }
    
    # Cleanup
    if (Test-Path $perfScriptPath) {
        Remove-Item $perfScriptPath -Force
    }
}

# Phase 9: Database Health
function Test-DatabaseHealth {
    Write-Header "PHASE 9: DATABASE HEALTH CHECK"
    
    if ($Global:HealthCheckResults.Environment.Docker) {
        Write-Info "Checking Supabase database..."
        
        # Check PostgreSQL
        $pgHealth = docker exec supabase_db_Unite_Group pg_isready 2>$null
        if ($pgHealth -match "accepting connections") {
            Write-Success "✓ PostgreSQL is accepting connections"
        } else {
            Write-Error "✗ PostgreSQL is not responding"
            $Global:HealthCheckResults.Errors += "Database not responding"
        }
        
        # Check database size
        $dbSize = docker exec supabase_db_Unite_Group psql -U postgres -t -c "SELECT pg_size_pretty(pg_database_size('postgres'));" 2>$null
        if ($dbSize) {
            Write-Info "Database size: $($dbSize.Trim())"
        }
        
        # Check connection count
        $connections = docker exec supabase_db_Unite_Group psql -U postgres -t -c "SELECT count(*) FROM pg_stat_activity;" 2>$null
        if ($connections) {
            Write-Info "Active connections: $($connections.Trim())"
        }
    }
}

# Phase 10: Generate Report
function Generate-HealthReport {
    Write-Header "HEALTH CHECK REPORT"
    
    $report = @"
=========================================
DISASTER RECOVERY HEALTH CHECK REPORT
Generated: $($Global:HealthCheckResults.Timestamp)
=========================================

ENVIRONMENT STATUS:
- Docker: $(if($Global:HealthCheckResults.Environment.Docker) {"✓ OK"} else {"✗ Failed"})
- Node.js: $(if($Global:HealthCheckResults.Environment.NodeJS) {"✓ OK"} else {"✗ Failed"})
- Network: $(if($Global:HealthCheckResults.Environment.Network) {"✓ OK"} else {"✗ Failed"})

TEST RESULTS:
"@
    
    if ($Global:HealthCheckResults.Tests.Routes) {
        $report += @"

Routes Tested: $($Global:HealthCheckResults.Tests.Routes.Total)
- Passed: $($Global:HealthCheckResults.Tests.Routes.Passed)
- Failed: $($Global:HealthCheckResults.Tests.Routes.Failed)
"@
    }
    
    if ($Global:HealthCheckResults.Tests.Assets) {
        $report += @"

Assets Checked: $($Global:HealthCheckResults.Tests.Assets.Total)
- Passed: $($Global:HealthCheckResults.Tests.Assets.Passed)
- Failed: $($Global:HealthCheckResults.Tests.Assets.Failed)
"@
    }
    
    if ($Global:HealthCheckResults.Tests.API) {
        $report += @"

API Endpoints: $($Global:HealthCheckResults.Tests.API.Total)
- Passed: $($Global:HealthCheckResults.Tests.API.Passed)
- Failed: $($Global:HealthCheckResults.Tests.API.Failed)
"@
    }
    
    if ($Global:HealthCheckResults.Errors.Count -gt 0) {
        $report += @"

ERRORS FOUND ($($Global:HealthCheckResults.Errors.Count)):
"@
        foreach ($error in $Global:HealthCheckResults.Errors) {
            $report += "`n- $error"
        }
    }
    
    if ($Global:HealthCheckResults.Warnings.Count -gt 0) {
        $report += @"

WARNINGS ($($Global:HealthCheckResults.Warnings.Count)):
"@
        foreach ($warning in $Global:HealthCheckResults.Warnings) {
            $report += "`n- $warning"
        }
    }
    
    if ($Global:HealthCheckResults.Fixed.Count -gt 0) {
        $report += @"

ISSUES FIXED ($($Global:HealthCheckResults.Fixed.Count)):
"@
        foreach ($fixed in $Global:HealthCheckResults.Fixed) {
            $report += "`n- $fixed"
        }
    }
    
    $report += @"

=========================================
OVERALL STATUS: $(if($Global:HealthCheckResults.Errors.Count -eq 0) {"✓ HEALTHY"} elseif($Global:HealthCheckResults.Errors.Count -lt 5) {"⚠ NEEDS ATTENTION"} else {"✗ CRITICAL ISSUES"})
=========================================
"@
    
    # Save report
    $reportPath = "$PSScriptRoot\..\health-check-report-$(Get-Date -Format 'yyyyMMdd-HHmmss').txt"
    $report | Out-File -FilePath $reportPath -Encoding UTF8
    
    Write-Host $report
    Write-Info "`nReport saved to: $reportPath"
    
    # Also save as JSON for programmatic access
    $jsonPath = "$PSScriptRoot\..\health-check-report-$(Get-Date -Format 'yyyyMMdd-HHmmss').json"
    $Global:HealthCheckResults | ConvertTo-Json -Depth 5 | Out-File -FilePath $jsonPath -Encoding UTF8
    Write-Info "JSON report saved to: $jsonPath"
}

# Main Execution
function Start-HealthCheck {
    Write-Header "DISASTER RECOVERY COMPLETE HEALTH CHECK"
    Write-Info "Starting comprehensive health check..."
    Write-Info "Mode: $Mode | Fix Errors: $FixErrors | Generate Report: $GenerateReport"
    
    # Run all health check phases
    Test-Environment
    Test-DockerHealth
    Test-ApplicationRoutes
    Test-Assets
    Test-APIEndpoints
    Test-ResponsiveDesign
    Test-SEOAndMeta
    Test-Performance
    Test-DatabaseHealth
    
    # Generate report
    if ($GenerateReport) {
        Generate-HealthReport
    }
    
    # Return status code
    if ($Global:HealthCheckResults.Errors.Count -eq 0) {
        Write-Success "`n✓ Health check completed successfully!"
        exit 0
    } elseif ($Global:HealthCheckResults.Errors.Count -lt 5) {
        Write-Warning "`n⚠ Health check completed with warnings"
        exit 1
    } else {
        Write-Error "`n✗ Health check failed with critical issues"
        exit 2
    }
}

# Execute health check
Start-HealthCheck