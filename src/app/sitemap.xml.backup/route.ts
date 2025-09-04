import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Dynamically import Prisma to avoid build-time issues
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    // TODO: Fetch all published SEO pages when sEOLocationPage model is added
    // const pages = await prisma.sEOLocationPage.findMany({
    //   where: {
    //     status: 'PUBLISHED'
    //   },
    //   select: {
    //     slug: true,
    //     title: true,
    //     updatedAt: true,
    //     priorityScore: true
    //   },
    //   orderBy: [
    //     { priorityScore: 'desc' },
    //     { updatedAt: 'desc' }
    //   ]
    // });
    const pages: any[] = [];

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://disasterrecovery.com.au';
    
    // Static pages
    const staticPages = [
      {
        url: '',
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: '1.0'
      },
      {
        url: '/about',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: '0.8'
      },
      {
        url: '/services',
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.9'
      },
      {
        url: '/contractor/apply',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: '0.7'
      },
      {
        url: '/contact',
        lastmod: new Date().toISOString(),
        changefreq: 'monthly',
        priority: '0.6'
      }
    ];

    // Generate XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

    // Add static pages
    for (const page of staticPages) {
      xml += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    }

    // Add dynamic SEO pages
    for (const page of pages) {
      // Calculate priority based on priority score (70-100 -> 0.5-0.9)
      const priority = Math.max(0.5, Math.min(0.9, page.priorityScore / 100)).toFixed(1);
      
      // Calculate changefreq based on priority score
      let changefreq = 'monthly';
      if (page.priorityScore >= 90) changefreq = 'weekly';
      else if (page.priorityScore >= 80) changefreq = 'monthly';
      else changefreq = 'yearly';

      xml += `
  <url>
    <loc>${baseUrl}/services/${page.slug}</loc>
    <lastmod>${page.updatedAt.toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    }

    xml += `
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      } });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?><error>Failed to generate sitemap</error>',
      {
        status: 500,
        headers: {
          'Content-Type': 'application/xml' } }
    );
  }
}