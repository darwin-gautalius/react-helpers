import React, { FC, HTMLProps, memo, MutableRefObject, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { createContextWithHook } from './createContextWithHook';
import { useRefresh } from './hooks/useRefresh';

interface PortalContext {
  ref: MutableRefObject<HTMLDivElement | null>;
  propsRef: MutableRefObject<HTMLProps<HTMLDivElement> | null>;
  refresh: () => void;
}

export function createContextualPortal(name: string):
  [FC, FC<HTMLProps<HTMLDivElement>>, FC] {
  const [PortalContext, usePortal] = createContextWithHook<PortalContext>(name);

  const PortalProvider: FC = ({ children }) => {
    const refresh = useRefresh();
    const ref = useRef<HTMLDivElement>(null);
    const propsRef = useRef<HTMLProps<HTMLDivElement>>(null);
    return (
      <PortalContext.Provider value={{ propsRef, ref, refresh }}>
        {children}
      </PortalContext.Provider>
    );
  };

  const PortalPlaceholder = memo<HTMLProps<HTMLDivElement>>((props) => {
    const portal = usePortal();
    return <div ref={portal.ref} />;
  });

  const PortalGate: FC = ({ children }) => {
    const portal = usePortal();

    const refresh = useRefresh();
    useEffect(refresh, []);

    if (!portal.ref.current) {
      return null;
    }

    return createPortal(children, portal.ref.current);
  };

  return [PortalProvider, PortalPlaceholder, PortalGate];
}

