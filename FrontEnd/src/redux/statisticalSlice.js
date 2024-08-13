import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  statistical: [],
  isLoading: false,
  error: null,
};

export const fetchStatistical = createAsyncThunk(
  "/statistical/fetchStatistical",
  async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/statistical"
    );
    return response.data;
  }
);

const statisticalSlice = createSlice({
  name: "statistical",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchStatistical.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchStatistical.fulfilled]: (state, action) => {
      state.statistical = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchStatistical.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export default statisticalSlice.reducer;
