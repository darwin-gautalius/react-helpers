import { useCounter } from './useCounter';

export function useRefresh() {
  return useCounter()[1];
}
