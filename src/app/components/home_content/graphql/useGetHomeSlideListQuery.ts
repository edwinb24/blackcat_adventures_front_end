import {HOME_PAGE_SLIDES} from '@/utils/constants'
import {gql, TypedDocumentNode, useQuery} from '@apollo/client'
import {
    GetHomeSlideListQuery,
    GetHomeSlideListQueryVariables,
} from './useGetHomeSlideListQuery.generated'

const getHomeSlideList: TypedDocumentNode<
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

export const useGetHomeSlideListQuery = () =>
    useQuery(getHomeSlideList, {
        variables: {
            id: HOME_PAGE_SLIDES,
        },
    })
