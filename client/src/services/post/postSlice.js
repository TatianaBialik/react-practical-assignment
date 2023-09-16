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
  async (postId, { getState, rejectWithValue }) => {
    try {
      return await postService.deletePost(postId);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

const updatePost = createAsyncThunk(
  'post/updatePost',
  async (data, { getState, rejectWithValue }) => {
    try {
      return await postService.updatePost(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

const searchPosts = createAsyncThunk(
  'post/search',
  async (data, { getState, rejectWithValue }) => {
    try {
      return await postService.searchPosts(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
)

const uploadPicture = createAsyncThunk(
  'post/uploadPicture',
  async (data, { getState, rejectWithValue }) => {
    try {
      return await postService.uploadPicture(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
)

const createComment = createAsyncThunk(
  'post/createComment',
  async (data, { getState, rejectWithValue }) => {
    try {
      return await postService.createComment(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
)

const deleteComment = createAsyncThunk(
  'post/deleteComment',
  async (data, { getState, rejectWithValue }) => {
    try {
      return await postService.deleteComment(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }
);

const updateComment = createAsyncThunk(
  'post/updateComment',
  async (data, { getState, rejectWithValue }) => {
    try {
      return await postService.updateComment(data);
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  }

)

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
      if (state.posts.length < 9) state.posts.push(payload.result);
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
    [updatePost.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [updatePost.fulfilled]: (state, { payload }) => {
      state.posts = state.posts.map(post => {
        if (post.id === payload.result.id) {
          const newPost = post;
          newPost.title = payload.result.title;
          newPost.likes = payload.result.likes;
          newPost.dislikes = payload.result.dislikes;
          return newPost;
        }
        return post;
      });
      state.loading = false;
      state.error = false;
      state.success = true;
    },
    [updatePost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = payload.error;
    },
    [searchPosts.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [searchPosts.fulfilled]: (state, { payload }) => {
      state.posts = payload.result;
      state.loading = false;
      state.error = false;
      state.success = true;
    },
    [searchPosts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = payload.error;
    },
    [uploadPicture.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [uploadPicture.fulfilled]: (state, { payload }) => {
      state.posts = state.posts.map(post => {
        if (post.id === payload.result.id)
          return payload.result;
        return post;
      });
      state.loading = false;
      state.error = false;
      state.success = true;
    },
    [uploadPicture.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = payload.error;
    },
    [createComment.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [createComment.fulfilled]: (state, { payload }) => {
      state.posts = state.posts.map(post => {
        if (post.id === payload.result.postId) {
          const postTemp = { ...post };
          if (!postTemp.comments)
            postTemp.comments = [];
          postTemp.comments.push(payload.result);
          return postTemp;
        }
        return post;
      });
      state.loading = false;
      state.error = false;
      state.success = true;
    },
    [createComment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = payload.error;
    },
    [deleteComment.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [deleteComment.fulfilled]: (state, { payload }) => {
      state.posts = state.posts.map(post => {
        if (post.id === payload.result.postId) {
          post.comments = post.comments.filter(comment => comment.id !== payload.result.id);
        }
        return post;
      });
      state.loading = false;
      state.error = false;
      state.success = true;
    },
    [deleteComment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = payload.error;
    },
    [updateComment.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [updateComment.fulfilled]: (state, { payload }) => {
      state.posts = state.posts.map(post => {
        if (post.id === payload.result.postId) {
          post.comments = post.comments.map((comment) => {
            if (comment.id === payload.result.id) {
              return payload.result;
            }
            return comment;
          });
        }
        return post;
      });
      state.loading = false;
      state.error = false;
      state.success = true;
    },
    [updateComment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.message = payload.error;
    },
  },
});

export {
  createPost,
  getPostsByPage,
  deletePost,
  updatePost,
  searchPosts,
  createComment,
  deleteComment,
  updateComment,
};
export default postSlice.reducer;