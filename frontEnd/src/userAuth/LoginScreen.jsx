import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return alert("All fields required");
    
      try {
        const { data } = await axios.post("http://localhost:3000/api/v1/login",{
            email: email,
            password: password
        },{
            withCredentials: true
        });
        console.log(data)
        alert("User Login Successfull")
        navigator('/userList')
        


      } catch (error) {
        console.error("Login Failed:", error);
      }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <a href="/register">Sign up</a>
      </p>
    </div>
  );
};

export default LoginScreen;
