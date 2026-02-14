'use client'
import {ABOUT_US_PAGE_ID} from '@/utils/constants'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'
import {useGetPostContentQuery} from './graphql/useGetPostContentQuery'

export default function AboutUsContent() {
    const {data, error, loading} = useGetPostContentQuery(ABOUT_US_PAGE_ID)
    if (error) return <p>Error Loading this Element</p>
    if (loading) return <p>Loading...</p>
    if (!data || !data?.post) {
        return <p>Element Fail to Load</p>
    }
    const {title, content}: {title: string; content: string} = data.post

    return (
        <main>
            <Link href='/'>Return to Home</Link>
            <h1>{title}</h1>
            {ReactHtmlParser(content)}
        </main>
    )
}
