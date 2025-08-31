# Logo Integration Guide

## Files to Update:

### 1. Header Component (`/src/components/Header.tsx`)
Replace the shield/square logo with:
```tsx
import { HeaderLogo } from '@/components/Logo';
// Use: <HeaderLogo darkMode={isDarkMode} />
```

### 2. Footer Component (`/src/components/Footer.tsx`)
Replace existing logos with:
```tsx
import { FooterLogos } from '@/components/Logo';
// Use: <FooterLogos darkMode={true} />
```

### 3. Navigation (`/src/components/Navigation.tsx`)
Update logo imports and usage.

### 4. Add Logo Files:
Place logo files in `/public/logos/`:
- disaster-recovery-logo.png
- nrp-logo.png
- combined-logo.png

## Implementation Steps:
1. Copy generated component to `/src/components/Logo.tsx`
2. Add logo image files to `/public/logos/`
3. Update all components using old logo system
4. Test responsive sizing and dark mode
