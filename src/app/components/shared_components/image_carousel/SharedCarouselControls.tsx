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
                className={`${classes.SharedCarouselButton} ${classes.PrevButton}`}
                onClick={prevSlide}
            >
                <ArrowBackIos />
            </button>
            <button
                className={`${classes.SharedCarouselButton} ${classes.NextButton}`}
                onClick={nextSlide}
            >
                <ArrowForwardIos />
            </button>
        </div>
    )
}
