import { type Shoe, type ShoeScore } from "@/data/shoes";

export type RadarAxisKey =
  | "lleugeresa"
  | "reactivitat"
  | "amortiguacio"
  | "proteccio"
  | "traccio_tecnic"
  | "durabilitat";

export const RADAR_AXES: { key: RadarAxisKey; label: string }[] = [
  { key: "lleugeresa", label: "Lleugeresa" },
  { key: "reactivitat", label: "Reactivitat" },
  { key: "amortiguacio", label: "Amortiguació" },
  { key: "proteccio", label: "Protecció" },
  { key: "traccio_tecnic", label: "Tracció tècnica" },
  { key: "durabilitat", label: "Durabilitat" }
];

export function getImageUrl(shoe: Shoe, preferredLabels: Shoe["images"][number]["label"][] = ["LF", "LIFESTYLE"]) {
  for (const label of preferredLabels) {
    const image = shoe.images.find((item) => item.label === label);
    if (image) {
      return image.url;
    }
  }
  return shoe.images[0]?.url ?? "";
}

export function computeScores(shoe: Shoe, variantId?: string): ShoeScore {
  if (!variantId || !shoe.variants?.length) {
    return shoe.scores;
  }

  const variant = shoe.variants.find((entry) => entry.id === variantId);
  if (!variant) {
    return shoe.scores;
  }

  return {
    ...shoe.scores,
    ...variant.scoresOverride
  };
}

export function formatStack(shoe: Shoe): string {
  if (!shoe.specs.stack) {
    return "No disponible";
  }
  return `${shoe.specs.stack.forefoot}/${shoe.specs.stack.heel}${shoe.specs.stack.unit}`;
}

export function formatScore(value?: number): string {
  if (typeof value !== "number") {
    return "-";
  }
  return `${value}/10`;
}

export function getStatusLabel(status?: Shoe["status"]): string {
  if (status === "coming_soon") {
    return "Coming soon";
  }
  return "Disponible";
}
