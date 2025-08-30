# Image Assets Directory Structure

## Required Images to Copy

Please copy the following images to their respective directories:

### 1. Logos Directory (`/public/images/logos/`)
- **disaster-recovery-logo.png** - Copy from: `3D Disaster Recovery Logo.png`
  - Main company logo with teal house icon and orange/black text
  - Used in: Header, Footer, About pages
  
- **nrp-logo.png** - Copy from: `NRP Favicon.ico` (convert to PNG)
  - National Restoration Professionals logo
  - Used in: Contractor portal, NRP sections

### 2. Team Directory (`/public/images/team/`)
- **shane-founder.png** - Copy from: `Gemini_Generated_Image_2iwbhh2iwbhh2iwb (1).png`
  - Photo of Shane, the company founder
  - Professional photo in blue shirt
  - Used in: About page, Team section, Leadership

### 3. Favicons Directory (`/public/`)
- **favicon.ico** - Copy from: `NRP Favicon.ico`
- Create these variants from the Disaster Recovery logo:
  - **icon-16x16.png** - 16x16 pixels
  - **icon-32x32.png** - 32x32 pixels
  - **icon-192x192.png** - 192x192 pixels (PWA)
  - **icon-512x512.png** - 512x512 pixels (PWA)
  - **apple-touch-icon.png** - 180x180 pixels

### 4. Social Media Images (`/public/images/`)
- **disaster-recovery-og.jpg** - Open Graph image (1200x630px)
  - Generated from Disaster Recovery logo
  - For social media sharing
  
- **disaster-recovery-twitter.jpg** - Twitter card image (1200x600px)  
  - Generated from Disaster Recovery logo
  - For Twitter shares

## Image Metadata

All images should include the following metadata:
- Title: Company/Person name
- Description: Purpose of the image
- Copyright: © 2025 Disaster Recovery Australia / NRP
- Author: Disaster Recovery Australia

## Optimization Requirements

- **PNG Format**: For logos with transparency
- **WebP Format**: Create WebP versions for better performance
- **JPEG Format**: For photos (Shane's photo)
- **Sizes**: 
  - Logo: Original, 500px width, 200px width
  - Team photos: 800x800, 400x400, 200x200
  - Favicons: As specified above

## Color Palette from Logos
Based on the provided logos:
- **Teal/Dark Cyan**: #1a5f66 (house icon)
- **Orange**: #ff6b35 (accent color, "RECOVERY" text)
- **Black**: #1a1a1a (main text)
- **White**: #ffffff (background)

## Usage in Code

```jsx
// Header Logo
<Image 
  src="/images/logos/disaster-recovery-logo.png"
  alt="Disaster Recovery Australia - Property Restoration Services"
  width={200}
  height={60}
  priority
/>

// NRP Logo
<Image 
  src="/images/logos/nrp-logo.png"
  alt="National Restoration Professionals"
  width={150}
  height={50}
/>

// Founder Photo
<Image 
  src="/images/team/shane-founder.jpg"
  alt="Shane - Founder and CEO of Disaster Recovery Australia"
  width={400}
  height={400}
  className="rounded-full"
/>

// Favicon in HTML head
<link rel="icon" href="/favicon.ico" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

## Manual Copy Instructions

1. Navigate to `D:\Disaster Recovery\public\images\`
2. Create subdirectories: `logos`, `team`
3. Copy and rename the files as specified above
4. Optimize images using online tools if needed:
   - TinyPNG for PNG compression
   - Squoosh for WebP conversion
   - ImageOptim for general optimization