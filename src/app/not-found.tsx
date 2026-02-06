import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-shell py-16 text-center">
      <h1 className="text-4xl font-bold">Model no trobat</h1>
      <p className="mt-3 text-sm font-light text-steel">Revisa l&apos;URL o torna al catàleg.</p>
      <Link
        href="/models"
        className="focus-ring mt-5 inline-flex rounded-full border border-ink px-4 py-2 text-xs font-bold uppercase tracking-wide"
      >
        Anar al catàleg
      </Link>
    </div>
  );
}
