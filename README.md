# ExamNG

This monoproject uses PNPM to manage its javascript project.

## How to deploy on local machine

### Prequisites

1. Git
2. Node.js v20.10.0
3. Download [PNPM](https://pnpm.io/installation).

### Clone and checkout branch
```bash
git clone https://github.com/ZA1NZAFAR/ExamNG.git
git checkout frontend
```

### Install dependencies
```bash
pnpm i
```

### Set up environment variable file
For frontend: ``./app/frontend/.env.development.local``.
Check the format in the config file in ``./app/frontend/config/envConfig.ts``

## Development tips

### Running PNPM commands
All pnpm commands can be launched directly on root directory of ExamNG.
Use ``pnpm front`` prefix to launch npm commands in frontend project
(no need to change directory ``cd frontend && npm <command>``). For example:

#### Run the development server for frontend
```bash
pnpm front dev // Instead of using cd frontend && npm run dev
```

#### Add a new dependency for frontend:
```bash
pnpm front add <pkg-name>    // add prod dependency
pnpm front add -D <pkg-name> // add dev dependency
```

#### Other commands for frontend
```bash
pnpm front <command> // check the respective package.json for all npm commands available
```

### Run linter regularly to fix issues (lint will also run at every commit!)
```bash
pnpm lint
```

### Add a new microservice
In case of adding new microservice, make sure to move it into ``./app/`` directory.
This will allow pnpm to manage packages (in case of a nodeJS project) or launching commands.
Add respective prefix in the root ``package.json`` file to simplify commands.
