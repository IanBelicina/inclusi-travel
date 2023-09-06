import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import LocationUpdateForm from "./LocationUpdateform";
import AccByLocUpdateForm from "./UpdateAccessibilityForLocation";
function LocationDetails() {
  const [location, setLocations] = useState({});
  const [accessibilities, setaccessibilities] = useState([]);
  const [locationReviews, setLocationReviews] = useState([]);
  const { token } = useAuthContext();
  const { locationId } = useParams();
  const [update, setUpdate] = useState(false)
  const [updateAccess, setUpdateAccess] = useState(false);


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

  async function handleUpdate(){
    setUpdate(!update)
  }
  async function handleUpdateAccess() {
    setUpdateAccess(!updateAccess);
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

  useEffect(() => {
    fetchAccessibilities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateAccess]);

  return (
    <>
      <div className="card mb-4">
        <div className="location-card">
          <img
            src={location.picture}
            className="img-fluid rounded-start"
            style={{ maxHeight: "400px", maxWidth: "400px" }}
            alt="..."
          />
          <div className="location-card-right">
            {update ? (
              <>
                <div className="icons-location">
                  <button onClick={handleUpdate} className="btn">
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
                <LocationUpdateForm locationId={locationId} />
              </>
            ) : (
              <>
                <div className="loc-info">
                  <h1 className="card-title">{location.location_name}</h1>
                  <h3>
                    {location.address} {location.city}, {location.state}
                  </h3>
                </div>
                <div>
                  <div className="loc-info">
                    <h4>Accessibility Feature</h4>
                  </div>
                  {updateAccess ? (
                    <>
                    <button onClick={handleUpdateAccess} className="btn">
                      EXIT
                    </button>
                    <AccByLocUpdateForm locationId={locationId} />
                    </>
                  ) : (
                    <div className="access-list">
                      {accessibilities.map((accessibility) => (
                        <div key={accessibility.id}>
                          <li>{accessibility.name}</li>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="icons-location">
                  <div>
                    <button onClick={handleDelete} className="btn">
                      <i className="bi bi-trash3-fill  icon-size"></i>
                    </button>
                  </div>
                  <div>
                    <button onClick={handleUpdate} className="btn">
                      <i className="bi bi-pencil-square icon-size"></i>
                    </button>
                  </div>
                  <div>
                    <button onClick={handleUpdateAccess} className="btn">
                      Update
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
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
