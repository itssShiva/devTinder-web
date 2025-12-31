  import React, { useEffect, useState } from "react";
  import { createSocketConnection } from "../utils/socket";
  import { useSelector } from "react-redux";
  import { useParams } from "react-router-dom";

  const Chat = () => {

    const {targetUserId}=useParams();
    const[messages,setMessages]=useState([]);
    const [newMessage,setNewMessage]=useState("");

    const userId=useSelector(store=>store?.user?._id);
    const firstName=useSelector(store=>store?.user?.firstName);

    
  
    
    useEffect(()=>{
      if(!userId) return;
      const socket=createSocketConnection();
      socket.emit('joinChat',{firstName,userId,targetUserId})


      socket.on("messageReceived",({firstName,newMessage})=>{
        console.log(firstName+" "+newMessage);
        setMessages(prev => [...prev, { firstName, newMessage }]);

      })
      
      return ()=>{socket.disconnect();}
    },[userId,targetUserId])

  const sendMessage=()=>{
    const socket=createSocketConnection();
    socket.emit("sendMessage",{
      firstName,
      userId,
      targetUserId,
      newMessage
    })
    setNewMessage("")
  }
    return (
      <div   className="flex items-center justify-center p-4">
        <div className="flex border border-pink-300 w-1/2 h-[600px] p-4 flex-col">
          <div className="h-[60px] border-b border-pink-300 w-full text-3xl text-pink-300">
            Chat
          </div>
          <div className="w-full h-[500px] p-3 mt-2.5">
            { messages.map((msg,index)=>{
              return(
                <div  key={index} className="chat chat-start">
              <div className="chat-header">
                {msg.firstName}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.newMessage}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
              )
            })
            }
          </div>
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="Enter your message here"
              className="input input-secondary w-[650px]"
              value={newMessage}
              onChange={(e)=>setNewMessage(e.target.value)}
            />
            <button className="btn btn-secondary p-4" onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    );
  };

  export default Chat;
