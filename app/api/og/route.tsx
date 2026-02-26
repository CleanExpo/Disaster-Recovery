import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Service type display names for human-readable labels
const SERVICE_LABELS: Record<string, string> = {
  'water-damage-restoration': 'Water Damage Restoration',
  'fire-damage-restoration': 'Fire Damage Restoration',
  'storm-damage-repairs': 'Storm Damage Repairs',
  'mould-remediation': 'Mould Remediation',
  'flood-recovery': 'Flood Recovery',
  'emergency-restoration': 'Emergency Restoration',
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
          backgroundColor: '#0F2942',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top section: brand + emergency badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: '#F97316', fontSize: 28, fontWeight: 700, letterSpacing: 2 }}>
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
              backgroundColor: '#DC2626',
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
          <div style={{ color: '#F97316', fontSize: 28, fontWeight: 600 }}>
            {subtitle}
          </div>
        </div>

        {/* Bottom section: credentials bar */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            borderTop: '2px solid #1E3A5F',
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
