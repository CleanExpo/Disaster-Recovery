# Claude Account Manager
# Manages multiple Claude accounts and automatically switches when rate limits are hit
# Version: 1.0.0

param(
    [Parameter(Position=0)]
    [string]$Action = "status",
    
    [Parameter(Position=1)]
    [string]$AccountName
)

# Configuration
$ClaudeConfigPath = "$env:USERPROFILE\.claude"
$CredentialsFile = "$ClaudeConfigPath\.credentials.json"
$AccountsFile = "$ClaudeConfigPath\accounts.json"
$UsageLogFile = "$ClaudeConfigPath\usage-log.json"

# Account definitions - Add your accounts here
$DefaultAccounts = @{
    "phill" = @{
        "email" = "phill.mcgurk@gmail.com"
        "description" = "Primary account"
    }
    "unite" = @{
        "email" = "contact@unite-group.in"
        "description" = "Secondary account"
    }
}

function Initialize-AccountsFile {
    if (-not (Test-Path $AccountsFile)) {
        $accountsData = @{
            "accounts" = $DefaultAccounts
            "currentAccount" = $null
            "lastSwitch" = $null
            "credentials" = @{}
        }
        $accountsData | ConvertTo-Json -Depth 10 | Set-Content $AccountsFile
        Write-Host "✓ Initialized accounts file at $AccountsFile" -ForegroundColor Green
    }
}

function Get-AccountsData {
    Initialize-AccountsFile
    return Get-Content $AccountsFile | ConvertFrom-Json
}

function Save-AccountsData {
    param($Data)
    $Data | ConvertTo-Json -Depth 10 | Set-Content $AccountsFile
}

function Get-CurrentCredentials {
    if (Test-Path $CredentialsFile) {
        return Get-Content $CredentialsFile | ConvertFrom-Json
    }
    return $null
}

function Backup-CurrentCredentials {
    param([string]$AccountName)
    
    $accountsData = Get-AccountsData
    $currentCreds = Get-CurrentCredentials
    
    if ($currentCreds -and $AccountName) {
        # Store credentials for this account
        if (-not $accountsData.credentials) {
            $accountsData | Add-Member -NotePropertyName "credentials" -NotePropertyValue @{} -Force
        }
        $accountsData.credentials.$AccountName = $currentCreds
        Save-AccountsData $accountsData
        Write-Host "✓ Backed up credentials for account: $AccountName" -ForegroundColor Green
    }
}

function Restore-Credentials {
    param([string]$AccountName)
    
    $accountsData = Get-AccountsData
    
    if ($accountsData.credentials.$AccountName) {
        $accountsData.credentials.$AccountName | ConvertTo-Json -Depth 10 | Set-Content $CredentialsFile
        $accountsData.currentAccount = $AccountName
        $accountsData.lastSwitch = (Get-Date).ToString("o")
        Save-AccountsData $accountsData
        Write-Host "✓ Restored credentials for account: $AccountName" -ForegroundColor Green
        return $true
    }
    return $false
}

function Log-Usage {
    param(
        [string]$Account,
        [string]$Event,
        [string]$Details
    )
    
    $logEntry = @{
        "timestamp" = (Get-Date).ToString("o")
        "account" = $Account
        "event" = $Event
        "details" = $Details
    }
    
    $log = @()
    if (Test-Path $UsageLogFile) {
        $log = Get-Content $UsageLogFile | ConvertFrom-Json
        if ($log -isnot [array]) { $log = @($log) }
    }
    
    $log += $logEntry
    
    # Keep only last 1000 entries
    if ($log.Count -gt 1000) {
        $log = $log[-1000..-1]
    }
    
    $log | ConvertTo-Json -Depth 10 | Set-Content $UsageLogFile
}

function Show-Status {
    Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║           CLAUDE ACCOUNT MANAGER - STATUS                  ║" -ForegroundColor Cyan
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
    
    $accountsData = Get-AccountsData
    $currentCreds = Get-CurrentCredentials
    
    Write-Host "`n📧 Configured Accounts:" -ForegroundColor Yellow
    foreach ($name in $accountsData.accounts.PSObject.Properties.Name) {
        $account = $accountsData.accounts.$name
        $isCurrent = $accountsData.currentAccount -eq $name
        $hasStoredCreds = $accountsData.credentials.$name -ne $null
        
        $status = if ($isCurrent) { "◀ ACTIVE" } elseif ($hasStoredCreds) { "✓ Ready" } else { "○ Not logged in" }
        $color = if ($isCurrent) { "Green" } elseif ($hasStoredCreds) { "White" } else { "Gray" }
        
        Write-Host "  [$name] $($account.email) - $status" -ForegroundColor $color
    }
    
    if ($currentCreds) {
        Write-Host "`n🔑 Current Session:" -ForegroundColor Yellow
        Write-Host "  Subscription: $($currentCreds.claudeAiOauth.subscriptionType)" -ForegroundColor White
        Write-Host "  Rate Limit Tier: $($currentCreds.claudeAiOauth.rateLimitTier)" -ForegroundColor White
        $expiresAt = [DateTimeOffset]::FromUnixTimeMilliseconds($currentCreds.claudeAiOauth.expiresAt).LocalDateTime
        Write-Host "  Token Expires: $expiresAt" -ForegroundColor White
    }
    
    Write-Host "`n📊 Recent Activity:" -ForegroundColor Yellow
    if (Test-Path $UsageLogFile) {
        $log = Get-Content $UsageLogFile | ConvertFrom-Json
        if ($log -is [array]) {
            $recent = $log | Select-Object -Last 5
        } else {
            $recent = @($log)
        }
        foreach ($entry in $recent) {
            Write-Host "  $($entry.timestamp): [$($entry.account)] $($entry.event)" -ForegroundColor Gray
        }
    } else {
        Write-Host "  No activity logged yet" -ForegroundColor Gray
    }
    
    Write-Host ""
}

