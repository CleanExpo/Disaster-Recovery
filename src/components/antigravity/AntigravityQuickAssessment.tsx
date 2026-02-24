'use client';

/**
 * AntigravityQuickAssessment — Bento grid with mouse-tracking glow effect
 *
 * Each card links directly to its service pillar page.
 */

import { useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface AssessmentCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
  href: string;
  wide?: boolean;
}

const cards: AssessmentCard[] = [
  {
    id: 'water',
    title: 'Water & Flood Extraction',
    description: 'Category 1-3 water mitigation, structural drying, and advanced dehumidification.',
    icon: '/images/antigravity/logo_3d_water.webp',
    iconAlt: 'Water Emergency',
    href: '/services/water-damage-restoration',
    wide: true,
  },
  {
    id: 'fire',
    title: 'Fire & Smoke',
    description: 'Soot removal, thermal fogging, and odour neutralisation.',
    icon: '/images/antigravity/logo_3d_fire.webp',
    iconAlt: 'Fire Emergency',
    href: '/services/fire-damage-restoration',
  },
  {
    id: 'mould',
    title: 'Mould Remediation',
    description: 'Air scrubbing, containment, and ATP testing protocols.',
    icon: '/images/antigravity/logo_3d_mould.webp',
    iconAlt: 'Mould Emergency',
    href: '/services/mould-remediation',
  },
  {
    id: 'storm',
    title: 'Storm Response',
    description: 'Make-safe tarping, debris removal, and weather proofing.',
    icon: '/images/antigravity/logo_3d_storm.webp',
    iconAlt: 'Storm Emergency',
    href: '/services/storm-damage-restoration',
  },
  {
    id: 'biohazard',
    title: 'Biohazard & Forensic',
    description: 'Discreet, compliant decontamination and trauma scene recovery operations.',
    icon: '/images/antigravity/logo_3d_trauma.webp',
    iconAlt: 'Biohazard Emergency',
    href: '/services/biohazard-cleanup',
  },
  {
    id: 'sewage',
    title: 'Sewage Sanitisation',
    description: 'Category 3 contamination response, extraction, sanitisation, and compliant remediation protocols.',
    icon: '/images/antigravity/logo_3d_sewage.webp',
    iconAlt: 'Sewage Emergency',
    href: '/services/sewage-cleanup',
    wide: true,
  },
];

export function AntigravityQuickAssessment() {
  const cardRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const card = cardRefs.current.get(id);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <section className="ag-assessment-section ag-container">
      <div className="ag-assessment-header">
        <div className="ag-badge-pulse">Live Network Connection</div>
        <h2>Emergency Rapid Assessment</h2>
        <p style={{ color: 'var(--ag-text-muted)', fontSize: '1.125rem', maxWidth: 600, margin: 0 }}>
          Select your emergency type to connect with
          certified specialists across ANZ.
        </p>
      </div>

      <div className="ag-bento-grid">
        {cards.map((card) => (
          <Link
            key={card.id}
            href={card.href}
            ref={(el) => { if (el) cardRefs.current.set(card.id, el); }}
            className={`ag-bento-card ag-bento-${card.id} ${card.wide ? 'ag-bento-wide' : ''}`}
            onMouseMove={(e) => handleMouseMove(e, card.id)}
          >
            <div className="ag-icon-glass ag-icon-glass-premium">
              <Image
                src={card.icon}
                alt={card.iconAlt}
                width={80}
                height={80}
                className="ag-custom-icon"
                draggable={false}
              />
            </div>
            <div className="ag-card-content">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
            <div className="ag-hover-glow" />
          </Link>
        ))}
      </div>
    </section>
  );
}
