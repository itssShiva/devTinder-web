import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { createSocketConnection } from "../utils/socket";

let socket; // global socket instance

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const userId = useSelector((store) => store?.user?._id);
  const firstName = useSelector((store) => store?.user?.firstName);
  const lastName = useSelector((store) => store?.user?.lastName);

  const scrollRef = useRef(null);

  // 🔹 1. Fetch old messages from backend
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      const chatMessages = res.data.messages.map((msg) => ({
        senderId: msg.senderId?._id || msg.senderId,
        firstName: msg.senderId?.firstName,
        lastName: msg.senderId?.lastName,
        newMessage: msg.newMessage,
        timeStamp: msg.createdAt,
      }));

      setMessages(chatMessages);
    } catch (err) {
      console.error("fetchMessages error:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [targetUserId]);

  // 🔹 2. Connect socket and handle incoming messages
  useEffect(() => {
    socket = createSocketConnection();

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on("messageReceived", (msg) => {
      setMessages((prev) => {
        // Skip own messages (already added locally)
        if (msg.senderId === userId) return prev;
        return [
          ...prev,
          {
            senderId: msg.senderId,
            firstName: msg.firstName,
            lastName: msg.lastName,
            newMessage: msg.newMessage,
            timeStamp: new Date(),
          },
        ];
      });
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connect error:", err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [targetUserId]);

  // 🔹 3. Auto scroll to latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 4. Send message (local + socket)
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      senderId: userId,
      firstName,
      lastName,
      newMessage,
      timeStamp: new Date(),
    };

    // Add locally immediately
    setMessages((prev) => [...prev, messageData]);

    // Emit to backend
    socket.emit("sendMessage", {
      userId,
      targetUserId,
      firstName,
      lastName,
      newMessage,
    });

    setNewMessage("");
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
              key={index}
              ref={scrollRef}
              className={
                "chat " + (msg.senderId === userId ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header">
                {`${msg.firstName || ""} ${msg.lastName || ""}`}
                <time className="text-xs opacity-50 ml-2">
                  {new Date(msg.timeStamp).toLocaleTimeString("en-IN")}
                </time>
              </div>
              <div className="chat-bubble">{msg.newMessage}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Enter your message"
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
