'use client'
import {LOGO_IMAGE} from '@/app/utils/constants'
import Image from 'next/image'
import {useState} from 'react'
import HamburgerMenu from './hamburger_menu/HamburgerMenu'
import classes from './Header.module.css'

export default function Header() {
    const [hambugerOpen, setHamburgerOpen] = useState(false)

    const toggleHamburger = () => setHamburgerOpen(!hambugerOpen)
    const openHambugerMenuClass = hambugerOpen ? classes.OpenHeaderMenu : ''
    return (
        <div className={`${classes.Header} ${openHambugerMenuClass}`}>
            <Image
                className={classes.MainMenuLogo}
                src={LOGO_IMAGE}
                width={300}
                height={100}
                alt='Logo'
            />
            <div className={classes.HeaderNavigation} onClick={toggleHamburger}>
                <ul>
                    <li>ITEM 1</li>
                    <li>ITEM 2</li>
                    <li>ITEM 3</li>
                    <li>ITEM 4</li>
                </ul>
                <HamburgerMenu hambugerOpen={hambugerOpen} />
            </div>
        </div>
    )
}
