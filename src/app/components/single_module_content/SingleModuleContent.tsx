import StatusPill from '@/shared_components/status_pill/StatusPill'
import sharedClasses from '@/sharedStyles.module.css'
import type {TypeModuleContent} from '@/SharedTypes'
import {MODULE_STATUS} from '@/utils/constants'
import {parseCmsHtml} from '@/utils/parseCmsHtml'
import Image from 'next/image'
import Link from 'next/link'
import classes from './SingleModuleContent.module.css'

export default function SingleModuleContent({
    title,
    description,
    imageLink,
    altText,
    moduleStatus,
    linkToPurchase,
}: TypeModuleContent) {
    return (
        <main>
            <div className={sharedClasses.pageWideWrapper}>
                <Link href='/'>{'Return to Home >'}</Link>
                <h1 className={sharedClasses.mainTitle}>{title}</h1>
                <div className={classes.moduleInformation}>
                    <div className={classes.moduleDetails}>
                        <div className={classes.moduleDescription}>
                            {parseCmsHtml(description)}
                        </div>
                        <StatusPill
                            available={moduleStatus !== MODULE_STATUS.draft}
                            href={linkToPurchase}
                            label='Purchase'
                            classes={{
                                base: classes.moduleStatus,
                                unavailable: classes.moduleDraft,
                                available: classes.modulePublished,
                            }}
                        />
                    </div>
                    {imageLink && (
                        <div className={classes.moduleImage}>
                            <Image
                                src={imageLink}
                                width={400}
                                height={500}
                                alt={altText}
                                preload
                            />
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
