import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/Constant'
import { useDispatch } from 'react-redux'
import { removeFeed } from '../utils/feedSlice'

const UserFeedCard = ({user}) => {
    const {firstName,lastName,photoUrl,about,skills,age,gender}=user
    const dispatch=useDispatch();
    const ignoreHandler=async(id)=>{
   try {
       const res=await axios.post(BASE_URL+"/request/send/ignored/"+id,{},{withCredentials:true})
      dispatch(removeFeed(id));
   } catch (error) {
    console.log(error);
   }  
    }


    const  interestedHandler=async(id)=>{
      try {
        const res=await axios.post(BASE_URL+"/request/send/interested/"+id,{},{withCredentials:true})
      dispatch(removeFeed(id));
      } catch (error) {
        console.log(error);
      }
    }
   
      return (
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure className='h-100'>
    <img
      src={photoUrl||"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"}
      alt="Shoes"/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {age&&<p>{age}</p>}
    {gender&&<p>{gender}</p>}
    <p>{about}</p>
    {skills&&<p>{skills}</p>}
    <div className="card-actions justify-between">
      <button className="btn btn-primary" onClick={()=>ignoreHandler(user._id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={()=>interestedHandler(user._id)}>Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserFeedCard