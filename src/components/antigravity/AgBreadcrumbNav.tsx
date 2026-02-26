import Link from 'next/link';
import Script from 'next/script';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AgBreadcrumbNavProps {
  items: BreadcrumbItem[];
  /** Use dark variant for coloured header backgrounds */
  dark?: boolean;
}

/**
 * AgBreadcrumbNav — Breadcrumb navigation for inner pages.
 * Renders structured data (BreadcrumbList schema) for SEO.
 */
export function AgBreadcrumbNav({ items, dark = false }: AgBreadcrumbNavProps) {
  const schemaData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://disasterrecovery.com.au${item.href}` } : {}),
    })),
  });

  return (
    <>
      <Script
        id={`breadcrumb-schema-${items.length}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {schemaData}
      </Script>
      <nav
        className={`ag-breadcrumb-nav ${dark ? 'ag-breadcrumb-nav-dark' : ''}`}
        aria-label="Breadcrumb"
      >
        <ol className="ag-breadcrumb-list">
          {items.map((item, i) => (
            <li key={i} className="ag-breadcrumb-item">
              {i > 0 && <span className="ag-breadcrumb-separator">/</span>}
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span className="ag-breadcrumb-current">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
