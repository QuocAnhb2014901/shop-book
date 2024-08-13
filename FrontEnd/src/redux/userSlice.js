import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import API from "./api";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import useSessionStorage from "../hooks/useSessionStorage";
const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

const token = Cookies.get("token");

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/getUsers", {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      return res.data.users;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateRoleUser = createAsyncThunk(
  "user/updateRoleUser",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const res = await axios.put(
        "http://localhost:3000/api/v1/users/updateRole",
        payload,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, data1 }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/updateUser/${id}`,
        data1,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "Success!",
        text: "Update user successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
      return response.data.user;
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Update user failed!",
        icon: "error",
        confirmButtonText: "OK",
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.get(`/api/v1/getUserById/${id}`);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // trạng thái chờ
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    // thành thái thành công
    [updateUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;

      sessionStorage.setItem("user", JSON.stringify(action.payload));
      // reload lại trang
      window.location.reload();
    },
    // trạng thái eror
    [updateUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getUserById.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [getUserById.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    [getUsers.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateRoleUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateRoleUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action);
      const { role, id } = action.meta.arg;
      const index = state.users.findIndex((item) => item._id === id);
      state.users[index].role = role;
    },
    [updateRoleUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
