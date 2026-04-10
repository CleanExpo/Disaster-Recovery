import * as fs from 'fs';
import * as path from 'path';

// --- Manual .env.local loader (project convention — no dotenv) ---

function loadEnvFile(filePath: string): void {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex).trim();
      let value = trimmed.slice(eqIndex + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch { /* skip if file does not exist */ }
}

function findProjectRoot(): string {
  let dir = __dirname;
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, '.env.local'))) return dir;
    dir = path.dirname(dir);
  }
  return process.cwd();
}

const projectRoot = findProjectRoot();
loadEnvFile(path.join(projectRoot, '.env.local'));
loadEnvFile(path.join(projectRoot, '.env'));

// --- Types ---

interface RedditTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

interface RedditMeResponse {
  name: string;
  id: string;
}

interface RedditSubmitResponse {
  json: {
    errors: string[][];
    data?: {
      name: string;
      url: string;
    };
  };
}

export interface RedditSubmissionMetrics {
  ups: number;
  downs: number;
  num_comments: number;
  upvote_ratio: number;
  removed_by_category: string | null;
}

// --- Token cache ---

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  // Refresh 30 seconds before expiry
  if (cachedToken && now < tokenExpiresAt - 30_000) {
    return cachedToken;
  }

  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;
  const refreshToken = process.env.REDDIT_REFRESH_TOKEN;
  const username = process.env.REDDIT_USERNAME;
  const userAgent =
    process.env.REDDIT_USER_AGENT ||
    `script:disaster-recovery-geo:v1.0 (by /u/${username})`;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      'Missing Reddit credentials. Set REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, and REDDIT_REFRESH_TOKEN in .env.local'
    );
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const res = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': userAgent,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) {
    throw new Error(`Reddit token request failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json() as RedditTokenResponse;
  if (!data.access_token) {
    throw new Error('Reddit token response missing access_token');
  }

  cachedToken = data.access_token;
  tokenExpiresAt = now + data.expires_in * 1000;
  return cachedToken;
}

// --- Rate-limiting helper ---

let lastCallTime = 0;
const MIN_DELAY_MS = 2000;

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function rateLimit(): Promise<void> {
  const now = Date.now();
  const elapsed = now - lastCallTime;
  if (elapsed < MIN_DELAY_MS) {
    await delay(MIN_DELAY_MS - elapsed);
  }
  lastCallTime = Date.now();
}

function getUserAgent(): string {
  const username = process.env.REDDIT_USERNAME;
  return (
    process.env.REDDIT_USER_AGENT ||
    `script:disaster-recovery-geo:v1.0 (by /u/${username})`
  );
}

// --- Public API ---

async function verifyAuth(): Promise<{ success: boolean; username: string; error?: string }> {
  try {
    await rateLimit();
    const token = await getAccessToken();

    const res = await fetch('https://oauth.reddit.com/api/v1/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': getUserAgent(),
      },
    });

    if (!res.ok) {
      return { success: false, username: '', error: `${res.status} ${res.statusText}` };
    }

    const me = await res.json() as RedditMeResponse;
    return { success: true, username: me.name };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, username: '', error: message };
  }
}

function getTargetSubreddit(subreddit?: string): string {
  return subreddit || process.env.REDDIT_TARGET_SUBREDDIT || 'test';
}

async function submitTextPost(
  title: string,
  body: string,
  subreddit?: string
): Promise<{ id: string; url: string }> {
  await rateLimit();
  const token = await getAccessToken();
  const target = getTargetSubreddit(subreddit);

  const res = await fetch('https://oauth.reddit.com/api/submit', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': getUserAgent(),
    },
    body: new URLSearchParams({
      sr: target,
      kind: 'self',
      title,
      text: body,
      api_type: 'json',
      resubmit: 'true',
    }),
  });

  if (!res.ok) {
    throw new Error(`Reddit submit failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json() as RedditSubmitResponse;

  if (data.json.errors && data.json.errors.length > 0) {
    throw new Error(`Reddit API errors: ${data.json.errors.map((e) => e.join(': ')).join(', ')}`);
  }

  if (!data.json.data?.name || !data.json.data?.url) {
    throw new Error('Reddit submit response missing post data');
  }

  return {
    id: data.json.data.name,
    url: data.json.data.url,
  };
}

async function uploadAndPost(
  title: string,
  body: string,
  imagePath: string,
  subreddit?: string
): Promise<{ id: string; url: string }> {
  // Reddit markdown does not support inline image uploads in selftext via the API.
  // Strategy: submit as a text post and append an image link reference if an image path is provided.
  let finalBody = body;

  if (imagePath && fs.existsSync(imagePath)) {
    const fileName = path.basename(imagePath);
    finalBody += `\n\n![${fileName}](${imagePath})`;
  }

  return submitTextPost(title, finalBody, subreddit);
}

async function getSubmissionMetrics(
  redditId: string
): Promise<RedditSubmissionMetrics> {
  await rateLimit();
  const token = await getAccessToken();

  // redditId is the post fullname (e.g. "t3_abc123") — by_id accepts comma-separated fullnames
  const res = await fetch(`https://oauth.reddit.com/by_id/${encodeURIComponent(redditId)}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'User-Agent': getUserAgent(),
    },
  });

  if (!res.ok) {
    throw new Error(`Reddit by_id request failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json() as { data: { children: Array<{ data: RedditSubmissionMetrics }> } };
  const post = data.data?.children?.[0]?.data;

  if (!post) {
    throw new Error(`Reddit post not found: ${redditId}`);
  }

  return {
    ups: post.ups ?? 0,
    downs: post.downs ?? 0,
    num_comments: post.num_comments ?? 0,
    upvote_ratio: post.upvote_ratio ?? 0,
    removed_by_category: post.removed_by_category ?? null,
  };
}

export {
  verifyAuth,
  submitTextPost,
  uploadAndPost,
  getSubmissionMetrics,
  delay,
};
