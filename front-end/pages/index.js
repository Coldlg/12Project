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
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-300 to-purple-400 font-sans flex items-center justify-center">
      <div className="w-full h-full text-white flex items-center justify-center space-x-10">
        <button
          className="px-10 py-6 bg-purple-500 hover:bg-purple-400 rounded-lg transition-all"
          onClick={() => router.push("/users")}
        >
          Users
        </button>
        <button
          className="px-10 py-6 bg-purple-500 hover:bg-purple-400 rounded-lg transition-all"
          onClick={() => router.push("/orders")}
        >
          Orders
        </button>
        <button
          className="px-10 py-6 bg-purple-500 hover:bg-purple-400 rounded-lg transition-all"
          onClick={() => router.push("/products")}
        >
          Product
        </button>
        <button
          className="px-10 py-6 bg-purple-500 hover:bg-purple-400 rounded-lg transition-all"
          onClick={() => router.push("/reviews")}
        >
          Reviews
        </button>
      </div>
    </div>
  );
}
