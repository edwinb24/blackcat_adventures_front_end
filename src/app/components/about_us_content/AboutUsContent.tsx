'use client'
import {ABOUT_US_PAGE_ID} from '@/utils/constants'
import Image from 'next/image'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'
import classes from './AboutUsContent.module.css'
import {useGetAboutUsContentQuery} from './graphql/useGetAboutUsContentQuery'

export default function AboutUsContent() {
    const {data, error, loading} = useGetAboutUsContentQuery(ABOUT_US_PAGE_ID)
    if (error) return <p>Error Loading this Element</p>
    if (loading) return <p>Loading...</p>
    if (!data || !data?.post || !data.post?.content || !data.post?.title) {
        return <p>Element Fail to Load or is missing content and/or title</p>
    }
    const {title, content}: {title: string; content: string} = data.post as {
        title: string
        content: string
    }

    const featuredImageUrl = data.post?.featuredImage?.node?.sourceUrl
    console.log('featuredImageUrl:', featuredImageUrl)

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
                {ReactHtmlParser(content)}
            </div>
        </main>
    )
}
