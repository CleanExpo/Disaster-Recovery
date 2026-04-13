/**
 * AntigravityRecoveryProcess — 4-step timeline
 * Converted from RecoveryProcess.astro — Server Component
 */

import Image from 'next/image';

const steps = [
  {
    icon: '/images/antigravity/icon_3d_shield.webp',
    iconAlt: 'Secure Connection',
    title: '1. Secure Connection',
    description:
      'Immediate, automated routing to the nearest certified NRPG response team via our online claim system.',
    hasConnector: true,
  },
  {
    icon: '/images/antigravity/icon_3d_magnifying_glass.webp',
    iconAlt: 'Inspection',
    title: '2. Rapid Assessment',
    description:
      'Comprehensive scoping, thermal imaging, and safety hazard identification.',
    hasConnector: true,
  },
  {
    icon: '/images/antigravity/icon_3d_barrier.webp',
    iconAlt: 'Mitigation',
    title: '3. Mitigation & Containment',
    description:
      'Stopping secondary damage through extraction, encapsulation, and air scrubbing.',
    hasConnector: true,
  },
  {
    icon: '/images/antigravity/icon_3d_certificate.webp',
    iconAlt: 'Restoration',
    title: '4. Complete Restoration',
    description:
      'Returning the property to pre-loss condition with direct insurance billing.',
    hasConnector: false,
  },
];

export function AntigravityRecoveryProcess() {
  return (
    <section className="ag-process-section ag-container">
      <div className="ag-process-header">
        <div className="ag-badge-pulse-blue">Our Methodology</div>
        <h2>From Disaster to Recovery</h2>
        <p>
          We deploy proven, IICRC-compliant procedures to restore your property safely
          and efficiently.
        </p>
      </div>

      <div className="ag-process-timeline">
        {steps.map((step, i) => (
          <div key={i} className="ag-process-step">
            <div className="ag-step-icon">
              <Image
                src={step.icon}
                alt={step.iconAlt}
                width={64}
                height={64}
                draggable={false}
                loading="lazy"
              />
            </div>
            <div className="ag-step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            {step.hasConnector && <div className="ag-step-connector" />}
          </div>
        ))}
      </div>
    </section>
  );
}
