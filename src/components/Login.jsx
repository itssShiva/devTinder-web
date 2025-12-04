import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/Constant'; 
const Login = () => {
  const[email,setEmail]=useState("shiva@gmail.com");
  const[password,setPassword]=useState("Garena@1");
  const [error,setError]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();


  const clickHandler=async()=>{
    try {
      const result=await axios.post(BASE_URL+"/login",{
      emailId:email,
      password
    },
  {withCredentials:true})

 
  dispatch(addUser(result.data));
  navigate('/');
    } catch (error) {
     setError(error.response.data);
    }
  }
  return (
    <div className='flex justify-center my-25'>
      <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title text-5xl mb-4 underline flex justify-center">Login</h2>
    <fieldset className="fieldset">
  <legend className="fieldset-legend text-2xl">Email ID: </legend>
  <input type="text" className="input" placeholder="Enter Your Email address" onChange={(e)=>(setEmail(e.target.value))} value={email}/>
  
</fieldset>
    <fieldset className="fieldset">
  <legend className="fieldset-legend text-2xl">Password: </legend>
  <input type="password" className="input" placeholder="Enter Your Email address" onChange={(e)=>(setPassword(e.target.value))} value={password}/>
  
</fieldset>
<p className=' text-red-500'>{error}</p>
    <div className="card-action
    s flex justify-center ">
      <button className="btn btn-primary mt-2" onClick={clickHandler}>Login</button>
    </div>
  </div>
</div>
    </div>
    
  )
}

export default Login