import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../utils/Constant';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { X, Heart, Code2 } from 'lucide-react';

const toSkillsArray = (skills) => {
  if (!skills) return [];
  if (Array.isArray(skills)) return skills;
  return skills.split(',').map((s) => s.trim()).filter(Boolean);
};

const UserFeedCard = ({ user, isPreview = false }) => {
  const { firstName, lastName, photoUrl, about, skills, age, gender } = user || {};
  const dispatch = useDispatch();
  const controls = useAnimation();
  const [exitX, setExitX] = useState(0);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -100], [0, 1]);

  const ignoreHandler = async (id) => {
    if (isPreview) return;
    try {
      if (id) {
        await axios.post(BASE_URL + "/request/send/ignored/" + id, {}, { withCredentials: true });
        dispatch(removeFeed(id));
      }
    } catch (error) { console.log(error); }
  };

  const interestedHandler = async (id) => {
    if (isPreview) return;
    try {
      if (id) {
        await axios.post(BASE_URL + "/request/send/interested/" + id, {}, { withCredentials: true });
        dispatch(removeFeed(id));
      }
    } catch (error) { console.log(error); }
  };

  const handleDragEnd = async (event, info) => {
    if (isPreview) return;
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const threshold = 100;
    if (offset > threshold || velocity > 500) {
      setExitX(300);
      await controls.start({ x: 300, opacity: 0, transition: { duration: 0.3 } });
      interestedHandler(user._id);
    } else if (offset < -threshold || velocity < -500) {
      setExitX(-300);
      await controls.start({ x: -300, opacity: 0, transition: { duration: 0.3 } });
      ignoreHandler(user._id);
    } else {
      controls.start({ x: 0, y: 0, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
    }
  };

  const handleButtonAction = async (type) => {
    if (isPreview) return;
    const isLike = type === 'like';
    const targetX = isLike ? 300 : -300;
    setExitX(targetX);
    await controls.start({ x: targetX, opacity: 0, rotate: isLike ? 15 : -15, transition: { duration: 0.3 } });
    if (isLike) interestedHandler(user._id);
    else ignoreHandler(user._id);
  };

  const skillList = toSkillsArray(skills);

  return (
    <motion.div
      className="relative z-10 mx-auto w-full max-w-sm sm:max-w-md lg:max-w-md h-[450px] sm:h-[550px]"
      style={{ x, rotate }}
      drag={!isPreview ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={controls}
      whileHover={{ scale: isPreview ? 1.02 : 1, rotateX: isPreview ? 2 : 0, rotateY: isPreview ? -2 : 0 }}
      whileTap={{ cursor: !isPreview ? 'grabbing' : 'default' }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className={`cursor-${isPreview ? 'default' : 'grab'} active:cursor-${isPreview ? 'default' : 'grabbing'} card glass-panel shadow-[0_24px_64px_rgba(0,0,0,0.7),_0_0_0_1px_rgba(239,68,68,0.08)] w-full h-full overflow-hidden flex flex-col group`}>

        {/* LIKE / NOPE overlays */}
        {!isPreview && (
          <>
            <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 z-20 pointer-events-none transform -rotate-12 border-4 border-red-400 text-red-400 font-black text-4xl sm:text-5xl px-4 py-1 rounded-xl shadow-[0_0_24px_rgba(239,68,68,0.4)] bg-black/20 backdrop-blur-sm">
              LIKE
            </motion.div>
            <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-8 z-20 pointer-events-none transform rotate-12 border-4 border-zinc-400 text-zinc-300 font-black text-4xl sm:text-5xl px-4 py-1 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] bg-black/20 backdrop-blur-sm">
              NOPE
            </motion.div>
          </>
        )}

        {/* Image Section */}
        <figure className="relative h-3/5 sm:h-2/3 overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-950">
          <img
            src={photoUrl || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg"}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            draggable="false"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

          <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 text-white text-left pointer-events-none">
            <h2 className="text-2xl sm:text-3xl font-bold flex items-end gap-2">
              {firstName} {lastName}
              {age && <span className="text-xl sm:text-2xl font-normal opacity-80">{age}</span>}
            </h2>
            {gender && <p className="text-sm font-medium opacity-70 capitalize mt-1 flex items-center gap-1.5"><Code2 className="w-4 h-4 text-red-400" /> Developer</p>}
          </div>
        </figure>

        {/* Info Section */}
        <div className="card-body p-4 sm:p-6 flex-1 flex flex-col justify-between bg-zinc-900/80 backdrop-blur-md">
          <div className="overflow-y-auto max-h-32 scrollbar-hide text-left flex-1">
            {about
              ? <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{about}</p>
              : <p className="text-zinc-600 text-sm italic">No bio provided</p>
            }
            {skillList.length > 0 && (
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                {skillList.slice(0, 4).map((skill, index) => (
                  <span key={index} className="px-2.5 py-1 bg-red-500/10 text-red-400 rounded-full text-xs font-semibold border border-red-500/20">{skill}</span>
                ))}
                {skillList.length > 4 && (
                  <span className="px-2.5 py-1 bg-zinc-800 text-zinc-400 rounded-full text-xs font-semibold border border-zinc-700">+{skillList.length - 4}</span>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {!isPreview && (
            <div className="flex justify-center gap-6 mt-4 pt-2 border-t border-white/5">
              <motion.button
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="btn btn-circle btn-lg w-14 h-14 sm:w-16 sm:h-16 bg-zinc-900 border-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-500 shadow-[0_8px_20px_rgba(0,0,0,0.4)] flex justify-center items-center transition-colors"
                onClick={() => handleButtonAction('ignore')}
              >
                <X className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="btn btn-circle btn-lg w-14 h-14 sm:w-16 sm:h-16 border-none text-white shadow-[0_8px_24px_rgba(185,28,28,0.4)] flex justify-center items-center transition-all hover:shadow-[0_8px_32px_rgba(185,28,28,0.6)]"
                style={{ backgroundImage: 'linear-gradient(135deg, #b91c1c, #ef4444)' }}
                onClick={() => handleButtonAction('like')}
              >
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 fill-white stroke-white" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default UserFeedCard;
