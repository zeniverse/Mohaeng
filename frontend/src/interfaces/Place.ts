export interface Place {
  id: string;
  addr1: string;
  firstimage: string;
  title: string;
  description: string;
  rating: string;
}

export type ITopTenPlace = {
  placeId: number;
  contentId: string;
  name: string;
  content: string;
  firstImage: string;
  averageRating: string;
};
