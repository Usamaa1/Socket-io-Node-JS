import React, { useState, useEffect, useRef } from "react";
import "./ChatScreen.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:3000", { withCredentials: true });

const ChatScreen = () => {
  const [messages, setMessages] = useState([]); // store messages here
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const messagesEndRef = useRef(null);

  const { recieverId, recieverName } = useParams();
  console.log(recieverId);

  async function getAllMessages() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/chatMessage/${recieverId}`,
        {
          withCredentials: true,
        }
      );

      const { data } = response.data;

      if (data) {
        const sortedMessages = data.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setMessages(sortedMessages);
        console.log(sortedMessages);
      }


      const userData = await axios.get("http://localhost:3000/api/v1/me", {
        withCredentials: true,
      });

      console.log(userData);
      setUserId(userData?.data?.userId);
      setUserName(userData?.data?.userName);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  }

  // Fetch messages from API when chatUserId changes
  useEffect(() => {
    getAllMessages();
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
  if (userId) {
    socket.emit('registerUser', userId);
  }
}, [userId]);


  const handleSend = async () => {
    if (newMessage.trim()) {
      const messageData = {
        senderId: userId,
        senderName: userName,
        recieverId: recieverId,
        recieverName: recieverName,
        message: newMessage.trim(),
      };

      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/v1/chatMessage",
          messageData,
          {
            withCredentials: true,
          }
        );
        console.log(data);

        socket.emit("sendMessage", messageData);
        // alert("Message sent Successfull");
      } catch (error) {
        console.error("Message sending Failed:", error);
      }
      setNewMessage("");
      getAllMessages();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chat-screen">
      <header className="chat-header">
        <h2>{"Select a user to chat"}</h2>
      </header>

      <button onClick={getAllMessages}>Get Messages</button>
      <div className="chat-messages">
        {messages.length === 0 && (
          <p className="no-messages">
            No messages yet. Start the conversation!
          </p>
        )}
        {messages.map(({ _id, recieverId, message, senderId },index) => (
          <div
            key={index}
            className={`chat-message ${
              senderId === userId
                ? "chat-message-sent"
                : "chat-message-received"
            }`}
          >
            <sub>{senderId == userId ? userName : recieverName}</sub>
            <p>{message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatScreen;
