# Upstash Setup for Context7 MCP

## Steps to Enable Context7-Upstash MCP:

1. **Create Upstash Account**
   - Go to https://upstash.com
   - Sign up for a free account

2. **Create a Vector Database**
   - In the Upstash console, click "Create Database"
   - Choose "Vector" database type
   - Select your region (choose closest to you)
   - Name your database (e.g., "context7-mcp")
   - Click "Create"

3. **Get Your Credentials**
   - After creating the database, go to the "REST API" tab
   - Copy the following:
     - `UPSTASH_VECTOR_REST_URL` (starts with https://)
     - `UPSTASH_VECTOR_REST_TOKEN` (a long string)

4. **Update Claude Configuration**
   Once you have your credentials, update the file:
   `C:\Users\Disaster Recovery 4\AppData\Roaming\Claude\claude_desktop_config.json`

   Add this section to the mcpServers object:
   ```json
   "context7-upstash": {
     "command": "npx",
     "args": ["@upstash/context7-mcp"],
     "env": {
       "UPSTASH_VECTOR_REST_URL": "YOUR_ACTUAL_URL_HERE",
       "UPSTASH_VECTOR_REST_TOKEN": "YOUR_ACTUAL_TOKEN_HERE"
     }
   }
   ```

5. **Restart Claude Desktop**
   - Close Claude Desktop completely
   - Reopen it for the changes to take effect

## Current MCP Servers Status:

✅ **Playwright** - Connected and working
✅ **Sequential-thinking** - Configured and ready
✅ **Memory** - Installed and configured
⏸️ **Context7-Upstash** - Waiting for Upstash credentials

## Notes:
- The Context7 MCP provides persistent memory across conversations
- Upstash offers a free tier that should be sufficient for personal use
- Keep your credentials secure and never commit them to git