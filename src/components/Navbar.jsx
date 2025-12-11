import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { removeUser } from "../utils/userSlice";
import { toast } from "react-toastify";
const Navbar = () => {
  const user=useSelector((store)=>store.user)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleLogout=async()=>{
try {
      const response=await axios.post(BASE_URL+'/logout',{},{withCredentials:true,});
      dispatch(removeUser());
      toast.info("Logout successfully");
      navigate('/login');

} catch (error) {
  console.log(error)
  toast.error(error.message)
}    
  }
  return (
    
 <div>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          {user?(<Link to={'/'} className="btn btn-ghost text-xl"> 👩‍💻DevTinder</Link>):(<Link to={'/login'} className="btn btn-ghost text-xl"> 👩‍💻DevTinder</Link>)}
        </div>
        {user&&<div className="flex gap-2">
          <div className="dropdown dropdown-end mx-8">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
            {user?(<div className="w-10 rounded-full">
                <img
                  alt="User Photo"
                  src={user.photoUrl}
                />
              </div>):(<div className="w-10 rounded-full">
                <img
                  alt="User Photo"
                  src={"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/195px-Heart_coraz%C3%B3n.svg.png?20110326231420"}
                />
              </div>)}
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={'/'} className="justify-between">
                  Home
                </Link>
              </li>
              <li>
                <Link to={'/profile'} className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to={'/connections'}>Connections</Link>
              </li>
              <li>
                <Link to={'/requests'}>Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Navbar;
