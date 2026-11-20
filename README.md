# Literasi Bahasa Indonesia — SMA Plus Merdeka Soreang

Latihan bertahap Bahasa Indonesia untuk persiapan **TKA** dan **UTBK/SNBT**, kelas X–XII.
Mesinnya salinan Matematika Dasar (Matdas): tingkat dan level bertahap, sesi kelas oleh guru per **rombel**,
latihan mandiri, peringkat, rekap perkembangan, dan bank soal berwacana (satu bacaan untuk 3–4 soal).

> **Status (20 Nov 2026): sedang dibangun.** Database sudah terpasang; halaman masih disesuaikan dari Matdas
> dan bank soal belum diisi. Rencana lengkap: `RENCANA_LITERASI_INDONESIA.md` di folder induk sistem sekolah.

## Halaman

| Berkas | Untuk |
|---|---|
| `index.html` | Siswa: masuk dengan NISN, sesi kelas atau latihan mandiri |
| `guru.html` | Guru Bahasa Indonesia: buka sesi rombel, profil dan tahapan, rekap perkembangan, peringkat |
| `arsip.html` | Membuka berkas arsip semester |

## Database

Fungsi dan tabel berawalan `lit_` di project Supabase yang sama dengan Matdas, English Reading, dan Asesmen Merdeka
(`database_tryout/supabase/migrations/20261120100000_literasi_indonesia_mesin_dasar.sql`, dibuat oleh
`database_tryout/alat/salin_matdas_literasi.js`). Kontrak fungsi: `database_tryout/kontrak/literasi_indonesia.sql`.

- Pengelompokan per rombel: kolom `kelompok` di tabel `lit_` berisi nama rombel.
- Guru dan PIN pribadi memakai daftar bersama (`mtd_guru`); PIN diatur di admin Matdas/Asesmen Merdeka.
- Rombel dan jadwal Bahasa Indonesia tiap guru ditarik dari Data Induk (`guru_ekspor`: `lit_kelas`, `lit_jadwal`).

## Susunan tingkat

Bagian A — Persiapan TKA: (1) informasi tersurat, (2) gagasan utama dan simpulan, (3) makna kata dan ungkapan,
(4) informasi tersirat, (5) teks sastra: unsur intrinsik, (6) teks sastra: makna dan nilai, (7) teks dengan tabel/grafik,
(8) mengevaluasi teks, (9) membandingkan dua teks, (10) format TKA.

Bagian B — Persiapan UTBK: (11) ejaan dan tanda baca, (12) kata baku dan bentukan kata, (13) kalimat efektif,
(14) kohesi dan koherensi, (15) kosakata dan analogi kata, (16) menilai argumen, (17) penalaran dari bacaan, (18) format UTBK.

Setiap tingkat 5 level; 80–100 soal per level. Banyak soal yang dikerjakan siswa per level diatur guru lewat Profil.
