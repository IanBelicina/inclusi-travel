import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
function LocationDetails() {
  const [location, setLocations] = useState({});
  const [accessibilities, setaccessibilities] = useState([]);
  const [locationReviews, setLocationReviews] = useState([]);
  const { token } = useAuthContext();
  const { locationId } = useParams();

  async function fetchLocation() {
    // console.log(locationId);
    const url = `${process.env.REACT_APP_API_HOST}/api/locations/${locationId}`;

    const response = await fetch(url);
    console.log(locationId);
    if (response.ok) {
      const data = await response.json();
      setLocations(data);
    }
  }

  async function fetchAccessibilities() {
    // console.log(locationId);
    const accessabilityUrl = `${process.env.REACT_APP_API_HOST}/api/locations/${locationId}/accessibilities`;

    const response = await fetch(accessabilityUrl);
    if (response.ok) {
      const accData = await response.json();
      setaccessibilities(accData.accessibilities);
    }
  }

  async function handleDelete(event) {
    event.preventDefault();
    const url = `${process.env.REACT_APP_API_HOST}/api/locations/${locationId}/`;
    const fetchConfig = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const locactionDelete = await fetch(url, fetchConfig);
    if (locactionDelete.ok) {
      setLocations({});
    }
  }

  async function fetchReviews() {
    const reviewsUrl = `${process.env.REACT_APP_API_HOST}/api/reviews`;

    const response = await fetch(reviewsUrl);
    if (response.ok) {
      const reviewsData = await response.json();

      let locationReviews = [];
      for (let review of reviewsData.reviews) {
        const reviewLocationId = parseInt(review.location_id.id);
        const parsedLocationId = parseInt(locationId);

        if (reviewLocationId === parsedLocationId) {
          locationReviews.push(review);
        }
      }

      setLocationReviews(locationReviews);
    }
  }
  console.log(locationReviews, "this is location reviews use state");

  useEffect(() => {
    fetchLocation();
    fetchAccessibilities();
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="card mb-4">
        <div className="card-header">{location.location_name}</div>
        <div className="card-body">
          <h5 className="card-title">
            {location.address} {location.city}, {location.state}
          </h5>
          <div>
            {accessibilities.map((accessibility) => (
              <div key={accessibility.id}>
                <p>accessibility feature: {accessibility.name}</p>
              </div>
            ))}
          </div>
          <button onClick={handleDelete} className="btn btn-primary">
            delete
          </button>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Review ID</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Created On</th>
          </tr>
        </thead>
        <tbody>
          {locationReviews.map((review) => {
            return (
              <tr key={review.id}>
                <td>
                  <a
                    href={`${process.env.PUBLIC_URL}/review/${review.id}/details`}
                  >
                    {review.id}
                  </a>
                </td>
                <td>{review.rating}</td>
                <td>{review.body}</td>
                <td>{review.created_on}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default LocationDetails;
