import React, { useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [policyholders, setPolicyholders] = useState([]);
  const [claims, setClaims] = useState([]);
  const [showPolicyholders, setShowPolicyholders] = useState(false);
  const [showClaims, setShowClaims] = useState(false);
  const [selectedClaimId, setSelectedClaimId] = useState("");
  const [selectedClmId, setSelectedClmId] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");

  const fetchPolicyholders = async () => {
    try {
      const response = await axios.get("https://claimmanagement-backend.onrender.com/api/policyholders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPolicyholders(response.data);
      setShowPolicyholders(true); // Show policyholders after fetching
    } catch (error) {
      console.error("Error fetching policyholders:", error);
    }
  };

  const fetchClaims = async () => {
    try {
      const response = await axios.get("https://claimmanagement-backend.onrender.com/api/claims", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setClaims(response.data);
      setShowClaims(true); // Show claims after fetching
    } catch (error) {
      console.error("Error fetching claims:", error);
    }
  };

  const updateClaim = async () => {
    try {
      await axios.put(
        `https://claimmanagement-backend.onrender.com/api/claims/${selectedClaimId}/status`,
        { status: updateStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Claim updated successfully!");
      fetchClaims();
    } catch (error) {
      console.error("Error updating claim:", error);
    }
  };
  const deleteClaim = async () => {
    try {
      await axios.delete(
        `https://claimmanagement-backend.onrender.com/api/claims/${selectedClmId}`,
        
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Claim Deleted successfully!");
      fetchClaims();
    } catch (error) {
      console.error("Error Deleting claim:", error);
    }
  };
  const navigate = useNavigate();
  const logoutfunc=()=>{
    localStorage.removeItem("token"); // Clear token
    navigate("/");
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      

      {/* Policyholders Section */}
      <div className="section">
        <h3>Policyholders</h3>
        <button className="fetch-button" onClick={fetchPolicyholders}>List of Policyholders</button>
        {showPolicyholders && (
          <ul>
            {policyholders.map((policyholder) => (
              <li key={policyholder.id}>
                <h4>{policyholder.name}</h4> 
                <h5>(Contact: {policyholder.contactDetails?.phone})</h5>
                <h6>(Email: {policyholder.contactDetails?.email})</h6>
                
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Claims Section */}
      <div className="section">
        <h3>Claims</h3>
        <button className="fetch-button" onClick={fetchClaims}>List of Claims</button>
        {showClaims && (
          <ul>
            {claims.map((claim) => (
              <li key={claim.id}>
                <h4>Claim ID: {claim._id}</h4> 
                <h5>Amount: {claim.claimAmount} Rs</h5> 
                <h5>{claim.description}</h5> 
                <h4 className="cls-status">{claim.status}</h4> 
                
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Update a Claim Section */}
      <div className="section">
        <h3>Update a Claim</h3>
        <input type="text" placeholder="Claim ID" value={selectedClaimId} onChange={(e) => setSelectedClaimId(e.target.value)} />
        <select value={updateStatus} onChange={(e) => setUpdateStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Pending">Pending</option>
        </select>
        <button className="update-button" onClick={updateClaim}>Update Claim</button>
      </div>
      {/* Delete a Claim Section */}
      <div className="section">
        <h3>Delete a Claim</h3>
        <input type="text" placeholder="Claim ID to delete" value={selectedClmId} onChange={(e) => setSelectedClmId(e.target.value)} />
        <button className="update-button" onClick={deleteClaim}>Delete Claim</button>
      </div>
      {/* Logout */}
      <div className="">
        <button className="logout-btn" onClick={logoutfunc}>Logout</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
