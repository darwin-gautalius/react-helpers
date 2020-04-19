# React Maid

A collection of simple helpers to make my own life easier when coding React.

## How to install:

```
npm install react-maid --save
```

## Usage

### Create Context and its hooks
```
import { createContextWithHook } from 'react-maid';

export const [MyContext, useMyContext] = createContextWithHook('MyContext');
```

### Create Contextual Portal
```
import { createContextualPortal } from 'react-maid';

export const [MyPortalProvider, MyPortalPlaceholder, MyPortalGate] = createContextualPortal('MyPortal');
```
