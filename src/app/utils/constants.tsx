import type {TypeContactUsFormData, TypeContactUsFormInput} from '@/SharedTypes'
import BlueskyIcon from '@/utils/icons/blueskyIcon'
import ThreadsIcon from '@/utils/icons/threadsIcon'
import TwitchIcon from '@/utils/icons/twitchIcon'
import {
    Email,
    Facebook,
    Instagram,
    Twitter,
    X,
    YouTube,
} from '@mui/icons-material'
import type {ReactElement} from 'react'

export const SERVER_URL =
    process.env.GRAPHQL_URL || 'https://cms.blackcat-adventures.com/graphql'
export const HOME_URL = 'https://blackcat-adventures.com'
export const WEB3_FORMS_URL = 'https://api.web3forms.com/submit'
export const WEB3_FORMS_ACCESS_KEY =
    process.env.NEXT_PUBLIC_W3FORMS_ACCESS_KEY || ''
export const HOME_PAGE_SLIDES = 'cG9zdDoxMTE='
export const ABOUT_US_PAGE_ID = 'cG9zdDoxOQ=='
export const MODULES_PAGE_ID = 'cG9zdDoxNTY='
export const DMING_SERVICES_PAGE_ID = 'cG9zdDox'
export const EVENTS_PAGE_ID = 'cG9zdDoxODg='

export enum SOCIAL_MEDIA_PLATFORMS {
    youtube = 'youtube',
    instagram = 'instagram',
    facebook = 'facebook',
    twitch = 'twitch',
    email = 'email',
    twitter = 'twitter',
    x = 'x',
    bluesky = 'bluesky',
    threads = 'threads',
}

export const SOCIAL_MEDIA_ICONS = new Map<SOCIAL_MEDIA_PLATFORMS, ReactElement>(
    [
        [SOCIAL_MEDIA_PLATFORMS.youtube, <YouTube key='youtube' />],
        [SOCIAL_MEDIA_PLATFORMS.instagram, <Instagram key='instagram' />],
        [SOCIAL_MEDIA_PLATFORMS.facebook, <Facebook key='facebook' />],
        [SOCIAL_MEDIA_PLATFORMS.email, <Email key='email' />],
        [SOCIAL_MEDIA_PLATFORMS.twitter, <Twitter key='twitter' />],
        [SOCIAL_MEDIA_PLATFORMS.x, <X key='x' />],
        [SOCIAL_MEDIA_PLATFORMS.threads, <ThreadsIcon key='threads' />],
        [SOCIAL_MEDIA_PLATFORMS.bluesky, <BlueskyIcon key='bluesky' />],
        [SOCIAL_MEDIA_PLATFORMS.twitch, <TwitchIcon key='twitch' />],
    ],
)

export const LOGO_IMAGE = {
    alt: 'Black Cat Adventures Logo',
    url: 'https://cms.blackcat-adventures.com/wp-content/uploads/2026/06/Temporary-logo2.webp',
}

export const CONTACT_US_PAGE = {
    id: 'contact-us-page',
    link: '/contact-us',
    title: 'Contact Us',
}

export const NEWSLETTER_PAGE = {
    id: 'newsletter-page',
    link: 'https://forms.gle/vFKqbonPNs8794yj7',
    title: 'Newsletter',
}

export const EVENTS_PAGE = {
    id: 'event-page',
    link: '/organized-events',
    title: 'Events',
}

export const MODULES_PAGE = {
    id: 'modules-page',
    link: '/module',
    title: 'Modules',
}

export enum MODULE_STATUS {
    published = 'published',
    draft = 'draft',
    hidden = 'hidden',
}

export enum EVENT_STATUS {
    live = 'live',
    comingsoon = 'comingsoon',
    hidden = 'hidden',
}

export const CONTACT_MESSAGE_MAX_LENGTH = 500
export const CONTACT_MESSAGE_LENGTH_HINT =
    `Maximum ${CONTACT_MESSAGE_MAX_LENGTH} characters.`
export const FIELD_REQUIRED_MESSAGE = 'Field Required'
export const INVALID_EMAIL_MESSAGE = 'Please Enter A Valid Email'
export const CORRECT_FIELDS_MESSAGE = 'Please correct fields before submitting'
export const SUBMIT_FAILED_MESSAGE =
    'The form could not be sent. Please try again later.'
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const EMPTY_CONTACT_FORM_INPUT: TypeContactUsFormInput = {
    value: '',
    validationMessage: '',
    edited: false,
}

export const INITIAL_CONTACT_FORM: TypeContactUsFormData = {
    name: EMPTY_CONTACT_FORM_INPUT,
    email: EMPTY_CONTACT_FORM_INPUT,
    message: EMPTY_CONTACT_FORM_INPUT,
}

export const CAROUSEL_AUTOPLAY_INTERVAL_MILLISECONDS = 5000
export const CAROUSEL_SWIPE_THRESHOLD_PIXELS = 150

export const BLOCKED_HTML_TAGS = new Set([
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

export const ALLOWED_IFRAME_HOSTS = new Set([
    'www.youtube.com',
    'youtube.com',
    'www.youtube-nocookie.com',
    'player.vimeo.com',
    'player.twitch.tv',
])

export const URL_HTML_ATTRIBUTES = new Set([
    'href',
    'src',
    'action',
    'formaction',
    'xlink:href',
    'poster',
    'background',
])

export const IGNORED_URL_CHARACTERS = /[\u0000- \u007f-\u009f]/g
