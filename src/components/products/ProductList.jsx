import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import ProductCard from './ProductCard';
import Spinner from '../common/Spinner';

const ProductList = ({ products: propProducts }) => {
    const dispatch = useDispatch();
    const { items: storeProducts, loading, error } = useSelector((state) => state.products);

    // Use props if provided, otherwise use store products
    const products = propProducts || storeProducts;

    useEffect(() => {
        // Only fetch if no products are provided as props
        if (!propProducts) {
            dispatch(fetchProducts());
        }
    }, [dispatch, propProducts]);

    if (loading && !propProducts) return <Spinner />;
    if (error && !propProducts) return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Error loading products: {error.message || JSON.stringify(error)}</p>
            <p>Make sure the backend server is running on http://localhost:8080</p>
            <button onClick={() => dispatch(fetchProducts())}>Retry</button>
        </div>
    );

    if (!products || products.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>No products available at the moment.</p>
                <p>Make sure the backend server is running and has products.</p>
            </div>
        );
    }

    return (
        <div className="product-list">
            {products.map(product => (
                <ProductCard 
                    key={product.productId} 
                    product={product}
                />
            ))}
        </div>
    );
};

export default ProductList;