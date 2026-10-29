'use client'
import {
    CONTACT_US_PAGE,
    EVENTS_PAGE,
    LOGO_IMAGE,
    MODULES_PAGE,
    NEWSLETTER_PAGE,
} from '@/utils/constants'
import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'
import {GetPostListQuery} from './graphql/useGetPostListQuery.generated'
import HamburgerMenu from './hamburger_menu/HamburgerMenu'
import classes from './Header.module.css'

export default function Header({
    headerMenuOptions,
}: {
    headerMenuOptions: GetPostListQuery
}) {
    const [hambugerOpen, setHamburgerOpen] = useState(false)
    const [moduleDropdownOpen, setModuleDropdownOpen] = useState(false)

    const toggleHamburger = () => setHamburgerOpen(!hambugerOpen)
    const toggleDropdownMenu = (value: boolean) => setModuleDropdownOpen(value)
    const openHambugerMenuClass = hambugerOpen ? classes.OpenHeaderMenu : ''
    const OpenDropdownMenu = moduleDropdownOpen ? classes.OpenDropdownMenu : ''

    const filteredModuleOptions =
        headerMenuOptions.modules?.nodes.filter(a => a.link) || []

    const modulePages =
        filteredModuleOptions?.length > 0
            ? filteredModuleOptions.map(modulePage => {
                  const linkToModule = modulePage.link!.split('/')
                  return (
                      <li
                          className={classes.SubMenuElement}
                          key={modulePage.id}
                      >
                          <Link
                              href={
                                  linkToModule.length > 1
                                      ? `/module/${linkToModule[linkToModule.length - 2]}`
                                      : '/'
                              }
                          >
                              {modulePage.title}
                          </Link>
                      </li>
                  )
              })
            : null

    // Adding Modules
    const menuPages = new Array(
        <li key={EVENTS_PAGE.id}>
            <Link href={`${EVENTS_PAGE.link}`}>{EVENTS_PAGE.title}</Link>
        </li>,
    )

    // adding Events page
    menuPages.push(
        <li
            className={`${classes.MenuElementWithDropdownWrapper}`}
            key={'moduleList'}
        >
            <div
                className={`${classes.MenuElementWithDropdown}`}
                onMouseEnter={() => toggleDropdownMenu(true)}
                onMouseLeave={() => toggleDropdownMenu(false)}
            >
                <div className={`${classes.DropdownMenuElementOption}`}>
                    <Link href={`${MODULES_PAGE.link}`}>Modules</Link>
                </div>
                <ul
                    className={`${classes.menuDropdownElement} ${OpenDropdownMenu}`}
                >
                    {modulePages}
                </ul>
            </div>
        </li>,
    )

    // adding CMS page
    headerMenuOptions.posts?.nodes
        .filter(a => a.postFields?.addToMainMenu)
        .forEach(menuPage => {
            const linkToModule = menuPage.link!.split('/')

            menuPages.push(
                <li key={menuPage.id}>
                    <Link
                        href={
                            linkToModule.length > 1
                                ? `/${linkToModule[linkToModule.length - 2]}`
                                : '/'
                        }
                    >
                        {menuPage.title}
                    </Link>
                </li>,
            )
        })

    // Adding Contact Us Link
    menuPages.push(
        <li key={CONTACT_US_PAGE.id}>
            <Link href={`${CONTACT_US_PAGE.link}`}>
                {CONTACT_US_PAGE.title}
            </Link>
        </li>,
    )

    // Adding Newsletter Link
    menuPages.push(
        <li key={NEWSLETTER_PAGE.id}>
            <Link href={`${NEWSLETTER_PAGE.link}`} target='_blank'>
                {NEWSLETTER_PAGE.title}
            </Link>
        </li>,
    )

    return (
        <header className={`${classes.Header} ${openHambugerMenuClass}`}>
            <Link href={'/'}>
                <Image
                    className={classes.MainMenuLogo}
                    src={LOGO_IMAGE.url}
                    width={300}
                    height={100}
                    alt={LOGO_IMAGE.alt}
                />
            </Link>
            <div className={classes.HeaderNavigation} onClick={toggleHamburger}>
                <ul className={classes.MainMenuItems}>{menuPages}</ul>
                <HamburgerMenu hambugerOpen={hambugerOpen} />
            </div>
        </header>
    )
}
