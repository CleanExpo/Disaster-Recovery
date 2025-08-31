import { Metadata } from 'next';
import { Settings, Zap, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Drone Roof Inspection | Damage assessment | Advanced Restoration Technology',
  description: 'Professional drone roof inspection for damage assessment. Latest technology for faster, better restoration results.' };

export default function DroneRoofInspectionPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <Settings className="h-16 w-16 text-blue-500 mb-6 animate-spin-slow" />
          <h1 className="text-4xl font-bold mb-4">Drone Roof Inspection</h1>
          <p className="text-xl">Professional Equipment for Damage assessment</p>
        </div>
      </section>
    </div>
  );
}