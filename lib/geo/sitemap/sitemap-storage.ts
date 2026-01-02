/**
 * Sitemap Storage & Management
 * Disaster Recovery - NRPG Platform
 *
 * Handles sitemap persistence, updates, and cleanup.
 * Supports both file system (for Vercel/Next.js) and cloud storage (S3/GCS).
 */

import {
  SitemapUrl,
  SitemapConfig,
  SitemapFile,
  DEFAULT_SITEMAP_CONFIG,
  generateSitemapXml,
  generateSitemapIndexXml,
  splitIntoSitemapFiles,
} from './sitemap-generator';

// ============================================
// Types
// ============================================

export interface SitemapStorageConfig {
  storageType: 'filesystem' | 's3' | 'gcs' | 'vercel-blob';
  basePath: string;
  bucketName?: string;
  region?: string;
}

export interface SitemapStatus {
  lastUpdated: Date;
  totalUrls: number;
  sitemapCount: number;
  sitemapFiles: SitemapFile[];
  storageLocation: string;
  isIndex: boolean;
}

export interface StoredSitemap {
  xml: string;
  urls: SitemapUrl[];
  lastmod: Date;
  checksum: string;
}

// ============================================
// Default Configuration
// ============================================

const DEFAULT_STORAGE_CONFIG: SitemapStorageConfig = {
  storageType: 'filesystem',
  basePath: 'public',
};

// ============================================
// Sitemap Storage Operations
// ============================================

/**
 * Save sitemap to configured storage
 */
export async function saveSitemapToStorage(
  urls: SitemapUrl[],
  sitemapConfig: SitemapConfig = DEFAULT_SITEMAP_CONFIG,
  storageConfig: SitemapStorageConfig = DEFAULT_STORAGE_CONFIG
): Promise<SitemapStatus> {
  const lastUpdated = new Date();

  // Split into multiple files if needed
  if (urls.length > sitemapConfig.maxUrlsPerSitemap) {
    return saveMultipleSitemaps(urls, sitemapConfig, storageConfig, lastUpdated);
  }

  // Single sitemap
  const xml = generateSitemapXml(urls, sitemapConfig);
  const filename = 'sitemap.xml';

  await writeToStorage(filename, xml, storageConfig);

  console.log(`[Sitemap] Saved ${urls.length} URLs to ${filename}`);

  return {
    lastUpdated,
    totalUrls: urls.length,
    sitemapCount: 1,
    sitemapFiles: [
      {
        loc: `${sitemapConfig.baseUrl}/sitemap.xml`,
        lastmod: lastUpdated.toISOString().split('T')[0],
        urlCount: urls.length,
      },
    ],
    storageLocation: `${storageConfig.basePath}/${filename}`,
    isIndex: false,
  };
}

/**
 * Save multiple sitemap files with index
 */
async function saveMultipleSitemaps(
  urls: SitemapUrl[],
  sitemapConfig: SitemapConfig,
  storageConfig: SitemapStorageConfig,
  lastUpdated: Date
): Promise<SitemapStatus> {
  const { sitemaps, urlsByFile } = splitIntoSitemapFiles(urls, sitemapConfig);

  // Save individual sitemaps
  for (let i = 0; i < urlsByFile.length; i++) {
    const xml = generateSitemapXml(urlsByFile[i], sitemapConfig);
    const filename = `sitemap-${i + 1}.xml`;
    await writeToStorage(filename, xml, storageConfig);
    console.log(`[Sitemap] Saved ${urlsByFile[i].length} URLs to ${filename}`);
  }

  // Save sitemap index
  const indexXml = generateSitemapIndexXml(sitemaps, sitemapConfig);
  await writeToStorage('sitemap.xml', indexXml, storageConfig);
  console.log(`[Sitemap] Saved sitemap index with ${sitemaps.length} sitemaps`);

  return {
    lastUpdated,
    totalUrls: urls.length,
    sitemapCount: sitemaps.length,
    sitemapFiles: sitemaps,
    storageLocation: `${storageConfig.basePath}/sitemap.xml`,
    isIndex: true,
  };
}

/**
 * Write content to storage based on configuration
 */
async function writeToStorage(
  filename: string,
  content: string,
  config: SitemapStorageConfig
): Promise<void> {
  switch (config.storageType) {
    case 'filesystem':
      await writeToFilesystem(filename, content, config.basePath);
      break;
    case 's3':
      await writeToS3(filename, content, config);
      break;
    case 'gcs':
      await writeToGCS(filename, content, config);
      break;
    case 'vercel-blob':
      await writeToVercelBlob(filename, content);
      break;
    default:
      throw new Error(`Unknown storage type: ${config.storageType}`);
  }
}

/**
 * Write to local filesystem
 */
