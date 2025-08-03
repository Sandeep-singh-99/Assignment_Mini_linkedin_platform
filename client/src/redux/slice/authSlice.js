import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

export const SignUp = createAsyncThunk(`auth/register`, async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


export const SignIn = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


export const SignOut = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/logout`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/check-auth`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,

    extraReducers: (builder) => {
        builder.addCase(SignUp.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(SignUp.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(SignUp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(SignIn.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(SignIn.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(SignIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(SignOut.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(SignOut.fulfilled, (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        })
        .addCase(SignOut.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(checkAuth.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        })
        .addCase(checkAuth.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export default authSlice.reducer;