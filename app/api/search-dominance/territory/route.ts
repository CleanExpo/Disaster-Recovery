/**
 * Search Dominance Territory API
 *
 * GET /api/search-dominance/territory
 * Returns geographic coverage and SEO activation status
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database/prisma-client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Query parameters
    const state = searchParams.get('state') || undefined;
    const seoActivated = searchParams.get('seoActivated') === 'true' ? true : undefined;
    const minPopulation = parseInt(searchParams.get('minPopulation') || '0');

    const where: any = {};

    if (state) where.state = state;
    if (seoActivated !== undefined) where.seoActivated = seoActivated;
    if (minPopulation > 0) {
      // Filter by population tier (assuming populationTier maps to population ranges)
      where.populationTier = { gte: minPopulation };
    }

    // Get all service areas
    const areas = await prisma.contractorServiceArea.findMany({
      where,
      select: {
        id: true,
        postcode: true,
        suburb: true,
        state: true,
        populationTier: true,
        seoActivated: true,
        activatedAt: true,
        landingPageUrl: true,
        currentRank: true,
        monthlySearches: true,
        contractorId: true,
      },
      orderBy: [
        { seoActivated: 'desc' },
        { populationTier: 'desc' },
      ],
    });

    // Calculate statistics by state
    const byState = areas.reduce((acc: any, area) => {
      const state = area.state;
      if (!acc[state]) {
        acc[state] = {
          state,
          total: 0,
          seoActivated: 0,
          avgRank: 0,
          totalSearches: 0,
          areas: [],
        };
      }

      acc[state].total += 1;
      if (area.seoActivated) {
        acc[state].seoActivated += 1;
        if (area.currentRank) {
          acc[state].avgRank += area.currentRank;
        }
      }
      if (area.monthlySearches) {
        acc[state].totalSearches += area.monthlySearches;
      }

      acc[state].areas.push({
        id: area.id,
        postcode: area.postcode,
        suburb: area.suburb,
        seoActivated: area.seoActivated,
        currentRank: area.currentRank,
        monthlySearches: area.monthlySearches,
      });

      return acc;
    }, {});

    // Calculate averages
    Object.values(byState).forEach((state: any) => {
      if (state.seoActivated > 0 && state.avgRank > 0) {
        state.avgRank = state.avgRank / state.seoActivated;
      } else {
        state.avgRank = null;
      }
    });

    // Overall statistics
    const stats = {
      totalAreas: areas.length,
      seoActivated: areas.filter((a) => a.seoActivated).length,
      activationRate: areas.length > 0
        ? (areas.filter((a) => a.seoActivated).length / areas.length) * 100
        : 0,
      byState: Object.values(byState).map((state: any) => ({
        state: state.state,
        total: state.total,
        seoActivated: state.seoActivated,
        activationRate: state.total > 0 ? (state.seoActivated / state.total) * 100 : 0,
        avgRank: state.avgRank,
        totalSearches: state.totalSearches,
      })),
      avgRank: (() => {
        const rankedAreas = areas.filter((a) => a.currentRank);
        return rankedAreas.length > 0
          ? rankedAreas.reduce((sum, a) => sum + (a.currentRank || 0), 0) / rankedAreas.length
          : null;
      })(),
      totalMonthlySearches: areas.reduce((sum, a) => sum + (a.monthlySearches || 0), 0),
      recentActivations: areas
        .filter((a) => a.activatedAt)
        .sort((a, b) => (b.activatedAt?.getTime() || 0) - (a.activatedAt?.getTime() || 0))
        .slice(0, 10)
        .map((a) => ({
          suburb: a.suburb,
          postcode: a.postcode,
          state: a.state,
          activatedAt: a.activatedAt,
        })),
    };

    // Priority areas (high search volume, not activated)
    const priorityAreas = areas
      .filter((a) => !a.seoActivated && (a.monthlySearches || 0) > 100)
      .sort((a, b) => (b.monthlySearches || 0) - (a.monthlySearches || 0))
      .slice(0, 20)
      .map((a) => ({
        id: a.id,
        suburb: a.suburb,
        postcode: a.postcode,
        state: a.state,
        monthlySearches: a.monthlySearches,
        populationTier: a.populationTier,
      }));

    // Top performing areas (activated with good ranks)
    const topPerforming = areas
      .filter((a) => a.seoActivated && a.currentRank && a.currentRank <= 10)
      .sort((a, b) => (a.currentRank || 0) - (b.currentRank || 0))
      .slice(0, 20)
      .map((a) => ({
        id: a.id,
        suburb: a.suburb,
        postcode: a.postcode,
        state: a.state,
        currentRank: a.currentRank,
        monthlySearches: a.monthlySearches,
        landingPageUrl: a.landingPageUrl,
      }));

    return NextResponse.json({
      stats,
      byState: Object.values(byState),
      priorityAreas,
      topPerforming,
      areas: areas.slice(0, 100).map((a) => ({
        id: a.id,
        postcode: a.postcode,
        suburb: a.suburb,
        state: a.state,
        seoActivated: a.seoActivated,
        currentRank: a.currentRank,
        monthlySearches: a.monthlySearches,
        landingPageUrl: a.landingPageUrl,
      })),
    });
  } catch (error) {
    console.error('[API] Error fetching territory data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch territory data' },
      { status: 500 }
    );
  }
}
