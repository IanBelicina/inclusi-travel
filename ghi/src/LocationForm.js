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

      await fetch(url, fetchConfigAcc);
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

    if (accessibilitiesID.includes(value)) {
      let delete_checked = accessibilitiesID.filter((item) => item !== value);
      setAccessibilitiesID(delete_checked);
    } else {
      setAccessibilitiesID((prev) => [...prev, value]);
    }
  }
  useEffect(() => {
    fetchAccessibility();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (token == null) {
    return (
      <div
        className="alert alert-danger d-flex align-items-center bi flex-shrink-0 me-2"
        role="alert"
      >
        <div>
          <p>Only logged in users can make a location :(</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bottom-page-padding">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow text-bg-light p-4 mt-4">
            <center>
              <h1>Location Form</h1>
            </center>
            <form onSubmit={handleSubmit} id="create-location-form">
              <div className="form-floating mb-3">
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
                <label htmlFor="name">Location name</label>
              </div>
              <div className="form-floating mb-3">
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
                <label htmlFor="address">Address</label>
              </div>
              <div className="form-floating mb-3">
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
                <label htmlFor="city">City</label>
              </div>
              <div className="form-floating mb-3">
                <select
                  value={state}
                  onChange={handleState}
                  placeholder="state"
                  required
                  type="text"
                  name="state"
                  id="state"
                  className="form-control"
                >
                  <option value="">Select a state</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-floating mb-3">
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
                <label htmlFor="picture">Picture URL</label>
              </div>
              <div className="form-floating mb-3">
                <div>
                  <label htmlFor="name">
                    <h3>Accessibilities:</h3>
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {accessibilities.map((accessibility) => (
                      <div key={accessibility.id} className="form-check">
                        <input
                          type="checkbox"
                          name="accessibilities"
                          value={accessibility.id}
                          onClick={handleAccessbility}
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
                </div>
                <button className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LocationForm;
