import React from "react";

const Chat = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex border border-pink-300 w-1/2 h-[600px] p-4 flex-col">
        <div className="h-[60px] border-b border-pink-300 w-full text-3xl text-pink-300">
          Chat
        </div>
        <div className="w-full h-[500px] p-3 mt-2.5">
          <div className="chat chat-start">
            <div className="chat-header">
              Obi-Wan Kenobi
              <time className="text-xs opacity-50">2 hours ago</time>
            </div>
            <div className="chat-bubble">You were the Chosen One!</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>
        </div>
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Enter your message here"
            className="input input-secondary w-[650px]"
          />
          <button className="btn btn-secondary p-4">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
