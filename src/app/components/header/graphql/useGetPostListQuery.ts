import {gql, useQuery} from '@apollo/client'

export const useGetPostListQuery = () =>
    useQuery(
        gql`
            query PostList {
                posts {
                    nodes {
                        id
                        title
                    }
                }
            }
        `,
        {}
    )
