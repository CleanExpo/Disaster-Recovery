import { Metadata } from 'next';
import { HelpCircle, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'biohazard cleanup FAQ | Common Questions Answered | Expert Guide',
  description: 'Everything you need to know about biohazard cleanup. Expert answers to common questions, tips, and advice.',
};

export default function biohazardcleanupFAQPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-indigo-900 to-indigo-800 text-white py-20">
        <div className="container mx-auto px-4 text-centre">
          <HelpCircle className="h-16 w-16 text-indigo-300 mx-auto mb-6" />
          <h1 className="text-4xl font-bold mb-4">Biohazard cleanup FAQ</h1>
          <p className="text-xl">Expert Answers to Your Questions</p>
        </div>
      </section>
    </div>
  );
}