'use client'
import {FEATURED_SERVICE_ICON_SIZE, LOGO_IMAGE} from '@/utils/constants'
import {Casino, Hiking, TravelExplore} from '@mui/icons-material'
import Image from 'next/image'
import HomeCarouselSlider from './HomeCarouselSlider'
import classes from './HomeContent.module.css'

const styles = {
    featuredServicesIcon: {
        fontSize: FEATURED_SERVICE_ICON_SIZE,
        color: '#dfdfdf',
    },
}

export default function HomeContent() {
    return (
        <main className={classes.PageMain}>
            <div className={classes.MobileHomeLogoWrapper}>
                <Image
                    className={classes.MobileHomeLogo}
                    src={LOGO_IMAGE}
                    width={300}
                    height={100}
                    alt='Logo'
                />
            </div>
            <HomeCarouselSlider />
            <div className={classes.MainContentWrapper}>
                <div className={classes.FeaturedServicesWrapper}>
                    <ul className={classes.FeaturedServices}>
                        <li className={classes.PanelWithIcon}>
                            <TravelExplore
                                sx={styles.featuredServicesIcon}
                                key={`INPERSON_AND_ONLINE`}
                            />
                            <p>In-person and online</p>
                        </li>
                        <li className={classes.PanelWithIcon}>
                            <Hiking
                                sx={styles.featuredServicesIcon}
                                key={`CAMPAIGN_AND_ONESHOTS`}
                            />
                            <p>Campaigns and One-Shots</p>
                        </li>
                        <li className={classes.PanelWithIcon}>
                            <Casino
                                sx={styles.featuredServicesIcon}
                                key={`CUSTOM_ADVENTURES`}
                            />
                            <p>Request your Custom Adventure</p>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    )
}
