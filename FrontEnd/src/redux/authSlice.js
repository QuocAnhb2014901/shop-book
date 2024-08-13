import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
const initialState = {
  currentUser: JSON.parse(sessionStorage.getItem("user")) || null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  "user/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/signin",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.isLoading = true;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logOut: (state) => {
      state.currentUser = null;
      Cookies.remove("token");
      sessionStorage.removeItem("user");
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload.others;
      Cookies.set("token", action.payload.token);
      sessionStorage.setItem("user", JSON.stringify(action.payload.others));
      if (action.payload.others.role === "admin" || action.payload.others.role === "nhanvien"  ) {
        window.location.href = "/dashBoard";
      } else {
        window.location.href = "/";
      }
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logOut,
} = authSlice.actions;

export default authSlice.reducer;
