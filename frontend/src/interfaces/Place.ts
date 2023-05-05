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
  name: string;
  firstImage: string;
  averageRating: string;
};
