import type React from 'react'

// Renders the Twitch logo as a decorative inline SVG icon
export default function TwitchIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            aria-hidden='true'
            fill='currentColor'
            focusable='false'
            height='1em'
            viewBox='0 0 24 24'
            width='1em'
            {...props}
        >
            <path
                d='M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142z'
            />
            <path
                d='M11.857 3.143h-1.143V6.57h1.143zm-3.143 0H7.571V6.57h1.143z'
            />
        </svg>
    )
}
