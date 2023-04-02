export interface ICourse {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  isPublished: boolean;
  courseDays: string;
  region: string;
  thumbnailUrl: string;
  content: string;
  likeCount: number;
  places: placesName[];
}
export interface placesName {
  name: string;
}

export enum ApiStatus {
  "loading",
  "ideal",
  "success",
  "error",
}

export interface ICourseState {
  list: ICourse[];
  listStatus: ApiStatus;
  // createUserFormStatus: ApiStatus;
}

export interface ICourseForm {
  title: string;
  startDate?: string;
  endDate?: string;
  isPublished: boolean;
  courseDays: string;
  region: string;
  thumbnailUrl: string;
  content: string;
}
export interface ICourseOriginForm extends ICourseForm {
  places: IPlacesForm[];
}

export interface ICourseSubmitForm extends ICourseForm {
  placeIds: number[];
}
// export interface IUpdateUserActionProps {
//   id: number;
//   data: IUserForm;
// }

export interface IPlacesForm {
  placeId: number;
  name: string;
  mapX: string;
  mapY: string;
  imgUrl: string;
  rating: string;
  address?: string;
}
