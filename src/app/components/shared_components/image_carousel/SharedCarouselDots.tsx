import classes from './SharedCarousel.module.css'
import {SliderImage} from './SharedCarouselSliderContent'

//NOTE - Replace with the correct typing

export default function SharedCarouselDots({
    activeIndex,
    onclick,
    sliderImage,
}: {
    activeIndex: number
    onclick: (activeIndex: number) => void
    sliderImage: Array<SliderImage>
}) {
    return (
        <div className={classes.SharedCarouselAllDots}>
            {sliderImage.map((_slide: SliderImage, index: number) => (
                <span
                    key={index}
                    className={`${classes.SharedCarouselDot} ${
                        activeIndex === index
                            ? classes.SharedCarouselActiveDot
                            : ''
                    }`}
                    onClick={() => onclick(index)}
                ></span>
            ))}
        </div>
    )
}
