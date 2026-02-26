import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Service type display names for human-readable labels
const SERVICE_LABELS: Record<string, string> = {
  'water-damage-restoration': 'Water Damage Restoration',
  'fire-damage-restoration': 'Fire Damage Restoration',
  'storm-damage-repairs': 'Storm Damage Repairs',
  'storm-damage-restoration': 'Storm Damage Restoration',
  'mould-remediation': 'Mould Remediation',
  'flood-recovery': 'Flood Recovery',
  'flood-damage-restoration': 'Flood Damage Restoration',
  'emergency-restoration': 'Emergency Restoration',
  'asbestos-removal': 'Asbestos Removal',
  'biohazard-cleaning': 'Biohazard Cleaning',
  'sewage-cleanup': 'Sewage Cleanup',
};

// Service-specific colour themes for distinct OG images
interface ServiceTheme {
  bg: string;       // background colour
  accent: string;   // subtitle + brand accent
  badge: string;    // emergency badge background
  border: string;   // bottom credentials border
}

const DEFAULT_THEME: ServiceTheme = {
  bg: '#0F2942',
  accent: '#F97316',
  badge: '#DC2626',
  border: '#1E3A5F',
};

const SERVICE_THEMES: Record<string, ServiceTheme> = {
  'fire-damage-restoration': {
    bg: '#2A0A0A',
    accent: '#F97316',
    badge: '#DC2626',
    border: '#5C1A1A',
  },
  'storm-damage-repairs': {
    bg: '#0F1B2D',
    accent: '#60A5FA',
    badge: '#1D4ED8',
    border: '#1E3A5F',
  },
  'storm-damage-restoration': {
    bg: '#0F1B2D',
    accent: '#60A5FA',
    badge: '#1D4ED8',
    border: '#1E3A5F',
  },
  'mould-remediation': {
    bg: '#0A1F14',
    accent: '#34D399',
    badge: '#059669',
    border: '#1A3D2E',
  },
  'flood-recovery': {
    bg: '#0A1929',
    accent: '#38BDF8',
    badge: '#0284C7',
    border: '#164E63',
  },
  'flood-damage-restoration': {
    bg: '#0A1929',
    accent: '#38BDF8',
    badge: '#0284C7',
    border: '#164E63',
  },
  'asbestos-removal': {
    bg: '#1F1A0A',
    accent: '#FBBF24',
    badge: '#D97706',
    border: '#4A3F1A',
  },
  'biohazard-cleaning': {
    bg: '#1A0A1F',
    accent: '#C084FC',
    badge: '#7C3AED',
    border: '#3B1A4A',
  },
  'sewage-cleanup': {
    bg: '#1A1A0A',
    accent: '#A3E635',
    badge: '#65A30D',
    border: '#3D3D1A',
  },
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  // Read query params — validated and sanitised below
  const rawTitle = searchParams.get('title') || 'Disaster Recovery Australia';
  const rawCity = searchParams.get('city') || '';
  const rawService = searchParams.get('service') || '';

  // Sanitise inputs: strip HTML, limit length (prevents abuse of OG endpoint)
  const sanitise = (s: string) => s.replace(/<[^>]*>/g, '').slice(0, 100);
  const title = sanitise(rawTitle);
  const city = sanitise(rawCity);
  const service = SERVICE_LABELS[rawService] || sanitise(rawService);

  // Resolve theme based on service slug
  const theme = SERVICE_THEMES[rawService] || DEFAULT_THEME;

  // Build subtitle
  const subtitle = city && service
    ? `${service} in ${city}`
    : city
      ? `Emergency Restoration in ${city}`
      : service
        ? service
        : '24/7 Emergency Restoration Services';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: theme.bg,
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top section: brand + emergency badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: theme.accent, fontSize: 28, fontWeight: 700, letterSpacing: 2 }}>
              DISASTER RECOVERY
            </div>
            <div style={{ color: '#94A3B8', fontSize: 18, marginTop: 4 }}>
              Australia
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: theme.badge,
              borderRadius: 8,
              padding: '8px 20px',
            }}
          >
            <div style={{ color: 'white', fontSize: 18, fontWeight: 700 }}>24/7 EMERGENCY</div>
          </div>
        </div>

        {/* Centre section: title + subtitle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              color: 'white',
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: '90%',
            }}
          >
            {title}
          </div>
          <div style={{ color: theme.accent, fontSize: 28, fontWeight: 600 }}>
            {subtitle}
          </div>
        </div>

        {/* Bottom section: credentials bar */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            borderTop: `2px solid ${theme.border}`,
            paddingTop: 20,
          }}
        >
          {[
            { label: 'IICRC Certified', value: '100%' },
            { label: 'Response Time', value: '60 min' },
            { label: 'Coverage', value: 'Nationwide' },
            { label: 'Liability', value: '$20M+' },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: 'white', fontSize: 22, fontWeight: 700 }}>{value}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
