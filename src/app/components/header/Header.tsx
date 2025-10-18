import {LOGO_IMAGE} from '@/app/utils/constants'
import Image from 'next/image'
import HamburgerMenu from './hamburger_menu/HamburgerMenu'
import classes from './Header.module.css'
import MainMenu from './main_menu/MainMenu'

export default function Header() {
    return (
        <div className={classes.HeaderWrapper}>
            <Image
                className={classes.MainMenuLogo}
                src={LOGO_IMAGE}
                width={300}
                height={100}
                alt='Logo'
            />
            <div className={classes.MainHeader}>
                <div className={classes.HeaderNavigation}>
                    <HamburgerMenu />
                    <div className={classes.HeaderMenu}>
                        <MainMenu />
                    </div>
                </div>
            </div>
        </div>
    )
}
