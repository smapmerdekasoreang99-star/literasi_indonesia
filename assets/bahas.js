/* Literasi Bahasa Indonesia — tampilan pembahasan (disalin dari Matdas, 20 Nov 2026).
   Pembahasan Literasi berasal dari bank soal (kolom pembahasan), jadi bahasSoal() yang menyusun langkah hitung
   di peramban selalu null. bahasTeks() memecah pembahasan tertulis menjadi langkah pendek, bahasHtml() menampilkannya.
   Butuh umum.js (esc). */
"use strict";

function bahasSoal() { return null; }

/* HTML pembahasan: daftar langkah. */
function bahasHtml(b) {
  if (!b) return "";
  let no = 0;
  const akhir = b.langkah.length - 1;
  const li = b.langkah.map((x, i) => {
    // Baris penutup "Jadi …" tampil sebagai kotak kesimpulan, tanpa nomor
    if (i === akhir && /^Jadi /.test(x.h)) return `<li class="bh-jadi"><span class="bh-cek" aria-hidden="true">✓</span><span class="bh-isi">${x.h}</span></li>`;
    if (x.anak) return `<li class="bh-anak${x.p ? " bh-sorot" : ""}"><span class="bh-isi">${x.h}${x.p ? ' <span class="bh-tanda">← perhatikan</span>' : ""}</span></li>`;
    no++;
    return `<li${x.p ? ' class="bh-sorot"' : ""}><span class="bh-no">${no}</span><span class="bh-isi">${x.h}${x.p ? ' <span class="bh-tanda">← perhatikan</span>' : ""}</span></li>`;
  }).join("");
  return `<div class="bahas">${b.susun ? `<div class="bh-susun">${b.susun}</div>` : ""}<ol class="bh-langkah">${li}</ol></div>`;
}

/* Pembahasan tertulis dari naskah (soal bank) → langkah pendek. */
function bahasTeks(teks) {
  const langkah = [];
  String(teks || "").split("\n").forEach((baris) => {
    if (/^•/.test(baris)) return langkah.push({ h: esc(baris), anak: true });
    baris.split(/(?<=[.:])\s+(?=[A-Z(])/).forEach((k) => { if (k.trim()) langkah.push({ h: esc(k.trim()) }); });
  });
  return { langkah, susun: "" };
}
