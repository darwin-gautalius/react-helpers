import { useContext, Context, createContext } from 'react';

export function createContextWithHook<T>(identifer: string): [Context<T | undefined>, () => T] {
  const context = createContext<T | undefined>(undefined);
  context.displayName = identifer;
  const useContextValue = () => {
    const value = useContext(context);
    if (value === undefined) {
      throw new Error(`Cannot find context: ${identifer}.`);
    }
    return value;
  };

  return [context, useContextValue];
}
