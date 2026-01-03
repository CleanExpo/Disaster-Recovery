# File Storage & Media Management Documentation

## Overview

The Disaster Recovery - NRPG platform includes a comprehensive file storage and media management system with support for multiple providers, automatic media processing, and a full-featured UI for file management.

## Architecture

### Storage Stack

```
┌─────────────────────────────────────────────────┐
│           Storage UI Components                  │
│  FileUploader | FileBrowser | StorageDashboard  │
└─────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────┐
│              React Hooks Layer                   │
│      useFileUpload | useMediaProcessing          │
└─────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────┐
│             API Routes & Endpoints               │
│  /api/files | /api/media | /api/storage         │
└─────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────┐
│          Service Layer (Backend)                │
│  StorageManager | FileManager | MediaProcessor  │
└─────────────────────────────────────────────────┘
```

## Core Services

### StorageManager (`src/lib/storage/storage-manager.ts`)

Unified interface for file storage operations supporting multiple providers.

**Key Methods:**
```typescript
uploadFile(file: Buffer, filename: string, options: UploadOptions): Promise<FileMetadata>
downloadFile(id: string): Promise<Buffer>
deleteFile(id: string): Promise<boolean>
getFileMetadata(id: string): Promise<FileMetadata | null>
getFileUrl(id: string, expiresIn?: number): Promise<string>
getStorageStats(): Promise<StorageStats>
cleanupExpiredFiles(): Promise<number>
switchProvider(config: StorageConfig): void
```

**Supported Providers:**
- **Local**: File system storage (production-ready)
- **S3**: AWS S3 (ready for implementation)
- **GCS**: Google Cloud Storage (ready for implementation)

**File Categories:**
- `recordings`: 5GB max (video call recordings)
- `documents`: 100MB max (PDFs, Word, Excel, PowerPoint)
- `media`: 1GB max (images and videos)
- `avatars`: 10MB max (user profile pictures)
- `attachments`: 500MB max (general attachments)

### FileManager (`src/lib/storage/file-manager.ts`)

High-level file operations with automatic validation and processing.

**Key Methods:**
```typescript
uploadFile(buffer, filename, category, userId, metadata): Promise<FileUploadResult>
uploadBatch(files, category, userId, metadata): Promise<{success, batchId, files, totalSize}>
getFileInfo(fileId): Promise<FileInfo | null>
listFilesByCategory(category, limit, offset): Promise<FileInfo[]>
listUserFiles(userId, category, limit, offset): Promise<FileInfo[]>
deleteFile(fileId): Promise<boolean>
deleteBatch(batchId): Promise<number>
copyFile(sourceFileId, newCategory, userId): Promise<FileMetadata | null>
getStorageStats(): Promise<{storage, processing, totalBatches}>
```

**Automatic Processing:**
- Videos (mp4, webm, mov, avi) → Transcode to MP4
- Audio (mp3, wav, aac, ogg) → Transcode to MP3
- Images (jpg, png, gif) → Optimize to WebP

### MediaProcessor (`src/lib/storage/media-processor.ts`)

Asynchronous media processing with job queue management.

**Key Methods:**
```typescript
createTranscodeJob(fileId, options): Promise<ProcessingJob>
createImageJob(fileId, options): Promise<ProcessingJob>
createAudioJob(fileId, options): Promise<ProcessingJob>
getJob(jobId): ProcessingJob | null
cancelJob(jobId): boolean
getFileJobs(fileId): ProcessingJob[]
getQueueStatus(): {pending, processing, completed, failed}
cleanupOldJobs(olderThanDays): number
```

**Job Lifecycle:**
1. **Pending**: Queued, waiting to process
2. **Processing**: Currently being processed (progress 0-100%)
3. **Completed**: Successfully processed
4. **Failed**: Error during processing

**Processing Queue:**
- Max 3 concurrent jobs
- Auto-scaling based on system load
- Configurable job cleanup (7 days default)

## API Endpoints

### File Operations

**POST /api/files**
- Upload single file
- Returns: File metadata with processingJobId if applicable

