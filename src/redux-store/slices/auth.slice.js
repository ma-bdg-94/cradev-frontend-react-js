import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userInstance } from "../instances";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userInstance.post("/auth", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userInstance.post("/auth/new", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/current",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userInstance.get("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const initialState = {
  isLoading: null,
  token: localStorage.getItem("jw-token"),
  isAuthenticated: false,
  error: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("jw-token");
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        localStorage.setItem("jw-token", payload);
        state.isLoading = false;
        state.error = null;
        state.isAuthenticated = true;
        state.user = null;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        localStorage.removeItem("jw-token");
        state.isLoading = false;
        state.error = payload;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        localStorage.setItem("jw-token", payload);
        state.isLoading = false;
        state.error = null;
        state.isAuthenticated = true;
        state.user = null;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        localStorage.removeItem("jw-token");
        state.isLoading = false;
        state.error = payload;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loadUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.isAuthenticated = true;
        state.user = payload;
      })
      .addCase(loadUser.rejected, (state, { payload }) => {
        localStorage.removeItem("jw-token");
        state.isLoading = false;
        state.error = payload;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addDefaultCase((state) => {
        state.isLoading = null;
        state.token = localStorage.getItem("jw-token");
        state.isAuthenticated = false;
        state.error = null;
        state.user = null;
      });
  },
});

export const {
  logoutUser
} = authSlice.actions;

export default authSlice.reducer;
