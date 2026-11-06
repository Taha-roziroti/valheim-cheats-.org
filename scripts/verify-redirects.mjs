import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const redirectsPath = path.join(root, 'public', '_redirects');

if (!fs.existsSync(redirectsPath)) {
  console.error('verify-redirects: public/_redirects not found');
  process.exit(1);
}

const lines = fs
  .readFileSync(redirectsPath, 'utf8')
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'));

const errors = [];

for (const line of lines) {
  const parts = line.split(/\s+/);
  if (parts.length < 2) {
    errors.push(`Invalid line: ${line}`);
    continue;
  }
  const status = parts[parts.length - 1];
  if (!/^(301|302|200)$/.test(status)) errors.push(`Bad status in: ${line}`);
}

if (errors.length) {
  console.error('verify-redirects: FAILED\n' + errors.map((e) => '  - ' + e).join('\n'));
  process.exit(1);
}

console.log('verify-redirects: OK');
