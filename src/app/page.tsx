'use client'

import {NewsletterModalContextProvider} from '@/contexts/newsletterModalContext'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import HomeContent from './components/home_content/HomeContent'

export default function HomePage() {
    return (
        <NewsletterModalContextProvider>
            <Header />
            <HomeContent />
            <Footer />
        </NewsletterModalContextProvider>
    )
}
