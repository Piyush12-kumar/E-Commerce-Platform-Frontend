import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserOrders } from '../../redux/slices/orderSlice';
import Spinner from '../common/Spinner';

const OrderHistory = () => {
    const dispatch = useDispatch();
    const { items: orders, loading } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchUserOrders());
    }, [dispatch]);

    if (loading) return <Spinner />;

    return (
        <div className="order-history">
            <h3>Order History</h3>
            {orders.length === 0 ? <p>You have no past orders.</p> : (
                orders.map(order => (
                    <div key={order.orderId} className="order-card">
                        <h4>Order #{order.orderId} - {order.status}</h4>
                        <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                        <p>Total: ${order.totalAmount.toFixed(2)}</p>
                        <ul>
                            {order.orderItems.map(item => (
                                <li key={item.orderItemId}>{item.product.name} (x{item.quantity})</li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default OrderHistory;