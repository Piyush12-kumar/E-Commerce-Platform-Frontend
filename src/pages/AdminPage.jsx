import React from 'react';
import UserManagement from '../components/admin/UserManagement';
import ProductManagement from '../components/admin/ProductManagement';
import CategoryManagement from '../components/admin/CategoryManagement';
import DiscountManagement from '../components/admin/DiscountManagement';

const AdminPage = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin. Here you can manage the core components of the store.</p>
            
            <div className="admin-sections">
                <hr />
                <section>
                    <h2>User Management</h2>
                    <UserManagement />
                </section>
                <hr />
                <section>
                    <h2>Product Management</h2>
                    <ProductManagement />
                </section>
                <hr />
                <section>
                    <h2>Category Management</h2>
                    <CategoryManagement />
                </section>
                <hr />
                <section>
                    <h2>Discount Management</h2>
                    <DiscountManagement />
                </section>
            </div>
        </div>
    );
};

export default AdminPage;