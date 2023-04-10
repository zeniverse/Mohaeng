export interface ReviewData {
  reviewId: number;
  nickname: string;
  memberImage: string;
  rating: string;
  content: string;
  createdDate: string;
  imgUrl: string[];
}

export type ReviewProps = {
  reviewId: number;
  nickname: string;
  memberImage: string;
  rating: string;
  content: string;
  createdDate: string;
  imgUrl: string[];
};
