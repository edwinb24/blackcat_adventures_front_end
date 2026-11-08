import StatusPill from '@/shared_components/status_pill/StatusPill'
import type {TypeEventEntry} from '@/SharedTypes'
import {EVENT_STATUS} from '@/utils/constants'
import {normalizeDate} from '@/utils/dateHandler'
import {parseCmsHtml} from '@/utils/parseCmsHtml'
import Image from 'next/image'
import classes from './EventEntry.module.css'

export default function EventEntry({
    title,
    description,
    imageLink,
    imageAltText,
    eventStatus,
    eventSessions,
    eventNote,
    price,
    linkToPurchaseTicket,
    position,
}: TypeEventEntry) {
    const sessions = eventSessions.map((session, ind) => (
        <li key={`${session.eventSessionStartTime}${ind}`}>
            <p>
                {normalizeDate(session.eventSessionStartTime || '')}
                {session.eventSessionNotes && (
                    <i> * {session.eventSessionNotes}</i>
                )}
            </p>
        </li>
    ))

    return (
        <li className={classes.eventEntry}>
            {title && <h3 className={classes.eventTitle}>{title}</h3>}
            <div className={classes.eventDetails}>
                <div>
                    {parseCmsHtml(description)}
                    {eventNote && (
                        <p className={classes.eventNotes}>*{eventNote}</p>
                    )}
                </div>
                <ul className={classes.eventSessions}>{sessions}</ul>
                <p className={classes.eventPrice}>
                    <b>Price:</b> {price}
                </p>
                <StatusPill
                    available={eventStatus !== EVENT_STATUS.comingsoon}
                    href={linkToPurchaseTicket}
                    label='Get A Ticket'
                    classes={{
                        base: classes.eventStatus,
                        unavailable: classes.eventDraft,
                        available: classes.eventPublished,
                    }}
                />
            </div>
            {imageLink && (
                <div className={classes.eventImage}>
                    <Image
                        src={imageLink}
                        width={300}
                        height={300}
                        alt={imageAltText}
                        preload={position < 1}
                        loading={position >= 1 ? 'lazy' : undefined}
                    />
                </div>
            )}
        </li>
    )
}
