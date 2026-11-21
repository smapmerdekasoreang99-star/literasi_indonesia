// Ikon Literasi Bahasa Indonesia: kotak merah tua bergradasi, lembar teks putih bergaris, garis emas di bawah (gaya ikon Matdas/English Reading).
// Pakai (dari folder literasi_indonesia): node alat/buat_ikon.js assets
const fs = require("fs"), zlib = require("zlib"), path = require("path");
const out = process.argv[2];
function crc32(b) { let c, t = crc32.t || (crc32.t = Array.from({ length: 256 }, (_, n) => { c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; }));
  c = 0xffffffff; for (const x of b) c = t[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function chunk(type, data) { const l = Buffer.alloc(4); l.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const c = Buffer.alloc(4); c.writeUInt32BE(crc32(td)); return Buffer.concat([l, td, c]); }
function png(w, h, rgba) { const raw = Buffer.alloc((w * 4 + 1) * h); for (let y = 0; y < h; y++) { raw[y * (w * 4 + 1)] = 0; rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4); }
  const ih = Buffer.alloc(13); ih.writeUInt32BE(w, 0); ih.writeUInt32BE(h, 4); ih[8] = 8; ih[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ih), chunk("IDAT", zlib.deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]); }
// jarak bertanda ke kotak membulat (pusat cx,cy, setengah ukuran hx,hy, jari r)
const rr = (x, y, cx, cy, hx, hy, r) => { const qx = Math.abs(x - cx) - hx + r, qy = Math.abs(y - cy) - hy + r; return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r; };
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const ATAS = hex("#C2473F"), BAWAH = hex("#6E1C22"), PUTIH = [255, 255, 255], EMAS = hex("#E0B54A"), GARIS = hex("#A3363A");
function gambar(N, maskable) {
  const S = 4, buf = Buffer.alloc(N * N * 4);
  const sk = maskable ? 0.78 : 1, o = (1 - sk) / 2;
  for (let py = 0; py < N; py++) for (let px = 0; px < N; px++) {
    let acc = [0, 0, 0, 0];
    for (let sy = 0; sy < S; sy++) for (let sx = 0; sx < S; sx++) {
      const X = (px + (sx + .5) / S) / N, Y = (py + (sy + .5) / S) / N;
      let warna = null, a = 0;
      const bg = maskable ? -1 : rr(X, Y, .5, .5, .5, .5, .19);
      if (bg <= 0) { warna = mix(ATAS, BAWAH, Y); a = 1;
        const x = (X - o) / sk, y = (Y - o) / sk;
        // lembar teks
        if (rr(x, y, .5, .46, .2, .25, .045) <= 0) {
          warna = PUTIH;
          // judul tebal + baris-baris teks (baris terakhir pendek)
          if (rr(x, y, .44, .3, .1, .022, .022) <= 0) warna = GARIS;
          for (const [cy, hx, cx] of [[.4, .13, .5], [.47, .13, .5], [.54, .13, .5], [.61, .08, .45]])
            if (rr(x, y, cx, cy, hx, .013, .013) <= 0) warna = mix(GARIS, PUTIH, .25);
        }
        if (rr(x, y, .5, .82, .1, .014, .014) <= 0) warna = EMAS;
      }
      if (a) { acc[0] += warna[0]; acc[1] += warna[1]; acc[2] += warna[2]; acc[3] += 1; }
    }
    const n = S * S, i = (py * N + px) * 4;
    if (acc[3]) { buf[i] = Math.round(acc[0] / acc[3]); buf[i + 1] = Math.round(acc[1] / acc[3]); buf[i + 2] = Math.round(acc[2] / acc[3]); }
    buf[i + 3] = Math.round(255 * acc[3] / n);
  }
  return png(N, N, buf);
}
fs.mkdirSync(out, { recursive: true });
for (const [nama, N, m] of [["ikon-32.png", 32, 0], ["ikon-192.png", 192, 0], ["ikon-512.png", 512, 0], ["ikon-maskable-192.png", 192, 1], ["ikon-maskable-512.png", 512, 1], ["apple-touch-icon.png", 180, 1]])
  fs.writeFileSync(path.join(out, nama), gambar(N, m));
console.log("ok");
