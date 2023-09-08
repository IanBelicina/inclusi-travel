import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function LocationUpdateForm({ locationId }) {
  async function fetchLocation() {
    const url = `${process.env.REACT_APP_API_HOST}/api/locations/${locationId}`;

    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setName(data.location_name);
      setAddress(data.address);
      setCity(data.city);
      setState(data.state);
      setPicture(data.picture);
    }
  }

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [picture, setPicture] = useState("");
  const { token } = useAuthContext();
  const [submitted, setSubmitted] = useState(false);

  let states = [
    "AK",
    "AL",
    "AR",
    "AZ",
    "CA",
    "CO",
    "CT",
    "DC",
    "DE",
    "FL",
    "GA",
    "HI",
    "IA",
    "ID",
    "IL",
    "IN",
    "KS",
    "KY",
    "LA",
    "MA",
    "MD",
    "ME",
    "MI",
    "MN",
    "MO",
    "MS",
    "MT",
    "NC",
    "ND",
    "NE",
    "NH",
    "NJ",
    "NM",
    "NV",
    "NY",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VA",
    "VT",
    "WA",
    "WI",
    "WV",
    "WY",
  ];

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      address: address,
      city: city,
      state: state,
      location_name: name,
      picture: picture,
      updated_on: "2023-08-1",
    };
    const url = `${process.env.REACT_APP_API_HOST}/api/locations/${locationId}`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setName("");
      setAddress("");
      setCity("");
      setState("");
      setPicture("");
      setSubmitted(true);
    }
  }

  function handleName(event) {
    const { value } = event.target;
    setName(value);
  }

  function handleAddress(event) {
    const { value } = event.target;
    setAddress(value);
  }

  function handleCity(event) {
    const { value } = event.target;
    setCity(value);
  }
  function handleState(event) {
    const { value } = event.target;
    setState(value);
  }
  function handlePicture(event) {
    const { value } = event.target;
    setPicture(value);
  }
  useEffect(() => {
    fetchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {submitted ? (
        <div
          className="alert alert-success d-flex align-items-center bi flex-shrink-0 me-2"
          role="alert"
        >
          <div>
            <p>Thank you for updating the location!</p>
          </div>
        </div>
      ) : (
        <div className="update-location-card ">
          <div>
            <label>Location Name</label>
            <input
              value={name}
              onChange={handleName}
              placeholder="name"
              required
              type="text"
              name="name"
              id="name"
              className="form-control textarea "
            />
          </div>
          <div className="update-loc-items">
            <div>
              <label>Address</label>
              <input
                value={address}
                onChange={handleAddress}
                placeholder="address"
                required
                type="text"
                name="address"
                id="address"
                className="form-control"
              />
            </div>
            <div>
              <label>City</label>
              <input
                value={city}
                onChange={handleCity}
                placeholder="city"
                required
                type="text"
                name="city"
                id="city"
                className="form-control"
              />
            </div>
            <div>
              <label>State</label>

              <select
                value={state}
                onChange={handleState}
                placeholder="state"
                required
                type="text"
                name="state"
                id="state"
                className="form-control "
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label>Picture Url</label>
            <input
              value={picture}
              onChange={handlePicture}
              placeholder="picture"
              required
              type="text"
              name="picture"
              id="picture"
              className="form-control"
            />
          </div>
          <div className="form-floating mb-3">
            <button onClick={handleSubmit} className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default LocationUpdateForm;
