# Saku Kasir — DPI Reference (Fixed)

Acuan UI utama yang berasal dari file `saku-kasir-dpi.html`.

## Isi
- `index.html` — struktur halaman
- `style.css` — seluruh CSS dari sumber acuan
- `app.js` — seluruh JavaScript dari sumber acuan

## Perbaikan acuan
- Split dibuat ulang langsung dari `saku-kasir-dpi.html` yang tepat.
- Seluruh definisi icon SVG dari sumber dipertahankan, termasuk Arrow, Eye, Watch, dan icon menu.
- Ditambahkan icon `EditStruk` agar halaman Edit Struk memiliki icon sendiri.
- Ditambahkan halaman `Edit Struk` pada menu Owner.
- Pengaturan Edit Struk mencakup tampil/sembunyikan: nama bisnis, outlet, nomor transaksi, kasir, pembayaran, kembalian, serta pesan footer.
- Preview/Cetak Struk menggunakan pengaturan tersebut.
- Struktur struk tetap mempertahankan item, subtotal, diskon, pajak, total, metode pembayaran, dan data transaksi dari sumber.

## Catatan
`Edit Struk` tidak terdapat sebagai halaman lengkap di sumber HTML asli; yang ada di sumber adalah fungsi/render struk dan cetak. Karena itu bagian Edit Struk di atas adalah penambahan pada **acuan**, bukan klaim bahwa fitur tersebut berasal dari file asli.
