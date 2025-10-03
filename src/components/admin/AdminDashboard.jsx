import React from 'react';
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement';

const AdminDashboard = () => {
    // This component can be a layout for different admin sections
    return (
        <div className="admin-dashboard">
            <section id="user-management">
                <h2>User Management</h2>
                <UserManagement />
            </section>
            <hr style={{ margin: '2rem 0' }} />
            <section id="product-management">
                <h2>Product Management</h2>
                <ProductManagement />
            </section>
        </div>
    );
};

export default AdminDashboard;