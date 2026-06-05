# Contributing

Thanks for helping with TinyLocal Tools.

## Project Rules

TinyLocal Tools is a local-first browser app. Changes must keep user text on the
user's device unless the user clearly chooses otherwise.

Do not add:

- Backend services.
- Databases.
- Telemetry or analytics.
- External AI APIs.
- Hidden network calls.

## Before Opening a Pull Request

Run:

```sh
npm install
npm run lint --if-present
npm test
npm run build
```

After `package-lock.json` exists, prefer `npm ci` for repeatable installs.

## Pull Request Tips

- Keep changes small and clear.
- Explain what changed and why.
- Add tests for behavior changes when practical.
- Update docs when user-facing behavior changes.

## Code of Conduct

By contributing, you agree to follow `CODE_OF_CONDUCT.md`.
