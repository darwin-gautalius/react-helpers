import React, { FC, HTMLProps, memo, MutableRefObject, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { createContextWithHook } from './createContextWithHook';
import { useRefresh } from '../hooks/useRefresh';

interface PortalContext {
  ref: MutableRefObject<HTMLDivElement | null>;
  refresh: () => void;
}

export function createContextualPortal<T = {}>(name: string):
  [FC<T>, FC<HTMLProps<HTMLDivElement>>, FC, () => PortalContext & T] {
  const [PortalContext, usePortal] = createContextWithHook<PortalContext & T>(name);

  const PortalProvider: FC<T> = ({ children, ...extra }) => {
    const refresh = useRefresh();
    const ref = useRef<HTMLDivElement>(null);
    return (
      <PortalContext.Provider value={{ ...(extra as T), ref, refresh }}>
        {children}
      </PortalContext.Provider>
    );
  };

  const PortalPlaceholder = memo<HTMLProps<HTMLDivElement>>(() => {
    const { refresh, ref } = usePortal();
    useEffect(() => {
      refresh();
      return () => refresh();
    }, [refresh]);

    return <div ref={ref} />;
  });

  const PortalGate: FC = ({ children }) => {
    const { ref } = usePortal();
    if (!ref.current) {
      return null;
    }

    return createPortal(children, ref.current);
  };

  return [PortalProvider, PortalPlaceholder, PortalGate, usePortal];
}

