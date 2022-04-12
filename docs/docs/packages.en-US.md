# Project structure

The project is based on `yarn` to build a basic working environment, each hook is maintained separately, using the `use` prefix,

Make sure the package name is in the format of `chooks`

```bash

packages
│   ├── action-pending
│   ├── window-size
│   ├── foo-bar
│   └── xxx-xxx

```

Each package should named export at least one hook like:

```js
import { useCookie } from 'chocolate-hooks';
```

## Unit Tests

Unit tests are recommended, they are placed inside src/__tests__ folder with an extension of .test.js.