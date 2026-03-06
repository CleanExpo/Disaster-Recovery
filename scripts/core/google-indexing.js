#!/usr/bin/env node

/**
 * Google Indexing API — Submit URLs for faster crawling
 *
 * Usage:
 *   node scripts/google-indexing.js <url1> <url2> ...
 *   node scripts/google-indexing.js --sitemap
 *   node scripts/google-indexing.js --sitemap --type URL_DELETED
 *
 * Requires:
 *   GOOGLE_INDEXING_KEY_PATH env var pointing to a service account JSON key
 *   The service account email must be an Owner in Google Search Console
 */

const { google } = require('googleapis');
const https = require('https');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://disasterrecovery.com.au';
const DAILY_QUOTA = 200;

// ── Helpers ──────────────────────────────────────────────

function loadCredentials() {
  const keyPath =
    process.env.GOOGLE_INDEXING_KEY_PATH ||
    path.join(__dirname, '..', 'google-indexing-key.json');

  if (!fs.existsSync(keyPath)) {
    console.error(
      '\x1b[31mError: Service account key not found.\x1b[0m\n\n' +
        'Set GOOGLE_INDEXING_KEY_PATH in .env.local to the path of your\n' +
        'Google Cloud service account JSON key, or place it at:\n' +
        `  ${path.resolve(path.join(__dirname, '..', 'google-indexing-key.json'))}\n\n` +
        'Setup steps:\n' +
        '  1. Google Cloud Console \u2192 Enable Indexing API\n' +
        '  2. Create Service Account \u2192 Download JSON key\n' +
        '  3. Google Search Console \u2192 Add service account email as Owner\n' +
        '  4. Set GOOGLE_INDEXING_KEY_PATH=/path/to/key.json in .env.local'
    );
    process.exit(1);
  }

  return JSON.parse(fs.readFileSync(keyPath, 'utf8'));
}

async function getAuthClient(credentials) {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });
  return auth.getClient();
}

function fetchSitemapUrls() {
  return new Promise((resolve, reject) => {
    const sitemapUrl = `${SITE_URL}/sitemap.xml`;
    console.log(`Fetching sitemap from ${sitemapUrl}...`);

    https
      .get(sitemapUrl, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          const urls = [];
          const locRegex = /<loc>(.*?)<\/loc>/g;
          let match;
          while ((match = locRegex.exec(data)) !== null) {
            urls.push(match[1]);
          }
          console.log(`Found ${urls.length} URLs in sitemap.\n`);
          resolve(urls);
        });
        res.on('error', reject);
      })
      .on('error', reject);
  });
}

async function submitUrl(authClient, url, type) {
  const indexing = google.indexing({ version: 'v3', auth: authClient });

  const res = await indexing.urlNotifications.publish({
    requestBody: { url, type },
  });

  return res.data;
}

// ── Main ─────────────────────────────────────────────────

async function main() {
  // Load .env.local if present (simple key=value parsing, no shell execution)
  const envLocalPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envLocalPath)) {
    const envContent = fs.readFileSync(envLocalPath, 'utf8');
    for (const line of envContent.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }

  const args = process.argv.slice(2);

  // Parse flags
  const useSitemap = args.includes('--sitemap');
  const typeFlag = args.includes('--type')
    ? args[args.indexOf('--type') + 1]
    : 'URL_UPDATED';

  if (!['URL_UPDATED', 'URL_DELETED'].includes(typeFlag)) {
    console.error(`Invalid type: ${typeFlag}. Use URL_UPDATED or URL_DELETED.`);
    process.exit(1);
  }

  // Collect URLs
  let urls;
  if (useSitemap) {
    urls = await fetchSitemapUrls();
  } else {
    urls = args.filter((a) => a.startsWith('http') || a.startsWith('/'));
  }

  if (urls.length === 0) {
    console.error(
      'No URLs to submit.\n\n' +
        'Usage:\n' +
        '  node scripts/google-indexing.js https://disasterrecovery.com.au/page1\n' +
        '  node scripts/google-indexing.js /page1 /page2\n' +
        '  node scripts/google-indexing.js --sitemap\n'
    );
    process.exit(1);
  }

  // Normalise: bare paths get the site prefix
  urls = urls.map((u) => (u.startsWith('/') ? `${SITE_URL}${u}` : u));

  // Quota warning
  if (urls.length > DAILY_QUOTA) {
    console.warn(
      `\x1b[33mWarning: Submitting ${urls.length} URLs exceeds the daily quota of ${DAILY_QUOTA}.\x1b[0m\n` +
        'Google may reject requests beyond the quota. Consider batching.\n'
    );
  }

  console.log(`Submitting ${urls.length} URL(s) as ${typeFlag}...\n`);

  // Authenticate
  const credentials = loadCredentials();
  const authClient = await getAuthClient(credentials);

  // Submit each URL
  let success = 0;
  let failed = 0;

  for (const url of urls) {
    try {
      const result = await submitUrl(authClient, url, typeFlag);
      const notifyTime =
        result.urlNotificationMetadata?.latestUpdate?.notifyTime || 'queued';
      console.log(`  \x1b[32m\u2713\x1b[0m ${url}  (${notifyTime})`);
      success++;
    } catch (err) {
      const msg = err.response?.data?.error?.message || err.message;
      console.log(`  \x1b[31m\u2717\x1b[0m ${url}  \u2014 ${msg}`);
      failed++;
    }
  }

  // Summary
  console.log(
    `\n${'─'.repeat(50)}\n` +
      `Submitted: ${success}  |  Failed: ${failed}  |  Total: ${urls.length}\n` +
      `${'─'.repeat(50)}`
  );

  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
