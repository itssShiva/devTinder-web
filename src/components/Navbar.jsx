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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
      dispatch(removeUser());
      toast.info("Logout successfully");
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}
    >
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? 'w-full px-0 sm:px-0 lg:px-0' : 'w-[95%]'}`}>
        <div className={`navbar shadow-sm transition-all duration-300 ${scrolled ? 'bg-white/70 backdrop-blur-lg border-b border-white/20' : 'glass-panel'} px-4 sm:px-6`}>
          <div className="flex-1">
            <Link to={user ? '/' : '/login'} className="btn btn-ghost hover:bg-transparent px-2 group">
              <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                <Code2 className="w-8 h-8 text-primary" />
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
                  className="btn btn-ghost btn-circle avatar ring ring-primary/20 ring-offset-base-100 ring-offset-2 hover:ring-primary/50 transition-all"
                >
                  <div className="w-10 sm:w-11 rounded-full shadow-md">
                    <img
                      alt="User Photo"
                      src={user.photoUrl || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg"}
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl z-[100] mt-4 w-56 p-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] gap-1"
                >
                  <div className="px-4 py-3 mb-2 border-b border-base-200">
                    <p className="font-semibold text-sm truncate">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-base-content/60 truncate opacity-80">Developer</p>
                  </div>
                  <li><Link to={'/'} className="hover:bg-primary/10 hover:text-primary rounded-xl py-2.5 transition-colors"><Home className="w-4 h-4 mr-2" />Home</Link></li>
                  <li><Link to={'/profile'} className="hover:bg-primary/10 hover:text-primary rounded-xl py-2.5 transition-colors"><UserIcon className="w-4 h-4 mr-2" />Profile</Link></li>
                  <li><Link to={'/connections'} className="hover:bg-secondary/10 hover:text-secondary rounded-xl py-2.5 transition-colors"><Users className="w-4 h-4 mr-2" />Connections</Link></li>
                  <li><Link to={'/requests'} className="hover:bg-accent/10 hover:text-accent rounded-xl py-2.5 transition-colors"><Bell className="w-4 h-4 mr-2" />Requests</Link></li>
                  <li><Link to={'/premium'} className="hover:bg-amber-500/10 hover:text-amber-600 rounded-xl py-2.5 transition-colors"><Star className="w-4 h-4 mr-2" />Premium</Link></li>
                  <div className="divider my-1 h-[1px]"></div>
                  <li><button onClick={handleLogout} className="text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl py-2.5 transition-colors"><LogOut className="w-4 h-4 mr-2" />Logout</button></li>
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
