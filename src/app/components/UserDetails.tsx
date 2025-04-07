'use client'

import {gql, useQuery} from '@apollo/client'
import {useParams} from 'next/navigation'

type Post = {
  id: string
  title: string
}

type UserDetailsData = {
  post: Post
}

type PostDetailsVars = {
  id: string
}

const POST_DETAILS_QUERY = gql`
  query UserDetails($id: ID!) {
    post(id: $id) {
      id
      title
    }
  }
`

export default function UserDetails() {
  const {id} = useParams() as {id: string}
  const {data, loading, error} = useQuery<UserDetailsData, PostDetailsVars>(
    POST_DETAILS_QUERY,
    {
      variables: {id},
    }
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const {post} = data!

  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  )
}
