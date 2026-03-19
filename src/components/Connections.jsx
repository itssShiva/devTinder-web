import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/Constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Code2 } from 'lucide-react';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center mb-2">
          <Users className="w-10 h-10 text-violet-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-700">No Connections Yet</h2>
        <p className="text-slate-500 max-w-xs">Start swiping on the feed to connect with fellow developers!</p>
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-80px)] px-4 sm:px-6 lg:px-8 py-10 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-violet-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-fuchsia-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-black gradient-text mb-1">My Connections</h1>
          <p className="text-slate-500 text-sm">{connections.length} developer{connections.length !== 1 ? 's' : ''} in your network</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4"
        >
          {connections.map((user) => {
            const skillList = user.skills ? user.skills.split(',').slice(0, 3) : [];
            return (
              <motion.div
                variants={cardVariants}
                key={user._id}
                className="glass-panel p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 hover:shadow-lg transition-shadow duration-300 group"
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-2 ring-primary/20 ring-offset-2 ring-offset-white group-hover:ring-primary/50 transition-all shadow-md">
                    <img
                      src={user.photoUrl || 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg'}
                      alt={user.firstName + ' ' + user.lastName}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full shadow-sm" />
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-800 capitalize">
                    {user.firstName} {user.lastName}
                    {user.age && <span className="text-slate-400 font-normal text-base ml-1.5">, {user.age}</span>}
                  </h2>
                  {user.gender && (
                    <p className="text-xs text-slate-500 capitalize mt-0.5 flex items-center gap-1 justify-center sm:justify-start">
                      <Code2 className="w-3.5 h-3.5" /> Developer · {user.gender}
                    </p>
                  )}
                  {user.about && <p className="text-sm text-slate-600 mt-2 line-clamp-2">{user.about}</p>}
                  {skillList.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                      {skillList.map((skill, i) => (
                        <span key={i} className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-semibold border border-primary/20">
                          {skill.trim()}
                        </span>
                      ))}
                      {user.skills?.split(',').length > 3 && (
                        <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 rounded-full text-xs font-semibold border border-slate-200">
                          +{user.skills.split(',').length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Chat Button */}
                <div className="flex-shrink-0">
                  <Link to={'/chat/' + user._id}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn border-none bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md shadow-violet-500/20 hover:shadow-violet-500/40 transition-all font-semibold rounded-xl flex items-center gap-2 px-5 py-2.5 h-auto"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Connections;
