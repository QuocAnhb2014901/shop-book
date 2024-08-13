import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import API from "./api";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const initialState = {
  vaccinePlan: [],
  isLoading: false,
  error: null,
};

const token = Cookies.get("token");

export const getVaccinePlan = createAsyncThunk(
  "vaccinePlan/getVaccinePlan",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/v1/vaccinePlan");
      console.log(res.data.vaccinePlan);
      return res.data.vaccinePlan;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addVaccinePlan = createAsyncThunk(
  "vaccinePlan/addVaccinePlan",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/vaccinePlan/add",
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
        text: "Add vaccinePlan successfully",
      });
      window.location.href = "/Plan";
      return res.data.vaccinePlan;
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

export const updateVaccinePlan = createAsyncThunk(
  "vaccinePlan/updateVaccinePlan",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/vaccinePlan/update/${data.id}`,
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
        text: "Update vaccinePlan successfully",
      });
      window.location.href = "/Plan";
      return res.data.vaccinePlan;
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

export const deleteVaccinePlan = createAsyncThunk(
  "vaccinePlan/deleteVaccinePlan",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/vaccinePlan/delete/${id}`,
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
        text: "Delete vaccinePlan successfully",
      });
      return res.data.vaccinePlan;
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

const vaccinePlanSlice = createSlice({
  name: "vaccinePlan",
  initialState,
  reducers: {},
  extraReducers: {
    [getVaccinePlan.pending]: (state) => {
      state.isLoading = true;
    },
    [getVaccinePlan.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.vaccinePlan = action.payload;
    },
    [getVaccinePlan.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addVaccinePlan.pending]: (state) => {
      state.isLoading = true;
    },
    [addVaccinePlan.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.vaccinePlan.push(action.payload);
    },
    [addVaccinePlan.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateVaccinePlan.pending]: (state) => {
      state.isLoading = true;
    },
    [updateVaccinePlan.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action);
      console.log(current(state));
      const { date, vaccine_id, time, id } = action.meta.arg;
      for (let i = 0; i < state.vaccinePlan.length; i++) {
        if (state.vaccinePlan[i]._id === id) {
          state.vaccinePlan[i].date = date;
          state.vaccinePlan[i].vaccine_id._id = vaccine_id;
          state.vaccinePlan[i].time = time;
        }
      }
    },
    [updateVaccinePlan.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteVaccinePlan.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteVaccinePlan.fulfilled]: (state, action) => {
      state.isLoading = false;
      const newVaccinePlan = state.vaccinePlan.filter(
        (vaccinePlan) => vaccinePlan._id !== action.payload._id
      );
      state.vaccinePlan = newVaccinePlan;
    },
    [deleteVaccinePlan.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default vaccinePlanSlice.reducer;
