# Re:worthy

## Stack

- pnpm + node
- Vite
- React 19
- eslint/prettier (linter, prettifier)
- shadcn (base components)
- tailwind (style-guides)
- [Future] Zod (runtime validation)
- [Future][Probably] storybook (visual representation of components in bare shell)

## Setup

```
# install nvm
# https://github.com/nvm-sh/nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# install and use needed node version
nvm install
nvm use

# install needed pnpm version
npm i -g pnpm@10.10.0

pnpm i
```

## Git hooks

```bash
# sets git-hooks local path
git config --local core.hooksPath .git-hooks

# makes files executable
chmod +x ./.git-hooks/pre-commit
chmod +x ./.git-hooks/commit-msg
```

### Prefixes:

- [HF] - hot fix
- [F] - Feature
- [BF] - bug fix
- [DX] - improved Developer eXperience
- [R] - refactor
- [CUSTOM] - something unknown but so much wanted

## Project Structure (TBD)
