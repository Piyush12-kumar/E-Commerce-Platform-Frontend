import React, { useState } from 'react';
import { changePassword as changePasswordApi } from '../../api/authApi';

const ChangePassword = () => {
    const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwords.newPassword.length < 6) {
            alert("New password must be at least 6 characters long.");
            return;
        }
        try {
            await changePasswordApi(passwords);
            alert('Password changed successfully!');
            setPasswords({ oldPassword: '', newPassword: '' });
        } catch (error) {
            alert('Failed to change password. Check your old password.');
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <h3>Change Password</h3>
            <input type="password" name="oldPassword" value={passwords.oldPassword} onChange={handleChange} placeholder="Old Password" required />
            <input type="password" name="newPassword" value={passwords.newPassword} onChange={handleChange} placeholder="New Password" required />
            <button type="submit">Change Password</button>
        </form>
    );
};

export default ChangePassword;