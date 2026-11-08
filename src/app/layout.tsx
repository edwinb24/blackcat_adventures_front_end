import Footer from '@/components/footer/Footer'
import {getPostList} from '@/components/header/graphql/useGetPostListQuery'
import Header from '@/components/header/Header'
import {queryCms} from '@/components/lib/ApolloClient'
import {getSocialMedia} from '@/components/social_media_links/graphql/useGetSocialMediaQuery'
import type {Metadata} from 'next'
// The reset loads first, so that globals.css can build on it.
import './reset.css'
import './globals.css'

export const metadata: Metadata = {
    title: {
        default: 'Black Cat Adventures',
        template: '%s | Black Cat Adventures',
    },
    description:
        'Black Cat Adventures, TTRPG Modules, Adventures and DMing Services!',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    // The two queries do not depend on each other, so they run in parallel.
    // A failed query throws, and global-error.tsx shows the error page.
    const [postData, socialMediaData] = await Promise.all([
        queryCms(getPostList),
        queryCms(getSocialMedia),
    ])

    return (
        <html lang='en'>
            <body>
                <Header headerMenuOptions={postData} />
                {children}
                <Footer socialMediaInfo={socialMediaData} />
            </body>
        </html>
    )
}
