# General Rules

These are the shared standards for all code in this project. They apply to the main agent and to every subagent. The domain rule folders (`frontend/`, `backend/`, `database/`, `testing/`) add rules for their own area. They never replace these.

## 1. Precedence and existing code

1. The user's explicit instructions in the current conversation.
2. This file, for anything shared: formatting, naming, structure, TypeScript, comments, error handling, libraries.
3. The domain rule files for your area.
4. If a rule is silent, follow the closest existing pattern in this repository and the examples in these rule files. Do not invent a new pattern.

If two rules contradict each other, stop and report the conflict instead of picking one.

**Existing code.** Much of the code in `src/app/` is older than these rules. Follow these rules for existing code:

- **Every file you create** must comply fully.
- **TypeScript files you modify** (`.ts`, `.tsx`, `.mjs`, `.js`) must be brought fully into compliance, not only the lines you change: names, imports, function comments, constants, error handling.
- **CSS files you modify:** new rules and new declarations must comply. **Legacy values stay as they are** unless the task is a visual fix: lengths without units (`padding: 20`), media queries other than the 850px one, undefined variables, invalid values. Browsers ignore many of these values today, so fixing them changes the layout. A visual fix needs before and after screenshots (`frontend/styling-rules.md` section 8).
- **CSS class names** may be renamed to camelCase together with the TypeScript file that uses them, because a rename doesn't change the look.
- **Large clean-ups** that touch many files (for example removing old comments or moving constants) are done as their own change, with the user's agreement, and not as a side effect of another task.

## 2. Tech stack

- Next.js 16 (App Router), React 19 and TypeScript in `strict` mode. `next.config.ts` sets `output: 'standalone'` and `images: {unoptimized: true}`.
- Content comes from a headless WordPress CMS through WPGraphQL with ACF. The client is Apollo Client, used on the server only.
- GraphQL Codegen generates types next to each query (near-operation-file).
- Styling uses plain CSS: CSS Modules plus a few global stylesheets.
- The package manager is Yarn (classic). Never use npm, pnpm or bun to install or remove packages; they create competing lockfiles. The only lockfile is `yarn.lock`.
- **Two TypeScript versions are installed on purpose.** `typescript` is aliased to TypeScript 6 (`@typescript/typescript6`), because typescript-eslint and Next.js need it. `@typescript/native` is TypeScript 7 and provides the `tsc` that `yarn typecheck` runs. Keep both until typescript-eslint supports TypeScript 7.

Common commands:

| Task | Command |
|---|---|
| Dev server | `yarn dev` |
| Standalone production build (the only build to run locally) | `yarn build:standalone` |
| Run the standalone build (default port 3000) | `node .next/standalone/server.js` |
| Lint | `yarn lint` |
| Type check | `yarn typecheck` |
| Regenerate GraphQL types (needs the CMS) | `yarn codegen` |
| Unit and component tests | `yarn jest` (once installed, see `testing/testing-rules.md`) |
| End-to-end tests | `yarn playwright test` (once installed) |

Never run plain `yarn build` or `next build`. They write `.next/standalone/` without its static files and break the committed build that the server runs.

## 3. Approved libraries

Only these libraries may be used. Some are not installed yet.

