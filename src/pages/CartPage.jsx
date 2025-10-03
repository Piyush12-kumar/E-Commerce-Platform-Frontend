// src/pages/CartPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCart, removeFromCart, clearCart } from '../redux/slices/cartSlice'; // **FIXED**: Import clearCart
import { createOrder } from '../redux/slices/orderSlice';
import { processPayment } from '../api/paymentApi';
import Spinner from '../components/common/Spinner';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: cartItems, loading: cartLoading, error: cartError } = useSelector((state) => state.cart);
    const { loading: orderLoading } = useSelector((state) => state.orders);
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    // Ensure cartItems is an array to avoid reduce errors
    const safeCartItems = Array.isArray(cartItems) ? cartItems : [];
    const total = safeCartItems.reduce((sum, item) => sum + (item.product?.price || 0) * (item.quantity || 0), 0);

    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        try {
            await processPayment({
                amount: total,
                paymentMethod: paymentMethod,
            });
            alert("Payment successful!");

            // **FIXED**: Create Order and then Clear Cart only on success.
            dispatch(createOrder()).unwrap()
                .then(() => {
                    alert('Order placed successfully!');
                    dispatch(clearCart());
                    navigate('/profile');
                })
                .catch((orderError) => {
                    alert(`Order failed after payment: ${orderError.message || 'Unknown error'}`);
                });

        } catch (paymentError) {
            alert("Payment failed. Please try again.");
        }
    };

    if (cartLoading) return <Spinner />;
    if (cartError) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>Error loading cart: {cartError}</p>
                <button className="btn" onClick={() => dispatch(fetchCart())}>Retry</button>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <span>{item.product.name} ({item.quantity} x ${item.product.price})</span>
                            <button className="btn-danger" onClick={() => dispatch(removeFromCart(item.product.productId))}>Remove</button>
                        </div>
                    ))}
                    <hr />
                    <div className="cart-total">
                        <h3>Total: ${total.toFixed(2)}</h3>
                        <div className="payment-method">
                            <label>Payment Method: </label>
                            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                <option>Credit Card</option>
                                <option>PayPal</option>
                                <option>Bank Transfer</option>
                            </select>
                        </div>
                        <button className="btn btn-primary" onClick={handleCheckout} disabled={orderLoading}>
                            {orderLoading ? 'Placing Order...' : 'Pay and Checkout'}
                        </button>
                        <button className="btn" onClick={() => dispatch(clearCart())}>Clear Cart</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;