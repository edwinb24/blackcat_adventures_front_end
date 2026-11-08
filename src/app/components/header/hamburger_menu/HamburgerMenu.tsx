import type {KeyboardEvent} from 'react'
import classes from './HamburgerMenu.module.css'

const HamburgerMenu = ({
    hamburgerOpen,
    onToggle,
}: {
    hamburgerOpen: boolean
    onToggle: () => void
}) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onToggle()
        }
    }

    return (
        <div
            role='button'
            tabIndex={0}
            aria-label={hamburgerOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={hamburgerOpen}
            onKeyDown={handleKeyDown}
            className={`${classes.Hamburger} ${
                hamburgerOpen ? classes.OpenHamburgerMenu : ''
            }`}
        >
            <div className={classes.HamburgerBar1}></div>
            <div className={classes.HamburgerBar2}></div>
            <div className={classes.HamburgerBar3}></div>
        </div>
    )
}

export default HamburgerMenu
