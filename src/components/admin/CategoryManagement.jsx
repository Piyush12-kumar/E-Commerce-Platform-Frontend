import React, { useState, useEffect } from 'react';
import { getAllCategories, addCategory, updateCategory, deleteCategory } from '../../api/categoryApi';
import Spinner from '../common/Spinner';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ name: '', description: '' });

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await getAllCategories(); 
            console.log('Categories fetched:', response);
            const payload = response.data;
            // Support array or object with categories field
            // Normalize response: payload may be an array or object with categories
            const rawList = Array.isArray(payload)
                ? payload
                : Array.isArray(payload.categories)
                    ? payload.categories
                    : [];
            // Ensure each category has a categoryId
            const normalized = rawList.map(c => ({
                categoryId: c.categoryId || c.id,
                name: c.name,
                description: c.description || ''
            }));
            setCategories(normalized);
        } catch (error) {
            console.error('Could not load categories:', error);
            alert('Could not load categories.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentCategory({ ...currentCategory, [name]: value });
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentCategory({ name: '', description: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiCall = isEditing 
            ? updateCategory(currentCategory.categoryId, currentCategory) 
            : addCategory(currentCategory);
        try {
            await apiCall;
            alert(`Category ${isEditing ? 'updated' : 'added'} successfully!`);
            resetForm();
            fetchCategories();
        } catch (error) {
            alert(`Failed to ${isEditing ? 'update' : 'add'} category.`);
        }
    };

    const handleEdit = (category) => {
        setIsEditing(true);
        setCurrentCategory(category);
    };

    const handleDelete = async (categoryId) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await deleteCategory(categoryId);
                alert('Category deleted.');
                fetchCategories();
            } catch (error) {
                alert('Failed to delete category.');
            }
        }
    };

    if (loading) return <Spinner />;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>{isEditing ? 'Edit Category' : 'Add New Category'}</h3>
                <input name="name" value={currentCategory.name} onChange={handleInputChange} placeholder="Category Name" required />
                <textarea name="description" value={currentCategory.description} onChange={handleInputChange} placeholder="Description" />
                <button type="submit" className="btn btn-primary">{isEditing ? 'Update' : 'Add'}</button>
                {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
            </form>

            <div className="management-list">
                <h4>Existing Categories</h4>
                {categories.map(cat => (
                    <div key={cat.categoryId} className="list-item">
                        <span>{cat.name}</span>
                        <div>
                            <button onClick={() => handleEdit(cat)}>Edit</button>
                            <button className="btn-danger" onClick={() => handleDelete(cat.categoryId)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryManagement;