# Security Policy

## Supported Versions

TinyLocal Tools is currently in early development.

Security fixes are handled on the `main` branch while the project is early.

| Version | Supported |
| ------- | --------- |
| 0.1.x   | Yes       |

## Reporting a Vulnerability

Please do not open a public GitHub issue for a security vulnerability.

If GitHub private vulnerability reporting is enabled for this repository, please use it to report security issues privately.

If private vulnerability reporting is not available, please open a minimal public issue asking for a private reporting channel. Do not include sensitive details, exploit steps, secrets, personal information, private logs, screenshots containing private data, or API keys in the public issue.

When reporting a vulnerability, please include:

* What happened
* Steps to reproduce the issue
* The browser and operating system used
* Whether the issue occurs in the live demo, local development, or both
* Any screenshots or logs that help explain the issue, only if they do not contain secrets or personal information

## Do Not Share Secrets Publicly

Do not paste passwords, API keys, tokens, private documents, customer data, personal information, or other secrets into public GitHub issues, discussions, pull requests, screenshots, or logs.

## Privacy and Data Handling

TinyLocal Tools is intended to be local-first.

The app is designed to run in the browser without uploading user text to a backend server.

SafePaste uses best-effort browser-side detection. It may miss sensitive information, and it should not be treated as perfect anonymization.

Users are responsible for reviewing the output before sharing it.

## Security Scope

Please report issues related to:

* Unexpected network requests or data uploads
* Unsafe handling of user input
* Cross-site scripting or unsafe rendering risks
* Sensitive data exposure in examples, tests, documentation, screenshots, or demo content
* Incorrect privacy claims
* Dependencies that introduce security concerns

## Project Security Requirements

Project code must not add:

* Backend services
* Databases
* Telemetry or analytics
* Tracking pixels
* External AI API calls
* Silent network uploads of user text

Any network access must be clearly documented, justified, reviewed, and approved before merging.
