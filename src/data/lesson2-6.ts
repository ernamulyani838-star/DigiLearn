export const lesson2_6Content = `
# Manajemen Hak Akses (Role-Based) Admin, Guru, & Siswa

## Kunci Gerbang: Siapa yang Boleh Melihat Apa?

Beralih ke sistem SIS (Sistem Informasi Sekolah) yang tersentralisasi memunculkan kekhawatiran baru yang paling ditakutkan oleh pihak pimpinan: *"Apabila semuanya dirangkum menjadi satu pintu database, apakah ada resiko guru olahraga secara nakal (atau tidak sengaja) menghapus lajur pelunasan SPP orang wali, atau lebih fatal, siswa siswi ahli meretas web mengubah secara magis catatan nilai rapot abang kelasnya sorangan?"*

Kengerian di atas menjadi nyata manakala yayasan pendidikan sembrono memesan piranti portal digital yang miskin dan tak dilandaskan pada struktur **RBAC (Role-Based Access Control) / Tata Kelola Kontrol Akses berbasis Pangkat Kewenangan**. Dalam setiap rumah jagat komputasi piranti *Enterprise/System* pendidikan (SIS), tembok tata partisi tingkat kewenangan yang solid mutlak ditanam dan diamini. Setiap kasta warga sipil sekolah akan disumpah masuk dibatasi oleh pagar gembok akses pandangannya sedemikian sangat absolut.

## Hierarki (Kasta) Tatanan Wewenang Akses dalam Ekosistem Portal

### 1. The Super-Admin (Puncak Menara Penguasa Otoritas Absolut)
Peringkat paling suci dewata ini umumnya dikuasakan hanya pada posisi direktur tertinggi, atau Kepala Pusat Teknologi Informatika (Chief-IT Task Force). 
*   **Wewenang Visual Mutlak**: Super-Admin sanggup menembus semua pintu ruangan virtual apa pun se-antero yayasan. Mulai laporan arus kas transfer SPP masuk harian di meja Bendahara, surat kepatuhan potongan pajak para karyawan HRD, hingga *log-history* kapan seorang murid bernama A di jam terakhir mengakses file unduhan video tugas presentasi Biologi.
*   **Gerbang Kunci**: Super-Admin memiliki kuasa pembunuh mem-*(block)* hapus akses (Banned) maupun mengangkat melaunching kunci sandi baru *(Reset Passwords)* puluhan guru staf dalam satu kali klik. 

### 2. Administrator Departemental / Staff Fungsional Utama
Lapis komando kedua berada di pundak staf khusus yang posisinya sebagai "operator pintu". Pangkat wewenangnya terkotak dalam kacamata ranah jurusannya (Segregation of Duties).
*   **Staf Bendahara Keuangan**: Pangkat akun Bapak Admin Keuangan ini dikunci mutlak hanya boleh membongkar selipan daftar nominal iuran piutang cicilan Gedung/SPP komite para ortu. Jari kursor mereka ditolak dan dilarang keras dapat masuk mengedit status kolom Nilai Ulangan ujian remedial anak IPA murid sekolah. (Status mereka cuma dibolehkan sekadar Read-Only untuk biodata kelas siswa, tapi *Super-Editor* hanya soal Duit Keuangan pendaftaran).

### 3. Fasilitator Pendidik Berdaulat / The Teacher Role (User-Level Guru)
Hierarki prajurit operasional, tulang punggung input portal rapot data lapangan. 
*   **Wewenang Penguncian Ranting Kelas (Silo Wali Kelas)**: Seorang Guru Kewarganegaraan Kelas VII-A dikasih akses wewenang *Full-Write/Edit* (bebas ketik/merubah/menghapus) secara otonom peruntukannya mutlak menarget siswa yang terdaftar khusus pada rombongan asuhannya semata (Kelas VII-A). Akun Guru ini terblokir gelap tak bisa melongok atau memata-matai apalagi membongkar hasil nilai anak bimbingan guru di kelas kawan senasibnya (Kelas VII-B), agar kerahasiaan kepatuhan perwalian moral guru berdaulat terawat tak campur tangan.

### 4. Pangkat Konsumen Pasif - Student & Parent Role (Kasta Baca & Interaksi)
Posisi hierarki terakhir berada di tangan para orang tua wali atau para murid siswanya sendiri sendiri:
*   Mata visual kacamata portal yang nampak di layar tablet orang tua/murid akan amat sempit dipangkas sangat khusus terdesain: Mereka tak menatap rumitnya kode kolom Excel kalkulator standar deviasi guru.
*   **Wewenang Pembatasan (View, Pay & Submit-Only)**: Anak Siswa cuma dapat tombol untuk (1) Meng-klik Unduh Soal Ujian (2) Mengunggah foto Berkas file (Upload Tugas) (3) Merubah ubah Password / Avatar foto profil akun miliknya nya sorangan. Tombol merubah Status Absen atau Status Uang SPP akan dimatikan (Disabled), diganti menjadi Tombol 'Gateway Payment Bank Link'.

## Mencegah Tragedi Pembajakan / Akses Ilegal Kata Sandi Pihak Dalam (Insider Threat)
Guna menetralisir kebencian sabotase (ancaman amuk) internal, misal ada amarah konflik internal dari salah seoarang teknisi admin pegawai sekolah honor yang kebetulan tau sandi log Super-Admin pimpinan di sebuah PC lalu menghapus paksa seluruh aset PDF ribuan file pendaftaran sekolah dan merusak sekolah pasca dirinya dipecat keluar, maka yayasan modern diwanti-wanti wajib mematikan skenario dengan menyematkan tameng pertahanan audit jejak jari digital canggih: Fitur **"User Activity Logging Tracker" (Reperkam histori jejak kaki)".**

Di dalam SIS mutakhir yang terstruktur ganda, jika ada pegawai yang iseng menghapus baris rekap nilai, maka server SIS di detik tersebut juga menyimpan histori cetak jejak digital log tulisan mesin berbunyi keras: *"Akun Admin_Keuangan_Rahman pada IP-Address:119.xxx pada Hari Jumat 14:02 WIB telah mencoba Menghapus Tabel Tagihan atas nama Siswa Budi"*.

Berbekal perisai peran ketat hierarki batas pangkat ini pula, yayasan telah resmi mensterilkan kemerdekaan transparansi keteraturan sistem portal birokasi agar berjalan tenang di perlintasan jalur kodrat wewenang rel aman masing-masing semesta divisinya tiada pertengkaran silang sengketa dan intervensi kejahiliyahaan manual kuno masa lalunya kelak.
`;
