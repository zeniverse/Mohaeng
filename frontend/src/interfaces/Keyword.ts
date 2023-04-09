export interface Keyword {
  placeId: number;
  name: string;
  firstImage: string;
  contentId: string;
  isBookmarked: boolean;
  averageRating: number;
  reviewTotalElements: number;
}

export type KeywordProps = {
  placeId: number;
  areaCode: string;
  name: string;
  firstImage: string;
  contentId: string;
  isBookmarked: boolean;
  averageRating: number;
  reviewTotalElements: number;
};
