import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile, updateUser } from '../../api/authApi';
import { setUser } from '../../redux/slices/authSlice';
import AddressManagement from './AddressManagement';
import ChangePassword from './ChangePassword';
import OrderHistory from './OrderHistory';

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [formData, setFormData] = useState({ username: '', email: '', phoneNumber: '' });
    
    useEffect(() => {
        if(user) {
            setFormData({
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber || ''
            });
        }
    }, [user]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data: updatedUser } = await updateUser(formData);
            dispatch(setUser(updatedUser));
            alert('Profile updated!');
        } catch (error) {
            alert('Failed to update profile.');
        }
    };

    if (!user) return <p>Loading profile...</p>;

    return (
        <div className="profile-container">
            <form onSubmit={handleProfileUpdate}>
                <h2>Edit Profile</h2>
                <input value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} placeholder="Username"/>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email"/>
                <input value={formData.phoneNumber} onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} placeholder="Phone Number"/>
                <button type="submit">Update Profile</button>
            </form>
            <hr />
            <ChangePassword />
            <hr />
            <AddressManagement />
            <hr />
            <OrderHistory />
        </div>
    );
};

export default Profile;