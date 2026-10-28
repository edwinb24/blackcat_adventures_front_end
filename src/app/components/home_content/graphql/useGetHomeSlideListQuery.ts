import {gql, TypedDocumentNode} from '@apollo/client'
import {
    GetHomeSlideListQuery,
    GetHomeSlideListQueryVariables,
} from './useGetHomeSlideListQuery.generated'

export const getHomeSlideList: TypedDocumentNode<
    GetHomeSlideListQuery,
    GetHomeSlideListQueryVariables
> = gql`
    query GetHomeSlideList($id: ID!) {
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
