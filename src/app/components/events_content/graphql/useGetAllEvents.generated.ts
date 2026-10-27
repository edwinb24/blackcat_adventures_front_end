/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]}
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
    | T
    | {
          [P in keyof T]?: P extends ' $fragmentName' | '__typename'
              ? T[P]
              : never
      }

export type GetAllEventsQueryVariables = Exact<{
    id: string | number
}>

export type GetAllEventsQuery = {
    post: {
        __typename: 'Post'
        id: string
        title: string | null
        content: string | null
    } | null
    events: {
        __typename: 'RootQueryToEventConnection'
        nodes: Array<{
            __typename: 'Event'
            id: string
            title: string | null
            eventFields: {
                __typename: 'EventFields'
                description: string | null
                linkToPurchaseTicket: string | null
                eventStatus: string | null
                price: string | null
                eventNote: string | null
                eventSessions: Array<{
                    __typename: 'EventFieldsEventSessions'
                    eventSessionNotes: string | null
                    eventSessionStartTime: string | null
                } | null> | null
                additionalImage: {
                    __typename: 'AcfMediaItemConnectionEdge'
                    node: {
                        __typename: 'MediaItem'
                        link: string | null
                        altText: string | null
                    }
                } | null
            } | null
        }>
    } | null
}
