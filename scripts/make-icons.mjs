import sharp from "sharp";
import { mkdirSync } from "node:fs";
const svg = (pad, rx, font) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="${rx}" fill="#0b0b11"/><rect x="${pad}" y="${pad}" width="${64 - 2 * pad}" height="${64 - 2 * pad}" rx="${Math.max(rx - 3, 6)}" fill="none" stroke="#ffaa55" stroke-width="2"/><text x="32" y="${(32 + font * 0.34).toFixed(1)}" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-weight="700" font-size="${font}" fill="#ffaa55">MF</text></svg>`;
const any = svg(3, 14, 23);
const mask = svg(12, 0, 17);
mkdirSync("public", { recursive: true });
const out = [
  ["icon-192.png", any, 192],
  ["icon-512.png", any, 512],
  ["icon-maskable-512.png", mask, 512],
  ["apple-touch-icon.png", mask, 180],
];
for (const [name, s, size] of out) {
  await sharp(Buffer.from(s)).resize(size, size).png().toFile(`public/${name}`);
}
