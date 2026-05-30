import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";// ye dono ka matlab ek bar login ho gaya to login page pe nahi jayega

import { Navigate } from "react-router";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /* ye dono ka matlab ek bar login ho gaya to login page pe nahi jayega */
  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.loading);



  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

  

    const payload = {
      email,
      password
    };

    try {
      await handleLogin(payload);
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if(!loading && user)
     return <Navigate to="/" />

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96">
        
        <h1 className="text-2xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={loginHandler} className="flex flex-col gap-4">
          
          {/* ✅ Email Input */}
          <input
            type="email"
            name="email"
            value={email}                        
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter Email"
            required
            className="p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* ✅ Password Input */}
          <input
            type="password"
            name="password"
            value={password}                      // ✅ controlled input
            onChange={(e) => setPassword(e.target.value)} // ✅ FIXED
            placeholder="Enter Password"
            required
            className="p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition-all p-3 rounded-lg font-semibold"
          >
            Login
          </button>

        </form>

        <p className="mt-5 text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link
            className="text-blue-400 hover:underline"
            to="/register"
          >
            Register
          </Link>
        </p>

      </div>

    </main>
  );
};

export default Login;