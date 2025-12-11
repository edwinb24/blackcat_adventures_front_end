'use client'

import {useEffect, useState} from 'react'
import classes from './SharedCarousel.module.css'
import SharedCarouselControls from './SharedCarouselControls'
import SharedCarouselDots from './SharedCarouselDots'
import SharedCarouselSliderContent from './SharedCarouselSliderContent'

const sliderImages = [
    {
        title: 'Title1',
        description: 'Description1',
        urls: 'https://static.wikia.nocookie.net/pokemon/images/1/19/Ash_Bulbasaur.png/revision/latest?cb=20230211060446',
    },
    {
        title: 'Title2',
        description: 'Description2',
        urls: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFOjWxufbJAXMMdWqSn1nImYs2EEZeLrLINQ&s',
    },
    {
        title: 'Title3',
        description: 'Description3',
        urls: 'https://archives.bulbagarden.net/media/upload/thumb/4/4b/Ash_Squirtle.png/640px-Ash_Squirtle.png',
    },
]

export default function SharedCarouselSlider() {
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(
                activeIndex === sliderImages.length - 1 ? 0 : activeIndex + 1
            )
        }, 5000)
        return () => clearInterval(interval)
    }, [activeIndex])

    return (
        <div className={classes.SharedCarouselContainer}>
            <SharedCarouselSliderContent
                activeIndex={activeIndex}
                sliderImages={sliderImages}
            />
            <SharedCarouselControls
                prevSlide={() =>
                    setActiveIndex(
                        activeIndex === 0
                            ? sliderImages.length - 1
                            : activeIndex - 1
                    )
                }
                nextSlide={() =>
                    setActiveIndex(
                        activeIndex === sliderImages.length - 1
                            ? 0
                            : activeIndex + 1
                    )
                }
            />
            <SharedCarouselDots
                activeIndex={activeIndex}
                sliderImage={sliderImages}
                onclick={activeIndex => setActiveIndex(activeIndex)}
            />
        </div>
    )
}
