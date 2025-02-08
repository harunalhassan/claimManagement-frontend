import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';
import Button from 'react-bootstrap/Button';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://claimmanagement-backend.onrender.com/api/login", {
        email,
        password,
      });

      const { token, role } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role); // Store role in localStorage

      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "policyholder") {
        navigate("/policyholder-dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <div className="logincontainer">
      <div className="formcontainer">
        <h2 className="loginheading">Login</h2>
        <form className="loginform" onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" variant="primary">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
