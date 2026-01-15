import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { createSocketConnection } from "../utils/socket";

let socket;

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const userId = useSelector((store) => store?.user?._id);
  const firstName = useSelector((store) => store?.user?.firstName);
  const lastName = useSelector((store) => store?.user?.lastName);

  const scrollRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, { withCredentials: true });
      const chatMessages = res.data.messages.map((msg) => ({
        senderId: msg.senderId?._id || msg.senderId,
        firstName: msg.senderId?.firstName,
        lastName: msg.senderId?.lastName,
        newMessage: msg.newMessage,
        timeStamp: msg.createdAt,
      }));
      setMessages(chatMessages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchMessages(); }, [targetUserId]);

  useEffect(() => {
    socket = createSocketConnection();
    socket.emit("joinChat", { firstName, userId, targetUserId });
    socket.on("messageReceived", (msg) => {
      setMessages((prev) => {
        if (msg.senderId === userId) return prev;
        return [
          ...prev,
          { senderId: msg.senderId, firstName: msg.firstName, lastName: msg.lastName, newMessage: msg.newMessage, timeStamp: new Date() }
        ];
      });
    });
    return () => { socket.disconnect(); };
  }, [targetUserId]);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const messageData = { senderId: userId, firstName, lastName, newMessage, timeStamp: new Date() };
    setMessages((prev) => [...prev, messageData]);
    socket.emit("sendMessage", { userId, targetUserId, firstName, lastName, newMessage });
    setNewMessage("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-3 sm:px-6 lg:px-8">
      <div className="flex flex-col w-full max-w-md sm:max-w-xl lg:max-w-3xl h-[92vh] sm:h-[600px] border border-pink-300 rounded-xl shadow-lg bg-base-100">
        <div className="h-14 sm:h-16 flex items-center justify-center border-b border-pink-300 text-xl sm:text-2xl lg:text-3xl font-semibold text-pink-400">
          Chat
        </div>
        <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-2">
          {messages.map((msg, index) => (
            <div key={index} ref={scrollRef} className={"chat " + (msg.senderId === userId ? "chat-end" : "chat-start")}>
              <div className="chat-header text-xs sm:text-sm opacity-80">
                {`${msg.firstName || ""} ${msg.lastName || ""}`}
                <time className="ml-2 text-[10px] sm:text-xs opacity-50">
                  {new Date(msg.timeStamp).toLocaleTimeString("en-IN")}
                </time>
              </div>
              <div className="chat-bubble text-sm sm:text-base max-w-[75%]">{msg.newMessage}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 p-2 sm:p-3 border-t border-pink-300">
          <input
            type="text"
            placeholder="Type a message…"
            className="input input-secondary w-full text-sm sm:text-base"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="btn btn-secondary px-4 sm:px-6" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
