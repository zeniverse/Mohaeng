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
  setIsRoughMapOpen?: any;
  isRoughMapOpen?: any;
}
