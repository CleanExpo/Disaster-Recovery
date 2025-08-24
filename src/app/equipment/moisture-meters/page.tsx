import { Metadata } from 'next';
import { Settings, Zap, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Professional Moisture Meters | Water damage assessment | Advanced Restoration Technology',
  description: 'Professional professional moisture meters for water damage assessment. Latest technology for faster, better restoration results.',
};

export default function ProfessionalMoistureMetersPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <Settings className="h-16 w-16 text-blue-500 mb-6 animate-spin-slow" />
          <h1 className="text-4xl font-bold mb-4">Professional Moisture Meters</h1>
          <p className="text-xl">Professional Equipment for Water damage assessment</p>
        </div>
      </section>
    </div>
  );
}