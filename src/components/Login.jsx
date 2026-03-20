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
      const result = await axios.post(BASE_URL + "/login", { emailId: email, password }, { withCredentials: true });
      dispatch(addUser(result.data));
      toast.success("Welcome back! 🎉");
      navigate('/');
      window.location.reload();
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || err.message || "Something went wrong.";
      setError(typeof msg === 'string' ? msg : "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "input input-bordered w-full bg-zinc-900/60 border-zinc-700 text-slate-100 placeholder:text-zinc-500 focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/60 transition-all shadow-sm shadow-black/30";

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="card glass-panel w-full max-w-md shadow-[0_24px_80px_rgba(0,0,0,0.7)] p-8 relative overflow-hidden"
      >
        {/* Decorative red blobs */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-700/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-red-900/15 rounded-full blur-3xl pointer-events-none" />

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
                <div className="flex items-start gap-3 bg-red-950/70 border border-red-800/50 text-red-400 px-4 py-3 rounded-xl">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p className="text-sm flex-1 leading-snug">{error}</p>
                  <button onClick={() => setError("")} className="text-red-600 hover:text-red-400 transition-colors flex-shrink-0 -mt-0.5">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email */}
          <div className="form-control w-full mb-4">
            <label className="label pb-1"><span className="label-text font-semibold text-slate-300">Email ID</span></label>
            <input type="email" placeholder="Enter your email" className={inputClass} value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === 'Enter' && clickHandler()} />
          </div>

          {/* Password */}
          <div className="form-control w-full mb-6">
            <label className="label pb-1"><span className="label-text font-semibold text-slate-300">Password</span></label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder="Enter your password"
                className={`${inputClass} pr-11`} value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === 'Enter' && clickHandler()} />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-red-400 transition-colors z-10">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn border-none w-full font-semibold rounded-xl mt-2 h-auto py-3 text-base text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_24px_rgba(185,28,28,0.35)] hover:shadow-[0_4px_32px_rgba(185,28,28,0.55)] transition-all"
            style={{ backgroundImage: 'linear-gradient(135deg, #b91c1c, #ef4444)' }}
            onClick={clickHandler}
            disabled={isLoading}
          >
            {isLoading ? <span className="flex items-center gap-2"><span className="loading loading-spinner loading-sm" /> Signing in...</span> : 'Sign In'}
          </motion.button>

          <p className="text-center mt-8 text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-red-400 font-bold hover:text-red-300 transition-colors">Create one</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
