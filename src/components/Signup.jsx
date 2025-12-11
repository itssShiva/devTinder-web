import React, { useState } from 'react'
import { BASE_URL } from '../utils/Constant';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Signup = () => {
     const[firstName,setFirstName]=useState("");
      const[lastName,setLastName]=useState("");
      const[emailId,setEmail]=useState("");
      const[password,setPassword]=useState("");
      const[age,setAge]=useState("");
      const[skills,setSkills]=useState("");
      const[photoUrl,setPhotoUrl]=useState("");
      const[gender,setGender]=useState("male");
      const[about,setAbout]=useState("");
      const[error,setError]=useState();
      const navigate=useNavigate();

      const signInHandler=async()=>{
        try {
            const res=await axios.post(BASE_URL+'/signup',{
            firstName,
            lastName,
            emailId,
            password,
            age,
            skills,
            photoUrl,
            gender,
            about,
        },{withCredentials:true})
        toast.success('User Registered Successfully!')
        navigate('/login')
        } catch (error) {
            setError(error?.response?.data);
           
        }
      }
  return (
     <div className='flex justify-center gap-4'>
      <div className='flex justify-center my-25'>
      <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title text-5xl mb-4 underline flex justify-center">Signup</h2>
    <fieldset className="fieldset">
  <legend className="fieldset-legend text-xl">First Name:</legend>
  <input type="text" className="input" placeholder="Enter Your first Name.." value={firstName} onChange={(e)=>(setFirstName(e.target.value))}/>
  
</fieldset>
    <fieldset className="fieldset">
  <legend className="fieldset-legend text-xl">Last Name: </legend>
  <input type="text" className="input" placeholder="Enter Your Email address" value={lastName} onChange={(e)=>(setLastName(e.target.value))}/>
</fieldset>
    <fieldset className="fieldset">
  <legend className="fieldset-legend text-xl">Email-Id: </legend>
  <input type="text" className="input" placeholder="Enter Your Email address" value={emailId} onChange={(e)=>(setEmail(e.target.value))}/>
</fieldset>
    <fieldset className="fieldset">
  <legend className="fieldset-legend text-xl">Password: </legend>
  <input type="password" className="input" placeholder="Enter Your password" value={password} onChange={(e)=>(setPassword(e.target.value))}/>
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
      <button className="btn btn-primary mt-2 mr-7" onClick={signInHandler}>SignIn</button>
    </div>
    <Link className="fieldset-legend undeline mx-auto underline hover:text-blue-200 transition duration-300 mr-35" to={'/login'}>Back to Login</Link>
  </div>
</div>
    </div>

    
    </div>
  )
}

export default Signup