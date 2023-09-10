import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../services/login/loginSlice";
import modalReducer from "../services/modal/modalSlice";
import postReducer from "../services/post/postSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    modal: modalReducer,
    post: postReducer
  }
});