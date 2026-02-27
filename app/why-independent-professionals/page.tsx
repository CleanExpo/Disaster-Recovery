import { Metadata } from 'next';
import { Users } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Why Choose Independent Restoration Professionals | IICRC Certified Experts vs 3-Day Trained Employees',
  description: 'Discover why independent IICRC-certified restoration professionals with years of training outperform builder/restorer employees with just 3 days of training.',
  keywords: ['IICRC certified', 'restoration professionals', 'independent contractors', 'qualified restorers', 'industry training'],
  alternates: {
    canonical: 'https://disasterrecovery.com.au/why-independent-professionals',
  },
};

export default function WhyIndependentProfessionalsPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <Users className="h-12 w-12" />,
        title: "Why Choose Independent Restoration Professionals",
        subtitle: "Discover why independent IICRC-certified restoration professionals with years of training outperform builder/restorer employees with just 3 days of training.",
      }}
      cta={{ text: 'Find Professionals', href: '/services' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: "Why Choose Independent Restoration Pr..." },
      ]}
    />
  );
}
