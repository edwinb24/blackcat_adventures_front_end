---
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "e2e/**"
  - "jest.config.*"
  - "jest.setup.*"
  - "playwright.config.*"
---

# Testing Rules

These extend `.claude/rules/general-rules.md`. Test code follows the same formatting, naming, import and one-line-comment rules as application code.

## 1. Tools

| Level | Tool | Runs with |
|---|---|---|
| Unit tests (utilities, pure logic) | **Jest** | `yarn jest` |
| Component tests | **Jest** with **React Testing Library** | `yarn jest` |
| End-to-end tests | **Playwright** | `yarn playwright test` |

- **Nothing is installed yet.** Before the first test can run, these packages need user approval and installation (general-rules section 4). Propose only the ones the task needs:
  - `jest`
  - `jest-environment-jsdom`
  - `@testing-library/react` and `@testing-library/dom`
  - `@testing-library/jest-dom`
  - `@testing-library/user-event`
  - `@types/jest`
  - `@playwright/test`
- Do not use other test runners, assertion libraries or mocking libraries (Vitest, Mocha, Cypress, Enzyme, MSW) without approval.
- The Playwright browser tools that Claude uses for screenshot checks (`frontend/styling-rules.md` section 8) are not tests and don't replace them.

## 2. Configuration

- **`jest.config.ts`** at the root uses `next/jest` (`nextJest({dir: './'})`). Jest reads it through Node's built-in TypeScript support (type stripping, on by default from Node 22.18), so `ts-node` is not needed. The file may use only erasable TypeScript syntax: type annotations and `import type`, but no `enum` or `namespace`. It sets:
  - `testEnvironment: 'jsdom'`
  - `setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']`, where `jest.setup.ts` imports `@testing-library/jest-dom`
  - a `moduleNameMapper` that matches the `tsconfig.json` aliases, the more specific one first:
    - `'^@/shared_components/(.*)$': '<rootDir>/src/app/components/shared_components/$1'`
    - `'^@/(.*)$': '<rootDir>/src/app/$1'`
  - `testPathIgnorePatterns` that exclude `/e2e/`, `/.next/` and `/node_modules/`
  - coverage settings from `test-coverage-rules.md`
- **`playwright.config.ts`** at the root sets:
  - `testDir: './e2e'`
  - a `webServer` that runs `yarn dev` and waits for it with `url` (for example `'http://localhost:3000'`), not `port`. Test against the standalone build (`node .next/standalone/server.js`) only during a release, after `yarn build:standalone`.
  - `baseURL`
  - two projects: desktop, and a mobile viewport narrower than the 850px breakpoint (for example 390px wide)
- **`package.json` scripts** (`"test": "jest"`, `"test:e2e": "playwright test"`) are added only with user approval.
- **`.gitignore`** already ignores `/coverage`. Ask before adding Playwright's output folders to it.

## 3. File placement and naming

- **Unit tests** sit next to the file under test: `src/app/utils/dateHandler.test.ts`.
- **Component tests** sit next to the component: `src/app/components/events_content/event_entry/EventEntry.test.tsx`.
- **End-to-end tests** go in `e2e/<flow-name>.spec.ts`, in kebab-case: `e2e/navigation-menu.spec.ts`, `e2e/contact-form.spec.ts`.
- **Fixtures:**
  - Typed fixtures live inside the test file, typed with generated `<Operation>Query` types or `Type*` shapes, so they stay in step with the schema.
  - Fixtures reused by several test files go in a snake_case `test_fixtures/` folder next to the tests (`test_fixtures/eventEntryFixture.ts`).

## 4. Writing tests

- **Structure:** `describe('<ComponentOrFunctionName>', ...)`, with `it('<does something> when <condition>', ...)` sentences that describe behavior. Each test follows Arrange, Act, Assert, with one blank line between the steps.
- **Test behavior, not implementation.** Assert what the user sees or what a function returns. Do not assert on internal state, class names or call order unless that is the behavior.
- **Query priority (React Testing Library):**
  1. `getByRole`
  2. `getByLabelText`
  3. `getByPlaceholderText`
  4. `getByText`
  5. `getByTestId`, only as a last resort
- **Interactions** use `@testing-library/user-event` (`await userEvent.click(...)`) rather than `fireEvent`.
- **Server components and pages** are not rendered in Jest. Test the `*Content`, `*Entry` and `Shared*` components with typed fixture props, and cover pages with Playwright.
- **Mocks:**
  - Mock only at module boundaries (`jest.mock('next/navigation')`, global `fetch` for submissions).
  - Never mock the component under test or the utilities it relies on (`parseCmsHtml`, `linkHandler`).
  - Reset mocks between tests.
- **Timers:** use `jest.useFakeTimers()` for intervals and timeouts (the carousel's autoplay), and restore real timers afterward.
- **CMS HTML props** in fixtures use small, realistic HTML strings.
- **No broad snapshot tests.** Assert specific output instead.
- **Helper functions** in test files get the one-line purpose comment like any other function.

## 5. End-to-end rules

- **Locators:** use `page.getByRole(...)` or `page.getByLabel(...)`. CSS-class selectors are not allowed.
- **No fixed waits** (`waitForTimeout`). Rely on Playwright's auto-waiting `expect` assertions.
- **No real third-party submissions.** Never submit real data to Web3Forms or to the CMS. Intercept those requests with `page.route(...)` and assert on the request payload.
- **The CMS is live.** End-to-end tests read the real CMS content, so assert on structure (headings exist, lists have entries, no error page) rather than on exact CMS text.
- **Breakpoint coverage.** Run responsive behavior (for example the mobile hamburger menu) under the mobile project.
- **Independent tests.** Each test can run on its own and in any order.

## 6. Reporting

Use the general-rules reporting format. Under "Verification", list each test command you ran with its pass and fail counts, and any skipped test with the reason.