async function writeToFilesystem(filename: string, content: string, basePath: string): Promise<void> {
  // Dynamic import for Node.js fs module (server-side only)
  const { writeFile, mkdir } = await import('fs/promises');
  const { join } = await import('path');

  const filePath = join(process.cwd(), basePath, filename);

  // Ensure directory exists
  const dirPath = join(process.cwd(), basePath);
  await mkdir(dirPath, { recursive: true });

  await writeFile(filePath, content, 'utf-8');
}

/**
 * Write to AWS S3
 */
async function writeToS3(
  filename: string,
  content: string,
  config: SitemapStorageConfig
): Promise<void> {
  // TODO: Implement S3 upload
  // Requires: @aws-sdk/client-s3

  /*
  const { S3Client, PutObjectCommand } = await import('@aws-sdk/client-s3');

  const client = new S3Client({ region: config.region || 'ap-southeast-2' });

  await client.send(new PutObjectCommand({
    Bucket: config.bucketName,
    Key: `${config.basePath}/${filename}`,
    Body: content,
    ContentType: 'application/xml',
    CacheControl: 'public, max-age=3600',
  }));
  */

  console.log(`[S3] Would upload ${filename} to bucket ${config.bucketName}`);
}

/**
 * Write to Google Cloud Storage
 */
async function writeToGCS(
  filename: string,
  content: string,
  config: SitemapStorageConfig
): Promise<void> {
  // TODO: Implement GCS upload
  // Requires: @google-cloud/storage

  /*
  const { Storage } = await import('@google-cloud/storage');

  const storage = new Storage();
  const bucket = storage.bucket(config.bucketName!);
  const file = bucket.file(`${config.basePath}/${filename}`);

  await file.save(content, {
    contentType: 'application/xml',
    metadata: {
      cacheControl: 'public, max-age=3600',
    },
  });
  */

  console.log(`[GCS] Would upload ${filename} to bucket ${config.bucketName}`);
}

/**
 * Write to Vercel Blob Storage
 */
async function writeToVercelBlob(filename: string, content: string): Promise<void> {
  // TODO: Implement Vercel Blob upload
  // Requires: @vercel/blob

  /*
  const { put } = await import('@vercel/blob');

  await put(filename, content, {
    access: 'public',
    contentType: 'application/xml',
  });
  */

  console.log(`[Vercel Blob] Would upload ${filename}`);
}

// ============================================
// Sitemap Loading
// ============================================

/**
 * Load sitemap from storage
 */
export async function loadSitemapFromStorage(
  filename: string = 'sitemap.xml',
  storageConfig: SitemapStorageConfig = DEFAULT_STORAGE_CONFIG
): Promise<StoredSitemap | null> {
  try {
    const content = await readFromStorage(filename, storageConfig);

    if (!content) {
      return null;
    }

    // Parse XML to extract URLs (simplified - use proper XML parser in production)
    const urls = parseUrlsFromSitemap(content);

    return {
      xml: content,
      urls,
      lastmod: new Date(),
      checksum: generateChecksum(content),
    };
  } catch (error) {
    console.error(`[Sitemap] Error loading ${filename}:`, error);
    return null;
  }
}

/**
 * Read content from storage
 */
async function readFromStorage(
  filename: string,
  config: SitemapStorageConfig
): Promise<string | null> {
  switch (config.storageType) {
    case 'filesystem':
      return readFromFilesystem(filename, config.basePath);
    case 's3':
      return readFromS3(filename, config);
    case 'gcs':
      return readFromGCS(filename, config);
    case 'vercel-blob':
      return readFromVercelBlob(filename);
    default:
      throw new Error(`Unknown storage type: ${config.storageType}`);
  }
}

async function readFromFilesystem(filename: string, basePath: string): Promise<string | null> {
  try {
    const { readFile } = await import('fs/promises');
    const { join } = await import('path');
    const filePath = join(process.cwd(), basePath, filename);
    return await readFile(filePath, 'utf-8');
  } catch {
    return null;
  }
}

async function readFromS3(filename: string, config: SitemapStorageConfig): Promise<string | null> {
  // TODO: Implement S3 read
  console.log(`[S3] Would read ${filename} from bucket ${config.bucketName}`);
  return null;
}

async function readFromGCS(filename: string, config: SitemapStorageConfig): Promise<string | null> {
  // TODO: Implement GCS read
  console.log(`[GCS] Would read ${filename} from bucket ${config.bucketName}`);
  return null;
}

async function readFromVercelBlob(filename: string): Promise<string | null> {
  // TODO: Implement Vercel Blob read
  console.log(`[Vercel Blob] Would read ${filename}`);
  return null;
}

// ============================================
// Sitemap Updates
// ============================================

/**
 * Update sitemap with new pages (incremental update)
 */
