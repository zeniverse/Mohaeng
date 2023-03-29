import { Course } from "@/src/interfaces/Course";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchCourseList } from "./fetchCourse";

interface CourseState {
  status: string;
  error?: string;
  courses?: Array<Course>;
}

export interface FormValues {
  title: string;
  startDate: string;
  endDate: string;
  isPublished: boolean;
  courseDays: string;
  region: string;
  thumbnailUrl: string;
  content: string;
}

const initialState: FormValues = {
  title: "",
  startDate: "",
  endDate: "",
  isPublished: true,
  courseDays: "",
  region: "",
  thumbnailUrl: "",
  content: "",
};

// const initialState: CourseState = {
//   status: "idle",
// };

export const CourseFormSlice = createSlice({
  name: "courseform",
  initialState: initialState,
  reducers: {
    setFormValue: (
      state,
      action: PayloadAction<{ name: keyof FormValues; value: string | boolean }>
    ) => {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    },
    resetFormValue: (state) => {
      return initialState;
    },
  },
});

export const { setFormValue, resetFormValue } = CourseFormSlice.actions;
export default CourseFormSlice.reducer;

// extraReducers: (builder) => {
//   builder
//     .addCase(fetchCourseList.pending, (state) => {
//       state.status = "loading";
//     })
//     .addCase(fetchCourseList.fulfilled, (state, action) => {
//       state.status = "succeeded";
//       state.courses = action.payload;
//     })
//     .addCase(fetchCourseList.rejected, (state, action) => {
//       state.status = "failed";
//       state.error = action.error.message;
//     });
// },
