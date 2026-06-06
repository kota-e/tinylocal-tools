# TinyLocal Tools Reddit / Hacker News Launch Drafts

## Hacker News: Show HN

### Title

Show HN: TinyLocal Tools - local-first text cleanup, masking, and table repair

### Post

Hi HN,

I built TinyLocal Tools, a small local-first browser app for the annoying work that often happens right before pasting text somewhere else.

It has three tools:

- PasteFix: cleans copied text from PDFs, websites, emails, and notes
- SafePaste: masks common sensitive-looking patterns before sharing text
- Markdown Table Fixer: repairs and formats Markdown, CSV, and TSV tables

The main idea is privacy and simplicity. There is no backend, database, analytics, telemetry, account system, scraping, or external AI API. The text processing runs in the browser, and the app does not upload pasted text to a server.

SafePaste is best-effort, not perfect anonymization. It can help catch common patterns like email addresses, phone numbers, and API-key-like strings, but users still need to review the result before sharing.

I made this for the everyday moments where copied text is messy, a bug report may contain something sensitive, or a Markdown table is just broken enough to be annoying.

Feedback welcome, especially on the text-cleaning defaults and masking patterns.

## Reddit: r/opensource

### Title

TinyLocal Tools: an open-source local-first app for cleaning and masking text before sharing

### Post

I made TinyLocal Tools, a small open-source browser app for people who often copy, clean, and share text.

It is meant for simple everyday problems:

- copied PDF or web text has broken lines and odd spacing
- a support message, bug report, or note may contain sensitive information
- a Markdown, CSV, or TSV table needs to be cleaned up before posting

The app includes:

- PasteFix for cleaning messy copied text
- SafePaste for masking common sensitive-looking patterns
- Markdown Table Fixer for repairing and formatting tables

Privacy was the main design constraint. TinyLocal Tools has no backend, no database, no analytics, no telemetry, no accounts, no scraping, and no external AI API. Text processing happens in the browser, and the app does not upload pasted text.

Important note: SafePaste is best-effort. It is not perfect anonymization. It can reduce obvious risks, but you should still review the output before sharing.

I would be glad to hear feedback on the tool names, masking behavior, and which text-cleaning cases should be handled first.

## Reddit: r/webdev

### Title

I built a tiny local-first React app for cleaning text, masking sensitive snippets, and fixing Markdown tables

### Post

I built TinyLocal Tools, a small static browser app made with Vite, React, TypeScript, and plain CSS.

The app solves a very practical problem: text is often not ready to paste.

Examples:

- copied PDF text has weird line breaks
- a GitHub issue or support ticket may contain an email address, phone number, or API-key-like string
- a Markdown table from CSV/TSV is hard to read

TinyLocal Tools has three tools:

- PasteFix: clean copied text
- SafePaste: mask common sensitive-looking patterns
- Markdown Table Fixer: repair and format Markdown, CSV, and TSV tables

I kept it static and local-first. There is no backend, database, analytics, telemetry, account system, scraping, or external AI API. The app code runs in the browser and does not upload pasted text.

SafePaste is only best-effort, not perfect anonymization. It is meant to help reduce mistakes, not to replace careful review.

I am especially interested in feedback on edge cases for copied text and Markdown table cleanup.

## Short HN Comment Reply

TinyLocal Tools is intentionally small. The goal is not to replace heavier privacy or DLP tools. It is for the common moment before sharing text, where you want to clean messy copied content, mask obvious sensitive-looking snippets, or fix a Markdown table without sending the text to a server.

SafePaste is best-effort and can miss things, so the app tells users to review the result before sharing.

## Short Reddit Reply

The privacy part is the main reason I made it local-first. TinyLocal Tools has no backend or analytics, and the pasted text is processed in the browser. SafePaste can help catch common patterns, but it is not perfect anonymization, so review is still needed before sharing.
