import {gql} from '@apollo/client'
import {query} from './lib/ApolloClient'

const POST_LIST_QUERY = gql`
  query PostList {
    posts {
      nodes {
        id
        title
      }
    }
  }
`

type Node = {
  id: string
  name: string
}

type Nodes = {nodes: Node[]}

type PostListData = {
  posts: Nodes
}

export default async function PostList() {
  const {data, loading, error} = await query<PostListData>({
    query: POST_LIST_QUERY,
  })
  console.log('PostList data:', data)
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error: {error.message}</p>
  }

  if (!data || !data.posts) {
    return <p>No posts found</p>
  }
  console.log('PostList data:', data)
  return <p>{data?.posts.nodes[0]?.id || 'lalala'}</p>
}
