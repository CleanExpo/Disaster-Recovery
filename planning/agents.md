# Agent Rules for Disaster Recovery Project

## Project Context
This is the Disaster Recovery project - a professional disaster recovery services website for Australia. This is NOT Mass-WebPage-Creations. Mass-WebPage-Creations was just a template/pathway to follow.

## Critical Rules

### 1. Project Structure
- The project MUST be in the root directory: `d:/Disaster Recovery`
- Do NOT create unnecessary nested folders
- All project files should be directly accessible from the root

### 2. Development Guidelines
- Follow PLAN MODE and ACT MODE instructions as specified
- Use Context7 MCP Tool for researching components and libraries
- DO NOT make assumptions - verify everything through Context7
- Commands, versions, etc. are VITAL - follow Context7 with accuracy

### 3. Build & Deployment
- The project uses Next.js 14+ with App Directory structure
- Vercel is the deployment platform
- Database: Prisma with SQLite for development, can upgrade to PostgreSQL for production
- Authentication: NextAuth.js
- Styling: Tailwind CSS with shadcn/ui components

### 4. Environment Variables
Required for deployment:
```
DATABASE_URL=file:./prod.db
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=[secure random string]
```

### 5. Testing Requirements
- Build MUST complete successfully before considering task complete
- Test on Vercel deployment, not just local
- Ensure all pages load without errors
- Verify dynamic routing works correctly

### 6. Documentation
- Maintain clear documentation of all changes
- Update README.md with accurate information
- Keep deployment guides current

### 7. Quality Standards
- No TypeScript errors
- Clean build output
- Proper error handling
- SEO optimization for all pages
- Mobile-responsive design

## Project-Specific Requirements

### Business Focus
- Disaster Recovery services in Australia
- 24/7 emergency response
- Insurance claim assistance
- Professional restoration services

### Key Features
- Dynamic SEO pages for locations/services
- Lead capture forms
- Insurance provider integration
- Service area coverage
- Emergency contact system

### Performance Goals
- Fast page load times
- Excellent Lighthouse scores
- SEO optimized
- Accessible (WCAG compliant)

## Working Process

### In PLAN MODE:
1. Analyze requirements thoroughly
2. Research using Context7 MCP
3. Create comprehensive plan
4. Document in Research.md and Design.md
5. Get user approval before proceeding

### In ACT MODE:
1. Follow the approved plan exactly
2. Test each component before moving on
3. Build and verify locally
4. Ensure Vercel deployment works
5. Only mark complete when 100% functional on Vercel

## Remember
- This is the DISASTER RECOVERY project
- Work from root directory
- Test everything on Vercel before completion
- No assumptions - verify with Context7
