import {HOME_URL, NEWSLETTER_PAGE} from '@/utils/constants'
import {toInternalHref} from '@/utils/links'
import Image from 'next/image'
import Link from 'next/link'
import {type TouchEvent, useRef} from 'react'
import classes from './SharedCarousel.module.css'

const SWIPE_THRESHOLD_PX = 150

export type SliderImage = {
    title: string
    id: string
    description: string
    link: string
    imageUrl: string
    imageAltText: string
}

export default function SharedCarouselSliderContent({
    activeIndex,
    sliderImages,
    prevSlide,
    nextSlide,
}: {
    activeIndex: number
    sliderImages: Array<SliderImage>
    prevSlide: () => void
    nextSlide: () => void
}) {
    const swipeStartingPosition = useRef(0)

    const handleSwipeStart = (e: TouchEvent<HTMLElement>) => {
        swipeStartingPosition.current = e.changedTouches[0].clientX
    }

    const handleSwipeEnd = (e: TouchEvent<HTMLElement>) => {
        const distanceSwipe =
            e.changedTouches[0].clientX - swipeStartingPosition.current
        if (Math.abs(distanceSwipe) > SWIPE_THRESHOLD_PX) {
            if (distanceSwipe > 0) prevSlide()
            else nextSlide()
        }
        swipeStartingPosition.current = 0
    }

    const carouselLinks = sliderImages.map((slide, index) => {
        const opensNewTab = slide.link === NEWSLETTER_PAGE.link
        return (
            <Link
                key={slide.id}
                href={toInternalHref(slide.link, HOME_URL)}
                target={opensNewTab ? '_blank' : '_self'}
                rel={opensNewTab ? 'noopener noreferrer' : undefined}
            >
                <div
                    className={`${classes.SharedCarouselIndividualSlide} ${
                        index === activeIndex
                            ? classes.SharedCarouselActiveSlide
                            : ''
                    }`}
                >
                    <Image
                        className={classes.SharedCarouselSlideImage}
                        src={slide.imageUrl}
                        alt={slide.imageAltText || slide.title}
                        width={500}
                        height={400}
                        loading='eager'
                    />
                    <div className={classes.SharedCarouselTextWrapper}>
                        <h2 className={classes.SharedCarouselSlideTitle}>
                            {slide.title}
                        </h2>
                        <div
                            className={classes.SharedCarouselDescriptionWrapper}
                        >
                            <h3 className={classes.SharedCarouselSlideDesc}>
                                {slide.description}
                            </h3>
                        </div>
                    </div>
                </div>
            </Link>
        )
    })

    return (
        <section onTouchStart={handleSwipeStart} onTouchEnd={handleSwipeEnd}>
            {carouselLinks}
        </section>
    )
}
