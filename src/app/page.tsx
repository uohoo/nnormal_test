import Link from "next/link";
import { MatrixChart } from "@/components/MatrixChart";
import { ShoeCard } from "@/components/ShoeCard";
import { shoes } from "@/data/shoes";

export default function HomePage() {
  const featured = shoes.filter((shoe) => shoe.status !== "coming_soon").slice(0, 3);

  return (
    <div className="space-y-16 py-8 sm:py-10">
      <section className="container-shell rounded-3xl border border-[var(--border)] bg-white p-6 sm:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-steel">NNormal Shoe Finder</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
          Tria la sabata de trail adequada i compra amb més confiança.
        </h1>
        <p className="mt-4 max-w-2xl text-base font-light text-steel sm:text-lg">
          Compara models, visualitza la shoe matrix i fes el quiz en 5 passos per trobar la millor opció per al teu terreny.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/compare"
            className="focus-ring rounded-full bg-ink px-5 py-3 text-sm font-bold uppercase tracking-wide text-sand"
          >
            Comparar models
          </Link>
          <Link
            href="/quiz"
            className="focus-ring rounded-full border border-ink px-5 py-3 text-sm font-bold uppercase tracking-wide"
          >
            Fer quiz
          </Link>
        </div>
      </section>

      <section className="container-shell space-y-4">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-3xl font-bold">Models destacats</h2>
          <Link href="/models" className="focus-ring text-sm uppercase tracking-wide text-steel hover:text-ink">
            Veure catàleg complet
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((shoe) => (
            <ShoeCard key={shoe.id} shoe={shoe} compact />
          ))}
        </div>
      </section>

      <section className="container-shell">
        <MatrixChart shoes={shoes} preview />
      </section>
    </div>
  );
}
