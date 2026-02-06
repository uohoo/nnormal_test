"use client";

import { useMemo, useState } from "react";
import { getQuizRecommendation, quizQuestions, type QuizAnswers } from "@/lib/quiz";
import { ResultCard } from "@/components/ResultCard";

const initialAnswers: Partial<QuizAnswers> = {};

export function QuizStepper() {
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>(initialAnswers);
  const [step, setStep] = useState(0);

  const isComplete = step >= quizQuestions.length;
  const current = isComplete ? null : quizQuestions[step];

  const progress = Math.min((step / quizQuestions.length) * 100, 100);
  const result = useMemo(() => {
    if (!isComplete) return null;
    return getQuizRecommendation(answers as QuizAnswers);
  }, [answers, isComplete]);

  function onSelect(value: QuizAnswers[keyof QuizAnswers]) {
    if (!current) {
      return;
    }
    const updated = { ...answers, [current.id]: value } as Partial<QuizAnswers>;
    setAnswers(updated);
    setStep((prev) => Math.min(prev + 1, quizQuestions.length));
  }

  function onBack() {
    setStep((prev) => Math.max(prev - 1, 0));
  }

  function resetQuiz() {
    setAnswers(initialAnswers);
    setStep(0);
  }

  if (isComplete && result) {
    return (
      <section className="space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-steel">Resultat</p>
          <h2 className="text-3xl font-bold">Recomanació principal</h2>
          <p className="max-w-2xl text-sm font-light text-steel">
            Segons les teves respostes, aquesta combinació optimitza tracció, confort i intenció d&apos;ús.
          </p>
        </header>

        <ResultCard shoe={result.recommendation.shoe} score={result.recommendation.score} highlight />

        <div className="rounded-2xl border border-[var(--border)] bg-white p-4">
          <h3 className="text-lg font-bold">Per què aquesta opció?</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm font-light">
            {result.explanation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <section className="space-y-3">
          <h3 className="text-lg font-bold">2 alternatives</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {result.alternatives.map((item) => (
              <ResultCard key={item.shoe.id} shoe={item.shoe} score={item.score} />
            ))}
          </div>
        </section>

        <button
          type="button"
          onClick={resetQuiz}
          className="focus-ring rounded-full border border-ink px-5 py-2 text-sm font-bold uppercase tracking-wide"
        >
          Repetir quiz
        </button>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-white p-4 sm:p-6">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-steel">
          Pregunta {step + 1} / {quizQuestions.length}
        </p>
        <div className="h-2 w-full overflow-hidden rounded-full bg-sand">
          <span className="block h-full rounded-full bg-ink" style={{ width: `${progress}%` }} />
        </div>
        <h2 className="text-2xl font-bold">{current?.title}</h2>
      </header>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {current?.options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className="focus-ring rounded-xl border border-[var(--border)] bg-sand px-4 py-4 text-left text-base font-bold uppercase tracking-wide transition hover:border-ink hover:bg-white"
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={step === 0}
          className="focus-ring rounded-full border border-ink px-4 py-2 text-xs font-bold uppercase tracking-wide disabled:cursor-not-allowed disabled:opacity-40"
        >
          Enrere
        </button>
        <button
          type="button"
          onClick={resetQuiz}
          className="focus-ring rounded-full border border-[var(--border)] px-4 py-2 text-xs uppercase tracking-wide"
        >
          Reiniciar
        </button>
      </div>
    </section>
  );
}
