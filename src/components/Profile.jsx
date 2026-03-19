import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserFeedCard from './UserFeedCard';
import axios from 'axios';
import { BASE_URL } from '../utils/Constant';
import { addUser } from '../utils/userSlice';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [skills, setSkills] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [gender, setGender] = useState("male");
  const [about, setAbout] = useState("");
  const [error, setError] = useState();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setSkills(user.skills || "");
      setPhotoUrl(user.photoUrl || "");
      setAbout(user.about || "");
      setGender(user.gender || "male");
    }
  }, [user]);

  const updateHandler = async () => {
    try {
      const res = await axios.patch(BASE_URL + '/profile/edit', { firstName, lastName, age, skills, photoUrl, about, gender }, { withCredentials: true });
      dispatch(addUser(res?.data?.data));
      toast.success("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  }

  if (!user) return null;

  const inputClass = "input input-bordered w-full bg-zinc-900/60 border-zinc-700 text-slate-100 placeholder:text-zinc-500 focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/60 transition-all shadow-sm shadow-black/30";
  const labelClass = "label pb-1";
  const labelTextClass = "label-text font-semibold text-slate-300";

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row justify-center items-start gap-8 px-4 sm:px-6 lg:px-8 py-10 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-700/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-900/12 rounded-full blur-3xl pointer-events-none" />

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="card glass-panel w-full lg:w-[32rem] shadow-[0_24px_64px_rgba(0,0,0,0.6)] p-6 sm:p-8 relative z-10 flex-shrink-0"
      >
        <h2 className="text-3xl sm:text-4xl font-black mb-6 text-center gradient-text">Edit Profile</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control">
            <label className={labelClass}><span className={labelTextClass}>First Name</span></label>
            <input type="text" className={inputClass} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="form-control">
            <label className={labelClass}><span className={labelTextClass}>Last Name</span></label>
            <input type="text" className={inputClass} value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="form-control">
            <label className={labelClass}><span className={labelTextClass}>Age</span></label>
            <input type="number" className={inputClass} value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div className="form-control">
            <label className={labelClass}><span className={labelTextClass}>Gender</span></label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}
              className="select select-bordered w-full bg-zinc-900/60 border-zinc-700 text-slate-100 focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/60 transition-all shadow-sm shadow-black/30">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="form-control sm:col-span-2">
            <label className={labelClass}><span className={labelTextClass}>Photo URL</span></label>
            <input type="url" className={inputClass} value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
          </div>
          <div className="form-control sm:col-span-2">
            <label className={labelClass}><span className={labelTextClass}>Skills (comma separated)</span></label>
            <input type="text" className={inputClass} value={skills} onChange={(e) => setSkills(e.target.value)} />
          </div>
          <div className="form-control sm:col-span-2">
            <label className={labelClass}><span className={labelTextClass}>About / Bio</span></label>
            <textarea
              className="textarea textarea-bordered w-full bg-zinc-900/60 border-zinc-700 text-slate-100 placeholder:text-zinc-500 focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/60 transition-all shadow-sm shadow-black/30 resize-none h-24"
              value={about} onChange={(e) => setAbout(e.target.value)} />
          </div>
        </div>

        {error && <p className="text-red-400 mt-4 text-sm text-center bg-red-950/50 p-2 rounded-xl border border-red-800/40">{error}</p>}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn border-none w-full font-semibold rounded-xl mt-6 py-3 h-auto text-lg text-white shadow-[0_4px_24px_rgba(185,28,28,0.35)] hover:shadow-[0_4px_32px_rgba(185,28,28,0.55)] transition-all"
          style={{ backgroundImage: 'linear-gradient(135deg, #b91c1c, #ef4444)' }}
          onClick={updateHandler}
        >
          Save Profile
        </motion.button>
      </motion.div>

      {/* Preview */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        className="w-full lg:w-96 flex-shrink-0 z-10"
      >
        <div className="mb-4 text-center">
          <span className="text-sm font-semibold tracking-wider text-slate-500 uppercase bg-black/40 px-4 py-1.5 rounded-full border border-white/5">
            Profile Preview
          </span>
        </div>
        <UserFeedCard user={{ firstName, lastName, age, skills, about, photoUrl, gender, _id: user._id }} isPreview={true} />
      </motion.div>
    </div>
  );
}

export default Profile;
