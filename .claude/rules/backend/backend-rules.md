---
paths:
  - "src/app/**/page.tsx"
  - "src/app/**/layout.tsx"
  - "src/app/components/lib/**"
  - "src/app/**/graphql/**"
  - "src/app/**/actions/**"
  - "src/app/api/**"
  - "src/app/utils/privateConstants.ts"
  - "codegen.ts"
  - "next.config.ts"
---

# Backend Rules: Data Layer

These extend `.claude/rules/general-rules.md`. Read that file first.

## 1. What "backend" means here

This repository is the front end. The backend is a **headless WordPress CMS** (`cms.blackcat-adventures.com`) that exposes its content through **WPGraphQL**, with ACF (Advanced Custom Fields) holding custom fields. It is not in this repository. In this repository, the backend layer is the server-side data layer of the Next.js app:

- The Apollo client and `queryCms()` in `src/app/components/lib/ApolloClient.ts`.
- Shared loaders and queries in `src/app/components/lib/` (`getPageContent.ts` with `fetchPageContent`, and `graphql/`).
- GraphQL documents in `src/app/components/<feature>/graphql/` and Codegen (`codegen.ts`). See `api-rules.md`.
- Data loading in `page.tsx` and `layout.tsx`.
- Server actions in `src/app/components/<feature>/actions/` and route handlers in `src/app/api/` (none yet, see section 5).
- Environment variables and secrets. See `security-rules.md`.
- `next.config.ts`.

Changes to the CMS itself (post types, ACF fields, plugins, the database) are specified by the database-specialist agent and applied in WordPress, never by this agent (`database/database-rules.md` section 2). Never assume a CMS field exists. Check the generated types (`src/types/__generated__/graphql.ts` holds the whole schema) or ask.

## 2. Apollo client and `queryCms`

- `ApolloClient.ts` exports `getClient` from `registerApolloClient(...)` (from `@apollo/client-integration-nextjs`), which creates one `ApolloClient` per request with `new InMemoryCache()` and `new HttpLink({uri: SERVER_URL})`.
- **Every CMS read uses `queryCms(query, variables)`.** It is typed by the query's `TypedDocumentNode`, returns the data, and throws when the request fails or returns no data (general-rules section 10). Don't call `getClient().query(...)` directly in pages.
- The endpoint URL is the `SERVER_URL` constant in `src/app/utils/constants.tsx`. It reads `GRAPHQL_URL` and falls back to `https://cms.blackcat-adventures.com/graphql`. Never repeat the URL anywhere else (`codegen.ts` has its own copy because it runs outside the app).
- Apollo devtools are on only when `NODE_ENV` is `development`.
- **No client-side Apollo.** There is no `ApolloWrapper` or provider. Propose one before any client component needs CMS data.

## 3. Loading data in pages and layouts

The standard page shell:

```tsx
import AllModulesPageContent from '@/components/all_modules_content/AllModulesPageContent'
import {getAllModulesContent} from '@/components/all_modules_content/graphql/useGetAllModulesContentQuery'
import {queryCms} from '@/components/lib/ApolloClient'
import {MODULES_PAGE, MODULES_PAGE_ID} from '@/utils/constants'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

// Loads the modules page post and the list of modules from the CMS
const fetchModulesPage = () =>
    queryCms(getAllModulesContent, {id: MODULES_PAGE_ID})

// Sets the browser tab title from the title of the modules page post
export const generateMetadata = async (): Promise<Metadata> => {
    const data = await fetchModulesPage()
    return {title: data.post?.title || MODULES_PAGE.title}
}

// Renders the modules page with its intro and the list of modules
export default async function AllModulesPage() {
    const data = await fetchModulesPage()
    if (!data.post?.content || !data.post.title) notFound()

    return (
        <AllModulesPageContent
            title={data.post.title}
            content={data.post.content}
            modules={data.modules?.nodes || []}
        />
    )
}
```

