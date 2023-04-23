import { ICourseEditParam, IFormErrors } from "./../../interfaces/Course.type";
import { createCourseApi, editCourseApi } from "@/src/services/courseService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICourseForm,
  ICourseOriginForm,
  ICourseSubmitForm,
} from "../../interfaces/Course.type";
import PlaceId from "@/src/pages/place/[id]";

interface CourseState {
  errors?: IFormErrors;
  isFormValid: boolean;
  course: ICourseOriginForm;
}

export const initialState: CourseState = {
  course: {
    title: "",
    content: "",
    courseDays: "",
    startDate: "",
    endDate: "",
    region: "",
    isPublished: true,
    thumbnailUrl: "",
    places: [],
    isBookmarked: false,
    isLiked: false,
    likeCount: 0,
  },
  isFormValid: false,
};

export const createCourseAction = createAsyncThunk(
  "course/createUserAction",
  async (formData: ICourseOriginForm) => {
    const { places, ...rest } = formData;
    const validPlace = places.find((place) => place.imgUrl.trim() !== "");
    const thumbnailUrl = validPlace?.imgUrl ?? "";
    const extractedPlaceIds = places.map((place) => place.placeId);

    const validData = {
      ...rest,
      placeIds: extractedPlaceIds,
      thumbnailUrl: thumbnailUrl,
    };

    const response = await createCourseApi(validData);
    const resData = await response.data.data;
    return { formData, resData };
  }
);

export const editCourseAction = createAsyncThunk(
  "course/editCourseAction",
  async (formData: ICourseEditParam) => {
    const { courseId, course } = formData;
    const { places, ...rest } = course;
    const validPlace = places.find((place) => place.imgUrl.trim() !== "");
    const thumbnailUrl = validPlace?.imgUrl ?? "";
    const extractedPlaceIds = places.map((place) => place.placeId);

    const validData = {
      ...rest,
      placeIds: extractedPlaceIds,
      thumbnailUrl: thumbnailUrl,
    };
    const response = await editCourseApi(courseId, validData);
    return formData;
  }
);

export const CourseFormSlice = createSlice({
  name: "courseform",
  initialState: initialState,
  reducers: {
    setFormValue: (
      state,
      action: PayloadAction<{
        name: keyof ICourseForm;
        value: string | boolean;
      }>
    ) => {
      ``;
      const { name, value } = action.payload;
      state.course = {
        ...state.course,
        [name]: value,
      };
    },
    removePlace: (state, action) => {
      const newList = state.course.places.filter(
        (place) => place.placeId !== action.payload
      );
      state.course.places = newList;
    },
    resetFormValue: () => {
      return initialState;
    },
    addPlaceObject: (state, action) => {
      const data = action.payload;

      const placeIds = new Set(
        state.course.places.map((place) => place.placeId)
      );
      if (placeIds.has(data.placeId)) {
        // 이미 같은 placeId를 가진 객체가 존재하므로 추가하지 않음
        return;
      }

      state.course.places.push(data);
    },
    addFormValue: (state, action) => {
      state.course = action.payload;
    },
    setIsFormValidTrue(state) {
      state.isFormValid = true;
    },
    setIsFormValidFalse(state) {
      state.isFormValid = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCourseAction.pending, (state) => {
      // state.createUserFormStatus = ApiStatus.loading;
    });
    builder.addCase(createCourseAction.fulfilled, (state, action) => {
      // state.createUserFormStatus = ApiStatus.success;
    });
    builder.addCase(createCourseAction.rejected, (state) => {
      // state.createUserFormStatus = ApiStatus.error;
    });
  },
});

export const {
  setFormValue,
  resetFormValue,
  addPlaceObject,
  removePlace,
  addFormValue,
  setIsFormValidTrue,
  setIsFormValidFalse,
} = CourseFormSlice.actions;
export default CourseFormSlice.reducer;
