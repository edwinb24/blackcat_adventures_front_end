import AboutUsContent from '@/components/about_us_content/AboutUsContent'
import {fetchPageContent} from '@/components/lib/getPageContent'
import {ABOUT_US_PAGE_ID} from '@/utils/constants'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

export const generateMetadata = async (): Promise<Metadata> => {
    const page = await fetchPageContent(ABOUT_US_PAGE_ID)
    return {title: page?.title || 'About Us'}
}

export default async function AboutUs() {
    const page = await fetchPageContent(ABOUT_US_PAGE_ID)
    if (!page) notFound()

    return <AboutUsContent {...page} />
}
