import {ArrowBackIos, ArrowForwardIos} from '@mui/icons-material'
import classes from './SharedCarousel.module.css'

export default function SharedCarouselControls({
    prevSlide,
    nextSlide,
}: {
    prevSlide: () => void
    nextSlide: () => void
}) {
    return (
        <div className={classes.SharedCarouselControls}>
            <button
                type='button'
                aria-label='Previous slide'
                className={`${classes.SharedCarouselButton} ${classes.PrevButton}`}
                onClick={prevSlide}
            >
                <ArrowBackIos />
            </button>
            <button
                type='button'
                aria-label='Next slide'
                className={`${classes.SharedCarouselButton} ${classes.NextButton}`}
                onClick={nextSlide}
            >
                <ArrowForwardIos />
            </button>
        </div>
    )
}
