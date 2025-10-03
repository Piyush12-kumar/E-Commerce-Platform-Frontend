import axiosInstance from "./axiosInstance";

export const createOrder = () => axiosInstance.post('/orders/create');
export const getAllOrders = () => axiosInstance.get('/orders/getAll');
export const getOrderById = (orderId) => axiosInstance.get(`/orders/${orderId}`);
export const cancelOrder = (orderId) => axiosInstance.put(`/orders/${orderId}/cancel`);
// User-specific order endpoints
export const getUserOrders = () => axiosInstance.get('/users/orders');
export const getUserOrderDetails = (orderId) => axiosInstance.get(`/users/orders/${orderId}`);