import SocialMediaMenu from '@/components/social_media_links/SocialMediaMenu'
import classes from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={classes.Footer}>
            <p>Follow Us</p>
            <SocialMediaMenu />
        </footer>
    )
}
