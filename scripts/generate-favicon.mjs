/**
 * Build favicon + touch icons from the Valheim wordmark (transparent PNG).
 * Crops the left portion so the tall "V" stays readable at 16–32px.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const source = path.join(root, 'public', 'images', 'brand', 'valheim-favicon-source.png');
const publicDir = path.join(root, 'public');

if (!fs.existsSync(source)) {
  console.error(`generate-favicon: missing source: ${path.relative(root, source)}`);
  process.exit(1);
}

const meta = await sharp(source).metadata();
const fullW = meta.width ?? 0;
const fullH = meta.height ?? 0;
if (!fullW || !fullH) {
  console.error('generate-favicon: could not read image dimensions');
  process.exit(1);
}

/** Use left ~38% of the wordmark (emphasizes the large "V"). */
const cropW = Math.max(1, Math.round(fullW * 0.38));
const base = sharp(source).extract({ left: 0, top: 0, width: cropW, height: fullH }).ensureAlpha();

async function writePng(filename, size) {
  const dest = path.join(publicDir, filename);
  await base
    .clone()
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(dest);
  console.log(`generate-favicon: ${path.relative(root, dest)} (${size}×${size})`);
}

await writePng('favicon-16.png', 16);
await writePng('favicon-32.png', 32);
await writePng('favicon.png', 48);
await writePng('apple-touch-icon.png', 180);

const faviconSvg = path.join(publicDir, 'favicon.svg');
if (fs.existsSync(faviconSvg)) {
  fs.unlinkSync(faviconSvg);
  console.log(`generate-favicon: removed ${path.relative(root, faviconSvg)} (replaced by PNG)`);
}

const oldIco = path.join(publicDir, 'favicon.ico');
if (fs.existsSync(oldIco)) {
  fs.unlinkSync(oldIco);
  console.log(`generate-favicon: removed ${path.relative(root, oldIco)}`);
}

console.log('generate-favicon: done');
