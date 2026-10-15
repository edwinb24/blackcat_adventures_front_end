/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import * as Types from '../../../../types/__generated__/graphql';

export type GetHomeSlideListQueryVariables = Exact<{
  id: string | number;
}>;


export type GetHomeSlideListQuery = { slideList: { __typename: 'SlideList', carouselSlide: { __typename: 'CarouselSlide', slides: Array<{ __typename: 'CarouselSlideSlides', title: string | null, description: string | null, link: string | null, image: { __typename: 'AcfMediaItemConnectionEdge', node: { __typename: 'MediaItem', link: string | null, altText: string | null } } | null } | null> | null } | null } | null };
