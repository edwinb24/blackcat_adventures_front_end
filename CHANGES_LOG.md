# Changes log: code audit fixes

Date: 2026-11-08
Base commit: `be00f76` (Correcting landing page bug)
Writing style: ASD-STE100 (Simplified Technical English)

The IDs (A1, B1, C1, D1 …) refer to the findings of the code audit.

---

## 1. Summary

- This change fixes 14 errors, 4 security findings, 16 refactoring findings and 9 improvement findings.
- This change adds no new packages.
- The visual style of the site did not change. See section 4.
- Some findings are not changed, because they change the visual style or need your decision. See section 5.

---

## 2. Tests and results

| Test | Result |
| --- | --- |
| TypeScript check (`yarn typecheck`) | Pass |
| Production build (`next build`) | Pass, 9 of 9 pages |
| Pixel comparison of screenshots: 8 pages × 2 widths (1280 px and 390 px), old build against new build | 14 of 16 are identical. The 2 differences are on Contact Us only: the corrected description sentence. |
| Browser interaction tests (Chrome, 31 checks): carousel, header, mobile menu, contact form, module pages, console errors | 31 of 31 pass |
| HTML sanitizer tests (18 attack and safe-content cases + all real CMS HTML) | 19 of 19 pass. The real CMS HTML renders the same as before. |
| Link helper tests against the old inline code | 10 of 10 give the same output |
| Workflow YAML syntax check | Pass |
| ESLint (`yarn lint`) | **Not possible.** typescript-eslint does not support TypeScript 7. This error occurred before these changes. |

The contact form tests used a mock of `fetch`, so no real email was sent.

---

## 3. Changes

### 3.1 Errors

| ID | Change | File |
| --- | --- | --- |
| A1 | The root layout does not return a `<p>` without `<html>` any more. The two queries run in parallel. A failure shows the new `global-error.tsx`. | `src/app/layout.tsx`, `src/app/global-error.tsx` |
| A2 / A3 | The deploy now has a `check` job (install, type check, build). The deploy starts only when the check passes. The server clears the route cache **before** the restart. `git pull --ff-only` replaces `fetch` + `pull`. Only one deploy runs at a time. | `.github/workflows/deploy.yml` |
| A4 | The form validates all fields at the same time. Each empty field shows its message. The state updates use the current state, not old copies. | `ContactUsContent.tsx` |
| A5 | When Web3Forms sends `success: false`, the form shows the error. | `ContactUsContent.tsx` |
| A6 | The form cannot be sent two times. A ref blocks a second submit, also in the same tick. The button is disabled while the form is sent. | `ContactUsContent.tsx` |
| A7 | The message field has `maxLength={500}`. | `ContactUsContent.tsx` |
| A8 | The header removes posts without a link before it uses the link. | `Header.tsx` |
| A9 | The module page finds the module by its URL slug (`idType: SLUG`), not by its title. | `useGetSingleModuleContentQuery.ts`, `module/[moduleName]/page.tsx` |
| A10 | A missing or hidden module calls `notFound()`. The server sends HTTP 404, not 200. | `module/[moduleName]/page.tsx` |
| A11 | **No change.** The CMS sends the typed time marked as UTC (for example `18:00+00:00`), so UTC formatting is correct. A comment in the code explains this. | `dateHandler.ts` |
| A12 | The carousel image uses the CMS alt text. When there is no alt text, it uses the slide title. | `SharedCarouselSliderContent.tsx` |
| A13 | The HTML nesting is valid now: module and event entries are `<li>` in `<ul>`, the "no events" heading is in an `<li>`, the CMS short description is in a `<div>` (not a `<p>`), and there is no `<Link>` in a `<button>`. | `ModuleEntry.tsx`, `EventEntry.tsx`, `EventsPageContent.tsx`, `StatusPill.tsx` |
| A14 | `reset.css` loads before `globals.css`. The two files set different properties, so the look does not change. | `layout.tsx` |
| A15 | The `lint` script is `eslint .`. The ESLint config is native flat config. A `typecheck` script was added. | `package.json`, `eslint.config.mjs` |
| A16 | The enum value `publised` is `published` now. No code compared to the old value. | `constants.tsx` |

### 3.2 Security

