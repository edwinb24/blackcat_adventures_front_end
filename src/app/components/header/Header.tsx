'use client'
import {NewsletterModalContext} from '@/contexts/newsletterModalContext'
import {
    CONTACT_US_PAGE,
    LOGO_IMAGE,
    MODULES_PAGE,
    NEWSLETTER_LINK,
} from '@/utils/constants'
import Image from 'next/image'
import Link from 'next/link'
import {useContext, useState} from 'react'
import {GetPostListQuery} from './graphql/useGetPostListQuery.generated'
import HamburgerMenu from './hamburger_menu/HamburgerMenu'
import classes from './Header.module.css'

export default function Header({
    headerMenuOptions,
}: {
    headerMenuOptions: GetPostListQuery
}) {
    const setModalOpen = useContext(NewsletterModalContext)

    const [hambugerOpen, setHamburgerOpen] = useState(false)
    const [moduleDropdownOpen, setModuleDropdownOpen] = useState(false)

    const toggleHamburger = () => setHamburgerOpen(!hambugerOpen)
    const toggleDropdownMenu = (value: boolean) => setModuleDropdownOpen(value)
    const openHambugerMenuClass = hambugerOpen ? classes.OpenHeaderMenu : ''
    const OpenDropdownMenu = moduleDropdownOpen ? classes.OpenDropdownMenu : ''

    const handleShowModal = (value: boolean) => setModalOpen(value)

    const filteredModuleOptions =
        headerMenuOptions.modules?.nodes.filter(a => a.link) || []

    const modulePages =
        filteredModuleOptions?.length > 0
            ? filteredModuleOptions.map(modulePage => {
                  const linkToModule = modulePage.link!.split('/')
                  return (
                      <li key={modulePage.id}>
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
    const menuPages = [
        <li key={'moduleList'}>
            <div
                className={`${classes.menuElementWithDropdown}`}
                onMouseEnter={() => toggleDropdownMenu(true)}
                onMouseLeave={() => toggleDropdownMenu(false)}
            >
                <div className={`${classes.menuElementWithDropdown}`}>
                    <Link href={`${MODULES_PAGE.link}`}>Modules</Link>
                </div>
                <ul
                    className={`${classes.menuDropdownElement} ${OpenDropdownMenu}`}
                >
                    {modulePages}
                </ul>
            </div>
        </li>,
    ]

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

    // Adding NewsLetter Link
    menuPages.push(
        <li
            key={NEWSLETTER_LINK.id}
            onClick={() => {
                handleShowModal(true)
            }}
            role='link'
        >
            {NEWSLETTER_LINK.title}
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
                <ul>{menuPages}</ul>
                <HamburgerMenu hambugerOpen={hambugerOpen} />
            </div>
        </header>
    )
}
