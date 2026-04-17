import SharedCarouselSlider from '@/components/shared_components/image_carousel/SharedCarouselSlider'
import {useGetHomeSlideListQuery} from './graphql/useGetHomeSlideListQuery'

export default function HomeCarouselSlider() {
    const {data, error, loading} = useGetHomeSlideListQuery()
    if (error) return <p>Error Loading this Element</p>
    if (loading) return <p>Loading...</p>
    if (!data || !data?.slideList?.carouselSlide?.slides) {
        return <p>Element Fail to Load</p>
    }
    console.log('data_______')
    console.log(data)
    const sliderImages = data.slideList.carouselSlide.slides.map(
        (slide, ind: number) => {
            return {
                title: slide?.title || '',
                id: `${slide?.title || ''}${ind}`,
                description: slide?.description || '',
                link: slide?.link || '',
                imageUrl: slide?.image?.node.link || '',
                imageAltText: slide?.image?.node.altText || '',
            }
        },
    )

    return <SharedCarouselSlider sliderElements={sliderImages} />
}
