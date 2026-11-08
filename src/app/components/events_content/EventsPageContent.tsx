import sharedClasses from '@/sharedStyles.module.css'
import {EVENT_STATUS} from '@/utils/constants'
import {parseCmsHtml} from '@/utils/parseCmsHtml'
import Link from 'next/link'
import EventEntry from './event_entry/EventEntry'
import classes from './EventsContent.module.css'
import {GetAllEventsQuery} from './graphql/useGetAllEvents.generated'

type EventNode = NonNullable<GetAllEventsQuery['events']>['nodes'][number]

const getFirstSessionTime = (event: EventNode): number | null => {
    const startTime = event.eventFields?.eventSessions?.[0]?.eventSessionStartTime
    return startTime ? new Date(startTime).getTime() : null
}

const compareEvents = (a: EventNode, b: EventNode): number => {
    const timeA = getFirstSessionTime(a)
    const timeB = getFirstSessionTime(b)
    if (timeA === null && timeB === null) return 0
    if (timeA === null) return 1
    if (timeB === null) return -1
    return timeA - timeB
}

const EventsContent = ({
    title,
    content,
    events,
}: {
    title: string
    content: string
    events: Array<EventNode>
}) => {
    const sortedEvents = events
        .filter(
            event =>
                event.eventFields?.eventStatus &&
                event.eventFields.eventStatus !== EVENT_STATUS.hidden,
        )
        .sort(compareEvents)

    const eventsEntries = sortedEvents.map((event, ind) => {
        const fields = event.eventFields
        return (
            <EventEntry
                key={event.id}
                position={ind}
                title={event.title || ''}
                description={fields?.description || ''}
                eventNote={fields?.eventNote || ''}
                eventSessions={(fields?.eventSessions || []).filter(
                    session => session !== null,
                )}
                imageLink={fields?.additionalImage?.node.link || ''}
                imageAltText={fields?.additionalImage?.node.altText || ''}
                price={fields?.price || ''}
                eventStatus={
                    (fields?.eventStatus as EVENT_STATUS) || EVENT_STATUS.hidden
                }
                linkToPurchaseTicket={fields?.linkToPurchaseTicket || ''}
            />
        )
    })

    return (
        <main className={sharedClasses.pageNarrowWrapper}>
            <Link href='/'>{'Return to Home >'}</Link>
            <h1 className={sharedClasses.mainTitle}>{title}</h1>
            {parseCmsHtml(content)}
            <ul className={classes.ListOfEvents}>
                {eventsEntries.length > 0 ? (
                    eventsEntries
                ) : (
                    <li>
                        <h1>There are currently no events.</h1>
                    </li>
                )}
            </ul>
        </main>
    )
}

export default EventsContent
