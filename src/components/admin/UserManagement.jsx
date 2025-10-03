import React, { useState, useEffect } from 'react';
import { getAllUsers, updateUserStatus, deleteUserByAdmin } from '../../api/adminApi';
import Spinner from '../common/Spinner';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data } = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users", error);
            alert("Could not load users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleStatusChange = async (userId, currentStatus) => {
        if (window.confirm(`Are you sure you want to ${currentStatus ? 'deactivate' : 'activate'} this user?`)) {
            try {
                await updateUserStatus(userId, !currentStatus);
                fetchUsers(); // Refresh the list
                alert('User status updated!');
            } catch (error) {
                alert('Failed to update user status.');
            }
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to permanently delete this user? This cannot be undone.')) {
            try {
                await deleteUserByAdmin(userId);
                fetchUsers(); // Refresh the list
                alert('User deleted successfully.');
            } catch (error) {
                alert('Failed to delete user.');
            }
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="user-management-table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.enabled ? 'Active' : 'Inactive'}</td>
                            <td>
                                <button className="btn" onClick={() => handleStatusChange(user.userId, user.enabled)}>
                                    {user.enabled ? 'Deactivate' : 'Activate'}
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDeleteUser(user.userId)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;