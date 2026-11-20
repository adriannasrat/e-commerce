// Makes smaller copies of the product cut-outs and photos, so each screen can
// load the smallest image that is still sharp on it. A copy sits beside its
// original as `name-640w.webp`, and `media-sizes.json` lists every width that
// exists, the original's included, for the storefront's srcset.
//
// Run it again after adding or replacing an image: `node scripts/resize-media.js`.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const MEDIA = path.join(__dirname, '../public/media');
const MANIFEST = path.join(__dirname, '../src/features/storefront-preview/media-sizes.json');
const FOLDERS = ['products', 'photos'];
const WIDTHS = [640, 1280, 1920];
const COPY = /-\d+w\.\w+$/;

const encode = (image, extension) =>
  extension === '.webp' ? image.webp({ quality: 80 }) : image.jpeg({ quality: 80, mozjpeg: true });

async function main() {
  const manifest = {};
  for (const folder of FOLDERS) {
    const files = fs.readdirSync(path.join(MEDIA, folder))
      .filter((name) => /\.(webp|jpg)$/.test(name) && !COPY.test(name))
      .sort();
    for (const name of files) {
      const file = path.join(MEDIA, folder, name);
      const { width } = await sharp(file).metadata();
      const extension = path.extname(name);
      const widths = WIDTHS.filter((size) => size < width);
      for (const size of widths) {
        const copy = file.replace(/(\.\w+)$/, `-${size}w$1`);
        await encode(sharp(file).resize({ width: size }), extension).toFile(copy);
      }
      manifest[`${folder}/${name}`] = [...widths, width];
    }
  }
  fs.writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
