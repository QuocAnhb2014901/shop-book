import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "./api";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  category: [],
  isLoading: false,
  error: null,
};

const token = Cookies.get("token");

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/v1/category");
      console.log(res.data.category);
      return res.data.category;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/category/add",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Add category successfully",
      });
      window.location.href = "/category";
      return res.data.category;
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

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/category/update`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Update category successfully",
      });
      return res.data.category;
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

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/category/delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Delete category successfully",
      });
      return res.data.category;
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

const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: {
    [getCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.category = action.payload;
    },
    [getCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [addCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.category.push(action.payload);
    },
    [addCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { id, name, slug } = action.meta.arg.data;
      const index = state.category.findIndex((category) => category._id === id);
      state.category[index].name = name;
      state.category[index].slug = slug;
    },
    [updateCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.category = state.category.filter(
        (category) => category._id !== action.payload._id
      );
    },
    [deleteCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default categorySlice.reducer;
