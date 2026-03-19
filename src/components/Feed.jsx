import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/Constant';
import { addFeed } from '../utils/feedSlice';
import UserFeedCard from './UserFeedCard';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      if (feed && feed.length > 0) return;
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res?.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFeed();
  }, [])

  if (feed.length < 1) return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-4 px-4 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center mb-2"
      >
        <Sparkles className="w-12 h-12 text-violet-400" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-slate-700 mb-2">You're All Caught Up!</h2>
        <p className="text-slate-500 max-w-xs">Come back later to discover more developers in your feed.</p>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-10 px-4 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/8 rounded-full blur-3xl pointer-events-none" />

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-6 bg-white/60 px-4 py-1.5 rounded-full shadow-sm border border-white/40"
      >
        Discover Developers
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full relative z-10"
      >
        {feed && feed.length > 0 && <UserFeedCard user={feed[0]} />}
      </motion.div>
    </div>
  )
}

export default Feed;