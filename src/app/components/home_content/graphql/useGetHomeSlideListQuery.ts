import {gql, type TypedDocumentNode} from '@apollo/client'
import type {
    GetHomeSlideListQuery,
    GetHomeSlideListQueryVariables,
} from './useGetHomeSlideListQuery.generated'

export const getHomeSlideList: TypedDocumentNode<
    GetHomeSlideListQuery,
    GetHomeSlideListQueryVariables
> = gql`
    query getHomeSlideList($id: ID!) {
        slideList(id: $id) {
            carouselSlide {
                slides {
                    title
                    description
                    link
                    image {
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
