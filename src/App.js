import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

import ClaimList from "./components/Claims/ClaimList";
import CreateClaim from "./components/Claims/CreateClaim";
import PolicyholderDashboard from "./pages/PolicyholderDashboard"
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/claims" element={<ClaimList />} />
        <Route path="/create-claim" element={<CreateClaim />} />
        <Route path="/policyholder-dashboard" element={<PolicyholderDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
