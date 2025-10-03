// src/redux/slices/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder as createOrderApi, getUserOrders } from '../../api/orderApi';

export const createOrder = createAsyncThunk('orders/createOrder', async (_, { rejectWithValue }) => {
    try {
        const response = await createOrderApi();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchUserOrders = createAsyncThunk('orders/fetchUserOrders', async (_, { rejectWithValue }) => {
    try {
        const response = await getUserOrders();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        items: [],
        currentOrder: null,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchUserOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            // **FIXED**: Removed the duplicate .addCase for fetchUserOrders.rejected
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.items = []; // Also ensure items is an array on failure
            });
    }
});

export default orderSlice.reducer;