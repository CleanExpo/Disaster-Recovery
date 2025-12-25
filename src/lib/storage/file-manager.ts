/**
 * File Manager
 *
 * High-level file operations with metadata management
 */

import { storageManager, type FileMetadata, type FileCategory } from './storage-manager';
import { mediaProcessor } from './media-processor';

export interface FileInfo {
  id: string;
  name: string;
  size: number;
  type: string;
  category: FileCategory;
  url: string;
  createdAt: Date;
  uploadedBy: string;
  metadata?: Record<string, any>;
}

export interface FileUploadResult {
  success: boolean;
  file?: FileMetadata;
  error?: string;
  processingJobId?: string;
}

export interface FileBatch {
  id: string;
  files: FileMetadata[];
  totalSize: number;
  createdAt: Date;
  uploadedBy: string;
}

/**
 * FileManager
 *
 * Manages file operations with automatic processing
 */
class FileManager {
  private fileBatches = new Map<string, FileBatch>();
  private fileIndex = new Map<string, FileMetadata>();

  /**
   * Upload single file
   */
  async uploadFile(
    buffer: Buffer,
    filename: string,
    category: FileCategory,
    userId: string,
    metadata?: Record<string, any>
  ): Promise<FileUploadResult> {
    try {
      // Validate file
      this.validateFile(buffer, filename, category);

      // Upload to storage
      const fileMetadata = await storageManager.uploadFile(buffer, filename, {
        category,
        isPublic: category === 'avatars' || category === 'media',
        metadata: { ...metadata, userId, mimeType: this.getMimeType(filename) },
      });

      this.fileIndex.set(fileMetadata.id, fileMetadata);

      // Trigger processing if needed
      let processingJobId: string | undefined;
      if (this.shouldProcess(filename)) {
        const job = await this.processFile(fileMetadata.id, filename);
        processingJobId = job.id;
      }

      return { success: true, file: fileMetadata, processingJobId };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }

  /**
   * Upload multiple files in batch
   */
  async uploadBatch(
    files: Array<{ buffer: Buffer; filename: string }>,
    category: FileCategory,
    userId: string,
    metadata?: Record<string, any>
  ): Promise<{
    success: boolean;
    batchId: string;
    files: FileUploadResult[];
    totalSize: number;
  }> {
    const batchId = `batch-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    let totalSize = 0;
    const uploadResults: FileUploadResult[] = [];
    const batchFiles: FileMetadata[] = [];

    for (const { buffer, filename } of files) {
      const result = await this.uploadFile(buffer, filename, category, userId, metadata);

      uploadResults.push(result);

      if (result.file) {
        totalSize += result.file.size;
        batchFiles.push(result.file);
      }
    }

    // Store batch info
    const batch: FileBatch = {
      id: batchId,
      files: batchFiles,
      totalSize,
      createdAt: new Date(),
      uploadedBy: userId,
    };

    this.fileBatches.set(batchId, batch);

    return {
      success: uploadResults.every((r) => r.success),
      batchId,
      files: uploadResults,
      totalSize,
    };
  }

  /**
   * Get file info
   */
  async getFileInfo(fileId: string): Promise<FileInfo | null> {
    const metadata = await storageManager.getFileMetadata(fileId);
    if (!metadata) return null;

    const url = await storageManager.getFileUrl(fileId);

    return {
      id: metadata.id,
      name: metadata.originalName,
      size: metadata.size,
      type: metadata.mimeType,
      category: metadata.category,
      url,
      createdAt: metadata.uploadedAt,
      uploadedBy: metadata.uploadedBy,
      metadata: metadata.metadata,
    };
  }

  /**
   * List files in category
   */
  async listFilesByCategory(
    category: FileCategory,
    limit: number = 50,
    offset: number = 0
  ): Promise<FileInfo[]> {
    const files = Array.from(this.fileIndex.values())
      .filter((f) => f.category === category)
      .slice(offset, offset + limit);

    const infos: FileInfo[] = [];
    for (const file of files) {
      const info = await this.getFileInfo(file.id);
      if (info) infos.push(info);
    }

    return infos;
  }

  /**
   * List user's files
   */
  async listUserFiles(
    userId: string,
    category?: FileCategory,
    limit: number = 50,
    offset: number = 0
  ): Promise<FileInfo[]> {
    let files = Array.from(this.fileIndex.values()).filter(
      (f) => f.uploadedBy === userId
    );

    if (category) {
      files = files.filter((f) => f.category === category);
    }

    files = files.slice(offset, offset + limit);

    const infos: FileInfo[] = [];
    for (const file of files) {
      const info = await this.getFileInfo(file.id);
      if (info) infos.push(info);
    }

    return infos;
  }

  /**
   * Delete file
   */
  async deleteFile(fileId: string): Promise<boolean> {
    return storageManager.deleteFile(fileId);
  }

  /**
   * Delete batch
   */
  async deleteBatch(batchId: string): Promise<number> {
    const batch = this.fileBatches.get(batchId);
    if (!batch) return 0;

    let count = 0;
    for (const file of batch.files) {
      if (await this.deleteFile(file.id)) {
        count++;
      }
    }

    this.fileBatches.delete(batchId);
    return count;
  }

  /**
   * Copy file
   */
  async copyFile(
    sourceFileId: string,
    newCategory: FileCategory,
    userId: string
  ): Promise<FileMetadata | null> {
    const source = this.fileIndex.get(sourceFileId);
    if (!source) return null;

    const buffer = await storageManager.downloadFile(sourceFileId);
    const result = await this.uploadFile(
      buffer,
      source.originalName,
      newCategory,
      userId,
      source.metadata
    );

    return result.file || null;
  }

  /**
   * Get storage statistics
   */
  async getStorageStats() {
    const stats = await storageManager.getStorageStats();
    const queueStatus = mediaProcessor.getQueueStatus();

    return {
      storage: stats,
      processing: queueStatus,
      totalBatches: this.fileBatches.size,
    };
  }

  /**
   * Validate file
   */
  private validateFile(buffer: Buffer, filename: string, category: FileCategory): void {
    const maxSizes: Record<FileCategory, number> = {
      recordings: 5 * 1024 * 1024 * 1024, // 5GB
      documents: 100 * 1024 * 1024, // 100MB
      media: 1 * 1024 * 1024 * 1024, // 1GB
      avatars: 10 * 1024 * 1024, // 10MB
      attachments: 500 * 1024 * 1024, // 500MB
    };

    if (buffer.length > maxSizes[category]) {
      throw new Error(
        `File size exceeds limit of ${maxSizes[category] / 1024 / 1024}MB for ${category}`
      );
    }

    // Validate file extension
    const allowedExtensions: Record<FileCategory, string[]> = {
      recordings: ['mp4', 'webm', 'mov'],
      documents: ['pdf', 'docx', 'txt', 'xlsx', 'pptx'],
      media: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      avatars: ['jpg', 'jpeg', 'png', 'webp'],
      attachments: ['pdf', 'docx', 'xlsx', 'pptx', 'zip'],
    };

    const ext = filename.split('.').pop()?.toLowerCase();
    if (!ext || !allowedExtensions[category].includes(ext)) {
      throw new Error(`Invalid file type for ${category}`);
    }
  }

  /**
   * Check if file should be processed
   */
  private shouldProcess(filename: string): boolean {
    const videoExt = ['mp4', 'webm', 'mov', 'avi'];
    const audioExt = ['mp3', 'wav', 'aac', 'ogg'];
    const imageExt = ['jpg', 'jpeg', 'png', 'gif'];

    const ext = filename.split('.').pop()?.toLowerCase();
    return (
      !!ext &&
      (videoExt.includes(ext) || audioExt.includes(ext) || imageExt.includes(ext))
    );
  }

  /**
   * Process file
   */
  private async processFile(fileId: string, filename: string) {
    const ext = filename.split('.').pop()?.toLowerCase();

    if (['mp4', 'webm', 'mov', 'avi'].includes(ext || '')) {
      return mediaProcessor.createTranscodeJob(fileId, {
        format: 'mp4',
        quality: 'high',
      });
    } else if (['mp3', 'wav', 'aac', 'ogg'].includes(ext || '')) {
      return mediaProcessor.createAudioJob(fileId, {
        format: 'mp3',
        quality: 'high',
      });
    } else {
      return mediaProcessor.createImageJob(fileId, {
        format: 'webp',
        quality: 80,
        compress: true,
      });
    }
  }

  /**
   * Get MIME type from filename
   */
  private getMimeType(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();

    const mimeTypes: Record<string, string> = {
      mp4: 'video/mp4',
      webm: 'video/webm',
      mov: 'video/quicktime',
      mp3: 'audio/mpeg',
      wav: 'audio/wav',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      pdf: 'application/pdf',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    };

    return mimeTypes[ext || ''] || 'application/octet-stream';
  }
}

// Export singleton instance
export const fileManager = new FileManager();
