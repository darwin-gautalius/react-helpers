import { useState, useCallback } from 'react';

export function useCounter(defaultValue = 0): [number, VoidFunction, VoidFunction] {
  const [counter, setCounter] = useState(defaultValue);
  return [
    counter,
    useCallback(() => setCounter((current) => ++current), []),
    useCallback(() => setCounter(defaultValue), [defaultValue]),
  ];
}