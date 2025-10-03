import axiosInstance from "./axiosInstance";

export const getAllCategories = () => axiosInstance.get('/categories/getAll');
export const addCategory = (category) => axiosInstance.post('/categories/add', category);
export const updateCategory = (id, category) => axiosInstance.put(`/categories/update/${id}`, category);
export const deleteCategory = (id) => axiosInstance.delete(`/categories/delete/${id}`);