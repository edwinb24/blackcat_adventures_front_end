'use client'

import classes from './HamburgerMenu.module.css'

export default function HamburgerMenu({hambugerOpen}: {hambugerOpen: boolean}) {
    return (
        <>
            <div
                className={`${classes.Hamburger} ${
                    hambugerOpen ? classes.OpenHamburgerMenu : ''
                }`}
            >
                <div className={classes.HamburgerBar1}></div>
                <div className={classes.HamburgerBar2}></div>
                <div className={classes.HamburgerBar3}></div>
            </div>
        </>
    )
}
