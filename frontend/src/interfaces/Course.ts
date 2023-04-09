import { placesName } from "./Course.type";

export interface CourseList {
  id?: number;
  title: string;
  likeCount: number;
  courseDays?: string;
  createdDate?: string;
  thumbnailUrl: string;
  isPublished?: boolean;
  content?: string;
  places?: placesName[];
}

export type CourseListProps = {
  id: number;
  title: string;
  content: string;
  likeCount: number;
  courseDays: string;
  thumbnailUrl: string;
  isBookmarked: boolean;
  isLiked: boolean;
  places: placesName[];
};

export interface RoughMapTitle {
  RoughMapData: placesName[];
  onClose: any;
}

export interface CourseDetailType {
  courseId: number;
  title: string;
  startDate: string;
  endDate: string;
  isPublished: boolean;
  courseDays: string;
  region: string;
  content: string;
  likeCount: number;
  createdDate: string;
  isBookmarked: boolean;
  isLiked: boolean;
  nickname: string;
  places?: any;
}

export interface CourseDetailPlaces {
  placeId: number;
  imgUrl: string;
  name: string;
  address: string;
  mapX: string;
  mapY: string;
}

export interface kakaoPlaces {
  placeId?: number;
  name: string;
  mapX: string;
  mapY: string;
  imgUrl?: string;
  address?: string;
}

export interface PositionsProps {
  mapData: kakaoPlaces[];
}

export interface formatPositions {}
