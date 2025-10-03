import React, { useState, useEffect } from 'react';
import { getUserAddresses, addAddress, deleteAddress } from '../../api/authApi';
import AddressForm from './AddressForm';

const AddressManagement = () => {
    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const fetchAddresses = async () => {
        const { data } = await getUserAddresses();
        setAddresses(data);
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleAddAddress = async (address) => {
        try {
            await addAddress(address);
            setShowForm(false);
            fetchAddresses();
            alert('Address added!');
        } catch (error) {
            alert('Failed to add address.');
        }
    };
    
    const handleDelete = async (addressId) => {
        if(window.confirm('Delete this address?')) {
            await deleteAddress(addressId);
            fetchAddresses();
        }
    }

    return (
        <div>
            <h3>My Addresses</h3>
            {addresses.map(addr => (
                <div key={addr.addressId}>
                    <p>{addr.addressLine1}, {addr.city}, {addr.zipCode}</p>
                    <button onClick={() => handleDelete(addr.addressId)}>Delete</button>
                </div>
            ))}
            <button onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancel' : 'Add New Address'}</button>
            {showForm && <AddressForm onSubmit={handleAddAddress} />}
        </div>
    );
};

export default AddressManagement;