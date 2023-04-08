// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export interface bookmarkCourse {
//   bookMarkId: number;
//   courseId: number;
//   courseTitle: string;
//   region: string;
//   content: string;
//   isPublished: string;
//   courseImgUrl: string;
//   createdDate: string;
//   modifiedDate: string;
// }

// export interface bookmarkCourseState {
//   data: bookmarkCourse[];
// }

// const initialState: bookmarkCourseState = {
//   data: [],
// };

// export const toggleBookmark = createAsyncThunk(
//   'bookmarks/toggleBookmark',
//   async (courseId, { getState }) => {
//     const state = getState().bookmarks;
//     const isBookmarked = state[courseId] ? !state[courseId].isBookmarked : true;
//     await toggleBookmarkAPI(courseId, isBookmarked);
//     return { courseId, isBookmarked };
//   }
// );

// export const toggleBookmarkAPI = async (courseId, isBookmarked) => {
//   try {
//     const response = await fetch(`api/course/bookmark/${courseId}`, {
//       method: isBookmarked ? 'POST' : 'DELETE',
//     });

//     if (!response.ok) {
//       throw new Error('Failed to toggle bookmark.');
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const CourseBookmarkSlice = createSlice({
//   name: "courseBookmark",
//   initialState: {},
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(toggleBookmark.pending, (state, action) => {
//         state[action.meta.arg] = { isPending: true };
//       })
//       .addCase(toggleBookmark.fulfilled, (state, action) => {
//         state[action.payload.courseId] = { isBookmarked: action.payload.isBookmarked };
//       })
//       .addCase(toggleBookmark.rejected, (state, action) => {
//         console.error(action.error.message);
//       });
//   },

// export default CourseBookmarkSlice.reducer;