- **Name pages** `<RouteName>Page`: `HomePage`, `AboutUsPage`, `ContactUsPage`, `DmingServicesPage`, `AllModulesPage`, `ModulePage`, `EventsPage`. Some existing pages are named `AboutUs`, `ContactUs`, `DmingServices` and `Page`; rename them when you modify them.
- **Loaders** are arrow-function `const`s named `fetch<Thing>`, above `generateMetadata` in the page file. A loader used by several pages goes in `src/app/components/lib/` (like `fetchPageContent`).
- **Fetch once per operation.** Fetch everything a page needs in one operation where you can. `generateMetadata` and the page may call the same loader: within one request, the second call is answered from the per-request Apollo cache.
- **Variables come from constants** (`*_PAGE_ID`) or route params. Route params are a `Promise`: `type PageProps = {params: Promise<{moduleName: string}>}`, then `const {moduleName} = await params`. Look up single entries by slug with `idType: SLUG`.
- **Guard in order:**
  1. `queryCms` already throws for request errors and missing data.
  2. Missing or hidden main entry: call `notFound()`.
  3. Required data that must always exist (the home slides): `throw new Error('...')` with a clear message.
  4. Optional values and lists: `|| ''` and `|| []` fallbacks, and enum fallbacks for status values.
- **Flattening:**
  - When a page renders a single entity, pass its fields as explicit props with fallbacks.
  - When the page passes a list, pass the nodes and let the Content component map each item to an `*Entry`.
- **Shared data in the layout.** The header menu and the footer's social links load in `src/app/layout.tsx`, in parallel with `Promise.all`, and go to the header and footer as props.
- **Titles:** every page exports `metadata` or `generateMetadata` with its title.

## 4. Static rendering and caching

- **Pages are static.** `yarn build:standalone` renders every page once, and the server serves the committed `.next/standalone/`. The committed prerender manifest lists every page with `revalidate: false` (checked 2026-11-15). `/module/[moduleName]` has no `generateStaticParams`, so it is not prerendered.
- **So a CMS edit shows on the site only after the next release.** Making CMS edits appear without a release is a planned, separate task.
- **Don't add caching or revalidation without the user's approval:** no `revalidate` exports, `'use cache'`, `cacheComponents`, `dynamic` exports, `revalidatePath`/`revalidateTag` or webhooks. At runtime they write cache files into the git-tracked `.next/standalone/`, and the server's deploy (`git pull --ff-only`) then fails.
- **Don't change `next.config.ts`** (`output: 'standalone'`, `images: {unoptimized: true}`) without the user's approval.

## 5. Route handlers and server actions

**Status: none yet.** This project has no server actions or route handlers. The contact form posts to Web3Forms from the browser with the public key `NEXT_PUBLIC_W3FORMS_ACCESS_KEY`. Use a server action or route handler when a request needs a secret, or for a webhook.

- **Server actions:**
  - Location: `src/app/components/<feature>/actions/<verb><Thing>.ts`, with `'use server'` on the first line (for example `submitContactForm.ts`).
  - Return a typed result such as `{success: boolean, errorMessage: string}`. Do not throw to the client.
- **Route handlers:**
  - Location: `src/app/api/<kebab-name>/route.ts`, exporting named `GET` or `POST` functions, each with its one-line comment.
  - Respond with `Response.json(...)` and correct status codes: 400 for bad input, 401 for a bad secret, 500 for an unexpected failure.
- **Both:**
  - Validate every input (body, query string, headers, form fields) on the server for type, length and format. Checks in the browser are only for the user's convenience.
  - Wrap the work in `try/catch`, log with `console.error(e)`, and never return stack traces, internal messages or the upstream response body.
  - Read secrets only through `src/app/utils/privateConstants.ts` (`security-rules.md` section 1). Never log a secret.
- **Third-party REST calls:**
  - Use `fetch` with an explicit `method` and `headers` (`'Content-Type': 'application/json'`, `Accept: 'application/json'`).
  - Check `response.ok` and the service's own success flag.
  - Wrap the call in `try/catch`.
- **Before the first one:** a server-only secret is read at runtime on the server, not at build time. Where it lives on the server (outside git, readable by the process that runs the app, and not readable by the read-only user Claude uses) must be decided with the user first. The release steps then get a check that the variable is set.

## 6. next.config.ts

- The backend-developer owns this file. Keep it minimal and typed (`import type {NextConfig} from 'next'`).
- Changes need the user's approval (section 4).
