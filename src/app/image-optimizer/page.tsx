'use client';

import React, { useState, useCallback } from 'react';
import imageCompression from 'browser-image-compression';

export default function ImageOptimizerPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [quality, setQuality] = useState(0.7);
  const [maxWidth, setMaxWidth] = useState(1920);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
      setResults([]);
    }
  };

  const processImages = async () => {
    setProcessing(true);
    const newResults = [];

    for (const file of files) {
      try {
        const originalSize = file.size;
        
        const options = {
          maxSizeMB: 2,
          maxWidthOrHeight: maxWidth,
          useWebWorker: true,
          fileType: 'image/webp',
          quality: quality,
        };

        const compressedFile = await imageCompression(file, options);
        const compressedSize = compressedFile.size;
        const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);

        // Create download link
        const url = URL.createObjectURL(compressedFile);
        
        newResults.push({
          name: file.name,
          originalSize: (originalSize / 1024 / 1024).toFixed(2),
          compressedSize: (compressedSize / 1024 / 1024).toFixed(2),
          reduction,
          url,
          compressedFile
        });
      } catch (error) {
        console.error(`Error processing ${file.name}:`, error);
        newResults.push({
          name: file.name,
          error: true
        });
      }
    }

    setResults(newResults);
    setProcessing(false);
  };

  const downloadAll = () => {
    results.forEach(result => {
      if (result.url) {
        const a = document.createElement('a');
        a.href = result.url;
        a.download = result.name.replace(/\.[^/.]+$/, '.webp');
        a.click();
      }
    });
  };

  const downloadZip = async () => {
    // Create a zip file using browser APIs
    const zip = new (window as any).JSZip();
    
    for (const result of results) {
      if (result.compressedFile) {
        const arrayBuffer = await result.compressedFile.arrayBuffer();
        const fileName = result.name.replace(/\.[^/.]+$/, '.webp');
        zip.file(fileName, arrayBuffer);
      }
    }
    
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized-images.zip';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Browser Image Optimizer</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Quality (0.1 - 1.0)
              </label>
              <input
                type="number"
                min="0.1"
                max="1"
                step="0.1"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Max Width (px)
              </label>
              <input
                type="number"
                value={maxWidth}
                onChange={(e) => setMaxWidth(parseInt(e.target.value))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Select Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {files.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Selected: {files.length} images
              </p>
            </div>
          )}

          <button
            onClick={processImages}
            disabled={files.length === 0 || processing}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {processing ? 'Processing...' : 'Optimize Images'}
          </button>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Results</h2>
              <button
                onClick={downloadAll}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Download All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">File Name</th>
                    <th className="text-left p-2">Original Size</th>
                    <th className="text-left p-2">Compressed Size</th>
                    <th className="text-left p-2">Reduction</th>
                    <th className="text-left p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{result.name}</td>
                      {result.error ? (
                        <td colSpan={4} className="p-2 text-red-600">
                          Error processing file
                        </td>
                      ) : (
                        <>
                          <td className="p-2">{result.originalSize} MB</td>
                          <td className="p-2">{result.compressedSize} MB</td>
                          <td className="p-2 text-green-600">-{result.reduction}%</td>
                          <td className="p-2">
                            <a
                              href={result.url}
                              download={result.name.replace(/\.[^/.]+$/, '.webp')}
                              className="text-blue-600 hover:underline"
                            >
                              Download
                            </a>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p className="text-sm font-semibold">Summary:</p>
              <p className="text-sm">
                Total files processed: {results.filter(r => !r.error).length}
              </p>
              <p className="text-sm">
                Average reduction: {
                  (results
                    .filter(r => !r.error)
                    .reduce((acc, r) => acc + parseFloat(r.reduction), 0) / 
                    results.filter(r => !r.error).length).toFixed(1)
                }%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}