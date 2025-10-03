import axiosInstance from "./axiosInstance";

export const processPayment = (payment) => axiosInstance.post('/payment/process', payment);
export const getPaymentById = (paymentId) => axiosInstance.get(`/payment/${paymentId}`);
export const refundPayment = (paymentId) => axiosInstance.post(`/payment/refund/${paymentId}`);