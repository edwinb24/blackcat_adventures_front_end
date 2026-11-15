# AGENTS.md

## Project

Black Cat Adventures website (blackcat-adventures.com): TTRPG modules, organized events and DMing services. The content comes from a **headless WordPress CMS** (`cms.blackcat-adventures.com`) through **WPGraphQL** with **ACF** fields. The front end is built with **Next.js 16 (App Router)**, **React 19** and **TypeScript** (strict). The CMS is queried with **Apollo Client**, on the server only. Styling is **plain CSS Modules**. All application code is in `src/app/`. The package manager is **Yarn**. Never use npm, pnpm or bun to install packages.

**All generated code, from you or from any subagent, must follow the project conventions below.** Much of the existing code is older than these rules. Section 1 of `general-rules.md` says how to handle it: TypeScript files you modify are brought fully into compliance, but legacy CSS values are only fixed in visual tasks.

## Where the standards are

| Standard | Location |
|---|---|
| **Shared rules for all code** (rules for existing code, formatting, naming, folder structure, where shared types, constants and utilities live, TypeScript, one-line comment per function, error handling, approved libraries, package policy, reporting format) | **`.claude/rules/general-rules.md`** |
| Frontend: architecture, server and client components, data flow, forms, accessibility | `.claude/rules/frontend/frontend-rules.md` |
| Frontend: component structure, props, lists, icons | `.claude/rules/frontend/component-rules.md` |
| Frontend: plain CSS, variables, single `850px` breakpoint, legacy CSS, screenshot checks | `.claude/rules/frontend/styling-rules.md` |
| Backend: Apollo setup, `queryCms`, page data loading, static rendering, route handlers, server actions | `.claude/rules/backend/backend-rules.md` |
| Backend: GraphQL query files and names, WPGraphQL best practices, Codegen | `.claude/rules/backend/api-rules.md` |
| Security (applies everywhere) | `.claude/rules/backend/security-rules.md` |
| CMS content model, where a change belongs, CMS admin actions | `.claude/rules/database/database-rules.md` |
| Content-model migrations | `.claude/rules/database/migration-rules.md` |
| Testing: tools, configuration, placement, style | `.claude/rules/testing/testing-rules.md` |
| Testing: required tests and coverage thresholds | `.claude/rules/testing/test-coverage-rules.md` |
| Preparing a release commit | `.claude/skills/prepare-release/SKILL.md` (run it with `/prepare-release`) |
| Subagent definitions | `.codex/agents/*.toml` |
| Permission guardrails (package installs, builds, protected files) | `.claude/settings.json` |

Precedence: the user's instructions, then `general-rules.md`, then the domain rules. If two rules contradict each other, stop and ask; don't pick one.

## Where a change belongs

| Change | Where it belongs | Example |
|---|---|---|
| Text, images, or a new entry of a content type that already exists | **WordPress content.** The front end reads it through GraphQL. Never hard-code it in a component. | A new home slide (a new row in the `slides` repeater of the home slide list) |
| A new kind of content | **The WordPress content model** (a post type and an ACF field group), **plus code** that displays it | A new section that lists the business qualities |
| Look, layout or behavior | **Code** | How the buttons look |

Only the main agent changes the CMS, and only when the user asks. Subagents never do. The process is in `database-rules.md` section 2.

## Subagents and when to delegate

| Subagent | Delegate when the task involves | Never for |
|---|---|---|
| `frontend-developer` | React components (`*Content`, `*Entry`, `Shared*`), client interactivity, forms UI, CSS Modules and global stylesheets, MUI icons or custom SVG icons, the JSX a page or layout renders | Queries, data loading, actions, route handlers, tests |
| `backend-developer` | New or changed CMS data: GraphQL documents, Codegen, the Apollo setup and `queryCms`, data loading in `page.tsx` and `layout.tsx`, server actions, route handlers, environment variables, `next.config.ts` | Markup, CSS, tests |
| `database-specialist` (read-only) | Designing or changing the CMS content model (post types, ACF fields, status values, taxonomies), WPGraphQL exposure, CMS-side performance and security, migration plans. Returns a spec and the ACF JSON to import, and edits nothing | Writing code in this repo, changing the CMS |
| `qa-engineer` | Jest unit tests, Jest with React Testing Library component tests, Playwright end-to-end tests, test configs, regression tests, coverage checks | Changing application code to make tests pass |
| `code-reviewer` (read-only) | Reviewing any change against `general-rules.md` plus the matching domain rules and agent boundaries. Returns findings and a verdict | Fixing code |

