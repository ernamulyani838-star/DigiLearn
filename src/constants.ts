import { lesson1Content } from './data/lesson1-1';

export interface Module {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  content?: string;
}

export const COURSE_CONTENT: Module[] = [
  {
    id: 'mod-1',
    title: 'Mindset & Transformasi Digital Pimpinan Lembaga',
    description: 'Urgensi digitalisasi: mengapa pemilik yayasan dan pimpinan wajib memimpin transisi sistem operasional dan promosi sekolah.',
    topics: [
      { id: '1-1', title: 'Urgensi Disrupsi Digital di Industri Pendidikan', level: 'Beginner', duration: '20m', content: lesson1Content },
      { id: '1-2', title: 'Kenapa Pola Promosi Konvensional Mulai Ditinggalkan', level: 'Beginner', duration: '25m' },
      { id: '1-3', title: 'Pergeseran Perilaku (Behavior) Siswa & Orang Tua', level: 'Intermediate', duration: '30m' },
      { id: '1-4', title: 'Pemetaan Kesenjangan Digital (Digital Divide) Yayasan', level: 'Advanced', duration: '40m' },
      { id: '1-5', title: 'Menghitung ROI Digitalisasi vs Biaya Tradisional', level: 'Intermediate', duration: '35m' },
      { id: '1-6', title: 'Menyusun Visi & Blueprint Digitalisasi Yayasan 5 Tahun', level: 'Advanced', duration: '45m' },
      { id: '1-7', title: 'Membentuk Tim "Digital Task Force" Internal Sekolah', level: 'Intermediate', duration: '30m' },
      { id: '1-8', title: 'Mengatasi Resistensi Perubahan dari Ekosistem Guru Senior', level: 'Advanced', duration: '40m' },
      { id: '1-9', title: 'Penyesuaian Anggaran Yayasan untuk Investasi Teknologi', level: 'Advanced', duration: '35m' },
      { id: '1-10', title: 'Studi Kasus: Sekolah Konvensional Sukses Terdisrupsi', level: 'Beginner', duration: '30m' },
    ]
  },
  {
    id: 'mod-2',
    title: 'Infrastruktur IT & Sistem Informasi Sekolah (SIS) Terpadu',
    description: 'Membangun tulang punggung teknologi sekolah yang saling terhubung antara fungsi akademik, keuangan, dan komunikasi.',
    topics: [
      { id: '2-1', title: 'Anatomi Sistem Informasi Sekolah (SIS) yang Ideal', level: 'Beginner', duration: '30m' },
      { id: '2-2', title: 'Sentralisasi Data: Akademik, Keuangan, & Kepegawaian', level: 'Intermediate', duration: '35m' },
      { id: '2-3', title: 'Modul Akademik: Raport Digital, e-Learning, & Manajemen', level: 'Intermediate', duration: '30m' },
      { id: '2-4', title: 'Modul Keuangan: Digitalisasi Penagihan SPP', level: 'Advanced', duration: '45m' },
      { id: '2-5', title: 'Server Sendiri (On-Premise) vs Cloud Computing (SaaS)', level: 'Advanced', duration: '40m' },
      { id: '2-6', title: 'Manajemen Hak Akses (Role-Based) Admin, Guru, & Siswa', level: 'Intermediate', duration: '30m' },
      { id: '2-7', title: 'Keamanan Database & Mitigasi Kebocoran Data Privasi', level: 'Advanced', duration: '45m' },
      { id: '2-8', title: 'Backup, Pemulihan Bencana, & Kontinuitas Sistem', level: 'Advanced', duration: '40m' },
      { id: '2-9', title: 'Standarisasi Perangkat Keras IT Yayasan Terpadu', level: 'Intermediate', duration: '35m' },
      { id: '2-10', title: 'Kebijakan Wi-Fi, Internet Sehat, & Manajemen Bandwidth', level: 'Intermediate', duration: '30m' },
    ]
  },
  {
    id: 'mod-3',
    title: 'Branding & Positioning Yayasan Pendidikan di Era Digital',
    description: 'Strategi pencitraan positif untuk menonjol di antara para kompetitor dan memenangkan kepercayaan masyarakat luas.',
    topics: [
      { id: '3-1', title: 'Membedah DNA Sekolah: Menemukan Unique Value Proposition', level: 'Beginner', duration: '25m' },
      { id: '3-2', title: 'Re-branding: Meremajakan Logo & Identitas Visual', level: 'Advanced', duration: '45m' },
      { id: '3-3', title: 'Niche Positioning: Menguasai Satu Segmen (Misal: IT/Islam)', level: 'Intermediate', duration: '30m' },
      { id: '3-4', title: 'Menyelaraskan Visi Yayasan dengan Pesan Pemasaran', level: 'Intermediate', duration: '35m' },
      { id: '3-5', title: 'Storytelling Institusi: Menjual Nilai Luhur Yayasan', level: 'Advanced', duration: '40m' },
      { id: '3-6', title: 'Membangun "Brand Voice" di Publik & Media Sosial', level: 'Intermediate', duration: '30m' },
      { id: '3-7', title: 'Audit Aset Digital Sekolah: Web & Jejak Digital', level: 'Intermediate', duration: '35m' },
      { id: '3-8', title: 'Kekuatan Testimoni Alumni Sebagai Bukti Sosial', level: 'Beginner', duration: '25m' },
      { id: '3-9', title: 'Strategi Membangun Kepercayaan di Mata Orang Tua Murid', level: 'Advanced', duration: '40m' },
      { id: '3-10', title: 'Merancang Buku Panduan Identitas Visual & Komunikasi', level: 'Advanced', duration: '45m' },
    ]
  },
  {
    id: 'mod-4',
    title: 'Optimalisasi Website & SEO Khusus Portal Pendidikan',
    description: 'Mengubah website sekolah dari sekadar etalase pasif menjadi mesin konversi pendaftar siswa baru tingkat tinggi.',
    topics: [
      { id: '4-1', title: 'Esensi Website Sekolah Sebagai "Kampus Virtual"', level: 'Beginner', duration: '30m' },
      { id: '4-2', title: 'Anatomi Halaman Beranda Web Sekolah yang Mengonversi', level: 'Intermediate', duration: '35m' },
      { id: '4-3', title: 'UX & Mobile-Friendly Optimization pada Situs Sekolah', level: 'Advanced', duration: '40m' },
      { id: '4-4', title: 'Dampak Kecepatan Website (Page Speed) pada Pendaftar', level: 'Intermediate', duration: '30m' },
      { id: '4-5', title: 'Dasar SEO Edukasi: Algoritma Pencarian Google', level: 'Advanced', duration: '40m' },
      { id: '4-6', title: 'Riset Keyword: Jurusan, Biaya, Beasiswa, & Fasilitas', level: 'Intermediate', duration: '35m' },
      { id: '4-7', title: 'On-Page SEO: Optimasi Meta Tag, Heading, URL', level: 'Advanced', duration: '45m' },
      { id: '4-8', title: 'Local SEO & Google Business Profile untuk Sekolah', level: 'Intermediate', duration: '30m' },
      { id: '4-9', title: 'Strategi Content Marketing via Blog Artikel Sekolah', level: 'Intermediate', duration: '35m' },
      { id: '4-10', title: 'Link Building Institusi (.sch.id / .ac.id)', level: 'Advanced', duration: '40m' },
    ]
  },
  {
    id: 'mod-5',
    title: 'Sosial Media Marketing & Content Strategy untuk Sekolah',
    description: 'Manajemen interaksi sosial untuk merawat generasi Alpha dan Z beserta orang tua mereka secara konsisten.',
    topics: [
      { id: '5-1', title: 'Pemetaan Kanal: Instagram, FB, TikTok, LinkedIn, YouTube', level: 'Intermediate', duration: '30m' },
      { id: '5-2', title: 'Memahami Algoritma Sosmed & Karakteristik Audiens Edukasi', level: 'Intermediate', duration: '35m' },
      { id: '5-3', title: 'Instagram & Facebook: Menargetkan Pengambil Keputusan', level: 'Advanced', duration: '40m' },
      { id: '5-4', title: 'TikTok Marketing: Bahasa Komunikasi Generasi Z & Alpha', level: 'Intermediate', duration: '30m' },
      { id: '5-5', title: 'Menyusun Kalender Konten Berbasis Event Akademik', level: 'Advanced', duration: '35m' },
      { id: '5-6', title: 'Pilar Konten: Prestasi, Fasilitas, & Kegiatian Ekstrakurikuler', level: 'Beginner', duration: '25m' },
      { id: '5-7', title: 'Pemanfaatan Video Pendek untuk "Digital Campus Tour"', level: 'Intermediate', duration: '35m' },
      { id: '5-8', title: 'Manajemen Talent Internal dalam Produksi Konten', level: 'Intermediate', duration: '30m' },
      { id: '5-9', title: 'SOP Privasi Siswa di Sosmed & Aturan Eksploitasi Anak', level: 'Advanced', duration: '40m' },
      { id: '5-10', title: 'Engagement Management: Kolom Komentar & Direct Message', level: 'Intermediate', duration: '30m' },
    ]
  },
  {
    id: 'mod-6',
    title: 'Jurnalisme Sekolah, Digital PR & Manajemen Reputasi Online',
    description: 'Melindungi kepemimpinan yayasan melalui humas digital, kemitraan media, & protokol krisis terpercaya.',
    topics: [
      { id: '6-1', title: 'Mewadahi Ekstrakurikuler Jurnalistik ke Jurnalisme Digital', level: 'Intermediate', duration: '30m' },
      { id: '6-2', title: 'Peran Digital Public Relations (PR) bagi Yayasan', level: 'Advanced', duration: '40m' },
      { id: '6-3', title: 'Menulis Press Release Prestasi yang Diminati Media Massa', level: 'Advanced', duration: '45m' },
      { id: '6-4', title: 'Media Relations Lokal: Hubungan dengan Awak Berita', level: 'Advanced', duration: '35m' },
      { id: '6-5', title: 'Kemitraan Jaringan Digital dengan Institusi Publik Lain', level: 'Advanced', duration: '40m' },
      { id: '6-6', title: 'Podcast Edukasi Internal untuk Branding Kepemimpinan Sekolah', level: 'Intermediate', duration: '35m' },
      { id: '6-7', title: 'Manajemen Reputasi Online: Mengatasi Ulasan Negatif', level: 'Advanced', duration: '45m' },
      { id: '6-8', title: 'Protokol Manajemen Krisis: Strategi Isu Sensitif/Bullying', level: 'Advanced', duration: '50m' },
      { id: '6-9', title: 'Event Digital Humas: Webinar Nasional & Edu fair Online', level: 'Intermediate', duration: '40m' },
      { id: '6-10', title: 'Influencer & Key Opinion Leader (KOL) Sektor Pendidikan Lokal', level: 'Advanced', duration: '35m' },
    ]
  },
  {
    id: 'mod-7',
    title: 'Strategi Penerimaan Peserta Didik Baru (PPDB) Full Digital',
    description: 'Pendeteksian masalah sistem penerimaan lama menuju otomatisasi penutupan kuota dari pendaftaran sampai orientasi siswa.',
    topics: [
      { id: '7-1', title: 'Transformasi PMB/PPDB dari Manual Kertas ke Digital', level: 'Beginner', duration: '25m' },
      { id: '7-2', title: 'Arsitektur Funnel Penerimaan Siswa Baru Multi-Tahap', level: 'Advanced', duration: '45m' },
      { id: '7-3', title: 'Landing Page PPDB: Perangkap Konversi Terbaik & Formulir', level: 'Intermediate', duration: '35m' },
      { id: '7-4', title: 'Penetapan Harga Early Bird & Gelombang (Batch) Pendaftaran', level: 'Intermediate', duration: '30m' },
      { id: '7-5', title: 'Digitalisasi Ujian Masuk: Psikotes & Wawancara Online', level: 'Advanced', duration: '40m' },
      { id: '7-6', title: 'Follow-up Pendaftar Pasif dengan Etika Profesional Humas', level: 'Intermediate', duration: '35m' },
      { id: '7-7', title: 'Penggunaan Chatbot AI & WA Autoresponder Khusus FAQ PPDB', level: 'Advanced', duration: '45m' },
      { id: '7-8', title: 'Dashboard Real-time (Tracking) Konversi Tiap Tahap', level: 'Advanced', duration: '40m' },
      { id: '7-9', title: 'Integrasi Database Web PPDB ke Sistem Buku Induk SIAKAD', level: 'Advanced', duration: '50m' },
      { id: '7-10', title: 'Post-Mortem: Evaluasi Kebocoran Calon Siswa Batal Daftar', level: 'Advanced', duration: '40m' },
    ]
  },
  {
    id: 'mod-8',
    title: 'Digital Advertising (Meta & Google Ads) Untuk Lembaga Pendidikan',
    description: 'Keputusan bisnis realokasi budget: Berinvestasi di Google dan Meta Ads demi mengisi kursi kelas secara terukur.',
    topics: [
      { id: '8-1', title: 'Kapankah Sekolah Memerlukan Iklan Digital Berbayar?', level: 'Intermediate', duration: '30m' },
      { id: '8-2', title: 'Alokasi Budget Iklan Digital Tahunan yang Cerdas', level: 'Advanced', duration: '40m' },
      { id: '8-3', title: 'Konsep Meta Ads Kampanye Awareness & Pancingan Leads', level: 'Advanced', duration: '45m' },
      { id: '8-4', title: 'Geo-Targeting (Catchment Area) Lokasi Area Sekolah via FB/IG', level: 'Intermediate', duration: '35m' },
      { id: '8-5', title: 'Google Search Ads (SEM) untuk Jurusan Paling Ramai Dicari', level: 'Advanced', duration: '40m' },
      { id: '8-6', title: 'Retargeting: Membidik Orang Tua yang Ragu Keluar Web Sekolah', level: 'Advanced', duration: '45m' },
      { id: '8-7', title: 'YouTube Ads Placement Sponsorship untuk Branding Tinggi', level: 'Intermediate', duration: '35m' },
      { id: '8-8', title: 'Membuat Ad Creatives & Copywriting Iklan Sekolah', level: 'Advanced', duration: '40m' },
      { id: '8-9', title: 'Optimalisasi Quality Score & Clicks pada Kampanye Aktif', level: 'Advanced', duration: '30m' },
      { id: '8-10', title: 'Analisis Cost per Acquisition (Biaya per Pendaftaran Sah)', level: 'Advanced', duration: '45m' },
    ]
  },
  {
    id: 'mod-9',
    title: 'CRM, Retensi Wali Murid & Otomatisasi Pelayanan',
    description: 'Membangun layanan istimewa untuk Wali Murid agar senantiasa menjadi promotor utama sekolah tanpa dibayar.',
    topics: [
      { id: '9-1', title: 'Edukasi Customer Relationship Management Dasar Sekolah', level: 'Beginner', duration: '25m' },
      { id: '9-2', title: 'Layanan Eksekutif Pra-Masuk & Pendampingan Pasca-Daftar', level: 'Intermediate', duration: '30m' },
      { id: '9-3', title: 'Email Marketing Tersegmen Berkala Wali Murid', level: 'Intermediate', duration: '35m' },
      { id: '9-4', title: 'Blast WA API Resmin: Pengiriman Edukasi & Reminder SOP', level: 'Advanced', duration: '40m' },
      { id: '9-5', title: 'Portal Aplikasi Android/iOS Pantauan Akademik Siswa', level: 'Advanced', duration: '45m' },
      { id: '9-6', title: 'Sistem Helpdesk Digital (Digital Ticketing System) Sekolah', level: 'Advanced', duration: '35m' },
      { id: '9-7', title: 'Mengukur Indeks Kepuasan Orang Tua via Survei NPS Skala Digital', level: 'Intermediate', duration: '30m' },
      { id: '9-8', title: 'Mitigasi Angka Putus Sekolah (Drop-out) dengan Prediksi Performa', level: 'Advanced', duration: '45m' },
      { id: '9-9', title: 'Pemberdayaan Platform Komunitas Alumni yang Integratif', level: 'Intermediate', duration: '35m' },
      { id: '9-10', title: 'Afiliasi Edukasi: Skema Reward Wali Murid Bawa Siswa Baru', level: 'Advanced', duration: '40m' },
    ]
  },
  {
    id: 'mod-10',
    title: 'Data Analytics, Audit Keamanan, & Skalasi Edutech Yayasan',
    description: 'Transisi paripurna menuju manajemen modern. Menganalisa statistik untuk kebijakan investasi jangka panjang.',
    topics: [
      { id: '10-1', title: 'Budaya Data-Driven: Keputusan Yayasan Berbasis Statistik', level: 'Intermediate', duration: '35m' },
      { id: '10-2', title: 'Implementasi Google Analytics 4 Inti untuk Web PPDB', level: 'Advanced', duration: '45m' },
      { id: '10-3', title: 'Analisis Kohort Pendaftar: Tren Kelulusan vs Masuk Tahunan', level: 'Advanced', duration: '40m' },
      { id: '10-4', title: 'Dashboard Eksekutif C-Level (Looker Studio) Bagi Pimpinan', level: 'Advanced', duration: '50m' },
      { id: '10-5', title: 'Forecasting Kapasitas Pengajar vs Prediksi Tren Pendaftar AI', level: 'Advanced', duration: '45m' },
      { id: '10-6', title: 'Audit Keamanan Siber Pendidikan: Kerentanan Server Sekolah', level: 'Advanced', duration: '40m' },
      { id: '10-7', title: 'Kebijakan Hukum UU Pelindungan Data Pribadi (PDP) PDDikti', level: 'Advanced', duration: '35m' },
      { id: '10-8', title: 'Kemitraan Skala Raksasa: Google for Education & Microsoft Terpadu', level: 'Advanced', duration: '40m' },
      { id: '10-9', title: 'Eksplorasi Skala Lanjut: Kelas Hybrid & Gamifikasi Modul', level: 'Advanced', duration: '45m' },
      { id: '10-10', title: 'Capstone: Restrukturisasi Visi, SOP Tim IT, & Regulasi Era Digital', level: 'Advanced', duration: '60m' },
    ]
  },
];