function Switch-Account {
    param([string]$TargetAccount)
    
    $accountsData = Get-AccountsData
    
    if (-not $accountsData.accounts.$TargetAccount) {
        Write-Host "❌ Account '$TargetAccount' not found. Available accounts:" -ForegroundColor Red
        foreach ($name in $accountsData.accounts.PSObject.Properties.Name) {
            Write-Host "  - $name" -ForegroundColor Yellow
        }
        return $false
    }
    
    # Backup current credentials if we have a current account
    if ($accountsData.currentAccount) {
        Backup-CurrentCredentials -AccountName $accountsData.currentAccount
    }
    
    # Try to restore saved credentials for target account
    if (Restore-Credentials -AccountName $TargetAccount) {
        Log-Usage -Account $TargetAccount -Event "SWITCH" -Details "Switched from $($accountsData.currentAccount) to $TargetAccount"
        Write-Host "`n✓ Switched to account: $TargetAccount" -ForegroundColor Green
        Write-Host "  Email: $($accountsData.accounts.$TargetAccount.email)" -ForegroundColor White
        return $true
    } else {
        Write-Host "`n⚠ No saved credentials for '$TargetAccount'. Please login manually:" -ForegroundColor Yellow
        Write-Host "  1. Run: claude" -ForegroundColor White
        Write-Host "  2. Type: /login" -ForegroundColor White
        Write-Host "  3. Select: $($accountsData.accounts.$TargetAccount.email)" -ForegroundColor White
        Write-Host "  4. After login, run: .\claude-account-manager.ps1 save $TargetAccount" -ForegroundColor White
        return $false
    }
}

function Save-CurrentAccount {
    param([string]$AccountName)
    
    if (-not $AccountName) {
        Write-Host "❌ Please specify an account name to save as" -ForegroundColor Red
        return
    }
    
    $accountsData = Get-AccountsData
    
    # Add account if it doesn't exist
    if (-not $accountsData.accounts.$AccountName) {
        $email = Read-Host "Enter email for this account"
        $description = Read-Host "Enter description (optional)"
        
        if (-not $accountsData.accounts) {
            $accountsData | Add-Member -NotePropertyName "accounts" -NotePropertyValue @{} -Force
        }
        $accountsData.accounts | Add-Member -NotePropertyName $AccountName -NotePropertyValue @{
            "email" = $email
            "description" = $description
        } -Force
    }
    
    Backup-CurrentCredentials -AccountName $AccountName
    $accountsData.currentAccount = $AccountName
    Save-AccountsData $accountsData
    
    Log-Usage -Account $AccountName -Event "SAVE" -Details "Saved credentials for $AccountName"
    Write-Host "✓ Saved current session as account: $AccountName" -ForegroundColor Green
}

function Auto-Switch {
    # Automatically switch to the next available account
    $accountsData = Get-AccountsData
    $currentAccount = $accountsData.currentAccount
    $accountNames = @($accountsData.accounts.PSObject.Properties.Name)
    
    if ($accountNames.Count -lt 2) {
        Write-Host "❌ Need at least 2 accounts configured for auto-switch" -ForegroundColor Red
        return $false
    }
    
    # Find next account
    $currentIndex = [array]::IndexOf($accountNames, $currentAccount)
    $nextIndex = ($currentIndex + 1) % $accountNames.Count
    $nextAccount = $accountNames[$nextIndex]
    
    Write-Host "🔄 Auto-switching from '$currentAccount' to '$nextAccount'..." -ForegroundColor Yellow
    return Switch-Account -TargetAccount $nextAccount
}

function Show-Help {
    Write-Host @"

╔════════════════════════════════════════════════════════════╗
║           CLAUDE ACCOUNT MANAGER - HELP                    ║
╚════════════════════════════════════════════════════════════╝

USAGE:
  .\claude-account-manager.ps1 [action] [account-name]

ACTIONS:
  status          Show current account status and configuration
  switch <name>   Switch to a specific account
  save <name>     Save current session as an account
  auto            Auto-switch to next available account
  help            Show this help message

EXAMPLES:
  .\claude-account-manager.ps1 status
  .\claude-account-manager.ps1 switch phill
  .\claude-account-manager.ps1 switch unite
  .\claude-account-manager.ps1 save myaccount
  .\claude-account-manager.ps1 auto

FIRST-TIME SETUP:
  1. Login to your first account in Claude CLI
  2. Run: .\claude-account-manager.ps1 save phill
  3. Login to your second account in Claude CLI  
  4. Run: .\claude-account-manager.ps1 save unite
  5. Now you can switch between accounts!

WHEN YOU HIT A RATE LIMIT:
  Run: .\claude-account-manager.ps1 auto
  This will switch to the next available account.

"@ -ForegroundColor White
}

# Main execution
switch ($Action.ToLower()) {
    "status" { Show-Status }
    "switch" { Switch-Account -TargetAccount $AccountName }
    "save" { Save-CurrentAccount -AccountName $AccountName }
    "auto" { Auto-Switch }
    "help" { Show-Help }
    default { 
        Write-Host "Unknown action: $Action" -ForegroundColor Red
        Show-Help
    }
}
