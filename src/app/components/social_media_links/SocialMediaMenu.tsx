'use client'
import {SOCIAL_MEDIA_ICONS, SOCIAL_MEDIA_PLATFORMS} from '@/utils/constants'
import Link from 'next/link'
import {useGetSocialMediaQuery} from './graphql/useGetSocialMediaQuery'
import classes from './SocialMediaMenu.module.css'

export default function SocialMediaMenu() {
    const {data, error, loading} = useGetSocialMediaQuery()
    if (error) return <p>Error Loading this Element</p>
    if (loading) return <p>Loading...</p>
    if (!data || !data?.socialMediaLinks) {
        return <p>Element Fail to Load</p>
    }

    console.log('data=====')
    console.log(data)
    const socialMedias = data.socialMediaLinks.nodes
    const socialMediaEntries = socialMedias.map((socialMed, ind: number) => {
        if (
            !socialMed.socialMedia?.socialMediaPlatform ||
            !socialMed.socialMedia?.socialMediaLink
        )
            return (
                <li key={ind}>
                    <p>Social Media Link Fail to Load</p>
                </li>
            )
        const {socialMediaPlatform, socialMediaLink} = socialMed.socialMedia

        return (
            <li key={`${socialMediaPlatform}_${ind}`}>
                <Link href={`${socialMediaLink}`}>
                    {socialMediaPlatform?.toLowerCase() &&
                    SOCIAL_MEDIA_ICONS.has(
                        socialMediaPlatform?.toLowerCase() as SOCIAL_MEDIA_PLATFORMS,
                    ) ? (
                        SOCIAL_MEDIA_ICONS.get(
                            socialMediaPlatform?.toLowerCase() as SOCIAL_MEDIA_PLATFORMS,
                        )
                    ) : (
                        <p>{socialMed.socialMedia?.socialMediaPlatform}</p>
                    )}
                </Link>
            </li>
        )
    })

    return (
        <>
            <ul className={classes.SocialMediaMenu}>{socialMediaEntries}</ul>
        </>
    )
}