| ID | Change | File |
| --- | --- | --- |
| B1 | New `parseCmsHtml()` sanitizes all CMS HTML before rendering. It removes `script`, `style`, `form`, `object`, `embed` and similar tags. It removes `on*` attributes and `srcdoc`, and `javascript:`, `vbscript:` and `data:` URLs (`data:image` in `<img>` is kept). It keeps iframes only from YouTube, Vimeo and Twitch over https. It adds `rel="noopener noreferrer"` to `target="_blank"` links. No new package. | `src/app/utils/parseCmsHtml.ts` and all components that showed CMS HTML |
| B2 | The Web3Forms key is not in the source code now. It comes from `NEXT_PUBLIC_W3FORMS_ACCESS_KEY` in `.env`. The key was added to your local `.env`. `privateConstants.env.ts` is deleted. | `ContactUsContent.tsx`, `.env` |
| B3 | Apollo devtools are enabled only in development. The browser Apollo client (`ApolloWrapper`) is removed, so it does not go to the browser. | `ApolloClient.ts`, `layout.tsx` |
| B4 | Links that open in a new tab have `rel="noopener noreferrer"`. | `Header.tsx`, `SharedCarouselSliderContent.tsx`, `parseCmsHtml.ts` |

### 3.3 Refactoring

| ID | Change | File |
| --- | --- | --- |
| C1 | New shared `StatusPill` component for "Coming Soon" / "Purchase" / "Get A Ticket". The "Purchase" button is now fully clickable (before, only the text was a link). | `shared_components/status_pill/` |
| C2 | New `getSlugFromLink()`, `getHrefFromLink()` and `toInternalHref()` replace 4 copies of the same code. | `src/app/utils/links.ts` |
| C3 | About Us and DMing Services use one shared query and one helper (`fetchPageContent`). The two display components stay separate, because their styles are different. | `components/lib/getPageContent.ts`, `components/lib/graphql/useGetPageContentQuery.ts` |
| C4 | New `queryCms()` helper. It throws on errors, so `error.tsx` shows them. All pages use it. A CMS failure during the build now stops the build. Before, the build published a page with an error message. | `ApolloClient.ts`, all `page.tsx` |
| C5 | Unsafe `as` casts were replaced with type narrowing. | pages and content components |
| C6 | `ApolloWrapper` is removed. No component used client-side queries. | `layout.tsx` |
| C7 | The layout queries run in parallel (`Promise.all`). | `layout.tsx` |
| C8 | The carousel uses one interval with a functional state update. It does not restart the interval on each slide. | `SharedCarouselSlider.tsx` |
| C9 | The swipe start position is in a ref (`useRef`), not in state. The event types are `React.TouchEvent`. | `SharedCarouselSliderContent.tsx` |
| C10 | Unused code is deleted: `SharedModal` (+ CSS), `COMMUNITY_ICONS`, `DiscordIcon`, `CMS_HOME_URL`, `NEWSLETTER_IMAGE`, `MODAL_CLOSE_ICON_SIZE`, the `getPostContent` query, and the `query` and `PreloadQuery` exports. Git history (`be00f76`) keeps them. | several |
| C11 | `SingleModuleContent` is a server component now. | `SingleModuleContent.tsx` |
| C12 | The header menu is one declarative list. The wrong comments are removed. | `Header.tsx` |
| C13 | The form uses one `INITIAL_FORM` constant. | `ContactUsContent.tsx` |
| C14 | `SocialMediaMenu` calculates the icon one time. | `SocialMediaMenu.tsx` |
| C15 | The GraphQL URL can come from the `GRAPHQL_URL` environment variable (the default stays the same). | `constants.tsx`, `codegen.ts` |
| C16 | The path alias is `@/shared_components/*` now. | `tsconfig.json` |
| C17 | Unneeded fragments and template strings are removed. | several |

### 3.4 Improvements

| ID | Change | File |
| --- | --- | --- |
| D1 | The hamburger menu and the carousel dots have `role="button"`, `tabIndex`, `aria-label` and Enter/Space keys. The hamburger has `aria-expanded`. The elements stay `<div>` / `<span>`, to keep the look. | `HamburgerMenu.tsx`, `SharedCarouselDots.tsx` |
| D2 | The Modules dropdown also opens on keyboard focus and closes when the focus goes out. | `Header.tsx` |
| D3 | The carousel arrows and the social media icons have `aria-label`. The form fields have `aria-label` and `aria-invalid`. The messages have `role="alert"` / `role="status"`. | several |
| D5 | Only the first event image preloads. The other event images load lazily. The carousel images stay eager, so the slides do not show empty while an image loads. | `EventEntry.tsx` |
| D6 | Each page has its own title, for example "About Us \| Black Cat Adventures". | all `page.tsx`, `layout.tsx` |
| D8 | The email field is `type="email"` (mobile phones show the email keyboard). Email validation uses a pattern, not only "@". `autoComplete="off"` replaces the invalid value. The form uses `noValidate`, so the browser does not show its own popups. | `ContactUsContent.tsx` |
| D12 | The README is updated: sanitizer, GitHub Actions, environment variables, commands, and deploy steps. The Geist font text is removed. | `README.md` |
| D13 | Social media entries without data are hidden (before, users saw "Social Media Link Fail to Load"). Unknown modules show the 404 page. | `SocialMediaMenu.tsx`, `module/[moduleName]/page.tsx` |
| D14 | Spelling: "Submittion" → "Submission" (email subject), "hambuger" → "hamburger" (code), "inquire" → "inquiry", "There are not currently events" → "There are currently no events". | several |
| D15 | The deploy runs a type check and a build first (see A2). | `deploy.yml` |

