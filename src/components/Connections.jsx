    import React, { useEffect } from 'react'
    import { BASE_URL } from '../utils/Constant'
    import axios from 'axios'
    import { useDispatch, useSelector } from 'react-redux'
    import { addConnections } from '../utils/connectionSlice'


    const Connections = () => {

        const dispatch=useDispatch();
        const connections=useSelector((store)=>store.connections);
        const fetchConnections=async()=>{
            try {
                const res=await axios.get(BASE_URL+'/user/connections',{withCredentials:true});
                dispatch(addConnections(res?.data?.data));
            } catch (error) {
                console.log(error);
            }
        }
        useEffect(()=>{
            fetchConnections();
        },[])

        if(!connections) return;
        if(connections.length===0) return   <> <h1 className='flex justify-center my-40 text-3xl underline'>No Connections Found 💔</h1>
        </>
    return (
        
        <div className='flex justify-center items-center flex-col gap-4 mt-2 my-4 pb-10'>

        { connections.map((user)=>(
                <div className="card card-side bg-base-300 shadow-sm max-w-[400px] min-w-[500px] max-h-[300px]" key={user._id}>
    <figure className='h-[100px] w-[100px] rounded-full my-8 ml-4'>
        <img
        src={user.photoUrl}
        alt="Movie" />
    </figure>
    <div className="card-body">
        <h2 className="card-title text-2xl underline capitalize" >{user.firstName+" "+user.lastName}</h2>
        <p >Age: {user.age}</p>
        <p>Gender: {user.gender}</p>
        <p >About: {user.about}</p>    
        <p >Skills: {user.skills}</p>    

    </div>
    </div>
            ))}

        </div>
    )
    }

    export default Connections