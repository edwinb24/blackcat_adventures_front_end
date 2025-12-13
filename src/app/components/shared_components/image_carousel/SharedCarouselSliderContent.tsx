import Image from 'next/image'
import {BaseSyntheticEvent, useState} from 'react'
import classes from './SharedCarousel.module.css'

type SliderImage = {
    title: string
    description: string
    urls: string
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
    const [swipeStartingPosition, setSwipeStartingPosition] = useState(0)

    const handleSwipeStart = (
        e: BaseSyntheticEvent<
            TouchEvent,
            EventTarget & HTMLElement,
            EventTarget
        >
    ) => {
        setSwipeStartingPosition(
            (e.nativeEvent as TouchEvent).changedTouches[0].clientX
        )
    }

    const handleSwipeEnd = (
        e: BaseSyntheticEvent<
            TouchEvent,
            EventTarget & HTMLElement,
            EventTarget
        >
    ) => {
        const swipeEnd = (e.nativeEvent as TouchEvent).changedTouches[0].clientX
        const distanceSwipe = swipeEnd - swipeStartingPosition
        if (Math.abs(distanceSwipe) > 150) {
            if (distanceSwipe > 0) prevSlide()
            else nextSlide()
        }
        setSwipeStartingPosition(0)
    }

    return (
        <section
            onTouchStart={e => handleSwipeStart(e)}
            onTouchEnd={e => handleSwipeEnd(e)}
        >
            {sliderImages.map((slide, index) => (
                <div
                    key={index}
                    onClick={() => console.log('CLICK')}
                    className={`${classes.SharedCarouselIndividualSlide} ${
                        index === activeIndex
                            ? classes.SharedCarouselActiveSlide
                            : ''
                    }`}
                >
                    <Image
                        className={classes.SharedCarouselSlideImage}
                        src={slide.urls}
                        alt={slide.title}
                        width={500}
                        height={400}
                    />
                    <div className={classes.SharedCarouselTextWrapper}>
                        <h2
                            className={`${classes.SharedCarouselSlideText} ${classes.SharedCarouselSlideTitle}`}
                        >
                            {slide.title}
                        </h2>
                        <h3
                            className={`${classes.SharedCarouselSlideText} ${classes.SharedCarouselSlideDesc}`}
                        >
                            {slide.description}
                        </h3>
                    </div>
                </div>
            ))}
        </section>
    )
}
