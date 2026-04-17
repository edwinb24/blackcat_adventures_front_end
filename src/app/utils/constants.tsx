import BlueskyIcon from '@/utils/icons/blueskyIcon'
import DiscordIcon from '@/utils/icons/discordIcon'
import ThreadsIcon from '@/utils/icons/threadsIcon'
import TwitchIcon from '@/utils/icons/twitchIcon'
import {
    Email,
    Facebook,
    Instagram,
    Reddit,
    Twitter,
    X,
    YouTube,
} from '@mui/icons-material'

export const SERVER_URL = 'https://cms.blackcat-adventures.com/graphql'
export const CMS_HOME_URL = 'https://cms.blackcat-adventures.com'
export const HOME_URL = 'https://blackcat-adventures.com'
export const WEB3_FORMS_URL = 'https://api.web3forms.com/submit'
export const ABOUT_US_PAGE_ID = 'cG9zdDoxOQ=='
export const HOME_PAGE_SLIDES = 'cG9zdDoxMTE='
export enum SOCIAL_MEDIA_PLATFORMS {
    'youtube' = 'youtube',
    'instagram' = 'instagram',
    'facebook' = 'facebook',
    'twitch' = 'twitch',
    'email' = 'email',
    'twitter' = 'twitter',
    'x' = 'x',
    'bluesky' = 'bluesky',
    'threads' = 'threads',
}

export const SOCIAL_MEDIA_ICONS = new Map([
    [
        SOCIAL_MEDIA_PLATFORMS.youtube,
        <YouTube key={`${SOCIAL_MEDIA_PLATFORMS.youtube}`} />,
    ],
    [
        SOCIAL_MEDIA_PLATFORMS.instagram,
        <Instagram key={`${SOCIAL_MEDIA_PLATFORMS.instagram}`} />,
    ],
    [
        SOCIAL_MEDIA_PLATFORMS.facebook,
        <Facebook key={`${SOCIAL_MEDIA_PLATFORMS.facebook}`} />,
    ],
    [
        SOCIAL_MEDIA_PLATFORMS.email,
        <Email key={`${SOCIAL_MEDIA_PLATFORMS.email}`} />,
    ],
    [
        SOCIAL_MEDIA_PLATFORMS.twitter,
        <Twitter key={`${SOCIAL_MEDIA_PLATFORMS.twitter}`} />,
    ],
    [SOCIAL_MEDIA_PLATFORMS.x, <X key={`${SOCIAL_MEDIA_PLATFORMS.x}`} />],
    [
        SOCIAL_MEDIA_PLATFORMS.threads,
        <ThreadsIcon key={`${SOCIAL_MEDIA_PLATFORMS.threads}`} />,
    ],
    [
        SOCIAL_MEDIA_PLATFORMS.bluesky,
        <BlueskyIcon key={`${SOCIAL_MEDIA_PLATFORMS.bluesky}`} />,
    ],
    [
        SOCIAL_MEDIA_PLATFORMS.twitch,
        <TwitchIcon key={`${SOCIAL_MEDIA_PLATFORMS.twitch}`} />,
    ],
])

export enum COMMUNITY_PLATFORMS {
    'discord' = 'discord',
    'reddit' = 'reddit',
}

export const COMMUNITY_ICONS = new Map([
    [
        COMMUNITY_PLATFORMS.reddit,
        <Reddit key={`${COMMUNITY_PLATFORMS.reddit}`} />,
    ],
    [
        COMMUNITY_PLATFORMS.discord,
        <DiscordIcon key={`${COMMUNITY_PLATFORMS.discord}`} />,
    ],
])

export const LOGO_IMAGE =
    'https://ik.imagekit.io/edwinb24/Others/placeholder_logo_05R07slci.PNG?updatedAt=1744637899062'

export const SOCIAL_MEDIA_LINKS =
    'https://ik.imagekit.io/edwinb24/Others/placeholder_logo_05R07slci.PNG?updatedAt=1744637899062'

export const CONTACT_US_PAGE = {
    id: 'contact-us-page',
    link: '/contact-us',
    title: 'Contact Us',
    __typename: 'Post',
}
