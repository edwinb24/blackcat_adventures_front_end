import Footer from '@/components/footer/Footer'
import {getPostList} from '@/components/header/graphql/useGetPostListQuery'
import Header from '@/components/header/Header'
import {getClient} from '@/components/lib/ApolloClient'
import type {Metadata} from 'next'
import {ApolloWrapper} from './components/lib/ApolloWrapper'
import {getSocialMedia} from './components/social_media_links/graphql/useGetSocialMediaQuery'
import {NewsletterModalContextProvider} from './contexts/newsletterModalContext'
import './globals.css'
import './reset.css'

export const metadata: Metadata = {
    title: 'Black Cat Adventures',
    description:
        'Black Cat Adventures, TTRPG Modules, Adventures and DMing Services!',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const {data: postData, error: postError} = await getClient().query({
        query: getPostList,
    })
    const {data: socialMediaData, error: socialMediaError} =
        await getClient().query({
            query: getSocialMedia,
        })
    if (postError || socialMediaError) return <p>Error Loading this Element</p>
    if (
        !postData ||
        !postData.posts ||
        !socialMediaData ||
        !socialMediaData?.socialMediaLinks
    ) {
        return <p>Element Fail to Load</p>
    }
    return (
        <html lang='en'>
            <body>
                <ApolloWrapper>
                    <NewsletterModalContextProvider>
                        <Header headerMenuOptions={postData} />
                        {children}
                        <Footer socialMediaInfo={socialMediaData} />
                    </NewsletterModalContextProvider>
                </ApolloWrapper>
            </body>
        </html>
    )
}
