---
paths:
  - "src/app/**/graphql/**"
  - "src/app/api/**"
  - "src/app/**/actions/**"
  - "codegen.ts"
---

# Backend Rules: GraphQL API and Codegen

These extend `.claude/rules/general-rules.md` and `backend-rules.md`.

## 1. Query files and names

- **Location:** `src/app/components/<feature_name>/graphql/use<Operation>Query.ts`. Queries shared by several pages go in `src/app/components/lib/graphql/`. Even though the file holds a document and not a hook, it keeps the `use...Query` name, so that Codegen produces `use<Operation>Query.generated.ts` next to it.
- **One operation per file.**
- **Naming (this project's format):**

  | Item | Pattern | Example |
  |---|---|---|
  | Operation name | camelCase, starting with `get` | `getAllModulesContent`, `getAllEvents`, `getPageContent`, `getSingleModule` |
  | Exported document | The operation name, unchanged | `getAllModulesContent` |
  | File | `use` + the operation name with a capital first letter + `Query.ts` | `useGetAllModulesContentQuery.ts` |
  | Generated file | The file name with `.generated.ts` | `useGetAllModulesContentQuery.generated.ts` |
  | Generated types | Codegen capitalizes them: `<Operation>Query`, `<Operation>QueryVariables` | `GetAllModulesContentQuery`, `GetAllModulesContentQueryVariables` |
  | Mutations | camelCase operation `<verb><Thing>`, file `use<Verb><Thing>Mutation.ts` | `createNewsletterSignup` in `useCreateNewsletterSignupMutation.ts` |

  Use this format for every query in this project, even where WPGraphQL or Apollo examples use PascalCase operation names.

- **Template:**

  ```ts
  import {gql, type TypedDocumentNode} from '@apollo/client'
  import type {
      GetAllEventsQuery,
      GetAllEventsQueryVariables,
  } from './useGetAllEventsQuery.generated'

  export const getAllEvents: TypedDocumentNode<
      GetAllEventsQuery,
      GetAllEventsQueryVariables
  > = gql`
      query getAllEvents($id: ID!, $first: Int!) {
          post(id: $id) {
              id
              title
              content(format: RENDERED)
          }
          events(first: $first) {
              nodes {
                  id
                  title
                  eventFields {
                      eventStatus
                      price
                      eventSessions {
                          eventSessionStartTime
                          eventSessionNotes
                      }
                  }
              }
          }
      }
  `
  ```

- **Typing:** documents are always typed as `TypedDocumentNode<Query, Variables>` with the generated types, so `queryCms(...)` returns typed data.
- **Indentation:** GraphQL inside the template literal is indented 4 spaces per level.

## 2. WPGraphQL best practices

- **Variables, never interpolation.** Pass values through typed variables (`$id: ID!`, `$slug: ID!`, `$first: Int!`). Never interpolate values into the `gql` template.
- **Request only what the UI uses.** Every node includes `id`, which Apollo needs for cache normalization. `__typename` is added automatically.
- **Paginate connections.** Always set `first:`. WPGraphQL returns 10 items by default and caps at 100. For more than 100, use cursor pagination (`pageInfo {hasNextPage endCursor}` with `after:`). The existing queries for `modules`, `events`, `posts` and `socialMediaLinks` don't set `first:` yet, so they return at most 10 items. Add it when you modify them, and say in your report that the page can now show more items.
- **Look up single nodes** by global ID (constants `*_PAGE_ID`) or by slug with `idType` (`module(id: $slug, idType: SLUG)`). Dynamic routes use the slug.
- **ACF fields** are read through their GraphQL field-group name (`moduleFields { ... }`, `eventFields { ... }`). Use the exact field names from the schema. Never guess. The content model is in `database/database-rules.md` section 4.
- **CMS HTML fields** (`content(format: RENDERED)`, `description`, `shortDescription`) arrive as HTML strings. The UI renders them with `parseCmsHtml(...)`.
- **Images:** request `sourceUrl` and `altText` in new queries, plus `mediaDetails {width height}` when the layout needs the real dimensions. Older queries read the image URL from `node.link`; switch them to `sourceUrl` only together with a screenshot check.
- **One request per page.** Combine what a page needs into a single operation (for example the page post plus the list it shows) so you avoid waterfalls.
- **Mutations** need WordPress authentication. Run them only on the server (server action or route handler), with credentials from server-only environment variables.

## 3. Codegen

Codegen is set up in `codegen.ts`:

- `schema` is the WPGraphQL endpoint (`GRAPHQL_URL`, or `https://cms.blackcat-adventures.com/graphql`), so `yarn codegen` needs the CMS to be reachable.
- `documents` is `src/**/*.{ts,tsx}`. Base types go to `src/types/__generated__/graphql.ts`, and operation types go next to each query file (`near-operation-file` preset).
- The config uses `avoidOptionals: {field: true, inputValue: false}`, `defaultScalarType: 'unknown'`, `nonOptionalTypename: true` and `skipTypeNameForRoot: true`.

Rules:

- **Regenerate after every query change.** Run `yarn codegen` and then `yarn typecheck`. Generated files are committed and never edited by hand.
- **Renamed or deleted query files:** Codegen doesn't delete old generated files. Delete the old `.generated.ts` yourself, then run `yarn codegen`.
- **Nullable fields.** Generated types use `null` for nullable fields, so consumers must handle `null` with `?.` and `|| ''` fallbacks.

## 4. Responses to the UI

- The UI layer receives either the typed query result, node types derived from it, or `Type*` props. Never pass untyped `any` or partial objects.
- **Contract changes.** When a query's shape changes, list the affected components in your report so the frontend-developer can update them.
