import React, { useState } from "react";
import axios from "axios";

const CreateClaim = () => {
  const [policyId, setPolicyId] = useState("");
  const [description, setDescription] = useState("");
  const [claimAmount, setClaimAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://claimmanagement-backend.onrender.com/api/claims", {
        policyId,
        description,
        claimAmount,
      });
      alert("Claim submitted successfully!");
    } catch (error) {
      alert("Failed to create claim.");
    }
  };

  return (
    <div>
      <h2>Create Claim</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Policy ID" value={policyId} onChange={(e) => setPolicyId(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Claim Amount" value={claimAmount} onChange={(e) => setClaimAmount(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateClaim;
