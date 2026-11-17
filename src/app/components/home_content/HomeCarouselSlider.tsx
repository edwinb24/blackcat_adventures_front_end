import SharedCarouselSlider from '@/shared_components/image_carousel/SharedCarouselSlider'
import type {GetHomeSlideListQuery} from './graphql/useGetHomeSlideListQuery.generated'

export default function HomeCarouselSlider({
    homeSlidesData,
}: {
    homeSlidesData: GetHomeSlideListQuery
}) {
    const slides = homeSlidesData.slideList?.carouselSlide?.slides || []
    const sliderImages = slides.map((slide, index: number) => {
        return {
            title: slide?.title || '',
            id: `${slide?.title || ''}${index}`,
            description: slide?.description || '',
            link: slide?.link || '',
            imageUrl: slide?.image?.node.link || '',
            imageAltText: slide?.image?.node.altText || '',
        }
    })

    return <SharedCarouselSlider sliderElements={sliderImages} />
}
