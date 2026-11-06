import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourcePng = path.join(root, 'public', 'images', 'gameplay', 'dota-2-map-hack.png');
const outDir = path.join(root, 'public', 'og');
const outJpg = path.join(outDir, 'default.jpg');

fs.mkdirSync(outDir, { recursive: true });

if (!fs.existsSync(sourcePng)) {
  console.error(`generate-seo-assets: source missing: ${path.relative(root, sourcePng)}`);
  process.exit(1);
}

await sharp(sourcePng)
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(outJpg);

console.log(`generate-seo-assets: wrote ${path.relative(root, outJpg)} (1200×630)`);
