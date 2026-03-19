import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/Constant';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHandler = async () => {
    if (!email.trim()) { setError("Please enter your email address."); return; }
    if (!password) { setError("Please enter your password."); return; }

    setIsLoading(true);
    setError("");
    try {
      const result = await axios.post(
        BASE_URL + "/login",
        { emailId: email, password },
        { withCredentials: true }
      );
      dispatch(addUser(result.data));
      toast.success("Welcome back! 🎉");
      navigate('/');
      window.location.reload();
    } catch (err) {
      const msg = err.response?.data || err.message || "Something went wrong. Please try again.";
      setError(typeof msg === 'string' ? msg : "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="card glass-panel w-full max-w-md shadow-2xl p-8 relative overflow-hidden"
      >
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-fuchsia-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-violet-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="card-body p-0 z-10">
          <h2 className="text-3xl font-black mb-2 text-center gradient-text">Welcome Back</h2>
          <p className="text-center text-slate-500 mb-8 text-sm">Sign in to continue to DevTinder</p>

          {/* Error Banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.25 }}
                className="mb-5 overflow-hidden"
              >
                <div className="flex items-start gap-3 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-rose-500" />
                  <p className="text-sm flex-1 leading-snug">{error}</p>
                  <button onClick={() => setError("")} className="text-rose-400 hover:text-rose-600 transition-colors flex-shrink-0 -mt-0.5">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email */}
          <div className="form-control w-full mb-4">
            <label className="label pb-1"><span className="label-text font-semibold text-slate-700">Email ID</span></label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`input input-bordered w-full bg-white/50 focus:bg-white focus:outline-none focus:ring-2 transition-all shadow-sm ${error && !password ? 'border-rose-300 focus:ring-rose-300/40 focus:border-rose-400' : 'focus:ring-primary/40 focus:border-primary'}`}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === 'Enter' && clickHandler()}
            />
          </div>

          {/* Password */}
          <div className="form-control w-full mb-6">
            <label className="label pb-1"><span className="label-text font-semibold text-slate-700">Password</span></label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`input input-bordered w-full bg-white/50 focus:bg-white focus:outline-none focus:ring-2 transition-all shadow-sm pr-11 ${error && password ? 'border-rose-300 focus:ring-rose-300/40 focus:border-rose-400' : 'focus:ring-primary/40 focus:border-primary'}`}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === 'Enter' && clickHandler()}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn border-none bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white w-full shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all font-semibold rounded-xl mt-2 h-auto py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={clickHandler}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="loading loading-spinner loading-sm" /> Signing in...
              </span>
            ) : 'Sign In'}
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
