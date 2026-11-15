---
paths:
  - "src/app/api/**"
  - "src/app/**/actions/**"
  - "src/app/utils/privateConstants.ts"
  - "src/app/utils/htmlHandler.ts"
  - "src/app/components/lib/**"
  - "next.config.ts"
---

# Backend Rules: Security

These extend `.claude/rules/general-rules.md` and `backend-rules.md`. Every agent follows them. The code-reviewer checks them on every review.

## 1. Secrets and environment variables

- **Never hard-code** secrets (API keys, access keys, tokens, passwords, webhook secrets) in source files, constants or tests.
- **Server-only secrets** live in `.env` (git-ignored by `.env*`) and are read through `process.env`, in **one place**: `src/app/utils/privateConstants.ts` (it doesn't exist yet). That file exports them as UPPER_SNAKE_CASE constants (`export const FORMS_ACCESS_KEY = process.env.FORMS_ACCESS_KEY || ''`).
- **Server only.** `privateConstants.ts` may be imported only by server code: pages, layouts, server actions and route handlers. Never import it from a `'use client'` file.
- **Public values.** Only values that are safe to expose may use the `NEXT_PUBLIC_` prefix. They are copied into the browser code at build time, so the `.env` on the computer that runs `yarn build:standalone` must have them. Today that is `NEXT_PUBLIC_W3FORMS_ACCESS_KEY`, which Web3Forms designs to be public.
- **Document variable names.** List every variable name (never its value) in the README's environment variables table.
- **Do not read or print** `.env*` files. To check that a variable is set, count matches without printing the value (`grep -c '^NAME=.' .env`).
- **Never log a secret,** not even while debugging.

## 2. CMS content

- **Sanitize every CMS HTML string.** `html-react-parser` turns HTML into React elements, but it does **not** sanitize. All CMS HTML goes through `parseCmsHtml()` in `src/app/utils/htmlHandler.ts`, which:
  - removes active and form tags (`script`, `style`, `object`, `embed`, `form`, `input`, `button` and others);
  - removes `on*` event attributes and `srcdoc`;
  - removes `javascript:`, `vbscript:` and `data:` URLs (`data:image/` stays allowed in `<img>`). Before checking, it strips the whitespace and control characters that browsers ignore in URLs (`IGNORED_URL_CHARACTERS`), so a disguised scheme such as `java\nscript:` is caught too. Never remove that step;
  - allows iframes only from YouTube, Vimeo and Twitch, over https;
  - adds `rel='noopener noreferrer'` to links that open in a new tab.
- **Changes to the sanitizer** need tests for the new behavior (qa-engineer) and the user's approval when they allow more tags, attributes, URL schemes or iframe hosts.
- **No `dangerouslySetInnerHTML`,** and no direct use of `html-react-parser` outside `htmlHandler.ts`.
- **Public data only.** The site queries only published, public content. Draft, private or preview content needs authenticated server-side requests and explicit user approval.

## 3. Requests and inputs

- **Server-side secrets.** Requests that carry a secret run on the server (server action or route handler). They never run from client components.
- **Validate everything.** Check all external input (form fields, route params, query strings, webhook bodies) for type, length and format on the server. Validation in the browser is only for user experience.
- **Webhooks and revalidation** (none yet) check a shared secret header. When the check fails, they return 401 without explaining why.
- **Error responses** never include stack traces, internal messages or upstream response bodies.
- **External links** opened with `target='_blank'` include `rel='noopener noreferrer'`.

## 4. CMS-side expectations

These belong to the database-specialist and are listed here for awareness:

- WPGraphQL exposes only the post types and ACF fields the site needs ("Show in GraphQL" is off for everything else).
- `yarn codegen` reads the schema from the public endpoint, so turning off public introspection would stop Codegen until it authenticates. Ask the user before changing either.
- WordPress authentication (Application Passwords) is used only from the server or by the main agent for approved CMS work, never from browser code.

## 5. Dependencies

- **Follow the package policy** in general-rules section 4. Check every proposed package for known security advisories.
- **Never commit** `.env*` files, keys or credentials. Before a release commit, check that nothing from `.env*` is staged.
