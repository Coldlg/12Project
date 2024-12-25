import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Reviews() {
  const router = useRouter();
  const [productId, setProductId] = useState("");
  const [userId, setUserId] = useState("");
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  // Get request
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getReviews");
        setReviews(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred");
      }
    };

    fetchReviews();
  }, []);

  // Post request
  const handleCreateReview = async () => {
    try {
      await axios.post("http://localhost:4000/createReviewsArray", {
        items: [
          {
            product_id: productId,
            user_id: userId,
            rating,
            text: reviewText,
          },
        ],
      });

      setProductId("");
      setUserId("");
      setRating("");
      setReviewText("");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-red-300 to-pink-400 font-sans">
      <div className="w-full h-24 bg-red-600 text-white flex items-center justify-center space-x-10 shadow-md">
        <button
          className="px-5 py-3 bg-red-500 hover:bg-red-400 rounded-lg transition-all"
          onClick={() => router.push("/")}
        >
          Home
        </button>
        <button
          className="px-4 py-2 bg-red-500 hover:bg-red-400 rounded-lg transition-all"
          onClick={() => router.push("/users")}
        >
          Users
        </button>
        <button
          className="px-4 py-2 bg-red-500 hover:bg-red-400 rounded-lg transition-all"
          onClick={() => router.push("/orders")}
        >
          Orders
        </button>
        <button
          className="px-4 py-2 bg-red-500 hover:bg-red-400 rounded-lg transition-all"
          onClick={() => router.push("/products")}
        >
          Products
        </button>
        <button
          className="px-4 py-2 bg-red-500 hover:bg-red-400 rounded-lg transition-all"
          onClick={() => router.push("/orders")}
        >
          Reviews
        </button>
      </div>

      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-red-800 text-center mb-6">
          Create a New Review
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <input
            type="number"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Enter product ID"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Enter rating (1-5)"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Enter review text"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <button
            onClick={handleCreateReview}
            className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all"
          >
            Create Review
          </button>
        </div>

        <h2 className="text-2xl font-bold text-red-800 mt-8">Reviews</h2>
        <ul className="mt-4 space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-red-700">
                Product ID: {review.product_id}
              </p>
              <p className="text-gray-600">User ID: {review.user_id}</p>
              <p className="text-gray-500">Rating: {review.rating}</p>
              <p className="text-gray-400">Review: {review.review_text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
