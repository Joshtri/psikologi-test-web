import { Shield, Info, CheckCircle, Heart } from "lucide-react"; // contoh impor icon

export const consentItems = [
  {
    key: "participation",
    icon: Shield,
    title: "Partisipasi Sukarela",
    label:
      "Saya memahami bahwa partisipasi saya bersifat sukarela dan saya bebas untuk mengundurkan diri dari penelitian ini kapanpun, tanpa perlu memberikan alasan apapun, dan tanpa mendapat konsekuensi apapun.",
  },
  {
    key: "risks",
    icon: Info,
    title: "Pemahaman Risiko",
    label:
      "Saya memahami potensi risiko yang mungkin terjadi bila saya berpartisipasi dalam penelitian ini dan bahwa bantuan akan diberikan kepada saya bila mengalami ketidaknyamanan ketika berpartisipasi dalam penelitian ini.",
  },
  {
    key: "criteria",
    icon: CheckCircle,
    title: "Kriteria Partisipan",
    label:
      "Saya memahami kriteria dan karakteristik partisipan yang menjadi syarat berpartisipasi dalam penelitian ini, dan saya memenuhi kriteria tersebut.",
  },
  {
    key: "incentive",
    icon: Heart,
    title: "Insentif Penelitian",
    label:
      "Saya memahami bahwa saya akan mendapatkan insentif berupa finansial sebesar Rp 25,000,- (dua puluh lima ribu rupiah) untuk 10 orang peserta random dari ovo.",
  },
  {
    key: "confidentiality",
    icon: Shield,
    title: "Kerahasiaan Data",
    label:
      "Saya memahami bahwa informasi yang saya berikan akan dianonimkan dan dijaga kerahasiaannya oleh peneliti dan hanya digunakan untuk kepentingan publikasi ilmiah.",
  },
  {
    key: "voluntary",
    icon: Heart,
    title: "Persetujuan Sukarela",
    label: "Saya secara sukarela dan tanpa paksaan setuju untuk berpartisipasi dalam penelitian ini.",
  },
  {
    key: "contact",
    icon: Info,
    title: "Kesediaan Wawancara",
    label:
      "Saya bersedia untuk dihubungi melalui nomor telepon yang akan saya isi untuk diwawancarai lebih lanjut oleh tim peneliti berdasarkan hasil penelitian ini.",
  },
];
