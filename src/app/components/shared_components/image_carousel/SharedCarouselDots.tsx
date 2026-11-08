import type {KeyboardEvent} from 'react'
import classes from './SharedCarousel.module.css'
import {SliderImage} from './SharedCarouselSliderContent'

export default function SharedCarouselDots({
    activeIndex,
    onSelect,
    sliderImages,
}: {
    activeIndex: number
    onSelect: (index: number) => void
    sliderImages: Array<SliderImage>
}) {
    const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>, index: number) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onSelect(index)
        }
    }

    return (
        <div className={classes.SharedCarouselAllDots}>
            {sliderImages.map((slide, index) => (
                <span
                    key={slide.id}
                    role='button'
                    tabIndex={0}
                    aria-label={`Show slide ${index + 1}${slide.title ? `: ${slide.title}` : ''}`}
                    aria-current={activeIndex === index ? 'true' : undefined}
                    className={`${classes.SharedCarouselDot} ${
                        activeIndex === index
                            ? classes.SharedCarouselActiveDot
                            : ''
                    }`}
                    onClick={() => onSelect(index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                ></span>
            ))}
        </div>
    )
}
