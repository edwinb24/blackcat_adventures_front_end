import {gql, type TypedDocumentNode} from '@apollo/client'
import type {
    GetAllEventsQuery,
    GetAllEventsQueryVariables,
} from './useGetAllEventsQuery.generated'

export const getAllEvents: TypedDocumentNode<
    GetAllEventsQuery,
    GetAllEventsQueryVariables
> = gql`
    query getAllEvents($id: ID!) {
        post(id: $id) {
            id
            title
            content(format: RENDERED)
        }
        events {
            nodes {
                id
                title
                eventFields {
                    description
                    linkToPurchaseTicket
                    eventStatus
                    price
                    eventNote
                    eventSessions {
                        eventSessionNotes
                        eventSessionStartTime
                    }
                    additionalImage {
                        node {
                            link
                            altText
                        }
                    }
                }
            }
        }
    }
`
