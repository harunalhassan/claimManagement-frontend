import React, { useEffect, useState } from "react";
import axios from "axios";

const ClaimList = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    axios.get("https://claimmanagement-backend.onrender.com/api/claims").then((response) => {
      setClaims(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Claims List</h2>
      <ul>
        {claims.map((claim) => (
          <li key={claim.id}>{claim.description} - Status: {claim.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default ClaimList;
