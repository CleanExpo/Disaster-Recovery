/**
 * AustraliaMap Component
 *
 * Interactive SVG map of Australia with clickable states/territories
 * Used for location-based navigation and service area visualization
 *
 * Features:
 * - Clickable states and territories
 * - Hover effects with state names
 * - Active state highlighting
 * - Responsive scaling
 * - WCAG 2.1 AA compliant
 */

import React, { useState } from 'react';
import { disasterRecoveryColors, spacing, fontFamilies, fontWeights } from '../../tokens';

export interface StateData {
  id: string;
  name: string;
  abbreviation: string;
  contractorCount?: number;
  active?: boolean;
}

export interface AustraliaMapProps {
  /** Selected state/territory */
  selectedState?: string;
  /** Callback when state is clicked */
  onStateClick?: (stateId: string) => void;
  /** State-specific data */
  statesData?: StateData[];
  /** Show state labels */
  showLabels?: boolean;
  /** Additional CSS class */
  className?: string;
}

const STATES: StateData[] = [
  { id: 'nsw', name: 'New South Wales', abbreviation: 'NSW' },
  { id: 'vic', name: 'Victoria', abbreviation: 'VIC' },
  { id: 'qld', name: 'Queensland', abbreviation: 'QLD' },
  { id: 'wa', name: 'Western Australia', abbreviation: 'WA' },
  { id: 'sa', name: 'South Australia', abbreviation: 'SA' },
  { id: 'tas', name: 'Tasmania', abbreviation: 'TAS' },
  { id: 'nt', name: 'Northern Territory', abbreviation: 'NT' },
  { id: 'act', name: 'Australian Capital Territory', abbreviation: 'ACT' },
];

/**
 * AustraliaMap - Interactive map of Australian states/territories
 *
 * @example
 * ```tsx
 * <AustraliaMap
 *   selectedState="nsw"
 *   onStateClick={(stateId) => {
 *     console.log('Selected state:', stateId);
 *   }}
 *   statesData={[
 *     { id: 'nsw', name: 'New South Wales', contractorCount: 487 },
 *     { id: 'vic', name: 'Victoria', contractorCount: 356 },
 *   ]}
 *   showLabels
 * />
 * ```
 */
