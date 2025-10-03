import React, { useState, useEffect } from 'react';
import { getAllDiscounts, addDiscount, updateDiscount, deleteDiscount } from '../../api/discountApi';
import Spinner from '../common/Spinner';

const DiscountManagement = () => {
    const [discounts, setDiscounts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentDiscount, setCurrentDiscount] = useState({ code: '', percentage: 0, active: true });

    const fetchDiscounts = async () => {
        setLoading(true);
        try {
            const { data } = await getAllDiscounts();
            setDiscounts(data);
        } catch (error) {
            alert('Could not load discounts.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDiscounts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentDiscount({ ...currentDiscount, [name]: type === 'checkbox' ? checked : value });
    };
    
    const resetForm = () => {
        setIsEditing(false);
        setCurrentDiscount({ code: '', percentage: 0, active: true });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiCall = isEditing 
            ? updateDiscount(currentDiscount.id, currentDiscount) 
            : addDiscount(currentDiscount);
        try {
            await apiCall;
            alert(`Discount ${isEditing ? 'updated' : 'added'}!`);
            resetForm();
            fetchDiscounts();
        } catch (error) {
            alert(`Failed to ${isEditing ? 'update' : 'add'} discount.`);
        }
    };

    const handleEdit = (discount) => {
        setIsEditing(true);
        setCurrentDiscount(discount);
    };

    const handleDelete = async (discountId) => {
        if (window.confirm('Delete this discount?')) {
            try {
                await deleteDiscount(discountId);
                alert('Discount deleted.');
                fetchDiscounts();
            } catch (error) {
                alert('Failed to delete discount.');
            }
        }
    };

    if (loading) return <Spinner />;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>{isEditing ? 'Edit Discount' : 'Add New Discount'}</h3>
                <input name="code" value={currentDiscount.code} onChange={handleInputChange} placeholder="Discount Code" required />
                <input name="percentage" type="number" value={currentDiscount.percentage} onChange={handleInputChange} placeholder="Percentage" required />
                <label>
                    <input name="active" type="checkbox" checked={currentDiscount.active} onChange={handleInputChange} />
                    Active
                </label>
                <button type="submit" className="btn btn-primary">{isEditing ? 'Update' : 'Add'}</button>
                {isEditing && <button type="button" onClick={resetForm}>Cancel</button>}
            </form>

            <div className="management-list">
                 <h4>Existing Discounts</h4>
                {discounts.map(d => (
                    <div key={d.id} className="list-item">
                        <span>{d.code} - {d.percentage}% ({d.active ? 'Active' : 'Inactive'})</span>
                        <div>
                             <button onClick={() => handleEdit(d)}>Edit</button>
                            <button className="btn-danger" onClick={() => handleDelete(d.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiscountManagement;