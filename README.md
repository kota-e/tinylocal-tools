# TinyLocal Tools

TinyLocal Tools is a local-first browser app for cleaning, protecting, and
sharing text. It is a small open-source MVP with three practical tools in one
static web app.

It helps people who copy text from PDFs, websites, emails, documents, AI tools,
support tickets, GitHub issues, and notes.

## Tools

- **PasteFix** cleans messy copied text while trying to preserve paragraph
  meaning.
- **SafePaste** masks common sensitive patterns before text is shared.
- **Markdown Table Fixer** repairs and formats Markdown, CSV, and TSV tables.

## Privacy

TinyLocal Tools runs in the browser. User text and files are not uploaded. The
app has no backend, database, telemetry, analytics, accounts, scraping, or
external AI API calls.

SafePaste is best-effort. It can miss sensitive information, so users should
review output before sharing it.

## Screenshots

Screenshots will be added after the first public release.

## Principles

- Local-first: text should stay on the user's device.
- Private by default: no tracking, analytics, or telemetry.
- Simple tools: each feature should be easy to understand and undo.
- No external AI APIs: features must not send user text to remote AI services.

## Quick Start

Install dependencies:

```sh
npm install
```

After `package-lock.json` exists, `npm ci` is the recommended repeatable
install command.

Run the app locally:

```sh
npm run dev
```

## Development Commands

```sh
npm run lint --if-present
npm test
npm run build
```

## Build

```sh
npm run build
```

The built static files are placed in `dist/`.

## Test

```sh
npm test
```

## Deployment

TinyLocal Tools is a static app. It can be deployed to GitHub Pages or any
static host by building the app and publishing the `dist/` folder.

## Contributing

Issues and pull requests are welcome. Please read `CONTRIBUTING.md` before
sending changes.

## Security

Please read `SECURITY.md` before reporting security problems. Do not paste
secrets into public GitHub issues.

## Japanese

TinyLocal Tools は、文章をきれいにし、見せたくない情報をかくし、共有しやすくする小さなブラウザアプリです。
文章はブラウザ内で処理され、サーバーへアップロードされません。

## License

MIT. See `LICENSE`.
