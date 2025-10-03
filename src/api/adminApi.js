import axiosInstance from "./axiosInstance";

export const getAdminProfile = () => axiosInstance.get('/admin/profile');
export const updateUserByAdmin = (user) => axiosInstance.put('/admin/update', user);
export const deactivateUser = (userId) => axiosInstance.put(`/admin/users/${userId}/deactivate`);
export const getAllUsers = () => axiosInstance.get('/admin/users');
export const getUserById = (id) => axiosInstance.get(`/admin/users/${id}`);
export const updateUserStatus = (id, status) => axiosInstance.put(`/admin/users/${id}/status`, { active: status });
export const deleteUserByAdmin = (id) => axiosInstance.delete(`/admin/users/${id}`);