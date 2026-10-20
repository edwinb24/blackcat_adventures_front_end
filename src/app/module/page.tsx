import {default as AllModulesPageContent} from '@/components/all_modules_content/AllModulesPageContent'
import {getAllModulesContent} from '@/components/all_modules_content/graphql/useGetAllModulesContent'
import {getClient} from '@/components/lib/ApolloClient'
import {MODULES_PAGE_ID} from '@/utils/constants'

export default async function AllModulesPage() {
    const {data, error} = await getClient().query({
        query: getAllModulesContent,
        variables: {id: MODULES_PAGE_ID},
    })
    if (error) return <p>Error Loading this Element</p>
    if (!data || !data?.post || !data.post?.content || !data.post?.title) {
        return <p>Element Fail to Load or is missing content and/or title</p>
    }

    return (
        <>
            <AllModulesPageContent modulePageData={data} />
        </>
    )
}
