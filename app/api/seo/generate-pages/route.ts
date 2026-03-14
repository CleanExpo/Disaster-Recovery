import { NextRequest, NextResponse } from 'next/server';
import { generateLocationCombinations, calculatePagePriority, getEstimatedSearchVolume } from '@/lib/seo/locations';

export async function POST(req: NextRequest) {
  try {
    // Database persistence will be enabled when sEOLocationPage model is added.
    await req.json().catch(() => ({}));
    return NextResponse.json({
      success: true,
      generated: 0,
      message: 'SEO page generation will create pages when the database model is added. Preview is available via the list.',
    });
  } catch (error) {
    console.error('Error in SEO generate-pages POST:', error);
    return NextResponse.json(
      { error: 'Failed to generate SEO pages', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50', 10)));
    const state = searchParams.get('state') || '';
    const serviceType = searchParams.get('serviceType') || '';

    const combinations = generateLocationCombinations();

    let list = combinations.map((combo, index) => {
      const { location, service, propertyType, businessType } = combo;
      const businessSegment = businessType ? `-${businessType}` : '';
      const suburbSegment = location.suburb ? `-${location.suburb.toLowerCase().replace(/\s+/g, '-')}` : '';
      const slug = `${service.slug}-${propertyType.slug}${businessSegment}-${location.city.toLowerCase().replace(/\s+/g, '-')}${suburbSegment}-${location.postcode}`;
      const priorityScore = calculatePagePriority(location, service, propertyType, businessType);
      const estimatedSearchVolume = getEstimatedSearchVolume(location, service, propertyType);
      const title = `${service.name} ${propertyType.name} | ${location.city} ${location.state} ${location.postcode}`;
      const metaDescription = `${service.name} for ${propertyType.name.toLowerCase()} in ${location.city}, ${location.state}. 24/7 emergency response.`;
      return {
        id: `preview-${index}-${slug}`,
        slug,
        title,
        metaDescription,
        state: location.state,
        city: location.city,
        suburb: location.suburb,
        postcode: location.postcode,
        serviceType: service.slug,
        serviceName: service.name,
        propertyType: propertyType.slug,
        businessType: businessType ?? undefined,
        priorityScore,
        estimatedSearchVolume,
        currentRankings: null,
        organicClicks: Math.floor(estimatedSearchVolume * 0.02),
        publishedAt: new Date().toISOString(),
      };
    });

    if (state) list = list.filter((p) => p.state === state);
    if (serviceType) list = list.filter((p) => p.serviceType === serviceType);

    const total = list.length;
    const skip = (page - 1) * limit;
    const pages = list.slice(skip, skip + limit);

    return NextResponse.json({
      pages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    console.error('Error fetching SEO pages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch SEO pages' },
      { status: 500 }
    );
  }
}