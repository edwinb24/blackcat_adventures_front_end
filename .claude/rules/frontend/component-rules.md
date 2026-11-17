---
paths:
  - "src/app/**/*.tsx"
---

# Frontend Rules: Components

These extend `.claude/rules/general-rules.md` (formatting, naming, comments) and `frontend-rules.md` (architecture).

## 1. Component roles and placement

| Role | Name pattern | Location |
|---|---|---|
| Page body | `<FeatureName>Content` or `<FeatureName>PageContent` | `src/app/components/<feature_name>/` |
| List item | `<Thing>Entry` | `src/app/components/<feature_name>/<thing>_entry/` |
| Feature-specific child | Descriptive PascalCase (`HamburgerMenu`, `HomeCarouselSlider`) | A snake_case subfolder of the feature, or the feature folder |
| Reusable building block | `Shared<Thing>` (`SharedCarouselSlider`, `SharedCarouselDots`) | `src/app/components/shared_components/<thing_name>/` |
| Custom icon | `<Name>Icon` | `src/app/utils/icons/<name>Icon.tsx` |

- A component used by two or more features moves to `shared_components/` and gets the `Shared` prefix. `StatusPill` and `LinkButton` in `shared_components/status_pill/` are older shared components without the prefix; they get it when they are next modified.
- A component made of several parts keeps its parts together in one folder with a shared stylesheet (for example `SharedCarouselSlider`, `SharedCarouselControls`, `SharedCarouselDots` and `SharedCarouselSliderContent` with `SharedCarousel.module.css`).
- **Reuse before you build.** The "Coming Soon" / "Purchase" / "Get A Ticket" button is `StatusPill`. The image carousel is `SharedCarouselSlider`.

## 2. File layout

Put the pieces of a component file in this order:

1. `'use client'`, only when needed.
2. Imports, sorted as described in general-rules section 7.
3. Local exported types used by the component's props or by its children.
4. A one-line purpose comment, then `export default function ComponentName(...)`.

Component files never declare module-level constants. Every constant goes in `src/app/utils/constants.tsx`, even one that only this file uses (general-rules section 7). Helper functions that only one component uses go inside the component, or in a `<domain>Handler.ts` when they are pure and worth testing on their own.

## 3. Component body order

1. Hooks: `useState`, then `useRef`, then `useEffect`.
2. Handlers, toggles and validators, written as arrow functions, each with its one-line comment.
3. Derived values: filtered or sorted data, class-name strings, labels.
4. JSX pieces assembled into named variables (`moduleEntries`, `sessionListItems`, `carouselLinks`).
5. Early returns for hidden or empty states.
6. `return (...)` with the final markup.

## 4. Props

- Destructure props in the signature.
- For a component's own props, use an inline object type. For a shape shared across files, use a `Type*` from `SharedTypes.ts`. For raw query data, use a generated `<Operation>Query` type or a node type derived from it.

  ```tsx
  // Renders the events page with its intro and the list of upcoming events
  export default function EventsPageContent({
      title,
      content,
      events,
  }: {
      title: string
      content: string
      events: Array<EventNode>
  }) {
  ```

- Type children as `ReactNode` (import it with `import type {ReactNode} from 'react'`). Use `Readonly<{children: ReactNode}>` in layouts.
- Mark optional props with `?`. Callback props are typed functions: `onToggle: () => void`, `onSelect: (slideIndex: number) => void`.
- When passing nullable CMS values, add fallbacks at the call site: `title={moduleNode.title || ''}`, `moduleStatus={(moduleFields?.moduleStatus as MODULE_STATUS) || MODULE_STATUS.hidden}`.

## 5. Lists and keys

- Build lists with `.map` into a descriptive plural variable before the `return`. Name the callback parameter after the item.
- Use a stable CMS `id` as the `key`. If there is none, use a composite such as `` `${platform}_${index}` ``. A bare index is the last resort.
- Filter before mapping, with descriptive names (`visibleModules`, then `moduleEntries`; `sortedEvents`, then `eventEntries`).
- Hidden items are filtered out by their status enum before mapping (`moduleStatus !== MODULE_STATUS.hidden`).
- For an empty list, render a short message instead of an empty container (`There are currently no events.`), with the text as a constant.

