import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';

const ProductDetails = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        alert(`${product.name} added to cart!`);
    };

    return (
        <div className="product-card">
            <Link to={`/products/${product.productId}`}>
                <img src={product.imageURL || 'https://via.placeholder.com/300'} alt={product.name} />
                <div className="card-content">
                    <h3>{product.name}</h3>
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
                </div>
            </Link>
            <button className="btn btn-secondary" onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductDetails;