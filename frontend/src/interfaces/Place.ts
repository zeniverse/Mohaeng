export interface Place {
  id: string;
  addr1: string;
  firstimage: string;
  title: string;
  description: string;
  rating: string;
}

export type PlaceProps = {
  id: string;
  placeImg: string;
  placeTitle: string;
  // placeDesc: string;
  placeRating: string;
};
