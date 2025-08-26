# AGENTS.md - Disaster Recovery Professional Network

## 🎯 Product Mission
Transform the Australian disaster restoration industry by connecting property owners directly with IICRC-certified professionals, bypassing the broken third-party administrator (TPA) system that prioritizes cost-cutting over quality restoration.

## 🏗️ Project Overview
This is a Next.js 14+ application with TypeScript, Prisma ORM, and Tailwind CSS that serves as a professional network platform for disaster recovery services across Australia.

### Core Value Proposition
**"Why Your Restoration Should Be Led by Experts, Not Office Administrators"**

We're building a platform that disrupts the current model where:
- TPAs with no restoration experience control claims from office desks
- Builders manage restoration without specialized training
- Property owners have no choice in their restoration provider
- Quality is sacrificed for corporate profit margins

## 🎯 Product Goals & Objectives

### Primary Goals
1. **Disrupt the TPA Model**
   - Highlight the legal duty of care gap in current system
   - Educate property owners about their rights under Insurance Code of Practice
   - Demonstrate superiority of certified professionals over 3-day trained employees

2. **Build Trust Through Transparency**
   - Show real qualifications (CPP40421 Certificate IV mandatory)
   - Display IICRC certifications for every contractor
   - Publish response times and success rates
   - Enable direct property owner reviews

3. **Empower Property Owners**
   - Right to choose qualified contractors (not forced TPA appointments)
   - Fair pricing based on actual requirements
   - Direct communication with restoration professionals
   - Compensation claims support for insurer delays

4. **Professional Network Growth**
   - Attract IICRC-certified independents who left corporate builders
   - Provide lead generation for quality contractors
   - Build reputation-based marketplace
   - Create sustainable alternative to TPA system

### Success Metrics
- **User Acquisition**: 10,000 property owners in first year
- **Contractor Network**: 500+ IICRC-certified professionals
- **Response Time**: <24 hours for 95% of emergency requests
- **Customer Satisfaction**: >4.5/5 average rating
- **Claim Success Rate**: >98% first-time approval
- **Market Share**: Capture 5% of Australian restoration market in 3 years

## 🛠️ Development Environment

### Tech Stack
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS + shadcn/ui components
- **Icons**: Lucide React (MIT licensed)
- **Authentication**: NextAuth.js
- **Deployment**: Vercel
- **Analytics**: Google Analytics 4 + Microsoft Clarity

### Setup Instructions
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database and API keys

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev

# Open http://localhost:3000
```

### Key Commands
| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Next.js dev server with HMR |
| `npm run build` | Production build (NOT for dev) |
| `npm run lint` | Run ESLint checks |
| `npx tsc --noEmit` | Check TypeScript errors |
| `npx prisma studio` | Open database GUI |
| `npm test` | Run test suite |

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Landing page (duty of care focus)
│   ├── get-help/          # Lead capture for property owners
│   ├── contractors/       # Contractor network application
│   ├── services/          # Service pages (water, fire, mould)
│   ├── insurance/         # Insurance company specific pages
│   ├── locations/         # State/city specific pages
│   └── api/              # API routes
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── icons/            # Icon library
│   └── forms/            # Lead capture forms
├── lib/                  # Utilities and helpers
└── styles/              # Global styles
```

## 🎨 Design Principles

### Visual Hierarchy
1. **Emergency CTAs**: Red/orange for immediate action
2. **Trust Signals**: Blue/green for certifications
3. **Warnings**: Red backgrounds for TPA failures
4. **Success**: Green for professional advantages

### Content Strategy
- **Problem-Agitate-Solution**: Highlight TPA failures first
- **Social Proof**: Certifications, memberships, reviews
- **Urgency**: 24/7 emergency response messaging
- **Authority**: Legal rights and compliance information

### User Flows
1. **Emergency Path**: Homepage → Get Help → Lead Form → Contractor Match
2. **Research Path**: Homepage → Why Professionals → Services → Get Quote
3. **Contractor Path**: Homepage → Join Network → Apply → Verification

## 🚀 Feature Development Priorities

### Phase 1: Foundation (Current)
- [x] Landing page with duty of care messaging
- [x] Professional vs TPA comparison tables
- [x] Service pages for water/fire/mould damage
- [x] Location-based SEO pages
- [x] Lead capture system
- [ ] Basic contractor application flow

### Phase 2: Network Building
- [ ] Contractor verification system
- [ ] Professional profile pages
- [ ] Service radius selection
- [ ] Quote request system
- [ ] Review and rating system
- [ ] Insurance claim tracking

### Phase 3: Marketplace
- [ ] Real-time job matching
- [ ] Competitive bidding system
- [ ] Direct messaging platform
- [ ] Document management
- [ ] Payment processing
- [ ] Mobile apps

