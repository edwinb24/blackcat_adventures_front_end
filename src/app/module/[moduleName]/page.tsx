import SingleModuleContent from '@/components/single_module_content/SingleModuleContent'

export default async function Page({
    params,
}: {
    params: Promise<{moduleName: string}>
}) {
    const {moduleName} = await params
    console.log('moduleName-----')
    console.log(moduleName)
    return (
        <>
            <SingleModuleContent
                moduleName={moduleName.replace('-', ' ') || ''}
            />
        </>
    )
}
