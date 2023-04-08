import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import modalReducer from "./reducers/modalSlice";
import tokenReducer from "./reducers/loginTokenSlice";
import nickNameReducer from "./reducers/loginTokenSlice";
import emailReducer from "./reducers/loginTokenSlice";
import idReducer from "./reducers/loginTokenSlice";
import imgUrlReducer from "./reducers/loginTokenSlice";
import CourseFormSlice from "./reducers/CourseFormSlice";
import FilterSlice from "./reducers/FilterSlice";
import CourseSlice from "./reducers/CourseSlice";
import placeReducer from "./reducers/PlaceSlice";
import mypageReducer from "./reducers/mypageSlice";
import pageReducer from "./reducers/pageSlice";
import searchPlaceReducer from "./reducers/searchPlaceSlice";
import searchCourseReducer from "./reducers/searchCourseSlice";
import courseBookmarkReducer from "./reducers/CourseBoomarkSlice";
import placeBookmarkReducer from "./reducers/PlaceBookmarkSlice";
import reviewFormReducer from "./reducers/reviewFormSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    token: tokenReducer,
    nickName: nickNameReducer,
    email: emailReducer,
    id: idReducer,
    imgUrl: imgUrlReducer,
    course: CourseSlice,
    courseForm: CourseFormSlice,
    filter: FilterSlice,
    place: placeReducer,
    mypage: mypageReducer,
    page: pageReducer,
    searchPlace: searchPlaceReducer,
    searchCourse: searchCourseReducer,
    courseBookmark: courseBookmarkReducer,
    placeBookmark: placeBookmarkReducer,
    reviewForm: reviewFormReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
