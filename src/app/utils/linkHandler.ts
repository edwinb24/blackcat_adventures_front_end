// Returns the slug of a CMS link, the second-last segment of its URL
export const getSlugFromLink = (link: string | null | undefined): string => {
    const segments = (link || '').split('/')
    return segments.length > 1 ? segments[segments.length - 2] : ''
}

// Returns a site-internal href for a CMS link, or "/" when there is no slug.
export const getHrefFromLink = (
    link: string | null | undefined,
    prefix = '',
): string => {
    const slug = getSlugFromLink(link)
    return slug ? `${prefix}/${slug}` : '/'
}

// Makes links to this site relative so next/link navigates on the client
export const toInternalHref = (link: string, homeUrl: string): string =>
    link.startsWith(homeUrl) ? link.substring(homeUrl.length) || '/' : link
