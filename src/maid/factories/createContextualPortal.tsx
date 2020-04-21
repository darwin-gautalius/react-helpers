import React, { FC, HTMLProps, memo, MutableRefObject, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { createContextWithHook } from './createContextWithHook';
import { useRefresh } from '../hooks/useRefresh';

export function createContextualPortal(name: string):
  [FC, FC<HTMLProps<HTMLDivElement>>, FC] {
  const [PortalContext, usePortal] = createContextWithHook<MutableRefObject<HTMLDivElement | null>>(name);

  const PortalProvider: FC = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    return (
      <PortalContext.Provider value={ref}>
        {children}
      </PortalContext.Provider>
    );
  };

  const PortalPlaceholder = memo<HTMLProps<HTMLDivElement>>((props) => {
    const portal = usePortal();
    return <div ref={portal} />;
  });

  const PortalGate: FC = ({ children }) => {
    const portalRef = usePortal();

    const refresh = useRefresh();
    useEffect(refresh, []);

    if (!portalRef.current) {
      return null;
    }

    return createPortal(children, portalRef.current);
  };

  return [PortalProvider, PortalPlaceholder, PortalGate];
}

