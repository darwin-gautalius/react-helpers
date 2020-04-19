# React Maid

A collection of simple helpers to make my own life easier when coding React.

## How to install:

```bash
npm install react-maid --save
```

## Usage

### Create Context and its hooks
```tsx
import { createContextWithHook } from 'react-maid';

export const [MyContext, useMyContext] = createContextWithHook('MyContext');
```

### Create Contextual Portal
```tsx
import { createContextualPortal } from 'react-maid';

export const [MyPortalProvider, MyPortalPlaceholder, MyPortalGate] = createContextualPortal('MyPortal');
```
