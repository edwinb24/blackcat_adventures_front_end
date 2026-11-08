import StatusPill from '@/shared_components/status_pill/StatusPill'
import type {TypeModuleEntry} from '@/SharedTypes'
import {MODULE_STATUS} from '@/utils/constants'
import {getHrefFromLink} from '@/utils/links'
import {parseCmsHtml} from '@/utils/parseCmsHtml'
import Image from 'next/image'
import Link from 'next/link'
import classes from './ModuleEntry.module.css'

export default function ModuleEntry({
    title,
    imageLink,
    altText,
    link,
    moduleStatus,
    position,
    linkToPurchase,
    shortDescription,
}: TypeModuleEntry) {
    return (
        <li className={classes.moduleEntry}>
            <h3 className={classes.moduleTitle}>{title}</h3>
            <div className={classes.moduleDetails}>
                <div>
                    <div className={classes.moduleDescription}>
                        {parseCmsHtml(shortDescription)}
                    </div>
                    <Link
                        className={classes.moduleLearnMoreLink}
                        href={getHrefFromLink(link, '/module')}
                    >
                        {` learn more...`}
                    </Link>
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
                        width={250}
                        height={250}
                        alt={altText}
                        preload={position < 2}
                        loading={position >= 2 ? 'lazy' : undefined}
                    />
                </div>
            )}
        </li>
    )
}
