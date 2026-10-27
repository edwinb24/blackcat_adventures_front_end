import EventsContent from '@/components/events_content/EventsPageContent'
import {getAllEvents} from '@/components/events_content/graphql/useGetAllEvents'
import {getClient} from '@/components/lib/ApolloClient'
import {EVENTS_PAGE_ID} from '@/utils/constants'

export default async function EventsPage() {
    const {data, error} = await getClient().query({
        query: getAllEvents,
        variables: {id: EVENTS_PAGE_ID},
    })
    if (error) return <p>Error Loading this Element</p>
    if (!data || !data?.post || !data.post?.content || !data.post?.title) {
        return <p>Element Fail to Load or is missing content and/or title</p>
    }

    return (
        <>
            <EventsContent eventsPageData={data} />
        </>
    )
}
