import sharp from "sharp";
const [src, out] = process.argv.slice(2);
const { data, info } = await sharp(src).extract({ left: 140, top: 225, width: 380, height: 405 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
// Fondo blanco -> transparente (con bordes suaves)
for (let i = 0; i < data.length; i += 4) {
  const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
  const a = Math.min(255, Math.max(0, (255 - Math.min(r, g, b)) * 2.2));
  if (a < 255) {
    const k = a / 255 || 1;
    data[i] = Math.round(Math.min(255, (r - 255 * (1 - k)) / k));
    data[i + 1] = Math.round(Math.min(255, (g - 255 * (1 - k)) / k));
    data[i + 2] = Math.round(Math.min(255, (b - 255 * (1 - k)) / k));
  }
  data[i + 3] = a;
}
await sharp(data, { raw: info }).trim().png().toFile(out);
console.log(await sharp(out).metadata().then(m => `${m.width}x${m.height}`));
