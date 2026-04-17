import classes from './SharedCarousel.module.css'

//NOTE - Replace with the correct typing
type SliderImage = {
    title: string
    id: string
    description: string
    link: string
    imageUrl: string
    imageAltText: string
}

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
