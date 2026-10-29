import {getClient} from '@/components/lib/ApolloClient'
import {getSingleModule} from '@/components/single_module_content/graphql/useGetSingleModuleContentQuery'
import SingleModuleContent from '@/components/single_module_content/SingleModuleContent'
import {MODULE_STATUS} from '@/utils/constants'

export default async function Page({
    params,
}: {
    params: Promise<{moduleName: string}>
}) {
    const {moduleName} = await params
    const normalizedModuleName = moduleName.replaceAll('-', ' ') || ''

    const {data, error} = await getClient().query({
        query: getSingleModule,
        variables: {name: normalizedModuleName},
    })

    if (error) return <p>Error Loading this Element</p>
    if (
        !data ||
        !data?.modules ||
        !data.modules?.nodes ||
        !data.modules.nodes[0]?.moduleFields ||
        data.modules.nodes.length < 1
    ) {
        return <p>Element Fail to Load or is missing content and/or title</p>
    }
    const {
        title,
        id,
        description,
        imageLink,
        altText,
        moduleStatus,
        linkToPurchase,
    } = {
        ...data.modules.nodes[0],
        ...data.modules.nodes[0].moduleFields,
        imageLink:
            data.modules.nodes[0].moduleFields?.additionalImage?.node.link ||
            '',
        altText:
            data.modules.nodes[0].moduleFields?.additionalImage?.node.altText ||
            '',
    }

    return (
        <>
            <SingleModuleContent
                title={title || ''}
                description={description || ''}
                imageLink={imageLink}
                altText={altText}
                moduleStatus={
                    (moduleStatus as MODULE_STATUS) || MODULE_STATUS.hidden
                }
                linkToPurchase={linkToPurchase || ''}
            />
        </>
    )
}
