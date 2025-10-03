import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../redux/slices/productSlice';
import Spinner from '../components/common/Spinner';
import { addToCart } from '../redux/slices/cartSlice';

const ProductDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { currentItem: product, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    if (loading) return <Spinner />;
    if (error) return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Error loading product: {error.message || 'Could not load product'}</p>
            <button className="btn" onClick={() => dispatch(fetchProductById(id))}>Retry</button>
        </div>
    );
    if (!product) return <p>Product not found.</p>;

    return (
        <div className="product-detail">
            <img src={product.imageURL || 'https://via.placeholder.com/400'} alt={product.name} />
            <div className="product-detail-info">
                <h1>{product.name}</h1>
                <div className="price-container">
                    {product.discountPrice ? (
                        <>
                            <span className="original-price">${product.price}</span>
                            <span className="discounted-price">${product.discountPrice}</span>
                        </>
                    ) : (
                        <span className="price">${product.price}</span>
                    )}
                </div>
                <p className="description">{product.description}</p>
                {/* Add review section and other details here */}
                <button className="btn btn-secondary" onClick={() => dispatch(addToCart(product))}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetailPage;