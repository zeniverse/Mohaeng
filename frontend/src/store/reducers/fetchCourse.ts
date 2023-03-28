import { Course } from "@/src/interfaces/Course";
import { getCourseListData } from "@/src/services/courseService";
import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type AsyncThunkConfig = {
  state: RootState;
};

// 통신 에러 시 보여줄 에러 메세지의 타입
interface MyKnownError {
  errorMessage: string;
}

// 통신 성공 시 가져오게 될 데이터의 타입
interface getCources {
  courses: Course[];
  completed: boolean;
}

// 비동기 통신 구현
export const fetchCourseList = createAsyncThunk<
  // 성공 시 리턴 타입
  Course[],
  // input type. 아래 콜백함수에서 userId 인자가 input에 해당
  void,
  // ThunkApi 정의({dispatch?, state?, extra?, rejectValue?})
  { rejectValue: MyKnownError }
>("course/getCourseList", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get("/api/course");
    return data;
  } catch (e) {
    // rejectWithValue를 사용하여 에러 핸들링이 가능하다
    return thunkAPI.rejectWithValue({
      errorMessage: "알 수 없는 에러가 발생했습니다.",
    });
  }
});
