import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import modalReducer from "./reducers/modalSlice";
import tokenReducer from "./reducers/loginTokenSlice";
import nickNameReducer from "./reducers/loginTokenSlice";
import emailReducer from "./reducers/loginTokenSlice";
import idReducer from "./reducers/loginTokenSlice";
import imgUrlReducer from "./reducers/loginTokenSlice";
import placeReducer from "./reducers/PlaceSlice";
import mypageReducer from "./reducers/mypageSlice";
import pageReducer from "./reducers/pageSlice";
import searchPlaceReducer from "./reducers/searchPlaceSlice";
import searchCourseReducer from "./reducers/searchCourseSlice";
import placeBookmarkReducer from "./reducers/PlaceBookmarkSlice";
import reviewDetailReducer from "./reducers/reviewDetailSlice";
import reviewReducer from "./reducers/reviewSlice";
import myCourseReducer from "./reducers/myCourseSlice";
import myReviewReducer from "./reducers/myReviewSlice";
import filterSlice from "./reducers/filterSlice";
import CourseBookmarkReducer from "./reducers/CourseBoomarkSlice";
import courseDetailSlice from "./reducers/courseDetailSlice";
import courseListSlice from "./reducers/courseListSlice";
import courseFormSlice from "./reducers/courseFormSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    token: tokenReducer,
    nickName: nickNameReducer,
    email: emailReducer,
    id: idReducer,
    imgUrl: imgUrlReducer,
    course: courseListSlice,
    courseForm: courseFormSlice,
    filter: filterSlice,
    place: placeReducer,
    mypage: mypageReducer,
    page: pageReducer,
    searchPlace: searchPlaceReducer,
    searchCourse: searchCourseReducer,
    courseBookmark: CourseBookmarkReducer,
    placeBookmark: placeBookmarkReducer,
    reviewDetail: reviewDetailReducer,
    review: reviewReducer,
    myCourse: myCourseReducer,
    courseDetail: courseDetailSlice,
    myReview: myReviewReducer,
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
