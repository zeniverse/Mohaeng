export interface Keyword {
  id: number;
  name: string;
  address: string;
  areaCode: string;
  sigunguCode: string;
  firstImage: string;
  firstImage2: string;
  mapX: string;
  mapY: string;
  contentId: string;
  rating: number;
}

export type KeywordProps = {
  keyword: string;
};
