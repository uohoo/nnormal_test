"use client";

import Link from "next/link";
import { useCompare } from "@/context/compare-context";

export function CompareDrawer() {
  const { selectedShoes, clearCompare, selectedIds } = useCompare();

  if (selectedIds.length === 0) {
    return null;
  }

  return (
    <aside className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 rounded-2xl border border-ink bg-ink px-4 py-3 text-sand shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-light">
          {selectedIds.length} model{selectedIds.length > 1 ? "s" : ""} al comparador
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={clearCompare}
            className="focus-ring rounded-full border border-sand px-3 py-1 text-xs uppercase tracking-wide"
          >
            Buida
          </button>
          <Link
            href="/compare"
            className="focus-ring rounded-full bg-sand px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink"
          >
            Veure comparativa
          </Link>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-2 text-xs">
        {selectedShoes.map((shoe) => (
          <span key={shoe.id} className="rounded-full bg-white/15 px-3 py-1">
            {shoe.name}
          </span>
        ))}
      </div>
    </aside>
  );
}
