import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequests } from '../utils/requestSlice'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { Bell, Check, X, Code2 } from 'lucide-react'

const toSkillsArray = (skills) => {
  if (!skills) return [];
  if (Array.isArray(skills)) return skills;
  return skills.split(',').map((s) => s.trim()).filter(Boolean);
};

const containerVariants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const rejectHandler = async (id) => {
    await axios.post(BASE_URL + "/request/review/rejected/" + id, {}, { withCredentials: true });
    dispatch(removeRequests(id));
    toast.error("Request Rejected!!");
  }

  const acceptHandler = async (id) => {
    await axios.post(BASE_URL + "/request/review/accepted/" + id, {}, { withCredentials: true });
    dispatch(removeRequests(id));
    toast.success("Request Accepted!!");
  }

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/request/received', { withCredentials: true });
      dispatch(addRequests(res?.data?.data));
    } catch (error) { console.log(error); }
  }

  useEffect(() => { fetchRequests() }, []);

  if (requests.length < 1)
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-red-950/60 border border-red-800/30 flex items-center justify-center mb-2">
          <Bell className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-200">No Pending Requests</h2>
        <p className="text-slate-500 max-w-xs">When developers are interested in connecting with you, they'll appear here.</p>
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8 py-10 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-72 h-72 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-red-800/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-black gradient-text mb-1">Connection Requests</h1>
          <p className="text-slate-500 text-sm">{requests.length} pending request{requests.length !== 1 ? 's' : ''}</p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-4">
          {requests.map((user) => {
            const sender = user.fromUserId;
            const skillList = toSkillsArray(sender?.skills).slice(0, 3);
            return (
              <motion.div variants={cardVariants} key={user._id}
                className="glass-panel p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 hover:shadow-[0_12px_48px_rgba(0,0,0,0.6),_0_0_0_1px_rgba(239,68,68,0.1)] transition-shadow duration-300 group">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-2 ring-red-500/15 ring-offset-2 ring-offset-black group-hover:ring-red-500/40 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                    <img src={sender?.photoUrl || 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg'}
                      alt={sender?.firstName + ' ' + sender?.lastName} className="object-cover w-full h-full" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-100 capitalize">
                    {sender?.firstName} {sender?.lastName}
                    {sender?.age && <span className="text-slate-500 font-normal text-base ml-1.5">, {sender.age}</span>}
                  </h2>
                  {sender?.gender && (
                    <p className="text-xs text-slate-500 capitalize mt-0.5 flex items-center gap-1 justify-center sm:justify-start">
                      <Code2 className="w-3.5 h-3.5 text-red-500" /> Developer · {sender.gender}
                    </p>
                  )}
                  {sender?.about && <p className="text-sm text-slate-400 mt-2 line-clamp-2">{sender.about}</p>}
                  {skillList.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                      {skillList.map((skill, i) => (
                        <span key={i} className="px-2.5 py-0.5 bg-red-500/10 text-red-400 rounded-full text-xs font-semibold border border-red-500/20">{skill}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex flex-row sm:flex-col gap-3 flex-shrink-0">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => rejectHandler(user._id)}
                    className="btn btn-circle w-11 h-11 bg-zinc-900 border-2 border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:border-zinc-600 shadow-[0_4px_12px_rgba(0,0,0,0.4)] transition-colors flex items-center justify-center">
                    <X className="w-5 h-5 stroke-[2.5]" />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => acceptHandler(user._id)}
                    className="btn btn-circle w-11 h-11 border-none text-white shadow-[0_4px_14px_rgba(185,28,28,0.4)] hover:shadow-[0_4px_20px_rgba(185,28,28,0.6)] transition-all flex items-center justify-center"
                    style={{ backgroundImage: 'linear-gradient(135deg, #b91c1c, #ef4444)' }}>
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default Requests;
