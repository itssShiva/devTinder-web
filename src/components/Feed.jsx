import React from 'react';
import { useSelector } from 'react-redux';
import UserFeedCard from './UserFeedCard';
import { motion } from 'framer-motion';
import { Sparkles, Compass } from 'lucide-react';

const Feed = () => {
  const feed = useSelector((store) => store.feed);

  if (!feed) return null;

  if (feed.length <= 0) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-red-500/20 blur-2xl rounded-full" />
          <div className="relative glass-panel p-8 sm:p-12 flex flex-col items-center max-w-md">
            <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-900/40 rotate-12">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-100 mb-4 tracking-tight">All Caught Up!</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              You've seen everyone around you for now. Check back later or expand your search to discover more developers.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="btn btn-gradient px-8 h-12 min-h-0 text-base"
            >
              Refresh Feed
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] px-4 flex flex-col items-center justify-start pt-10 pb-20 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-40 right-[15%] w-96 h-96 bg-red-900/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 z-10"
      >
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-red-500/20 shadow-lg shadow-red-950/20">
          <Compass className="w-4 h-4 text-red-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Discover Developers</span>
        </div>
      </motion.div>

      <div className="w-full max-w-md relative z-10">
        <UserFeedCard user={feed[0]} />
      </div>

      <p className="mt-8 text-zinc-500 text-sm font-medium animate-bounce z-10">
        Swipe right to connect, left to ignore
      </p>
    </div>
  );
};

export default Feed;