### Phase 4: Industry Disruption
- [ ] Insurance company partnerships
- [ ] Direct claim processing
- [ ] AI-powered damage assessment
- [ ] Predictive maintenance alerts
- [ ] Industry certification program
- [ ] Franchise model for regions

## 🎯 SEO & Marketing Strategy

### Target Keywords
- **Primary**: disaster recovery, water damage restoration, fire damage, mould remediation
- **Location**: [city] + restoration services
- **Comparison**: professional vs DIY, IICRC certified vs uncertified
- **Emergency**: 24 hour emergency restoration, after hours
- **Insurance**: insurance approved restoration, claim help

### Content Pillars
1. **Education**: Why TPAs fail property owners
2. **Authority**: IICRC standards and certifications
3. **Trust**: Legal rights and duty of care
4. **Urgency**: Emergency response capabilities
5. **Local**: City-specific disaster information

## 🔒 Security & Compliance

### Requirements
- GDPR/Privacy Act compliance for user data
- SSL/TLS encryption for all pages
- Secure lead storage with encryption
- Regular security audits
- Insurance verification for contractors
- Background checks for network members

### Data Protection
- Personal information encrypted at rest
- No storage of payment information
- Regular database backups
- Audit logs for all actions
- CAPTCHA on all forms

## 🧪 Testing Guidelines

### Before Committing
1. Run `npm run lint` - must pass with no errors
2. Run `npx tsc --noEmit` - must have no TypeScript errors
3. Test responsive design on mobile/tablet/desktop
4. Verify all links work correctly
5. Check page load speed (<3 seconds)
6. Test form submissions
7. Verify SEO meta tags

### Browser Support
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile browsers ✅

## 📝 Content Guidelines

### Tone of Voice
- **Professional** but approachable
- **Urgent** without fear-mongering
- **Educational** not salesy
- **Empowering** property owners
- **Critical** of TPA system backed by facts

### Key Messages
1. "Restoration requires 200+ hours training, not 3 days"
2. "Legal duty of care that TPAs don't have"
3. "Choose your contractor, don't be assigned one"
4. "Direct accountability, not corporate shields"
5. "Your property, your choice, your rights"

## 🤝 Contributing Guidelines

### For AI Agents
1. **Always preserve the duty of care messaging** - This is our core differentiator
2. **Maintain professional credibility** - Use accurate industry terms (IICRC, CPP40421, etc.)
3. **Prioritize user trust** - Security and privacy over features
4. **Keep it fast** - Page load <3 seconds, Lighthouse score >90
5. **Mobile-first** - 70% of emergency searches are mobile
6. **Test everything** - No commits without testing

### Code Standards
- TypeScript strict mode always on
- Components should be under 200 lines
- Use existing UI components from shadcn/ui
- Comment complex business logic
- Keep functions pure when possible
- Avoid 'any' type - be specific

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/description

# Make changes and test
npm run lint
npx tsc --noEmit

# Commit with clear message
git commit -m "feat: Add contractor verification system"

# Push and create PR
git push origin feature/description
```

## 📞 Support & Resources

### Industry References
- IICRC: https://www.iicrc.org/
- Insurance Code of Practice: https://insurancecode.org.au/
- CARSI: https://carsi.org.au/
- Australian Building Codes Board: https://www.abcb.gov.au/

### Design Resources
- Brand Colors: Blue (#3B82F6), Red (#DC2626), Green (#10B981)
- Icons: Lucide React (https://lucide.dev/)
- Fonts: System UI stack for performance
- Images: Store in /public/images/ optimized WebP format

### External Services
- Database: PostgreSQL (Supabase/Vercel Postgres)
- Email: SendGrid/Resend for notifications
- Analytics: Google Analytics 4
- Monitoring: Vercel Analytics
- Error Tracking: Sentry

## 🎯 The Big Picture

We're not just building another service directory. We're creating a movement that:
1. **Exposes** the broken TPA system
2. **Educates** property owners about their rights
3. **Empowers** them to choose quality over cost-cutting
4. **Elevates** professional standards in the industry
5. **Eliminates** the middleman taking profits without adding value

Every feature, every line of code, every design decision should support this mission.

## 🚨 Important Reminders

- **Never compromise on the duty of care message** - It's our foundation
- **Always highlight professional certifications** - Trust through transparency
- **Keep emergency CTAs prominent** - Lives and properties are at stake
- **Maintain fast load times** - Emergencies can't wait for slow sites
- **Protect user data fiercely** - Trust is everything
- **Test on real devices** - Desktop testing isn't enough
- **Document significant changes** - Future agents need context

---

*This AGENTS.md is a living document. Update it as the product evolves, but never lose sight of the mission: Professional restoration by certified experts, not office administrators.*