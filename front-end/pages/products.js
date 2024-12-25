import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Products() {
  const router = useRouter();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Get request
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getProducts");
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred");
      }
    };

    fetchProducts();
  }, []);

  // Post request
  const handleCreateProduct = async () => {
    try {
      await axios.post("http://localhost:4000/createProducts", {
        product_name: productName,
        description,
        price,
        stock,
      });

      setProductName("");
      setDescription("");
      setPrice("");
      setStock("");
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
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg transition-all"
          onClick={() => router.push("/orders")}
        >
          Orders
        </button>
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg transition-all">
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
          Create a New Product
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter stock quantity"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <button
            onClick={handleCreateProduct}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all"
          >
            Create Product
          </button>
        </div>

        <h2 className="text-2xl font-bold text-blue-800 mt-8">Products</h2>
        <ul className="mt-4 space-y-4">
          {products.map((product) => (
            <li key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-blue-700">
                {product.product_name}
              </p>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-500">Price: ${product.price}</p>
              <p className="text-gray-400 text-sm">Stock: {product.stock}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
