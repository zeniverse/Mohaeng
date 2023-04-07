export interface Keyword {
  areaCode: string;
  name: string;
  firstImage: string;
  contentId: string;
  isBookmark: boolean;
  rating: number;
  review: string;
}

export type KeywordProps = {
  name: string;
  firstImage: string;
  contentId: string;
  isBookmark: boolean;
  rating: number;
  review: string;
};
