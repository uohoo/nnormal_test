export default function CommitmentPage() {
  return (
    <div className="container-shell space-y-6 py-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-steel">Commitment</p>
        <h1 className="text-4xl font-bold">Compromís NNormal</h1>
        <p className="max-w-2xl text-sm font-light text-steel">
          Resum clar de durabilitat, reparació i model de negoci responsable.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-[var(--border)] bg-white p-5">
          <h2 className="text-xl font-bold">Durabilitat real</h2>
          <p className="mt-2 text-sm font-light leading-relaxed">
            Productes pensats per durar més quilòmetres, amb materials robustos i prioritat en resistència.
          </p>
        </article>

        <article className="rounded-2xl border border-[var(--border)] bg-white p-5">
          <h2 className="text-xl font-bold">Reparació</h2>
          <p className="mt-2 text-sm font-light leading-relaxed">
            Facilitar reparacions allarga la vida de la sabata i redueix residus abans d&apos;un reemplaçament complet.
          </p>
        </article>

        <article className="rounded-2xl border border-[var(--border)] bg-white p-5">
          <h2 className="text-xl font-bold">Take-back</h2>
          <p className="mt-2 text-sm font-light leading-relaxed">
            Recuperació de producte al final del cicle per reduir impacte i impulsar processos circulars.
          </p>
        </article>

        <article className="rounded-2xl border border-[var(--border)] bg-white p-5">
          <h2 className="text-xl font-bold">Fair business</h2>
          <p className="mt-2 text-sm font-light leading-relaxed">
            Decisions de negoci orientades a llarg termini: menys rotació buida, més valor real per a usuaris i entorn.
          </p>
        </article>
      </section>
    </div>
  );
}
