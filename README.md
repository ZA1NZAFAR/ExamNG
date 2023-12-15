# ExamNG

This monoproject uses PNPM to manage its javascript project.

## How to deploy on local machine

### Prequisites

1. Git
2. Node.js v20.10.0
3. Download [PNPM](https://pnpm.io/installation).


### Install dependencies
```bash
pnpm i
```

### Set up environment variable file
For frontend: ``./frontend/frontend/.env.development.local``
Check the format in the config file in ``./frontend/frontend/config/envConfig.ts``

### Run the development server for frontend
```bash
pnpm frontend dev
```

### Run linter regularly to fix issues (lint will run at every commit!)
```bash
pnpm lint
```

