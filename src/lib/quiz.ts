import { shoes, type Shoe, type ShoeScore } from "@/data/shoes";

export type TerrainAnswer = "tecnic" | "fang-neu" | "mixt" | "facil";
export type DistanceAnswer = "curta" | "mitja" | "llarga" | "ultra";
export type PriorityAnswer = "ritme" | "comoditat" | "proteccio" | "adaptable";
export type MeteoAnswer = "sec" | "humit" | "impermeable";
export type ProfileAnswer = "competitiu" | "intermedi" | "tranquil";

export type QuizAnswers = {
  terrain: TerrainAnswer;
  distance: DistanceAnswer;
  priority: PriorityAnswer;
  meteo: MeteoAnswer;
  profile: ProfileAnswer;
};

export type QuizQuestion = {
  id: keyof QuizAnswers;
  title: string;
  options: { label: string; value: QuizAnswers[keyof QuizAnswers] }[];
};

const scoreMap: Record<string, Partial<Record<keyof ShoeScore, number>>> = {
  tecnic: { traccio_tecnic: 2.2, estabilitat: 1.2, proteccio: 1 },
  "fang-neu": { traccio_fang: 2.8, proteccio: 1.2, assecat: 1 },
  mixt: { versatilitat: 2, traccio_tecnic: 1, amortiguacio: 0.8 },
  facil: { amortiguacio: 1.7, versatilitat: 1.4, lleugeresa: 0.7 },
  curta: { lleugeresa: 1.6, reactivitat: 1.5 },
  mitja: { versatilitat: 1.4, amortiguacio: 1 },
  llarga: { amortiguacio: 2, proteccio: 1.5, estabilitat: 1.5, durabilitat: 1 },
  ultra: { amortiguacio: 2.4, proteccio: 1.8, estabilitat: 1.8, durabilitat: 1.2 },
  ritme: { reactivitat: 2.4, lleugeresa: 1.5, traccio_tecnic: 1 },
  comoditat: { amortiguacio: 2, estabilitat: 1.3, versatilitat: 1 },
  proteccio: { proteccio: 2.2, estabilitat: 1.5, amortiguacio: 1.1 },
  adaptable: { versatilitat: 2.6, durabilitat: 1.2, proteccio: 0.8 },
  sec: { assecat: 1, lleugeresa: 0.8 },
  humit: { traccio_tecnic: 1.1, traccio_fang: 1.2, proteccio: 0.6 },
  impermeable: { impermeabilitat: 3.5, proteccio: 1.2, estabilitat: 0.6 },
  competitiu: { reactivitat: 1.6, lleugeresa: 1.3, traccio_tecnic: 0.8 },
  intermedi: { versatilitat: 1.4, proteccio: 1.1 },
  tranquil: { amortiguacio: 1.7, estabilitat: 1.2, proteccio: 1 }
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "terrain",
    title: "Terreny principal",
    options: [
      { label: "tecnic", value: "tecnic" },
      { label: "fang-neu", value: "fang-neu" },
      { label: "mixt", value: "mixt" },
      { label: "facil", value: "facil" }
    ]
  },
  {
    id: "distance",
    title: "Distància habitual",
    options: [
      { label: "curta", value: "curta" },
      { label: "mitja", value: "mitja" },
      { label: "llarga", value: "llarga" },
      { label: "ultra", value: "ultra" }
    ]
  },
  {
    id: "priority",
    title: "Prioritat",
    options: [
      { label: "ritme", value: "ritme" },
      { label: "comoditat", value: "comoditat" },
      { label: "proteccio", value: "proteccio" },
      { label: "adaptable", value: "adaptable" }
    ]
  },
  {
    id: "meteo",
    title: "Meteo",
    options: [
      { label: "sec", value: "sec" },
      { label: "humit", value: "humit" },
      { label: "impermeable", value: "impermeable" }
    ]
  },
  {
    id: "profile",
    title: "Perfil",
    options: [
      { label: "competitiu", value: "competitiu" },
      { label: "intermedi", value: "intermedi" },
      { label: "tranquil", value: "tranquil" }
    ]
  }
];

type RankedResult = {
  shoe: Shoe;
  score: number;
};

function addWeightedScore(value: string, shoe: Shoe): number {
  const map = scoreMap[value] ?? {};
  return Object.entries(map).reduce((acc, [key, weight]) => {
    const metric = shoe.scores[key as keyof ShoeScore] ?? 0;
    return acc + metric * (weight ?? 0);
  }, 0);
}

