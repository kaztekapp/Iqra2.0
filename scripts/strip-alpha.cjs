// Rewrite a PNG without its alpha channel (Play's feature graphic and icon
// must be opaque). Usage: node scripts/strip-alpha.cjs file.png [...]
const fs = require('fs');
const { PNG } = require('pngjs');
for (const file of process.argv.slice(2)) {
  const png = PNG.sync.read(fs.readFileSync(file));
  for (let i = 3; i < png.data.length; i += 4) png.data[i] = 255;
  fs.writeFileSync(file, PNG.sync.write(png, { colorType: 2 }));
  console.log(`${file}: ${png.width}x${png.height}, alpha removed`);
}
