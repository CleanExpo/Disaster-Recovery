import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Important disclaimers regarding the use of Disaster Recovery Australia services. We are a lead generation platform connecting property owners with certified contractors.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <AlertTriangle className="h-12 w-12" />,
        title: 'Disclaimer',
        subtitle: 'Important information about the use of our platform and services.',
      }}
      cta={{ text: 'Contact Us', href: '/contact' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Disclaimer' },
      ]}
      sections={[
        {
          heading: 'Platform Role',
          body: (
            <>
              <p>Disaster Recovery Australia operates as a lead generation and claims distribution platform. We connect property owners affected by disasters with independent, certified restoration contractors across Australia.</p>
              <p style={{ marginTop: '1rem' }}><strong>We do not directly perform restoration work.</strong> All restoration, remediation, and repair services are carried out by independent contractors within our network. Each contractor operates as a separate business entity with their own insurance, licensing, and certifications.</p>
            </>
          ),
        },
        {
          heading: 'No Guarantee of Outcomes',
          body: (
            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Response times are estimates based on typical contractor availability and may vary depending on demand, location, and severity of the event</li>
              <li>Cost estimates provided through our tools are indicative only and may differ from actual contractor quotes</li>
              <li>Insurance coverage depends on your individual policy terms — we cannot guarantee what your insurer will or will not cover</li>
              <li>Contractor availability in remote or regional areas may be limited</li>
            </ul>
          ),
          background: 'light',
        },
        {
          heading: 'Information Accuracy',
          body: (
            <>
              <p>The information on this website is provided for general informational purposes only. While we endeavour to keep all content accurate and up to date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information.</p>
              <p style={{ marginTop: '1rem' }}>Content relating to insurance, legal matters, or health and safety should not be taken as professional advice. Always consult qualified professionals for specific guidance relating to your situation.</p>
            </>
          ),
        },
        {
          heading: 'Limitation of Liability',
          body: (
            <>
              <p>To the maximum extent permitted by Australian law, Disaster Recovery Australia and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform or reliance on any information provided.</p>
              <p style={{ marginTop: '1rem' }}>This does not affect your rights under the Australian Consumer Law, which cannot be excluded or limited.</p>
            </>
          ),
          background: 'light',
        },
        {
          heading: 'External Links',
          body: (
            <p>Our website may contain links to external websites that are not operated by us. We have no control over the content or practices of these sites and accept no responsibility for them. The inclusion of any link does not imply endorsement.</p>
          ),
        },
      ]}
    />
  );
}
