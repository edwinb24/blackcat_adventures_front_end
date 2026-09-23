'use client'

import {NewsletterModalContextProvider} from '@/contexts/newsletterModalContext'
import HomeContent from './components/home_content/HomeContent'

export default function HomePage() {
    return (
        <NewsletterModalContextProvider>
            <HomeContent />
        </NewsletterModalContextProvider>
    )
}
