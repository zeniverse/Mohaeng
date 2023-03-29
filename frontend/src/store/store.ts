import {
  combineReducers,
  configureStore,
  PayloadAction,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import logger from "redux-logger";
import modalReducer from "./reducers/modalSlice";
import tokenReducer from "./reducers/loginTokenSlice";
import nickNameReducer from "./reducers/loginTokenSlice";
import emailReducer from "./reducers/loginTokenSlice";
import idReducer from "./reducers/loginTokenSlice";
import profileUrlReducer from "./reducers/loginTokenSlice";
import CourseFormSlice from "./reducers/CourseFormSlice";

const reducer = (state: any, action: PayloadAction<any>) => {
  return combineReducers({
    modal: modalReducer,
    token: tokenReducer,
    nickName: nickNameReducer,
    email: emailReducer,
    id: idReducer,
    profileUrl: profileUrlReducer,
    course: CourseFormSlice,
  })(state, action);
};

const makeStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  });

const store = makeStore();

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV === "development",
});
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
