import Image from "next/image";
import Link from "next/link";
import type { Shoe } from "@/data/shoes";
import { getImageUrl, getStatusLabel } from "@/lib/shoe-helpers";

type ResultCardProps = {
  shoe: Shoe;
  score?: number;
  highlight?: boolean;
};

export function ResultCard({ shoe, score, highlight = false }: ResultCardProps) {
  const imageUrl = getImageUrl(shoe);

  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-white ${
        highlight ? "border-ink shadow-card" : "border-[var(--border)]"
      }`}
    >
      <div className="relative aspect-[5/4] w-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={shoe.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-sand text-sm text-steel">Sense imatge</div>
        )}
      </div>
      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-xl font-bold">{shoe.name}</h3>
          <p className="text-sm font-light text-steel">{shoe.tagline}</p>
          {typeof score === "number" && (
            <p className="mt-1 text-xs uppercase tracking-wide">Puntuació: {score.toFixed(1)}</p>
          )}
          {shoe.status === "coming_soon" && (
            <span className="mt-2 inline-flex rounded-full border border-ink px-2 py-1 text-xs uppercase tracking-wide">
              {getStatusLabel(shoe.status)}
            </span>
          )}
        </div>

        <ul className="list-disc space-y-1 pl-4 text-sm font-light">
          {shoe.bestFor.slice(0, 3).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/models/${shoe.id}`}
            className="focus-ring rounded-full border border-ink px-3 py-2 text-center text-xs font-bold uppercase tracking-wide"
          >
            Veure model
          </Link>
          <Link
            href={shoe.shopUrl}
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded-full bg-ink px-3 py-2 text-center text-xs font-bold uppercase tracking-wide text-sand"
          >
            {shoe.status === "coming_soon" ? "Més info" : "Comprar"}
          </Link>
        </div>
      </div>
    </article>
  );
}
