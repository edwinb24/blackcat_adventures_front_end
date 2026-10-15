'use client'
import sharedClasses from '@/sharedStyles.module.css'
import {MODULE_STATUS} from '@/utils/constants'
import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import classes from './SingleModuleContent.module.css'
import {useGetSingleModuleQuery} from './graphql/useGetSingleModuleContentQuery'

type SingleModuleContent = {
    title: string
    description: string
    imageLink: string
    moduleStatus: MODULE_STATUS
    linkToPurchase: string
}

export default function SingleModuleContent({
    moduleName,
}: {
    moduleName: string
}) {
    const {data, error, loading} = useGetSingleModuleQuery(moduleName)
    if (error) return <p>Error Loading this Element</p>
    if (loading) return <p>Loading...</p>
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
        description,
        imageLink,
        moduleStatus,
        linkToPurchase,
    }: SingleModuleContent = {
        ...data.modules.nodes[0],
        ...data.modules.nodes[0].moduleFields,
        imageLink:
            data.modules.nodes[0].moduleFields?.additionalImage?.node.link ||
            '',
    } as SingleModuleContent

    const moduleImage = imageLink ? (
        <div className={classes.moduleImage}>
            <Image src={imageLink} width={600} height={800} alt='Logo' />
        </div>
    ) : null

    if (moduleStatus === MODULE_STATUS.hidden) return
    const moduleStatusPill =
        moduleStatus === MODULE_STATUS.draft || isnull(linkToPurchase) ? (
            <div className={`${classes.moduleStatus} ${classes.moduleDraft}`}>
                Coming Soon
            </div>
        ) : (
            <div
                className={`${classes.moduleStatus} ${classes.modulePublished}`}
            >
                <Link href={linkToPurchase}>See Details</Link>
            </div>
        )

    return (
        <main>
            <div className={sharedClasses.pageWideWrapper}>
                <Link href='/'>Return to Home</Link>
                <h1 className={sharedClasses.mainTitle}>{title}</h1>
                <div className={classes.moduleInformation}>
                    <div className={classes.moduleDescription}>
                        {parse(description)}
                    </div>
                    {moduleStatusPill}
                    {moduleImage}
                </div>
            </div>
        </main>
    )
}
function isnull(linkToPurchase: string): boolean {
    throw new Error('Function not implemented.')
}
