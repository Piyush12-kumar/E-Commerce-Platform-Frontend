import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, getProductById as getProductByIdApi, getFeaturedProducts } from '../../api/productApi';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (params, { rejectWithValue }) => {
    try {
        const response = await getProducts(params);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return rejectWithValue(error.response?.data || error.message || 'Failed to fetch products');
    }
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id, { rejectWithValue }) => {
    try {
        const response = await getProductByIdApi(id);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchFeaturedProducts = createAsyncThunk('products/fetchFeatured', async (_, { rejectWithValue }) => {
    try {
        const response = await getFeaturedProducts();
        return response.data;
    } catch (error) {
        console.error('Error fetching featured products:', error);
        return rejectWithValue(error.response?.data || error.message || 'Failed to fetch featured products');
    }
});


const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        featuredItems: [],
        currentItem: null,
        loading: false,
        featuredLoading: false,
        error: null,
        featuredError: null,
        totalPages: 0,
        totalItems: 0,
        currentPage: 0
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                console.log('Products action payload:', action.payload);
                
                // Handle different response structures
                if (action.payload.products) {
                    // Response has products array wrapped in an object
                    state.items = action.payload.products || [];
                    state.totalPages = action.payload.totalPages || 0;
                    state.totalItems = action.payload.totalItems || 0;
                    state.currentPage = action.payload.currentPage || 0;
                } else if (Array.isArray(action.payload)) {
                    // Response is directly an array of products
                    state.items = action.payload;
                    state.totalPages = 1;
                    state.totalItems = action.payload.length;
                    state.currentPage = 0;
                } else {
                    // Fallback
                    state.items = [];
                    console.warn('Unexpected API response structure:', action.payload);
                }
                
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentItem = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchFeaturedProducts.pending, (state) => {
                state.featuredLoading = true;
                state.featuredError = null;
            })
            .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
                state.featuredLoading = false;
                console.log('Featured products action payload:', action.payload);
                
                // Handle different response structures for featured products
                if (action.payload.products) {
                    state.featuredItems = action.payload.products || [];
                } else if (Array.isArray(action.payload)) {
                    state.featuredItems = action.payload;
                } else {
                    state.featuredItems = [];
                    console.warn('Unexpected featured products API response structure:', action.payload);
                }
                
                state.featuredError = null;
            })
            .addCase(fetchFeaturedProducts.rejected, (state, action) => {
                state.featuredLoading = false;
                state.featuredError = action.payload;
            })
    }
});

export default productSlice.reducer;