export type ShoeScore = {
  lleugeresa: number;
  reactivitat: number;
  amortiguacio: number;
  proteccio: number;
  estabilitat: number;
  traccio_tecnic: number;
  traccio_fang: number;
  durabilitat: number;
  assecat: number;
  versatilitat: number;
  impermeabilitat?: number;
};

export type Shoe = {
  id: string;
  name: string;
  franchise: "Kjerag" | "Tomir" | "Kboix" | "Cadi";
  category: "Trail running" | "Hiking/Trekking";
  tagline: string;
  description: string;
  bestFor: string[];
  notIdealFor: string[];
  terrainTags: Array<"tecnic" | "mixt" | "fang" | "facil">;
  distanceTags: Array<"curta" | "mitja" | "llarga">;
  conditions: Array<"sec" | "humit" | "impermeable">;
  specs: {
    stack?: { forefoot: number; heel: number; unit: "mm" };
    drop: { value: number; unit: "mm" };
    lug: { value: number; unit: "mm" };
    weight: { value: number; unit: "g"; reference: string };
  };
  technologies: string[];
  scores: ShoeScore;
  images: { label: "LF" | "DF" | "CF" | "SF" | "LIFESTYLE" | "MATRIX"; url: string }[];
  shopUrl: string;
  matrix?: { distance: number; technicality: number };
  variants?: {
    id: string;
    name: string;
    description: string;
    scoresOverride: Partial<ShoeScore>;
  }[];
  status?: "available" | "coming_soon";
};

