'use client'

import {useState} from 'react'
import classes from './HamburgerMenu.module.css'

export default function HamburgerMenu() {
    const [hamburgerMenuTrigger, setHamburgerMenuTrigger] = useState(false)

    return (
        <>
            <div
                className={`${classes.Hamburger} ${
                    hamburgerMenuTrigger ? classes.Change : ''
                }`}
            >
                <div className={classes.HamburgerBar1}></div>
                <div className={classes.HamburgerBar2}></div>
                <div className={classes.HamburgerBar3}></div>
            </div>
        </>
    )
}
