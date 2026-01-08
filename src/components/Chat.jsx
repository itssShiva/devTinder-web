import React, { useEffect, useState, useRef } from "react";
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
  const scrollRef = useRef(null);

  // Fetch previous messages
  const fetchMessages = async () => {
    try {
      const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      const chatMessages = chat.data.messages.map((msg) => ({
        senderId: msg.senderId?._id || msg.senderId, // populate se aa raha
        firstName: msg.senderId?.firstName,
        lastName: msg.senderId?.lastName,
        newMessage: msg.newMessage,
        timeStamp: msg.createdAt,
      }));

      setMessages(chatMessages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [targetUserId]);

  // Auto scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message (simply add to local messages; backend update optional)
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      senderId: userId,
      firstName,
      lastName,
      newMessage,
      timeStamp: new Date(),
    };

    // Add locally
    setMessages((prev) => [...prev, messageData]);
    setNewMessage("");

    // Optional: Send to backend (if you have POST route)
    try {
      await axios.post(
        `${BASE_URL}/chat/${targetUserId}`,
        { newMessage },
        { withCredentials: true }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex border border-pink-300 w-full md:w-1/2 h-[90vh] md:h-[600px] p-4 flex-col">
        <div className="h-[60px] border-b border-pink-300 w-full text-3xl text-pink-300">
          Chat
        </div>

        <div className="flex-1 p-3 mt-2.5 overflow-y-scroll">
          {messages.map((msg, index) => (
            <div
              ref={scrollRef}
              key={index}
              className={
                "chat " + (msg.senderId === userId ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header">
                {`${msg.firstName || ""} ${msg.lastName || ""}`}
                <time className="text-xs opacity-50 ml-2">
                  {new Date(msg?.timeStamp || Date.now()).toLocaleTimeString(
                    "en-IN",
                    { hour: "2-digit", minute: "2-digit", second: "2-digit" }
                  )}
                </time>
              </div>
              <div className="chat-bubble">{msg.newMessage}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Enter your message here"
            className="input input-secondary flex-1"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="btn btn-secondary px-6" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
