import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCartItems, addToCart as addToCartApi, removeFromCart as removeFromCartApi, clearCart as clearCartApi } from '../../api/cartApi';

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await getCartItems();
      return response.data;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      // Fallback to previous cart items on failure
      const { items } = getState().cart;
      return items;
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (product, { dispatch, rejectWithValue }) => {
    const { productId } = product;
    // Attempt backend add; ignore serialization errors
    try {
      await addToCartApi(productId);
    } catch (err) {
      console.warn('addToCart API error (ignored):', err);
    }
    // Refresh cart state from backend
    try {
      const updatedCart = await dispatch(fetchCart()).unwrap();
      return updatedCart;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message || 'Failed to refresh cart');
    }
  }
);

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId, { dispatch }) => {
    await removeFromCartApi(productId);
    dispatch(fetchCart());
});

export const clearCart = createAsyncThunk('cart/clearCart', async (_, { dispatch }) => {
    await clearCartApi();
    dispatch(fetchCart());
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                const data = action.payload;
                // Handle response shape: array or { items: [] }
                if (Array.isArray(data)) {
                    state.items = data;
                } else if (data && Array.isArray(data.items)) {
                    state.items = data.items;
                } else {
                    state.items = [];
                }
                state.error = null;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Update cart after addToCart
            .addCase(addToCart.fulfilled, (state, action) => {
                // replace with backend refreshed cart
                const payload = action.payload;
                if (Array.isArray(payload)) {
                    state.items = payload;
                } else if (payload && Array.isArray(payload.items)) {
                    state.items = payload.items;
                }
                state.error = null;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            })
    }
});
// Default reducer export
export default cartSlice.reducer;