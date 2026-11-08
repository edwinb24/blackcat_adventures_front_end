import DmingServicesContent from '@/components/dming_services_content/DmingServicesContent'
import {fetchPageContent} from '@/components/lib/getPageContent'
import {DMING_SERVICES_PAGE_ID} from '@/utils/constants'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

export const generateMetadata = async (): Promise<Metadata> => {
    const page = await fetchPageContent(DMING_SERVICES_PAGE_ID)
    return {title: page?.title || 'DMing Services'}
}

export default async function DmingServices() {
    const page = await fetchPageContent(DMING_SERVICES_PAGE_ID)
    if (!page) notFound()

    return <DmingServicesContent {...page} />
}
