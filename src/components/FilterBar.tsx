"use client";

import type { Shoe } from "@/data/shoes";

export type CatalogFilters = {
  search: string;
  franchise: "all" | Shoe["franchise"];
  terrain: "all" | Shoe["terrainTags"][number];
  distance: "all" | Shoe["distanceTags"][number];
  condition: "all" | Shoe["conditions"][number];
  availability: "all" | "available" | "coming_soon";
};

type FilterBarProps = {
  filters: CatalogFilters;
  onChange: (filters: CatalogFilters) => void;
};

const selectClass =
  "focus-ring w-full rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-sm outline-none";

export function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-white p-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <input
          type="search"
          value={filters.search}
          placeholder="Buscar model..."
          aria-label="Buscar model"
          className={`${selectClass} lg:col-span-2`}
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
        />

        <select
          value={filters.franchise}
          aria-label="Filtrar per franquícia"
          className={selectClass}
          onChange={(event) => onChange({ ...filters, franchise: event.target.value as CatalogFilters["franchise"] })}
        >
          <option value="all">Franquícia</option>
          <option value="Kjerag">Kjerag</option>
          <option value="Tomir">Tomir</option>
          <option value="Kboix">Kboix</option>
          <option value="Cadi">Cadi</option>
        </select>

        <select
          value={filters.terrain}
          aria-label="Filtrar per terreny"
          className={selectClass}
          onChange={(event) => onChange({ ...filters, terrain: event.target.value as CatalogFilters["terrain"] })}
        >
          <option value="all">Terreny</option>
          <option value="tecnic">tecnic</option>
          <option value="fang">fang</option>
          <option value="mixt">mixt</option>
          <option value="facil">facil</option>
        </select>

        <select
          value={filters.distance}
          aria-label="Filtrar per distància"
          className={selectClass}
          onChange={(event) => onChange({ ...filters, distance: event.target.value as CatalogFilters["distance"] })}
        >
          <option value="all">Distància</option>
          <option value="curta">curta</option>
          <option value="mitja">mitja</option>
          <option value="llarga">llarga</option>
        </select>

        <select
          value={filters.condition}
          aria-label="Filtrar per condicions"
          className={selectClass}
          onChange={(event) => onChange({ ...filters, condition: event.target.value as CatalogFilters["condition"] })}
        >
          <option value="all">Meteo</option>
          <option value="sec">sec</option>
          <option value="humit">humit</option>
          <option value="impermeable">impermeable</option>
        </select>

        <select
          value={filters.availability}
          aria-label="Filtrar per disponibilitat"
          className={selectClass}
          onChange={(event) =>
            onChange({ ...filters, availability: event.target.value as CatalogFilters["availability"] })
          }
        >
          <option value="all">Disponibilitat</option>
          <option value="available">disponible</option>
          <option value="coming_soon">coming soon</option>
        </select>
      </div>
    </section>
  );
}