**GET /api/files**
- List files by category or user
- Query params: category, userId, limit (default 50), offset
- Returns: Array of FileInfo objects

**GET /api/files/[fileId]**
- Get file information or download URL
- Query param: action=download for download URL
- Returns: File metadata or download link

**DELETE /api/files/[fileId]**
- Delete specific file
- Returns: Success status

**POST /api/files/[fileId]**
- Copy file to another category
- Body: { action: 'copy', category, userId }
- Returns: New file metadata

### Batch Operations

**POST /api/files/batch**
- Upload multiple files at once
- Returns: Batch ID and per-file results

**GET /api/files/batch**
- Get batch information
- Query param: batchId
- Returns: Batch details with statistics

**DELETE /api/files/batch**
- Delete entire batch
- Query param: batchId
- Returns: Count of deleted files

### Media Processing

**POST /api/media/process**
- Create processing job (video/audio/image)
- Body: { fileId, type, options }
- Returns: Job details with ID and status

**GET /api/media/process**
- Get job status or file jobs
- Query params: jobId OR fileId
- Returns: Job details with progress

**DELETE /api/media/process**
- Cancel processing job
- Query param: jobId
- Returns: Success status

### Storage Management

**GET /api/storage/stats**
- Get storage usage statistics
- Returns: Complete storage breakdown by category

**POST /api/storage/stats**
- Cleanup operations
- Body: { action: 'cleanup-expired' }
- Returns: Number of files removed

## React Hooks

### useFileUpload(options)

Handle file uploads with progress tracking.

```typescript
const {
  uploadProgress,    // Record<filename, UploadProgress>
  isUploading,      // boolean
  uploadFile,       // (file: File) => Promise<{success, fileId?, error?}>
  uploadBatch,      // (files: File[]) => Promise<{success, batchId?, errors}>
  cancelUpload,     // (filename: string) => void
  clearProgress,    // () => void
} = useFileUpload({ category, userId });
```

**UploadProgress:**
```typescript
{
  filename: string;
  progress: number;  // 0-100
  size: number;
  uploaded: number;
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  error?: string;
  processingJobId?: string;
}
```

### useMediaProcessing(jobId)

Monitor media processing jobs.

```typescript
const {
  job,                // Current job details
  isLoading,         // boolean
  error,             // string | null
  fetchJobStatus,    // () => Promise<void>
  cancelJob,         // () => Promise<void>
} = useMediaProcessing(jobId);
```

## UI Components

### FileUploader

Drag-and-drop file upload interface.

**Props:**
```typescript
{
  category: FileCategory;
  userId: string;
  onUploadComplete?: (fileIds: string[]) => void;
  maxFiles?: number;
  maxSize?: number;
  acceptedTypes?: string[];
  multiple?: boolean;
}
```

**Features:**
- Drag-and-drop support
- File validation (size, type, count)
- Progress tracking with cancel
- Batch upload display

### FileBrowser

Browse and manage files.

**Props:**
```typescript
{
  category?: FileCategory;
  userId?: string;
  onFileSelect?: (file: FileItem) => void;
  selectable?: boolean;
}
```

**Features:**
- List and grid view modes
- Sort by name, date, or size
- File deletion with confirmation
- Multi-select support
- File type icons
- Responsive design

### StorageDashboard

Storage usage and management dashboard.

**Features:**
- Total storage visualization (pie chart)
- Category breakdown with percentages
- Processing queue statistics
- Per-category file counts and sizes
- Real-time updates (10s refresh)

## Usage Examples

### Upload Single File

```typescript
import { useFileUpload } from '@/hooks/useFileUpload';

function UploadComponent() {
  const { uploadProgress, uploadFile } = useFileUpload({
    category: 'documents',
    userId: 'user-123',
  });

  const handleFileSelect = async (file: File) => {
    const result = await uploadFile(file);
    if (result.success) {
      console.log('File uploaded:', result.fileId);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleFileSelect(file);
      }} />

      {Object.entries(uploadProgress).map(([name, progress]) => (
        <div key={name}>
          {name}: {progress.progress}%
        </div>
      ))}
    </div>
  );
}
```

