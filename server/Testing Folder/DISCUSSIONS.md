# Test Discussion Threads

Below are 10 sample discussion threads for testing the create discussion endpoint. Each object contains `eventId`, `title`, and `content`.

```json
[
  {
    "eventId": 1,
    "title": "Informasi Parkir untuk Java Jazz Festival",
    "content": "Halo semua, ada yang tau area parkir terdekat untuk Java Jazz Festival? Saya dengar parkiran utama sudah full booking. Ada rekomendasi alternatif?"
  },
  {
    "eventId": 2,
    "title": "Mencari Teman untuk Djakarta Warehouse Project",
    "content": "Saya berencana datang sendiri ke DWP tahun ini. Ada yang mau join? Bisa sharing transport dan akomodasi bareng."
  },
  {
    "eventId": 3,
    "title": "Review Sound System We The Fest",
    "content": "Untuk yang sudah pernah datang ke We The Fest tahun lalu, bagaimana kualitas sound systemnya? Worth it untuk beli tiket VVIP?"
  },
  {
    "eventId": 1,
    "title": "Rekomendasi Hotel dekat Java Jazz",
    "content": "Guys, ada saran hotel yang dekat dengan venue Java Jazz? Budget sekitar 1jt/malam untuk 2 orang. Thanks before!"
  },
  {
    "eventId": 4,
    "title": "Food Festival Bekasi - Harga Tenant",
    "content": "Ada yang tau kisaran harga sewa tenant untuk Food Festival Bekasi bulan depan? Tertarik untuk buka booth makanan disana."
  },
  {
    "eventId": 5,
    "title": "Synchronize Fest Line Up Discussion",
    "content": "Baru lihat line up Synchronize Fest tahun ini. Menurut kalian band mana yang paling worth untuk ditunggu?"
  },
  {
    "eventId": 2,
    "title": "DWP Dress Code Questions",
    "content": "First timer di DWP nih. Ada ketentuan khusus soal dress code atau anything goes? Also, sepatu yang recommended apa ya?"
  },
  {
    "eventId": 6,
    "title": "Pekan Raya Jakarta Transportation Tips",
    "content": "Mau ke PRJ minggu depan. Ada yang punya tips soal transportasi? Lebih baik naik MRT atau motor sendiri ya?"
  },
  {
    "eventId": 7,
    "title": "Indonesia Comic Con Cosplay Rules",
    "content": "Rencana mau cosplay di ICC. Ada yang tau peraturan detail soal props dan weapons? Especially untuk yang bawa senjata replika."
  },
  {
    "eventId": 8,
    "title": "Soundrenaline Meet Up Thread",
    "content": "Planning meet up untuk yang datang ke Soundrenaline dari Jakarta. Ada yang interested? Bisa sharing transport atau meet up di venue."
  }
]
```

## How to Use

1. Copy any of the JSON objects above
2. Send as POST request to `/discussions` endpoint
3. Make sure to include valid JWT token in Authorization header
4. The `eventId` should match existing events in your database

Example curl command:
```bash
curl -X POST http://localhost:3000/discussions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": 1,
    "title": "Informasi Parkir untuk Java Jazz Festival",
    "content": "Halo semua, ada yang tau area parkir terdekat untuk Java Jazz Festival? Saya dengar parkiran utama sudah full booking. Ada rekomendasi alternatif?"
  }'
```
