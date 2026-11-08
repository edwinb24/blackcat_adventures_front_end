'use client'

import {useEffect, useState} from 'react'
import classes from './SharedCarousel.module.css'
import SharedCarouselControls from './SharedCarouselControls'
import SharedCarouselDots from './SharedCarouselDots'
import SharedCarouselSliderContent, {
    SliderImage,
} from './SharedCarouselSliderContent'

const AUTOPLAY_INTERVAL_MS = 5000

export default function SharedCarouselSlider({
    sliderElements,
}: {
    sliderElements: Array<SliderImage>
}) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [carouselManualNav, setCarouselManualNav] = useState(false)
    const slideCount = sliderElements.length

    useEffect(() => {
        if (carouselManualNav || slideCount < 2) return
        const interval = setInterval(() => {
            setActiveIndex(index => (index + 1) % slideCount)
        }, AUTOPLAY_INTERVAL_MS)
        return () => clearInterval(interval)
    }, [carouselManualNav, slideCount])

    const goToSlide = (index: number) => {
        setCarouselManualNav(true)
        setActiveIndex(index)
    }
    const prevSlide = () =>
        goToSlide(activeIndex === 0 ? slideCount - 1 : activeIndex - 1)
    const nextSlide = () =>
        goToSlide(activeIndex === slideCount - 1 ? 0 : activeIndex + 1)

    return (
        <div className={classes.SharedCarouselContainer}>
            <SharedCarouselSliderContent
                activeIndex={activeIndex}
                sliderImages={sliderElements}
                prevSlide={prevSlide}
                nextSlide={nextSlide}
            />
            <SharedCarouselControls
                prevSlide={prevSlide}
                nextSlide={nextSlide}
            />
            <SharedCarouselDots
                activeIndex={activeIndex}
                sliderImages={sliderElements}
                onSelect={goToSlide}
            />
        </div>
    )
}
