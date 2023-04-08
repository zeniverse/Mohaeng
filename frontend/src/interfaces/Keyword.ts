export interface Keyword {
  placeId: number;
  areaCode: string;
  name: string;
  firstImage: string;
  contentId: string;
  isBookmark: boolean;
  rating: string;
  review: string;
}

export type KeywordProps = {
  placeId: number;
  name: string;
  firstImage: string;
  contentId: string;
  isBookmark: boolean;
  rating: number;
  review: string;
};
