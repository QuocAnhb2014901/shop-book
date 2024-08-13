import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import API from "./api";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  storage: [],
  isLoading: false,
  error: null,
};

export const getStorage = createAsyncThunk(
  "storage/getStorage",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/v1/getStorage");
      console.log(res.data);
      return res.data.storage;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const token = Cookies.get("token");
export const deleteStorage = createAsyncThunk(
  "storage/deleteStorage",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/deleteStorage/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Delete storage successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      return res.data.storage;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteStorageByvaccine_id = createAsyncThunk(
  "storage/deleteStorageByvaccine_id",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.delete(`/api/v1/deleteStorage/${id}`);
      console.log("xoa thanh cong");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStorageByvaccine_id = createAsyncThunk(
  "storage/updateStorageByvaccine_id",
  async (data, { rejectWithValue }) => {
    console.log(data)
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/updateStorage`,
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
        title: "Update storage successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      return res.data.storage;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {},
  extraReducers: {
    [getStorage.pending]: (state) => {
      state.isLoading = true;
    },
    [getStorage.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.storage = action.payload;
    },
    [getStorage.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteStorage.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteStorage.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.storage = state.storage.filter(
          (item) => item._id !== action.payload._id
        );
      }
    },
    [deleteStorage.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteStorageByvaccine_id.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteStorageByvaccine_id.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.storage = action.payload;
    },
    [deleteStorageByvaccine_id.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateStorageByvaccine_id.pending]: (state) => {
      state.isLoading = true;
    },
    [updateStorageByvaccine_id.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action);
      const { quantity_import, vaccine_id } = action.meta.arg;
      for (let i = 0; i < state.storage.length; i++) {
        if (state.storage[i].vaccine_id._id === vaccine_id) {
          state.storage[i].quantity_import = quantity_import;
        }
      }
    },
    [updateStorageByvaccine_id.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default storageSlice.reducer;
