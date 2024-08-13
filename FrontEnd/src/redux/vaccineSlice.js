import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import API from "./api";
import Swal from "sweetalert2";

const initialState = {
  vaccine: [],
  isLoading: false,
  error: null,
};

export const getVaccine = createAsyncThunk(
  "vaccine/getVaccine",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/v1/getVaccine");
      return res.data.vaccine;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addVaccine = createAsyncThunk(
  "vaccine/addVaccine",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await API.post("/api/v1/addVaccine", payload);
      console.log(res.data);
      Swal.fire({
        icon: "success",
        title: "Add vaccine successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = "/VaccineManagement";
      return res.data;
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

export const getVaccineById = createAsyncThunk(
  "vaccine/getVaccineById",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await API.get(`/api/v1/getVaccineById/${payload}`);
      console.log(res.data);
      return res.data.vaccine;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateVaccine = createAsyncThunk(
  "vaccine/updateVaccine",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.put(`/api/v1/updateVaccine/${data.id}`, data);
      Swal.fire({
        icon: "success",
        title: "Update vaccine successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      window.location.href = "/VaccineManagement";
      return res.data.vaccine;
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

export const deleteVaccine = createAsyncThunk(
  "vaccine/deleteVaccine",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await API.delete(`/api/v1/deleteVaccine/${payload}`);
      console.log(res.data);
      Swal.fire({
        icon: "success",
        title: "Delete vaccine successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      return res.data;
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

const vaccineSlice = createSlice({
  name: "vaccine",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVaccine.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getVaccine.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vaccine = action.payload;
    });
    builder.addCase(getVaccine.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(addVaccine.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addVaccine.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vaccine.push(action.payload.vaccine);
    });
    builder.addCase(addVaccine.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteVaccine.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteVaccine.fulfilled, (state, action) => {
      state.isLoading = false;
      // console.log(current(state));

      const index = state.vaccine.findIndex(
        (vaccine) => vaccine._id === action.payload.vaccine._id
      );
      console.log(index);
      state.vaccine.splice(index, 1);
    });
    builder.addCase(deleteVaccine.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getVaccineById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getVaccineById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vaccine = action.payload;
    });
    builder.addCase(getVaccineById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updateVaccine.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateVaccine.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action);
      const { id, description, dosage, image, maxAge, minAge, name, origin } =
        action.meta.arg;
      for (let i = 0; i < state.vaccine.length; i++) {
        if (state.vaccine[i]._id === id) {
          state.vaccine[i].description = description;
          state.vaccine[i].dosage = dosage;
          state.vaccine[i].image = image;
          state.vaccine[i].maxAge = maxAge;
          state.vaccine[i].minAge = minAge;
          state.vaccine[i].name = name;
          state.vaccine[i].origin = origin;
        }
      }
    });
    builder.addCase(updateVaccine.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const {
  addVaccineStart,
  addVaccineSuccess,
  addVaccineFailure,
  deleteVaccineStart,
  deleteVaccineSuccess,
  deleteVaccineFailure,
  updateVaccineStart,
  UpdateVaccineSuccess,
  updateVaccineFailure,
} = vaccineSlice.actions;

export default vaccineSlice.reducer;
