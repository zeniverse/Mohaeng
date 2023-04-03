export interface Course {
  id?: number;
  title: string;
  likeCount: number;
  courseDays?: string;
  createdDate?: string;
  thumbnailUrl: string;
  isPublished?: boolean;
  content?: string;
  places?: Places[];
}
export interface Places {
  placeId?: number;
  imgUrl?: string;
  name?: string;
  address?: string;
}

export type CourseProps = {
  id?: number;
  courseTitle: string;
  courseDesc?: string;
  courseLike: number;
  courseDays?: string;
  thumbnailUrl: string;
  courseList?: Places[];
};

export interface RoughMapTitle {
  RoughMapData: string[];
  onClose: any;
}

export interface CourseDetailType {
  title: string;
  nickname: string;
  likeCount: number | string;
  courseDays: string;
  region: string;
  content: string;
  createdDate: string;
  places: CourseDetailPlaces[];
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
  placeId: number;
  name: string;
  mapX: string;
  mapY: string;
}

export interface PositionsProps {
  positions: kakaoPlaces[];
}

export interface formatPositions {}
