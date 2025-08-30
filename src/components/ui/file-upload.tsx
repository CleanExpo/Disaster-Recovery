'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileText, Image, Film, Music, Archive, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in MB
  onFilesChange: (files: File[]) => void;
  files: File[];
  className?: string;
  label?: string;
  description?: string;
  disabled?: boolean;
}

const getFileIcon = (file: File) => {
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();
  
  if (type.startsWith('image/')) return <Image className="h-5 w-5 text-blue-500" />;
  if (type.startsWith('video/')) return <Film className="h-5 w-5 text-purple-500" />;
  if (type.startsWith('audio/')) return <Music className="h-5 w-5 text-green-500" />;
  if (type.includes('pdf')) return <FileText className="h-5 w-5 text-red-500" />;
  if (type.includes('zip') || type.includes('rar') || type.includes('7z')) 
    return <Archive className="h-5 w-5 text-orange-500" />;
  
  return <FileText className="h-5 w-5 text-gray-500" />;
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function FileUpload({
  accept = ".pdf,.jpg,.jpeg,.png",
  multiple = true,
  maxFiles = 10,
  maxSize = 10, // 10MB default
  onFilesChange,
  files,
  className,
  label = "Upload Files",
  description = "Drag and drop files here or click to browse",
  disabled = false
}: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (fileList: FileList): File[] => {
    const validFiles: File[] = [];
    const newErrors: string[] = [];
    
    Array.from(fileList).forEach((file) => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        newErrors.push(`${file.name} is too large (max ${maxSize}MB)`);
        return;
      }
      
      // Check file count
      if (files.length + validFiles.length >= maxFiles) {
        newErrors.push(`Maximum ${maxFiles} files allowed`);
        return;
      }
      
      // Check if file already exists
      if (files.some(f => f.name === file.name && f.size === file.size)) {
        newErrors.push(`${file.name} already uploaded`);
        return;
      }
      
      validFiles.push(file);
    });
    
    setErrors(newErrors);
    return validFiles;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    if (disabled) return;
    
    const droppedFiles = validateFiles(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      onFilesChange([...files, ...droppedFiles]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = validateFiles(e.target.files);
      if (selectedFiles.length > 0) {
        onFilesChange([...files, ...selectedFiles]);
      }
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  const clearAll = () => {
    onFilesChange([]);
    setErrors([]);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-6 sm:p-8 transition-all duration-300",
          dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300",
          disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "hover:border-gray-400 cursor-pointer",
          "group"
        )}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
          disabled={disabled}
        />
        
        <div className="text-center">
          <motion.div
            animate={{ 
              scale: dragOver ? 1.1 : 1,
              rotate: dragOver ? 5 : 0 
            }}
            className={cn(
              "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full",
              dragOver ? "bg-blue-100" : "bg-gray-100 group-hover:bg-gray-200"
            )}
          >
            <Upload className={cn(
              "h-8 w-8 transition-colors",
              dragOver ? "text-blue-600" : "text-gray-600"
            )} />
          </motion.div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {label}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {description}
          </p>
          
          <div className="text-xs text-gray-500">
            <p>Maximum file size: {maxSize}MB</p>
            <p>Accepted formats: {accept}</p>
            <p>Maximum files: {maxFiles}</p>
          </div>
        </div>
      </motion.div>

      {/* Error Messages */}
      <AnimatePresence>
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {errors.map((error, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center text-red-600 text-sm bg-red-50 p-3 rounded-lg"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                {error}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-900">
                Uploaded Files ({files.length}/{maxFiles})
              </h4>
              {files.length > 1 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-gray-500 hover:text-red-600 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
            
            <div className="grid gap-3">
              {files.map((file, index) => (
                <motion.div
                  key={`${file.name}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    {getFileIcon(file)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className="flex-shrink-0 p-1 text-gray-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}