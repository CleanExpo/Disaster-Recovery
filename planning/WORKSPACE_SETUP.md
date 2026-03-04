# Future Workspace Configuration

When ready to migrate to monorepo, add to package.json:

{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}

Then install Turbo:
npm install -D turbo

Update scripts in root package.json:
{
  "scripts": {
    "dev": "turbo dev",
    "dev:website": "turbo dev --filter=website",
    "dev:crm": "turbo dev --filter=crm",
    "dev:contractor": "turbo dev --filter=contractor",
    "build": "turbo build",
    "lint": "turbo lint",
    "type-check": "turbo type-check"
  }
}