| Library | Purpose | Notes |
|---|---|---|
| `next` | Framework | |
| `react`, `react-dom` | UI runtime | |
| `@apollo/client` | GraphQL client, `gql`, `TypedDocumentNode` | |
| `@apollo/client-integration-nextjs` | Apollo with the App Router (`registerApolloClient`) | |
| `graphql` | GraphQL runtime | Required by Apollo |
| `rxjs` | Apollo Client 4 peer dependency | Never import it directly |
| `html-react-parser` | Renders HTML from the CMS | Only inside `src/app/utils/htmlHandler.ts`. Everything else calls `parseCmsHtml()`. See `backend/security-rules.md` |
| `@mui/icons-material` | Icons only | Never used for styling or layout |
| `@mui/material` | Only `@mui/material/SvgIcon`, to build custom icons | No other `@mui/material` component may be imported |
| `@emotion/react`, `@emotion/styled` | Peer dependencies of MUI icons | Never import them directly or use them for styling |
| `typescript` (TypeScript 6 alias), `@typescript/native` (TypeScript 7) | Types and `tsc` | See section 2 |
| `@types/node`, `@types/react`, `@types/react-dom` | Types | |
| `eslint`, `eslint-config-next` | Linting (native flat config in `eslint.config.mjs`) | |
| `@eslint/eslintrc` | Legacy ESLint compat layer | Installed but unused; removing it needs approval |
| `@graphql-codegen/cli`, `@graphql-codegen/client-preset`, `@graphql-codegen/near-operation-file-preset`, `@graphql-codegen/typescript`, `@graphql-codegen/typescript-operations` | Type generation from the WPGraphQL schema | Installed |
| `jest` | Unit and component tests | Not installed |
| `@testing-library/react` (and its peer `@testing-library/dom`) | React Testing Library, for component tests | Not installed |
| `@playwright/test` | End-to-end tests | Not installed |

These are not on the list but are expected to be requested for testing: `jest-environment-jsdom`, `@testing-library/jest-dom`, `@testing-library/user-event`, `@types/jest` and `ts-node`. Each still goes through the package policy in section 4.

**Not allowed:** UI component or styling libraries and frameworks (Material UI components, Bootstrap, Tailwind, Chakra, styled-components, Emotion as a styling tool, Sass, CSS-in-JS of any kind), global state libraries, alternative data clients and HTML sanitizer libraries other than the project's own `parseCmsHtml()` (unless the user approves one).

## 4. Package policy

- **Approval:** installing any package directly needs explicit approval from the user first. This includes packages on the approved list. The only exception is a package that arrives automatically as a dependency of another package.
- **Evaluate first:** before recommending or installing any new npm package, evaluate its adoption, maintenance (recent releases, open issues), reliability, security (known advisories) and compatibility (React 19, the installed Next.js version, TypeScript, server versus client components).
- **Downloads:** only suggest libraries with **10,000+ weekly downloads**. If no library meets these requirements, ask the user for suggestions instead of guessing.
- **Proposals:** give the package name, version, weekly downloads, last publish date, license, why it is needed and the alternatives you considered. Install only after approval, with `yarn add <package>` or `yarn add --dev <package>`.
- **Don't edit by hand:** never edit `package.json` dependency fields or `yarn.lock` directly.

## 5. Formatting

These match the following Prettier options. Prettier is not installed, so apply them by hand: `tabWidth: 4`, `semi: false`, `singleQuote: true`, `jsxSingleQuote: true`, `bracketSpacing: false`, `trailingComma: 'all'`, `arrowParens: 'avoid'`, `printWidth: 80`, `bracketSameLine: false`.

- **Indentation:** 4 spaces. Never tabs.
- **Semicolons:** none at the end of statements in `.ts`, `.tsx`, `.js` and `.mjs` files. CSS keeps its semicolons.
- **Quotes:** single quotes for strings and for JSX attributes (`lang='en'`, `type='submit'`). Use double quotes only when the string contains an apostrophe: `{"We'll get back to you."}`. Use template literals only for interpolation.
- **Braces:** no spaces inside object or import braces: `import {useState} from 'react'`, `{id: MODULES_PAGE_ID}`, `const {data} = ...`.
- **Trailing commas** on every multi-line object, array, parameter list, argument list, import and type literal.
- **Arrow functions:** no parentheses around a single untyped parameter (`event => event.id`). Typed or multiple parameters need them: `(field: FieldName, value: string) =>`.
- **Line length:** 80 characters. When a line is too long, put one argument, property or JSX attribute per line, with the closing bracket on its own line. Import paths, URLs, strings and template literals that can't be broken may run longer. `yarn lint` allows a longer line only when it is a one-name import, the `} from '...'` line of a multi-line import, a line with a URL, or a line whose only content is one string or template literal: alone, as a property or variable value, after `return` or a ternary `?`/`:`, as a JSX attribute value, or as JSX text in `{'...'}`.
- **Ternaries:** break nested ternaries one condition per line, each level indented under the last.
- **`if` statements:**
  - A one-statement guard may skip braces when it fits on one line: `if (!result) notFound()`.
  - Any body that spans lines uses braces. `else` and `else if` go on the same line as the closing brace: `} else if (...) {`.
