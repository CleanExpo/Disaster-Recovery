# Disaster Recovery Services - Australia

Professional disaster recovery and restoration services website for water damage, fire damage, mould remediation, and emergency response across Australia.

## 🚀 Overview

This is a comprehensive disaster recovery and restoration services website featuring:

- 24/7 Emergency response services
- Water damage restoration
- Fire damage restoration
- Mould remediation
- Storm damage repair
- Biohazard cleaning
- Insurance claim assistance
- Location-based services across all Australian states and territories

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL (or SQLite for development)
- Stripe account (for payment processing)

### Installation

1. **Clone and install:**
```bash
git clone https://github.com/CleanExpo/Disaster-Recovery.git
cd Mass-WebPage-Creations
npm install
```

2. **Configure environment:**
Copy `.env.example` to `.env.local` and set your keys:
```bash
cp .env.example .env.local
```

3. **Set up database:**
```bash
npx prisma generate
npx prisma db push
```

4. **Run development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
Mass-WebPage-Creations/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── services/     # Service pages (water damage, fire, mould, etc.)
│   │   ├── locations/    # Location-specific pages
│   │   ├── emergency/    # Emergency service pages
│   │   ├── insurance/    # Insurance provider pages
│   │   └── api/          # API routes
│   ├── components/       # React components
│   ├── lib/              # Utilities and configs
│   └── types/            # TypeScript types
├── prisma/
│   └── schema.prisma     # Database schema
├── public/
│   └── images/           # Static images
└── scripts/              # Build and generation scripts
```

## 🌟 Key Features

### Service Pages
- Water damage restoration
- Fire damage restoration
- Mould remediation
- Storm damage repair
- Sewage cleanup
- Biohazard cleaning
- Commercial services
- Emergency services

### Location Coverage
- All Australian states and territories
- Major cities and regional areas
- 24/7 emergency response
- Local contractor network

### Lead Management
- Lead capture forms
- Partner/contractor portal
- Lead scoring and routing
- Quality assessment

## 🚀 Deployment

### Vercel Deployment

The site is configured for automatic deployment to Vercel:

1. Push changes to the main branch
2. Vercel automatically builds and deploys
3. Production URL: [https://disaster-recovery.vercel.app](https://disaster-recovery.vercel.app)

### Build Command
```bash
npm run build
```

### Environment Variables

Required environment variables for production:
- `DATABASE_URL` - Database connection string
- `NEXTAUTH_SECRET` - Authentication secret
- `STRIPE_SECRET_KEY` - Stripe API key (if using payments)
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key

## 🔧 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 📚 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL/SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## 📄 License

Proprietary - All rights reserved

## 💬 Support

For support, contact the Disaster Recovery team.
