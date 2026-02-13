'use client'
import {HOME_URL, LOGO_IMAGE} from '@/utils/constants'
import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'
import {useGetPostListQuery} from './graphql/useGetPostListQuery'
import HamburgerMenu from './hamburger_menu/HamburgerMenu'
import classes from './Header.module.css'

export default function Header() {
    const [hambugerOpen, setHamburgerOpen] = useState(false)
    const {data, error, loading} = useGetPostListQuery()
    if (error) return <p>Error Loading this Element</p>
    if (loading) return <p>Loading...</p>
    if (!data || !data.posts) {
        return <p>Element Fail to Load</p>
    }

    const toggleHamburger = () => setHamburgerOpen(!hambugerOpen)
    const openHambugerMenuClass = hambugerOpen ? classes.OpenHeaderMenu : ''
    const menuPages = data.posts.nodes.map(menuPage => (
        <li key={menuPage.id}>
            <Link
                href={`${menuPage.link && menuPage.link.indexOf(HOME_URL) >= 0 ? menuPage.link.split(HOME_URL + '/')[1] : '/'}`}
            >
                {menuPage.title}
            </Link>
        </li>
    ))
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
                <ul>{menuPages}</ul>
                <HamburgerMenu hambugerOpen={hambugerOpen} />
            </div>
        </div>
    )
}