export const shoes: Shoe[] = [
  {
    id: "kjerag-02",
    name: "Kjerag 02",
    franchise: "Kjerag",
    category: "Trail running",
    tagline: "Més ràpida. Més salvatge.",
    description:
      "Per dies de ritme i pujades curtes: quan l’entrenament demana velocitat i precisió.",
    bestFor: [
      "Sèries i entrenos ràpids a muntanya",
      "Terreny tècnic sec",
      "Quan vols reactivitat i control"
    ],
    notIdealFor: ["Fang profund i neu tova"],
    terrainTags: ["tecnic", "mixt"],
    distanceTags: ["curta", "mitja"],
    conditions: ["sec", "humit"],
    specs: {
      stack: { forefoot: 20, heel: 26, unit: "mm" },
      drop: { value: 6, unit: "mm" },
      lug: { value: 3.5, unit: "mm" },
      weight: { value: 214, unit: "g", reference: "UK 7.5" }
    },
    technologies: ["Matryx", "Vibram Megagrip", "Vibram Litebase", "EExpure+ midsole (TPE based)"],
    scores: {
      lleugeresa: 9,
      reactivitat: 10,
      amortiguacio: 6,
      proteccio: 6,
      estabilitat: 6,
      traccio_tecnic: 8,
      traccio_fang: 4,
      durabilitat: 8,
      assecat: 8,
      versatilitat: 6
    },
    images: [
      {
        label: "LF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDNtYmlnZ3JleSQ%3D/N1ZKGM2-001_LF.jpg"
      },
      {
        label: "DF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDNtYmlnZ3JleSQ%3D/N1ZKGM2-001_DF.jpg"
      },
      {
        label: "CF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDNtYmlnZ3JleSQ%3D/N1ZKGM2-001_CF.jpg"
      },
      {
        label: "SF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDNtYmlnZ3JleSQ%3D/N1ZKGM2-001_SF.jpg"
      }
    ],
    shopUrl: "https://www.nnormal.com/en_SE/men/shoes/kjr/nnormal-kjerag_02_shoe_black-N1ZKGM2-001",
    matrix: { distance: 35, technicality: 85 },
    status: "available"
  },
  {
    id: "kjerag-01",
    name: "Kjerag 01",
    franchise: "Kjerag",
    category: "Trail running",
    tagline: "Fast & light. Sense excuses.",
    description: "Max performance i pes mínim per quan vols anar lleuger i apretar.",
    bestFor: [
      "Trail ràpid i tècnic",
      "Competir o entrenar amb intensitat",
      "Sensació de control i contacte"
    ],
    notIdealFor: ["Si vols molta amortiguació"],
    terrainTags: ["tecnic", "mixt"],
    distanceTags: ["curta", "mitja"],
    conditions: ["sec", "humit"],
    specs: {
      stack: { forefoot: 17.5, heel: 23.5, unit: "mm" },
      drop: { value: 6, unit: "mm" },
      lug: { value: 3.5, unit: "mm" },
      weight: { value: 216, unit: "g", reference: "UK 8.5" }
    },
    technologies: ["Matryx Jacquard", "Vibram Megagrip + Litebase", "EExpure midsole"],
    scores: {
      lleugeresa: 10,
      reactivitat: 9,
      amortiguacio: 5,
      proteccio: 6,
      estabilitat: 6,
      traccio_tecnic: 8,
      traccio_fang: 4,
      durabilitat: 8,
      assecat: 8,
      versatilitat: 6
    },
    images: [
      {
        label: "LF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDNtYmlnZ3JleSQ%3D/N1ZKGM1-002_LF.jpg"
      },
      {
        label: "DF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDNtYmlnZ3JleSQ%3D/N1ZKGM1-002_DF.jpg"
      },
      {
        label: "CF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDNtYmlnZ3JleSQ%3D/N1ZKGM1-002_CF.jpg"
      }
    ],
    shopUrl: "https://www.nnormal.com/en_ES/men/shoes/kjerag/nnormal-kjerag-N1ZKGM1-002",
    matrix: { distance: 30, technicality: 85 },
    status: "available"
  },
  {
    id: "kjerag-brut",
    name: "Kjerag Brut",
    franchise: "Kjerag",
    category: "Trail running",
    tagline: "Quan es posa brut, tu no afluixes.",
    description:
      "Pensada per fang, neu i terreny tou: tracció i drenatge per condicions extremes.",
    bestFor: ["Fang profund / neu", "Condicions humides i ‘dirty’", "Quan necessites tracció màxima"],
    notIdealFor: ["Camins fàcils i secs (tacs molt agressius)"],
    terrainTags: ["fang", "tecnic"],
    distanceTags: ["curta", "mitja"],
    conditions: ["humit"],
    specs: {
      stack: { forefoot: 22.5, heel: 28.5, unit: "mm" },
      drop: { value: 6, unit: "mm" },
      lug: { value: 6.5, unit: "mm" },
      weight: { value: 230, unit: "g", reference: "UK 8.5" }
    },
    technologies: ["Matryx Micro", "Vibram Megagrip + Litebase", "EExpure midsole"],
    scores: {
      lleugeresa: 8,
      reactivitat: 9,
      amortiguacio: 6,
      proteccio: 6,
      estabilitat: 6,
      traccio_tecnic: 7,
      traccio_fang: 10,
      durabilitat: 8,
      assecat: 10,
      versatilitat: 5
    },
    images: [
      {
        label: "LF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDNtYmlnZ3JleSQ%3D/N1ZKSM1-004_LF.jpg"
      },
      {
        label: "DF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDNtYmlnZ3JleSQ%3D/N1ZKSM1-004_DF.jpg"
      },
      {
        label: "CF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDNtYmlnZ3JleSQ%3D/N1ZKSM1-004_CF.jpg"
      }
    ],
    shopUrl:
      "https://www.nnormal.com/en_GB/men/shoes/kjerag/nnormal-kjerag_brut_red_green-N1ZKSM1-004",
    matrix: { distance: 40, technicality: 90 },
    status: "available"
  },
  {
    id: "tomir-02",
    name: "Tomir 02",
    franchise: "Tomir",
    category: "Trail running",
    tagline: "Protecció per anar lluny.",
    description: "Per tirades llargues en terreny tècnic: estabilitat, confiança i amortiguació.",
    bestFor: [
      "Tirades llargues",
      "Terreny tècnic i imprevisible",
      "Quan prioritzes estabilitat i protecció"
    ],
    notIdealFor: ["Si només busques pes mínim"],
    terrainTags: ["tecnic", "mixt"],
    distanceTags: ["mitja", "llarga"],
    conditions: ["sec", "humit"],
    specs: {
      stack: { forefoot: 25, heel: 33, unit: "mm" },
      drop: { value: 8, unit: "mm" },
      lug: { value: 5, unit: "mm" },
      weight: { value: 264, unit: "g", reference: "UK 8.5" }
    },
    technologies: ["Vibram Megagrip + Litebase + Traction Lug", "EExpure midsole"],
    scores: {
      lleugeresa: 6,
      reactivitat: 7,
      amortiguacio: 9,
      proteccio: 9,
      estabilitat: 9,
      traccio_tecnic: 8,
      traccio_fang: 7,
      durabilitat: 9,
      assecat: 7,
      versatilitat: 9
    },
    images: [
      {
        label: "LF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDNtYmlnZ3JleSQ%3D/N2ZTR25-001_LF.jpg"
      },
      {
        label: "DF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDNtYmlnZ3JleSQ%3D/N2ZTR25-001_DF.jpg"
      },
      {
        label: "CF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDNtYmlnZ3JleSQ%3D/N2ZTR25-001_CF.jpg"
      },
      {
        label: "SF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDNtYmlnZ3JleSQ%3D/N2ZTR25-001_SF.jpg"
      }
    ],
    shopUrl: "https://www.nnormal.com/en_US/men/shoes/tmi/nnormal-tomir_02_shoe_black-N2ZTR25-001",
    matrix: { distance: 85, technicality: 80 },
    status: "available"
  },
  {
    id: "tomir-02-gtx",
    name: "Tomir 02 Gore-Tex",
    franchise: "Tomir",
    category: "Trail running",
    tagline: "Alt i sec. Sempre.",
    description:
      "La Tomir 02 per dies d’aigua, neu i temps canviant: protecció impermeable sense renunciar al rendiment.",
    bestFor: ["Pluja i neu", "Terreny tècnic humit", "Quan vols impermeabilitat real"],
    notIdealFor: ["Dies molt calorosos (menys ventilació)"],
    terrainTags: ["tecnic", "fang", "mixt"],
    distanceTags: ["mitja", "llarga"],
    conditions: ["humit", "impermeable"],
    specs: {
      stack: { forefoot: 25, heel: 33, unit: "mm" },
      drop: { value: 8, unit: "mm" },
      lug: { value: 5, unit: "mm" },
      weight: { value: 282, unit: "g", reference: "UK 7.5" }
    },
    technologies: [
      "Gore-Tex waterproof membrane (PFAS-free ePE)",
      "Vibram Megagrip + Litebase + Traction Lug",
      "EExpure"
    ],
    scores: {
      lleugeresa: 5,
      reactivitat: 7,
      amortiguacio: 9,
      proteccio: 9,
      estabilitat: 9,
      traccio_tecnic: 8,
      traccio_fang: 7,
      durabilitat: 9,
      assecat: 4,
      versatilitat: 8,
      impermeabilitat: 10
    },
    images: [
      {
        label: "LF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDNtYmlnZ3JleSQ%3D/N2ZTRG1-001_LF.jpg"
      },
      {
        label: "DF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDNtYmlnZ3JleSQ%3D/N2ZTRG1-001_DF.jpg"
      },
      {
        label: "CF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDNtYmlnZ3JleSQ%3D/N2ZTRG1-001_CF.jpg"
      },
      {
        label: "SF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDNtYmlnZ3JleSQ%3D/N2ZTRG1-001_SF.jpg"
      }
    ],
    shopUrl: "https://www.nnormal.com/en_US/men/shoes/tmi/nnormal-tomir_02_gtx_shoe_blue_grey-N2ZTRG1-001",
    matrix: { distance: 85, technicality: 80 },
    status: "available"
  },
  {
    id: "kboix-01",
    name: "Kboix 01",
    franchise: "Kboix",
    category: "Trail running",
    tagline: "Una sabata. Tres opcions.",
    description: "Modular i multisport: canvia la mitja sola i adapta la sensació al terreny i al teu cos.",
    bestFor: ["Versatilitat", "Usuaris ‘early adopter’", "Canviar sensacions segons entreno"],
    notIdealFor: ["Si només vols el mínim pes possible"],
    terrainTags: ["mixt", "tecnic", "facil"],
    distanceTags: ["mitja", "llarga"],
    conditions: ["sec", "humit"],
    specs: {
      drop: { value: 6, unit: "mm" },
      lug: { value: 4, unit: "mm" },
      weight: { value: 310, unit: "g", reference: "EU 42" }
    },
    technologies: [
      "Interchangeable midsoles",
      "Matryx EVO Light Jacquard",
      "Vibram Megagrip + Litebase"
    ],
    scores: {
      lleugeresa: 4,
      proteccio: 8,
      estabilitat: 8,
      traccio_tecnic: 7,
      traccio_fang: 6,
      durabilitat: 9,
      versatilitat: 10,
      reactivitat: 7,
      amortiguacio: 7,
      assecat: 7
    },
    variants: [
      {
        id: "kb1-soft",
        name: "KB1 Soft",
        description: "Focus en comoditat i absorció sostinguda.",
        scoresOverride: { reactivitat: 6, amortiguacio: 8 }
      },
      {
        id: "kb2-reactive",
        name: "KB2 Reactive",
        description: "Resposta ràpida quan vols ritme.",
        scoresOverride: { reactivitat: 9, amortiguacio: 6 }
      },
      {
        id: "kb3-bounce",
        name: "KB3 Bounce",
        description: "Més retorn i suport per sumar hores.",
        scoresOverride: { reactivitat: 8, amortiguacio: 9 }
      }
    ],
    images: [
      {
        label: "LF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDFwZHBzcXVhcmVncmV5bSQ%3D/N2ZKXM1-999-K001_01.jpg"
      },
      {
        label: "DF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDFwZHBzcXVhcmVncmV5bSQ%3D/N2ZKXM1-999-K001_01.jpg"
      },
      {
        label: "CF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDFwZHBzcXVhcmVncmV5bSQ%3D/N2ZKXM1-999-K001_01.jpg"
      },
      {
        label: "SF",
        url: "https://cloud.nnormal.com/is/image/JGVzaG9wMDFwZHBzcXVhcmVncmV5bSQ%3D/N2ZKXM1-999-K001_01.jpg"
      }
    ],
    shopUrl: "https://www.nnormal.com/en_US/content/kboix",
    matrix: { distance: 60, technicality: 60 },
    status: "available"
  },
  {
    id: "cadi",
    name: "Cadí",
    franchise: "Cadi",
    category: "Trail running",
    tagline: "Quan el camí és una invitació.",
    description:
      "Per sortir, sumar quilòmetres i gaudir: una bamba pensada per tots els nivells (properament).",
    bestFor: ["Terreny fàcil", "Ritme constant", "Dies llargs sense pressa"],
    notIdealFor: ["Terreny molt tècnic i agressiu"],
    terrainTags: ["facil", "mixt"],
    distanceTags: ["mitja", "llarga"],
    conditions: ["sec", "humit"],
    specs: {
      stack: { forefoot: 29, heel: 35, unit: "mm" },
      drop: { value: 6, unit: "mm" },
      lug: { value: 4, unit: "mm" },
      weight: { value: 270, unit: "g", reference: "UK 8.5" }
    },
    technologies: [],
    scores: {
      lleugeresa: 7,
      reactivitat: 6,
      amortiguacio: 10,
      proteccio: 7,
      estabilitat: 7,
      traccio_tecnic: 6,
      traccio_fang: 5,
      durabilitat: 8,
      assecat: 7,
      versatilitat: 9
    },
    images: [
      {
        label: "LIFESTYLE",
        url: "https://www.nnormal.com/cms/api/assets/tiers-banners-homes/41a4d765-a519-4bbb-9ba3-acdbd4e8edd3/NN_cadi_1x1_768.jpg"
      },
      {
        label: "MATRIX",
        url: "https://www.nnormal.com/cms/api/assets/tiers-banners-homes/0ff0f667-08e6-44d1-a6cc-e3de707d925e/NN_Matrix_new_Mobile_EN-768.jpg"
      }
    ],
    shopUrl: "https://www.nnormal.com/en_ES/content/cadi",
    matrix: { distance: 75, technicality: 25 },
    status: "coming_soon"
  }
];

export const shoeById = new Map(shoes.map((shoe) => [shoe.id, shoe]));
