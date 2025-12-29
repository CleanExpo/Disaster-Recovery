/**
 * Backlink Monitoring API Route
 *
 * Provides real-time backlink tracking, domain authority trends,
 * anchor text distribution, and competitor analysis.
 *
 * @module BacklinkMonitorAPI
 * @category API - Link Building
 */

import { NextRequest, NextResponse } from 'next/server';

// ============================================================================
// Mock Data (In production, integrate with Ahrefs, Moz, SEMrush APIs)
// ============================================================================

const generateMockBacklinks = (count: number) => {
  const domains = [
    'domain.com.au',
    'realestate.com.au',
    'afr.com',
    'insurancenews.com.au',
    'propertyupdate.com.au',
    'masterbuilders.com.au',
    'smartpropertyinvestment.com.au'
  ];

  const anchors = [
    'disaster recovery',
    'restoration services',
    'property restoration',
    'emergency restoration',
    'Disaster Recovery Platform',
    'find restoration professionals',
    'disaster restoration network'
  ];

  return Array.from({ length: count }, (_, i) => {
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return {
      id: `bl-${i}`,
      sourceUrl: `https://${domain}/article-${i}`,
      sourceDomain: domain,
      targetUrl: 'https://disasterrecovery.com.au',
      anchor: anchors[Math.floor(Math.random() * anchors.length)],
      domainAuthority: Math.floor(Math.random() * 40) + 50,
      isDoFollow: Math.random() > 0.3,
      firstSeen: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
      lastChecked: new Date(),
      status: Math.random() > 0.9 ? 'lost' : 'active'
    };
  });
};

const generateMockTrends = () => {
  const trends = [];
  const now = new Date();

  for (let i = 90; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    trends.push({
      date: date.toISOString().split('T')[0],
      domainAuthority: Math.floor(45 + (90 - i) * 0.15 + Math.random() * 2),
      backlinksCount: Math.floor(50 + (90 - i) * 2 + Math.random() * 10)
    });
  }

  return trends;
};

const generateMockAnchorDistribution = () => {
  const anchors = [
    'disaster recovery',
    'restoration services',
    'property restoration',
    'emergency restoration',
    'Disaster Recovery Platform',
    'find restoration professionals',
    'disaster restoration network',
    'professional restoration',
    'click here',
    'learn more',
    'disasterrecovery.com.au',
    'restoration experts',
    'disaster recovery services',
    'property damage restoration',
    'emergency services'
  ];

  return anchors.map(anchor => ({
    anchor,
    count: Math.floor(Math.random() * 50) + 5,
    percentage: Math.random() * 15 + 2
  })).sort((a, b) => b.count - a.count);
};

const generateMockCompetitors = () => {
  return [
    {
      competitor: 'ServiceMaster',
      domainAuthority: 72,
      backlinks: 1250,
      referringDomains: 320
    },
    {
      competitor: 'Paul Davis Restoration',
      domainAuthority: 68,
      backlinks: 980,
      referringDomains: 245
    },
    {
      competitor: 'BELFOR',
      domainAuthority: 70,
      backlinks: 1100,
      referringDomains: 280
    },
    {
      competitor: 'Restoration 1',
      domainAuthority: 65,
      backlinks: 850,
      referringDomains: 215
    },
    {
      competitor: 'Our Platform',
      domainAuthority: 52,
      backlinks: 320,
      referringDomains: 95
    }
  ].sort((a, b) => b.domainAuthority - a.domainAuthority);
};

