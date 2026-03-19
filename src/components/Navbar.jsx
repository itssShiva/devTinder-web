import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { removeUser } from "../utils/userSlice";
import { toast } from "react-toastify";
import { Home, User as UserIcon, Users, Bell, Star, LogOut, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
      dispatch(removeUser());
      toast.info("Logged out successfully");
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}
    >
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? 'w-full px-0' : 'w-[95%]'}`}>
        <div className={`navbar transition-all duration-300 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-red-500/10 shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
            : 'glass-panel'
        } px-4 sm:px-6`}>
          <div className="flex-1">
            <Link to={user ? '/' : '/login'} className="btn btn-ghost hover:bg-transparent px-2 group">
              <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                <Code2 className="w-8 h-8 text-red-500" />
              </motion.div>
              <span className="text-xl sm:text-2xl font-black tracking-tight gradient-text group-hover:opacity-80 transition-opacity ml-1">
                DevTinder
              </span>
            </Link>
          </div>

          {user && (
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar ring-2 ring-red-500/20 ring-offset-2 ring-offset-black hover:ring-red-500/50 transition-all"
                >
                  <div className="w-10 sm:w-11 rounded-full shadow-md shadow-red-900/30">
                    <img
                      alt="User Photo"
                      src={user.photoUrl || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg"}
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-zinc-950/95 backdrop-blur-xl border border-red-500/10 rounded-2xl z-[100] mt-4 w-56 p-3 shadow-[0_16px_48px_rgba(0,0,0,0.7),_0_0_0_1px_rgba(239,68,68,0.08)] gap-1"
                >
                  <div className="px-4 py-3 mb-2 border-b border-zinc-800">
                    <p className="font-semibold text-sm truncate text-slate-100">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-slate-500 truncate">Developer</p>
                  </div>
                  <li><Link to={'/'} className="hover:bg-red-500/10 hover:text-red-400 text-slate-300 rounded-xl py-2.5 transition-colors"><Home className="w-4 h-4 mr-2" />Home</Link></li>
                  <li><Link to={'/profile'} className="hover:bg-red-500/10 hover:text-red-400 text-slate-300 rounded-xl py-2.5 transition-colors"><UserIcon className="w-4 h-4 mr-2" />Profile</Link></li>
                  <li><Link to={'/connections'} className="hover:bg-red-500/10 hover:text-red-400 text-slate-300 rounded-xl py-2.5 transition-colors"><Users className="w-4 h-4 mr-2" />Connections</Link></li>
                  <li><Link to={'/requests'} className="hover:bg-red-500/10 hover:text-red-400 text-slate-300 rounded-xl py-2.5 transition-colors"><Bell className="w-4 h-4 mr-2" />Requests</Link></li>
                  <li><Link to={'/premium'} className="hover:bg-amber-500/10 hover:text-amber-400 text-slate-300 rounded-xl py-2.5 transition-colors"><Star className="w-4 h-4 mr-2" />Premium</Link></li>
                  <div className="divider my-1 h-[1px] bg-zinc-800" />
                  <li><button onClick={handleLogout} className="text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-xl py-2.5 transition-colors w-full text-left flex items-center"><LogOut className="w-4 h-4 mr-2" />Logout</button></li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
