import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/v1";

export const createFeed = createAsyncThunk(
  "feed/createFeed",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/feed/create-feed`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllFeeds = createAsyncThunk(
  "feed/getAllFeeds",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/feed/get-all-feeds`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "feed/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/feed/user-profile`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserProfileById = createAsyncThunk(
  "feed/getUserProfileById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/feed/user-profile/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  
  extraReducers: (builder) => {
    builder.addCase(createFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(createFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
    })
    .addCase(createFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });
    builder.addCase(getAllFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(getAllFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
    })
    .addCase(getAllFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });
    builder.addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
    })
    .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    });
    builder.addCase(getUserProfileById.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(getUserProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
    })
    .addCase(getUserProfileById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }); 
  }
});

export default feedSlice.reducer;
