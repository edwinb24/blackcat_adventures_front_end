'use client'
import sharedClasses from '@/sharedStyles.module.css'
import {MODULE_STATUS} from '@/utils/constants'
import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import classes from './SingleModuleContent.module.css'

type SingleModuleContent = {
    title: string
    description: string
    imageLink: string
    moduleStatus: MODULE_STATUS
    linkToPurchase: string
}

export default function SingleModuleContent({
    title,
    description,
    imageLink,
    moduleStatus,
    linkToPurchase,
}: SingleModuleContent) {
    const moduleImage = imageLink ? (
        <div className={classes.moduleImage}>
            <Image src={imageLink} width={600} height={800} alt='Logo' />
        </div>
    ) : null

    if (moduleStatus === MODULE_STATUS.hidden) return
    const moduleStatusPill =
        moduleStatus === MODULE_STATUS.draft || isnull(linkToPurchase) ? (
            <button
                className={`${classes.moduleStatus} ${classes.moduleDraft}`}
            >
                Coming Soon
            </button>
        ) : (
            <button
                className={`${classes.moduleStatus} ${classes.modulePublished}`}
            >
                <Link href={linkToPurchase}>Purchase</Link>
            </button>
        )

    return (
        <main>
            <div className={sharedClasses.pageWideWrapper}>
                <Link href='/'>{'Return to Home >'}</Link>
                <h1 className={sharedClasses.mainTitle}>{title}</h1>
                <div className={classes.moduleInformation}>
                    <div className={classes.moduleDetails}>
                        <div className={classes.moduleDescription}>
                            {parse(description)}
                        </div>
                        {moduleStatusPill}
                    </div>
                    {moduleImage}
                </div>
            </div>
        </main>
    )
}
function isnull(linkToPurchase: string): boolean {
    throw new Error('Function not implemented.')
}