### Upload with UI Component

```typescript
import { FileUploader } from '@/components/storage/file-uploader';

function MyUploader() {
  return (
    <FileUploader
      category="documents"
      userId="user-123"
      maxSize={100 * 1024 * 1024}
      acceptedTypes={['pdf', 'docx']}
      onUploadComplete={(fileIds) => {
        console.log('Uploaded:', fileIds);
      }}
    />
  );
}
```

### Browse Files

```typescript
import { FileBrowser } from '@/components/storage/file-browser';

function MyBrowser() {
  return (
    <FileBrowser
      category="media"
      userId="user-123"
      onFileSelect={(file) => {
        window.open(file.url);
      }}
      selectable={true}
    />
  );
}
```

### View Storage Stats

```typescript
import { StorageDashboard } from '@/components/storage/storage-dashboard';

function AdminPanel() {
  return <StorageDashboard />;
}
```

## Configuration

### Environment Variables

```env
# Storage Provider
STORAGE_PROVIDER=local              # local | s3 | gcs
STORAGE_LOCAL_BASE_DIR=./uploads
STORAGE_MAX_FILE_SIZE=5368709120   # 5GB in bytes

# AWS S3 (if using S3)
AWS_S3_BUCKET=my-bucket
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=key
AWS_SECRET_ACCESS_KEY=secret

# Google Cloud Storage (if using GCS)
GCS_PROJECT_ID=project-id
GCS_BUCKET=bucket-name
GCS_KEY_FILE=/path/to/keyfile.json
```

### File Size Limits

```typescript
{
  recordings: 5 * 1024 * 1024 * 1024,    // 5GB
  documents: 100 * 1024 * 1024,          // 100MB
  media: 1 * 1024 * 1024 * 1024,         // 1GB
  avatars: 10 * 1024 * 1024,             // 10MB
  attachments: 500 * 1024 * 1024,        // 500MB
}
```

## Performance Optimization

### Batch Operations

Upload multiple files efficiently:
```typescript
const result = await fileManager.uploadBatch(
  files,
  'documents',
  userId
);
```

### Automatic Cleanup

Expired files are automatically cleaned up:
```typescript
await storageManager.cleanupExpiredFiles(); // Runs periodically
```

### Processing Queue

Media files are processed asynchronously with configurable concurrency:
- Default: 3 concurrent jobs
- Progress tracking per job
- Auto-cleanup after 7 days

## Security

### Access Control
- Files stored with user ID metadata
- Public/private flag support
- Category-based access control

### Input Validation
- File size limits enforced per category
- MIME type validation
- File extension whitelist
- Filename sanitization

### Expiration
- Optional file expiration
- Automatic cleanup of expired files
- Signed URLs with time limits

## Troubleshooting

### Upload Fails

1. Check file size limits for category
2. Verify file type is whitelisted
3. Check disk space availability
4. Review console for error details

### Processing Doesn't Start

1. Verify file uploaded successfully
2. Check media processor queue status
3. Ensure sufficient system resources
4. Review server logs

### Storage Stats Inaccurate

1. Run cleanup to remove orphaned files
2. Verify all files are indexed
3. Check for corrupted metadata
4. Refresh statistics

## Future Enhancements

1. **CDN Integration**: CloudFront/Cloudflare for global distribution
2. **Advanced Transcoding**: FFmpeg integration for quality profiles
3. **Thumbnail Generation**: Auto-generate previews for images/videos
4. **Virus Scanning**: ClamAV integration for security
5. **Archive Support**: Automatic compression for old files
6. **Backup Strategy**: Multi-region redundancy
7. **Access Logging**: Audit trail for all file operations
8. **Advanced Analytics**: Storage trends and predictions

## Support

For issues with file storage:
1. Check configuration in environment variables
2. Verify provider credentials if not using local
3. Check disk space and permissions
4. Review API response errors
5. Check browser console for client-side errors
