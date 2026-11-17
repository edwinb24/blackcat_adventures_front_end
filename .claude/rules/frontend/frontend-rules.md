---
paths:
  - "src/app/**/*.tsx"
  - "src/app/**/*.css"
---

# Frontend Rules: Architecture

These extend `.claude/rules/general-rules.md`. Read that file first. These rules cover how the UI layer is organized. Component structure is in `component-rules.md` and CSS is in `styling-rules.md`.

## 1. Rendering model

- **Server components by default.** A component becomes a client component only when it needs `useState`, `useEffect`, `useRef` for browser state, browser APIs or event handlers.
- **`'use client'`** is the first line of the file, before any imports. Put it only on the components that need it, and keep client components as small leaf components. A server component may render a client component, but never the other way round.
- **Pages and layouts are async server components** that load data and pass it down as props. The data-loading part of `page.tsx` and `layout.tsx` belongs to the backend layer (`backend/backend-rules.md`). The UI layer owns the components those files render.
- **Pages are prebuilt and refreshed every 60 seconds** (`backend/backend-rules.md` section 4). Don't add anything that makes a page dynamic (reading cookies or headers, `dynamic` exports, other revalidation) without the backend-developer and the user's approval.

## 2. Data flow from page to UI

```
page.tsx (server)            → loads with queryCms(...) or a fetch<Thing> loader,
                               calls notFound() for missing content, applies '' and enum fallbacks
  └─ <FeatureName>Content    → receives typed props (a generated <Operation>Query type, a node type
                               derived from it, or a Type* shape)
       ├─ <Thing>Entry        → one item of a list, built with .map in the parent
       └─ Shared<Thing>       → reusable building block from shared_components/
```

- **One body component per page.** Each page renders a single `<FeatureName>Content` (or `<FeatureName>PageContent`) component, which contains the page's `<main>`.
- **Props types.** Content components are typed with the generated query type (for example `homeSlidesData: GetHomeSlideListQuery`), or with a node type derived from it (`type EventNode = NonNullable<GetAllEventsQuery['events']>['nodes'][number]`), when they receive raw query data. When they receive flattened fields, they use a `Type*` shape from `src/app/SharedTypes.ts`.
- **CMS HTML** (`content`, `description`, `shortDescription`) is rendered only with `parseCmsHtml(...)` from `@/utils/htmlHandler`. It sanitizes the HTML first. Never import `html-react-parser` in a component and never use `dangerouslySetInnerHTML`.
- **CMS HTML goes in a `<div>`,** never in a `<p>`, because the CMS sends its own `<p>` elements.
- **No fetching in UI components.** They must not call `getClient()` or `queryCms()`, `fetch` the CMS or define GraphQL documents. They receive data as props. Ask the backend-developer for any data you are missing.

## 3. Root layout and shared chrome

- `src/app/layout.tsx` imports `reset.css` and then `globals.css` (the reset loads first), loads the header and footer data in parallel and renders `<html lang='en'><body><Header ... />{children}<Footer ... /></body></html>`.
- There is no client-side Apollo provider. If a client component ever needs CMS data after a user interaction, the backend-developer proposes it first.
- The header and footer are feature components in `src/app/components/header/` and `src/app/components/footer/`, typed with the generated query types of the layout's queries.
- The page grid (header, main, footer) is defined in `reset.css` through `grid-template-areas`. Feature components put their content in a `<main>` element.
- **Page titles:** the layout's `metadata` sets the default title and the template `'%s | Black Cat Adventures'`. Each page sets its own title with `metadata` or `generateMetadata`.

## 4. Navigation and media

