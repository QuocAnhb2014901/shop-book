import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

export const getPost = createAsyncThunk(
  "post/getPost",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/post");
      return res.data.posts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getPostById = createAsyncThunk(
  "post/getPostById",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/post/${payload}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const addPost = createAsyncThunk(
  "post/addPost",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/post/add",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Add post success",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = "/postManagement";
      return res.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Add post fail",
        showConfirmButton: false,
        timer: 1500,
      });
      return rejectWithValue(error.response.data);
    }
  }
);
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/post/update/${payload.id}`,
        payload,{
          headers:{
            'Content-Type':'multipart/form-data',
          },
        }
      );
      window.location.href = "/postManagement";
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/post/delete/${payload}`
      );
      Swal.fire({
        icon: "success",
        title: "Delete post success",
        showConfirmButton: false,
        timer: 1500,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [getPost.pending]: (state) => {
      state.isLoading = true;
    },
    [getPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [getPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getPostById.pending]: (state) => {
      state.isLoading = true;
    },
    [getPostById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [getPostById.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addPost.pending]: (state) => {
      state.isLoading = true;
    },
    [addPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts.push(action.payload);
    },
    [addPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
      // update
      [updatePost.pending]: (state) => {
        state.isLoading = true;
      },
      [updatePost.fulfilled]: (state, action) => {
        state.isLoading = false;
          state.posts= action.payload;
      },
      [updatePost.rejected]: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
    [deletePost.pending]: (state) => {
      state.isLoading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action);
      const id = action.meta.arg;
      const index = state.posts.findIndex((post) => post._id === id);
      state.posts.splice(index, 1);
    },
    [deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;