- **Blank lines:**
  - One blank line after the imports.
  - One between top-level declarations.
  - One between logical groups inside a function (state hooks, handlers, derived values, return).
  - Never two in a row.
- **JSX:**
  - Wrap multi-line JSX in parentheses.
  - HTML elements with no children are written open-and-close: `<div className={classes.hamburgerBar}></div>`.
  - React components with no children self-close: `<ModuleEntry ... />`.
  - Text with special characters goes in an expression: `{'Return to Home >'}`.
- **End of file:** every file ends with exactly one newline.

## 6. Naming

Use long, descriptive, multi-word names that say what a value holds or what a function does. Do not abbreviate: write `index`, not `ind` or `i`; `moduleNode`, not `a` or `m`. Name callback parameters after the item (`modules.map(moduleNode => ...)`). The only short names allowed are `e` for DOM event parameters and caught errors, and `_` for unused names.

**Unused names are just `_`.** A parameter or variable that is never used (one that would otherwise start with `_`) is named `_` alone, not `_time` or `_event`: write `test(_: number)`, not `test(_time: number)`. When one signature has several unused parameters, name them `_`, `__`, `___` in order, because TypeScript doesn't allow two parameters with the same name.

**No abbreviations in names.** This applies to every kind of name in the table below: variables, functions, parameters, props, types, constants, enums, CSS classes, files and folders.

- **A name is never an abbreviation.** Do not write `ctx`, `dt`, `ind`, `idx`, `btn`, `img`, `msg`, `el`, `res` or `cfg`.
- **A name never mixes a whole word with an abbreviation.** Do not write `deltaMs`, `navBtn`, `prevSlide`, `errorMsg`, `socialMed` or `SWIPE_THRESHOLD_PX`. Spell every part out.

| Instead of | Write |
|---|---|
| `ctx` | `canvasDrawingContext` |
| `ind` | `index` or `slideIndex` |
| `deltaMs` | `timeSincePreviousFrame` |
| `AUTOPLAY_INTERVAL_MS` | `AUTOPLAY_INTERVAL_MILLISECONDS` |

Two kinds of name are exempt:

- **Widely recognised acronyms** used as words: `URL`, `ID`, `CMS`, `API`, `HTML`, `CSS`, `SEO` (`SERVER_URL`, `MODULES_PAGE_ID`, `parseCmsHtml`).
- **Names fixed by a framework, library or the CMS schema**, which you cannot rename: `props`, `params`, `searchParams`, `href`, `src`, `alt`, `__typename`, `metadata`, `generateMetadata`, ACF field names.

