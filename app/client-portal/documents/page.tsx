'use client';


import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import { useState } from 'react';
import { FileText, Download, Upload, Folder, Image, File, Search, Filter, Eye, Trash2 } from 'lucide-react';

function ClientPortalDocumentsPageOriginal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const documents = [
    {
      id: 1,
      name: 'Insurance Policy - Water Damage.pdf',
      type: 'pdf',
      size: '2.4 MB',
      date: '2024-03-15',
      category: 'Insurance',
      icon: FileText
    },
    {
      id: 2,
      name: 'Property Assessment Report.pdf',
      type: 'pdf',
      size: '5.1 MB',
      date: '2024-03-14',
      category: 'Assessment',
      icon: FileText
    },
    {
      id: 3,
      name: 'Before Restoration Photos.zip',
      type: 'images',
      size: '45.2 MB',
      date: '2024-03-13',
      category: 'Photos',
      icon: Image
    },
    {
      id: 4,
      name: 'Contractor Agreement.pdf',
      type: 'pdf',
      size: '1.2 MB',
      date: '2024-03-12',
      category: 'Contracts',
      icon: FileText
    },
    {
      id: 5,
      name: 'Restoration Progress Report Week 1.pdf',
      type: 'pdf',
      size: '3.8 MB',
      date: '2024-03-10',
      category: 'Reports',
      icon: FileText
    },
    {
      id: 6,
      name: 'Invoice - Initial Assessment.pdf',
      type: 'pdf',
      size: '156 KB',
      date: '2024-03-08',
      category: 'Invoices',
      icon: FileText
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Insurance': 'bg-blue-600',
      'Assessment': 'bg-purple-600',
      'Photos': 'bg-green-600',
      'Contracts': 'bg-orange-600',
      'Reports': 'bg-indigo-600',
      'Invoices': 'bg-red-600'
    };
    return colors[category] || 'bg-gray-800';
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || doc.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Documents</h1>
          <p className="text-gray-200">Manage your restoration documents and files</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <Upload className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-white font-semibold mb-2">Drop files here or click to upload</p>
            <p className="text-gray-300 text-sm">Support for PDF, Images, and Documents up to 50MB</p>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Select Files
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-200 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white hover:bg-white/30 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-transparent border-0 outline-none"
                >
                  <option value="all" className="text-gray-900">All Types</option>
                  <option value="pdf" className="text-gray-900">PDFs</option>
                  <option value="images" className="text-gray-900">Images</option>
                </select>
              </button>
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${getCategoryColor(doc.category)}`}>
                  <doc.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs px-2 py-1 bg-white/20 text-white rounded-full">
                  {doc.category}
                </span>
              </div>
              <h3 className="text-white font-semibold mb-2 truncate">{doc.name}</h3>
              <div className="text-gray-300 text-sm space-y-1 mb-4">
                <p>Size: {doc.size}</p>
                <p>Uploaded: {doc.date}</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 text-sm">
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-1 text-sm">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <Folder className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-300 text-lg">No documents found</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default function ClientPortalDocumentsPage() {
  return (
    <>
      <AntigravityNavbar />
      <ClientPortalDocumentsPageOriginal />
      <AntigravityFooter />
    </>
  );
}
