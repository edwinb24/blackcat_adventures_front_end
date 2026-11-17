import {LOGO_IMAGE} from '@/utils/constants'
import {Casino, Hiking, TravelExplore} from '@mui/icons-material'
import Image from 'next/image'
import HomeCarouselSlider from './HomeCarouselSlider'
import classes from './HomeContent.module.css'
import type {GetHomeSlideListQuery} from './graphql/useGetHomeSlideListQuery.generated'

export default function HomeContent({
    homeSlidesData,
}: {
    homeSlidesData: GetHomeSlideListQuery
}) {
    return (
        <main className={classes.PageMain}>
            <div className={classes.MobileHomeLogoWrapper}>
                <Image
                    className={classes.MobileHomeLogo}
                    src={LOGO_IMAGE.url}
                    width={300}
                    height={100}
                    alt={LOGO_IMAGE.alt}
                    loading='eager'
                />
            </div>
            <HomeCarouselSlider homeSlidesData={homeSlidesData} />
            <div className={classes.MainContentWrapper}>
                <div className={classes.FeaturedServicesWrapper}>
                    <ul className={classes.FeaturedServices}>
                        <li className={classes.PanelWithIcon}>
                            <TravelExplore
                                fontSize='inherit'
                                key='INPERSON_AND_ONLINE'
                            />
                            <p>In-person and online</p>
                        </li>
                        <li className={classes.PanelWithIcon}>
                            <Hiking
                                fontSize='inherit'
                                key='CAMPAIGN_AND_ONESHOTS'
                            />
                            <p>Campaigns and One-Shots</p>
                        </li>
                        <li className={classes.PanelWithIcon}>
                            <Casino
                                fontSize='inherit'
                                key='CUSTOM_ADVENTURES'
                            />
                            <p>Request your Custom Adventure</p>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    )
}
