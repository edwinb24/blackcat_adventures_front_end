import HomeContent from '@/components/home_content/HomeContent'
import {getHomeSlideList} from '@/components/home_content/graphql/useGetHomeSlideListQuery'
import {queryCms} from '@/components/lib/ApolloClient'
import {HOME_PAGE_SLIDES} from '@/utils/constants'

export default async function HomePage() {
    const data = await queryCms(getHomeSlideList, {id: HOME_PAGE_SLIDES})

    if (!data.slideList?.carouselSlide?.slides) {
        throw new Error('The home page slides are missing in the CMS.')
    }
    return <HomeContent homeSlidesData={data} />
}
