import AboutUsContent from '@/components/about_us_content/AboutUsContent'
import {getAboutUsContent} from '@/components/about_us_content/graphql/useGetAboutUsContentQuery'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import {getClient} from '@/components/lib/ApolloClient'
import {ABOUT_US_PAGE_ID} from '@/utils/constants'

export default async function AboutUs() {
    const {data, error} = await getClient().query({
        query: getAboutUsContent,
        variables: {id: ABOUT_US_PAGE_ID},
    })
    if (error) return <p>Error Loading this Element</p>
    if (!data || !data?.post || !data.post?.content || !data.post?.title) {
        return <p>Element Fail to Load or is missing content and/or title</p>
    }
    const {title, content}: {title: string; content: string} = data.post as {
        title: string
        content: string
    }
    const featuredImageUrl = data.post?.featuredImage?.node?.sourceUrl || ''
    console.log('featuredImageUrl:', featuredImageUrl)

    return (
        <>
            <Header />
            <AboutUsContent
                title={title}
                content={content}
                featuredImageUrl={featuredImageUrl}
            />
            <Footer />
        </>
    )
}
