import DmingServicesContent from '@/components/dming_services_content/DmingServicesContent'
import {getDmingServicesContent} from '@/components/dming_services_content/graphql/useGetDmingServicesContentQuery'
import {getClient} from '@/components/lib/ApolloClient'
import {DMING_SERVICES_PAGE_ID} from '@/utils/constants'

export default async function DmingServices() {
    const {data, error} = await getClient().query({
        query: getDmingServicesContent,
        variables: {id: DMING_SERVICES_PAGE_ID},
    })
    if (error) return <p>Error Loading this Element</p>
    if (!data || !data?.post || !data.post?.content || !data.post?.title) {
        return <p>Element Fail to Load or is missing content and/or title</p>
    }
    const {title, content}: {title: string; content: string} = data.post as {
        title: string
        content: string
    }
    const featuredImageUrl = data.post?.featuredImage?.node?.sourceUrl || ''
    const altText = data.post?.featuredImage?.node?.altText || ''

    return (
        <>
            <DmingServicesContent
                title={title}
                content={content}
                featuredImageUrl={featuredImageUrl}
                altText={altText}
            />
        </>
    )
}
