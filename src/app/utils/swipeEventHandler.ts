import {BaseSyntheticEvent} from 'react'

const swipeEventHandler = (e: BaseSyntheticEvent<TouchEvent>): string => {
    console.log((e.nativeEvent as TouchEvent).changedTouches[0].clientX)
    return ''
}

export default swipeEventHandler
