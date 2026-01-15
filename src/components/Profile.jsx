import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserFeedCard from './UserFeedCard';
import axios from 'axios';
import { BASE_URL } from '../utils/Constant';
import { addUser } from '../utils/userSlice';
import { toast } from 'react-toastify';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [skills, setSkills] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [gender, setGender] = useState("male");
  const [about, setAbout] = useState("");
  const [error, setError] = useState();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setSkills(user.skills || "");
      setPhotoUrl(user.photoUrl || "");
      setAbout(user.about || "");
      setGender(user.gender || "male");
    }
  }, [user]);

  const updateHandler = async () => {
    try {
      const res = await axios.patch(BASE_URL + '/profile/edit', {
        firstName,
        lastName,
        age,
        skills,
        photoUrl,
        about,
        gender,
      }, { withCredentials: true });

      dispatch(addUser(res?.data?.data));
      toast.success("Profile updated successfully!!");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  }

  if (!user) return null;

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-6 px-4 sm:px-6 lg:px-8 my-10">
      
      {/* Profile Form */}
      <div className="card w-full lg:w-96 bg-base-300 shadow-sm flex-shrink-0">
        <div className="card-body">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center underline">Profile</h2>

          <fieldset className="fieldset mb-2">
            <legend className="fieldset-legend text-base sm:text-lg">First Name:</legend>
            <input type="text" className="input w-full" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </fieldset>

          <fieldset className="fieldset mb-2">
            <legend className="fieldset-legend text-base sm:text-lg">Last Name:</legend>
            <input type="text" className="input w-full" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </fieldset>

          <fieldset className="fieldset mb-2">
            <legend className="fieldset-legend text-base sm:text-lg">Age:</legend>
            <input type="text" className="input w-full" value={age} onChange={(e) => setAge(e.target.value)} />
          </fieldset>

          <fieldset className="fieldset mb-2">
            <legend className="fieldset-legend text-base sm:text-lg">Gender:</legend>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="input w-full bg-base-300 text-white">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </fieldset>

          <fieldset className="fieldset mb-2">
            <legend className="fieldset-legend text-base sm:text-lg">Photo URL:</legend>
            <input type="text" className="input w-full" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
          </fieldset>

          <fieldset className="fieldset mb-2">
            <legend className="fieldset-legend text-base sm:text-lg">About:</legend>
            <input type="text" className="input w-full" value={about} onChange={(e) => setAbout(e.target.value)} />
          </fieldset>

          <fieldset className="fieldset mb-2">
            <legend className="fieldset-legend text-base sm:text-lg">Skills:</legend>
            <input type="text" className="input w-full" value={skills} onChange={(e) => setSkills(e.target.value)} />
          </fieldset>

          {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}

          <div className="flex justify-center mt-4">
            <button className="btn btn-primary w-full sm:w-2/3" onClick={updateHandler}>
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* UserFeedCard */}
      <div className="w-full lg:w-96 flex-shrink-0">
        <UserFeedCard user={{ firstName, lastName, age, skills, about, photoUrl }} />
      </div>

    </div>
  )
}

export default Profile;
