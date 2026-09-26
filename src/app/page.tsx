import HomeContent from '@/components/home_content/HomeContent'
import {getHomeSlideList} from '@/components/home_content/graphql/useGetHomeSlideListQuery'
import {getClient} from '@/components/lib/ApolloClient'
import {NewsletterModalContextProvider} from '@/contexts/newsletterModalContext'
import {HOME_PAGE_SLIDES} from './utils/constants'

export default async function HomePage() {
    const {data, error} = await getClient().query({
        query: getHomeSlideList,
        variables: {id: HOME_PAGE_SLIDES},
    })

    if (error) return <p>Error Loading this Element</p>
    if (!data || !data?.slideList?.carouselSlide?.slides) {
        return <p>Element Fail to Load</p>
    }
    return (
        <NewsletterModalContextProvider>
            <HomeContent homeSlidesData={data} />
        </NewsletterModalContextProvider>
    )
}
