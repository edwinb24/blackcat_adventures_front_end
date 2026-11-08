import AllModulesPageContent from '@/components/all_modules_content/AllModulesPageContent'
import {getAllModulesContent} from '@/components/all_modules_content/graphql/useGetAllModulesContent'
import {queryCms} from '@/components/lib/ApolloClient'
import {MODULES_PAGE_ID} from '@/utils/constants'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

const fetchModulesPage = () =>
    queryCms(getAllModulesContent, {id: MODULES_PAGE_ID})

export const generateMetadata = async (): Promise<Metadata> => {
    const data = await fetchModulesPage()
    return {title: data.post?.title || 'Modules'}
}

export default async function AllModulesPage() {
    const data = await fetchModulesPage()
    if (!data.post?.content || !data.post.title) notFound()

    return (
        <AllModulesPageContent
            title={data.post.title}
            content={data.post.content}
            modules={data.modules?.nodes || []}
        />
    )
}
