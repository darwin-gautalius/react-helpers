import { useState, useCallback } from "react";

export function useLocalStorage<T>(key: string): [T | undefined, (value: T) => void];
export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void];
export function useLocalStorage<T>(key: string, defaultValue?: T, adapter = JSON): [T, (value: T) => void] {
  const [item, setItem] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      return adapter.parse(saved);
    }
    return defaultValue;
  });

  const persistItem = useCallback((value: T) => {
    setItem(value);
    localStorage.setItem(key, adapter.stringify(value));
  }, [adapter, key]);

  return [item, persistItem];
}
