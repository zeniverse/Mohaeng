import { ICourseDetail } from "@/src/interfaces/Course.type";
import { getCourseDetailApi } from "@/src/services/courseDetailService";
import { toggleBookmarkApi, toggleLikeApi } from "@/src/services/courseService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ToggleLikeApiResponse } from "./CourseListSlice";

interface CourseDetailState {
  error?: string;
  course: ICourseDetail;
}

const initialState: CourseDetailState = {
  course: {
    courseId: 0,
    title: "",
    content: "",
    nickname: "",
    likeCount: 0,
    courseDays: "",
    createdDate: "",
    startDate: "",
    endDate: "",
    region: "",
    isBookmarked: false,
    isLiked: true,
    isPublished: true,
    places: [],
  },
};

// courseId: number;
// title: string;
// content: string;
// nickname: string;
// likeCount: number;
// courseDays: string;
// createdDate: string;
// startDate: string;
// endDate: string;
// region: string;
// isBookmarked: boolean;
// isLiked: boolean;
// isPublished: boolean;
// places: IPlaces[];

export const detailBookmarkToggleAction = createAsyncThunk(
  "course/detailToggleBookmark",
  async (courseId: number, { getState }) => {
    const courseState = (await getState()) as RootState;
    const course = courseState.courseDetail.course;
    const isBookmarked = course ? course.isBookmarked : false;
    if (isBookmarked) {
      await toggleBookmarkApi(courseId, "DELETE");
      console.log("상세 북마크 제거");
    } else {
      await toggleBookmarkApi(courseId, "POST");
      console.log("상세 북마크 제거");
    }
    return courseId;
  }
);
export const detailLikeToggleAction = createAsyncThunk(
  "course/detailToggleLike",
  async (courseId: number, { getState }) => {
    const courseState = (await getState()) as RootState;
    const course = courseState.courseDetail.course;
    const isLiked = course ? course.isLiked : false;
    let resData: ToggleLikeApiResponse;
    if (isLiked) {
      resData = await toggleLikeApi(courseId, "DELETE");
      console.log("상세 좋아요 해제");
    } else {
      resData = await toggleLikeApi(courseId, "POST");
      console.log("상세 좋아요 추가");
    }
    return resData;
  }
);

export const getCourseDetailAction = createAsyncThunk(
  "course/getCourseListAction",
  async (courseId: number, { rejectWithValue }) => {
    try {
      const response = await getCourseDetailApi(courseId);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const CourseDetailSlice = createSlice({
  name: "coursedetail",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourseDetailAction.pending, (state) => {});
    builder.addCase(getCourseDetailAction.fulfilled, (state, action) => {
      const course = action.payload;
      state.course = course;
    });
    builder.addCase(getCourseDetailAction.rejected, (state) => {});
    builder.addCase(detailBookmarkToggleAction.pending, (state) => {});
    builder.addCase(detailBookmarkToggleAction.fulfilled, (state, action) => {
      if (state.course.courseId === action.payload) {
        state.course.isBookmarked = !state.course.isBookmarked;
      } else return;
    });
    builder.addCase(detailBookmarkToggleAction.rejected, (state) => {});
    builder.addCase(detailLikeToggleAction.pending, (state) => {});
    builder.addCase(detailLikeToggleAction.fulfilled, (state, action) => {
      const { courseId, totalLikes } = action.payload;
      if (state.course.courseId === courseId) {
        state.course.isLiked = !state.course.isLiked;
        state.course.likeCount = totalLikes;
      } else return;
    });
    builder.addCase(detailLikeToggleAction.rejected, (state) => {});
  },
});

export const {} = CourseDetailSlice.actions;
export default CourseDetailSlice.reducer;
