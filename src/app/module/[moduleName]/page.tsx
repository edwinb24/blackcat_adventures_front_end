import {queryCms} from '@/components/lib/ApolloClient'
import {getSingleModule} from '@/components/single_module_content/graphql/useGetSingleModuleContentQuery'
import SingleModuleContent from '@/components/single_module_content/SingleModuleContent'
import {MODULE_STATUS} from '@/utils/constants'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

type PageProps = {params: Promise<{moduleName: string}>}

// Returns the module, or null when it does not exist or is hidden.
const fetchModule = async (slug: string) => {
    const data = await queryCms(getSingleModule, {slug})
    const cmsModule = data.module
    if (!cmsModule?.moduleFields) return null

    const moduleStatus =
        (cmsModule.moduleFields.moduleStatus as MODULE_STATUS) ||
        MODULE_STATUS.hidden
    if (moduleStatus === MODULE_STATUS.hidden) return null

    return {cmsModule, moduleFields: cmsModule.moduleFields, moduleStatus}
}

export const generateMetadata = async ({
    params,
}: PageProps): Promise<Metadata> => {
    const {moduleName} = await params
    const result = await fetchModule(moduleName)
    return {title: result?.cmsModule.title || 'Module'}
}

const Page = async ({params}: PageProps) => {
    const {moduleName} = await params
    const result = await fetchModule(moduleName)
    if (!result) notFound()

    const {cmsModule, moduleFields, moduleStatus} = result

    return (
        <SingleModuleContent
            title={cmsModule.title || ''}
            description={moduleFields.description || ''}
            imageLink={moduleFields.additionalImage?.node.link || ''}
            altText={moduleFields.additionalImage?.node.altText || ''}
            moduleStatus={moduleStatus}
            linkToPurchase={moduleFields.linkToPurchase || ''}
        />
    )
}

export default Page
