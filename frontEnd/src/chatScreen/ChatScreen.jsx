import React, { useState, useEffect, useRef } from "react";
import "./ChatScreen.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]); // store messages here
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const {recieverId} = useParams();
  console.log(recieverId)
  

  async function getAllMessages(){
     try {
         const response  =await axios.get(`http://localhost:3000/api/v1/chatMessage/${recieverId}`,{
    withCredentials: true // <-- this is the fix
  });

  const {data} = response.data;
          console.log(data);
          setMessages(data)
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

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage("");
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
        <h2>{ "Select a user to chat"}</h2>
      </header>

<button onClick={getAllMessages}>Get Messages</button>
      <div className="chat-messages">
        {messages.length === 0 && (
          <p className="no-messages">No messages yet. Start the conversation!</p>
        )}
        {messages.map(({ _id, recieverId, message, senderId }) => (
          <div
            key={_id}
            className={`chat-message ${
              senderId === "me" ? "chat-message-sent" : "chat-message-received"
            }`}
          >
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
