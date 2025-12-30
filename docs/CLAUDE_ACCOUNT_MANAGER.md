# Claude Account Manager

A PowerShell-based tool to manage multiple Claude CLI accounts and automatically switch between them when rate limits are hit.

## Problem Solved

When using Claude CLI with multiple accounts (e.g., `phill.mcgurk@gmail.com` and `contact@unite-group.in`), you may hit rate limits on one account. This tool allows you to:

1. **Save credentials** for multiple accounts
2. **Quickly switch** between accounts
3. **Auto-rotate** to the next available account when limits are hit
4. **Track usage** across accounts

## Installation

The scripts are located in `scripts/`:
- `claude-account-manager.ps1` - Main PowerShell script
- `claude-switch.bat` - Quick batch file wrapper

### Optional: Add to PATH

To use `claude-switch` from anywhere, add the scripts folder to your PATH:

```powershell
# Add to user PATH (run in PowerShell as Administrator)
$scriptsPath = "D:\Disaster Recovery - NRP\scripts"
$currentPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($currentPath -notlike "*$scriptsPath*") {
    [Environment]::SetEnvironmentVariable("Path", "$currentPath;$scriptsPath", "User")
}
```

## First-Time Setup

### Step 1: Save Your First Account

1. Make sure you're logged into Claude CLI with your first account:
   ```
   claude
   # If not logged in, type: /login
   # Select: phill.mcgurk@gmail.com
   ```

2. Exit Claude CLI (Ctrl+C or type `/exit`)

3. Save the credentials:
   ```powershell
   cd "D:\Disaster Recovery - NRP\scripts"
   .\claude-account-manager.ps1 save phill
   ```

### Step 2: Save Your Second Account

1. Login to Claude CLI with your second account:
   ```
   claude
   # Type: /login
   # Select: contact@unite-group.in
   ```

2. Exit Claude CLI

3. Save the credentials:
   ```powershell
   .\claude-account-manager.ps1 save unite
   ```

### Step 3: Verify Setup

```powershell
.\claude-account-manager.ps1 status
```

You should see both accounts listed with "✓ Ready" status.

## Usage

### Check Status
```powershell
.\claude-account-manager.ps1 status
# or
.\claude-switch.bat
```

### Switch to Specific Account
```powershell
.\claude-account-manager.ps1 switch phill
.\claude-account-manager.ps1 switch unite
# or
.\claude-switch.bat phill
.\claude-switch.bat unite
```

### Auto-Switch (When Rate Limited)
```powershell
.\claude-account-manager.ps1 auto
# or
.\claude-switch.bat auto
```

### Show Help
```powershell
.\claude-account-manager.ps1 help
```

## When You Hit a Rate Limit

When you see this message in Claude CLI:
```
⎿  You've hit your limit · resets Jan 2, 2026, 2am (Australia/Brisbane)
   /extra-usage to finish what you're working on.
```

Simply run:
```powershell
.\claude-switch.bat auto
```

Then restart Claude CLI:
```
claude
```

## How It Works

1. **Credentials Storage**: The tool stores OAuth credentials for each account in `~/.claude/accounts.json`
2. **Switching**: When you switch accounts, it backs up current credentials and restores the target account's credentials to `~/.claude/.credentials.json`
3. **Logging**: All switches are logged to `~/.claude/usage-log.json` for tracking

## File Locations

| File | Location | Purpose |
|------|----------|---------|
| Main Script | `scripts/claude-account-manager.ps1` | PowerShell account manager |
| Batch Wrapper | `scripts/claude-switch.bat` | Quick command-line access |
| Accounts Data | `~/.claude/accounts.json` | Stored account credentials |
| Usage Log | `~/.claude/usage-log.json` | Switch history |
| Active Creds | `~/.claude/.credentials.json` | Current active credentials |

## Adding More Accounts

To add a third (or more) account:

1. Login to Claude CLI with the new account
2. Save it with a unique name:
   ```powershell
   .\claude-account-manager.ps1 save myaccount
   ```

## Troubleshooting

### "No saved credentials for account"
You need to login to that account first and save it:
1. Run `claude`
2. Type `/login` and select the account
3. Exit and run `.\claude-account-manager.ps1 save <name>`

### Credentials expired
OAuth tokens expire. If switching fails:
1. Login manually: `claude` → `/login`
2. Re-save: `.\claude-account-manager.ps1 save <name>`

### Script execution policy error
Run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Security Notes

- Credentials are stored locally in your user profile (`~/.claude/`)
- The `accounts.json` file contains OAuth tokens - keep it secure
- Do not commit these files to version control (they're in `.gitignore`)

## Quick Reference

| Command | Description |
|---------|-------------|
| `.\claude-switch.bat` | Show status |
| `.\claude-switch.bat phill` | Switch to phill account |
| `.\claude-switch.bat unite` | Switch to unite account |
| `.\claude-switch.bat auto` | Auto-switch to next account |
| `.\claude-switch.bat help` | Show help |
