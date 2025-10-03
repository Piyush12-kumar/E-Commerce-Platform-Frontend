import axiosInstance from './axiosInstance';

export const getCartItems = async () => {
  // Fetch raw cart with deep nesting
  const response = await axiosInstance.get('/cart/items');
  const rawItems = response.data?.items || [];
  // Flatten items to avoid deep nested JSON
  const items = rawItems.map(item => ({
    id: item.id,
    quantity: item.quantity,
    product: {
      productId: item.product?.productId,
      name: item.product?.name,
      price: item.product?.price,
      imageURL: item.product?.imageURL || item.product?.imageurl || '',
    }
  }));
  return { data: items };
};
// Add product to cart via query param, as backend expects
// Add product to cart via query parameter (backend expects ?productId=)
export const addToCart = (productId) =>
  axiosInstance.post('/cart/add', null, { params: { productId } });
export const removeFromCart = (productId) => axiosInstance.delete(`/cart/remove/${productId}`);
export const clearCart = () => axiosInstance.delete('/cart/clear');