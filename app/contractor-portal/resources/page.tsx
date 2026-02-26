'use client';


import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import { FileText, Download, Video, Book, Shield, Wrench, HelpCircle, Award } from 'lucide-react';

function ContractorPortalResourcesPageOriginal() {
  const resources = [
    {
      category: 'Training Materials',
      icon: Book,
      color: 'bg-blue-600',
      items: [
        { title: 'IICRC S500 Water Damage Guide', type: 'PDF', size: '15.2 MB' },
        { title: 'Fire & Smoke Restoration Manual', type: 'PDF', size: '12.8 MB' },
        { title: 'Mould Remediation Best Practices', type: 'PDF', size: '8.5 MB' },
        { title: 'Safety Protocols Handbook', type: 'PDF', size: '5.3 MB' }
      ]
    },
    {
      category: 'Video Tutorials',
      icon: Video,
      color: 'bg-purple-600',
      items: [
        { title: 'Advanced Water Extraction Techniques', type: 'Video', duration: '45 min' },
        { title: 'HEPA Filtration Setup Guide', type: 'Video', duration: '30 min' },
        { title: 'Thermal Imaging for Moisture Detection', type: 'Video', duration: '25 min' },
        { title: 'PPE Best Practices', type: 'Video', duration: '20 min' }
      ]
    },
    {
      category: 'Equipment Guides',
      icon: Wrench,
      color: 'bg-green-600',
      items: [
        { title: 'Dehumidifier Operation Manual', type: 'PDF', size: '3.2 MB' },
        { title: 'Air Mover Placement Guide', type: 'PDF', size: '2.8 MB' },
        { title: 'Moisture Meter Calibration', type: 'PDF', size: '1.5 MB' },
        { title: 'HEPA Vacuum Maintenance', type: 'PDF', size: '2.1 MB' }
      ]
    },
    {
      category: 'Certifications',
      icon: Award,
      color: 'bg-yellow-600',
      items: [
        { title: 'IICRC Certification Study Guide', type: 'PDF', size: '18.5 MB' },
        { title: 'WRT Exam Preparation', type: 'PDF', size: '10.2 MB' },
        { title: 'ASD Applied Structural Drying', type: 'PDF', size: '12.3 MB' },
        { title: 'AMRT Mould Remediation Tech', type: 'PDF', size: '9.8 MB' }
      ]
    },
    {
      category: 'Insurance & Compliance',
      icon: Shield,
      color: 'bg-red-600',
      items: [
        { title: 'Insurance Claim Documentation', type: 'PDF', size: '4.5 MB' },
        { title: 'RestoreAssist.app Estimating Guide', type: 'PDF', size: '7.2 MB' },
        { title: 'WorkSafe Compliance Checklist', type: 'PDF', size: '2.3 MB' },
        { title: 'Quality Assurance Standards', type: 'PDF', size: '3.8 MB' }
      ]
    },
    {
      category: 'Forms & Templates',
      icon: FileText,
      color: 'bg-indigo-600',
      items: [
        { title: 'Job Assessment Template', type: 'DOC', size: '156 KB' },
        { title: 'Customer Agreement Form', type: 'DOC', size: '98 KB' },
        { title: 'Daily Progress Report', type: 'DOC', size: '125 KB' },
        { title: 'Invoice Template', type: 'XLS', size: '245 KB' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Resources</h1>
          <p className="text-gray-300">Training materials, guides, and documentation</p>
        </div>

        {/* Quick Help */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-blue-400" />
              <div>
                <h2 className="text-xl font-semibold text-white">Need Help?</h2>
                <p className="text-gray-300">Access our 24/7 contractor support line</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {resources.map((category, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg ${category.color}`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">{category.category}</h3>
              </div>
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="flex-1">
                      <p className="text-white font-medium">{item.title}</p>
                      <p className="text-gray-300 text-sm">
                        {item.type} • {item.size || item.duration}
                      </p>
                    </div>
                    <button className="p-2 text-blue-400 hover:text-blue-300 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default function ContractorPortalResourcesPage() {
  if (!FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <ContractorPortalResourcesPageOriginal />;
  }

  return (
    <>
      <AntigravityNavbar />
      <ContractorPortalResourcesPageOriginal />
      <AntigravityFooter />
    </>
  );
}
