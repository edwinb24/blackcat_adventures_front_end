'use client'
import {
    CONTACT_US_PAGE,
    EVENTS_PAGE,
    LOGO_IMAGE,
    MODULES_PAGE,
    NEWSLETTER_PAGE,
} from '@/utils/constants'
import {getHrefFromLink} from '@/utils/links'
import Image from 'next/image'
import Link from 'next/link'
import {type FocusEvent, useState} from 'react'
import {GetPostListQuery} from './graphql/useGetPostListQuery.generated'
import HamburgerMenu from './hamburger_menu/HamburgerMenu'
import classes from './Header.module.css'

export default function Header({
    headerMenuOptions,
}: {
    headerMenuOptions: GetPostListQuery
}) {
    const [hamburgerOpen, setHamburgerOpen] = useState(false)
    const [moduleDropdownOpen, setModuleDropdownOpen] = useState(false)

    const toggleHamburger = () => setHamburgerOpen(open => !open)
    const openHamburgerMenuClass = hamburgerOpen ? classes.OpenHeaderMenu : ''
    const openDropdownMenuClass = moduleDropdownOpen
        ? classes.OpenDropdownMenu
        : ''

    const handleDropdownBlur = (e: FocusEvent<HTMLDivElement>) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setModuleDropdownOpen(false)
        }
    }

    const moduleOptions =
        headerMenuOptions.modules?.nodes.filter(a => a.link) || []
    const cmsMenuPages =
        headerMenuOptions.posts?.nodes.filter(
            a => a.link && a.postFields?.addToMainMenu,
        ) || []

    return (
        <header className={`${classes.Header} ${openHamburgerMenuClass}`}>
            <Link href='/'>
                <Image
                    className={classes.MainMenuLogo}
                    src={LOGO_IMAGE.url}
                    width={300}
                    height={100}
                    alt={LOGO_IMAGE.alt}
                />
            </Link>
            <div className={classes.HeaderNavigation} onClick={toggleHamburger}>
                <ul className={classes.MainMenuItems}>
                    <li key={EVENTS_PAGE.id}>
                        <Link href={EVENTS_PAGE.link}>{EVENTS_PAGE.title}</Link>
                    </li>
                    <li
                        className={classes.MenuElementWithDropdownWrapper}
                        key={MODULES_PAGE.id}
                    >
                        <div
                            className={classes.MenuElementWithDropdown}
                            onMouseEnter={() => setModuleDropdownOpen(true)}
                            onMouseLeave={() => setModuleDropdownOpen(false)}
                            onFocus={() => setModuleDropdownOpen(true)}
                            onBlur={handleDropdownBlur}
                        >
                            <div className={classes.DropdownMenuElementOption}>
                                <Link
                                    href={MODULES_PAGE.link}
                                    aria-haspopup='true'
                                    aria-expanded={moduleDropdownOpen}
                                >
                                    {MODULES_PAGE.title}
                                </Link>
                            </div>
                            <ul
                                className={`${classes.menuDropdownElement} ${openDropdownMenuClass}`}
                            >
                                {moduleOptions.map(modulePage => (
                                    <li
                                        className={classes.SubMenuElement}
                                        key={modulePage.id}
                                    >
                                        <Link
                                            href={getHrefFromLink(
                                                modulePage.link,
                                                '/module',
                                            )}
                                        >
                                            {modulePage.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                    {cmsMenuPages.map(menuPage => (
                        <li key={menuPage.id}>
                            <Link href={getHrefFromLink(menuPage.link)}>
                                {menuPage.title}
                            </Link>
                        </li>
                    ))}
                    <li key={CONTACT_US_PAGE.id}>
                        <Link href={CONTACT_US_PAGE.link}>
                            {CONTACT_US_PAGE.title}
                        </Link>
                    </li>
                    <li key={NEWSLETTER_PAGE.id}>
                        <Link
                            href={NEWSLETTER_PAGE.link}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            {NEWSLETTER_PAGE.title}
                        </Link>
                    </li>
                </ul>
                <HamburgerMenu
                    hamburgerOpen={hamburgerOpen}
                    onToggle={toggleHamburger}
                />
            </div>
        </header>
    )
}
