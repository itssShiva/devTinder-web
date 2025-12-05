import React from 'react'

const UserFeedCard = (user) => {
    const {firstName,lastName,photoUrl,about,skills,age}=user.user
    console.log(user);
      return (
    <div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {age&&<p>{age}</p>}
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