export interface Keyword {
  placeId: number;
  name: string;
  firstImage: string;
  contentId: string;
  isBookmarked: boolean;
  averageRating: number;
  reviewTotalElements: number;
  onBookmarkUpdate: (placeId: number, isBookmarked: boolean) => void;
}

export type KeywordProps = {
  placeId: number;
  name: string;
  firstImage: string;
  contentId: string;
  isBookmarked: boolean;
  averageRating: number;
  reviewTotalElements: number;
  onBookmarkUpdate: (placeId: number, isBookmarked: boolean) => void;
};
