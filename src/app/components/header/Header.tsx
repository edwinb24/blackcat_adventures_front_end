'use client'
import {CMS_HOME_URL, CONTACT_US_PAGE, LOGO_IMAGE} from '@/utils/constants'
import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'
import {useGetPostListQuery} from './graphql/useGetPostListQuery'
import HamburgerMenu from './hamburger_menu/HamburgerMenu'
import classes from './Header.module.css'

export default function Header() {
    const [hambugerOpen, setHamburgerOpen] = useState(false)
    const [moduleDropdownOpen, setModuleDropdownOpen] = useState(false)
    const {data, error, loading} = useGetPostListQuery() // ADD MODULE CALL
    if (error) return <p>Error Loading this Element</p>
    if (loading) return <p>Loading...</p>
    if (!data || !data.posts) {
        return <p>Element Fail to Load</p>
    }

    const toggleHamburger = () => setHamburgerOpen(!hambugerOpen)
    const toggleDropdownMenu = (value: boolean) => setModuleDropdownOpen(value)
    const openHambugerMenuClass = hambugerOpen ? classes.OpenHeaderMenu : ''
    const OpenDropdownMenu = moduleDropdownOpen ? classes.OpenDropdownMenu : ''

    const modulePages = data.modules
        ? data.modules.nodes.map(menuPage => (
              <li key={menuPage.id}>
                  <Link
                      href={`${
                          menuPage.link &&
                          menuPage.link.indexOf(CMS_HOME_URL) >= 0
                              ? menuPage.link.split(CMS_HOME_URL + '/')[1]
                              : '/'
                      }`}
                  >
                      {menuPage.title}
                  </Link>
              </li>
          ))
        : null

    const menuPages = data.posts.nodes.map(menuPage => (
        <li key={menuPage.id}>
            <Link
                href={`${menuPage.link && menuPage.link.indexOf(CMS_HOME_URL) >= 0 ? menuPage.link.split(CMS_HOME_URL + '/')[1] : '/'}`}
            >
                {menuPage.title}
            </Link>
        </li>
    ))

    // Adding Contact Us Link
    menuPages.push(
        <li key={CONTACT_US_PAGE.id}>
            <Link href={`${CONTACT_US_PAGE.link}`}>
                {CONTACT_US_PAGE.title}
            </Link>
        </li>,
    )

    // Adding Modules
    menuPages.push(
        <li key={'moduleList'}>
            <div
                className={`${classes.menuElementWithDropdown}`}
                onMouseEnter={() => toggleDropdownMenu(true)}
                onMouseLeave={() => toggleDropdownMenu(false)}
            >
                <div className={`${classes.menuElementWithDropdown}`}>
                    <Link href={`${CONTACT_US_PAGE.link}`}>Modules</Link>
                </div>
                <ul
                    className={`${classes.menuDropdownElement} ${OpenDropdownMenu}`}
                >
                    {modulePages}
                </ul>
            </div>
        </li>,
    )

    return (
        <header className={`${classes.Header} ${openHambugerMenuClass}`}>
            <Link href={'/'}>
                <Image
                    className={classes.MainMenuLogo}
                    src={LOGO_IMAGE}
                    width={300}
                    height={100}
                    alt='Logo'
                />
            </Link>
            <div className={classes.HeaderNavigation} onClick={toggleHamburger}>
                <ul>{menuPages}</ul>
                <HamburgerMenu hambugerOpen={hambugerOpen} />
            </div>
        </header>
    )
}
