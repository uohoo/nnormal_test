import { QuizStepper } from "@/components/QuizStepper";

export default function QuizPage() {
  return (
    <div className="container-shell space-y-6 py-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-steel">Quiz</p>
        <h1 className="text-4xl font-bold">Troba la teva NNormal ideal</h1>
        <p className="max-w-2xl text-sm font-light text-steel">
          Respon 5 preguntes ràpides. Tindràs una recomanació principal i dues alternatives amb explicació clara.
        </p>
      </header>
      <QuizStepper />
    </div>
  );
}
