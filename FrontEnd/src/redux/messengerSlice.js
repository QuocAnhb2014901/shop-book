import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
};

export const getMessenger = createAsyncThunk(
  "messenger/getMessenger",
  async (payload, { rejectWithValue }) => {
    console.log(payload);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/messenger?senderId=${payload}`
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addMessenger = createAsyncThunk(
  "messenger/addMessenger",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/messenger/add",
        payload
      );
      return res.data.messenger;
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

const messengerSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {},
  extraReducers: {
    [getMessenger.pending]: (state) => {
      state.isLoading = true;
    },
    [getMessenger.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.messages = action.payload;
    },
    [getMessenger.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addMessenger.pending]: (state) => {
      state.isLoading = true;
    },
    [addMessenger.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { content, user_id } = action.meta.arg;
      state.messages.push({ content, user_id });
    },
    [addMessenger.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default messengerSlice.reducer;
