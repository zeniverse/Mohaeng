export interface Course {
  id: number;
  title: string;
  courseDesc: string;
  like: number;
  items: items[];
}
export interface items {
  courseId: number;
  coursetitle: string;
  content: string;
  imgUrl: string;
}
