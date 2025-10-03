import axiosInstance from "./axiosInstance";

export const addReview = (review) => axiosInstance.post('/reviews/add', review);
export const updateReview = (reviewId, reviewDto) => axiosInstance.put(`/reviews/update/${reviewId}`, reviewDto);
export const deleteReview = (reviewId) => axiosInstance.delete(`/reviews/delete/${reviewId}`);
export const getReviewsByProduct = (productId) => axiosInstance.get(`/reviews/product/${productId}`);