import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/auth.slice";
import CourseReducer from "./reducers/course.slice";
import CategoryReducer from "./reducers/category.slice";

export const store = configureStore({
    reducer: {
        auth:AuthReducer,
        course:CourseReducer,
        category:CategoryReducer
    },
  })
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch