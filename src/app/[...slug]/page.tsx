import { notFound } from 'next/navigation';
import DynamicSEOContent from '@/components/dynamic-seo-content';
import { Metadata } from 'next';

interface DynamicPageProps {
  params: {
    slug: string[];
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
  const slugPath = params.slug.join('/');
  
  // Simple title generation based on slug
  const title = params.slug
    .map(part => part.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '))
    .join(' | ');
    
  const description = `Professional ${title.toLowerCase()} services. 24/7 emergency response, insurance approved. Call 1300 814 870 for immediate help.`;
  
  return {
    title: `${title} | Disaster Recovery`,
    description,
    openGraph: {
      title: `${title} | Disaster Recovery`,
      description,
      type: 'website',
    },
  };
}

// Generate static params for known routes (optional, for better performance)
export async function generateStaticParams() {
  // Return empty array to allow all dynamic routes
  // In production, you might want to pre-generate common routes
  return [];
}

export default function DynamicSEOPage({ params }: DynamicPageProps) {
  // Pass params to client component
  return <DynamicSEOContent params={params} />;
}
