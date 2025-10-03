import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserOrders } from '../redux/slices/orderSlice';
import { fetchProfile, updateProfile } from '../redux/slices/authSlice';
import Spinner from '../components/common/Spinner';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { user, loading: authLoading, error: authError } = useSelector((state) => state.auth);
    const { items: orders, loading: orderLoading, error: orderError } = useSelector((state) => state.orders);
    
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNumber: ''
    });

    useEffect(() => {
        // Fetch the user's profile and orders when the page loads
        dispatch(fetchProfile());
        dispatch(fetchUserOrders());
    }, [dispatch]);

    useEffect(() => {
        // Update form data when user data is loaded
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || ''
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateProfile = async () => {
        // First check if we have a valid token
        const token = localStorage.getItem('token');
        if (!token) {
            alert('No authentication token found. Please log in again.');
            return;
        }

        try {
            // Try a simplified approach - only send the fields that can be updated
            const updateData = {
                username: formData.username,
                email: formData.email,
                phoneNumber: formData.phoneNumber
            };
            
            console.log('Sending simplified update data:', updateData);
            console.log('Current token exists:', !!token);
            console.log('Token preview:', token.substring(0, 20) + '...');
            
            // Test: Try to fetch profile first to verify auth is working
            console.log('Testing auth with profile fetch...');
            await dispatch(fetchProfile()).unwrap();
            console.log('Profile fetch successful, proceeding with update...');
            
            await dispatch(updateProfile(updateData)).unwrap();
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Update profile error:', error);
            let errorMessage = 'Failed to update profile';
            
            if (typeof error === 'string' && error.includes('403')) {
                errorMessage = 'Access denied. Your session may have expired. Please log out and log back in.';
            } else if (typeof error === 'string' && error.includes('401')) {
                errorMessage = 'Session expired. Please log out and log back in.';
            } else if (error.message && error.message.includes('403')) {
                errorMessage = 'Access denied. Your session may have expired. Please log out and log back in.';
            } else if (error.message && error.message.includes('401')) {
                errorMessage = 'Session expired. Please log out and log back in.';
            } else if (typeof error === 'string') {
                errorMessage = error;
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            alert(errorMessage);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Reset form data to original user data
        setFormData({
            username: user.username || '',
            email: user.email || '',
            phoneNumber: user.phoneNumber || ''
        });
    };

    useEffect(() => {
        // Fetch the user's profile and orders when the page loads
        dispatch(fetchProfile());
        dispatch(fetchUserOrders());
    }, [dispatch]);

    // This handles all loading states
    if (authLoading || orderLoading) {
        return <Spinner />;
    }

    // This handles any errors during fetching
    if (authError || orderError) {
        console.log('ProfilePage errors:', { authError, orderError });
        return (
            <div className="profile-page">
                <h1>My Profile</h1>
                <div style={{ color: 'red', padding: '1rem', background: '#fee', borderRadius: '4px' }}>
                    <p>Error loading profile:</p>
                    {authError && <p>Auth Error: {JSON.stringify(authError)}</p>}
                    {orderError && <p>Order Error: {JSON.stringify(orderError)}</p>}
                    <button onClick={() => {
                        dispatch(fetchProfile());
                        dispatch(fetchUserOrders());
                    }}>
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <h1>My Profile</h1>
            
            {user ? (
                <div className="user-info">
                    {!isEditing ? (
                        <div>
                            <p><strong>Username:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone Number:</strong> {user.phoneNumber || 'Not provided'}</p>
                            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                                Edit Profile
                            </button>
                        </div>
                    ) : (
                        <div className="edit-profile-form">
                            <div className="form-group">
                                <label><strong>Username:</strong></label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label><strong>Email:</strong></label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label><strong>Phone Number:</strong></label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="Enter phone number"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-buttons">
                                <button className="btn btn-success" onClick={handleUpdateProfile}>
                                    Save Changes
                                </button>
                                <button className="btn btn-secondary" onClick={handleCancelEdit}>
                                    Cancel
                                </button>
                                <button className="btn btn-info" onClick={async () => {
                                    console.log('Current user:', user);
                                    console.log('Form data:', formData);
                                    console.log('Token:', localStorage.getItem('token'));
                                    
                                    // Test if we can fetch profile (this should work if auth is good)
                                    try {
                                        console.log('Testing profile fetch...');
                                        await dispatch(fetchProfile()).unwrap();
                                        console.log('✅ Profile fetch successful - auth is working');
                                        alert('Auth test passed! Check console for details.');
                                    } catch (error) {
                                        console.error('❌ Profile fetch failed:', error);
                                        alert('Auth test failed! Check console for details.');
                                    }
                                }}>
                                    Test Auth
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div style={{ padding: '1rem', background: '#fff3cd', borderRadius: '4px' }}>
                    <p>No user information available. Please try logging in again.</p>
                    <button onClick={() => dispatch(fetchProfile())}>
                        Fetch Profile
                    </button>
                </div>
            )}
            <hr />
            <h2>My Orders</h2>
            <div className="order-history">
                {/* This now safely checks if orders exist and has a clear message */}
                {Array.isArray(orders) && orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order.orderId} className="order-card">
                            <h3>Order #{order.orderNumber || order.orderId}</h3>
                            <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                            <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                        </div>
                    ))
                ) : (
                    <p>You have no orders.</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;