import { Metadata } from 'next';
import { FileText, TrendingUp, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sydney Storms 2021 | Case Study | Disaster Recovery Success Story',
  description: 'How we helped recover from Sydney Storms 2021. Real results, timelines, and restoration process.',
};

export default function SydneyStorms2021Page() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-green-900 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <FileText className="h-16 w-16 text-green-300 mb-6" />
          <h1 className="text-4xl font-bold mb-4">Case Study: Sydney Storms 2021</h1>
          <p className="text-xl">A Success Story in Disaster Recovery</p>
        </div>
      </section>
    </div>
  );
}