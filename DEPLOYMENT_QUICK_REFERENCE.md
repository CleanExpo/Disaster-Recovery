# Deployment Quick Reference Card

Quick reference for common deployment tasks and commands.

---

## 🚀 Quick Commands

### Development
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run type-check       # TypeScript check
npm run lint             # ESLint check
```

### Testing
```bash
npm run test             # Unit tests
npm run test:e2e         # E2E tests
npm run test:all         # All tests
npm run lighthouse       # Performance audit
```

### Deployment
```bash
vercel                   # Deploy to preview
vercel --prod            # Deploy to production
npm run verify:env       # Check environment variables
npm run verify:deployment # Check deployment readiness
```

### Database
```bash
npm run db:migrate       # Run migrations (dev)
npm run db:migrate:deploy # Run migrations (prod)
npm run db:generate      # Generate Prisma client
npm run db:studio        # Open Prisma Studio
```

---

## 📋 Pre-Deployment Checklist

- [ ] All tests pass (`npm run test:all`)
- [ ] Type check passes (`npm run type-check`)
- [ ] Lint passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Environment variables verified (`npm run verify:env`)
- [ ] Deployment checks pass (`npm run verify:deployment`)
- [ ] Database migrations tested
- [ ] PR approved and merged

---

## 🔐 Required Secrets

### GitHub Repository Secrets
```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
DATABASE_URL
NEXTAUTH_SECRET
STRIPE_SECRET_KEY
```

### Vercel Environment Variables
```
DATABASE_URL
REDIS_URL
NEXTAUTH_URL
NEXTAUTH_SECRET
STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
```

---

## 🔄 Deployment Flow

### Preview (PR)
```
1. Create PR → 2. CI runs → 3. Preview deploys → 4. Tests run → 5. Review
```

### Production (Main)
```
1. Merge to main → 2. Production deploys → 3. Smoke tests → 4. Team notified
```

---

## 📊 Performance Targets

| Metric | Target |
|--------|--------|
| Performance Score | ≥85% |
| Accessibility | ≥90% |
| LCP | <2.5s |
| FID | <100ms |
| CLS | <0.1 |

---

## 🆘 Emergency Rollback

### Vercel Dashboard
1. Go to Vercel Dashboard
2. Find previous deployment
3. Click "Promote to Production"

### CLI
```bash
vercel ls                    # List deployments
vercel promote [url]         # Promote specific deployment
```

---

## 📞 Quick Support

- **Vercel Issues**: https://vercel.com/support
- **GitHub Issues**: Repository issues tab
- **Team Chat**: #deployments channel
- **On-Call**: See DEPLOYMENT_CHECKLIST.md

---

## 🔍 Troubleshooting

### Build Fails
```bash
rm -rf node_modules .next
npm ci --legacy-peer-deps
npm run build
```

### Environment Issues
```bash
npm run verify:env
vercel env ls
vercel env pull
```

### Database Issues
```bash
npx prisma db pull
npx prisma generate
npx prisma migrate deploy
```

---

## 📚 Documentation

- [Full Deployment Guide](./docs/DEPLOYMENT_GUIDE.md)
- [Deployment Checklist](./docs/DEPLOYMENT_CHECKLIST.md)
- [Build Summary](./BUILD_DEPLOYMENT_SUMMARY.md)
- [Environment Setup](./docs/README_ENV.md)

---

**Last Updated**: 2026-01-02
