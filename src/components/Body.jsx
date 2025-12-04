import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import {BASE_URL} from '../utils/Constant'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const fetchUser=async()=>{
    try {
      const res=await axios.get(BASE_URL+'/profile/view',{
      withCredentials:true,
    })
    dispatch(addUser(res.data));
    } catch (error) {
        if(error.status===401){
          navigate('/login');
        }
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchUser();
  },[])
  return (
    <div>

    <Navbar/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default Body