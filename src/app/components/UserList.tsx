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

type Post = {
  id: string
  name: string
}

type PostListData = {
  posts: Post[]
}

export default async function PostList() {
  const {data} = await query<PostListData>({query: POST_LIST_QUERY})
  console.log('PostList data:', data)
  if (!data || !data.posts) {
    return <p>No posts found</p>
  }
  return (
    <ul>
      {data.posts.map(post => (
        <li key={post.id}>
          <a href={`/post/${post.id}`}>{post.name}</a>
        </li>
      ))}
    </ul>
  )
}
