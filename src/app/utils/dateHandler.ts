// The CMS sends the wall-clock time that the editor typed, marked as UTC
// (for example "2026-10-11T18:00:00+00:00" for 6:00 PM). Formatting in UTC
// shows that time unchanged, for all visitors. Do not change the time zone.
export const normalizeDate = (dateString: string): string => {
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) {
        return 'TBD'
    }

    return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'long',
        timeStyle: 'short',
        timeZone: 'UTC',
    }).format(date)
}
