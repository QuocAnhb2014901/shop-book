import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";
// import Cookies from "js-cookie";

const initialState = {
  categoryPost: [],
  isLoading: false,
  error: null,
};

export const getCategoryPost = createAsyncThunk(
  "categoryPost/getCategoryPost",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/category-post");
      return res.data.categoryPost;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCategoryPost = createAsyncThunk(
  "categoryPost/addCategoryPost",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/category-post/add",
        payload
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Add category successfully",
      });
      return res.data.categoryPost;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategoryPost = createAsyncThunk(
  "categoryPost/deleteCategoryPost",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/category-post/delete/${payload}`
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Delete category successfully",
      });
      return res.data.categoryPost;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategoryPost = createAsyncThunk(
  "categoryPost/updateCategoryPost",
  async ({ data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/category-post/update`,
        data
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Update category successfully",
      });
      return res.data.categoryPost;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

const categoryPostSlice = createSlice({
  name: "categoryPost",
  initialState,
  reducers: {},
  extraReducers: {
    [getCategoryPost.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategoryPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categoryPost = action.payload;
    },
    [getCategoryPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addCategoryPost.pending]: (state) => {
      state.isLoading = true;
    },
    [addCategoryPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categoryPost.push(action.payload);
    },
    [addCategoryPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteCategoryPost.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteCategoryPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categoryPost = state.categoryPost.filter(
        (item) => item._id !== action.payload._id
      );
    },
    [deleteCategoryPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateCategoryPost.pending]: (state) => {
      state.isLoading = true;
    },
    [updateCategoryPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action);
      const { id, name, slug } = action.meta.arg.data;
      const index = state.categoryPost.findIndex(
        (categoryPost) => categoryPost._id === id
      );
      state.categoryPost[index].name = name;
      state.categoryPost[index].slug = slug;
    },
    [updateCategoryPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default categoryPostSlice.reducer;
