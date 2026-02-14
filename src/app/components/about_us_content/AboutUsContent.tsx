'use client'
import {ABOUT_US_PAGE_ID} from '@/utils/constants'
import Link from 'next/link'
import classes from './AboutUsContent.module.css'
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
            {content}
            <p className={`${classes.MainParagraph}`}>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
                egestas. Iaculis massa nisl malesuada lacinia integer nunc
                posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
                Ad litora torquent per conubia nostra inceptos himenaeos. Lorem
                ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
                egestas. Iaculis massa nisl malesuada lacinia integer nunc
                posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
                Ad litora torquent per conubia nostra inceptos himenaeos. Lorem
                ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
                egestas. Iaculis massa nisl malesuada lacinia integer nunc
                posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
                Ad litora torquent per conubia nostra inceptos himenaeos.
            </p>
        </main>
    )
}
