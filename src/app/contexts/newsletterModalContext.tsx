'use client'
import NewsletterSignUp from '@/components/newsletter_signup/NewsletterSignUp'

import {createContext, useState, type Dispatch, type ReactNode} from 'react'

export const NewsletterModalContext = createContext<
    Dispatch<React.SetStateAction<boolean>>
>(() => {})

export const NewsletterModalContextProvider = ({
    children,
}: {
    children: ReactNode
}) => {
    const [modalOpen, setModalOpen] = useState(false)
    const handleShowModal = (value: boolean) => setModalOpen(value)

    return (
        <NewsletterModalContext.Provider value={setModalOpen}>
            {children}
            {modalOpen && (
                <NewsletterSignUp closeModal={() => handleShowModal(false)} />
            )}
        </NewsletterModalContext.Provider>
    )
}
