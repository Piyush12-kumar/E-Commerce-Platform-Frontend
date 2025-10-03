import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../api/productApi';
import Spinner from '../common/Spinner';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({ name: '', description: '', price: 0, stock: 0 });

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data } = await getProducts();
            setProducts(data.products);
        } catch (error) {
            alert('Could not load products.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct({ ...currentProduct, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiCall = isEditing ? updateProduct(currentProduct.productId, currentProduct) : addProduct(currentProduct);
        try {
            await apiCall;
            alert(`Product ${isEditing ? 'updated' : 'added'} successfully!`);
            setIsEditing(false);
            setCurrentProduct({ name: '', description: '', price: 0, stock: 0 });
            fetchProducts();
        } catch (error) {
            alert(`Failed to ${isEditing ? 'update' : 'add'} product.`);
        }
    };

    const handleEdit = (product) => {
        setIsEditing(true);
        setCurrentProduct(product);
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(productId);
                alert('Product deleted.');
                fetchProducts();
            } catch (error) {
                alert('Failed to delete product.');
            }
        }
    };

    if (loading) return <Spinner />;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
                <input name="name" value={currentProduct.name} onChange={handleInputChange} placeholder="Name" required />
                <textarea name="description" value={currentProduct.description} onChange={handleInputChange} placeholder="Description" />
                <input name="price" type="number" value={currentProduct.price} onChange={handleInputChange} placeholder="Price" required />
                <input name="stock" type="number" value={currentProduct.Stock} onChange={handleInputChange} placeholder="Stock" required />
                <button type="submit" className="btn btn-primary">{isEditing ? 'Update' : 'Add'}</button>
                {isEditing && <button type="button" onClick={() => { setIsEditing(false); setCurrentProduct({ name: '', description: '', price: 0, stock: 0 }); }}>Cancel</button>}
            </form>
            <div className="product-management-list">
                {products.map(p => (
                    <div key={p.productId} className="list-item">
                        <span>{p.name} - ${p.price}</span>
                        <div>
                            <button onClick={() => handleEdit(p)}>Edit</button>
                            <button className="btn-danger" onClick={() => handleDelete(p.productId)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductManagement;