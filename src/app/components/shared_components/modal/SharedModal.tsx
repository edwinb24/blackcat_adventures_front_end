import type {ReactNode} from 'react'
import classes from './SharedModal.module.css'

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
                    X
                </button>
                {children}
            </div>
        </div>
    )
}
