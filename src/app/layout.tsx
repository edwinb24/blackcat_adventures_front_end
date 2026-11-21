import Footer from '@/components/footer/Footer'
import {getPostList} from '@/components/header/graphql/useGetPostListQuery'
import Header from '@/components/header/Header'
import {queryCms} from '@/components/lib/ApolloClient'
import {getSocialMedia} from '@/components/social_media_links/graphql/useGetSocialMediaQuery'
import type {Metadata} from 'next'
import {Metamorphous} from 'next/font/google'
import type {ReactNode} from 'react'
import './reset.css'
import './globals.css'

export const revalidate = 60

const metamorphousFont = Metamorphous({
    display: 'swap',
    subsets: ['latin'],
    variable: '--metamorphous-font',
    weight: '400',
})

export const metadata: Metadata = {
    title: {
        default: 'Black Cat Adventures',
        template: '%s | Black Cat Adventures',
    },
    description:
        'Black Cat Adventures, TTRPG Modules, Adventures and DMing Services!',
}

// Loads the header menu and footer links and wraps every page with them
export default async function RootLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    const [postData, socialMediaData] = await Promise.all([
        queryCms(getPostList),
        queryCms(getSocialMedia),
    ])

    return (
        <html className={metamorphousFont.variable} lang='en'>
            <body>
                <Header headerMenuOptions={postData} />
                {children}
                <Footer socialMediaInfo={socialMediaData} />
            </body>
        </html>
    )
}
