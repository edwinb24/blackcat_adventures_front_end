'use client'
import {LOGO_IMAGE} from '@/app/utils/constants'
import Image from 'next/image'
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
    const links = data.posts.nodes.map(link => (
        <li key={link.id}>{link.title}</li>
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
                <ul>{links}</ul>
                <HamburgerMenu hambugerOpen={hambugerOpen} />
            </div>
        </div>
    )
}