---

## 4. Visual changes

The screenshots of all pages (desktop and mobile) are pixel-identical to the old build, except for the items below.

1. **Contact Us: description text.** The old text was "Want to reach out to us, write your name … about your inquire as soon as possible." The new text is "Want to reach out to us? Write your name … about your inquiry as soon as possible." The font, size and position stay the same.
2. **Unknown module URL** (for example `/module/abc`). Before: header, a white line "Element Fail to Load or is missing content and/or title", and footer. Now: header and the standard Next.js 404 page ("404 | This page could not be found."). The site already used this 404 page for all other unknown URLs.
3. **Browser tab title.** Each page has its own title, for example "About Us | Black Cat Adventures". The home page title stays "Black Cat Adventures".
4. **Keyboard focus ring.** The hamburger menu (mobile) and the carousel dots can get keyboard focus. When a user moves to them with the Tab key, the browser shows its standard focus ring. A mouse click does not show the ring.
5. **Contact form states** (only in these states):
   - All empty fields show "Field Required" at the same time (before, only the first field did).
   - An email without a valid format (for example "a@b") shows "Please Enter A Valid Email".
   - When the form cannot be sent, the user sees an error message (before, nothing).
   - The message field stops at 500 characters.
6. **New error pages** (only when the CMS fails at runtime):
   - `error.tsx`: header, "Return to Home >", the text "Sorry, this page could not load." and a "Try again" button, with the existing page styles.
   - `global-error.tsx`: dark page with "Sorry, Black Cat Adventures could not load." and a "Try again" button.
7. **"Purchase" / "Get A Ticket" buttons.** The look is the same. The full button is now clickable, not only the text. *Note:* the button opens the link in the same tab. Middle-click and "open in new tab" do not work on it.

---

## 5. Not changed (decisions for you)

| Item | Reason |
| --- | --- |
| **CSS values without units** (for example `padding: 10`, `gap: 20`, `width: 200`, `font-size: 24`, `height: 60`, `border-radius: 5`) in most `.module.css` files | Browsers ignore these values. If they are corrected, the layout **will change**. Correct them only together with a visual review. |
| **Media queries without units** (`@media (max-width: 767)`) in `Header.module.css`, `reset.css`, `AboutUsContent.module.css`, `DmingServicesContent.module.css` | These rules never apply now. A correction **will change** the mobile layout. |
| `rgba(var(--color-secundar) / 0.9)` (an undefined variable), `margin-bottom: 0p`, `opacity: 90` | The same reason: a correction can change the look. |
| `formSuccessMessage` and `DropdownMenuElementOption` classes do not exist in the CSS | A new style would change the look. |
| D4 Image optimization | You chose not to enable it (server CPU/RAM). |
| D10 MUI icons to SVG | You chose not to change it (possible small visual difference). |
| D7 Page revalidation (ISR) | With the committed standalone build, ISR writes files into folders that git tracks. This can cause conflicts with `git pull` on the server. Content updates still need a new build. |
| D9 `font-display: swap` | It changes how the font appears while it loads. |
| D11 Windows-compatible scripts | Needs a new package (`cross-env`). |
| A2 Committed build output (about 1,600 files, including `node_modules`) | You chose to keep the current deploy flow. |
| ESLint cannot run | Needs typescript-eslint support for TypeScript 7, or an added `typescript@6` package. |
| `@eslint/eslintrc` dev dependency | It is not used now. It was not removed, so `yarn.lock` does not change. You can remove it with `yarn remove @eslint/eslintrc`. |

---

## 6. Actions for you

1. **Before the next deploy, run `yarn build:standalone` and commit the new `.next/standalone`.** The committed build is still the old build. The server runs the committed build.
2. Make sure that `.env` on your build computer has `NEXT_PUBLIC_W3FORMS_ACCESS_KEY` (it was added to your local `.env`). The key is put into the build at build time. Without it, the Contact Us form shows an error.
3. The new `check` job in GitHub Actions uses the official `actions/checkout@v4` and `actions/setup-node@v4` actions.
4. Optional: rotate the Web3Forms key in the Web3Forms dashboard. The old key is in the git history. Web3Forms keys are public by design, so the risk is low.
