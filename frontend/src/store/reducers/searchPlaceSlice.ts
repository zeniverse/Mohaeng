import { createSlice } from "@reduxjs/toolkit";

export interface content {
  placeId: number;
  name: string;
  firstImage: string;
  contentId: string;
  isBookmarked: boolean;
  averageRating: number;
  reviewTotalElements: number;
}

export interface SearchPlaceState {
  contents: content[];
  totalPages: number;
  totalElements: number;
}

const initialState: SearchPlaceState = {
  contents: [],
  totalPages: 0,
  totalElements: 0,
};

export const searchPlaceSlice = createSlice({
  name: "searchPlace",
  initialState,
  reducers: {
    setSearchPlace: (state, action) => {
      state.contents = action.payload.content;
      state.totalPages = action.payload.totalPages;
      state.totalElements = action.payload.totalElements;
    },
  },
});

export const { setSearchPlace } = searchPlaceSlice.actions;
export default searchPlaceSlice.reducer;

// import { Keyword } from "@/src/interfaces/Keyword";

// // export interface SearchPlaceList {
// //   placeId: number;
// //   name: string;
// //   firstImage: string;
// //   contentId: string;
// //   isBookmarked: boolean;
// //   averageRating: number;
// //   reviewTotalElements: number;
// // }

// // export interface SearchPlaceState {
// //   contents: content[];
// //   totalPages: number;
// //   totalElements: number;
// // }

// // const initialState: SearchPlaceState = {
// //   contents: [],
// //   totalPages: 0,
// //   totalElements: 0,
// // };

// // export const searchPlaceSlice = ({
// //   name: "searchPlace",
// //   initialState,
// //   reducers: {
// //     setSearchPlace: (state, action) => {
// //       state.contents = action.payload.content;
// //       state.totalPages = action.payload.totalPages;
// //       state.totalElements = action.payload.totalElements;
// //     },
// //   },
// // });

// // export const { setSearchPlace } = searchPlaceSlice.actions;
// // export default searchPlaceSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../store";
// import {
//   getPlaceListApi,
//   toggleBookmarkApi,
// } from "@/src/services/placeService";

// export interface content {
//   placeId: number;
//   name: string;
//   firstImage: string;
//   contentId: string;
//   isBookmarked: boolean;
//   averageRating: number;
//   reviewTotalElements: number;
// }
// interface SearchPlaceState {
//   error?: string;
//   content: content[];
//   totalElements?: number;
//   totalPages?: number;
// }

// const initialState: SearchPlaceState = {
//   content: [],
// };

// export const getPlaceListAction = createAsyncThunk(
//   "place/getPlaceListAction",
//   async (queryParams: any, { rejectWithValue }) => {
//     try {
//       const response = await getPlaceListApi(queryParams);
//       return response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const listBookmarkToggleAction = createAsyncThunk(
//   "place/listToggleBookmark",
//   async (placeId: number, { getState }) => {
//     const searchPlaceState = (await getState()) as RootState;
//     const content = searchPlaceState.searchPlace.content;
//     const place = content.find((place) => place.placeId === placeId);
//     const isBookmarked = place ? place.isBookmarked : false;
//     if (isBookmarked) {
//       await toggleBookmarkApi(placeId, "DELETE");
//       console.log("목록 북마크 제거");
//     } else {
//       await toggleBookmarkApi(placeId, "POST");
//       console.log("목록 북마크 추가");
//     }
//     return placeId;
//   }
// );

// export const searchPlaceSlice = createSlice({
//   name: "searchPlace",
//   initialState: initialState,
//   reducers: {
//     addPlaceToList: (state, action) => {
//       state.content.push(action.payload);
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(getPlaceListAction.pending, (state) => {});
//     builder.addCase(getPlaceListAction.fulfilled, (state, action) => {
//       const { content, totalElements, totalPages } = action.payload;
//       state.content = content;
//       state.totalElements = totalElements;
//       state.totalPages = totalPages;
//     });
//     builder.addCase(getPlaceListAction.rejected, (state) => {});

//     builder.addCase(listBookmarkToggleAction.pending, (state) => {});
//     builder.addCase(listBookmarkToggleAction.fulfilled, (state, action) => {
//       const placeId = action.payload;
//       const place = state.content.find((p) => p.placeId === placeId);
//       if (place) {
//         place.isBookmarked = !place.isBookmarked;
//       }
//     });
//     builder.addCase(listBookmarkToggleAction.rejected, (state) => {});
//   },
// });

// // export const { addCourseToList } = searchPlaceSlice.actions;
// export default searchPlaceSlice.reducer;
