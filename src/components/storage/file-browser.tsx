'use client';

import { useState, useEffect } from 'react';
import type { FileCategory } from '@/lib/storage/storage-manager';

interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  category: FileCategory;
  url: string;
  createdAt: string;
  uploadedBy: string;
}

interface FileBrowserProps {
  category?: FileCategory;
  userId?: string;
  onFileSelect?: (file: FileItem) => void;
  selectable?: boolean;
}

/**
 * FileBrowser Component
 *
 * Browse and manage files by category or user
 */
export function FileBrowser({
  category,
  userId,
  onFileSelect,
  selectable = false,
}: FileBrowserProps) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (userId) params.append('userId', userId);
        params.append('limit', '100');

        const response = await fetch(`/api/files?${params.toString()}`);

        if (!response.ok) {
          throw new Error('Failed to fetch files');
        }

        const data = await response.json();
        let files = data.files || [];

        // Sort files
        files.sort((a: FileItem, b: FileItem) => {
          switch (sortBy) {
            case 'name':
              return a.name.localeCompare(b.name);
            case 'size':
              return b.size - a.size;
            case 'date':
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            default:
              return 0;
          }
        });

        setFiles(files);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load files';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, [category, userId, sortBy]);

  const handleSelectFile = (fileId: string) => {
    const file = files.find((f) => f.id === fileId);
    if (file) {
      if (selectable) {
        const newSelected = new Set(selectedFiles);
        if (newSelected.has(fileId)) {
          newSelected.delete(fileId);
        } else {
          newSelected.add(fileId);
        }
        setSelectedFiles(newSelected);
      }
      onFileSelect?.(file);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    if (!confirm('Delete this file?')) return;

    try {
      const response = await fetch(`/api/files/${fileId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete file');
      }

      setFiles((prev) => prev.filter((f) => f.id !== fileId));
      selectedFiles.delete(fileId);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete file');
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return '🖼️';
    } else if (type.startsWith('video/')) {
      return '🎬';
    } else if (type.startsWith('audio/')) {
      return '🔊';
    } else if (type === 'application/pdf') {
      return '📄';
    } else {
      return '📎';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">
          <strong>Error:</strong> {error}
        </p>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-gray-500">No files found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 rounded text-sm"
          >
            <option value="date">Date</option>
            <option value="name">Name</option>
            <option value="size">Size</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${
              viewMode === 'list'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="List view"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>

          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${
              viewMode === 'grid'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Grid view"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2V3zM15 3a2 2 0 012-2h-2.5A2.5 2.5 0 0012 2.5v6A2.5 2.5 0 0014.5 11H17a2 2 0 01-2-2V3zM5 13a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6zM15 13a2 2 0 012-2h-2.5A2.5 2.5 0 0012 12.5v6a2.5 2.5 0 002.5 2.5H17a2 2 0 01-2-2v-6z" />
            </svg>
          </button>
        </div>

        <p className="text-sm text-gray-600">
          {files.length} file{files.length !== 1 ? 's' : ''}
          {selectedFiles.size > 0 && ` • ${selectedFiles.size} selected`}
        </p>
      </div>

      {/* Files */}
      {viewMode === 'list' ? (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {selectable && <th className="w-12 px-4 py-3" />}
                <th className="text-left px-4 py-3 font-semibold text-gray-900">Name</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-900">Size</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-900">Date</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>

            <tbody>
              {files.map((file) => (
                <tr
                  key={file.id}
                  className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleSelectFile(file.id)}
                >
                  {selectable && (
                    <td className="w-12 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedFiles.has(file.id)}
                        onChange={() => {}}
                        className="rounded"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                  )}

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{getFileIcon(file.type)}</span>
                      <span className="font-medium text-gray-900 truncate">
                        {file.name}
                      </span>
                    </div>
                  </td>

                  <td className="text-right px-4 py-3 text-sm text-gray-600">
                    {formatBytes(file.size)}
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-600">
                    {formatDate(file.createdAt)}
                  </td>

                  <td className="text-right px-4 py-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFile(file.id);
                      }}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {files.map((file) => (
            <div
              key={file.id}
              onClick={() => handleSelectFile(file.id)}
              className={`border rounded-lg p-4 text-center cursor-pointer transition-colors ${
                selectedFiles.has(file.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-4xl mb-2">{getFileIcon(file.type)}</div>

              <p className="font-medium text-gray-900 truncate text-sm">
                {file.name}
              </p>

              <p className="text-xs text-gray-600 mt-1">
                {formatBytes(file.size)}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {formatDate(file.createdAt)}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFile(file.id);
                }}
                className="mt-3 text-xs text-red-600 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
