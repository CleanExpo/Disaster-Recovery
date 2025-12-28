# NRPG Homepage - Quick Start Guide

Get the redesigned homepage running locally in 5 minutes.

---

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Code editor (VS Code recommended)

---

## Step 1: Install Dependencies

```bash
# Navigate to project directory
cd "D:\Disaster Recovery - NRP"

# Install dependencies (if not already installed)
npm install
```

---

## Step 2: Prepare Placeholder Images

Since we don't have the actual images yet, let's create placeholder directories:

```bash
# Create image directories
mkdir -p public/images/services
mkdir -p public/images/scenarios
mkdir -p public/images/sectors
mkdir -p public/images/locations
```

**Quick Fix**: The app will fail to load images initially. You have 3 options:

### Option A: Use Placeholder Service (Recommended for Testing)
Update image paths in `app/page.tsx` temporarily:

```typescript
// Replace image paths with placeholder service
const HERO_SCENARIOS = [
  {
    // ... other props
    image: 'https://placehold.co/1600x1000/0047FF/FFFFFF?text=Residential+Flood',
  },
  // ... repeat for other scenarios
];

const pillarCardsData = SERVICE_PILLARS.map((p) => ({
  ...p,
  image: `https://placehold.co/800x500/${getColorForPillar(p.id)}/FFFFFF?text=${p.title}`,
}));

function getColorForPillar(id: string) {
  const colors = {
    water: '60A5FA',
    fire: 'FB923C',
    mould: '4ADE80',
    bio: 'F87171',
  };
  return colors[id] || '0047FF';
}
```

### Option B: Download Sample Images
Download free disaster recovery images from:
- Unsplash: https://unsplash.com/s/photos/disaster-recovery
- Pexels: https://www.pexels.com/search/emergency/

Save them to the appropriate directories with these names:
```
public/images/services/water-card.jpg
public/images/services/fire-card.jpg
public/images/services/mould-card.jpg
public/images/services/bio-card.jpg

public/images/scenarios/residential-flood.jpg
public/images/scenarios/commercial-fire.jpg
public/images/scenarios/industrial-bio.jpg
```

### Option C: Comment Out Images Temporarily
In `app/page.tsx`, add `priority` and error handling:

```typescript
<Image
  src={item.image}
  alt={item.title}
  fill
  className="object-cover"
  priority={index === 0}
  onError={(e) => {
    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500"%3E%3Crect fill="%230047FF" width="800" height="500"/%3E%3C/svg%3E';
  }}
/>
```

---

## Step 3: Update Next.js Config (if needed)

Add external image domains to `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.co'], // For placeholder images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
};

module.exports = nextConfig;
```

---

## Step 4: Run Development Server

```bash
npm run dev
```

Open your browser to: http://localhost:3000

---

## Step 5: Test Key Features

### Header Navigation
1. Hover over "Services" - MegaMenu should appear
2. Hover over "Sectors" - MegaMenu should appear
3. Hover over "Locations" - MegaMenu should appear
4. Click "1300 309 361" button - Should attempt to call (tel: link)

### Hero Section
1. Wait 5 seconds - Carousel should auto-rotate
2. Hover over carousel - Auto-rotation should pause
3. Click left/right arrows - Should navigate slides
4. Check HUD overlay - Should show sector, hazard, status

### The 1300 Blueprint
1. Scroll down - Should see 3 columns with numbers
2. Check responsive - Should stack on mobile

### Service Pillars
1. Hover over pillar card - Image should zoom, shadow should increase
2. Click pillar card - Should navigate to service page (might be 404)
3. Check protocol badges - Should show colored labels

### Client Sectors
1. Hover over sector card - Should lift up, arrow should appear
2. Click sector card - Should navigate to sector page (might be 404)

### Final CTA
1. Check blue gradient background
2. Click "1300 309 361" button - Should attempt to call

### Footer
1. Check all links (might be 404s for now)
2. Click emergency button - Should attempt to call
3. Check responsive layout

---

## Step 6: Test Responsiveness

### Desktop (1280px+)
- All MegaMenus visible
- Emergency number displayed in header
- Service pillars in 4 columns
- Sectors in 4 columns

### Tablet (768px - 1024px)
- MegaMenus still visible (lg+ breakpoint)
- Emergency number hidden
- Service pillars in 2 columns
- Sectors in 2 columns

### Mobile (< 768px)
- Hamburger menu visible (not functional yet)
- All content stacks vertically
- Service pillars in 1 column
- Sectors in 1-2 columns

**Test in Chrome DevTools**:
1. Open DevTools (F12)
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select different devices (iPhone, iPad, etc.)
4. Test landscape and portrait orientations

---

## Step 7: Check Console for Errors

Open browser console (F12 → Console tab):

### Expected Errors (OK to ignore for now)
- 404 errors for images (until you upload real images)
- 404 errors for links to pages that don't exist yet (services, sectors, etc.)
- Warning about missing images

### Unexpected Errors (Need to fix)
- TypeScript errors
- Component import errors
- Missing dependencies
- Hydration errors

---

## Troubleshooting

### Issue: "Module not found" errors
**Solution**: Make sure all dependencies are installed:
```bash
npm install
```

### Issue: Images not loading
**Solution**: Use Option A (placeholder service) from Step 2 above.

### Issue: MegaMenu not appearing
**Solution**: Check that you're hovering over the button, not just clicking. MegaMenu opens on `onMouseEnter`.

### Issue: Carousel not rotating
**Solution**: Wait 5 seconds. Auto-rotation is set to 5000ms interval.

### Issue: Styles not applying
**Solution**: Make sure Tailwind CSS is configured correctly:
```bash
# Check tailwind.config.js exists
# Check app/globals.css has @tailwind directives
```

### Issue: "useState" or "useEffect" errors
**Solution**: Make sure `app/page.tsx` has `'use client'` at the top.

### Issue: Font not loading
**Solution**: Check `app/layout.tsx` has font imports:
```typescript
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
```

---

## Next Steps After Testing

### 1. Source Real Images
- Contact photographer or use stock images
- Target dimensions:
  - Hero carousel: 1600x1000px (16:10 ratio)
  - Service pillars: 800x500px (16:10 ratio)
  - MegaMenu: 400x250px (16:10 ratio)
- Format: WebP (optimized for web)
- Size: < 200KB per image

### 2. Create Missing Pages
These pages are linked but don't exist yet:
- `/services/[slug]` - Service detail pages (4 pages)
- `/sectors/[slug]` - Sector detail pages (4 pages)
- `/locations/[state]` - Location pages (8 pages)
- `/about` - About page
- `/about/our-standards` - Standards page
- `/contractor/portal` - Contractor portal
- `/contractor/join` - Contractor signup
- `/contact` - Contact page
- `/privacy` - Privacy policy
- `/terms` - Terms of service

### 3. Implement Mobile Menu
The hamburger toggle is visible but not functional. Implement a slide-out menu:
```typescript
// Example mobile menu component
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
  <SheetTrigger asChild>
    <button aria-label="Toggle menu">
      {/* Hamburger icon */}
    </button>
  </SheetTrigger>
  <SheetContent>
    {/* Mobile menu content */}
  </SheetContent>
