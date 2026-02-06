"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Shoe } from "@/data/shoes";
import { getImageUrl } from "@/lib/shoe-helpers";
import { useCompare } from "@/context/compare-context";

type MatrixChartProps = {
  shoes: Shoe[];
  preview?: boolean;
};

const pointColors = ["#0c0d0d", "#495057", "#7f8c8d", "#2f4858", "#495057", "#111827", "#6b7280"];

export function MatrixChart({ shoes, preview = false }: MatrixChartProps) {
  const [activeShoeId, setActiveShoeId] = useState<string | null>(null);
  const { isSelected, toggleCompare, canSelectMore } = useCompare();
  const matrixShoes = useMemo(() => shoes.filter((shoe) => shoe.matrix), [shoes]);

  const active = activeShoeId ? matrixShoes.find((shoe) => shoe.id === activeShoeId) ?? null : null;

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-white p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Shoe Matrix</h2>
          <p className="text-sm font-light text-steel">Distància (X) vs Tècnicitat (Y)</p>
        </div>
        {preview ? (
          <Link
            href="/matrix"
            className="focus-ring rounded-full border border-ink px-4 py-2 text-xs font-bold uppercase tracking-wide"
          >
            Obrir matrix completa
          </Link>
        ) : null}
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-gradient-to-br from-sand via-white to-sand">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e6e8eb" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100" height="100" fill="url(#grid)" />
          <line x1="8" y1="92" x2="92" y2="92" stroke="#0c0d0d" strokeWidth="0.6" />
          <line x1="8" y1="92" x2="8" y2="8" stroke="#0c0d0d" strokeWidth="0.6" />
          <text x="50" y="98" textAnchor="middle" fontSize="4" fill="#0c0d0d">
            Distància
          </text>
          <text x="2" y="52" textAnchor="middle" transform="rotate(-90,2,52)" fontSize="4" fill="#0c0d0d">
            Tècnicitat
          </text>
        </svg>

        {matrixShoes.map((shoe, index) => {
          const distance = shoe.matrix?.distance ?? 0;
          const technicality = shoe.matrix?.technicality ?? 0;
          const left = 8 + distance * 0.84;
          const top = 92 - technicality * 0.84;
          const selected = isSelected(shoe.id);
          const disabled = !selected && !canSelectMore;

          return (
            <button
              key={shoe.id}
              type="button"
              aria-label={`Obrir ${shoe.name}`}
              onClick={() => setActiveShoeId(shoe.id)}
              className="focus-ring absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <span
                className={`block h-4 w-4 rounded-full border-2 border-white shadow ${
                  selected ? "ring-2 ring-ink" : ""
                }`}
                style={{ backgroundColor: pointColors[index % pointColors.length] }}
              />
              <span className="mt-1 block whitespace-nowrap rounded bg-white/95 px-2 py-0.5 text-[10px] uppercase tracking-wide shadow-sm">
                {shoe.name}
                {shoe.id === "kboix-01" ? " (modular)" : ""}
              </span>
              {disabled && !selected && <span className="sr-only">Comparador ple</span>}
            </button>
          );
        })}
      </div>

      {active ? (
        <div
          className="mt-4 grid gap-4 rounded-2xl border border-[var(--border)] bg-sand p-3 sm:grid-cols-[120px_1fr]"
          role="dialog"
          aria-label={`Fitxa de ${active.name}`}
        >
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image src={getImageUrl(active)} alt={active.name} fill sizes="120px" className="object-cover" />
          </div>
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold">{active.name}</h3>
                <p className="text-sm font-light text-steel">{active.tagline}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveShoeId(null)}
                className="focus-ring rounded-full border border-ink px-3 py-1 text-xs uppercase tracking-wide"
              >
                Tancar
              </button>
            </div>
            <p className="text-sm font-light">{active.description}</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => toggleCompare(active.id)}
                className="focus-ring rounded-full border border-ink px-3 py-1.5 text-xs font-bold uppercase tracking-wide"
              >
                {isSelected(active.id) ? "Al comparador" : "Comparar"}
              </button>
              <Link
                href={`/models/${active.id}`}
                className="focus-ring rounded-full border border-ink px-3 py-1.5 text-xs font-bold uppercase tracking-wide"
              >
                Veure model
              </Link>
              <Link
                href={active.shopUrl}
                target="_blank"
                rel="noreferrer"
                className="focus-ring rounded-full bg-ink px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-sand"
              >
                {active.status === "coming_soon" ? "Més info" : "Comprar"}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
