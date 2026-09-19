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
        <main className={classes.AboutUsMain}>
            <Link href='/'>Return to Home</Link>
            <h1>{title}</h1>
            <div className={classes.AboutUsMain}>
                {featuredImageUrl && (
                    <div>
                        <Image
                            className={classes.MainMenuLogo}
                            src={`${featuredImageUrl}`}
                            width={600}
                            height={600}
                            alt='Logo'
                        />
                    </div>
                )}
                {parse(content)}
            </div>
        </main>
    )
}
