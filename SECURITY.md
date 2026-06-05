# Security Policy

## Supported Versions

Security fixes are handled on the main branch while the project is early.

## Reporting a Vulnerability

Please do not open a public issue for a security problem.

Email the maintainers, or use GitHub's private vulnerability reporting if it is
enabled for this repository.

Please include:

- What happened.
- Steps to reproduce it.
- The browser and operating system used.
- Any screenshots or logs that help explain the issue.

Do not paste passwords, API keys, tokens, private documents, or other secrets
into public GitHub issues.

## Privacy and Data Handling

TinyLocal Tools is intended to be local-first.

SafePaste uses best-effort browser-side detection. It may miss sensitive
information, and it should not be treated as perfect anonymization.

Project code must not add:

- Backend services.
- Databases.
- Telemetry or analytics.
- Tracking pixels.
- External AI API calls.
- Silent network uploads of user text.

Any network access must be clearly documented and reviewed before merging.
