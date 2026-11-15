import parse, {Element, type DOMNode} from 'html-react-parser'
import {createElement, Fragment} from 'react'
import {
    ALLOWED_IFRAME_HOSTS,
    BLOCKED_HTML_TAGS,
    IGNORED_URL_CHARACTERS,
    URL_HTML_ATTRIBUTES,
} from './constants'

export const isUnsafeUrl = (value: string, tagName: string): boolean => {
    const normalized = value.replace(IGNORED_URL_CHARACTERS, '').toLowerCase()
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

    if (BLOCKED_HTML_TAGS.has(tagName)) return createElement(Fragment)
    if (tagName === 'iframe' && !isAllowedIframe(element.attribs.src))
        return createElement(Fragment)

    for (const name of Object.keys(element.attribs)) {
        const lowerName = name.toLowerCase()
        if (lowerName.startsWith('on') || lowerName === 'srcdoc') {
            delete element.attribs[name]
        } else if (
            URL_HTML_ATTRIBUTES.has(lowerName) &&
            isUnsafeUrl(element.attribs[name], tagName)
        ) {
            delete element.attribs[name]
        }
    }

    if (tagName === 'a' && element.attribs.target === '_blank') {
        element.attribs.rel = 'noopener noreferrer'
    }

    return undefined
}

// Converts CMS HTML to React elements, removing active content and unsafe URLs
export const parseCmsHtml = (html: string | null | undefined) =>
    parse(html || '', {
        replace: (domNode: DOMNode) =>
            domNode instanceof Element ? sanitizeElement(domNode) : undefined,
    })
