import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Users() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  // Get request
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        setPosts(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred");
      }
    };

    fetchPosts();
  }, []);

  // Post request
  const handleCreatePost = async () => {
    try {
      await axios.post("http://localhost:4000/createUsers", {
        username: name,
        email,
        password,
      });

      setName("");
      setPassword("");
      setEmail("");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-300 to-purple-400 font-sans">
      <div className="w-full h-24 bg-purple-600 text-white flex items-center justify-center space-x-10 shadow-md">
        <button
          className="px-5 py-3 bg-purple-500 hover:bg-purple-400 rounded-lg transition-all"
          onClick={() => router.push("/")}
        >
          Home
        </button>
        <button className="px-4 py-2 bg-purple-500 hover:bg-purple-400 rounded-lg transition-all">
          Users
        </button>
        <button
          className="px-4 py-2 bg-purple-500 hover:bg-purple-400 rounded-lg transition-all"
          onClick={() => router.push("/orders")}
        >
          Orders
        </button>
        <button
          className="px-4 py-2 bg-purple-500 hover:bg-purple-400 rounded-lg transition-all"
          onClick={() => router.push("/products")}
        >
          Products
        </button>
        <button
          className="px-4 py-2 bg-purple-500 hover:bg-purple-400 rounded-lg transition-all"
          onClick={() => router.push("/reviews")}
        >
          Reviews
        </button>
      </div>

      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-800 text-center mb-6">
          Create a New User
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <button
            onClick={handleCreatePost}
            className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all"
          >
            Create User
          </button>
        </div>

        <h2 className="text-2xl font-bold text-purple-800 mt-8">Users</h2>
        <ul className="mt-4 space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-purple-700">
                {post.username}
              </p>
              <p className="text-gray-600">{post.email}</p>
              <p className="text-gray-500">{post.password}</p>
              <p className="text-gray-400 text-sm">
                Created At: {post.created_at}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
