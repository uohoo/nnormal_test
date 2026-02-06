# NNormal Shoe Finder

Aplicació Next.js (App Router) per comparar models NNormal, ajudar l'usuari a triar sabata segons ús real i portar-lo cap a compra.

## Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- `next/image` amb `remotePatterns` per:
  - `https://cloud.nnormal.com/**`
  - `https://www.nnormal.com/**`
- Radar charts fets amb SVG pur (`src/components/RadarChart.tsx`)

## Rutes

- `/` Home amb hero, CTAs, featured shoes i preview de matrix
- `/models` Catàleg amb filtres + afegir a comparador
- `/models/[id]` Detall de model amb galeria, specs, radar i CTA
- `/compare` Comparació fins a 3 models (radar overlay + taula + diferències)
- `/quiz` Quiz de 5 preguntes amb recomanació + 2 alternatives
- `/matrix` Matrix interactiva Distància x Tècnicitat
- `/commitment` Pàgina informativa de compromís

## Instal·lació

Prerequisit: Node.js 18.17+ (recomanat Node 20 LTS).

### Amb pnpm (recomanat)

```bash
pnpm install
pnpm dev
```

### Amb npm

```bash
npm install
npm run dev
```

Obre [http://localhost:3000](http://localhost:3000).

## Build de producció

```bash
pnpm build
pnpm start
```

## Fonts `Modelo`

La tipografia està implementada amb `next/font/local` a `src/app/layout.tsx` i variable CSS `--font-modelo`.

Has de col·locar els fitxers reals en:

- `public/fonts/ModeloBold.woff2`
- `public/fonts/ModeloRegular.woff2`
- `public/fonts/ModeloLight.woff2`
- `public/fonts/ModeloThin.woff2`

El repositori inclou placeholders buits perquè el path existeixi; substitueix-los pels arxius oficials per renderitzat correcte de marca.

Si els fitxers no són vàlids, el navegador farà fallback a fonts de sistema.

## Dades de producte

- Dataset principal: `src/data/shoes.ts`
- Inclou els 7 models inicials, imatges oficials, puntuacions i links de compra.
- Lògica de recomanació del quiz: `src/lib/quiz.ts`

## Components reutilitzables

- `src/components/ShoeCard.tsx`
- `src/components/SpecsTable.tsx`
- `src/components/FilterBar.tsx`
- `src/components/CompareDrawer.tsx`
- `src/components/QuizStepper.tsx`
- `src/components/ResultCard.tsx`
- `src/components/RadarChart.tsx`
- `src/components/MatrixChart.tsx`

## Accessibilitat i UX

- Navegació de teclat i focus rings visibles
- Controls amb `aria-label` en punts interactius
- Disseny mobile-first i responsive
