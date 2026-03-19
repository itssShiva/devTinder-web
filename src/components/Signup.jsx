import React, { useState } from 'react';
import { BASE_URL } from '../utils/Constant';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X, Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState("");
  const [skills, setSkills] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [gender, setGender] = useState("male");
  const [about, setAbout] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const clearError = () => setError("");

  const validate = () => {
    if (!firstName.trim()) return "First name is required.";
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
      await axios.post(BASE_URL + '/signup', {
        firstName, lastName, emailId, password, age, skills, photoUrl, gender, about,
      }, { withCredentials: true });
      toast.success('Account created! Welcome to DevTinder 🚀');
      navigate('/login');
    } catch (err) {
      const msg = err?.response?.data || err?.message || "Something went wrong during signup.";
      setError(typeof msg === 'string' ? msg : "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "input input-bordered w-full bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm";
  const labelClass = "label pb-1";
  const labelTextClass = "label-text font-semibold text-slate-700";

  return (
    <div className='min-h-[calc(100vh-80px)] flex justify-center items-center px-4 sm:px-6 lg:px-8 py-10'>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="card glass-panel w-full max-w-2xl shadow-2xl p-6 sm:p-10 relative overflow-hidden"
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="z-10 relative">
          <h2 className="text-3xl sm:text-4xl font-black mb-2 text-center gradient-text">Create Account</h2>
          <p className="text-center text-slate-500 mb-8 max-w-sm mx-auto">Join the best community for developers to connect, share, and collaborate.</p>

          {/* Error Banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.25 }}
                className="mb-6 overflow-hidden"
              >
                <div className="flex items-start gap-3 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-rose-500" />
                  <p className="text-sm flex-1 leading-snug">{error}</p>
                  <button onClick={clearError} className="text-rose-400 hover:text-rose-600 transition-colors flex-shrink-0 -mt-0.5">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control">
              <label className={labelClass}><span className={labelTextClass}>First Name <span className="text-rose-400">*</span></span></label>
              <input type="text" className={inputClass} placeholder="Jane" value={firstName} onChange={(e) => { setFirstName(e.target.value); clearError(); }} />
            </div>

            <div className="form-control">
              <label className={labelClass}><span className={labelTextClass}>Last Name</span></label>
              <input type="text" className={inputClass} placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>

            <div className="form-control">
              <label className={labelClass}><span className={labelTextClass}>Email ID <span className="text-rose-400">*</span></span></label>
              <input type="email" className={inputClass} placeholder="jane@example.com" value={emailId} onChange={(e) => { setEmail(e.target.value); clearError(); }} />
            </div>

            <div className="form-control">
              <label className={labelClass}><span className={labelTextClass}>Password <span className="text-rose-400">*</span></span></label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`${inputClass} pr-11`}
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError(); }}
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

            <div className="form-control">
              <label className={labelClass}><span className={labelTextClass}>Age</span></label>
              <input type="number" className={inputClass} placeholder="25" value={age} onChange={(e) => setAge(e.target.value)} />
            </div>

            <div className="form-control">
              <label className={labelClass}><span className={labelTextClass}>Gender</span></label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className={`select select-bordered w-full bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm`}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className="form-control sm:col-span-2">
              <label className={labelClass}><span className={labelTextClass}>Photo URL</span></label>
              <input type="url" className={inputClass} placeholder="https://example.com/photo.jpg" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
            </div>

            <div className="form-control sm:col-span-2">
              <label className={labelClass}><span className={labelTextClass}>Skills <span className="text-slate-400 font-normal">(comma separated)</span></span></label>
              <input type="text" className={inputClass} placeholder="React, Node.js, Tailwind..." value={skills} onChange={(e) => setSkills(e.target.value)} />
            </div>

            <div className="form-control sm:col-span-2">
              <label className={labelClass}><span className={labelTextClass}>About / Bio</span></label>
              <textarea className="textarea textarea-bordered w-full bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm resize-none h-24" placeholder="Tell us about your coding journey..." value={about} onChange={(e) => setAbout(e.target.value)} />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="btn border-none bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white w-full shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all font-semibold rounded-xl mt-8 py-3 h-auto text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={signInHandler}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="loading loading-spinner loading-sm" /> Creating account...
              </span>
            ) : 'Create Account'}
          </motion.button>

          <p className="text-center mt-6 text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:text-fuchsia-500 transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Signup;
