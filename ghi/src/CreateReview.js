import { useContext } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";
import React, { useState, useEffect } from "react";

const CreateReview = () => {
  const [locations, setLocations] = useState([]);
  const [locationId, setLocationId] = useState("");
  const [userAccountId, setUserAccountId] = useState(null);
  const [rating, setRating] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_HOST}/api/locations`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setLocations(data.locations);
      } catch (error) {
        console.error("There was an error fetching locations!", error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    async function getUserData() {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();

        setUserAccountId(data);
        // console.log(data.account.id);
      }
    }
    getUserData();
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const review = {
      location_id: locationId,
      // account_id: userAccountId,
      account_id: userAccountId.account.id,
      rating: rating,
      body: body,
      created_on: new Date().toISOString().slice(0, 10),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/api/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(review),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const data = await response.json();
        console.log(data);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="card text-bg-light mb-3">
      <h5 className="card-header">New Review</h5>
      <div className="card-body">
        {isSubmitted ? (
          <p>Thanks for your review!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="locationId" className="form-label">
                Location:
              </label>
              <select
                className="form-control"
                id="locationId"
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
              >
                <option value="">Select a location</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.location_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="rating" className="form-label">
                Rating:
              </label>
              <select
                className="form-control"
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="">Select a rating</option>
                {[1, 2, 3, 4, 5].map((rate) => (
                  <option key={rate} value={rate}>
                    {rate}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="body" className="form-label">
                Body:
              </label>
              <textarea
                className="form-control"
                id="body"
                rows="3"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateReview;
