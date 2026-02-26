interface LegalSection {
  title: string;
  content: string;
}

interface LegalFormLayoutProps {
  title: string;
  lastUpdated: string;
  version: string;
  sections: LegalSection[];
}

export default function LegalFormLayout({ title, lastUpdated, version, sections }: LegalFormLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
          <div className="flex flex-col md:flex-row gap-4 text-gray-300">
            <p>Last Updated: {lastUpdated}</p>
            <p>Version: {version}</p>
          </div>
        </div>

        {/* Document Content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="border-b border-white/20 pb-6 last:border-b-0">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  {section.title}
                </h2>
                <div className="text-gray-300 leading-relaxed">
                  {section.content.split('\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="mb-2 whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-white/20">
            <div className="text-center text-gray-300 text-sm">
              <p>© 2026 National Restoration Professionals Group (NRPG). All rights reserved.</p>
              <p className="mt-2">This document is confidential and proprietary.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}