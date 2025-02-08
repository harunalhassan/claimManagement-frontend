import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import the CSS file

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("policyholder"); // Default role
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://claimmanagement-backend.onrender.com/api/signup", {
        name,
        email,
        password,
        role,
      });
      navigate("/login");
    } catch (error) {
      alert("Signup failed!");
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup} className="signup-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="policyholder">Policyholder</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
