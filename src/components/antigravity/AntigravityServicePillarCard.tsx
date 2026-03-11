/**
 * AntigravityServicePillarCard — Reusable service card with image, cert badge, hover
 * Converted from ServicePillarCard.astro — uses Next.js Link + Image
 */

import Link from 'next/link';
import Image from 'next/image';

interface AntigravityServicePillarCardProps {
  title: string;
  description: string;
  imageSrc: string;
  certBadge: string;
  href: string;
}

export function AntigravityServicePillarCard({
  title,
  description,
  imageSrc,
  certBadge,
  href,
}: AntigravityServicePillarCardProps) {
  return (
    <Link href={href} className="ag-service-card">
      <div className="ag-card-image-wrapper relative w-full aspect-[3/2] overflow-hidden">
        <div className="ag-cert-badge">{certBadge}</div>
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 340px"
        />
        <div className="ag-image-overlay" />
      </div>

      <div className="ag-card-body">
        <div className="ag-availability">24/7 Available</div>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="ag-card-action">
          Learn More
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </div>
      </div>
    </Link>
  );
}
