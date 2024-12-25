import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Orders() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [status, setStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  // Get request
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getOrders");
        setOrders(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred");
      }
    };

    fetchOrders();
  }, []);

  // Post request
  const handleCreateOrder = async () => {
    try {
      await axios.post("http://localhost:4000/createOrders", {
        user_id: userId,
        total_amount: totalAmount,
        status,
      });

      setUserId("");
      setTotalAmount("");
      setStatus("");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-300 to-indigo-400 font-sans">
      <div className="w-full h-24 bg-blue-600 text-white flex items-center justify-center space-x-10 shadow-md">
        <button
          className="px-5 py-3 bg-blue-500 hover:bg-blue-400 rounded-lg transition-all"
          onClick={() => router.push("/")}
        >
          Home
        </button>
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg transition-all"
          onClick={() => router.push("/users")}
        >
          Users
        </button>
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg transition-all">
          Orders
        </button>
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg transition-all"
          onClick={() => router.push("/products")}
        >
          Products
        </button>
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg transition-all"
          onClick={() => router.push("/reviews")}
        >
          Reviews
        </button>
      </div>

      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 text-center mb-6">
          Create a New Order
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            placeholder="Enter Total Amount"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Enter Status"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <button
            onClick={handleCreateOrder}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all"
          >
            Create Order
          </button>
        </div>

        <h2 className="text-2xl font-bold text-blue-800 mt-8">Orders</h2>
        <ul className="mt-4 space-y-4">
          {orders.map((order) => (
            <li
              key={order.order_id}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <p className="text-lg font-semibold text-blue-700">
                Order ID: {order.order_id}
              </p>
              <p className="text-gray-600">User ID: {order.user_id}</p>
              <p className="text-gray-500">
                Total Amount: ${order.total_amount}
              </p>
              <p className="text-gray-400 text-sm">Status: {order.status}</p>
              <p className="text-gray-400 text-sm">
                Created At: {order.created_at}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
