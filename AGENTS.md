# Agent Instructions

TinyLocal Tools is a local-first browser app.

The user is not deeply familiar with coding. Explain work in simple words, as if
talking to a 10-year-old.

## Project Purpose

Build and maintain a small, useful, open-source static app with three tools:
PasteFix, SafePaste, and Markdown Table Fixer.

## Architecture Rules

- Use Vite, React, TypeScript, and plain CSS.
- Keep pure text-processing logic separate from React UI.
- Keep tools small, readable, and local-first.
- Do not add a backend, database, telemetry, analytics, scraping, hidden data
  persistence, or external AI API unless explicitly requested.
- Do not make separate incompatible implementations.

## Product Rules

- Do not add a backend.
- Do not add a database.
- Do not add telemetry or analytics.
- Do not add external AI API calls.
- Do not silently upload user text.
- Keep user text on the user's device by default.

## Privacy Requirements

- App code must not send user text or files to a server.
- Do not store input history.
- If storage is added, store only non-sensitive preferences.
- SafePaste must say detection is best-effort, not perfect anonymization.

## Testing Requirements

- Core logic must be pure functions and unit-tested.
- Add tests for new text cleaning, masking, and table formatting behavior.
- Run lint, test, and build after meaningful changes.

## Accessibility Requirements

- Use proper labels for controls.
- Keep controls keyboard usable.
- Keep focus states visible.
- Keep color contrast readable.
- Use status text or `aria-live` for copy messages.

## Repository Rules

- Keep changes small and easy to review.
- Do not overwrite another agent's work.
- Prefer clear user-facing text over clever wording.
- Run relevant checks before finishing.

## Windows Batch File Rule

When creating or editing Windows `.bat` or `.cmd` files, always make them safe
for Windows `cmd.exe`.

- Use Windows line endings: CRLF, not LF-only.
- Prefer ASCII text in batch files unless Japanese text is truly needed.
- After editing a batch file, convert it with PowerShell:

```powershell
$p = "path\to\file.bat"
$text = Get-Content -LiteralPath $p -Raw
$text = $text -replace "`r?`n", "`r`n"
Set-Content -LiteralPath $p -Value $text -NoNewline -Encoding Ascii
```

- Before asking the user to double-click a batch file, test it with:

```powershell
cmd /c path\to\file.bat
```

- If the script is expected to pause, make sure it reaches the first visible
  `echo` lines and creates its log file.

Reason: LF-only batch files can be read incorrectly by Windows `cmd.exe`, which
can make the command window flash and close immediately.
