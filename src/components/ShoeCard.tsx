"use client";

import Image from "next/image";
import Link from "next/link";
import { useCompare } from "@/context/compare-context";
import type { Shoe } from "@/data/shoes";
import { getImageUrl, getStatusLabel } from "@/lib/shoe-helpers";

type ShoeCardProps = {
  shoe: Shoe;
  compact?: boolean;
};

export function ShoeCard({ shoe, compact = false }: ShoeCardProps) {
  const { isSelected, toggleCompare, canSelectMore } = useCompare();
  const selected = isSelected(shoe.id);
  const compareDisabled = !selected && !canSelectMore;
  const imageUrl = getImageUrl(shoe);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-card">
      <div className={`relative w-full ${compact ? "aspect-[5/4]" : "aspect-square"}`}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={shoe.name}
            fill
            sizes={compact ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 100vw, 25vw"}
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-sand text-sm text-steel">Sense imatge</div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-sand">
          {shoe.franchise}
        </span>
        {shoe.status === "coming_soon" && (
          <span className="absolute right-3 top-3 rounded-full border border-ink bg-white px-3 py-1 text-[11px] uppercase tracking-wide">
            {getStatusLabel(shoe.status)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-xl font-bold leading-tight">{shoe.name}</h3>
          <p className="mt-1 text-sm font-light text-steel">{shoe.tagline}</p>
        </div>

        <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-wide">
          {shoe.terrainTags.map((terrain) => (
            <span key={terrain} className="rounded-full bg-sand px-2 py-1">
              {terrain}
            </span>
          ))}
          {shoe.distanceTags.map((distance) => (
            <span key={distance} className="rounded-full border border-[var(--border)] px-2 py-1">
              {distance}
            </span>
          ))}
        </div>

        <p className="text-sm font-light leading-relaxed">{shoe.description}</p>

        <div className="mt-auto grid grid-cols-2 gap-2">
          <Link
            href={`/models/${shoe.id}`}
            className="focus-ring rounded-full border border-ink px-3 py-2 text-center text-xs font-bold uppercase tracking-wide transition hover:bg-ink hover:text-sand"
          >
            Veure model
          </Link>
          <button
            type="button"
            onClick={() => toggleCompare(shoe.id)}
            disabled={compareDisabled}
            aria-label={selected ? `Treure ${shoe.name} del comparador` : `Afegir ${shoe.name} al comparador`}
            className="focus-ring rounded-full border border-ink px-3 py-2 text-xs font-bold uppercase tracking-wide transition hover:bg-ink hover:text-sand disabled:cursor-not-allowed disabled:border-[var(--border)] disabled:text-steel"
          >
            {selected ? "Al comparador" : "Comparar"}
          </button>
        </div>

        <Link
          href={shoe.shopUrl}
          target="_blank"
          rel="noreferrer"
          className="focus-ring rounded-full bg-ink px-3 py-2 text-center text-xs font-bold uppercase tracking-wide text-sand transition hover:opacity-85"
        >
          {shoe.status === "coming_soon" ? "Més info" : "Comprar"}
        </Link>
      </div>
    </article>
  );
}
