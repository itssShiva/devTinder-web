import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/Constant';
import { addFeed } from '../utils/feedSlice';
import UserFeedCard from './userFeedCard';

const Feed = () => {

  const dispatch=useDispatch();
  const feed=useSelector((store)=>store.feed);
  const getFeed=async()=>{
    try {
      if(feed &&feed.length>0) return ;
      const res= await axios.get(BASE_URL+"/feed",{withCredentials:true});
  
      dispatch(addFeed(res?.data))
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getFeed();
  },[])
  if(feed.length<1) return  <h1 className='flex justify-center my-40 text-3xl underline'>Nothing Left 💔</h1>;
  
  return (
    <div className='flex justify-center my-10'>
      {feed && feed.length>0&&<UserFeedCard user={feed[0]}/>}
    </div>
  )
}

export default Feed