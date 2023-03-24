import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./reducers/modalSlice";
import tokenReducer from "./reducers/loginTokenSlice";
import socialEmailReducer from "./reducers/socialSlice";
import nickNameReducer from "./reducers/loginTokenSlice";
import emailReducer from "./reducers/loginTokenSlice";
import idReducer from "./reducers/loginTokenSlice";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    token: tokenReducer,
    nickName: nickNameReducer,
    email: emailReducer,
    socialEmail: socialEmailReducer,
    id: idReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
