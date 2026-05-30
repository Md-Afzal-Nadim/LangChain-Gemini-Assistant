import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { handleRegister } = useAuth();
  const navigator = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();

  
    const payload = {
      username,
      email,
      password
    };

    try {
      await handleRegister(payload);
      navigator('/login');
    } catch (error) {
      console.error("Register failed:", error);
    }
  };

  /*if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </main>
    );
  }*/

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-[350px]">
        
        <h1 className="text-2xl font-bold text-center mb-6">
          Register
        </h1>

        <form onSubmit={registerHandler} className="flex flex-col gap-4">
          
          <input
            type="text"
            name="username"
            value={username}                         
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter Username"
            className="p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            value={email}                         
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter Email"
            className="p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input 
            type="password"
            name="password"
            value={password}                         // ✅ controlled input
            onChange={(e) => setPassword(e.target.value)} // ✅ FIXED
            placeholder="Enter Password"
            className="p-3 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 transition-all p-3 rounded-lg font-semibold"
          >
            Register
          </button>

        </form>

        <p className="mt-5 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            className="text-green-400 hover:underline"
            to="/login"
          >
            Login
          </Link>
        </p>

      </div>
    </main>
  );
};

export default Register;