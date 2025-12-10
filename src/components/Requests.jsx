import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../utils/requestSlice'

const Requests = () => {

    const dispatch=useDispatch();
    const requests=useSelector((store)=>store.request)

    const rejectHandler=async(id)=>{
        const res=await axios.post(BASE_URL+"/request/review/rejected/"+id,{},{withCredentials:true})
        console.log(res)
    }
    const fetchRequests=async()=>{
        
        try {
            const res=await axios.get(BASE_URL+'/user/request/received',{withCredentials:true})
            dispatch(addRequests(res?.data?.data))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{fetchRequests()},[]);
    if(requests.length<1) return null;

  return (
    <div className='flex flex-col  items-center my-25 gap-20 '>
        {requests.map((user)=>(
            <div className='bg-base-300 flex gap-7 justify-center items-center rounded-2xl p-8' key={user._id}>
            <figure className='h-full w-[200px] mx-2 my-2'>
                <img src={user.fromUserId.photoUrl} alt="user photo"></img>
            </figure>
            <div className='flex flex-col gap-4'>
                <p className='text-2xl underline'>{user.fromUserId.firstName+" "+user.fromUserId.lastName}</p>
            <p>{user.fromUserId.age}</p>
            <p>{user.fromUserId.gender}</p>
            <p>{user.fromUserId.about}</p>
             <div className='flex justify-between gap-15 '>
                <button className="btn btn-outline btn-secondary" onClick={()=>rejectHandler(user._id)}>Reject</button>
                <button className="btn btn-outline btn-success">Accept</button>
                
            </div>
            </div>
           
            </div>
            
        
        ))}
    </div>

  )
}

export default Requests