## 6. Conditional rendering and class names

- `{condition && (<Element />)}` renders something or nothing.
- `condition ? (<A />) : (<B />)` chooses between two elements. Assign it to a named variable when it is longer than a line.
- `? ... : null` gives a variable that is either an element or nothing.
- Combine classes with template literals: `` className={`${classes.carouselDot} ${slideIndex === activeIndex ? classes.carouselActiveDot : ''}`} ``.
- Never use inline `style` objects, `sx` props or styled wrappers. All styling goes through CSS Modules. The one exception, `global-error.tsx`, is in `styling-rules.md` section 1.

## 7. Icons

- **MUI icons:** use `@mui/icons-material` with named imports (`import {Casino, Hiking} from '@mui/icons-material'`).
- **Custom icons:** if an icon does not exist in `@mui/icons-material`, create it in `src/app/utils/icons/<name>Icon.tsx` by wrapping `SvgIcon`:

  ```tsx
  import SvgIcon, {type SvgIconProps} from '@mui/material/SvgIcon'
  import React from 'react'

  // Renders the Twitch logo as an icon compatible with @mui/icons-material
  const TwitchIcon: React.FC<SvgIconProps> = props => (
      <SvgIcon {...props} viewBox='0 0 24 24'>
          <path d='...' />
      </SvgIcon>
  )

  export default TwitchIcon
  ```

- **Sizing and color** come only from CSS Modules. Pass `fontSize='inherit'` and put the size and `color` on a wrapper, or target the icon with a child selector on a module class (`.PanelWithIcon > svg {font-size: 80px; color: var(...);}` in `HomeContent.module.css`). The icon follows `font-size` and `currentColor`. A plain `className` on the icon is not enough: MUI's own class has the same specificity and can win. Never use `sx`, `style` or `styled`.
- **Icon maps** (platform to icon) live in `constants.tsx` as `new Map([[ENUM.value, <Icon key='...' />]])` (see `SOCIAL_MEDIA_ICONS`).

## 8. Reference example

This is a generic illustration of the conventions, not existing code:

```tsx
import StatusPill from '@/shared_components/status_pill/StatusPill'
import type {TypeModuleEntry} from '@/SharedTypes'
import {
    MODULE_IMAGE_SIZE,
    MODULE_STATUS,
    PURCHASE_LABEL,
} from '@/utils/constants'
import {parseCmsHtml} from '@/utils/htmlHandler'
import {getHrefFromLink} from '@/utils/linkHandler'
import Image from 'next/image'
import Link from 'next/link'
import classes from './ModuleEntry.module.css'

// Renders one module with its summary, its purchase button and its cover image
export default function ModuleEntry({
    title,
    shortDescription,
    link,
    imageLink,
    altText,
    moduleStatus,
    linkToPurchase,
    position,
}: TypeModuleEntry) {
    const imagePreloads = position < 2

    const moduleImage = imageLink ? (
        <div className={classes.moduleImage}>
            <Image
                src={imageLink}
                width={MODULE_IMAGE_SIZE}
                height={MODULE_IMAGE_SIZE}
                alt={altText || title}
                preload={imagePreloads}
                loading={imagePreloads ? undefined : 'lazy'}
            />
        </div>
    ) : null

    if (moduleStatus === MODULE_STATUS.hidden) return null

    return (
        <li className={classes.moduleEntry}>
            <h3 className={classes.moduleTitle}>{title}</h3>
            <div className={classes.moduleDescription}>
                {parseCmsHtml(shortDescription)}
            </div>
            <Link
                className={classes.moduleLearnMoreLink}
                href={getHrefFromLink(link, '/module')}
            >
                {'Learn more >'}
            </Link>
            <StatusPill
                available={moduleStatus === MODULE_STATUS.published}
                href={linkToPurchase}
                label={PURCHASE_LABEL}
                classes={{
                    base: classes.moduleStatus,
                    unavailable: classes.moduleDraft,
                    available: classes.modulePublished,
                }}
            />
            {moduleImage}
        </li>
    )
}
```
