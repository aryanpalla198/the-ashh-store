const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const outDir = path.join(rootDir, 'out');
const apiPath = path.join(rootDir, 'src', 'app', 'api');
const tempPath = path.join(rootDir, 'src', 'api-temp');
const nextDir = path.join(rootDir, '.next');

console.log('🚀 Deploying The Ashh Store to GitHub Pages...');

try {
  // 1. Clean .next & out
  if (fs.existsSync(nextDir)) fs.rmSync(nextDir, { recursive: true, force: true });
  if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true, force: true });

  // 2. Temporarily move api directory (API routes not applicable to static GitHub Pages export)
  if (fs.existsSync(apiPath)) fs.renameSync(apiPath, tempPath);

  // 3. Build with GITHUB_PAGES=true
  console.log('📦 Generating static export...');
  execSync('npx next build', {
    cwd: rootDir,
    env: { ...process.env, GITHUB_PAGES: 'true' },
    stdio: 'inherit'
  });

  // 4. Create .nojekyll in out
  fs.writeFileSync(path.join(outDir, '.nojekyll'), '');

  // 5. Deploy to gh-pages branch
  console.log('📤 Pushing to gh-pages branch...');
  const cmds = [
    'git init',
    'git add -A',
    'git commit -m "Deploy The Ashh Store to GitHub Pages"',
    'git branch -M gh-pages',
    'git remote add origin https://github.com/aryanpalla198/the-ashh-store.git || git remote set-url origin https://github.com/aryanpalla198/the-ashh-store.git',
    'git push -f -u origin gh-pages'
  ];

  for (const cmd of cmds) {
    execSync(cmd, { cwd: outDir, stdio: 'inherit' });
  }

  console.log('\n✨ Live GitHub Pages URL: https://aryanpalla198.github.io/the-ashh-store/\n');
} catch (err) {
  console.error('Deployment failed:', err);
  process.exit(1);
} finally {
  if (fs.existsSync(tempPath)) {
    fs.renameSync(tempPath, apiPath);
  }
}
