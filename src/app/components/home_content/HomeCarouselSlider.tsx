import SharedCarouselSlider from '@/shared_components/image_carousel/SharedCarouselSlider'
import {GetHomeSlideListQuery} from './graphql/useGetHomeSlideListQuery.generated'

export default function HomeCarouselSlider({
    homeSlidesData,
}: {
    homeSlidesData: GetHomeSlideListQuery
}) {
    const slides = homeSlidesData.slideList?.carouselSlide?.slides || []
    const sliderImages = slides!.map((slide, ind: number) => {
        return {
            title: slide?.title || '',
            id: `${slide?.title || ''}${ind}`,
            description: slide?.description || '',
            link: slide?.link || '',
            imageUrl: slide?.image?.node.link || '',
            imageAltText: slide?.image?.node.altText || '',
        }
    })

    return <SharedCarouselSlider sliderElements={sliderImages} />
}
