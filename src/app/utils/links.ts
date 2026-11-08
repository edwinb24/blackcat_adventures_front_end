// CMS links have the form "https://cms.example.com/<section>/<slug>/".
// The slug is the second-last segment, because the link ends with "/".
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

// Makes absolute links to this site relative, so that next/link navigates
// on the client. Other links are returned unchanged.
export const toInternalHref = (link: string, homeUrl: string): string =>
    link.startsWith(homeUrl) ? link.substring(homeUrl.length) || '/' : link
