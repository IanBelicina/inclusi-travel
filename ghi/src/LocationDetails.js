import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import LocationUpdateForm from "./LocationUpdateform";
import AccByLocUpdateForm from "./UpdateAccessibilityForLocation";
import CreateReview from "./CreateReview";
import { Navigate } from "react-router-dom";
import ReviewComments from "./ReviewComments";

function LocationDetails() {
  const [location, setLocations] = useState({});
  const [accessibilities, setaccessibilities] = useState([]);
  const [locationReviews, setLocationReviews] = useState([]);
  const { token } = useAuthContext();
  const { locationId } = useParams();
  const [update, setUpdate] = useState(false);
  const [updateAccess, setUpdateAccess] = useState(false);
  const [redirectToLoc, setRedirectToLoc] = useState(false);
  const [stars, setStars] = useState({});

  async function fetchLocation() {
    const url = `${process.env.REACT_APP_API_HOST}/api/locations/${locationId}`;

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setLocations(data);
    }
  }

  async function fetchAccessibilities() {
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
      setRedirectToLoc(true);
    }
  }

  async function handleUpdate() {
    setUpdate(!update);
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
        review["replies"] = false;

        const reviewLocationId = parseInt(review.location_id.id);
        const parsedLocationId = parseInt(locationId);

        if (reviewLocationId === parsedLocationId) {
          locationReviews.push(review);
        }
      }

      setLocationReviews(locationReviews);
    }
  }

  async function handleReplies(rev) {
    const updateReplies = locationReviews.map((review) => {
      if (review.id === rev) {
        return { ...review, replies: !review.replies };
      } else {
        return review;
      }
    });
    setLocationReviews(updateReplies);
  }

  async function Stars() {
    locationReviews.map(async (review) => {
      const stars = [];

      for (let i = 0; i < review.rating; i++) {
        stars.push(<i key={i} className="bi bi-star-fill"></i>);
      }
      for (let i = review.rating; i < 5; i++) {
        stars.push(<i key={i} className="bi bi-star "></i>);
      }
      let reviewId = review.id;
      let starobj = {};
      starobj[reviewId] = stars;
      setStars((loc) => ({
        ...loc,
        ...starobj,
      }));
    });
  }

  useEffect(() => {
    fetchLocation();
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchAccessibilities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateAccess]);
  useEffect(() => {
    Stars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationReviews]);
  return (
    <>
      {redirectToLoc ? <Navigate to="/locations/" /> : null}
      <div className="location-card">
        <div className="location-card-left">
          <div className="picture">
            <img
              src={location.picture}
              className="img-fluid rounded-start"
              style={{ maxHeight: "300px" }}
              alt="..."
            />
          </div>
          <div>
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
                <div className="loc-info ">
                  <div>
                    <h4 className="word">
                      <span>Location Information</span>
                    </h4>
                  </div>
                  <h2 className="card-title">{location.location_name}</h2>
                  <p>
                    {location.address} {location.city}, {location.state}
                  </p>
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
                  </div>
                </div>
                <div>
                  <div>
                    <h4 className="word">
                      <span>Accessibility Feature</span>
                    </h4>
                  </div>
                  {updateAccess ? (
                    <>
                      <button onClick={handleUpdateAccess} className="btn">
                        EXIT
                      </button>
                      <AccByLocUpdateForm locationId={locationId} />
                    </>
                  ) : (
                    <div>
                      <div className="access-list">
                        {accessibilities.map((accessibility) => (
                          <div key={accessibility.id}>
                            <li>{accessibility.name}</li>
                          </div>
                        ))}
                      </div>
                      <div className="icons-location">
                        <button onClick={handleUpdateAccess} className="btn">
                          <i className="bi bi-pencil-square icon-size"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="location-card-right">
          <div>
            <CreateReview locationId={locationId} fetchReviews={fetchReviews} />
          </div>
          {locationReviews.map((review) => (
            <div key={review.id} className="review-container">
              <div className="review-container-head">
                <div>{stars[review.id]}</div>
                <div>{review.created_on}</div>
              </div>
              <p>{review.body}</p>
              <div>
                {review.replies ? (
                  <div>
                    <ReviewComments reviewIdInt={review.id} />
                    <button onClick={() => handleReplies(review.id)}>
                      close replies
                    </button>
                  </div>
                ) : (
                  <button onClick={() => handleReplies(review.id)}>
                    replies
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default LocationDetails;
