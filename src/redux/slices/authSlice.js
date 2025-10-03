// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginApi, register as registerApi, getProfile, updateUser } from '../../api/authApi';
import { jwtDecode } from 'jwt-decode';

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
    try {
        const response = await registerApi(userData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// **IMPROVED**: Login now automatically fetches the user profile afterward.
export const login = createAsyncThunk('auth/login', async (credentials, { dispatch, rejectWithValue }) => {
  try {
    console.log('Attempting login for user:', credentials.username);
    const response = await loginApi(credentials);
    console.log('Login API response:', response);
    const { data: token } = response;
    console.log('Received token:', token);
    localStorage.setItem('token', token);
    
    console.log('Fetching profile...');
    // Fetch profile (non-blocking); ignore errors here
    dispatch(fetchProfile());
    console.log('Login process completed successfully');
    return token;
  } catch (error) {
    console.error('Login failed:', error);
    console.error('Error response:', error.response);
    return rejectWithValue(error.response?.data || error.message || 'Login Failed');
  }
});

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (_, { rejectWithValue }) => {
    try {
        console.log('Fetching user profile...');
        const response = await getProfile();
        console.log('Profile response:', response);
        return response.data;
    } catch (error) {
        console.error('Profile fetch failed:', error);
        console.error('Profile error response:', error.response);
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (userData, { rejectWithValue }) => {
    try {
        console.log('Updating profile with data:', userData);
        const response = await updateUser(userData);
        console.log('Update profile response:', response);
        return response.data;
    } catch (error) {
        console.error('Update profile failed:', error);
        console.error('Update profile error response:', error.response);
        return rejectWithValue(error.response?.data || error.message);
    }
});

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAdmin: false,
  loading: true, // Start in loading state for the initial check
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.isAdmin = false;
    },
    checkAuth: (state) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 > Date.now()) {
                    state.token = token;
                    const roles = decoded.roles || [];
                    state.isAdmin = Array.isArray(roles) ? roles.includes('ADMIN') : false;
                } else {
                    // Token has expired
                    state.token = null;
                    localStorage.removeItem('token');
                }
            } catch (e) {
                // Invalid token
                state.token = null;
                localStorage.removeItem('token');
            }
        }
        state.loading = false; // Signal that the initial check is complete
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        // Handle roles array properly
        const roles = action.payload.roles || [];
        state.isAdmin = Array.isArray(roles) ? roles.includes('ADMIN') : false;
      })
      .addCase(fetchProfile.rejected, (state) => {
        // If fetching profile fails, it means the token is bad, so log out.
        state.user = null;
        state.token = null;
        state.isAdmin = false;
        localStorage.removeItem('token');
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        // Don't set auth error for profile update failures
        // The component will handle the error from the rejected action
      });
  },
});

export const { logout, checkAuth } = authSlice.actions;

export default authSlice.reducer;