</Sheet>
```

### 4. Add Analytics
```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 5. Optimize Performance
- Run Lighthouse audit (Chrome DevTools → Lighthouse)
- Optimize images (use WebP, responsive sizes)
- Add loading states for dynamic content
- Implement code splitting for heavy components
- Add service worker for offline support

### 6. Deploy to Production
```bash
# If using Vercel
vercel

# If using custom server
npm run build
npm start
```

---

## Useful Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check   # (if script exists)

# Linting
npm run lint

# Format code
npm run format       # (if script exists)
```

---

## Browser DevTools Tips

### Chrome DevTools
- **Elements**: Inspect HTML/CSS
- **Console**: View errors/warnings
- **Network**: Monitor image loading
- **Performance**: Profile page load
- **Lighthouse**: Audit performance, accessibility, SEO

### Useful Shortcuts
- `F12` - Open DevTools
- `Ctrl+Shift+M` - Toggle device toolbar (responsive mode)
- `Ctrl+Shift+C` - Inspect element
- `Ctrl+Shift+P` - Command palette
- `Ctrl+R` - Reload page
- `Ctrl+Shift+R` - Hard reload (clear cache)

---

## File Structure Reference

```
D:\Disaster Recovery - NRP\
├── app/
│   ├── page.tsx                    ← REDESIGNED HOMEPAGE (736 lines)
│   ├── layout.tsx                  ← Root layout
│   └── globals.css                 ← Global styles
├── components/
│   └── nrpg/
│       ├── mega-menu.tsx           ← Navigation component
│       ├── hero-carousel.tsx       ← Carousel component
│       ├── pillar-card.tsx         ← Service card component
│       ├── emergency-button.tsx    ← CTA button component
│       └── protocol-badge.tsx      ← Badge component
├── lib/
│   ├── design-tokens.ts            ← Design system constants
│   ├── seo/
│   │   └── schema-generator.ts     ← SEO schema generator
│   └── utils.ts                    ← Utility functions
├── public/
│   └── images/
│       ├── services/               ← Service pillar images
│       ├── scenarios/              ← Hero carousel images
│       ├── sectors/                ← Sector card images
│       └── locations/              ← Location images
├── HOMEPAGE_REDESIGN_SUMMARY.md    ← Complete documentation
├── HOMEPAGE_LAYOUT_GUIDE.md        ← Visual layout reference
├── HOMEPAGE_QUICKSTART.md          ← THIS FILE
└── package.json                    ← Dependencies
```

---

## Support & Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

### Design Resources
- [NRPG Design System](./lib/design-tokens.ts)
- [Layout Guide](./HOMEPAGE_LAYOUT_GUIDE.md)
- [Component Documentation](./components/nrpg/)

### Questions?
- Check `HOMEPAGE_REDESIGN_SUMMARY.md` for detailed documentation
- Check `HOMEPAGE_LAYOUT_GUIDE.md` for visual reference
- Search codebase for examples: `grep -r "MegaMenu" components/`

---

## Success Checklist

After following this guide, you should have:

- [ ] Development server running (http://localhost:3000)
- [ ] Homepage loading without critical errors
- [ ] Header navigation working (MegaMenus appear on hover)
- [ ] Hero carousel auto-rotating
- [ ] Service pillars grid displaying
- [ ] Client sectors section visible
- [ ] Footer with working emergency button
- [ ] Responsive layout (tested on mobile, tablet, desktop)
- [ ] Console shows only expected errors (404 for images/pages)

If all items are checked, congratulations! The homepage is working locally.

---

**Next**: Upload real images and start building the missing pages.

**Status**: Ready for Development Testing
**Last Updated**: 2025-12-28
