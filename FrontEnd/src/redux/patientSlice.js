import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "./api";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const initialState = {
  patient: [],
  isLoading: false,
  error: null,
};

export const getPatient = createAsyncThunk(
  "patient/getPatient",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/v1/getPatient");
      return res.data.patientVaccination;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPatientById = createAsyncThunk(
  "patient/getPatientById",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await API.get(`/api/v1/getPatientById/${payload}`);
      return res.data.patientVaccination;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const token = Cookies.get("token");
export const addPatient = createAsyncThunk(
  "patient/addPatient",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/addPatient",
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
        text: "Add Patient Success",
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePatient = createAsyncThunk(
  "patient/updatePatient",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/updatePatient/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        }
      );
      window.location.href = "/information  ";
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePatientStatus = createAsyncThunk(
  "patient/updatePatientStatus",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/update/status/${id}`,
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
        text: "Update Patient Status Success",
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPatientStatus = createAsyncThunk(
  "patient/getPatientStatus",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/v1/getPatientStatus");
      console.log(res.data.patientVaccination);
      return res.data.patientVaccination;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePatient = createAsyncThunk(
  "patient/deletePatient",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await API.delete(`/api/v1/deletePatient/${payload}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatient: (state, action) => {
      state.patient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPatient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPatient.fulfilled, (state, action) => {
      state.isLoading = false;
      state.patient = action.payload;
    });
    builder.addCase(getPatient.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getPatientById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPatientById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.patient = action.payload;
    });
    builder.addCase(getPatientById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(addPatient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addPatient.fulfilled, (state, action) => {
      state.isLoading = false;
      if (state.patient.length >= 0) {
        state.patient.push(action.payload.patientVaccination);
      }
    });
    builder.addCase(addPatient.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updatePatient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePatient.fulfilled, (state, action) => {
      state.isLoading = false;
      state.patient = action.payload;
    });
    builder.addCase(updatePatient.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(updatePatientStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePatientStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      const { id } = action.meta.arg;
      const { status } = action.meta.arg.data;
      state.patient = state.patient.map((patient) => {
        if (patient._id === id) {
          patient.status = status;
        }
        return patient;
      });
    });
    builder.addCase(updatePatientStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getPatientStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPatientStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.patient = action.payload;
    });
    builder.addCase(getPatientStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(deletePatient.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePatient.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload.patientVaccination._id);
      if (state.patient.length > 0) {
        state.patient = state.patient.filter(
          (patient) => patient._id !== action.payload.patientVaccination._id
        );
      }
    });
    builder.addCase(deletePatient.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { setPatient } = patientSlice.actions;

export default patientSlice.reducer;
