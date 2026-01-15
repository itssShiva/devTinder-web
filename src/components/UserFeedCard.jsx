import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/Constant'
import { useDispatch } from 'react-redux'
import { removeFeed } from '../utils/feedSlice'

const UserFeedCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about, skills, age, gender } = user
  const dispatch = useDispatch();

  const ignoreHandler = async (id) => {
    try {
      await axios.post(BASE_URL + "/request/send/ignored/" + id, {}, { withCredentials: true })
      dispatch(removeFeed(id));
    } catch (error) {
      console.log(error);
    }
  }

  const interestedHandler = async (id) => {
    try {
      await axios.post(BASE_URL + "/request/send/interested/" + id, {}, { withCredentials: true })
      dispatch(removeFeed(id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="card bg-base-300 w-full max-w-sm sm:max-w-md lg:max-w-lg shadow-md mx-auto flex flex-col sm:flex-row overflow-hidden">
      <figure className="sm:w-1/3 h-64 sm:h-auto">
        <img
          src={photoUrl || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"}
          alt={firstName + " " + lastName}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body flex-1 flex flex-col justify-between p-4 sm:p-6">
        <div>
          <h2 className="card-title text-xl sm:text-2xl">{firstName + " " + lastName}</h2>
          {age && <p className="text-sm sm:text-base">Age: {age}</p>}
          {gender && <p className="text-sm sm:text-base">Gender: {gender}</p>}
          {about && <p className="mt-2 text-sm sm:text-base">{about}</p>}
          {skills && <p className="mt-1 text-sm sm:text-base">Skills: {skills}</p>}
        </div>
        <div className="card-actions justify-between mt-4">
          <button className="btn btn-primary w-1/2 sm:w-auto" onClick={() => ignoreHandler(user._id)}>Ignore</button>
          <button className="btn btn-secondary w-1/2 sm:w-auto" onClick={() => interestedHandler(user._id)}>Interested</button>
        </div>
      </div>
    </div>
  )
}

export default UserFeedCard
