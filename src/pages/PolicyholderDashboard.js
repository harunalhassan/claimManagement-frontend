import React, { useState} from "react";
import axios from "axios";
import "./PolicyholderDashboard.css";
import { useNavigate } from "react-router-dom";

const PolicyholderDashboard = () => {
  const [policyholderName, setPolicyholderName] = useState("");
  const [dob, setDob] = useState("");
  const [contactDetails, setContactDetails] = useState({
    phone: "",
    email: "",
    address: "",
  });
  // const [policyDetails, setPolicyDetails] = useState("");
  // const [claimDetails, setClaimDetails] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [claimDescription, setClaimDescription] = useState("");
  const [claimId, setClaimId] = useState("");
  const [policies, setPolicies] = useState([]);
  const [showPolicyholderForm, setShowPolicyholderForm] = useState(false);
  const [showClaimForm, setShowClaimForm] = useState(false);

  const createPolicyholder = async () => {
    try {
      await axios.post(
        "https://claimmanagement-backend.onrender.com/api/policyholders",
        {
          name: policyholderName,
          dob,
          contactDetails,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Policyholder created successfully!");
      setShowPolicyholderForm(false); // Close form after submission
    } catch (error) {
      console.error("Error creating policyholder:", error);
    }
  };

  const fetchPolicies = async () => {
    try {
      const response = await axios.get("https://claimmanagement-backend.onrender.com/api/policies", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPolicies(response.data);
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  const createClaim = async () => {
    try {
      await axios.post(
        "https://claimmanagement-backend.onrender.com/api/claims",
        { policyId: claimId, claimAmount, description: claimDescription },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Claim created successfully!");
      setShowClaimForm(false); // Close form after submission
    } catch (error) {
      console.error("Error creating claim:", error);
    }
  };
  const navigate=useNavigate()
  const logoutfunc = ()=>{
    localStorage.removeItem("token"); // Clear token
    navigate("/");
  }


  return (
    <div className="policyholder-dashboard">
      <h2>Policyholder Dashboard</h2>

      {/* Create Policyholder */}
      <div className="section">
        <h3>Create Policyholder</h3>
        <button className="create-button" onClick={() => setShowPolicyholderForm(true)}>
          Create Policyholder
        </button>
      </div>

      {showPolicyholderForm && (
        <div className="form">
          <input
            type="text"
            placeholder="Name"
            value={policyholderName}
            onChange={(e) => setPolicyholderName(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            value={contactDetails.phone}
            onChange={(e) =>
              setContactDetails({ ...contactDetails, phone: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={contactDetails.email}
            onChange={(e) =>
              setContactDetails({ ...contactDetails, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Address"
            value={contactDetails.address}
            onChange={(e) =>
              setContactDetails({ ...contactDetails, address: e.target.value })
            }
          />
          <button onClick={createPolicyholder}>Submit</button>
          <button onClick={() => setShowPolicyholderForm(false)}>Cancel</button>
        </div>
      )}

      {/* Policy List */}
      <div className="section">
        <h3>Policy List</h3>
        <button className="create-button" onClick={fetchPolicies}>
          View Policies
        </button>
        <ul>
          {policies.map((policy) => (
            <li key={policy._id}>
              <h3>{policy.details} {policy.policyName}</h3>
              <h5>{policy.details} PolicyId: {policy._id}</h5>
              <h6>Coverage Amount Rs: {policy.coverageAmount}</h6>
              <h6>Start date: {new Date(policy.validityPeriod.startDate).toLocaleDateString('en-US')}</h6>
              <h6>End date: {new Date(policy.validityPeriod.endDate).toLocaleDateString('en-US')}</h6>
            </li>
          ))}
        </ul>
      </div>

      {/* Create Claim */}
      <div className="section">
        <h3>Create Claim</h3>
        <button className="create-button" onClick={() => setShowClaimForm(true)}>
          Create Claim
        </button>
      </div>

      {showClaimForm && (
        <div className="form">
          <input
            type="text"
            placeholder="Policy ID"
            value={claimId}
            onChange={(e) => setClaimId(e.target.value)}
          />
          <input
            type="number"
            placeholder="Claim Amount"
            value={claimAmount}
            onChange={(e) => setClaimAmount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Claim Description"
            value={claimDescription}
            onChange={(e) => setClaimDescription(e.target.value)}
          />
          <button onClick={createClaim}>Submit</button>
          <button onClick={() => setShowClaimForm(false)}>Cancel</button>
        </div>
      )}
     <div className="">
        <button className="logout-button" onClick={logoutfunc} >Logout</button>
      </div>
    </div>
  );
};

export default PolicyholderDashboard;
