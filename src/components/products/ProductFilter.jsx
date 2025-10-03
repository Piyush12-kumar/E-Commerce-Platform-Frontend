import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';

const ProductFilter = () => {
    const [params, setParams] = useState({
        name: '',
        minPrice: '',
        maxPrice: ''
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setParams({ ...params, [e.target.name]: e.target.value });
    };

    const handleFilter = (e) => {
        e.preventDefault();
        dispatch(fetchProducts(params));
    };

    return (
        <form onSubmit={handleFilter} className="filter-form">
            <input name="name" value={params.name} onChange={handleChange} placeholder="Search by name..." />
            <input name="minPrice" type="number" value={params.minPrice} onChange={handleChange} placeholder="Min Price" />
            <input name="maxPrice" type="number" value={params.maxPrice} onChange={handleChange} placeholder="Max Price" />
            <button type="submit" className="btn">Filter</button>
        </form>
    );
};

export default ProductFilter;