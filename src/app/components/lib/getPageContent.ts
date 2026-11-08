import {queryCms} from './ApolloClient'
import {getPageContent} from './graphql/useGetPageContentQuery'

export type PageContent = {
    title: string
    content: string
    featuredImageUrl: string
    altText: string
}

export const fetchPageContent = async (
    id: string,
): Promise<PageContent | null> => {
    const data = await queryCms(getPageContent, {id})
    const post = data.post
    if (!post?.title || !post.content) return null

    return {
        title: post.title,
        content: post.content,
        featuredImageUrl: post.featuredImage?.node?.sourceUrl || '',
        altText: post.featuredImage?.node?.altText || '',
    }
}
