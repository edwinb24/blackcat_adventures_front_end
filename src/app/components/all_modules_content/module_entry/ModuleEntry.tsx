import type {TypeModuleEntry} from '@/SharedTypes'
import {MODULE_STATUS} from '@/utils/constants'
import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import classes from './ModuleEntry.module.css'

export default function ModuleEntry({
    title,
    imageLink,
    link,
    moduleStatus,
    position,
    linkToPurchase,
    shortDescription,
}: TypeModuleEntry) {
    const moduleStatusPill =
        moduleStatus === MODULE_STATUS.draft || !linkToPurchase ? (
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

    const linkToModule = link!.split('/')

    return (
        <div className={classes.moduleEntry}>
            <h3 className={classes.moduleTitle}>{title}</h3>
            <div className={classes.moduleDetails}>
                <div>
                    <p className={classes.moduleDescription}>
                        {parse(shortDescription)}
                    </p>
                    <Link
                        className={classes.moduleLearnMoreLink}
                        href={
                            linkToModule.length > 1
                                ? `/module/${linkToModule[linkToModule.length - 2]}`
                                : '/'
                        }
                    >
                        {` learn more...`}
                    </Link>
                </div>
                {moduleStatusPill}
            </div>
            {imageLink && (
                <div className={classes.moduleImage}>
                    <Image
                        src={`${imageLink}`}
                        width={250}
                        height={250}
                        alt='Logo'
                        preload={position < 2}
                    />
                </div>
            )}
        </div>
    )
}
