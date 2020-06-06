import { Ref } from 'react';

export function composeRef<T>(refs: (Ref<T | null> | undefined)[]) {
  return (current: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(current);
      } else if (ref) {
        (ref as any).current = current;
      }
    });
  };
}
