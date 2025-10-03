import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import axios from 'axios';

const HomePage = () => {
    const dispatch = useDispatch();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleAddToCart = (product) => {
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

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch featured products
                const featuredResponse = await axios.get('/api/products/featured');
                console.log('Featured Products Response:', featuredResponse.data);
                console.log('Featured Products Count:', featuredResponse.data.length);
                setFeaturedProducts(featuredResponse.data);

                // Fetch all products
                const allProductsResponse = await axios.get('/api/products/allProducts');
                console.log('All Products Response:', allProductsResponse.data);
                console.log('All Products Structure:', Object.keys(allProductsResponse.data));
                console.log('All Products Count:', allProductsResponse.data.products?.length);
                
                // Check if iPhone 14 Pro is in all products (with null safety)
                const iPhoneInAll = allProductsResponse.data.products?.find(p => 
                    p && p.name && typeof p.name === 'string' && p.name.includes('iPhone 14 Pro')
                );
                console.log('iPhone 14 Pro in all products:', iPhoneInAll);
                
                // Filter out invalid products (those that are just numbers or missing properties)
                console.log('Raw products array:', allProductsResponse.data.products);
                console.log('Products types:', allProductsResponse.data.products?.map((p, index) => ({ 
                    index, 
                    type: typeof p, 
                    value: p, 
                    hasName: p && p.name,
                    hasProductId: p && p.productId 
                })));
                
                const validProducts = allProductsResponse.data.products?.filter(p => 
                    p && typeof p === 'object' && p.name && p.productId && typeof p.name === 'string'
                ) || [];
                
                const invalidProducts = allProductsResponse.data.products?.filter(p => 
                    !(p && typeof p === 'object' && p.name && p.productId && typeof p.name === 'string')
                ) || [];
                
                console.log('Valid products count:', validProducts.length);
                console.log('Invalid products count:', invalidProducts.length);
                console.log('Invalid products:', invalidProducts);
                console.log('Valid products:', validProducts.map(p => ({ id: p.productId, name: p.name })));
                
                setAllProducts(validProducts);

                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                console.error('Error response:', err.response);
                console.error('Error message:', err.message);
                
                let errorMessage = 'There was an error fetching the products.';
                if (err.response) {
                    errorMessage += ` Status: ${err.response.status}`;
                    if (err.response.status === 404) {
                        errorMessage += ' - API endpoint not found. Make sure your backend server is running on http://localhost:8080';
                    } else if (err.response.status === 500) {
                        errorMessage += ' - Server error. Check your backend logs.';
                    }
                } else if (err.request) {
                    errorMessage += ' Network error - cannot connect to backend. Make sure your backend server is running on http://localhost:8080';
                } else {
                    errorMessage += ` ${err.message}`;
                }
                
                setError(errorMessage);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="home-page">
            <h1>Welcome to Our Store!</h1>
            <p>Discover amazing products at unbeatable prices</p>

            {/* Featured Products Section */}
            <div className="featured-section">
                <h2>Featured Products</h2>
                <div className="product-list">
                    {featuredProducts.map((product) => (
                        <div key={product.productId} className="product-card">
                            <Link to={`/products/${product.productId}`}>
                                <img 
                                    src={product.imageURL ? product.imageURL.replace('http://localhost:8080', '') : 'https://via.placeholder.com/300'} 
                                    alt={product.name}
                                    onError={(e) => {
                                        console.log(`Featured image failed to load for ${product.name}:`, product.imageURL);
                                        e.target.src = 'https://via.placeholder.com/300?text=' + encodeURIComponent(product.name);
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
                            <button className="btn btn-secondary" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* All Products Section */}
            <div className="all-products">
                <h2>All Products</h2>
                <div className="product-list">
                    {allProducts.map((product) => (
                        <div key={product.productId} className="product-card">
                            <Link to={`/products/${product.productId}`}>
                                <img 
                                    src={product.imageURL ? product.imageURL.replace('http://localhost:8080', '') : 'https://via.placeholder.com/300'} 
                                    alt={product.name}
                                    onError={(e) => {
                                        console.log(`All products image failed to load for ${product.name}:`, product.imageURL);
                                        e.target.src = 'https://via.placeholder.com/300?text=' + encodeURIComponent(product.name);
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
                            <button className="btn btn-secondary" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;