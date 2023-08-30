import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function LocationForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [accessibilities, setaccessibilities] = useState([]);
  const [accessibilitiesID, setAccessibilitiesID] = useState([]);
  const [picture, setPicture] = useState("");
  const { token } = useAuthContext();

  async function fetchAccessibility() {
    const accessUrl = `${process.env.REACT_APP_API_HOST}/api/acessibility`;

    const response = await fetch(accessUrl);

    if (response.ok) {
      const data = await response.json();
      setaccessibilities(data.accessibilities);
    }
  }

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
    const url = `${process.env.REACT_APP_API_HOST}/api/locations/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, fetchConfig);
    const locationData = await response.json();
    const newLocationId = locationData.id;

    if (response.ok) {
      setName("");
      setAddress("");
      setCity("");
      setState("");
      setPicture("");
    }

    for (let acc of accessibilitiesID) {
      const accData = {
        location_id: newLocationId,
        acessibility_id: acc,
      };
      const url = `${process.env.REACT_APP_API_HOST}/api/locations/${newLocationId}/accessibilities/${acc}`;
      const fetchConfigAcc = {
        method: "post",
        body: JSON.stringify(accData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const locactionAccessibilityResponse = await fetch(url, fetchConfigAcc);
      if (locactionAccessibilityResponse.ok) {
        console.log("location", newLocationId, "accessability", acc);
      }
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

  function handleAccessbility(event) {
    const { value } = event.target;
    setAccessibilitiesID((prev) => [...prev, value]);
  }

  useEffect(() => {
    fetchAccessibility();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Location</h1>
          <form onSubmit={handleSubmit} id="create-location-form">
            <div className="form-floating mb-3">
              <label htmlFor="name">Location name</label>
              <input
                value={name}
                onChange={handleName}
                placeholder="name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="address">Address</label>
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
            <div className="form-floating mb-3">
              <label htmlFor="city">City</label>
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
            <div className="form-floating mb-3">
              <label htmlFor="state">State</label>
              <input
                value={state}
                onChange={handleState}
                placeholder="state"
                required
                type="text"
                name="state"
                id="state"
                className="form-control"
              />
            </div>
            <div className="form-floating mb-3">
              <label htmlFor="picture">Picture URL</label>
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
              <div>
                {accessibilities.map((accessibility) => (
                  <div key={accessibility.id} className="form-check">
                    <input
                      type="checkbox"
                      id={accessibility.id}
                      name="accessibilities"
                      value={accessibility.id}
                      onChange={handleAccessbility}
                      className="form-check-input"
                    />
                    <label
                      htmlFor={"accessibility"}
                      className="form-check-label"
                    >
                      {accessibility.name}
                    </label>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default LocationForm;
