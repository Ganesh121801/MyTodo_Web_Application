import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'https://mytodo-web-application-wmw4.onrender.com/user/signup', // Deployed URL
        { username, email, password },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(data);
      toast.success('User registered successfully');
      navigateTo('/login');
      localStorage.setItem("jwt", data.token);
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.errors || 'Error during registration');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-5 text-center">Signup</h2>
        <form onSubmit={handleRegister}>
          {/* username */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="username">
              Username
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Type Username"
              id="username"
            />
          </div>
          {/* email */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type Email"
              id="email"
            />
          </div>
          {/* password */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type Password"
              id="password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-900 duration-300 rounded-xl font-semibold p-3"
          >
            Signup
          </button>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
