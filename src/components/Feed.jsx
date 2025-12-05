import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/Constant';
import { addFeed } from '../utils/feedSlice';

const Feed = () => {

  const dispatch=useDispatch();
  const feed=useSelector((store)=>store.feed);
  const getFeed=async()=>{
    try {
      if(feed) return;
      const res= await axios.get(BASE_URL+"/feed",{withCredentials:true});
      console.log(res.data);
      dispatch(addFeed(res?.data))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getFeed();
  },[])
  
  return (
    <div>Feed</div>
  )
}

export default Feed