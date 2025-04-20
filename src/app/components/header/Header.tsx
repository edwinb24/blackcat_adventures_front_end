import {LOGO_IMAGE} from '@/app/utils/constants'
import Image from 'next/image'
import HamburgerMenu from './hamburger_menu/HamburgerMenu'
import classes from './Header.module.css'
import MainMenu from './main_menu/MainMenu'
import SocialMediaMenu from './social_media_menu/SocialMediaMenu'

export default function Header() {
  return (
    <div className={classes.HeaderWrapper}>
      <div className={classes.MainHeader}>
        <div className={classes.HeaderNavigation}>
          <HamburgerMenu />
          <div className={classes.HeaderMenu}>
            <Image
              className={classes.MainMenuLogo}
              src={LOGO_IMAGE}
              width={300}
              height={100}
              alt='Logo'
            />
            {/* Refactor this to its own component */}
            <MainMenu />
            <SocialMediaMenu />
          </div>
        </div>
      </div>
    </div>
  )
}
