---
paths:
  - "src/app/**/graphql/**"
  - "src/app/SharedTypes.ts"
  - "src/app/utils/constants.tsx"
  - "codegen.ts"
---

# Database Rules: CMS Content Model

These extend `.claude/rules/general-rules.md`, whose naming and enum rules apply to every name that reaches the front end.

## 1. Where the data lives

- **Storage.** Content is stored in the MySQL database of a **headless WordPress** install at `cms.blackcat-adventures.com`. It is modeled with custom post types and **ACF Pro** field groups and exposed to the front end through **WPGraphQL** and **WPGraphQL for ACF**.
- **No direct database access from this repository.** No SQL, no database drivers and no ORMs. The front end reads everything through the WPGraphQL endpoint (see `backend/api-rules.md`).
- **The whole schema** is in `src/types/__generated__/graphql.ts`, generated from the live CMS by `yarn codegen`. Use it to check what exists.

## 2. Where a change belongs, and who makes it

| Change | Where it belongs | Example |
|---|---|---|
| Text, images, or a new entry of a content type that already exists | **WordPress content.** The front end reads it through GraphQL. Never hard-code it in a component. | A new home slide (a new row in the `slides` repeater of the home slide list) |
| A new kind of content | **The content model** (a post type and an ACF field group), **plus code** that displays it | A new section that lists the business qualities |
| Look, layout or behavior | **Code** | How the buttons look |

**Only the main agent changes the CMS, and only when the user asks.** Subagents never change it. The database-specialist only writes specifications.

**Content edits** (the main agent, through the WordPress REST API):

1. Read the current entry and show the user the change, before and after.
2. Write only after the user approves. New entries start as drafts unless the user says to publish.
3. New images are uploaded to the media library first, with alt text.
4. A repeater (for example `slides`) is saved as a whole: send the full list, with the change in it.
5. Confirm the change through the public GraphQL endpoint.
6. The change shows on the site after the next release (`backend/backend-rules.md` section 4).

**Content-model changes** (post types, field groups, fields, select values):

1. The database-specialist writes the specification (section 6), including the post type and the field group as ACF JSON.
2. The user approves it.
3. The user takes a backup (`migration-rules.md` section 2).
4. The user imports the ACF JSON in WordPress (ACF → Tools → Import). The REST API can't create post types or ACF field groups: the CMS has no ACF routes, and its Abilities API offers only WordPress's own site, user and environment information (checked 2026-11-15).
5. The backend-developer runs `yarn codegen`, then the change follows the normal agent workflow.
6. The content is entered as content edits (above).

**Admin-level actions: always ask first, every time.** Never do any of these on the CMS without asking the user first, and never treat one approval as covering the next action:

- Install, activate, deactivate, update or delete a plugin or a theme.
- Update WordPress core.
- Change site settings (site URL, permalinks, reading settings).
- Create, change or delete users, roles or Application Passwords.

**Login limits:** the CMS bans an IP for 24 hours after 3 failed logins, and REST API calls with a wrong password count. If one authenticated request fails with 401 or 403, stop and check the credentials with the user.

## 3. Content modeling

- **Custom post types** for each kind of content the site lists or routes to. Registered with "Show in GraphQL" on, a camelCase GraphQL single name (`module`) and plural name (`modules`).
- **Posts** hold one-off page content (intro title and body). The front end reads them by global ID constants (`*_PAGE_ID`).
- **ACF field groups:**
  - One group per post type, named `<Thing> Fields` and exposed to GraphQL as `<thing>Fields` (`moduleFields`, `eventFields`), with "Show in GraphQL" and "Show in REST API" turned on.
  - Field GraphQL names are camelCase, descriptive and identical to the prop names the front end uses (`shortDescription`, `linkToPurchase`, `additionalImage`).
- **Status fields:** every listable type has a select field `<thing>Status` with lowercase values. Each one is mirrored by a string enum in `src/app/utils/constants.tsx`. New values must be added in both places.
- **Repeaters** are for ordered child lists, with camelCase sub-field names prefixed by the parent context (`eventSessionStartTime`, `eventSessionNotes`).
- **Image fields** return the media node. Alt text is required in the CMS for every image used by the site.
- **Menus and global settings** are modeled as fields or a dedicated post type so editors can change them without a code change (for example `postFields.addToMainMenu` and the `social-media-link` post type).
- **Dates:** the CMS sends the time the editor typed, marked as UTC (for example `2026-10-11T18:00:00+00:00` for 6:00 PM). The front end formats it in UTC (`dateHandler.ts`), so every visitor sees the time as typed. Don't convert it to another time zone.

## 4. The current content model

| Post type (REST slug) | GraphQL single / plural | Field group | Fields | Used by |
|---|---|---|---|---|
| `post` | `post` / `posts` | `postFields` | `addToMainMenu` (true/false) | Page intros by ID (`ABOUT_US_PAGE_ID`, `DMING_SERVICES_PAGE_ID`, `MODULES_PAGE_ID`, `EVENTS_PAGE_ID`); header menu entries |
| `module` | `module` / `modules` | `moduleFields` | `shortDescription`, `description` (HTML), `linkToPurchase`, `moduleStatus` (`published`, `draft`, `hidden` → `MODULE_STATUS`), `additionalImage` | `/module`, `/module/<slug>`, header dropdown |
| `event` | `event` / `events` | `eventFields` | `description` (HTML), `eventNote`, `price`, `linkToPurchaseTicket`, `eventStatus` (`live`, `comingsoon`, `hidden` → `EVENT_STATUS`), `eventSessions` (repeater: `eventSessionStartTime`, `eventSessionNotes`), `additionalImage` | `/organized-events` |
| `slide_list` | `slideList` / `slideLists` | `carouselSlide` | `slides` (repeater: `title`, `description`, `link`, `image`) | Home page carousel (`HOME_PAGE_SLIDES`) |
| `social-media-link` | `socialMediaLink` / `socialMediaLinks` | `socialMedia` | `socialMediaPlatform` (matches `SOCIAL_MEDIA_PLATFORMS`), `socialMediaLink` | Footer |
| `home-slide` | `homeSlide` / `homeSlides` | `slidesFieldGroup` | `description`, `link`, `slideImage` | Not used by any query |

## 5. Performance and operations

- **Filter with taxonomies.** Use them instead of filtering on meta fields (`meta_query` is slow at scale).
- **Bound every list query** with `first:`. Use cursor pagination beyond 100 items.
- **Caching:** the front end builds every page once per release, so CMS performance matters mainly during `yarn build:standalone`.
- **Security:** WPGraphQL exposes only the types and fields the site needs. Public introspection stays on while `yarn codegen` needs it (`backend/security-rules.md` section 4). Accounts have the least privilege they need. A backup exists before any content-model change.

## 6. Specification format

Every content-model proposal includes:

1. Purpose: what the front end needs and why.
2. Post types: REST slug, GraphQL single and plural names.
3. Fields table: label, GraphQL name, ACF type, required, allowed values or format.
4. The ACF JSON for the post type and the field group, ready for ACF → Tools → Import, with "Show in GraphQL" and "Show in REST API" on.
5. Matching front-end additions: enum values for `constants.tsx`, `Type*` shapes for `SharedTypes.ts`.
6. An example WPGraphQL query in the `api-rules.md` format.
7. The content entries to create, if any.
8. Migration impact (see `migration-rules.md`).
