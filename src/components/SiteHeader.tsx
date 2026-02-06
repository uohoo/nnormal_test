import Link from "next/link";

const links = [
  { href: "/models", label: "Models" },
  { href: "/compare", label: "Comparar" },
  { href: "/quiz", label: "Quiz" },
  { href: "/matrix", label: "Matrix" },
  { href: "/commitment", label: "Compromís" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-sand/95 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link href="/" className="focus-ring text-xl font-bold uppercase tracking-[0.18em]">
          NNormal Finder
        </Link>
        <nav aria-label="Navegació principal" className="hidden gap-5 text-sm font-light sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring rounded-sm px-1 py-1 transition hover:opacity-60"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/quiz"
          className="focus-ring rounded-full border border-ink px-4 py-2 text-xs font-bold uppercase tracking-wide transition hover:bg-ink hover:text-sand"
        >
          Troba la teva
        </Link>
      </div>
    </header>
  );
}