export async function updateSitemapWithNewPages(
  newUrls: SitemapUrl[],
  sitemapConfig: SitemapConfig = DEFAULT_SITEMAP_CONFIG,
  storageConfig: SitemapStorageConfig = DEFAULT_STORAGE_CONFIG
): Promise<SitemapStatus> {
  // Load existing sitemap
  const existing = await loadSitemapFromStorage('sitemap.xml', storageConfig);

  // Merge URLs (deduplicate by loc)
  const existingLocs = new Set(existing?.urls.map((u) => u.loc) || []);
  const uniqueNewUrls = newUrls.filter((u) => !existingLocs.has(u.loc));

  const allUrls = [...(existing?.urls || []), ...uniqueNewUrls];

  console.log(`[Sitemap] Adding ${uniqueNewUrls.length} new URLs (${allUrls.length} total)`);

  // Save updated sitemap
  return saveSitemapToStorage(allUrls, sitemapConfig, storageConfig);
}

// ============================================
// Status & Cleanup
// ============================================

/**
 * Get current sitemap status
 */
export async function getSitemapStatus(
  storageConfig: SitemapStorageConfig = DEFAULT_STORAGE_CONFIG
): Promise<SitemapStatus | null> {
  const existing = await loadSitemapFromStorage('sitemap.xml', storageConfig);

  if (!existing) {
    return null;
  }

  // Check if index or single sitemap
  const isIndex = existing.xml.includes('<sitemapindex');

  let sitemapFiles: SitemapFile[] = [];
  let totalUrls = 0;

  if (isIndex) {
    // Parse sitemap index to get file list
    sitemapFiles = parseSitemapIndex(existing.xml);
    totalUrls = sitemapFiles.reduce((sum, f) => sum + f.urlCount, 0);
  } else {
    totalUrls = existing.urls.length;
    sitemapFiles = [
      {
        loc: `${DEFAULT_SITEMAP_CONFIG.baseUrl}/sitemap.xml`,
        lastmod: existing.lastmod.toISOString().split('T')[0],
        urlCount: totalUrls,
      },
    ];
  }

  return {
    lastUpdated: existing.lastmod,
    totalUrls,
    sitemapCount: sitemapFiles.length,
    sitemapFiles,
    storageLocation: `${storageConfig.basePath}/sitemap.xml`,
    isIndex,
  };
}

/**
 * Clean up old sitemap files
 */
export async function cleanupOldSitemaps(
  keepCount: number = 5,
  storageConfig: SitemapStorageConfig = DEFAULT_STORAGE_CONFIG
): Promise<number> {
  // TODO: Implement cleanup of old sitemap files
  // This would list all sitemap-*.xml files and delete old ones

  console.log(`[Sitemap] Would clean up old sitemaps, keeping ${keepCount}`);
  return 0;
}

// ============================================
// Utility Functions
// ============================================

/**
 * Parse URLs from sitemap XML (simplified)
 */
function parseUrlsFromSitemap(xml: string): SitemapUrl[] {
  const urls: SitemapUrl[] = [];

  // Simple regex-based parsing (use proper XML parser in production)
  const urlMatches = xml.matchAll(/<url>[\s\S]*?<\/url>/g);

  for (const match of urlMatches) {
    const urlBlock = match[0];

    const locMatch = urlBlock.match(/<loc>(.*?)<\/loc>/);
    const lastmodMatch = urlBlock.match(/<lastmod>(.*?)<\/lastmod>/);
    const changefreqMatch = urlBlock.match(/<changefreq>(.*?)<\/changefreq>/);
    const priorityMatch = urlBlock.match(/<priority>(.*?)<\/priority>/);

    if (locMatch) {
      urls.push({
        loc: locMatch[1],
        lastmod: lastmodMatch?.[1],
        changefreq: changefreqMatch?.[1] as SitemapUrl['changefreq'],
        priority: priorityMatch ? parseFloat(priorityMatch[1]) : undefined,
      });
    }
  }

  return urls;
}

/**
 * Parse sitemap index XML
 */
function parseSitemapIndex(xml: string): SitemapFile[] {
  const sitemaps: SitemapFile[] = [];

  const sitemapMatches = xml.matchAll(/<sitemap>[\s\S]*?<\/sitemap>/g);

  for (const match of sitemapMatches) {
    const block = match[0];

    const locMatch = block.match(/<loc>(.*?)<\/loc>/);
    const lastmodMatch = block.match(/<lastmod>(.*?)<\/lastmod>/);

    if (locMatch) {
      sitemaps.push({
        loc: locMatch[1],
        lastmod: lastmodMatch?.[1] || new Date().toISOString().split('T')[0],
        urlCount: 0, // Would need to load each file to count
      });
    }
  }

  return sitemaps;
}

/**
 * Generate simple checksum for content
 */
function generateChecksum(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(16);
}