// ============================================================================
// GET - Fetch backlink monitoring data
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint') || 'stats';

    switch (endpoint) {
      case 'stats': {
        const backlinks = generateMockBacklinks(320);
        const doFollow = backlinks.filter(bl => bl.isDoFollow).length;
        const active = backlinks.filter(bl => bl.status === 'active').length;
        const lost = backlinks.filter(bl => bl.status === 'lost').length;

        // Calculate new backlinks (last 30 days)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const newBacklinks = backlinks.filter(bl => bl.firstSeen > thirtyDaysAgo).length;

        // Calculate referring domains
        const referringDomains = new Set(backlinks.map(bl => bl.sourceDomain)).size;

        // Calculate average DA
        const avgDA = backlinks.reduce((sum, bl) => sum + bl.domainAuthority, 0) / backlinks.length;

        return NextResponse.json({
          total: backlinks.length,
          new: newBacklinks,
          lost,
          doFollow,
          noFollow: backlinks.length - doFollow,
          avgDomainAuthority: Math.round(avgDA),
          referringDomains
        });
      }

      case 'list': {
        const limit = parseInt(searchParams.get('limit') || '100');
        const status = searchParams.get('status');

        let backlinks = generateMockBacklinks(320);

        if (status) {
          backlinks = backlinks.filter(bl => bl.status === status);
        }

        // Sort by first seen (newest first)
        backlinks.sort((a, b) => b.firstSeen.getTime() - a.firstSeen.getTime());

        return NextResponse.json({
          backlinks: backlinks.slice(0, limit),
          total: backlinks.length
        });
      }

      case 'trends': {
        const trends = generateMockTrends();

        return NextResponse.json({
          trends,
          summary: {
            currentDA: trends[trends.length - 1]?.domainAuthority || 0,
            daChange: trends.length > 1
              ? trends[trends.length - 1].domainAuthority - trends[0].domainAuthority
              : 0,
            currentBacklinks: trends[trends.length - 1]?.backlinksCount || 0,
            backlinksGrowth: trends.length > 1
              ? trends[trends.length - 1].backlinksCount - trends[0].backlinksCount
              : 0
          }
        });
      }

      case 'anchor-distribution': {
        const distribution = generateMockAnchorDistribution();

        return NextResponse.json({
          distribution,
          summary: {
            totalAnchors: distribution.length,
            branded: distribution.filter(a =>
              a.anchor.toLowerCase().includes('disaster recovery platform')
            ).reduce((sum, a) => sum + a.count, 0),
            generic: distribution.filter(a =>
              ['click here', 'learn more', 'website'].includes(a.anchor.toLowerCase())
            ).reduce((sum, a) => sum + a.count, 0),
            exact: distribution.filter(a =>
              ['disaster recovery', 'restoration services'].includes(a.anchor.toLowerCase())
            ).reduce((sum, a) => sum + a.count, 0)
          }
        });
      }

      case 'competitors': {
        const competitors = generateMockCompetitors();

        return NextResponse.json({
          competitors,
          ourRank: competitors.findIndex(c => c.competitor === 'Our Platform') + 1,
          summary: {
            avgCompetitorDA: Math.round(
              competitors
                .filter(c => c.competitor !== 'Our Platform')
                .reduce((sum, c) => sum + c.domainAuthority, 0) / (competitors.length - 1)
            ),
            avgCompetitorBacklinks: Math.round(
              competitors
                .filter(c => c.competitor !== 'Our Platform')
                .reduce((sum, c) => sum + c.backlinks, 0) / (competitors.length - 1)
            ),
            gap: competitors[0].domainAuthority - (competitors.find(c => c.competitor === 'Our Platform')?.domainAuthority || 0)
          }
        });
      }

      case 'alerts': {
        const backlinks = generateMockBacklinks(320);
        const alerts = [];

        // Lost backlinks alert
        const lostBacklinks = backlinks.filter(bl => bl.status === 'lost');
        if (lostBacklinks.length > 5) {
          alerts.push({
            type: 'warning',
            severity: 'high',
            title: 'Multiple Backlinks Lost',
            message: `${lostBacklinks.length} backlinks have been lost in the last 30 days`,
            actionRequired: 'Review and attempt to recover high-value backlinks',
            created: new Date()
          });
        }

        // New high-authority backlinks
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const newHighDA = backlinks.filter(bl =>
          bl.firstSeen > thirtyDaysAgo && bl.domainAuthority >= 70
        );
        if (newHighDA.length > 0) {
          alerts.push({
            type: 'success',
            severity: 'medium',
            title: 'High-Authority Backlinks Acquired',
            message: `${newHighDA.length} new backlinks from DA 70+ domains`,
            actionRequired: 'Monitor and maintain these valuable links',
            created: new Date()
          });
        }

        // Anchor text over-optimization
        const distribution = generateMockAnchorDistribution();
        const topAnchor = distribution[0];
        if (topAnchor && topAnchor.percentage > 25) {
          alerts.push({
            type: 'warning',
            severity: 'medium',
            title: 'Anchor Text Over-Optimization',
            message: `"${topAnchor.anchor}" represents ${topAnchor.percentage.toFixed(1)}% of anchor text`,
            actionRequired: 'Diversify anchor text in future link building',
            created: new Date()
          });
        }

        return NextResponse.json({ alerts });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid endpoint' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Backlink monitor GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch backlink data' },
      { status: 500 }
    );
  }
}

// ============================================================================
// POST - Trigger backlink verification or monitoring tasks
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'verify_backlink': {
        const { backlinkId } = body;
        if (!backlinkId) {
          return NextResponse.json(
            { error: 'Backlink ID required' },
            { status: 400 }
          );
        }

        // In production, this would verify the backlink exists and is active
        return NextResponse.json({
          success: true,
          verified: true,
          status: 'active',
          message: 'Backlink verified successfully'
        });
      }

      case 'check_lost_backlinks': {
        // In production, this would trigger a job to check all backlinks
        const backlinks = generateMockBacklinks(320);
        const lost = backlinks.filter(bl => bl.status === 'lost');

        return NextResponse.json({
          success: true,
          checked: backlinks.length,
          lost: lost.length,
          lostBacklinks: lost,
          message: 'Backlink check completed'
        });
      }

      case 'refresh_metrics': {
        // In production, this would fetch fresh data from APIs
        return NextResponse.json({
          success: true,
          refreshed: true,
          timestamp: new Date(),
          message: 'Metrics refreshed successfully'
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Backlink monitor POST error:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
