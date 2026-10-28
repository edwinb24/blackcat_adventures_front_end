import sharedClasses from '@/sharedStyles.module.css'
import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import classes from './DmingServicesContent.module.css'

export default function DmingServicesContent({
    title,
    content,
    featuredImageUrl,
}: {
    title: string
    content: string
    featuredImageUrl: string
}) {
    return (
        <main className={sharedClasses.pageNarrowWrapper}>
            <Link href='/'>{'Return to Home >'}</Link>
            <h1 className={sharedClasses.mainTitle}>{title}</h1>
            <div className={classes.DmingServicesMain}>
                {featuredImageUrl && (
                    <div className={classes.DmingServicesImageWrapper}>
                        <Image
                            className={classes.DmingServicesImage}
                            src={`${featuredImageUrl}`}
                            width={400}
                            height={400}
                            alt=''
                        />
                    </div>
                )}
                <div className={classes.DmingServicesDetails}>
                    {parse(content)}
                </div>
            </div>
        </main>
    )
}
