import * as Types from '../../../../types/__generated__/graphql';

export type GetHomeSlideListQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GetHomeSlideListQuery = { slideList: { __typename: 'SlideList', carouselSlide: { __typename: 'CarouselSlide', slides: Array<{ __typename: 'CarouselSlideSlides', title: string | null, description: string | null, link: string | null, image: { __typename: 'AcfMediaItemConnectionEdge', node: { __typename: 'MediaItem', link: string | null, altText: string | null } } | null } | null> | null } | null } | null };
