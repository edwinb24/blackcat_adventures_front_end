import EventsContent from '@/components/events_content/EventsPageContent'
import {getAllEvents} from '@/components/events_content/graphql/useGetAllEvents'
import {queryCms} from '@/components/lib/ApolloClient'
import {EVENTS_PAGE_ID} from '@/utils/constants'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

const fetchEventsPage = () => queryCms(getAllEvents, {id: EVENTS_PAGE_ID})

export const generateMetadata = async (): Promise<Metadata> => {
    const data = await fetchEventsPage()
    return {title: data.post?.title || 'Events'}
}

export default async function EventsPage() {
    const data = await fetchEventsPage()
    if (!data.post?.content || !data.post.title) notFound()

    return (
        <EventsContent
            title={data.post.title}
            content={data.post.content}
            events={data.events?.nodes || []}
        />
    )
}
