"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { RadarChart } from "@/components/RadarChart";
import { SpecsTable } from "@/components/SpecsTable";
import { useCompare } from "@/context/compare-context";
import { shoes } from "@/data/shoes";

const colors = ["#0c0d0d", "#0f766e", "#b45309"];

export default function ComparePage() {
  const { selectedShoes, selectedIds, toggleCompare, canSelectMore } = useCompare();
  const [showDiffOnly, setShowDiffOnly] = useState(false);

  const radarSeries = useMemo(() => {
    return selectedShoes.map((shoe, index) => ({
      label: shoe.name,
      color: colors[index % colors.length],
      values: {
        lleugeresa: shoe.scores.lleugeresa,
        reactivitat: shoe.scores.reactivitat,
        amortiguacio: shoe.scores.amortiguacio,
        proteccio: shoe.scores.proteccio,
        traccio_tecnic: shoe.scores.traccio_tecnic,
        durabilitat: shoe.scores.durabilitat
      }
    }));
  }, [selectedShoes]);

  return (
    <div className="container-shell space-y-6 py-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-steel">Comparar</p>
        <h1 className="text-4xl font-bold">Comparador de models</h1>
        <p className="text-sm font-light text-steel">Selecciona fins a 3 sabates per veure diferències reals.</p>
      </header>

      <section className="rounded-2xl border border-[var(--border)] bg-white p-4">
        <h2 className="text-lg font-bold">Selector ràpid</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {shoes.map((shoe) => {
            const selected = selectedIds.includes(shoe.id);
            const disabled = !selected && !canSelectMore;
            return (
              <button
                key={shoe.id}
                type="button"
                onClick={() => toggleCompare(shoe.id)}
                disabled={disabled}
                className={`focus-ring rounded-full border px-3 py-2 text-xs font-bold uppercase tracking-wide transition ${
                  selected
                    ? "border-ink bg-ink text-sand"
                    : "border-[var(--border)] bg-sand text-ink hover:border-ink"
                } disabled:cursor-not-allowed disabled:opacity-45`}
              >
                {shoe.name}
              </button>
            );
          })}
        </div>
      </section>

      {selectedShoes.length > 0 ? (
        <>
          <RadarChart title="Radar comparatiu" series={radarSeries} />

          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showDiffOnly}
              onChange={(event) => setShowDiffOnly(event.target.checked)}
              className="h-4 w-4"
            />
            Mostra només diferències
          </label>

          <SpecsTable shoes={selectedShoes} showDifferencesOnly={showDiffOnly} />

          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {selectedShoes.map((shoe) => (
              <article key={shoe.id} className="rounded-2xl border border-[var(--border)] bg-white p-4">
                <h2 className="text-lg font-bold">{shoe.name}</h2>
                <h3 className="mt-3 text-sm font-bold uppercase tracking-wide text-steel">Ideal per</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm font-light">
                  {shoe.bestFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/models/${shoe.id}`}
                    className="focus-ring rounded-full border border-ink px-3 py-2 text-xs font-bold uppercase tracking-wide"
                  >
                    Veure model
                  </Link>
                  <Link
                    href={shoe.shopUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring rounded-full bg-ink px-3 py-2 text-xs font-bold uppercase tracking-wide text-sand"
                  >
                    {shoe.status === "coming_soon" ? "Més info" : "Comprar"}
                  </Link>
                </div>
              </article>
            ))}
          </section>
        </>
      ) : (
        <div className="rounded-2xl border border-[var(--border)] bg-white p-8 text-center">
          <p className="text-xl font-bold">Encara no has afegit cap model.</p>
          <p className="mt-2 text-sm font-light text-steel">Selecciona models des del catàleg o des del selector ràpid.</p>
          <Link
            href="/models"
            className="focus-ring mt-4 inline-flex rounded-full border border-ink px-5 py-2 text-xs font-bold uppercase tracking-wide"
          >
            Anar al catàleg
          </Link>
        </div>
      )}
    </div>
  );
}
