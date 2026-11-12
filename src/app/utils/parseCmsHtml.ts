import parse, {Element, type DOMNode} from 'html-react-parser'
import {createElement, Fragment} from 'react'

// html-react-parser converts HTML to React elements, but it does NOT sanitize.
// The pages are rendered on the server, so a <script> tag in CMS content would
// run in the browser. This blocklist removes active content before rendering.

const BLOCKED_TAGS = new Set([
    'script',
    'style',
    'object',
    'embed',
    'applet',
    'base',
    'link',
    'meta',
    'form',
    'input',
    'button',
    'textarea',
    'select',
    'frame',
    'frameset',
    'noscript',
    'template',
])

// Iframes are allowed only from these hosts (video embeds), over https.
const ALLOWED_IFRAME_HOSTS = new Set([
    'www.youtube.com',
    'youtube.com',
    'www.youtube-nocookie.com',
    'player.vimeo.com',
    'player.twitch.tv',
])

const URL_ATTRIBUTES = new Set([
    'href',
    'src',
    'action',
    'formaction',
    'xlink:href',
    'poster',
    'background',
])

// Removes whitespace and control characters that browsers ignore in URLs,
// for example "java\nscript:".
const IGNORED_URL_CHARS = /[\u0000- \u007f-\u009f]/g

export const isUnsafeUrl = (value: string, tagName: string): boolean => {
    const normalized = value.replace(IGNORED_URL_CHARS, '').toLowerCase()
    if (
        normalized.startsWith('javascript:') ||
        normalized.startsWith('vbscript:')
    )
        return true
    if (normalized.startsWith('data:'))
        return !(tagName === 'img' && normalized.startsWith('data:image/'))
    return false
}

const isAllowedIframe = (src: string | undefined): boolean => {
    if (!src) return false
    try {
        const url = new URL(src)
        return (
            url.protocol === 'https:' && ALLOWED_IFRAME_HOSTS.has(url.hostname)
        )
    } catch {
        return false
    }
}

const sanitizeElement = (element: Element) => {
    const tagName = element.name.toLowerCase()

    if (BLOCKED_TAGS.has(tagName)) return createElement(Fragment)
    if (tagName === 'iframe' && !isAllowedIframe(element.attribs.src))
        return createElement(Fragment)

    for (const name of Object.keys(element.attribs)) {
        const lowerName = name.toLowerCase()
        if (lowerName.startsWith('on') || lowerName === 'srcdoc') {
            delete element.attribs[name]
        } else if (
            URL_ATTRIBUTES.has(lowerName) &&
            isUnsafeUrl(element.attribs[name], tagName)
        ) {
            delete element.attribs[name]
        }
    }

    if (tagName === 'a' && element.attribs.target === '_blank') {
        element.attribs.rel = 'noopener noreferrer'
    }

    // Returning undefined lets the parser convert the (now cleaned) element.
    return undefined
}

export const parseCmsHtml = (html: string | null | undefined) =>
    parse(html || '', {
        replace: (domNode: DOMNode) =>
            domNode instanceof Element ? sanitizeElement(domNode) : undefined,
    })
