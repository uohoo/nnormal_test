"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Shoe } from "@/data/shoes";
import { useCompare } from "@/context/compare-context";
import { computeScores, formatStack } from "@/lib/shoe-helpers";
import { RadarChart } from "@/components/RadarChart";

type ModelDetailViewProps = {
  shoe: Shoe;
};

export function ModelDetailView({ shoe }: ModelDetailViewProps) {
  const [activeImage, setActiveImage] = useState(shoe.images[0]?.url);
  const [variantId, setVariantId] = useState(shoe.variants?.[0]?.id ?? "");
  const { isSelected, toggleCompare, canSelectMore } = useCompare();

  const selected = isSelected(shoe.id);
  const compareDisabled = !selected && !canSelectMore;

  const scores = useMemo(() => computeScores(shoe, variantId), [shoe, variantId]);

  return (
    <article className="container-shell py-8">
      <header className="mb-6 space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-steel">{shoe.franchise}</p>
        <h1 className="text-4xl font-bold sm:text-5xl">{shoe.name}</h1>
        <p className="max-w-2xl text-lg font-light">{shoe.tagline}</p>
      </header>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
            {activeImage ? (
              <Image
                src={activeImage}
                alt={shoe.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : null}
          </div>
          <div className="grid grid-cols-5 gap-2">
            {shoe.images.map((image) => (
              <button
                key={`${shoe.id}-${image.url}`}
                type="button"
                onClick={() => setActiveImage(image.url)}
                aria-label={`Veure imatge ${image.label}`}
                className="focus-ring relative aspect-square overflow-hidden rounded-lg border border-[var(--border)]"
              >
                <Image src={image.url} alt={`${shoe.name} ${image.label}`} fill sizes="90px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-[var(--border)] bg-white p-4">
            <p className="text-sm font-light leading-relaxed">{shoe.description}</p>
            <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <p className="font-bold">Stack</p>
                <p>{formatStack(shoe)}</p>
              </div>
              <div>
                <p className="font-bold">Drop</p>
                <p>
                  {shoe.specs.drop.value}
                  {shoe.specs.drop.unit}
                </p>
              </div>
              <div>
                <p className="font-bold">Tacs</p>
                <p>
                  {shoe.specs.lug.value}
                  {shoe.specs.lug.unit}
                </p>
              </div>
              <div>
                <p className="font-bold">Pes</p>
                <p>
                  {shoe.specs.weight.value}
                  {shoe.specs.weight.unit} ({shoe.specs.weight.reference})
                </p>
              </div>
            </div>
          </section>

          {shoe.variants?.length ? (
            <section className="rounded-2xl border border-[var(--border)] bg-white p-4">
              <h2 className="text-lg font-bold">Configuració modular</h2>
              <select
                value={variantId}
                onChange={(event) => setVariantId(event.target.value)}
                className="focus-ring mt-3 w-full rounded-lg border border-[var(--border)] px-3 py-2"
                aria-label="Seleccionar variant"
              >
                {shoe.variants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.name}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm font-light text-steel">
                {shoe.variants.find((entry) => entry.id === variantId)?.description}
              </p>
            </section>
          ) : null}

          <RadarChart
            title={`Radar ${shoe.name}`}
            series={[
              {
                label: variantId ? `${shoe.name} (${variantId.toUpperCase()})` : shoe.name,
                color: "#0c0d0d",
                values: {
                  lleugeresa: scores.lleugeresa,
                  reactivitat: scores.reactivitat,
                  amortiguacio: scores.amortiguacio,
                  proteccio: scores.proteccio,
                  traccio_tecnic: scores.traccio_tecnic,
                  durabilitat: scores.durabilitat
                }
              }
            ]}
          />

          <section className="rounded-2xl border border-[var(--border)] bg-white p-4">
            <h2 className="text-lg font-bold">Ideal per</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm font-light">
              {shoe.bestFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className="mt-4 text-base font-bold">No ideal per</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm font-light">
              {shoe.notIdealFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-[var(--border)] bg-white p-4">
            <h2 className="text-lg font-bold">Tecnologies</h2>
            {shoe.technologies.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm font-light">
                {shoe.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm font-light text-steel">Informació de tecnologies pendent.</p>
            )}
          </section>

          <div className="grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => toggleCompare(shoe.id)}
              disabled={compareDisabled}
              className="focus-ring rounded-full border border-ink px-4 py-3 text-xs font-bold uppercase tracking-wide disabled:cursor-not-allowed disabled:border-[var(--border)] disabled:text-steel"
            >
              {selected ? "Al comparador" : "Comparar"}
            </button>
            <Link
              href="/compare"
              className="focus-ring rounded-full border border-ink px-4 py-3 text-center text-xs font-bold uppercase tracking-wide"
            >
              Obrir comparativa
            </Link>
            <Link
              href={shoe.shopUrl}
              target="_blank"
              rel="noreferrer"
              className="focus-ring rounded-full bg-ink px-4 py-3 text-center text-xs font-bold uppercase tracking-wide text-sand"
            >
              {shoe.status === "coming_soon" ? "Més info" : "Comprar"}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
