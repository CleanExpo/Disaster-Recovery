import { NextResponse } from 'next/server';
import { generateSitemapEntries, generateSitemapXML } from '@/lib/sitemap-generator';

export async function GET() {
  try {
    const entries = generateSitemapEntries();
    const sitemap = generateSitemapXML(entries);
    
    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}