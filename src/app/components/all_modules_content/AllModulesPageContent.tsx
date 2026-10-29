import ModuleEntry from '@/components/all_modules_content/module_entry/ModuleEntry'
import sharedClasses from '@/sharedStyles.module.css'
import {MODULE_STATUS} from '@/utils/constants'
import parse from 'html-react-parser'
import Link from 'next/link'
import classes from './AllModulesPageContent.module.css'
import {GetAllModulesContentQuery} from './graphql/useGetAllModulesContent.generated'

export default function AllModulesPageContent({
    modulePageData,
}: {
    modulePageData: GetAllModulesContentQuery
}) {
    const {title, content}: {title: string; content: string} =
        modulePageData.post as {
            title: string
            content: string
        }

    const filteredModules =
        modulePageData.modules?.nodes.filter(
            a =>
                a.link &&
                a.moduleFields?.moduleStatus &&
                a.moduleFields.moduleStatus !== MODULE_STATUS.hidden,
        ) || []

    const moduleEntries = filteredModules.map((moduleEntry, ind) => {
        const {
            title,
            link,
            shortDescription,
            imageLink,
            altText,
            moduleStatus,
            linkToPurchase,
            id,
        } = {
            ...moduleEntry,
            ...moduleEntry.moduleFields,
            imageLink:
                moduleEntry.moduleFields?.additionalImage?.node.link || '',
            altText:
                moduleEntry.moduleFields?.additionalImage?.node.altText || '',
        }

        return (
            <ModuleEntry
                key={id}
                position={ind}
                title={title || ''}
                link={link || ''}
                shortDescription={shortDescription || ''}
                imageLink={imageLink || ''}
                altText={altText || ''}
                moduleStatus={
                    (moduleStatus as MODULE_STATUS) || MODULE_STATUS.hidden
                }
                linkToPurchase={linkToPurchase || ''}
            />
        )
    })

    return (
        <main className={sharedClasses.pageNarrowWrapper}>
            <Link href='/'>{'Return to Home >'}</Link>
            <h1 className={sharedClasses.mainTitle}>{title}</h1>
            {parse(content)}
            <ul className={classes.ListOfModules}>{moduleEntries}</ul>
        </main>
    )
}
