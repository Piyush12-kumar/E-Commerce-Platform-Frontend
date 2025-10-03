import React, { useState, useEffect } from 'react';
import { getReviewsByProduct, addReview } from '../../api/reviewApi';
import { useSelector } from 'react-redux';

const ReviewSection = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '', productId });
    const { token } = useSelector(state => state.auth);

    const fetchReviews = async () => {
        try {
            const { data } = await getReviewsByProduct(productId);
            setReviews(data);
        } catch (error) {
            console.log("No reviews found or error fetching reviews.");
            setReviews([]);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            await addReview(newReview);
            alert('Review submitted!');
            setNewReview({ ...newReview, rating: 5, comment: '' });
            fetchReviews();
        } catch (error) {
            alert('Failed to submit review.');
        }
    };

    return (
        <div className="review-section">
            <h3>Customer Reviews</h3>
            {token && (
                <form onSubmit={handleReviewSubmit}>
                    <select value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}>
                        {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                    </select>
                    <textarea value={newReview.comment} onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })} placeholder="Write your review..." required />
                    <button type="submit">Submit Review</button>
                </form>
            )}
            <div className="review-list">
                {reviews.length > 0 ? reviews.map(r => (
                    <div key={r.id} className="review-card">
                        <p><strong>Rating: {r.rating}/5</strong></p>
                        <p>{r.comment}</p>
                        <small>by {r.user.username} on {new Date(r.createdAt).toLocaleDateString()}</small>
                    </div>
                )) : <p>No reviews yet.</p>}
            </div>
        </div>
    );
};

export default ReviewSection;