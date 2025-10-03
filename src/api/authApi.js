import axiosInstance from "./axiosInstance";

export const register = (userData) => axiosInstance.post('/users/register', userData);
export const login = (credentials) => axiosInstance.post('/users/login', credentials);
export const getProfile = () => axiosInstance.get('/users/profile');
export const updateUser = (userData) => axiosInstance.put('/users/update', userData);
export const deactivateOwnAccount = () => axiosInstance.put('/users/deactivate');
export const changePassword = (passwords) => axiosInstance.put('/users/change-password', passwords);
export const promoteToAdmin = (secretToken) => axiosInstance.put('/users/promote-to-admin', { secretToken });
// Address Endpoints
export const getUserAddresses = () => axiosInstance.get('/users/addresses');
export const addAddress = (address) => axiosInstance.post('/users/addresses/add', address);
export const deleteAddress = (addressId) => axiosInstance.delete(`/users/addresses/delete/${addressId}`);