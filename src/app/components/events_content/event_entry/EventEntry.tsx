import type {TypeEventEntry} from '@/SharedTypes'
import {EVENT_STATUS} from '@/utils/constants'
import {normalizeDate} from '@/utils/dateHandler'
import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
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
}: TypeEventEntry) {
    const eventStatusPill =
        eventStatus === EVENT_STATUS.comingsoon || !linkToPurchaseTicket ? (
            <button className={`${classes.eventStatus} ${classes.eventDraft}`}>
                Coming Soon
            </button>
        ) : (
            <button
                className={`${classes.eventStatus} ${classes.eventPublished}`}
            >
                <Link href={linkToPurchaseTicket}>Get A Ticket</Link>
            </button>
        )

    const sessions = eventSessions.map(session => (
        <li key={session.eventSessionStartTime}>
            <p>
                {normalizeDate(session.eventSessionStartTime)}
                {session.eventSessionNotes && (
                    <i> * {session.eventSessionNotes}</i>
                )}
            </p>
        </li>
    ))

    return (
        <div className={classes.eventEntry}>
            <h3 className={classes.eventTitle}>{title}</h3>
            <div className={classes.eventDetails}>
                <div>
                    {parse(description)}
                    <p className={classes.eventNotes}>*{eventNote}</p>
                </div>
                <ul className={classes.eventSessions}>{sessions}</ul>
                <p className={classes.eventPrice}>
                    <b>Price:</b> {price}
                </p>
                {eventStatusPill}
            </div>
            {imageLink && (
                <div className={classes.eventImage}>
                    <Image
                        src={`${imageLink}`}
                        width={300}
                        height={300}
                        alt={imageAltText}
                    />
                </div>
            )}
        </div>
    )
}
