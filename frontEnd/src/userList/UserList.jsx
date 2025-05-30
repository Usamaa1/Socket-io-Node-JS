import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ChatUserList = () => {
  const [users, setUsers] = useState([]);
  const currentUserId = localStorage.getItem("userId");
  const navigator = useNavigate();

  useEffect(() => {
    const fetchUsersWithLastMessage = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/v1/chatList");
        // Assuming backend already filters out current user and adds lastMessage
        console.log(data)
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users with last message:", error);
      }
    };

    fetchUsersWithLastMessage();
  }, []);

  return (
    <div style={{ maxWidth: "90%", margin: "auto" }}>
      <h2>Chats</h2>
      {users.length === 0 ? (
        <p>No chats found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map(({ _id, userName, lastMessage },index) => (
           
           <li            
              key={_id}
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid #ddd",
                cursor: "pointer",
                background: "#f1f2f6"
              }}
              onClick={() => {
                navigator(`/chatMessages/${_id}/${userName}`)

              }} // implement this
            >
              <div style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                {userName}
              </div>
              <div
                style={{
                  color: "#666",
                  fontSize: "0.9rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {lastMessage || "No messages yet"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatUserList;