### Delegation workflow

1. **Classify the task** by the areas it touches, using the table above. A task that touches several areas goes to several agents, in this order:
   1. `database-specialist`, when CMS content must change. Its spec goes to the user for approval, then to the main agent (CMS changes) and to the backend.
   2. `backend-developer`, for queries, data loading and actions. Its data contract goes to the frontend.
   3. `frontend-developer`, for components and CSS.
   4. `qa-engineer`, for the tests the coverage rules require.
   5. `code-reviewer`, **always last, after any code change**.
2. **Pass context forward.** Give each agent the relevant output of the previous one: the spec, the data contract, the list of changed files.
3. **Review loop.** If `code-reviewer` returns **CHANGES REQUESTED**, send each finding to the owning agent named in the finding, then run `code-reviewer` again. Report the work as done only after an **APPROVED** verdict.
4. **Small edits.** For a trivial edit (a typo, a one-line change) you may work directly, but you must still follow every rule and still run `code-reviewer` on the change.
5. **Surface approvals.** Package proposals, CMS changes, `next.config.ts` changes and new `package.json` scripts all go to the user for approval. Never approve them on the user's behalf.

## Non-negotiables (details in `general-rules.md`)

- **Formatting:** 4 spaces, no semicolons, single quotes (JSX attributes too), `{noBracketSpacing}`, trailing commas, `x => ...`, 80 columns.
- **Names:** long, descriptive names, with no abbreviations and no word-plus-abbreviation mixes (`ind` → `index`, `deltaMs` → `timeSincePreviousFrame`). Routes are kebab-case, component folders snake_case, components PascalCase, constants and enums UPPER_SNAKE_CASE. GraphQL operations follow this project's own format (`api-rules.md` section 1).
- **Comments:** a one-line purpose comment above every named function, and no other comments. Any other comment an agent thinks is truly necessary goes to the main agent for a decision. The main agent lists every such request, with its location and decision, at the end of the reply (see `general-rules.md` section 9).
- **Shared locations:** types in `src/app/SharedTypes.ts`, all constants in `src/app/utils/constants.tsx`, helpers in `src/app/utils/<domain>Handler.ts`, icons in `src/app/utils/icons/`. Imports use the aliases `@/components/...`, `@/shared_components/...`, `@/utils/...` and `@/SharedTypes`.
- **CMS HTML:** always through `parseCmsHtml()` from `@/utils/htmlHandler`, which sanitizes it. Never call `html-react-parser` directly and never use `dangerouslySetInnerHTML`.
- **Styling:** plain CSS only. MUI is used only for icons. The only media query for new CSS is `@media only screen and (max-width: 850px)`. Legacy CSS values are changed only in visual tasks, with before and after screenshots.
- **Packages:**
  - Any direct install needs user approval first.
  - Before proposing a package, evaluate adoption, maintenance, reliability, security and compatibility.
  - Only propose packages with 10,000+ weekly downloads. If none qualifies, ask the user for suggestions.
- **Protected files:** never hand-edit generated GraphQL files, `.next/standalone/`, `yarn.lock` or `.env*`.
- **Builds:** the only build you may run is `yarn build:standalone`. It rewrites the committed `.next/standalone/`, which the server runs. Never run plain `yarn build` or `next build`: they also write `.next/standalone/` but leave out its static files. (GitHub Actions runs `yarn build` as a check, so the script stays.) For verification, use `yarn lint` and `yarn typecheck`.

## Commands

`yarn dev` · `yarn build:standalone` · `node .next/standalone/server.js` (run the standalone build) · `yarn lint` · `yarn typecheck` · `yarn codegen` (needs the CMS to be reachable) · `yarn jest` (once installed) · `yarn playwright test` (once installed)

