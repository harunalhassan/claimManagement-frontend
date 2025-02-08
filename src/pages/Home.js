import React from "react";
import {  useNavigate } from "react-router-dom";
import "./Home.css"


const Home=()=>{
  const navigate=useNavigate()
  return(
    <div className="home-container">
      <h1 className="heading-home">Welcome to the Claim Management System</h1>
      <button onClick={() => navigate("/signup")}>Sign Up</button>
      <button onClick={() => navigate("/login")}>Login</button>
      
      

    </div>
    
  )

}
export default Home;