import React, { useState } from 'react';
import { BASE_URL } from '../utils/Constant';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X, Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState("");
  const [skills, setSkills] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const clearError = () => setError("");

  const validate = () => {
    if (!emailId.trim()) return "Email address is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId)) return "Please enter a valid email address.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const signInHandler = async () => {
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setIsLoading(true);
    setError("");
    try {
      await axios.post(BASE_URL + '/signup', { emailId, password, age, skills }, { withCredentials: true });
      toast.success('Account created! Welcome to DevTinder 🚀');
      navigate('/login');
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || err.message || "Something went wrong during signup.";
      setError(typeof msg === 'string' ? msg : "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "input input-bordered w-full bg-zinc-900/60 border-zinc-700 text-slate-100 placeholder:text-zinc-500 focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/60 transition-all shadow-sm shadow-black/30";
  const labelClass = "label pb-1";
  const labelTextClass = "label-text font-semibold text-slate-300";

  return (
    <div className='min-h-[calc(100vh-80px)] flex justify-center items-center px-4 sm:px-6 lg:px-8 py-10'>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="card glass-panel w-full max-w-md shadow-[0_24px_80px_rgba(0,0,0,0.7)] p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-700/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-900/12 rounded-full blur-3xl pointer-events-none" />

        <div className="z-10 relative">
          <h2 className="text-3xl font-black mb-2 text-center gradient-text">Create Account</h2>
          <p className="text-center text-slate-500 mb-8 max-w-sm mx-auto">Join the community of developers.</p>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.25 }}
                className="mb-6 overflow-hidden"
              >
                <div className="flex items-start gap-3 bg-red-950/70 border border-red-800/50 text-red-400 px-4 py-3 rounded-xl">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p className="text-sm flex-1 leading-snug">{error}</p>
                  <button onClick={clearError} className="text-red-600 hover:text-red-400 transition-colors flex-shrink-0 -mt-0.5">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            <div className="form-control">
              <label className={labelClass}><span className={labelTextClass}>Email ID <span className="text-red-500">*</span></span></label>
              <input type="email" className={inputClass} placeholder="jane@example.com" value={emailId} onChange={(e) => { setEmail(e.target.value); clearError(); }} />
            </div>
            
            <div className="form-control">
              <label className={labelClass}><span className={labelTextClass}>Password <span className="text-red-500">*</span></span></label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} className={`${inputClass} pr-11`} placeholder="Min. 6 characters" value={password} onChange={(e) => { setPassword(e.target.value); clearError(); }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-red-400 transition-colors z-10">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="form-control">
              <label className={labelClass}><span className={labelTextClass}>Age</span></label>
              <input type="number" className={inputClass} placeholder="25" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>

            <div className="form-control">
              <label className={labelClass}><span className={labelTextClass}>Skills <span className="text-slate-500 font-normal">(comma separated)</span></span></label>
              <input type="text" className={inputClass} placeholder="React, Node.js, Tailwind..." value={skills} onChange={(e) => setSkills(e.target.value)} />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="btn border-none w-full font-semibold rounded-xl mt-8 py-3 h-auto text-lg text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_24px_rgba(185,28,28,0.35)] hover:shadow-[0_4px_32px_rgba(185,28,28,0.55)] transition-all"
            style={{ backgroundImage: 'linear-gradient(135deg, #b91c1c, #ef4444)' }}
            onClick={signInHandler}
            disabled={isLoading}
          >
            {isLoading ? <span className="flex items-center gap-2"><span className="loading loading-spinner loading-sm" /> Creating account...</span> : 'Create Account'}
          </motion.button>

          <p className="text-center mt-6 text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-red-400 font-bold hover:text-red-300 transition-colors">Log in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