### Suggesting commands with values to replace

When you give the user a command to run that contains a value they must fill in (a name, path, ID, port or secret), you and every subagent must:

- Wrap each value to replace in angle brackets with a descriptive snake_case name, whenever the shell syntax allows it: `<module_slug>`, not `slug` or `s`.
- Directly underneath the command, name each placeholder and say what to replace it with.

Example:

```bash
curl -sI https://blackcat-adventures.com/module/<module_slug>
```

Make sure to replace `<module_slug>` with the slug of the module page you want to check.

## Preparing a release

The user pushes; you prepare the commits. When the user asks for a release (or to get changes ready to push), follow the steps in `.claude/skills/prepare-release/SKILL.md`. A request to prepare a release is also the approval for the `yarn build:standalone` it runs.

- **The server runs the committed build.** On every push to `main`, the workflow `.github/workflows/deploy.yml` type checks and test-builds the code, then the server runs `git pull --ff-only`, clears its route cache and restarts the app with pm2. The workflow has no path filter: every push to `main` deploys, including pushes that only change documentation.
- **Source changes need a new build.** Commit the source changes first, then a separate "Standalone build" commit with the output of `yarn build:standalone`.
- **CMS edits need a release too, for now.** Every page is built once at build time. A change made in WordPress shows on the site after the next release.
- **To test a build without releasing it,** restore the committed output afterwards: `git restore -- .next/standalone`, then remove the new untracked build files with `git clean -fd -- .next/standalone`.

## Working on the CMS

- **Who:** only the main agent, and only when the user asks. Subagents never change the CMS.
- **How:** content edits go through the WordPress REST API. The account and where its credentials are kept are described in the workspace `CLAUDE.md` one folder up. Read the credentials with `grep`/`cut`, never `source` them, and never print them. This repo is public: never write user names, credentials or their paths in it.
- **Login limits:** the CMS bans an IP for 24 hours after 3 failed logins, and REST API calls with a wrong password count. If one authenticated request fails with 401 or 403, stop and check the credentials with the user before trying again.
- **Content edits:** show the user the change (before and after) and get approval before every write. New entries start as drafts unless the user says to publish.
- **Content-model changes:** the REST API can't create post types or ACF field groups. `database-specialist` writes the spec and the ACF JSON; after the user approves it, the user imports it in WordPress. Details in `database-rules.md` section 2.
- **Admin-level actions: always ask first, every time.** Never do any of these on the CMS without asking the user first, and never treat one approval as covering the next action:
  - Install, activate, deactivate, update or delete a plugin or a theme.
  - Update WordPress core.
  - Change site settings (site URL, permalinks, reading settings).
  - Create, change or delete users, roles or Application Passwords.

## Production server

- **Access:** the front end and the CMS run on one DigitalOcean droplet. Reach it with the SSH alias from the local SSH config: `ssh -o BatchMode=yes blackcat-claude "<command>"`. The alias logs in as a read-only user. The server details are in the workspace `CLAUDE.md` one folder up. This repo is public: never write the server's IP address, user names or key paths in it.
- **SSH limits:** the server bans IPs that open too many SSH connections. Put all checks into one `ssh` call, and make no more than about 3 connections in 5 minutes. If `ssh` times out but `curl -sI https://cms.blackcat-adventures.com` works, the IP is blocked: tell the user and wait at least 10 minutes.
- **The app:** the server runs the committed `.next/standalone/server.js` with pm2 on port 3000, behind Apache. The read-only user can't see pm2's status or logs.
- **Secrets:** never read or print `.env` files, `wp-config.php` or other secrets on the server, even where file permissions allow it.
- **Changes:** for anything that changes the server (restarts, editing files, installs, deploys by hand), describe it and give the user the command to run as their own account. Don't ask them to widen the read-only user's permissions. The manual deploy steps are in `README.md`.
- **After a deploy:** check every route over HTTPS. Use SSH only if HTTPS checks can't answer the question.
