---
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "e2e/**"
  - "jest.config.*"
---

# Testing Rules: Coverage

These extend `.claude/rules/general-rules.md` and `testing-rules.md`.

## 1. Scope

- **New and changed code** must come with the tests in section 2.
- **Existing untested code is a backlog.** Don't write tests for it as a side effect of another task; the user decides when to work on the backlog.
- **First in the backlog:** `parseCmsHtml()` in `src/app/utils/htmlHandler.ts`, because it protects the site from unsafe CMS HTML.

## 2. What must be tested

| Code | Required tests |
|---|---|
| Every function in `src/app/utils/*Handler.ts` | Unit tests for every branch, including invalid and empty input (for example an invalid date string, a link without a slug) |
| `parseCmsHtml()` | Unit tests for every blocked tag, attribute and URL scheme, for allowed and refused iframe hosts, and for safe HTML that must render unchanged |
| Every component in `src/app/components/shared_components/` | Component tests for rendering, every prop variation, and every interaction (click, swipe, keyboard) |
| Every client component with state or interaction | Component tests for each state change the user can trigger |
| Every `*Content` and `*Entry` component | Component tests for the data-driven branches: empty list message, each status value (hidden, draft, published; live, coming soon), missing optional fields, rendered CMS HTML |
| Every form | Component tests for field validation (required, format), the error message after a failed submit, the success message and field clearing after a successful submit, the error path when the request fails, and the double-submit guard |
| Every route | A Playwright smoke test: the page loads, the main `<h1>` is visible, and the error page is not shown |
| Unknown module slugs | A Playwright test that `/module/<unknown slug>` answers with HTTP 404 |
| Main user flows | Playwright tests for navigation (the desktop menu with the modules dropdown, and the mobile hamburger menu) and the contact form submission (with the request intercepted) |
| Every bug fix | A regression test that fails before the fix and passes after |

## 3. Coverage thresholds (Jest)

Set these in `jest.config.ts` with `coverageThreshold`:

| Scope | Statements | Branches | Functions | Lines |
|---|---|---|---|---|
| Global | 80% | 80% | 80% | 80% |
| `./src/app/utils/` | 95% | 95% | 100% | 95% |

- **Measure only tested files while the backlog exists.** Don't set `collectCoverageFrom` to all of `src/app` yet. Without it, Jest measures only the files the tests load, so the thresholds apply to the new and changed code that has tests. Widen it only when the user decides the backlog is covered.
- **Always exclude:** `*.generated.ts`, `src/types/__generated__/`, `src/app/components/lib/`, `page.tsx` and `layout.tsx` files (Playwright covers them), and `*.test.*` files.
- **Don't lower thresholds.** Never lower a threshold or widen the exclusions to make a run pass. Report the gap instead.
- **Output:** coverage goes to `/coverage`, which is git-ignored.

## 4. Quality over percentage

- Coverage counts only when the assertions are meaningful. A test that renders without asserting anything does not count toward the requirements in section 2.
- The code-reviewer checks that new or changed code comes with the tests this table requires.
