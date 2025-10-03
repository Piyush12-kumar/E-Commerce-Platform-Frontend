import React, { useState } from 'react';

const AddressForm = ({ onSubmit }) => {
    const [address, setAddress] = useState({
        addressLine1: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    });

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(address);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="addressLine1" value={address.addressLine1} onChange={handleChange} placeholder="Address Line 1" required/>
            <input name="city" value={address.city} onChange={handleChange} placeholder="City" required/>
            <input name="state" value={address.state} onChange={handleChange} placeholder="State" required/>
            <input name="zipCode" value={address.zipCode} onChange={handleChange} placeholder="Zip Code" required/>
            <input name="country" value={address.country} onChange={handleChange} placeholder="Country" required/>
            <button type="submit">Save Address</button>
        </form>
    );
};

export default AddressForm;