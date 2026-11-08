import ModuleEntry from '@/components/all_modules_content/module_entry/ModuleEntry'
import sharedClasses from '@/sharedStyles.module.css'
import {MODULE_STATUS} from '@/utils/constants'
import {parseCmsHtml} from '@/utils/parseCmsHtml'
import Link from 'next/link'
import classes from './AllModulesPageContent.module.css'
import {GetAllModulesContentQuery} from './graphql/useGetAllModulesContent.generated'

type ModuleNode = NonNullable<
    GetAllModulesContentQuery['modules']
>['nodes'][number]

export default function AllModulesPageContent({
    title,
    content,
    modules,
}: {
    title: string
    content: string
    modules: Array<ModuleNode>
}) {
    const visibleModules = modules.filter(
        moduleNode =>
            moduleNode.link &&
            moduleNode.moduleFields?.moduleStatus &&
            moduleNode.moduleFields.moduleStatus !== MODULE_STATUS.hidden,
    )

    const moduleEntries = visibleModules.map((moduleNode, ind) => {
        const fields = moduleNode.moduleFields
        return (
            <ModuleEntry
                key={moduleNode.id}
                position={ind}
                title={moduleNode.title || ''}
                link={moduleNode.link || ''}
                shortDescription={fields?.shortDescription || ''}
                imageLink={fields?.additionalImage?.node.link || ''}
                altText={fields?.additionalImage?.node.altText || ''}
                moduleStatus={
                    (fields?.moduleStatus as MODULE_STATUS) ||
                    MODULE_STATUS.hidden
                }
                linkToPurchase={fields?.linkToPurchase || ''}
            />
        )
    })

    return (
        <main className={sharedClasses.pageNarrowWrapper}>
            <Link href='/'>{'Return to Home >'}</Link>
            <h1 className={sharedClasses.mainTitle}>{title}</h1>
            {parseCmsHtml(content)}
            <ul className={classes.ListOfModules}>{moduleEntries}</ul>
        </main>
    )
}
