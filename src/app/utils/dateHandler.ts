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