| Item | Convention | Example |
|---|---|---|
| Route folders | kebab-case | `src/app/about-us/`, `src/app/organized-events/` |
| Dynamic route segments | camelCase in brackets | `src/app/module/[moduleName]/` |
| Feature and component folders | snake_case | `src/app/components/events_content/`, `event_entry/` |
| Component files | PascalCase, matching the component name | `EventEntry.tsx` |
| Component CSS | Same name as the component plus `.module.css` | `EventEntry.module.css` |
| Shared stylesheets | camelCase plus `.module.css` | `sharedStyles.module.css`, `globalFormStyles.module.css` |
| Utility files | `<domain>Handler.ts`, named after the domain | `dateHandler.ts`, `linkHandler.ts`, `htmlHandler.ts` |
| Custom icon files | camelCase plus `Icon` | `utils/icons/blueskyIcon.tsx` |
| GraphQL query files and operations | This project's own format, see `backend/api-rules.md` section 1 | `useGetAllEventsQuery.ts` holding `getAllEvents` |
| Pages | `<RouteName>Page` | `HomePage`, `AboutUsPage`, `EventsPage`, `ModulePage` |
| Data loaders | `fetch<Thing>` | `fetchModulesPage`, `fetchPageContent` |
| Components | PascalCase, with a role suffix or prefix (see `frontend/component-rules.md`) | `EventsContent`, `ModuleEntry`, `SharedCarouselSlider` |
| Variables and functions | camelCase, descriptive | `visibleModules`, `sortedEvents` |
| Event handlers | `handle<Action>` | `handleFormSubmission`, `handleFieldChange` |
| Toggles, validators, resets | `toggle<Thing>`, `validate<Thing>`, `clear<Thing>` | `toggleHamburger`, `validateField` |
| Boolean state | Describes the state | `hamburgerOpen`, `showSubmissionMessage`, `moduleDropdownOpen` |
| State setters | `set<StateName>` | `setHamburgerOpen` |
| Callback props | Verb phrase, or `on<Event>` | `nextSlide`, `onSelect`, `onToggle` |
| Constants | UPPER_SNAKE_CASE with meaningful suffixes | `SERVER_URL`, `MODULES_PAGE_ID`, `CONTACT_US_PAGE`, `LOGO_IMAGE`, `CAROUSEL_SWIPE_THRESHOLD_PIXELS`, `SUBMIT_FAILED_MESSAGE` |
| Enums | UPPER_SNAKE_CASE name; quoted lowercase string members (members as written in the CMS) | `enum MODULE_STATUS {'published' = 'published'}` |
| Shared domain types | PascalCase with a `Type` prefix | `TypeModuleEntry`, `TypeEventEntry` |
| Component-local types | PascalCase, descriptive, no prefix | `ContactUsFormInput`, `SliderImage` |
| CSS classes | camelCase, starting with the component or feature context | `.moduleEntry`, `.moduleEntryTitle` |
| CSS custom properties | kebab-case | `--main-color`, `--color-tertiary-darker` |

Spell names correctly. Fix a misspelled identifier when you touch its file. The CSS variable `--secundary-color` is the exception: it is used in many files, so it is renamed only in one change that covers every file.

## 7. Project structure and shared locations

The aliases in `tsconfig.json` are `@/*` → `src/app/*` and `@/shared_components/*` → `src/app/components/shared_components/*`. So app code is imported as `@/components/...`, `@/shared_components/...`, `@/utils/...`, `@/SharedTypes` and `@/sharedStyles.module.css`.

```
src/
├── app/
│   ├── layout.tsx                      # Root layout: header and footer queries, Header, children, Footer
│   ├── page.tsx                        # Home route
│   ├── error.tsx                       # Error page for a page that fails; the header and footer stay
│   ├── global-error.tsx                # Error page when the root layout fails
│   ├── <route-name>/page.tsx           # One folder per route (kebab-case)
│   ├── module/[moduleName]/page.tsx    # Dynamic route
│   ├── globals.css                     # :root CSS variables, @font-face, base element styles
│   ├── reset.css                       # CSS reset and the body grid
│   ├── sharedStyles.module.css         # Shared layout classes (page wrappers, titles)
│   ├── globalFormStyles.module.css     # Shared form classes
│   ├── SharedTypes.ts                  # Shared domain types (Type* prefix)
│   ├── components/
│   │   ├── lib/                        # ApolloClient.ts (getClient, queryCms), shared loaders, shared queries in graphql/
│   │   ├── shared_components/          # Reusable building blocks: <thing_name>/Shared<Thing>.tsx
│   │   └── <feature_name>/             # One folder per feature or page section
│   │       ├── <FeatureName>.tsx
│   │       ├── <FeatureName>.module.css
│   │       ├── graphql/
│   │       │   ├── use<Operation>Query.ts
│   │       │   └── use<Operation>Query.generated.ts   # Generated, never edit
│   │       └── <sub_component_name>/<SubComponentName>.tsx (+ .module.css)
│   └── utils/
│       ├── constants.tsx               # All constants, enums, CMS IDs, page link objects, icon maps
│       ├── privateConstants.ts         # Server-only values read from process.env (none yet)
│       ├── <domain>Handler.ts          # Pure helpers (dateHandler.ts, linkHandler.ts, htmlHandler.ts)
│       └── icons/<name>Icon.tsx        # Custom SVG icons not in @mui/icons-material
└── types/__generated__/graphql.ts      # Base schema types generated by Codegen
e2e/<flow-name>.spec.ts                 # Playwright tests (once set up)
```

