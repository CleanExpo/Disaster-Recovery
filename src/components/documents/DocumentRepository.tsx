'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Folder, File, Upload, Download, Search, Filter, Grid, List, 
  MoreHorizontal, Eye, Share2, Archive, Trash2, Star, Clock,
  FileText, Image, Video, Music, Code, Database, Lock, AlertTriangle,
  ChevronRight, ChevronDown, Plus, Sort, RefreshCw
} from 'lucide-react';
import type { 
  Document, 
  DocumentFolder, 
  DocumentSearch, 
  DocumentCategory, 
  DocumentStatus, 
  AccessLevel,
  DocumentUploadProgress 
} from '@/types/document-management';

interface DocumentRepositoryProps {
  contractorId?: string;
  userRole: 'admin' | 'contractor' | 'auditor';
  className?: string;
}

const DocumentRepository: React.FC<DocumentRepositoryProps> = ({
  contractorId,
  userRole,
  className = ''
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [folders, setFolders] = useState<DocumentFolder[]>([]);
  const [currentFolder, setCurrentFolder] = useState<DocumentFolder | null>(null);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: [] as DocumentCategory[],
    status: [] as DocumentStatus[],
    accessLevel: [] as AccessLevel[]
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [uploadProgress, setUploadProgress] = useState<DocumentUploadProgress[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadDocuments();
    loadFolders();
  }, [contractorId, currentFolder]);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockDocuments: Document[] = [
        {
          id: 'doc_001',
          title: 'General Liability Insurance',
          fileName: 'liability_insurance_2024.pdf',
          fileSize: 2048000,
          mimeType: 'application/pdf',
          category: 'insurance',
          tags: ['insurance', 'liability', '2024'],
          uploadedBy: 'contractor_001',
          uploadedAt: '2024-01-15T10:00:00Z',
          lastModifiedAt: '2024-01-15T10:00:00Z',
          version: 1,
          status: 'active',
          expiryDate: '2024-12-31T23:59:59Z',
          isRequired: true,
          accessLevel: 'contractor_only',
          downloadCount: 12,
          checksum: 'abc123',
          storageUrl: '/documents/liability_insurance_2024.pdf',
          metadata: {
            contractorId: 'contractor_001',
            signatureRequired: false,
            relatedDocuments: [],
            customFields: {}
          }
        },
        {
          id: 'doc_002',
          title: 'Water Damage Certification',
          fileName: 'water_damage_cert.pdf',
          fileSize: 1536000,
          mimeType: 'application/pdf',
          category: 'certification',
          tags: ['certification', 'water damage', 'IICRC'],
          uploadedBy: 'contractor_001',
          uploadedAt: '2024-02-01T14:30:00Z',
          lastModifiedAt: '2024-02-01T14:30:00Z',
          version: 1,
          status: 'expiring_soon',
          expiryDate: '2024-05-01T23:59:59Z',
          isRequired: true,
          accessLevel: 'contractor_only',
          downloadCount: 8,
          checksum: 'def456',
          storageUrl: '/documents/water_damage_cert.pdf',
          metadata: {
            contractorId: 'contractor_001',
            signatureRequired: false,
            relatedDocuments: [],
            customFields: {}
          }
        },
        {
          id: 'doc_003',
          title: 'Network Participation Agreement',
          fileName: 'network_agreement.pdf',
          fileSize: 3072000,
          mimeType: 'application/pdf',
          category: 'contract',
          tags: ['agreement', 'network', 'contract'],
          uploadedBy: 'admin_001',
          uploadedAt: '2024-01-10T09:00:00Z',
          lastModifiedAt: '2024-01-10T09:00:00Z',
          version: 2,
          status: 'pending_signature',
          isRequired: true,
          accessLevel: 'contractor_only',
          downloadCount: 3,
          checksum: 'ghi789',
          storageUrl: '/documents/network_agreement.pdf',
          metadata: {
            contractorId: 'contractor_001',
            signatureRequired: true,
            signatureStatus: 'sent',
            relatedDocuments: [],
            customFields: {}
          }
        }
      ];

      setDocuments(mockDocuments);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFolders = async () => {
    try {
      // Mock folder structure - replace with actual API call
      const mockFolders: DocumentFolder[] = [
        {
          id: 'folder_001',
          name: 'Insurance Documents',
          path: '/insurance',
          accessLevel: 'contractor_only',
          createdBy: 'admin_001',
          createdAt: '2024-01-01T00:00:00Z',
          documentCount: 5,
          subfolders: []
        },
        {
          id: 'folder_002',
          name: 'Certifications',
          path: '/certifications',
          accessLevel: 'contractor_only',
          createdBy: 'admin_001',
          createdAt: '2024-01-01T00:00:00Z',
          documentCount: 8,
          subfolders: []
        },
        {
          id: 'folder_003',
          name: 'Contracts',
          path: '/contracts',
          accessLevel: 'admin_only',
          createdBy: 'admin_001',
          createdAt: '2024-01-01T00:00:00Z',
          documentCount: 12,
          subfolders: []
        },
        {
          id: 'folder_004',
          name: 'Project Documentation',
          path: '/projects',
          accessLevel: 'contractor_only',
          createdBy: 'contractor_001',
          createdAt: '2024-01-01T00:00:00Z',
          documentCount: 24,
          subfolders: []
        }
      ];

      setFolders(mockFolders);
    } catch (error) {
      console.error('Error loading folders:', error);
    }
  };

  const handleFileUpload = async (files: FileList) => {
    const uploadFiles = Array.from(files);
    
    for (const file of uploadFiles) {
      const uploadId = `upload_${Date.now()}_${Math.random()}`;
      const progressItem: DocumentUploadProgress = {
        fileId: uploadId,
        fileName: file.name,
        fileSize: file.size,
        uploadedBytes: 0,
        progress: 0,
        status: 'uploading'
      };

      setUploadProgress(prev => [...prev, progressItem]);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => prev.map(item => {
          if (item.fileId === uploadId && item.status === 'uploading') {
            const newProgress = Math.min(item.progress + 10, 100);
            return {
              ...item,
              progress: newProgress,
              uploadedBytes: Math.floor((newProgress / 100) * file.size),
              status: newProgress === 100 ? 'processing' : 'uploading'
            };
          }
          return item;
        }));
      }, 200);

      // Complete upload after simulation
      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(prev => prev.map(item => 
          item.fileId === uploadId 
            ? { ...item, status: 'completed', progress: 100 }
            : item
        ));

        // Remove completed uploads after delay
        setTimeout(() => {
          setUploadProgress(prev => prev.filter(item => item.fileId !== uploadId));
        }, 2000);

        // Refresh documents list
        loadDocuments();
      }, 2000);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="w-5 h-5 text-blue-600" />;
    if (mimeType.startsWith('video/')) return <Video className="w-5 h-5 text-purple-600" />;
    if (mimeType.startsWith('audio/')) return <Music className="w-5 h-5 text-green-600" />;
    if (mimeType.includes('pdf')) return <FileText className="w-5 h-5 text-red-600" />;
    if (mimeType.includes('code') || mimeType.includes('text')) return <Code className="w-5 h-5 text-gray-600" />;
    return <File className="w-5 h-5 text-gray-600" />;
  };

  const getStatusBadge = (status: DocumentStatus) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      expired: { color: 'bg-red-100 text-red-800', label: 'Expired' },
      expiring_soon: { color: 'bg-yellow-100 text-yellow-800', label: 'Expiring Soon' },
      pending_signature: { color: 'bg-blue-100 text-blue-800', label: 'Pending Signature' },
      signed: { color: 'bg-purple-100 text-purple-800', label: 'Signed' },
      archived: { color: 'bg-gray-100 text-gray-800', label: 'Archived' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
      draft: { color: 'bg-orange-100 text-orange-800', label: 'Draft' }
    };

    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const Breadcrumb = () => (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <button 
        onClick={() => setCurrentFolder(null)}
        className="hover:text-blue-600"
      >
        Documents
      </button>
      {currentFolder && (
        <>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{currentFolder.name}</span>
        </>
      )}
    </nav>
  );

  const UploadProgress = () => {
    if (uploadProgress.length === 0) return null;

    return (
      <div className="mb-6 space-y-3">
        {uploadProgress.map((upload) => (
          <div key={upload.fileId} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">{upload.fileName}</span>
              <span className="text-sm text-gray-600">{upload.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${upload.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatFileSize(upload.uploadedBytes)} / {formatFileSize(upload.fileSize)}</span>
              <span className="capitalize">{upload.status.replace('_', ' ')}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const FolderGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
      {folders.map((folder) => (
        <button
          key={folder.id}
          onClick={() => setCurrentFolder(folder)}
          className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all group"
        >
          <div className="p-2 bg-blue-50 rounded-lg mr-3 group-hover:bg-blue-100">
            <Folder className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1 text-left">
            <h3 className="font-medium text-gray-900">{folder.name}</h3>
            <p className="text-sm text-gray-600">{folder.documentCount} documents</p>
          </div>
          {folder.accessLevel === 'admin_only' && userRole !== 'admin' && (
            <Lock className="w-4 h-4 text-gray-400" />
          )}
        </button>
      ))}
    </div>
  );

  const DocumentGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className={`bg-white rounded-lg border-2 p-4 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer ${
            selectedDocuments.includes(doc.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
          onClick={() => {
            if (selectedDocuments.includes(doc.id)) {
              setSelectedDocuments(prev => prev.filter(id => id !== doc.id));
            } else {
              setSelectedDocuments(prev => [...prev, doc.id]);
            }
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              {getFileIcon(doc.mimeType)}
            </div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          
          <h3 className="font-medium text-gray-900 mb-2 truncate" title={doc.title}>
            {doc.title}
          </h3>
          
          <div className="space-y-2">
            {getStatusBadge(doc.status)}
            
            <div className="text-xs text-gray-600">
              <p>Size: {formatFileSize(doc.fileSize)}</p>
              <p>Modified: {new Date(doc.lastModifiedAt).toLocaleDateString()}</p>
              {doc.expiryDate && (
                <p className={`flex items-center ${
                  doc.status === 'expired' || doc.status === 'expiring_soon' 
                    ? 'text-red-600' 
                    : 'text-gray-600'
                }`}>
                  <Clock className="w-3 h-3 mr-1" />
                  Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const DocumentList = () => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedDocuments(documents.map(doc => doc.id));
                  } else {
                    setSelectedDocuments([]);
                  }
                }}
                checked={selectedDocuments.length === documents.length && documents.length > 0}
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Document
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Size
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Modified
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {documents.map((doc) => (
            <tr key={doc.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedDocuments.includes(doc.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedDocuments(prev => [...prev, doc.id]);
                    } else {
                      setSelectedDocuments(prev => prev.filter(id => id !== doc.id));
                    }
                  }}
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-50 rounded-lg mr-3">
                    {getFileIcon(doc.mimeType)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{doc.title}</p>
                    <p className="text-sm text-gray-600">{doc.fileName}</p>
                    {doc.expiryDate && (
                      <p className={`text-xs flex items-center mt-1 ${
                        doc.status === 'expired' || doc.status === 'expiring_soon' 
                          ? 'text-red-600' 
                          : 'text-gray-500'
                      }`}>
                        <Clock className="w-3 h-3 mr-1" />
                        Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                {getStatusBadge(doc.status)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                {doc.category.replace('_', ' ')}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {formatFileSize(doc.fileSize)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {new Date(doc.lastModifiedAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg" title="View">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg" title="Download">
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg" title="Share">
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg" title="More">
                    <MoreHorizontal className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Repository</h1>
          <p className="text-gray-600 mt-1">Manage your compliance and operational documents</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Documents
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            className="hidden"
          />
        </div>
      </div>

      <Breadcrumb />

      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Date</option>
            <option value="size">Sort by Size</option>
          </select>
          
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {selectedDocuments.length > 0 && (
        <div className="flex items-center justify-between bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <span className="text-sm text-blue-800">
            {selectedDocuments.length} document{selectedDocuments.length !== 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center space-x-2">
            <button className="flex items-center px-3 py-1.5 text-sm bg-white border border-blue-300 rounded hover:bg-blue-50">
              <Download className="w-4 h-4 mr-1" />
              Download
            </button>
            <button className="flex items-center px-3 py-1.5 text-sm bg-white border border-blue-300 rounded hover:bg-blue-50">
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </button>
            <button className="flex items-center px-3 py-1.5 text-sm bg-white border border-red-300 text-red-600 rounded hover:bg-red-50">
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </button>
          </div>
        </div>
      )}

      <UploadProgress />

      {!currentFolder && <FolderGrid />}
      
      {viewMode === 'grid' ? <DocumentGrid /> : <DocumentList />}

      {documents.length === 0 && !loading && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery ? 'Try adjusting your search criteria' : 'Upload documents to get started'}
          </p>
          {!searchQuery && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Upload Your First Document
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentRepository;