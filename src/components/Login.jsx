import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/Constant'; 
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

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
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="card glass-panel w-full max-w-md shadow-2xl p-8 relative overflow-hidden"
      >
        {/* Decorative background blob */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-fuchsia-400/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-violet-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="card-body p-0 z-10">
          <h2 className="text-3xl font-black mb-2 text-center gradient-text">Welcome Back</h2>
          <p className="text-center text-slate-500 mb-8 text-sm">Sign in to continue to DevTinder</p>

          <div className="form-control w-full mb-4">
            <label className="label pb-1"><span className="label-text font-semibold text-slate-700">Email ID</span></label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control w-full mb-6">
            <label className="label pb-1"><span className="label-text font-semibold text-slate-700">Password</span></label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="text-red-500 text-sm mb-4 text-center bg-red-50 p-3 rounded-xl border border-red-100"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn border-none bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white w-full shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all font-semibold rounded-xl mt-2"
            onClick={clickHandler}
          >
            Sign In
          </motion.button>

          <p className="text-center mt-8 text-sm text-slate-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary font-bold hover:text-fuchsia-500 transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
