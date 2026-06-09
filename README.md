# TinyLocal Tools

## Live Demo

[Open TinyLocal Tools](https://kota-e.github.io/tinylocal-tools/?tool=pastefix)

TinyLocal Tools runs entirely in your browser. Your text is not uploaded to a server.

TinyLocal Tools is a small, local-first browser app for people who need to clean,
mask, and reshape text before they paste or share it.

It includes three tools:

- **PasteFix**: clean messy copied text from PDFs, websites, emails, and notes.
- **SafePaste**: mask common sensitive information before sharing text.
- **Markdown Table Fixer**: repair and format Markdown, CSV, and TSV tables.

TinyLocal Tools is open source, static, and made to run in your browser.

## Privacy And Safety

TinyLocal Tools is designed to keep your text on your device by default.

- No backend
- No database
- No analytics
- No telemetry
- No accounts
- No scraping
- No external AI API calls
- No hidden upload of your text or files

The app code works in the browser. It does not send your pasted text to a server.
If you host the app somewhere, that host may still keep normal web access logs,
but TinyLocal Tools itself does not track users or store input history.

**SafePaste is best-effort.** It can help hide common patterns like email
addresses, phone numbers, API-key-like text, and other risky snippets, but it is
not perfect anonymization. Always review the result before sharing it.

## Japanese Explanation

TinyLocal Tools は、文章をきれいにしたり、見せたくない情報をかくしたり、
表を直したりする、小さなブラウザアプリです。

文章は、ふつうはあなたのブラウザの中だけで処理されます。サーバー、外部AI、
データベース、アクセス解析には送りません。

SafePaste は「できるだけ見つけてかくす」道具です。完璧ではないので、
共有する前に、結果を自分の目で確認してください。

## Who This Is For

TinyLocal Tools is for:

- Writers, researchers, students, and support teams who copy text from many places.
- People who want to clean text before pasting it into another app.
- People who need a quick privacy check before sharing text with others.
- Developers and documentation writers who often fix Markdown tables.
- Anyone who wants simple text tools without accounts, tracking, or server upload.

## Use Cases

- Clean text before pasting it into AI tools.
- Fix copied PDF or website text that has broken lines or odd spacing.
- Mask sensitive information before sharing a message, ticket, bug report, or note.
- Fix Markdown, CSV, or TSV tables so they are easier to read and paste.
- Prepare cleaner text for email, chat, documentation, GitHub issues, or notes.

## Screenshots And Demo GIFs

Actual screenshots and demo GIFs will be added as the public release page is
prepared.

| Tool | Placeholder |
| --- | --- |
| PasteFix | Screenshot placeholder: Paste messy text, then copy cleaned text. |
| SafePaste | Screenshot placeholder: Mask sensitive-looking text before sharing. |
| Markdown Table Fixer | Screenshot placeholder: Repair and format a pasted table. |
| Full app demo | Demo GIF placeholder: Switch between the three tools. |

## The Tools

### PasteFix

PasteFix helps clean copied text that has broken lines, extra spaces, or strange
paragraph breaks. It is useful when copying from PDFs, web pages, emails, and
documents.

### SafePaste

SafePaste helps mask common sensitive patterns before you share text. It is for
reducing risk, not for proving that text is fully anonymous.

### Markdown Table Fixer

Markdown Table Fixer helps repair and align Markdown tables. It can also help
turn CSV or TSV table text into readable Markdown.

## How To Run It Locally

Install dependencies:

```sh
npm install
```

Run the app:

```sh
npm run dev
```

Build the static app:

```sh
npm run build
```

The built files are placed in `dist/`.

## Development Checks

```sh
npm run lint --if-present
npm test
npm run build
```

## Deployment

TinyLocal Tools is a static app. It can be deployed to GitHub Pages or another
static host by building the app and publishing the `dist/` folder.

## Contributing

Issues and pull requests are welcome. Please read `CONTRIBUTING.md` before
sending changes.

## Security

Please read `SECURITY.md` before reporting security problems. Do not paste
secrets into public GitHub issues.

## License

MIT. See `LICENSE`.
