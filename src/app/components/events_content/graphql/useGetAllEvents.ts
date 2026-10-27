import {gql, TypedDocumentNode, useQuery} from '@apollo/client'
import {
    GetAllEventsQuery,
    GetAllEventsQueryVariables,
} from './useGetAllEvents.generated'

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

export const useGetAllEventsQuery = (id: string) =>
    useQuery(getAllEvents, {
        variables: {id},
    })
