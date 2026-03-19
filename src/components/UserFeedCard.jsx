import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../utils/Constant';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { X, Heart, Code2 } from 'lucide-react';

const UserFeedCard = ({ user, isPreview = false }) => {
  const { firstName, lastName, photoUrl, about, skills, age, gender } = user || {};
  const dispatch = useDispatch();
  const controls = useAnimation();
  const [exitX, setExitX] = useState(0);

  const x = useMotionValue(0);
  // Map x drag distance to rotation
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  // Map x drag distance to overlay opacities
  const likeOpacity = useTransform(x, [20, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -100], [0, 1]);

  const ignoreHandler = async (id) => {
    if (isPreview) return;
    try {
      if (id) {
        await axios.post(BASE_URL + "/request/send/ignored/" + id, {}, { withCredentials: true });
        dispatch(removeFeed(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const interestedHandler = async (id) => {
    if (isPreview) return;
    try {
      if (id) {
        await axios.post(BASE_URL + "/request/send/interested/" + id, {}, { withCredentials: true });
        dispatch(removeFeed(id));
      }
    } catch (error) {
      console.log(error);
    }
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
      <div className={`cursor-${isPreview ? 'default' : 'grab'} active:cursor-${isPreview ? 'default' : 'grabbing'} card glass-panel shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] w-full h-full overflow-hidden flex flex-col group border border-white/40 ring-1 ring-black/5`}>
        
        {/* Absolute overlays for LIKE / NOPE */}
        {!isPreview && (
          <>
            <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 z-20 pointer-events-none transform -rotate-12 border-4 border-emerald-400 text-emerald-400 font-black text-4xl sm:text-5xl px-4 py-1 rounded-xl shadow-[0_0_20px_rgba(52,211,153,0.3)] bg-white/10 backdrop-blur-sm">
              LIKE
            </motion.div>
            <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-8 z-20 pointer-events-none transform rotate-12 border-4 border-rose-400 text-rose-400 font-black text-4xl sm:text-5xl px-4 py-1 rounded-xl shadow-[0_0_20px_rgba(251,113,133,0.3)] bg-white/10 backdrop-blur-sm">
              NOPE
            </motion.div>
          </>
        )}

        {/* Image Section */}
        <figure className="relative h-3/5 sm:h-2/3 overflow-hidden bg-gradient-to-br from-violet-100 to-fuchsia-100">
          <img
            src={photoUrl || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg"}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            draggable="false"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
          
          {/* Info overlaid on image */}
          <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 text-white text-left pointer-events-none">
            <h2 className="text-2xl sm:text-3xl font-bold flex items-end gap-2 text-shadow-sm">
              {firstName} {lastName}
              {age && <span className="text-xl sm:text-2xl font-normal opacity-90">{age}</span>}
            </h2>
            {gender && <p className="text-sm font-medium opacity-90 capitalize mt-1 text-shadow-sm flex items-center gap-1.5"><Code2 className="w-4 h-4"/> Developer</p>}
          </div>
        </figure>

        {/* Info Section */}
        <div className="card-body p-4 sm:p-6 flex-1 flex flex-col justify-between bg-white/70 backdrop-blur-md">
          <div className="overflow-y-auto max-h-32 scrollbar-hide text-left flex-1 relative z-10 mask-image-b group-hover:mask-image-none transition-all">
            {about ? (
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{about}</p>
            ) : (
              <p className="text-slate-400 text-sm italic">No bio provided</p>
            )}
            
            {skills && (
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                {skills.split(',').slice(0, 4).map((skill, index) => (
                  <span key={index} className="px-2.5 py-1 bg-primary/10 text-primary-focus rounded-full text-xs font-semibold border border-primary/20">{skill.trim()}</span>
                ))}
                {skills.split(',').length > 4 && (
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-semibold border border-slate-200">+{skills.split(',').length - 4}</span>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {!isPreview && (
            <div className="flex justify-center gap-6 mt-4 pt-2 border-t border-slate-200/50">
              <motion.button 
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="btn btn-circle btn-lg w-14 h-14 sm:w-16 sm:h-16 bg-white border-2 border-rose-200 text-rose-500 hover:bg-rose-50 hover:border-rose-300 shadow-[0_8px_20px_rgba(244,63,94,0.15)] flex justify-center items-center backdrop-blur-sm transition-colors" 
                onClick={() => handleButtonAction('ignore')}
              >
                <X className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" />
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="btn btn-circle btn-lg w-14 h-14 sm:w-16 sm:h-16 bg-white border-2 border-emerald-200 text-emerald-500 hover:bg-emerald-50 hover:border-emerald-300 shadow-[0_8px_20px_rgba(16,185,129,0.15)] flex justify-center items-center backdrop-blur-sm transition-colors" 
                onClick={() => handleButtonAction('like')}
              >
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 fill-emerald-500 stroke-emerald-500" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default UserFeedCard;
