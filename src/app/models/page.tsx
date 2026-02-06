"use client";

import { useMemo, useState } from "react";
import { FilterBar, type CatalogFilters } from "@/components/FilterBar";
import { ShoeCard } from "@/components/ShoeCard";
import { shoes } from "@/data/shoes";

const initialFilters: CatalogFilters = {
  search: "",
  franchise: "all",
  terrain: "all",
  distance: "all",
  condition: "all",
  availability: "all"
};

export default function ModelsPage() {
  const [filters, setFilters] = useState<CatalogFilters>(initialFilters);

  const filteredShoes = useMemo(() => {
    return shoes.filter((shoe) => {
      if (filters.franchise !== "all" && shoe.franchise !== filters.franchise) return false;
      if (filters.terrain !== "all" && !shoe.terrainTags.includes(filters.terrain)) return false;
      if (filters.distance !== "all" && !shoe.distanceTags.includes(filters.distance)) return false;
      if (filters.condition !== "all" && !shoe.conditions.includes(filters.condition)) return false;
      if (filters.availability !== "all" && (shoe.status ?? "available") !== filters.availability) return false;

      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        const haystack = `${shoe.name} ${shoe.tagline} ${shoe.description}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="container-shell space-y-6 py-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-steel">Catàleg</p>
        <h1 className="text-4xl font-bold">Tots els models</h1>
        <p className="text-sm font-light text-steel">Filtra i afegeix fins a 3 models per comparar-los.</p>
      </header>

      <FilterBar filters={filters} onChange={setFilters} />

      <p className="text-sm font-light text-steel">{filteredShoes.length} models trobats</p>

      {filteredShoes.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredShoes.map((shoe) => (
            <ShoeCard key={shoe.id} shoe={shoe} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[var(--border)] bg-white p-6 text-center">
          <p className="text-lg font-bold">Cap resultat amb aquests filtres.</p>
          <button
            type="button"
            onClick={() => setFilters(initialFilters)}
            className="focus-ring mt-4 rounded-full border border-ink px-4 py-2 text-xs font-bold uppercase tracking-wide"
          >
            Netejar filtres
          </button>
        </div>
      )}
    </div>
  );
}
