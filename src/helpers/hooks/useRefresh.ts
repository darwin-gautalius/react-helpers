import { useCallback, useState } from 'react';

export function useRefresh() {
  const [, setValue] = useState(0);
  return useCallback(() => setValue(value => ++value), []);
}
