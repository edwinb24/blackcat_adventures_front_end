import Image from 'next/image'
import classes from './SharedCarousel.module.css'

//NOTE - Replace with the correct typing
type SliderImage = {
    title: string
    description: string
    urls: string
}

export default function SharedCarouselSliderContent({
    activeIndex,
    sliderImages,
}: {
    activeIndex: number
    sliderImages: Array<SliderImage>
}) {
    return (
        <section>
            {sliderImages.map((slide, index) => (
                <div
                    key={index}
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
