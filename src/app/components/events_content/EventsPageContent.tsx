import sharedClasses from '@/sharedStyles.module.css'
import {EventSessionsType} from '@/SharedTypes'
import {EVENT_STATUS} from '@/utils/constants'
import parse from 'html-react-parser'
import Link from 'next/link'
import EventEntry from './event_entry/EventEntry'
import classes from './EventsContent.module.css'
import {GetAllEventsQuery} from './graphql/useGetAllEvents.generated'

export default function EventsContent({
    eventsPageData,
}: {
    eventsPageData: GetAllEventsQuery
}) {
    const {title, content}: {title: string; content: string} =
        eventsPageData.post as {
            title: string
            content: string
        }

    const filteredEvents =
        eventsPageData.events?.nodes.filter(
            a =>
                a.eventFields?.eventStatus &&
                a.eventFields.eventStatus !== EVENT_STATUS.hidden,
        ) || []

    const sortedEvents =
        filteredEvents.length > 0
            ? filteredEvents.sort((a, b) => {
                  const eventSessionsA = a.eventFields?.eventSessions || []
                  const eventSessionsB = b.eventFields?.eventSessions || []

                  const dateA = eventSessionsA[0]?.eventSessionStartTime || ''
                  const dateB = eventSessionsB[0]?.eventSessionStartTime || ''

                  return !dateA && !dateB
                      ? 0
                      : !dateA
                        ? 1
                        : !dateB
                          ? -1
                          : new Date(dateA).getTime() -
                            new Date(dateB).getTime()
              })
            : []

    const eventsEntries = sortedEvents.map(eventsEntry => {
        const {
            description,
            title,
            price,
            imageAltText,
            eventSessions,
            eventNote,
            imageLink,
            eventStatus,
            linkToPurchaseTicket,
            id,
        } = {
            ...eventsEntry,
            ...eventsEntry.eventFields,
            eventSessions:
                eventsEntry.eventFields?.eventSessions &&
                eventsEntry.eventFields?.eventSessions.length > 0
                    ? eventsEntry.eventFields?.eventSessions
                    : [],
            imageLink:
                eventsEntry.eventFields?.additionalImage?.node.link || '',
            imageAltText:
                eventsEntry.eventFields?.additionalImage?.node.altText || '',
        }

        return (
            <EventEntry
                eventNote={eventNote || ''}
                eventSessions={
                    (eventSessions as Array<EventSessionsType>) || []
                }
                key={id}
                title={title || ''}
                imageLink={imageLink}
                imageAltText={imageAltText}
                price={price || ''}
                description={description || ''}
                eventStatus={
                    (eventStatus as EVENT_STATUS) || EVENT_STATUS.hidden
                }
                linkToPurchaseTicket={linkToPurchaseTicket || ''}
            />
        )
    })

    return (
        <main className={sharedClasses.pageNarrowWrapper}>
            <Link href='/'>{'Return to Home >'}</Link>
            <h1 className={sharedClasses.mainTitle}>{title}</h1>
            {parse(content)}
            <ul className={classes.ListOfEvents}>
                {eventsEntries.length > 0 ? (
                    eventsEntries
                ) : (
                    <h1>There are not currently events.</h1>
                )}
            </ul>
        </main>
    )
}
