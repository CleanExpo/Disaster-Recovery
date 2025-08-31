import { Metadata } from 'next';
import { Shield, FileCheck, MessageSquare} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'AAMI Insurance Claims | Approved Restoration Provider | Direct Billing',
  description: 'Preferred AAMI insurance restoration provider. Direct billing, no upfront costs, claim assistance. Call Online Form Available 24/7.' };

export default function AAMIInsurancePage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-green-800 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <Shield className="h-16 w-16 text-green-400 mb-6" />
          <h1 className="text-4xl font-bold mb-4">AAMI Insurance Claims</h1>
          <p className="text-xl mb-8">Preferred Provider • Direct Billing • No Upfront Costs</p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            <MessageSquare className="mr-2" /> Start Your Claim
          </Button>
        </div>
      </section>
    </div>
  );
}