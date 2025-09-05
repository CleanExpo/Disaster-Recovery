# PowerShell script to clean all Node.js processes and free port 3000 before starting dev server

# Kill all node.exe processes forcefully
Get-Process node -ErrorAction SilentlyContinue | ForEach-Object {
    try {
        $_.Kill()
        Write-Host "Killed Node process ID: $($_.Id)"
    } catch {
        Write-Warning "Failed to kill Node process ID: $($_.Id)"
    }
}

# Wait a moment to ensure processes are terminated
Start-Sleep -Seconds 2


# Check if port 3000 is in use and kill the owning process
$port = 3000
$netstat = netstat -ano | Select-String ":$port\s"

if ($netstat) {
    $processId = ($netstat -split '\s+')[-1]
    try {
        Stop-Process -Id $processId -Force
        Write-Host "Killed process using port $port with PID $processId"
    } catch {
        Write-Warning "Failed to kill process using port $port with PID $processId"
    }
} else {
    Write-Host "Port $port is free"
}

Write-Host "Cleanup complete. You can now start the dev server safely."
