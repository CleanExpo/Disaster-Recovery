import { Metadata } from 'next';
import { Building2, Shield, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Strata Properties Disaster Recovery | Body corporate managed properties | Australia',
  description: 'Specialised disaster recovery for strata properties. Body corporate managed properties. Insurance approved, 24/7 response.' };

export default function StrataPropertiesPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <Building2 className="h-16 w-16 text-orange-500 mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Strata Properties Disaster Recovery</h1>
          <p className="text-xl mb-8">Body corporate managed properties</p>
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
            Get Immediate Help
          </Button>
        </div>
      </section>
    </div>
  );
}