---
name: prepare-release
description: Prepares the Black Cat Adventures release commits for the user to push. Runs the checks, builds the committed standalone output with yarn build:standalone, smoke-tests and screenshots the build locally, and makes the source commit and the "Standalone build" commit. Use when the user asks to prepare a release or a deploy, to commit changes so they are ready to push, or to get the site ready to go live. Never pushes.
---

# Prepare a release

The server runs the committed `.next/standalone/`. On every push to `prod`, GitHub Actions (`.github/workflows/deploy.yml`) type checks and test-builds the code, then the server runs `git pull --ff-only origin prod`, clears its route cache and restarts the app with pm2. Pushing `main` never deploys. So a release is: the source changes, plus a fresh `yarn build:standalone`, committed on `main`, then a release pull request from `main` into `prod`. **You prepare the commits; the user pushes `main` and merges the release pull request.**

The user's request to prepare a release is the approval for the `yarn build:standalone` in step 5. It doesn't approve anything else (packages, CMS changes, `next.config.ts` changes).

Run the steps in order. Stop and report to the user when a step fails; don't work around it.

## 1. Check the starting point

- `git branch --show-current` must be `main`. If it isn't, ask the user.
- `git status --short` must show only the changes that belong to this release. If there are unrelated changes, ask the user which ones belong; the build reads the whole working tree.
- `.next/standalone/` must be unchanged (`git status --short -- .next/standalone` is empty). If it already has changes, ask the user before going on.
- Every code change in the release has an **APPROVED** verdict from `code-reviewer`. If not, run the review first (`AGENTS.md`, delegation workflow).

## 2. Run the checks

- `yarn codegen`, when any query file changed. Then check that no generated file changed unexpectedly.
- `yarn lint`
- `yarn typecheck`
- `yarn jest` and `yarn playwright test`, once they are installed.

## 3. Check the build environment

- `grep -c '^NEXT_PUBLIC_W3FORMS_ACCESS_KEY=.' .env` must print `1`. Never print the value. Without it, the contact form in the build can't send.

## 4. Take the "before" screenshots

Only when the release can change what a page looks like (CSS, markup, props, or CMS content shown differently):

1. Start the committed build: `PORT=3100 HOSTNAME=127.0.0.1 node .next/standalone/server.js`, as a background command.
2. With the Playwright browser tools, take a full-page screenshot of every affected page at 1280px and 390px wide. Pause the browser clock before loading the pages (`page.clock.install()`, then `page.clock.pauseAt(...)`), so the home carousel doesn't move between screenshots. After each page loads (`waitUntil: 'networkidle'`), wait for `document.fonts.ready` and call `decode()` on every loaded image before the screenshot; otherwise a half-decoded image shows up as a false difference.
3. Stop the server, then delete `.next/standalone/.next/server/route-cache/`. Running the server creates it, and it must never be committed (the server's deploy deletes its own copy).

## 5. Build

- `yarn build:standalone`. It runs `next build` and copies `public/` and `.next/static/` into `.next/standalone/`.
- A CMS error during the build stops it on purpose (general-rules section 10). Report the error; don't change code to hide it.
- **Never** run plain `yarn build` or `next build` instead.

## 6. Smoke-test the new build

1. Start it: `PORT=3100 HOSTNAME=127.0.0.1 node .next/standalone/server.js`, as a background command.
2. Get one real module slug from the public GraphQL endpoint (`modules(first: 1) {nodes {slug}}`).
3. Request each route and check the status code:

   | Route | Expected |
   |---|---|
   | `/` | 200 |
   | `/about-us` | 200 |
   | `/contact-us` | 200 |
   | `/dming-services` | 200 |
   | `/module` | 200 |
   | `/module/<real module slug>` | 200 |
   | `/module/this-module-does-not-exist` | 404 |
   | `/organized-events` | 200 |

4. Check that no 200 page contains the error page text ("could not load").
5. If you took "before" screenshots, take the same "after" screenshots and compare them pixel by pixel (`sharp` is in `node_modules` as a Next.js dependency and can read both images). Report every difference. Stop if a difference was not expected.
6. Stop the server, then delete `.next/standalone/.next/server/route-cache/`.

## 7. Check what will be committed

- `git status --short` and `git diff --stat`: only the release's source files and `.next/standalone/` changed.
- Nothing from `.env*` is staged or tracked (`git ls-files | grep -i '\.env'` prints nothing).
- No secret appears in the diff of the source files.

## 8. Commit

1. **Source commit:** stage the release's source files by path (never `git add -A` for the whole repository) and commit them with a message that says what changed and why.
2. **Build commit:** `git add -A -- .next/standalone`, then commit with the message `Standalone build`.
3. End each commit message with the attribution lines the session gives (for example a `Co-Authored-By:` trailer).
4. **Never push.** Codex has no GitHub credentials on this computer.

CMS content changes don't need a release: pages refresh from the CMS every 60 seconds (`backend-rules.md` section 4).

## 9. Hand over

Tell the user:

1. The commits, with their hashes and one line each.
2. The command to run on their PC: `git push origin main`. This doesn't deploy.
3. How to release: open a pull request from `main` into `prod` (on GitHub, **Pull requests → New pull request**, base `prod`, compare `main`), and merge it with **Create a merge commit**, never squash or rebase.
4. What happens next: the merge pushes to `prod`, and GitHub Actions checks the code, then deploys. Every push to `prod` deploys, even one that changes only documentation.
5. That you can check the live site when they say the deploy has finished.

## 10. After the deploy (when the user asks)

- Request each route from step 6 on `https://blackcat-adventures.com` and check the status codes.
- Check that the home page HTML contains the new build ID: `cat .next/standalone/.next/BUILD_ID`, then search the fetched HTML for it. If it isn't found, say the check was inconclusive rather than failed.
- Use SSH (`blackcat-Codex`, one connection, read-only) only if the HTTPS checks can't answer the question.

## Testing a build without releasing it

To try a build without committing it, put the committed output back afterwards:

```bash
git restore -- .next/standalone
git clean -fd -- .next/standalone
```

The second command deletes only the new, untracked build files inside `.next/standalone/`.
