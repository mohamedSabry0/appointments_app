import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authServices from './authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authServices.register(user);
  } catch (error) {
    const message = (error.response
        && error.response.data
        && error.response.data.message)
      || error.message
      || error.toString();
    return thunkAPI.rejectWithValue({ message });
  }
});

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authServices.login(user);
  } catch (error) {
    const message = (error.response
        && error.response.data
        && error.response.data.message)
      || error.message
      || error.toString();
    return thunkAPI.rejectWithValue({ message });
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  const localuser = JSON.parse(localStorage.getItem('user'));
  const token = localuser && localuser.Authorization;

  try {
    const response = await axios.delete('http://localhost:4000/users/sign_out', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      localStorage.removeItem('user');
    }
    return null;
  } catch (error) {
    throw new Error(error.response.data.status.message || 'Logout failed');
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => ({
      ...state,
      user: null,
      isError: false,
      isSuccess: false,
      isLoading: false,
      message: '',
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(register.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        user: action.payload,
        message: 'Registration successful',
      }))
      .addCase(register.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
        user: null,
      }))
      .addCase(login.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(login.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        user: action.payload,
        message: 'Login successful',
      }))
      .addCase(login.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
        user: null,
      }))
      .addCase(logout.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(logout.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      }))
      .addCase(logout.fulfilled, (state) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        user: null,
        message: 'Logout successful',
      }));
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
