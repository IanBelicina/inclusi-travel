import { useContext } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import React, { useState } from "react";

const CreateReview = () => {
  const [locationId, setLocationId] = useState("");
  const [accountId, setAccountId] = useState("");
  const [rating, setRating] = useState("");
  const [body, setBody] = useState("");

  const { token }  = useContext(AuthContext); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    const review = {
      location_id: locationId,
      account_id: accountId,
      rating: rating,
      body: body,
      created_on: new Date().toISOString().slice(0, 10),
    };

    try {
      const response = await fetch("http://localhost:8000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Location ID:
          <input
            type="text"
            value={locationId}
            onChange={(e) => setLocationId(e.target.value)}
          />
        </label>
        <label>
          Account ID:
          <input
            type="text"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />
        </label>
        <label>
          Rating:
          <input
            type="text"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </label>
        <label>
          Body:
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreateReview;