function addTagScore(answers: QuizAnswers, shoe: Shoe): number {
  let score = 0;

  if (answers.terrain === "tecnic" && shoe.terrainTags.includes("tecnic")) score += 6;
  if (answers.terrain === "fang-neu" && shoe.terrainTags.includes("fang")) score += 9;
  if (answers.terrain === "mixt" && shoe.terrainTags.includes("mixt")) score += 6;
  if (answers.terrain === "facil" && shoe.terrainTags.includes("facil")) score += 7;

  if (answers.distance === "curta" && shoe.distanceTags.includes("curta")) score += 6;
  if (answers.distance === "mitja" && shoe.distanceTags.includes("mitja")) score += 6;
  if ((answers.distance === "llarga" || answers.distance === "ultra") && shoe.distanceTags.includes("llarga")) {
    score += 10;
  }

  if (answers.meteo === "impermeable" && shoe.conditions.includes("impermeable")) score += 16;
  if (answers.meteo === "humit" && shoe.conditions.includes("humit")) score += 8;
  if (answers.meteo === "sec" && shoe.conditions.includes("sec")) score += 5;

  return score;
}

function addStrategicBoosts(answers: QuizAnswers, shoe: Shoe): number {
  let boost = 0;

  if (answers.meteo === "impermeable" && shoe.id === "tomir-02-gtx") {
    boost += 40;
  }

  if (answers.terrain === "fang-neu" && shoe.id === "kjerag-brut") {
    boost += 35;
  }

  if (answers.priority === "adaptable" && shoe.id === "kboix-01") {
    boost += 36;
  }

  if (answers.distance === "llarga" || answers.distance === "ultra") {
    if (shoe.id === "tomir-02" || shoe.id === "tomir-02-gtx") {
      boost += 18;
    }
    if (shoe.id === "cadi") {
      boost += 14;
    }

    if (answers.priority === "proteccio" && (shoe.id === "tomir-02" || shoe.id === "tomir-02-gtx")) {
      boost += 12;
    }
  }

  if (answers.terrain === "tecnic" && answers.priority === "ritme") {
    if (shoe.id === "kjerag-02") {
      boost += 24;
    }
    if (shoe.id === "kjerag-01") {
      boost += 18;
    }
  }

  if (shoe.id === "kjerag-02") {
    boost += shoe.scores.versatilitat * 0.6;
  }

  if (shoe.status === "coming_soon") {
    boost -= 8;
  }

  return boost;
}

export function getQuizRecommendation(answers: QuizAnswers) {
  const ranked = shoes
    .map<RankedResult>((shoe) => {
      const base =
        addWeightedScore(answers.terrain, shoe) +
        addWeightedScore(answers.distance, shoe) +
        addWeightedScore(answers.priority, shoe) +
        addWeightedScore(answers.meteo, shoe) +
        addWeightedScore(answers.profile, shoe);

      const score = base + addTagScore(answers, shoe) + addStrategicBoosts(answers, shoe);

      return { shoe, score };
    })
    .sort((a, b) => b.score - a.score);

  return {
    recommendation: ranked[0],
    alternatives: ranked.slice(1, 3),
    explanation: buildExplanation(answers)
  };
}

function buildExplanation(answers: QuizAnswers): string[] {
  const terrainMap: Record<TerrainAnswer, string> = {
    tecnic: "Has prioritzat terreny tècnic: necessites tracció i control.",
    "fang-neu": "Corres en fang o neu: la tracció en terreny tou pesa molt.",
    mixt: "Busques una sabata polivalent per condicions canviants.",
    facil: "Predominen pistes fàcils: la comoditat contínua guanya protagonisme."
  };

  const distanceMap: Record<DistanceAnswer, string> = {
    curta: "Distàncies curtes: més agilitat i resposta en cada canvi de ritme.",
    mitja: "Distància mitja: equilibri entre confort i dinamisme.",
    llarga: "Distàncies llargues: amortiguació i estabilitat són prioritat.",
    ultra: "Objectiu ultra: protecció i durabilitat per mantenir rendiment."
  };

  const profileMap: Record<ProfileAnswer, string> = {
    competitiu: "Perfil competitiu: es premia la reactivitat i el control a ritme alt.",
    intermedi: "Perfil intermedi: millor una opció completa i adaptable.",
    tranquil: "Perfil tranquil: prioritzes seguretat i confort sostingut."
  };

  return [terrainMap[answers.terrain], distanceMap[answers.distance], profileMap[answers.profile]];
}
