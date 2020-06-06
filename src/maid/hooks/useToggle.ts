import { useState } from 'react';

export function useToggle(defaultValue = false): [boolean, VoidFunction] {
  const [toggle, setToggle] = useState<boolean>(defaultValue);
  return [toggle, () => setToggle((current) => !current)];
}
