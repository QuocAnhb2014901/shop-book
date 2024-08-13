import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "./api";

const initialState = {
  registerVaccine: [],
  isLoading: false,
  error: null,
};

export const getRegisterVaccine = createAsyncThunk(
  "registerVaccine/getRegisterVaccine",
  async ({ rejectWithValue }) => {
    try {
      const res = await API.get("/api/v1/getVaccination");
      return res.data.registerVaccination;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStatusRegisterVaccine = createAsyncThunk(
  "registerVaccine/updateStatusVaccine",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/api/v1/updateVaccination/${id}`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const registerVaccineSlice = createSlice({
  name: "registerVaccine",
  initialState,
  reducers: {
    registerVaccineStart: (state) => {
      state.isLoading = true;
    },
    registerVaccineSuccess: (state, action) => {
      state.isLoading = false;
      state.registerVaccine = action.payload;
    },
    registerVaccineFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateStatusRegisterVaccine.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateStatusRegisterVaccine.fulfilled, (state, action) => {
      state.isLoading = false;
      state.registerVaccine = action.payload;
    });
    builder.addCase(updateStatusRegisterVaccine.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getRegisterVaccine.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRegisterVaccine.fulfilled, (state, action) => {
      state.isLoading = false;
      state.registerVaccine = action.payload;
    });
    builder.addCase(getRegisterVaccine.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const {
  registerVaccineStart,
  registerVaccineSuccess,
  registerVaccineFailure,
} = registerVaccineSlice.actions;

export default registerVaccineSlice.reducer;
