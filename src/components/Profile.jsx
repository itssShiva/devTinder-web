import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserFeedCard from './userFeedCard';
import axios from 'axios';
import { BASE_URL } from '../utils/Constant';
import { addUser } from '../utils/userSlice';
import { toast } from 'react-toastify';

const Profile = () => {
  const dispatch=useDispatch();
  const user=useSelector((store)=>store.user);
  const[firstName,setFirstName]=useState("");
  const[lastName,setLastName]=useState("");
  const[age,setAge]=useState("");
  const[skills,setSkills]=useState("");
  const[photoUrl,setPhotoUrl]=useState("");
  const[gender,setGender]=useState("");
  const[about,setAbout]=useState("");
  const[error,setError]=useState();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setSkills(user.skills || "");
      setPhotoUrl(user.photoUrl || "");
      setAbout(user.about || "");
      setGender(user.gender||"");
    }
  }, [user]);

  const updateHandler=async()=>{
   try {
     const res= await axios.patch(BASE_URL+'/profile/edit',{
      firstName,
      lastName,
      age,
      skills,
      photoUrl,
      about,
      gender,
    },{withCredentials:true})
    dispatch(addUser(res?.data?.data))
    toast.success("Profile updated successfully!!")
   } catch (error) {
    setError(error.message);
    toast.error(error.message)
   
   }
  }
  
  return (
    <>
  {user&& <div className='flex justify-center gap-4'>
      <div className='flex justify-center my-25'>
      <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title text-5xl mb-4 underline flex justify-center">Profile</h2>
    <fieldset className="fieldset">
  <legend className="fieldset-legend text-xl">First Name:</legend>
  <input type="text" className="input" placeholder="Enter Your first Name.." value={firstName} onChange={(e)=>(setFirstName(e.target.value))}/>
  
</fieldset>
    <fieldset className="fieldset">
  <legend className="fieldset-legend text-xl">Last Name: </legend>
  <input type="text" className="input" placeholder="Enter Your Email address" value={lastName} onChange={(e)=>(setLastName(e.target.value))}/>
</fieldset>

    <fieldset className="fieldset">
  <legend className="fieldset-legend text-xl">Age: </legend>
  <input type="text" className="input" placeholder="Enter Your age..." value={age} onChange={(e)=>(setAge(e.target.value))} />
</fieldset>
    <fieldset className="fieldset">
  <legend className="fieldset-legend text-xl">Gender: </legend>
  <select id="options" value={gender} onChange={(e)=>(setGender(e.target.value))} className='bg-base-300 text-white input'>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="others">Others</option>
      </select>
</fieldset>
    <fieldset className="fieldset">
  <legend className="fieldset-legend text-xl">photoUrl: </legend>
  <input type="text" className="input" placeholder="Enter Your URL..." value={photoUrl} onChange={(e)=>(setPhotoUrl(e.target.value))}/>
</fieldset>

   <fieldset className="fieldset">
  <legend className="fieldset-legend text-xl">About: </legend>
  <input type="text" className="input" placeholder="Enter Your about..."  value={about} onChange={(e)=>(setAbout(e.target.value))} />
</fieldset>

    <fieldset className="fieldset">
  <legend className="fieldset-legend text-xl">Skills: </legend>
  <input type="text" className="input" placeholder="Enter Your skills..."  value={skills} onChange={(e)=>(setSkills(e.target.value))} />
</fieldset>

{error&&<p className=' text-red-500'>{error}</p>}
    <div className="card-action
    s flex justify-center ">
      <button className="btn btn-primary mt-2" onClick={updateHandler}>Update Profile</button>
    </div>
  </div>
</div>
    </div>

    <div className='my-28'><UserFeedCard user={{firstName,lastName,age,skills,about,photoUrl,}}/></div>
    </div>}
    </>
  )
}

export default Profile