import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userInstance } from "../instances";
import { toast } from 'react-toastify'

const auth_token = localStorage.getItem('auth_token');

if (auth_token) {
  userInstance.defaults.headers.common['x-auth-token'] = auth_token;
}

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userInstance.post("/auth", data, {
        "Content-Type": "application/json"
      });
      toast.success(response.data?.message, { theme: 'colored', style: { padding: '3%' } })
      console.log("data from redux", response.data)
      return response.data;
    } catch (error) {
      console.log("error from redux", error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("password", data.password);
      formData.append("photo", data.photo);

      const response = await userInstance.post("/auth/new", formData, {
        "Content-Type": "multipart/form-data"
      });
      toast.success(response.data?.message, { theme: 'colored', style: { padding: '3%' } })
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
      console.log("response", response.data)
      return response.data;
    } catch (error) {
      console.log("error", error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);


const initialState = {
  isLoading: null,
  token: localStorage.getItem("auth_token"),
  isAuthenticated: false,
  error: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("auth_token");
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
        localStorage.setItem("auth_token", payload?.token);
        state.isLoading = false;
        state.error = null;
        state.isAuthenticated = true;
        state.user = null;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        localStorage.removeItem("auth_token");
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
        localStorage.setItem("auth_token", payload?.token);
        state.isLoading = false;
        state.error = null;
        state.isAuthenticated = true;
        state.user = null;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        localStorage.removeItem("auth_token");
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
        //localStorage.removeItem("auth_token");
        state.isLoading = false;
        state.error = payload;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addDefaultCase((state) => {
        state.isLoading = null;
        state.token = localStorage.getItem("auth_token");
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
