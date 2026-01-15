import React, { useState } from 'react'
import { BASE_URL } from '../utils/Constant';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [skills, setSkills] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [gender, setGender] = useState("male");
  const [about, setAbout] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();

  const signInHandler = async () => {
    try {
      const res = await axios.post(BASE_URL + '/signup', {
        firstName,
        lastName,
        emailId,
        password,
        age,
        skills,
        photoUrl,
        gender,
        about,
      }, { withCredentials: true });
      toast.success('User Registered Successfully!')
      navigate('/login')
    } catch (error) {
      setError(error?.response?.data);
    }
  }

  return (
    <div className='flex justify-center px-4 sm:px-6 lg:px-8 mt-10'>
      <div className="card bg-base-300 w-full max-w-md sm:max-w-lg lg:max-w-xl shadow-md p-6 sm:p-8">
        <h2 className="card-title text-3xl sm:text-4xl lg:text-5xl mb-6 underline text-center">Signup</h2>

        <div className="flex flex-col gap-4">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base sm:text-lg">First Name:</legend>
            <input type="text" className="input w-full" placeholder="Enter Your First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base sm:text-lg">Last Name:</legend>
            <input type="text" className="input w-full" placeholder="Enter Your Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base sm:text-lg">Email-Id:</legend>
            <input type="text" className="input w-full" placeholder="Enter Your Email" value={emailId} onChange={(e) => setEmail(e.target.value)} />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base sm:text-lg">Password:</legend>
            <input type="password" className="input w-full" placeholder="Enter Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base sm:text-lg">Age:</legend>
            <input type="text" className="input w-full" placeholder="Enter Your Age" value={age} onChange={(e) => setAge(e.target.value)} />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base sm:text-lg">Gender:</legend>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className='bg-base-300 text-white input w-full'>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base sm:text-lg">Photo URL:</legend>
            <input type="text" className="input w-full" placeholder="Enter Your Photo URL" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base sm:text-lg">About:</legend>
            <input type="text" className="input w-full" placeholder="Enter About Yourself" value={about} onChange={(e) => setAbout(e.target.value)} />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base sm:text-lg">Skills:</legend>
            <input type="text" className="input w-full" placeholder="Enter Your Skills" value={skills} onChange={(e) => setSkills(e.target.value)} />
          </fieldset>

          {error && <p className='text-red-500 text-center'>{error}</p>}

          <button className="btn btn-primary w-full mt-4" onClick={signInHandler}>SignUp</button>

          <Link to={'/login'} className='text-center underline mt-2 hover:text-blue-300 transition duration-300'>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup;
