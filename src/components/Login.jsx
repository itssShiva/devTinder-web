import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/Constant'; 
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHandler = async () => {
    try {
      const result = await axios.post(
        BASE_URL + "/login",
        { emailId: email, password },
        { withCredentials: true }
      );

      dispatch(addUser(result.data));
      toast.success("Login successfully");
      navigate('/');
      window.location.reload();
    } catch (error) {
      setError(error.response?.data || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="card bg-base-300 w-full max-w-sm sm:max-w-md lg:max-w-lg shadow-lg">
        <div className="card-body">

          <h2 className="card-title text-3xl sm:text-4xl lg:text-5xl mb-6 underline justify-center">
            Login
          </h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg sm:text-xl">Email ID</legend>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset mt-3">
            <legend className="fieldset-legend text-lg sm:text-xl">Password</legend>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>

          <div className="flex justify-center mt-4">
            <button
              className="btn btn-primary w-full sm:w-2/3"
              onClick={clickHandler}
            >
              Login
            </button>
          </div>

          <Link
            to="/signup"
            className="text-center text-base sm:text-lg underline mt-4 hover:text-blue-300 transition"
          >
            Create new Account
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Login;
