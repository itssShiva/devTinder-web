import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequests } from '../utils/requestSlice'
import { toast } from 'react-toastify'

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const rejectHandler = async (id) => {
    await axios.post(BASE_URL + "/request/review/rejected/" + id, {}, { withCredentials: true });
    dispatch(removeRequests(id));
    toast.error("Request Rejected!!");
  }

  const acceptHandler = async (id) => {
    await axios.post(BASE_URL + "/request/review/accepted/" + id, {}, { withCredentials: true });
    dispatch(removeRequests(id));
    toast.success("Request Accepted!!");
  }

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/request/received', { withCredentials: true });
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => { fetchRequests() }, []);

  if (requests.length < 1) 
    return (
      <h1 className='flex justify-center my-40 text-3xl underline text-center'>
        No Requests Found 💔
      </h1>
    );

  return (
    <div className='flex flex-col items-center gap-6 px-4 sm:px-6 lg:px-8 my-10'>
      {requests.map((user) => (
        <div 
          key={user._id} 
          className='bg-base-300 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center p-6 rounded-2xl w-full max-w-lg shadow-md'
        >
          <figure className='h-32 w-32 sm:h-36 sm:w-36 rounded-full overflow-hidden flex-shrink-0'>
            <img src={user.fromUserId.photoUrl} alt="user photo" className='object-cover w-full h-full' />
          </figure>

          <div className='flex flex-col flex-1 gap-2 sm:gap-3 text-center sm:text-left'>
            <p className='text-xl sm:text-2xl font-semibold underline'>
              {user.fromUserId.firstName + " " + user.fromUserId.lastName}
            </p>
            <p className='text-sm sm:text-base'>Age: {user.fromUserId.age}</p>
            <p className='text-sm sm:text-base'>Gender: {user.fromUserId.gender}</p>
            <p className='text-sm sm:text-base'>About: {user.fromUserId.about}</p>

            <div className='flex flex-col sm:flex-row gap-3 mt-2 sm:mt-4 justify-center sm:justify-start'>
              <button className="btn btn-outline btn-secondary flex-1 sm:flex-none" onClick={() => rejectHandler(user._id)}>
                Reject
              </button>
              <button className="btn btn-outline btn-success flex-1 sm:flex-none" onClick={() => acceptHandler(user._id)}>
                Accept
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Requests;
