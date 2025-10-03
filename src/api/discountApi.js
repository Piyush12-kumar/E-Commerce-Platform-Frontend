import axiosInstance from "./axiosInstance";

export const getAllDiscounts = () => axiosInstance.get('/discounts');
export const getDiscountById = (id) => axiosInstance.get(`/discounts/${id}`);
// This function may need to be updated based on your backend Discount model
export const getDiscountedPrice = (productId) => axiosInstance.get(`/discounts/${productId}`);
export const addDiscount = (discount) => axiosInstance.post('/discounts/add', discount);
export const updateDiscount = (id, discount) => axiosInstance.put(`/discounts/update/${id}`, discount);
export const deleteDiscount = (id) => axiosInstance.delete(`/discounts/delete/${id}`);