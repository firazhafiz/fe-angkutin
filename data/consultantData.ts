export interface Consultant {
  image: string;
  name: string;
  category: {
    name: string;
    image: string;
  };
  description: string;
  email: string;
  phone: string;
}

export const consultantData: Consultant[][] = [
  [
    {
      image: "/images/consultant1.jpg",
      name: "Ahmad Yani",
      category: { name: "Analisis AMDAL", image: "/images/amdal.jpg" },
      description:
        "Ahmad Yani adalah seorang ahli di bidang Analisis Dampak Lingkungan dengan pengalaman lebih dari 10 tahun dalam mengevaluasi proyek industri dan infrastruktur. Latar belakang akademiknya yang kuat di bidang lingkungan dipadukan dengan keahlian praktis dalam analisis risiko lingkungan menjadikannya kompeten dalam menyusun laporan AMDAL yang akurat dan mendukung keberlanjutan.",
      email: "ahmad.yani@example.com",
      phone: "+628123456789",
    },
    {
      image: "/images/consultant2.jpg",
      name: "Budi Santoso",
      category: { name: "Analisis AMDAL", image: "/images/amdal.jpg" },
      description:
        "Budi Santoso adalah profesional berpengalaman di bidang Analisis AMDAL dengan fokus pada sektor industri berat. Selama lebih dari 12 tahun, ia telah mengembangkan metode evaluasi dampak lingkungan yang inovatif, memastikan kepatuhan terhadap regulasi lingkungan, dan memberikan solusi mitigasi yang efektif untuk proyek-proyek besar.",
      email: "budi.santoso@example.com",
      phone: "+628987654321",
    },
    {
      image: "/images/consultant3.jpg",
      name: "Citra Dewi",
      category: { name: "Analisis AMDAL", image: "/images/amdal.jpg" },
      description:
        "Citra Dewi adalah spesialis Analisis AMDAL dengan pengalaman lebih dari 8 tahun dalam studi lingkungan dan mitigasi dampak. Keahliannya mencakup analisis ekosistem dan perencanaan pencegahan polusi, menjadikannya ahli yang andal dalam mendukung proyek berkelanjutan dengan pendekatan berbasis data.",
      email: "citra.dewi@example.com",
      phone: "+628123456780",
    },
  ],
  [
    {
      image: "/images/consultant1.jpg",
      name: "Fajar Rahman",
      category: {
        name: "Pemetaan Lingkungan",
        image: "/images/pemetaan.jpg",
      },
      description:
        "Fajar Rahman adalah ahli pemetaan GIS dengan pengalaman lebih dari 12 tahun dalam analisis lingkungan. Ia mahir dalam penggunaan teknologi pemetaan satelit untuk memantau perubahan ekosistem, menjadikannya kompeten dalam mendukung perencanaan pembangunan yang ramah lingkungan.",
      email: "fajar.rahman@example.com",
      phone: "+628123456782",
    },
    {
      image: "/images/consultant2.jpg",
      name: "Gina Permata",
      category: {
        name: "Pemetaan Lingkungan",
        image: "/images/pemetaan.jpg",
      },
      description:
        "Gina Permata adalah spesialis pemetaan satelit dengan pengalaman lebih dari 9 tahun. Keahliannya mencakup analisis data spasial untuk pelestarian lingkungan, termasuk pemetaan kawasan konservasi dan mitigasi bencana alam.",
      email: "gina.permata@example.com",
      phone: "+628987654311",
    },
    {
      image: "/images/consultant3.jpg",
      name: "Hadi Wijaya",
      category: {
        name: "Pemetaan Lingkungan",
        image: "/images/pemetaan.jpg",
      },
      description:
        "Hadi Wijaya adalah ahli pemetaan ekosistem hutan dengan pengalaman lebih dari 10 tahun. Ia memiliki keahlian dalam pemetaan biodiversitas dan perencanaan konservasi, menjadikannya aset dalam proyek pelestarian alam.",
      email: "hadi.wijaya@example.com",
      phone: "+628123456783",
    },
  ],
  [
    {
      image: "/images/consultant1.jpg",
      name: "Kartini Lestari",
      category: {
        name: "Perencanaan Pengelolaan Lingkungan",
        image: "/images/perencanaan.jpg",
      },
      description:
        "Kartini Lestari adalah spesialis perencanaan pengelolaan limbah dengan pengalaman lebih dari 10 tahun. Ia mahir dalam merancang sistem pengelolaan limbah yang efisien dan ramah lingkungan, mendukung keberlanjutan di berbagai sektor.",
      email: "kartini.lestari@example.com",
      phone: "+628123456785",
    },
    {
      image: "/images/consultant2.jpg",
      name: "Lina Hartono",
      category: {
        name: "Perencanaan Pengelolaan Lingkungan",
        image: "/images/perencanaan.jpg",
      },
      description:
        "Lina Hartono adalah ahli strategi pengelolaan lingkungan berkelanjutan dengan pengalaman lebih dari 12 tahun. Ia fokus pada perencanaan kawasan konservasi dan mitigasi perubahan iklim.",
      email: "lina.hartono@example.com",
      phone: "+628987654313",
    },
    {
      image: "/images/consultant3.jpg",
      name: "Mira Andini",
      category: {
        name: "Perencanaan Pengelolaan Lingkungan",
        image: "/images/perencanaan.jpg",
      },
      description:
        "Mira Andini adalah ahli perencanaan restorasi ekosistem dengan pengalaman lebih dari 9 tahun. Ia memiliki keahlian dalam rehabilitasi lahan dan pelestarian biodiversitas.",
      email: "mira.andini@example.com",
      phone: "+628123456786",
    },
  ],
];

export default consultantData;
