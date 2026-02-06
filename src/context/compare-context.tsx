"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { shoes, shoeById, type Shoe } from "@/data/shoes";

const STORAGE_KEY = "nnormal_compare_ids";
export const MAX_COMPARE = 3;

type CompareContextValue = {
  selectedIds: string[];
  selectedShoes: Shoe[];
  isSelected: (id: string) => boolean;
  canSelectMore: boolean;
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
};

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as string[];
      const valid = parsed.filter((id) => shoes.some((shoe) => shoe.id === id)).slice(0, MAX_COMPARE);
      setSelectedIds(valid);
    } catch {
      setSelectedIds([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedIds));
  }, [selectedIds]);

  const toggleCompare = useCallback((id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((value) => value !== id);
      }
      if (prev.length >= MAX_COMPARE) {
        return prev;
      }
      return [...prev, id];
    });
  }, []);

  const clearCompare = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const isSelected = useCallback(
    (id: string) => {
      return selectedIds.includes(id);
    },
    [selectedIds]
  );

  const selectedShoes = useMemo(() => {
    return selectedIds.map((id) => shoeById.get(id)).filter((shoe): shoe is Shoe => Boolean(shoe));
  }, [selectedIds]);

  const value = useMemo<CompareContextValue>(
    () => ({
      selectedIds,
      selectedShoes,
      isSelected,
      canSelectMore: selectedIds.length < MAX_COMPARE,
      toggleCompare,
      clearCompare
    }),
    [selectedIds, selectedShoes, isSelected, toggleCompare, clearCompare]
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used inside CompareProvider");
  }
  return context;
}
