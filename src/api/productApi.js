import axiosInstance from "./axiosInstance";

// Public
// Public products endpoint
export const getProducts = (params) => axiosInstance.get('/products/allProducts', { params });
export const getProductById = (id) => axiosInstance.get(`/products/get/${id}`);
export const getFeaturedProducts = () => axiosInstance.get('/products/featured');
export const getProductsByCategory = (categoryName) => axiosInstance.get('/products/category', { params: { categoryName } });
export const searchProducts = (keyword) => axiosInstance.get('/products/search', { params: { keyword } });

// Admin
export const addProduct = (product) => axiosInstance.post('/products/add', product);
export const updateProduct = (id, product) => axiosInstance.put(`/products/update/${id}`, product);
export const updateStock = (id, stock) => axiosInstance.put(`/products/update/${id}/stock`, null, { params: { stock } });
export const updateFeaturedStatus = (id, featured) => axiosInstance.patch(`/products/update/${id}/featured`, null, { params: { featured } });
export const updateActiveStatus = (id, active) => axiosInstance.patch(`/products/${id}/active`, null, { params: { active } });
export const deleteProduct = (id) => axiosInstance.delete(`/products/delete/${id}`);