---
paths:
  - "src/app/**/graphql/**"
  - "codegen.ts"
---

# Database Rules: Content-Model Migrations

These extend `.claude/rules/general-rules.md` and `database-rules.md`.

## 1. What counts as a migration

Any change to the CMS content model is a migration: adding, renaming or removing a post type, ACF field, select value or taxonomy, or changing a field's type or its GraphQL name. Each one can break the generated types and the next build.

## 2. Backups and rehearsal

- **There is no staging copy of the CMS.** That is why every change is additive first (section 3) and a backup comes first.
- **Before any content-model change,** the user:
  1. exports the field groups and post types that will change (ACF → Tools → Export), so they can be imported back;
  2. takes a database backup (a DigitalOcean snapshot, or `wp db export` run as the user's own account on the server).
- **Data changes** (backfills, moving values between fields) are done as content edits through the REST API, one approved step at a time, or by the user in WordPress. Never run SQL against the CMS database.

## 3. Backward-compatible order (expand, then contract)

1. **Expand:** add the new type, field or value without removing anything.
2. **Front end:** the backend-developer runs `yarn codegen` and `yarn typecheck` and updates the queries. The UI handles both the old and the new shape where needed. Release it.
3. **Migrate data:** fill the new field and check the content through GraphQL.
4. **Contract:** remove the old field or value only after the released front end no longer queries it.

- **Renaming a GraphQL field name or select value is a breaking change.** Do it with the steps above, never in place.
- **Enum changes** (status select values) update the matching enum in `src/app/utils/constants.tsx` in the same front-end change.
- **Deleting** a field, type or value that holds content needs explicit user approval.

## 4. Reporting

A migration spec states the order of steps, who does each one, what the front end must change at each step, how to roll back (which export or backup to restore), and how to verify the result (the WPGraphQL query to run and the expected shape).
