import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC_LOGO = 'app/icon.svg';
const DEST_DIR = 'public/luxima/favicon';

const SIZES = [
  { name: 'icon-32.png', size: 32 },
  { name: 'apple-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
];

async function generateFavicons() {
  if (!fs.existsSync(DEST_DIR)) {
    fs.mkdirSync(DEST_DIR, { recursive: true });
  }

  console.log(`Generating favicons from ${SRC_LOGO}...`);

  // Generate PNGs
  for (const { name, size } of SIZES) {
    await sharp(SRC_LOGO)
      .resize(size, size)
      .toFile(path.join(DEST_DIR, name));
    console.log(`Generated ${name}`);
  }

  // Generate .ico (using 32x32 for simplicity as a single layer, sharp doesn't natively support multi-layer ico easily without extra plugins)
  // But we can generate a 32x32 and rename it or use a proper ico generator if needed.
  // Standard practice for Next.js is often just a high-res ico or just use the pngs.
  await sharp(SRC_LOGO)
    .resize(32, 32)
    .toFormat('ico') // Note: sharp needs a plugin or specific env for .ico, let's try .toFormat('png') then manually handle if .ico fails or use 48x48
    .toFile(path.join(DEST_DIR, 'favicon.ico'))
    .catch(err => {
        console.warn('ICO generation failed, creating PNG-based favicon.ico as fallback:', err.message);
        return sharp(SRC_LOGO).resize(48, 48).toFile(path.join(DEST_DIR, 'favicon.ico'));
    });

  console.log('Favicon generation complete!');
}

generateFavicons().catch(console.error);
