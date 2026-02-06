"use client";

import type { ReactNode } from "react";
import { CompareProvider } from "@/context/compare-context";

export function Providers({ children }: { children: ReactNode }) {
  return <CompareProvider>{children}</CompareProvider>;
}
