import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
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
            <Header />
            <SingleModuleContent
                moduleName={moduleName.replace('-', ' ') || ''}
            />
            <Footer />
        </>
    )
}
