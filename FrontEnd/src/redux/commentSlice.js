import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  comment: [],
  isLoading: false,
  error: null,
};

const token = Cookies.get("token");

export const addComment = createAsyncThunk(
  "comment/addComment",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/comment/addComment",
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
        text: "Thêm bình luận thành công",
      });
      return res.data.comment;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng đăng nhập để bình luận",
        confirmButtonText: ` <a href="/login">Đăng Nhập</a> `,
      });
      return rejectWithValue(error.response.data);
    }
  }
);

export const getComment = createAsyncThunk(
  "comment/getComment",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/comment/getComment",
        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        }
      );
      return res.data.comment;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCommentByVaccineId = createAsyncThunk(
  "comment/getCommentByVaccineId",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/comment/getCommentByVaccineId/${payload}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.comment);
      return res.data.comment;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteCommentByAuthor = createAsyncThunk(
  "comment/deleteCommentByAuthor",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        "http://localhost:3000/api/v1/comment/deleteCommentByAuthor/" + payload
      );
      Swal.fire({
        icon: "success",
        text: "Xóa bình luận thành công",
      });
      return res.data.comment._id;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
      });
      return rejectWithValue(error.response.data);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    [addComment.pending]: (state) => {
      state.isLoading = true;
    },
    [addComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.comment.push(action.payload);
      }
    },
    [addComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getComment.pending]: (state) => {
      state.isLoading = true;
    },
    [getComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = action.payload;
    },
    [getComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getCommentByVaccineId.pending]: (state) => {
      state.isLoading = true;
    },
    [getCommentByVaccineId.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = action.payload;
    },
    [getCommentByVaccineId.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteCommentByAuthor.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteCommentByAuthor.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = state.comment.filter(
        (comment) => comment._id !== action.payload
      );
    },
    [deleteCommentByAuthor.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default commentSlice.reducer;