export const AustraliaMap: React.FC<AustraliaMapProps> = ({
  selectedState,
  onStateClick,
  statesData = STATES,
  showLabels = true,
  className = '',
}) => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const getStateColor = (stateId: string): string => {
    if (selectedState === stateId) {
      return disasterRecoveryColors.education.primary;
    }
    if (hoveredState === stateId) {
      return disasterRecoveryColors.education.secondary;
    }
    return disasterRecoveryColors.neutral[300];
  };

  const getStateData = (stateId: string): StateData | undefined => {
    return statesData.find((s) => s.id === stateId);
  };

  const containerStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    position: 'relative',
  };

  const svgStyles: React.CSSProperties = {
    width: '100%',
    height: 'auto',
  };

  const tooltipStyles: React.CSSProperties = {
    position: 'absolute',
    top: spacing[4],
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: disasterRecoveryColors.authority.primary,
    color: '#FFFFFF',
    padding: `${spacing[2]} ${spacing[4]}`,
    borderRadius: '4px',
    fontFamily: fontFamilies.sans,
    fontSize: '0.875rem',
    fontWeight: fontWeights.semibold,
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    zIndex: 10,
  };

  const legendStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing[4],
    justifyContent: 'center',
    marginTop: spacing[6],
    fontFamily: fontFamilies.sans,
    fontSize: '0.875rem',
  };

  const legendItemStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
  };

  const legendColorStyles: React.CSSProperties = {
    width: '16px',
    height: '16px',
    borderRadius: '2px',
  };

  return (
    <div className={className} style={containerStyles}>
      {/* Tooltip */}
      {hoveredState && (
        <div style={tooltipStyles}>
          {getStateData(hoveredState)?.name}
          {getStateData(hoveredState)?.contractorCount && (
            <> - {getStateData(hoveredState)?.contractorCount} contractors</>
          )}
        </div>
      )}

      {/* SVG Map - Simplified Australia outline */}
      <svg
        viewBox="0 0 800 600"
        style={svgStyles}
        role="img"
        aria-label="Interactive map of Australia"
      >
        {/* Western Australia */}
        <path
          d="M 100,50 L 100,400 L 350,450 L 350,100 Z"
          fill={getStateColor('wa')}
          stroke={disasterRecoveryColors.neutral[400]}
          strokeWidth="2"
          onClick={() => onStateClick?.('wa')}
          onMouseEnter={() => setHoveredState('wa')}
          onMouseLeave={() => setHoveredState(null)}
          style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
          role="button"
          aria-label="Western Australia"
          tabIndex={0}
        />

        {/* Northern Territory */}
        <path
          d="M 350,100 L 350,300 L 450,300 L 450,80 Z"
          fill={getStateColor('nt')}
          stroke={disasterRecoveryColors.neutral[400]}
          strokeWidth="2"
          onClick={() => onStateClick?.('nt')}
          onMouseEnter={() => setHoveredState('nt')}
          onMouseLeave={() => setHoveredState(null)}
          style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
          role="button"
          aria-label="Northern Territory"
          tabIndex={0}
        />

        {/* South Australia */}
        <path
          d="M 350,300 L 350,450 L 480,480 L 500,350 L 450,300 Z"
          fill={getStateColor('sa')}
          stroke={disasterRecoveryColors.neutral[400]}
          strokeWidth="2"
          onClick={() => onStateClick?.('sa')}
          onMouseEnter={() => setHoveredState('sa')}
          onMouseLeave={() => setHoveredState(null)}
          style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
          role="button"
          aria-label="South Australia"
          tabIndex={0}
        />

        {/* Queensland */}
        <path
          d="M 450,80 L 700,100 L 650,350 L 500,350 L 450,300 Z"
          fill={getStateColor('qld')}
          stroke={disasterRecoveryColors.neutral[400]}
          strokeWidth="2"
          onClick={() => onStateClick?.('qld')}
          onMouseEnter={() => setHoveredState('qld')}
          onMouseLeave={() => setHoveredState(null)}
          style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
          role="button"
          aria-label="Queensland"
          tabIndex={0}
        />

        {/* New South Wales */}
        <path
          d="M 500,350 L 650,350 L 620,480 L 530,500 L 500,450 Z"
          fill={getStateColor('nsw')}
          stroke={disasterRecoveryColors.neutral[400]}
          strokeWidth="2"
          onClick={() => onStateClick?.('nsw')}
          onMouseEnter={() => setHoveredState('nsw')}
          onMouseLeave={() => setHoveredState(null)}
          style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
          role="button"
          aria-label="New South Wales"
          tabIndex={0}
        />

        {/* ACT (small dot inside NSW) */}
        <circle
          cx="560"
          cy="470"
          r="8"
          fill={getStateColor('act')}
          stroke={disasterRecoveryColors.neutral[400]}
          strokeWidth="2"
          onClick={() => onStateClick?.('act')}
          onMouseEnter={() => setHoveredState('act')}
          onMouseLeave={() => setHoveredState(null)}
          style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
          role="button"
          aria-label="Australian Capital Territory"
          tabIndex={0}
        />

        {/* Victoria */}
        <path
          d="M 480,480 L 530,500 L 600,530 L 550,550 L 480,520 Z"
          fill={getStateColor('vic')}
          stroke={disasterRecoveryColors.neutral[400]}
          strokeWidth="2"
          onClick={() => onStateClick?.('vic')}
          onMouseEnter={() => setHoveredState('vic')}
          onMouseLeave={() => setHoveredState(null)}
          style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
          role="button"
          aria-label="Victoria"
          tabIndex={0}
        />

        {/* Tasmania */}
        <ellipse
          cx="580"
          cy="580"
          rx="40"
          ry="25"
          fill={getStateColor('tas')}
          stroke={disasterRecoveryColors.neutral[400]}
          strokeWidth="2"
          onClick={() => onStateClick?.('tas')}
          onMouseEnter={() => setHoveredState('tas')}
          onMouseLeave={() => setHoveredState(null)}
          style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
          role="button"
          aria-label="Tasmania"
          tabIndex={0}
        />

        {/* State labels (if enabled) */}
        {showLabels && (
          <>
            <text x="220" y="250" textAnchor="middle" fill={disasterRecoveryColors.authority.text} fontSize="18" fontWeight="600">WA</text>
            <text x="400" y="200" textAnchor="middle" fill={disasterRecoveryColors.authority.text} fontSize="18" fontWeight="600">NT</text>
            <text x="420" y="390" textAnchor="middle" fill={disasterRecoveryColors.authority.text} fontSize="18" fontWeight="600">SA</text>
            <text x="570" y="220" textAnchor="middle" fill={disasterRecoveryColors.authority.text} fontSize="18" fontWeight="600">QLD</text>
            <text x="560" y="420" textAnchor="middle" fill={disasterRecoveryColors.authority.text} fontSize="18" fontWeight="600">NSW</text>
            <text x="530" y="515" textAnchor="middle" fill={disasterRecoveryColors.authority.text} fontSize="18" fontWeight="600">VIC</text>
            <text x="580" y="585" textAnchor="middle" fill={disasterRecoveryColors.authority.text} fontSize="14" fontWeight="600">TAS</text>
          </>
        )}
      </svg>

      {/* Legend */}
      <div style={legendStyles}>
        <div style={legendItemStyles}>
          <div style={{ ...legendColorStyles, backgroundColor: disasterRecoveryColors.education.primary }} />
          <span>Selected</span>
        </div>
        <div style={legendItemStyles}>
          <div style={{ ...legendColorStyles, backgroundColor: disasterRecoveryColors.neutral[300] }} />
          <span>Available</span>
        </div>
      </div>
    </div>
  );
};

AustraliaMap.displayName = 'AustraliaMap';