- **Shared types** go in `src/app/SharedTypes.ts`. Types used by only one component are exported from that component's file. Types generated from GraphQL come from the `.generated.ts` file next to the query, never redeclared by hand.
- **Constants:** every constant goes in `src/app/utils/constants.tsx`, even one that only one file uses. The file is `.tsx` because it holds icon maps. This includes CMS IDs, URLs, page link objects shaped `{id, link, title}`, image objects shaped `{alt, url}`, enums, icon maps (`new Map([[ENUM.value, <Icon key={...} />]])`), numeric sizes and durations, user-facing messages, regular expressions and initial form state. Public environment values are read there too (`process.env.NEXT_PUBLIC_...`, `process.env.GRAPHQL_URL`). Never inline a magic value in a component. Exceptions: `metadata` exports and route segment config such as `export const revalidate = 60`, which Next.js requires as plain values in page and layout files, and server-only secrets, which go in `privateConstants.ts`.
- **Utility functions** go in `src/app/utils/<domain>Handler.ts`. They are pure functions exported as named arrow-function `const`s, with explicit parameter and return types.
- **Imports:**
  - Import from the same folder or a child folder with a relative path (`./EventEntry.module.css`, `./graphql/...`).
  - Everything else uses the aliases above. Never use `../`.
  - Sort imports alphabetically by module path, ignoring case: `@/` aliases first, then packages, then `./` relative imports.
  - **Exception:** in `src/app/layout.tsx`, `./reset.css` is imported before `./globals.css`, so that the global styles build on the reset. Don't sort these two.
  - Sort the names inside braces alphabetically, ignoring case.
  - Use `import type {...}` for type-only imports, including generated query types. When an import mixes values and types, mark the types inline: `import {gql, type TypedDocumentNode} from '@apollo/client'`.
  - CSS Modules are imported as `classes` (the component's own), `sharedClasses` (`sharedStyles.module.css`) and `formClasses` (`globalFormStyles.module.css`).
- **Exports:**
  - Components and pages use `export default function`, one component per file.
  - Constants, utilities, query documents, loaders and types use named exports.

## 8. TypeScript

- Strict mode. No `any`; use `unknown` and narrow it.
- Write arrays as `Array<T>`, not `T[]`. Write object maps as `Record<string, T>`.
- Use `type` aliases by default. Use `interface` only for a type that another type extends (`interface TypeModuleEntry extends TypeModuleContent`).
- Model status-like values as string enums in `constants.tsx`. Compare against enum members, never raw strings. When CMS data is cast to an enum, give it a fallback: `(moduleStatus as MODULE_STATUS) || MODULE_STATUS.hidden`.
- Nullable CMS fields:
  - Use optional chaining with `|| ''` (or `|| []`) fallbacks before passing values as props.
  - Use non-null assertions (`!`) only right after a filter or guard that guarantees the value.
- Annotate utility functions' parameters and return types. Components and handlers rely on inference, except for event types.

## 9. Functions and comments

- **Every named function gets a one-line comment** directly above it saying what it is trying to achieve: its purpose, not its implementation. This covers components, pages, loaders, handlers, toggles, utilities, hooks and test helpers. Anonymous inline callbacks (`.map(...)`, `onClick={() => ...}`) are exempt.

  ```tsx
  // Formats a CMS session date as a long US date with the time
  export const normalizeDate = (dateString: string): string => {
  ```

- **Comment style:** `// ` followed by a sentence-case phrase.
- **No other comments.** The one-line function comment is the only comment you may add on your own. This rule applies to the main agent and to every subagent. Do not add step labels inside functions, explanatory notes, `// NOTE - ...` or `// TODO - ...` tags, JSDoc blocks or commented-out code.
- **Exceptions need the main agent's decision.** If you believe another comment is truly necessary (for example, a non-obvious workaround that would otherwise be "fixed" back into a bug), do not add it yourself:
  - **Subagents:** list it under `## Comment requests` in your report (section 12), with the file and line, the exact comment text and why it is needed. The main agent makes the final decision and adds the approved comments.
  - **Main agent:** decide each request. Record every comment request, whether approved or rejected and whether it came from you or from a subagent, with its file and line. When the user's prompt has finished processing, include the full list in the final reply, under a **Comment exceptions** heading.
- **CSS:** global stylesheets use `/* Section Name */` headings. These are the only CSS comments allowed.

## 10. Error handling and logging

- **CMS reads throw.** Every CMS query goes through `queryCms()` (`src/app/components/lib/ApolloClient.ts`), which throws when the request fails or returns no data. Pages and layouts don't catch it:
  - An error in a page shows `src/app/error.tsx`; the header and footer stay.
  - An error in the root layout shows `src/app/global-error.tsx`.
  - An error during `yarn build:standalone` stops the build, so a page with an error message is never published.
- **Missing content is a 404.** When the main CMS entry of a page is missing or hidden, the page calls `notFound()` from `next/navigation`, so the server answers with HTTP 404. Shared loaders return `null` for missing content (`fetchPageContent`), and the page turns that into `notFound()`.
- **Required data that must exist** (for example the home page slides) is checked in the page and throws an `Error` with a clear message when it is missing.
- **Optional data** gets `|| ''` or `|| []` fallbacks. An empty list shows a short message instead of an empty container.
- **Requests from the browser:** wrap every `fetch` or other async call that can reject in `try/catch`. Narrow the caught value (`typeof e === 'string'`, `e instanceof Error`), show the user a message through state, and log it with `console.error(e)`.
- **No `finally` blocks when avoidable.** Put the code that would go in `finally` directly after the `try/catch`. Use `finally` only when the `try` or `catch` returns or rethrows, so code placed after the block would not run.

  ```tsx
  try {
      const response = await fetch(WEB3_FORMS_URL, requestOptions)
      const result = await response.json()
      if (result.success) setShowSubmissionMessage(true)
  } catch (e) {
      console.error(e)
      setFormErrorMessage(SUBMIT_FAILED_MESSAGE)
  }
  setFormSubmitting(false)
  ```

- `console.error` is the only console method allowed in committed code. No `console.log`. Never log a secret.
- No logging or error-tracking libraries without approval.

## 11. Generated and protected files

- Never hand-edit `*.generated.ts` or anything under `src/types/__generated__/`. Change the query, then regenerate with `yarn codegen`.
- Never hand-edit `.next/standalone/`. It changes only through `yarn build:standalone`.
- Never edit `yarn.lock`, `.env*` files or anything in `node_modules/`.

## 12. Reporting format (all implementation agents)

End every task with this report:

```
## Summary
One or two sentences on what was done.

## Files changed
- `path/to/File.tsx`: created / modified (one-line purpose)

## Standards applied
- Rule files followed; any deviation and the reason for it.

## Verification
- `yarn lint`: pass / fail (with output on failure)
- `yarn typecheck`: pass / fail
- Tests run, if any, and their results.

## Follow-ups
- Work for other agents (for example "backend-developer: add `price` to getAllEvents").
- Approvals needed (packages, CMS changes).

## Comment requests
- `path/to/File.tsx:42`: `// Exact comment text`: why it is necessary (or "None").
```

Never report a check as passing unless you ran it.
