'use client'

import {useEffect, useState} from 'react'
import classes from './SharedCarousel.module.css'
import SharedCarouselControls from './SharedCarouselControls'
import SharedCarouselDots from './SharedCarouselDots'
import SharedCarouselSliderContent, {
    SliderImage,
} from './SharedCarouselSliderContent'

export default function SharedCarouselSlider({
    sliderElements,
}: {
    sliderElements: Array<SliderImage>
}) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [carouselManualNav, setCarouselManualNav] = useState(false)

    useEffect(() => {
        if (carouselManualNav) return
        const interval = setInterval(() => {
            setActiveIndex(
                activeIndex === sliderElements.length - 1 ? 0 : activeIndex + 1,
            )
        }, 5000)
        return () => clearInterval(interval)
    }, [activeIndex, carouselManualNav, sliderElements.length])

    const handleNavigateSlide = (movingDirection: string) => {
        setCarouselManualNav(true)
        setActiveIndex(
            movingDirection === 'backward'
                ? activeIndex === 0
                    ? sliderElements.length - 1
                    : activeIndex - 1
                : activeIndex === sliderElements.length - 1
                  ? 0
                  : activeIndex + 1,
        )
    }

    return (
        <div className={classes.SharedCarouselContainer}>
            <SharedCarouselSliderContent
                activeIndex={activeIndex}
                sliderImages={sliderElements}
                prevSlide={() => handleNavigateSlide('backward')}
                nextSlide={() => handleNavigateSlide('forward')}
            />
            <SharedCarouselControls
                prevSlide={() => handleNavigateSlide('backward')}
                nextSlide={() => handleNavigateSlide('forward')}
            />
            <SharedCarouselDots
                activeIndex={activeIndex}
                sliderImage={sliderElements}
                onclick={activeIndex => {
                    setCarouselManualNav(true)
                    setActiveIndex(activeIndex)
                }}
            />
        </div>
    )
}
