import React from 'react'
import { BASE_URL } from '../utils/Constant'
import axios from 'axios'


const Premium = () => {

  const handleBuy=async(type)=>{
    const res=await axios.post(BASE_URL+'/payment/create',{
      membershipType:type
    },{withCredentials:true}
  )
  
  console.log(res.data);
  console.log(res?.data?.order?.amount);


    const options = {
        key: res?.data?.key, // Replace with your Razorpay key_id
        amount: res?.data?.order?.amount, // Amount is in currency subunits.
        currency: 'INR',
        name: 'Dev Tinder',
        description: 'Become a Premium Developer',
        order_id: res?.data?.order?.id, // This is the order_id created in the backend
        prefill: {
          name: res?.data?.order?.notes?.firstName+" "+res?.data?.order?.notes?.lastName,
          email: res?.data?.order?.notes?.emailId,
          contact: '9999999999'
        },
        theme: {
          color: '#1e1e1e'
        },
      };


   const rzp = new window.Razorpay(options);
      rzp.open();

  }
  return (
    <div className='flex justify-center my-43 gap-10'>
        <div className="card w-96 bg-base-300 shadow-sm max-h-[500px]">
  <div className="card-body">
    <div className="flex justify-between">
      <h2 className="text-3xl font-bold">Silver Membership</h2>
      <span className="text-xl">₨.2/mo</span>
    </div>
    <ul className="mt-6 flex flex-col gap-2 text-xs">
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>Chat With Other People</span>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>100 connection requests per day!</span>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>Blue Tick</span>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>3 months</span>
      </li>
     
     
    </ul>
    <div className="mt-6">
      <button className="btn btn-primary btn-block mt-3" onClick={()=>handleBuy("silver")}>Buy Silver</button>
    </div>
  </div>
</div>
        <div className="card w-96 bg-base-300 shadow-sm">
  <div className="card-body">
    <span className="badge badge-xs badge-warning">Most Popular</span>
    <div className="flex justify-between">
      <h2 className="text-3xl font-bold">Gold Membership</h2>
      <span className="text-xl">₨.10/mo</span>
    </div>
    <ul className="mt-6 flex flex-col gap-2 text-xs">
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>Chat With Other People</span>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>Infinite connection requests per day!</span>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>Blue Tick</span>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>6 months</span>
      </li>
     
     
    </ul>
    <div className="mt-6">
      <button className="btn btn-primary btn-block" onClick={()=>handleBuy("gold")}>Buy Gold</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Premium