- **Internal links** use `Link` from `next/link`.
- **External links** use `target='_blank'` with `rel='noopener noreferrer'`.
- **Route links** come from page link objects in `src/app/utils/constants.tsx` (`CONTACT_US_PAGE.link`, `CONTACT_US_PAGE.title`), never from hard-coded strings.
- **Links that come from the CMS** are turned into site paths with the helpers in `@/utils/linkHandler` (`getHrefFromLink`, `toInternalHref`). Never split CMS URLs by hand in a component.
- **Images** use `Image` from `next/image`, always with `width`, `height` and a meaningful `alt` (the CMS alt text, or the item title when there is none). Image optimization is off on purpose (`images.unoptimized`), to save server CPU and memory; don't turn it on without the user's approval.
- **Image loading:** images above the fold get `preload` or `loading='eager'`. In lists, only the first items preload; later items use `loading='lazy'` (decide by the item's `position`). Logos and fixed images come from image objects in `constants.tsx` (`LOGO_IMAGE.url`, `LOGO_IMAGE.alt`).
- **Back links** on interior pages use the same pattern as the other pages: `<Link href='/'>{'Return to Home >'}</Link>`.

## 5. State management

- **Local state only:** `useState` for UI state, `useRef` for values that must not cause a render (a swipe start position, a submit-in-progress flag), and `useEffect` for timers and subscriptions.
- **Effects** list complete dependency arrays and return a cleanup function (`clearInterval`, removing listeners).
- **Functional updates** when the new state depends on the old one: `setActiveIndex(index => (index + 1) % slideCount)`.
- **Derive, don't store.** Compute values during render (filtered lists, sorted lists, class names, labels) instead of keeping them in state.
- **No server data in client state.** Server data stays in props.
- **No global state libraries.** If state must be shared across distant components, propose a plan before adding React Context.

## 6. Forms

- **Shared styles:** build forms with the classes in `src/app/globalFormStyles.module.css` (`formClasses`).
- **Field state** is a single `Record<FieldName, {value: string, validationMessage: string, edited: boolean}>` held in one `useState`. The initial state is a constant in `constants.tsx`.
- **Handlers:**
  - `handleFieldChange(field, value)` updates the value and clears its message.
  - `validateField(field, value)` runs on blur and sets `edited: true` with a message.
  - `handleFormSubmission` validates every field at once (each empty field shows its message), then submits.
  - After a successful submission, the fields reset to the initial state.
- **No double submits:** a ref blocks a second submit, also within the same tick, and the submit button is disabled while the form is sent.
- **Messages:**
  - The form uses `noValidate`, so the browser doesn't show its own popups.
  - Each field's message renders in a `<p className={formClasses.formFieldErrorMessage}>` under the field.
  - A form-level error renders under the submit button with `role='alert'`.
  - A success message shows with `role='status'` when a `show<Something>Message` boolean is set.
  - User-facing messages are constants in `constants.tsx`.
- **Submission:** the `onSubmit` handler calls `e.preventDefault()` and then the submission logic. The contact form posts to Web3Forms from the browser, because its access key is public by design (`NEXT_PUBLIC_W3FORMS_ACCESS_KEY`). Any request that needs a secret goes through a server action or route handler owned by the backend layer. Never call such a service from the client.

## 7. Accessibility and semantics

- Use semantic elements: `<header>`, `<main>`, `<footer>`, `<section>`, `<ul>`/`<li>` for lists, `<h1>` once per page.
- Every interactive element is a `<button>` (with `type`) or a `Link`. Never put a `Link` inside a `<button>` or a `<button>` inside a `Link`. Style the link instead.
- Do not put click handlers on non-interactive elements without keyboard support. The hamburger menu and the carousel dots are existing `<div>`/`<span>` elements with `role='button'`, `tabIndex` and Enter/Space handling, kept that way to keep their look. The header's `HeaderNavigation` wrapper has `role='presentation'` and a click handler that toggles the menu: it handles mouse clicks on the hamburger (whose own handler covers only Enter and Space) and closes the menu when a link inside it is clicked. Keep the handler there, and never copy this pattern onto a real control. New interactive elements are real `<button>` elements.
- Icon-only buttons and links have an `aria-label`. Toggles have `aria-expanded`.
- Inputs have `name`, `autoComplete` and an accessible label (`aria-label` or a `<label>`). Invalid fields set `aria-invalid`.
