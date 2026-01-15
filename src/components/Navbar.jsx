import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { removeUser } from "../utils/userSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <div className="navbar bg-base-300 shadow-sm px-4 sm:px-6 lg:px-8">
      <div className="flex-1">
        <Link to={user ? '/' : '/login'} className="btn btn-ghost text-lg sm:text-xl">
          👩‍💻 DevTinder
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 sm:w-12 rounded-full">
                <img
                  alt="User Photo"
                  src={user.photoUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/195px-Heart_coraz%C3%B3n.svg.png?20110326231420"}
                />
              </div>
            </div>

            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={'/'} className="justify-between">Home</Link>
              </li>
              <li>
                <Link to={'/profile'} className="justify-between">Profile</Link>
              </li>
              <li>
                <Link to={'/connections'}>Connections</Link>
              </li>
              <li>
                <Link to={'/requests'}>Requests</Link>
              </li>
              <li>
                <Link to={'/premium'}>Premium</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="w-full text-left">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
