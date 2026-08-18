import {MODAL_CLOSE_ICON_SIZE} from '@/utils/constants'
import {Close} from '@mui/icons-material'
import type {ReactNode} from 'react'
import classes from './SharedModal.module.css'

const styles = {
    closeIcon: {
        fontSize: MODAL_CLOSE_ICON_SIZE,
        color: '#dfdfdf',
    },
}

export default function SharedModal({
    children,
    closeModal,
}: {
    children?: ReactNode
    closeModal: () => void
}) {
    return (
        <div className={`${classes.ModalWrapper}`}>
            <div
                className={`${classes.ModalBackground}`}
                onClick={closeModal}
            ></div>
            <div className={`${classes.Modal}`}>
                <button
                    className={`${classes.CloseButton}`}
                    onClick={closeModal}
                >
                    <Close sx={styles.closeIcon} />
                </button>
                {children}
            </div>
        </div>
    )
}
