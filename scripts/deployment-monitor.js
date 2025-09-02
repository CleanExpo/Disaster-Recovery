const { execSync } = require('child_process');
const fetch = require('node-fetch');

const VERCEL_PROJECT = 'unite-group/disaster-recovery';
const VERCEL_TOKEN = process.env.VERCEL_TOKEN || '';
const GITHUB_REPO = 'CleanExpo/Disaster-Recovery';
const GITHUB_BRANCH = 'main';

async function getLatestVercelDeployment() {
  const url = `https://api.vercel.com/v6/deployments?projectId=${VERCEL_PROJECT}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch Vercel deployments: ${res.statusText}`);
  }
  const data = await res.json();
  return data.deployments && data.deployments[0];
}

function getLatestGitCommit() {
  try {
    const commit = execSync(`git rev-parse ${GITHUB_BRANCH}`, { encoding: 'utf8' }).trim();
    return commit;
  } catch (err) {
    throw new Error(`Failed to get latest git commit: ${err.message}`);
  }
}

async function verifyDeployment() {
  try {
    const latestDeployment = await getLatestVercelDeployment();
    const latestCommit = getLatestGitCommit();

    if (!latestDeployment) {
      console.error('No deployments found on Vercel');
      return false;
    }

    if (latestDeployment.meta.githubCommitSha !== latestCommit) {
      console.error('Latest Vercel deployment commit does not match latest Git commit');
      return false;
    }

    if (latestDeployment.state !== 'READY') {
      console.error(`Latest deployment is not ready: ${latestDeployment.state}`);
      return false;
    }

    console.log('✅ Deployment verified: latest commit matches and deployment is ready');
    return true;
  } catch (err) {
    console.error('Error verifying deployment:', err.message);
    return false;
  }
}

async function monitorDeployment() {
  console.log('🔍 Starting deployment monitor...');
  const verified = await verifyDeployment();
  if (!verified) {
    console.error('Deployment verification failed. Consider rollback or manual intervention.');
  }
  process.exit(verified ? 0 : 1);
}

if (require.main === module) {
  monitorDeployment();
}

module.exports = {
  verifyDeployment,
  monitorDeployment,
};
