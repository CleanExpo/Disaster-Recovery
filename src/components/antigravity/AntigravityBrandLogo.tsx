/**
 * AntigravityBrandLogo — Heartbeat SVG logo
 * Converted from BrandLogo.astro
 */

interface AntigravityBrandLogoProps {
  className?: string;
  width?: string;
  height?: string;
}

export function AntigravityBrandLogo({
  className = '',
  width = '100%',
  height = 'auto',
}: AntigravityBrandLogoProps) {
  return (
    <svg
      viewBox="0 0 80 32"
      className={`brand-logo-svg ${className}`}
      style={{ width, height }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 2 18 h 8 l 4 -10 l 7 20 l 6 -26 l 4 16 h 5"
        fill="none"
        stroke="var(--ag-emergency-red, #dc2626)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="36" cy="18" r="2.5" fill="var(--ag-emergency-red, #dc2626)" />
      <text
        x="40"
        y="26"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="900"
        fontSize="24"
        fill="var(--ag-emergency-red, #dc2626)"
      >
        D
      </text>
      <text
        x="58"
        y="26"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="900"
        fontSize="24"
        fill="#a0aab2"
      >
        R
      </text>
    </svg>
  );
}
