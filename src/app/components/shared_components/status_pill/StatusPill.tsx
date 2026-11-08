import LinkButton from './LinkButton'

export type StatusPillClasses = {
    base: string
    unavailable: string
    available: string
}

const StatusPill = ({
    available,
    href,
    label,
    classes,
}: {
    available: boolean
    href: string
    label: string
    classes: StatusPillClasses
}) => {
    if (!available || !href) {
        return (
            <button
                type='button'
                aria-disabled='true'
                className={`${classes.base} ${classes.unavailable}`}
            >
                Coming Soon
            </button>
        )
    }

    return (
        <LinkButton
            href={href}
            className={`${classes.base} ${classes.available}`}
        >
            {label}
        </LinkButton>
    )
}

export default StatusPill
