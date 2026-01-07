import React, { useEffect, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/Constant";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const userId = useSelector((store) => store?.user?._id);
  const firstName = useSelector((store) => store?.user?.firstName);
  const lastName = useSelector((store) => store?.user?.lastName);

  const fetchMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      return {
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        newMessage: msg?.newMessage,
        timeStamp: msg?.createdAt,
      };
    });
    console.log(chatMessages);
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on(
      "messageReceived",
      ({ firstName, lastName, timeStamp, newMessage }) => {
        console.log(firstName + " " + newMessage);
        setMessages((prev) => [
          ...prev,
          { firstName, newMessage, lastName, timeStamp },
        ]);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName,
      lastName,
      userId,
      targetUserId,
      newMessage,
    });
    setNewMessage("");
  };
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex border border-pink-300 w-1/2 h-[600px] p-4 flex-col">
        <div className="h-[60px] border-b border-pink-300 w-full text-3xl text-pink-300">
          Chat
        </div>
        <div className="w-full h-[500px] p-3 mt-2.5 overflow-scroll">
          {messages.map((msg, index) => {
            return (
              <div key={index} className="chat chat-start">
                <div className="chat-header">
                  {`${msg.firstName} ${msg.lastName}`}
                  <time className="text-xs opacity-50">
                    {new Date(msg?.timeStamp || Date.now()).toLocaleTimeString(
                      "en-IN",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      }
                    )}
                  </time>
                </div>
                <div className="chat-bubble">{msg.newMessage}</div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Enter your message here"
            className="input input-secondary w-[650px]"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="btn btn-secondary p-4" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
