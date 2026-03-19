import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/Constant'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Check, Sparkles, Star, Zap } from 'lucide-react'

const features = {
  silver: [
    'Chat with other developers',
    '100 connection requests per day',
    'Blue tick verification',
    'Valid for 3 months',
  ],
  gold: [
    'Chat with other developers',
    'Unlimited connection requests',
    'Blue tick verification',
    'Profile boost & priority discovery',
    'Valid for 6 months',
  ],
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.15 },
  }),
};

const Premium = () => {
  const [isUserPremium, setUserPremium] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + '/premium/verify', { withCredentials: true });
      if (res?.data?.isPremium) setUserPremium(true);
    } catch (err) {
      console.log(err);
    }
  }

  const handleBuy = async (type) => {
    try {
      const res = await axios.post(BASE_URL + '/payment/create', {
        membershipType: type
      }, { withCredentials: true });

      const options = {
        key: res?.data?.key,
        amount: res?.data?.order?.amount,
        currency: 'INR',
        name: 'Dev Tinder',
        description: 'Become a Premium Developer',
        order_id: res?.data?.order?.id,
        prefill: {
          name: res?.data?.order?.notes?.firstName + " " + res?.data?.order?.notes?.lastName,
          email: res?.data?.order?.notes?.emailId,
          contact: '9999999999'
        },
        theme: { color: '#8b5cf6' },
        handler: verifyPremiumUser
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
    }
  }

  if (isUserPremium) return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-4 px-4 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center mb-2"
      >
        <Star className="w-12 h-12 text-amber-400 fill-amber-400" />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-2xl sm:text-3xl font-black gradient-text mb-2">You're a Premium Member!</h2>
        <p className="text-slate-500 max-w-sm">Sit tight — something amazing is cooking just for you! 🚀</p>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8 py-10 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 border border-amber-300/30 text-amber-600 rounded-full px-4 py-1.5 text-sm font-semibold mb-4 shadow-sm">
            <Sparkles className="w-4 h-4" /> Upgrade Your Experience
          </div>
          <h1 className="text-3xl sm:text-5xl font-black gradient-text mb-3">Go Premium</h1>
          <p className="text-slate-500 max-w-md mx-auto">Unlock powerful features and connect with more developers across the platform.</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center items-stretch gap-6">
          {/* Silver Card */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="show"
            className="glass-panel p-6 sm:p-8 w-full sm:w-80 flex flex-col hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center shadow-sm">
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Silver</h2>
              </div>
            </div>
            <div className="flex items-baseline gap-1 mb-6 mt-3">
              <span className="text-3xl sm:text-4xl font-black text-slate-800">₹300</span>
              <span className="text-slate-400 text-sm font-medium">/ 3 months</span>
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {features.silver.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleBuy('silver')}
              className="btn border-none bg-gradient-to-r from-slate-500 to-slate-700 text-white w-full shadow-md hover:shadow-lg transition-all font-semibold rounded-xl h-auto py-3"
            >
              Get Silver
            </motion.button>
          </motion.div>

          {/* Gold Card */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="show"
            className="relative glass-panel p-6 sm:p-8 w-full sm:w-80 flex flex-col ring-2 ring-amber-400/40 shadow-[0_0_40px_rgba(251,191,36,0.12)] hover:shadow-[0_0_60px_rgba(251,191,36,0.2)] transition-shadow duration-300"
          >
            {/* Popular badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-yellow-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md flex items-center gap-1 whitespace-nowrap">
              <Zap className="w-3 h-3 fill-white" /> Most Popular
            </div>

            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-sm">
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Gold</h2>
              </div>
            </div>
            <div className="flex items-baseline gap-1 mb-6 mt-3">
              <span className="text-3xl sm:text-4xl font-black text-slate-800">₹700</span>
              <span className="text-slate-400 text-sm font-medium">/ 6 months</span>
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {features.gold.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-amber-600 stroke-[3]" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleBuy('gold')}
              className="btn border-none bg-gradient-to-r from-amber-400 to-yellow-500 text-white w-full shadow-md shadow-amber-400/30 hover:shadow-amber-400/50 transition-all font-semibold rounded-xl h-auto py-3"
            >
              Get Gold
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Premium;
