# Mass WebPage Creations — CleanExpo SMB Agency Starter

A modern SaaS starter for local/trades agencies. Built for SMBs, ready for local dev, and scalable as you grow.

## 🚀 Core Features (v1)

- ✅ Multi-brand/agency support (local/regional focus)
- ✅ User management: admin, manager, client
- ✅ Audit/proposal creation, versioning, sharing
- ✅ Local search/enquiry capture
- ✅ Simple dashboards & notifications
- ✅ Billing (Stripe basic)
- ✅ White-label client portal
- ✅ CLI admin tools

## 🛠️ Getting Started (Local Dev)

### Prerequisites

- Node.js 18+ 
- PostgreSQL (or use Docker)
- Stripe account (for payments)
- Supabase account (optional, for auth)

### Installation

1. **Clone and install:**
```bash
git clone https://github.com/CleanExpo/Mass-WebPage-Creations.git
cd Mass-WebPage-Creations
npm install
```

2. **Configure environment:**
Copy `.env.example` to `.env.local` and set your keys:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:
- `DATABASE_URL`: Your PostgreSQL connection string
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `STRIPE_*`: Your Stripe API keys
- `SUPABASE_*`: Your Supabase project details (optional)

3. **Set up database:**

Using Docker (recommended):
```bash
docker-compose up -d postgres
```

Or use your local PostgreSQL installation.

Then run migrations:
```bash
npm run db:push
```

4. **Seed sample data:**
```bash
npm run seed
```

This creates demo users:
- Admin: `admin@demo.com` / `admin123`
- Manager: `manager@demo.com` / `manager123`

5. **Run development server:**
```bash
npm run dev
```

### Access Points

- **Admin Dashboard**: http://localhost:3000/dashboard
- **Client Portal**: http://localhost:3000/client
- **Public Site**: http://localhost:3000

## 📁 Project Structure

```
Mass-WebPage-Creations/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── api/          # API routes
│   │   ├── dashboard/    # Admin dashboard
│   │   ├── client/       # Client portal
│   │   └── (public)/     # Public pages
│   ├── components/       # React components
│   │   └── ui/           # UI components
│   ├── lib/              # Utilities and configs
│   ├── hooks/            # Custom React hooks
│   └── types/            # TypeScript types
├── prisma/
│   └── schema.prisma     # Database schema
├── scripts/
│   └── seed.ts           # Database seeding
├── cli/
│   └── admin.ts          # CLI admin tools
└── docker-compose.yml    # Docker configuration
```

## 🛠️ CLI Admin Tools

The project includes powerful CLI tools for admin operations:

```bash
# User management
npm run admin user:create
npm run admin user:list
npm run admin user:delete <email>

# Agency management
npm run admin agency:create
npm run admin agency:list

# Client management
npm run admin client:list
npm run admin client:list --agency <slug>

# Database operations
npm run admin db:reset    # WARNING: Deletes all data
npm run admin stats        # Show database statistics
```

## 🚀 Deployment

### Using Docker

Build and run with Docker:
```bash
docker-compose up --build
```

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Set production environment variables
3. Run migrations on production database:
```bash
npm run db:push
```

4. Start the production server:
```bash
npm start
```

## 🔧 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
npm run seed         # Seed sample data
npm run admin        # CLI admin tools
```

## 📚 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **Deployment**: Docker ready

## 🏗️ Future Roadmap

- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Email automation
- [ ] Advanced reporting
- [ ] API for third-party integrations
- [ ] Mobile app
- [ ] Enterprise features (multi-region, SSO)

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💬 Support

For support, email support@cleanexpo.com or open an issue.