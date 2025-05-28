import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!username || !email || !password) return alert("All fields required");

      try {
        const { data } = await axios.post("http://localhost:3000/api/v1/register",{
            userName: username,
            email: email,
            password: password
        });
        console.log(data)
        alert("User Register Successfull")


      } catch (error) {
        console.error("Signup Failed:", error);
      }




  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Create Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Create Account</button>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default RegisterScreen;
