import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/Constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;
  if (connections.length === 0)
    return (
      <h1 className="flex justify-center my-40 text-3xl underline text-center">
        No Connections Found 💔
      </h1>
    );

  return (
    <div className="flex flex-col items-center gap-6 px-4 sm:px-6 lg:px-8 mt-4 pb-10">
      {connections.map((user) => (
        <div
          className="card bg-base-300 shadow-sm w-full max-w-md sm:max-w-lg lg:max-w-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4"
          key={user._id}
        >
          <figure className="h-24 w-24 sm:h-32 sm:w-32 rounded-full overflow-hidden">
            <img src={user.photoUrl} alt={user.firstName + ' ' + user.lastName} className="object-cover w-full h-full" />
          </figure>
          <div className="card-body flex-1 text-center sm:text-left">
            <h2 className="card-title text-xl sm:text-2xl underline capitalize">
              {user.firstName + " " + user.lastName}
            </h2>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <p>About: {user.about}</p>
            <p>Skills: {user.skills}</p>
            <div className="mt-4 sm:mt-6 flex justify-center sm:justify-start">
              <Link to={'/chat/' + user._id}>
                <button className="btn btn-secondary">Chat</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
