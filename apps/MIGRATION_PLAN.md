# Monorepo Migration Plan

## Current Structure

The application currently runs as a single Next.js app in the root directory.

## Future Structure

- **apps/website** - Public-facing disaster recovery website (current root app)
- **apps/crm** - Internal CRM for staff (future)
- **apps/contractor** - Contractor portal (future)
- **packages/ui** - Shared UI components
- **packages/tailwind-config** - Shared design tokens
- **packages/eslint-config** - Shared linting rules
- **packages/tsconfig** - Shared TypeScript config
- **packages/auth** - Shared authentication

## Migration Steps (Future)

1. Copy current app to apps/website
2. Update imports and paths
3. Configure Turbo for monorepo builds
4. Deploy apps to subdomains:
   - website: www.disasterrecovery.com.au
   - crm: crm.disasterrecovery.com.au
   - contractor: contractors.disasterrecovery.com.au

## Benefits

- Code sharing between apps
- Consistent design system
- Single source of truth for auth
- Parallel development
- Independent deployments
