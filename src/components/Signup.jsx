import React, { useState } from 'react';
import { BASE_URL } from '../utils/Constant';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { motion } from 'framer-motion';

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [skills, setSkills] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [gender, setGender] = useState("male");
  const [about, setAbout] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();

  const signInHandler = async () => {
    try {
      const res = await axios.post(BASE_URL + '/signup', {
        firstName,
        lastName,
        emailId,
        password,
        age,
        skills,
        photoUrl,
        gender,
        about,
      }, { withCredentials: true });
      toast.success('User Registered Successfully!');
      navigate('/login');
    } catch (error) {
      setError(error?.response?.data || "Something went wrong during signup");
    }
  }

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
        {/* Decorative background blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="z-10 relative">
          <h2 className="text-3xl sm:text-4xl font-black mb-2 text-center gradient-text">Create Account</h2>
          <p className="text-center text-slate-500 mb-8 max-w-sm mx-auto">Join the best community for developers to connect, share, and collaborate.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-control hover:shadow-sm transition-shadow">
              <label className={labelClass}><span className={labelTextClass}>First Name</span></label>
              <input type="text" className={inputClass} placeholder="Jane" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>

            <div className="form-control">
              <label className={labelClass}><span className={labelTextClass}>Last Name</span></label>
              <input type="text" className={inputClass} placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>

            <div className="form-control">
              <label className={labelClass}><span className={labelTextClass}>Email ID</span></label>
              <input type="email" className={inputClass} placeholder="jane@example.com" value={emailId} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="form-control">
              <label className={labelClass}><span className={labelTextClass}>Password</span></label>
              <input type="password" className={inputClass} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
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
              <label className={labelClass}><span className={labelTextClass}>Skills (comma separated)</span></label>
              <input type="text" className={inputClass} placeholder="React, Node.js, Tailwind..." value={skills} onChange={(e) => setSkills(e.target.value)} />
            </div>

            <div className="form-control sm:col-span-2">
              <label className={labelClass}><span className={labelTextClass}>About / Bio</span></label>
              <textarea className="textarea textarea-bordered w-full bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-sm resize-none h-24" placeholder="Tell us about your coding journey..." value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl border border-red-100"
            >
              {error}
            </motion.p>
          )}

          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="btn border-none bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white w-full shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all font-semibold rounded-xl mt-8 py-3 h-auto text-lg" 
            onClick={signInHandler}
          >
            Create Account
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
