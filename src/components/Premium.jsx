import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/Constant'
import axios from 'axios'

const Premium = () => {
  const [isUserPremium, setUserPremium] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + '/premium/verify', { withCredentials: true });
      if (res?.data?.isPremium) setUserPremium(true);
    } catch (err) {
      console.log(err);
    }
  }

  const handleBuy = async (type) => {
    try {
      const res = await axios.post(BASE_URL + '/payment/create', {
        membershipType: type
      }, { withCredentials: true });

      const options = {
        key: res?.data?.key,
        amount: res?.data?.order?.amount,
        currency: 'INR',
        name: 'Dev Tinder',
        description: 'Become a Premium Developer',
        order_id: res?.data?.order?.id,
        prefill: {
          name: res?.data?.order?.notes?.firstName + " " + res?.data?.order?.notes?.lastName,
          email: res?.data?.order?.notes?.emailId,
          contact: '9999999999'
        },
        theme: { color: '#1e1e1e' },
        handler: verifyPremiumUser
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
    }
  }

  if (isUserPremium) return (
    <h2 className="text-center text-2xl sm:text-3xl font-semibold mt-20 underline ">
      Stay Tuned.. Something is Cooking for you!!!
    </h2>
  );

  return (
    <div className="flex flex-col sm:flex-row justify-center items-start gap-6 px-4 sm:px-6 lg:px-8 my-10">
      
      <div className="card w-full sm:w-96 bg-base-300 shadow-sm max-h-[500px] flex-shrink-0">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl sm:text-3xl font-bold">Silver Membership</h2>
            <span className="text-lg sm:text-xl">₨.300</span>
          </div>
          <ul className="mt-4 flex flex-col gap-2 text-sm sm:text-base">
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Chat With Other People
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              100 connection requests per day!
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Blue Tick
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              3 months
            </li>
          </ul>
          <button
            className="btn btn-primary btn-block mt-4"
            onClick={() => handleBuy("silver")}
          >
            Buy Silver
          </button>
        </div>
      </div>

      <div className="card w-full sm:w-96 bg-base-300 shadow-sm flex-shrink-0">
        <div className="card-body">
          <span className="badge badge-warning text-sm mb-2">Most Popular</span>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl sm:text-3xl font-bold">Gold Membership</h2>
            <span className="text-lg sm:text-xl">₨.700</span>
          </div>
          <ul className="mt-4 flex flex-col gap-2 text-sm sm:text-base">
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Chat With Other People
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Infinite connection requests per day!
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Blue Tick
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              6 months
            </li>
          </ul>
          <button
            className="btn btn-primary btn-block mt-4"
            onClick={() => handleBuy("gold")}
          >
            Buy Gold
          </button>
        </div>
      </div>

    </div>
  )
}

export default Premium;
