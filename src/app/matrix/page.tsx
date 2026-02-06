import { MatrixChart } from "@/components/MatrixChart";
import { shoes } from "@/data/shoes";

export default function MatrixPage() {
  return (
    <div className="container-shell space-y-6 py-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-steel">Matrix</p>
        <h1 className="text-4xl font-bold">Distància x Tècnicitat</h1>
        <p className="max-w-2xl text-sm font-light text-steel">
          Clica cada punt per obrir la mini fitxa, comparar o saltar al detall del model.
        </p>
      </header>
      <MatrixChart shoes={shoes} />
    </div>
  );
}
