import {SOCIAL_MEDIA_ICONS, SOCIAL_MEDIA_PLATFORMS} from '@/utils/constants'
import Link from 'next/link'
import {GetSocialMediaQuery} from './graphql/useGetSocialMediaQuery.generated'
import classes from './SocialMediaMenu.module.css'

export default function SocialMediaMenu({
    socialMediaInfo,
}: {
    socialMediaInfo: GetSocialMediaQuery
}) {
    const socialMedias = (socialMediaInfo.socialMediaLinks?.nodes || []).filter(
        node =>
            node.socialMedia?.socialMediaPlatform &&
            node.socialMedia.socialMediaLink,
    )

    const socialMediaEntries = socialMedias.map((socialMed, ind: number) => {
        const platform = socialMed.socialMedia?.socialMediaPlatform || ''
        const link = socialMed.socialMedia?.socialMediaLink || ''
        const icon = SOCIAL_MEDIA_ICONS.get(
            platform.toLowerCase() as SOCIAL_MEDIA_PLATFORMS,
        )

        return (
            <li key={`${platform}_${ind}`}>
                <Link href={link} aria-label={icon ? platform : undefined}>
                    {icon || <p>{platform}</p>}
                </Link>
            </li>
        )
    })

    return <ul className={classes.SocialMediaMenu}>{socialMediaEntries}</ul>
}
