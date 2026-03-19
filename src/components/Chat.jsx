import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { createSocketConnection } from "../utils/socket";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare } from "lucide-react";

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
        newMessage: msg.text || msg.newMessage,
        timeStamp: msg.createdAt,
      }));
      setMessages(chatMessages);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchMessages(); }, [targetUserId]);

  useEffect(() => {
    socket = createSocketConnection();
    socket.emit("joinChat", { firstName, userId, targetUserId });
    socket.on("messageReceived", (msg) => {
      setMessages((prev) => {
        if (msg.senderId === userId) return prev;
        return [...prev, { senderId: msg.senderId, firstName: msg.firstName, lastName: msg.lastName, newMessage: msg.newMessage || msg.text, timeStamp: new Date() }];
      });
    });
    return () => { socket.disconnect(); };
  }, [targetUserId]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const messageData = { senderId: userId, firstName, lastName, newMessage: newMessage.trim(), timeStamp: new Date() };
    setMessages((prev) => [...prev, messageData]);
    socket.emit("sendMessage", { userId, targetUserId, firstName, lastName, newMessage: newMessage.trim() });
    setNewMessage("");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 sm:px-6 py-6 lg:px-8 relative overflow-hidden">
      {/* Dark red blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-red-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-800/8 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col w-full max-w-lg lg:max-w-2xl h-[85vh] sm:h-[650px] shadow-[0_24px_80px_rgba(0,0,0,0.7)] glass-panel relative z-10 overflow-hidden"
      >
        {/* Header */}
        <div className="h-16 sm:h-20 flex items-center justify-between px-6 border-b border-white/5 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-[0_4px_12px_rgba(185,28,28,0.4)]" style={{ backgroundImage: 'linear-gradient(135deg, #b91c1c, #ef4444)' }}>
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">Chat</h2>
              <p className="text-xs font-medium text-emerald-400">Online</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-zinc-950/30">
          <AnimatePresence>
            {messages.map((msg, index) => {
              const isMe = msg.senderId === userId;
              const isLast = index === messages.length - 1;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[75%] sm:max-w-[70%] flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    <div className="text-xs opacity-50 font-medium mb-1 px-1 flex items-center gap-1.5 text-slate-400">
                      {isMe ? "You" : (msg.firstName || "User")}
                      <span className="text-[10px] opacity-70">
                        {new Date(msg.timeStamp).toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className={`px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl shadow-sm leading-relaxed ${
                      isMe
                        ? "text-white rounded-tr-sm shadow-[0_4px_16px_rgba(185,28,28,0.3)]"
                        : "bg-zinc-800/80 text-slate-200 border border-zinc-700/50 rounded-tl-sm"
                    }`}
                    style={isMe ? { backgroundImage: 'linear-gradient(135deg, #b91c1c, #ef4444)' } : {}}
                    >
                      <p className="text-sm sm:text-[15px]">{msg.newMessage}</p>
                    </div>
                  </div>
                  {isLast && <div ref={scrollRef} />}
                </motion.div>
              );
            })}
          </AnimatePresence>
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-30 space-y-3">
              <MessageSquare className="w-12 h-12 text-zinc-600" />
              <p className="text-zinc-500 text-center font-medium">No messages yet.<br />Start the conversation!</p>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 sm:p-4 border-t border-white/5 bg-black/50 backdrop-blur-md">
          <div className="flex gap-2 relative">
            <input
              type="text"
              placeholder="Type your message..."
              className="input w-full bg-zinc-900/80 border-zinc-700 text-slate-100 placeholder:text-zinc-500 focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-red-500/25 focus:border-red-500/50 border transition-all shadow-sm rounded-full pl-5 pr-14 h-12"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-1 top-1 bottom-1 w-10 h-10 rounded-full text-white flex items-center justify-center shadow-[0_4px_12px_rgba(185,28,28,0.4)] hover:shadow-[0_4px_20px_rgba(185,28,28,0.6)] transition-all border-none"
              style={{ backgroundImage: 'linear-gradient(135deg, #b91c1c, #ef4444)' }}
              onClick={sendMessage}
              disabled={!newMessage.trim()}
            >
              <Send className="w-4 h-4 ml-0.5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Chat;
