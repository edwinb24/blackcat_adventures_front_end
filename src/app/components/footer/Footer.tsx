import type {GetSocialMediaQuery} from '@/components/social_media_links/graphql/useGetSocialMediaQuery.generated'
import SocialMediaMenu from '@/components/social_media_links/SocialMediaMenu'
import classes from './Footer.module.css'

export default function Footer({
    socialMediaInfo,
}: {
    socialMediaInfo: GetSocialMediaQuery
}) {
    return (
        <footer className={classes.Footer}>
            <p>Follow Us</p>
            <SocialMediaMenu socialMediaInfo={socialMediaInfo} />
        </footer>
    )
}
