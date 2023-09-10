import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  posts: [],
  totalPages: 0,
  loading: false,
  error: false,
  success: false,
  message: null
};

const getPostsByPage = createAsyncThunk(
  'post/getPosts',
  async (pageNumber, { getState, rejectWithValue }) => {
    try {
      return await postService.getPostsByPage(pageNumber);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

const createPost = createAsyncThunk(
  'post/createPost',
  async (post, { getState, rejectWithValue }) => {
    try {
      return await postService.createPost(post)
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  });

  const deletePost = createAsyncThunk(
    'post/deletePost',
    async(postId, { getState, rejectWithValue }) => {
      try {
        return await postService.deletePost(postId);
      } catch(err) {
        console.log(err);
        return rejectWithValue(err);
      }
    }
  );

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [createPost.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [createPost.fulfilled]: (state, { payload }) => {
      state.posts.push(payload);
      state.loading = false;
      state.error = false;
      state.success = true;
    },
    [createPost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = payload.error;
    },
    [getPostsByPage.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [getPostsByPage.fulfilled]: (state, { payload }) => {
      state.posts = payload.result;
      state.totalPages = payload.totalPages;
      state.loading = false;
      state.error = false;
      state.success = true;
    },
    [getPostsByPage.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = payload.error;
    },
    [deletePost.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [deletePost.fulfilled]: (state, { payload }) => {
      state.posts = state.posts.filter(post => post.id !== payload.result.id);
      state.loading = false;
      state.error = false;
      state.success = true;
    },
    [deletePost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = payload.error;
    },
  },
});

export { createPost, getPostsByPage, deletePost };
export default postSlice.reducer;