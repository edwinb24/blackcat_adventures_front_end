import sharedClasses from '@/sharedStyles.module.css'
import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import classes from './AboutUsContent.module.css'

export default function AboutUsContent({
    title,
    content,
    featuredImageUrl,
}: {
    title: string
    content: string
    featuredImageUrl: string
}) {
    return (
        <main className={sharedClasses.pageWideWrapper}>
            <Link href='/'>{'Return to Home >'}</Link>
            <h1 className={sharedClasses.mainTitle}>{title}</h1>
            <div className={classes.AboutUsMain}>
                {featuredImageUrl && (
                    <div className={classes.AboutUsImage}>
                        <Image
                            src={`${featuredImageUrl}`}
                            width={400}
                            height={400}
                            alt=''
                            preload
                        />
                    </div>
                )}
                <div className={classes.aboutUsDetails}>{parse(content)}</div>
            </div>
        </main>
    )
}
