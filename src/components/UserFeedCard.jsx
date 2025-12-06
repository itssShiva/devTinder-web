import React from 'react'

const UserFeedCard = ({user}) => {
    const {firstName,lastName,photoUrl,about,skills,age,gender}=user
   
      return (
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure className='h-100'>
    <img
      src={photoUrl||"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"}
      alt="Shoes"/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {age&&<p>{age}</p>}
    {gender&&<p>{gender}</p>}
    <p>{about}</p>
    {skills&&<p>{skills}</p>}
    <div className="card-actions justify-between">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserFeedCard