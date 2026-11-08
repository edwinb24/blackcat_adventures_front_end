'use client'

import type {ReactNode} from 'react'

const LinkButton = ({
    href,
    className,
    children,
}: {
    href: string
    className: string
    children: ReactNode
}) => {
    return (
        <button
            type='button'
            role='link'
            className={className}
            onClick={() => window.location.assign(href)}
        >
            {children}
        </button>
    )
}

export default LinkButton
