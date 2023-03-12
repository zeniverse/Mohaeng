export interface Course {
  courseId: number;
  title: string;
  like: number;
  courseDays: string;
  createdDate: string;
  isPublished: boolean;
  content: string;
  places: Places[];
}
export interface Places {
  placeId: number;
  imgUrl: string;
  title: string;
  address: string;
}

export type CourseProps = {
  id: number;
  courseTitle: string;
  courseDesc: string;
  courseLike: number;
  courseDays: string;
  courseList: Places[];
};

export interface RoughMapTitle {
  RoughMapData: string[];
  setIsRoughMapOpen?: any;
  isRoughMapOpen?: any;
}
