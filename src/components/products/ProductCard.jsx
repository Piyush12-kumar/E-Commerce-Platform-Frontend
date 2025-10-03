import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
    // Dispatch addToCart and wait for result
    dispatch(addToCart(product))
      .unwrap()
      .then(() => {
        alert(`${product.name} added to cart!`);
      })
      .catch((err) => {
        console.error('Add to cart failed:', err);
        const message = err?.message || (typeof err === 'object' ? JSON.stringify(err) : err);
        alert(`Failed to add ${product.name} to cart: ${message}`);
      });
    };

    return (
        <div className="product-card">
            <Link to={`/products/${product.productId}`}>
                <img 
                    src={product.imageURL || 'https://via.placeholder.com/300'} 
                    alt={product.name}
                    onError={(e) => {
                        console.log(`ProductCard image failed to load for ${product.name}:`, product.imageURL);
                        e.target.src = 'https://via.placeholder.com/300?text=Image+Not+Found';
                    }}
                />
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

export default ProductCard;