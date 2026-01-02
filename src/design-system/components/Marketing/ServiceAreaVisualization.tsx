/**
 * ServiceAreaVisualization Component
 *
 * Heat map visualization showing contractor density across regions
 * Used to demonstrate service coverage and availability
 *
 * Features:
 * - Color-coded density visualization
 * - Interactive regions
 * - Contractor count display
 * - Legend with density levels
 * - WCAG 2.1 AA compliant
 */

import React, { useState } from 'react';
import { disasterRecoveryColors, spacing, borderRadius, boxShadows, fontFamilies, fontWeights } from '../../tokens';

export interface RegionData {
  id: string;
  name: string;
  contractorCount: number;
  density: 'low' | 'medium' | 'high' | 'very-high';
}

export interface ServiceAreaVisualizationProps {
  /** Region data with contractor counts */
  regions: RegionData[];
  /** Selected region */
  selectedRegion?: string;
  /** Callback when region is clicked */
  onRegionClick?: (regionId: string) => void;
  /** Show contractor counts */
  showCounts?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * ServiceAreaVisualization - Heat map of contractor density
 *
 * @example
 * ```tsx
 * <ServiceAreaVisualization
 *   regions={[
 *     { id: 'sydney-metro', name: 'Sydney Metro', contractorCount: 487, density: 'very-high' },
 *     { id: 'melbourne-metro', name: 'Melbourne Metro', contractorCount: 356, density: 'high' },
 *     { id: 'brisbane-metro', name: 'Brisbane Metro', contractorCount: 234, density: 'high' },
 *     { id: 'perth-metro', name: 'Perth Metro', contractorCount: 156, density: 'medium' },
 *     { id: 'adelaide-metro', name: 'Adelaide Metro', contractorCount: 98, density: 'medium' },
 *     { id: 'hobart-metro', name: 'Hobart Metro', contractorCount: 45, density: 'low' },
 *   ]}
 *   showCounts
 *   onRegionClick={(id) => console.log('Selected:', id)}
 * />
 * ```
 */
export const ServiceAreaVisualization: React.FC<ServiceAreaVisualizationProps> = ({
  regions,
  selectedRegion,
  onRegionClick,
  showCounts = true,
  className = '',
}) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const getDensityColor = (density: RegionData['density']): string => {
    switch (density) {
      case 'very-high':
        return '#047857'; // Green-700
      case 'high':
        return '#10B981'; // Green-500
      case 'medium':
        return '#FBBF24'; // Yellow-400
      case 'low':
        return '#F59E0B'; // Amber-500
      default:
        return disasterRecoveryColors.neutral[300];
    }
  };

  const getDensityBackground = (density: RegionData['density']): string => {
    switch (density) {
      case 'very-high':
        return 'rgba(4, 120, 87, 0.1)'; // Green-700 with opacity
      case 'high':
        return 'rgba(16, 185, 129, 0.1)'; // Green-500 with opacity
      case 'medium':
        return 'rgba(251, 191, 36, 0.1)'; // Yellow-400 with opacity
      case 'low':
        return 'rgba(245, 158, 11, 0.1)'; // Amber-500 with opacity
      default:
        return disasterRecoveryColors.neutral[50];
    }
  };

  const getDensityLabel = (density: RegionData['density']): string => {
    switch (density) {
      case 'very-high':
        return 'Very High Coverage';
      case 'high':
        return 'High Coverage';
      case 'medium':
        return 'Moderate Coverage';
      case 'low':
        return 'Basic Coverage';
      default:
        return 'Coverage';
    }
  };

  const containerStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: '1000px',
    margin: '0 auto',
  };

  const headerStyles: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: spacing[8],
  };

  const titleStyles: React.CSSProperties = {
    fontFamily: fontFamilies.serif,
    fontSize: '2rem',
    fontWeight: fontWeights.bold,
    color: disasterRecoveryColors.authority.text,
    marginBottom: spacing[3],
  };

  const descriptionStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: '1rem',
    color: disasterRecoveryColors.authority.textSecondary,
  };

  const gridStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: spacing[4],
    marginBottom: spacing[8],
  };

  const regionCardStyles = (region: RegionData, isHovered: boolean, isSelected: boolean): React.CSSProperties => ({
    backgroundColor: getDensityBackground(region.density),
    border: `2px solid ${isSelected ? disasterRecoveryColors.authority.primary : getDensityColor(region.density)}`,
    borderRadius: borderRadius.lg,
    padding: spacing[6],
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: isHovered || isSelected ? boxShadows.md : boxShadows.sm,
    transform: isHovered || isSelected ? 'scale(1.02)' : 'scale(1)',
  });

  const regionNameStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: '1.125rem',
    fontWeight: fontWeights.semibold,
    color: disasterRecoveryColors.authority.text,
    marginBottom: spacing[3],
  };

  const contractorCountStyles = (density: RegionData['density']): React.CSSProperties => ({
    fontFamily: fontFamilies.sans,
    fontSize: '2rem',
    fontWeight: fontWeights.bold,
    color: getDensityColor(density),
    marginBottom: spacing[2],
  });

  const densityLabelStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: '0.875rem',
    color: disasterRecoveryColors.authority.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  const legendStyles: React.CSSProperties = {
    backgroundColor: disasterRecoveryColors.neutral[50],
    border: `1px solid ${disasterRecoveryColors.neutral[200]}`,
    borderRadius: borderRadius.lg,
    padding: spacing[6],
  };

  const legendTitleStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: '1rem',
    fontWeight: fontWeights.semibold,
    color: disasterRecoveryColors.authority.text,
    marginBottom: spacing[4],
  };

  const legendItemsStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing[4],
  };

  const legendItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
  };

  const legendColorBoxStyles = (color: string): React.CSSProperties => ({
    width: '20px',
    height: '20px',
    borderRadius: borderRadius.sm,
    backgroundColor: color,
  });

  const legendLabelStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: '0.875rem',
    color: disasterRecoveryColors.authority.text,
  };

  const totalContractorsStyles: React.CSSProperties = {
    textAlign: 'center',
    marginTop: spacing[8],
    padding: spacing[6],
    backgroundColor: disasterRecoveryColors.education.background,
    borderRadius: borderRadius.lg,
  };

  const totalNumberStyles: React.CSSProperties = {
    fontFamily: fontFamilies.serif,
    fontSize: '3rem',
    fontWeight: fontWeights.bold,
    color: disasterRecoveryColors.education.primary,
    marginBottom: spacing[2],
  };

  const totalLabelStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: '1.125rem',
    color: disasterRecoveryColors.authority.text,
  };

  const totalContractors = regions.reduce((sum, region) => sum + region.contractorCount, 0);

  return (
    <div className={className} style={containerStyles}>
      {/* Header */}
      <div style={headerStyles}>
        <h2 style={titleStyles}>Service Coverage Across Australia</h2>
        <p style={descriptionStyles}>
          Our network of verified contractors ready to respond in your area
        </p>
      </div>

      {/* Region grid */}
      <div style={gridStyles}>
        {regions.map((region) => {
          const isHovered = hoveredRegion === region.id;
          const isSelected = selectedRegion === region.id;

          return (
            <div
              key={region.id}
              style={regionCardStyles(region, isHovered, isSelected)}
              onClick={() => onRegionClick?.(region.id)}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              role="button"
              tabIndex={0}
              aria-label={`${region.name}: ${region.contractorCount} contractors, ${getDensityLabel(region.density)}`}
            >
              <div style={regionNameStyles}>{region.name}</div>
              {showCounts && (
                <div style={contractorCountStyles(region.density)}>
                  {region.contractorCount}
                </div>
              )}
              <div style={densityLabelStyles}>{getDensityLabel(region.density)}</div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={legendStyles}>
        <div style={legendTitleStyles}>Coverage Legend</div>
        <div style={legendItemsStyles}>
          <div style={legendItemStyles}>
            <div style={legendColorBoxStyles('#047857')} />
            <span style={legendLabelStyles}>Very High (300+)</span>
          </div>
          <div style={legendItemStyles}>
            <div style={legendColorBoxStyles('#10B981')} />
            <span style={legendLabelStyles}>High (150-299)</span>
          </div>
          <div style={legendItemStyles}>
            <div style={legendColorBoxStyles('#FBBF24')} />
            <span style={legendLabelStyles}>Moderate (50-149)</span>
          </div>
          <div style={legendItemStyles}>
            <div style={legendColorBoxStyles('#F59E0B')} />
            <span style={legendLabelStyles}>Basic (&lt;50)</span>
          </div>
        </div>
      </div>

      {/* Total contractors */}
      <div style={totalContractorsStyles}>
        <div style={totalNumberStyles}>{totalContractors.toLocaleString()}</div>
        <div style={totalLabelStyles}>Verified Contractors Nationwide</div>
      </div>
    </div>
  );
};

ServiceAreaVisualization.displayName = 'ServiceAreaVisualization';
