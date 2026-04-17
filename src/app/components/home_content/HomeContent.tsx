'use client'
import {LOGO_IMAGE} from '@/utils/constants'
import Image from 'next/image'
import HomeCarouselSlider from './HomeCarouselSlider'
import classes from './HomeContent.module.css'

export default function HomeContent() {
    return (
        <main>
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
            <Image
                src='https://upload.wikimedia.org/wikipedia/commons/a/af/Caspar_David_Friedrich_-_Wanderer_above_the_Sea_of_Fog.jpeg'
                width={800}
                height={500}
                alt='Banner'
            />
            <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
                egestas. Iaculis massa nisl malesuada lacinia integer nunc
                posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
                Ad litora torquent per conubia nostra inceptos himenaeos. Lorem
                ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
                egestas. Iaculis massa nisl malesuada lacinia integer nunc
                posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
                Ad litora torquent per conubia nostra inceptos himenaeos. Lorem
                ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
                egestas. Iaculis massa nisl malesuada lacinia integer nunc
                posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
                Ad litora torquent per conubia nostra inceptos himenaeos.
            </p>
        </main>
    )
}
