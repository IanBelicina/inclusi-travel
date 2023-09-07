import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function AccByLocUpdateForm({ locationId }) {
  const [accessibilities, setaccessibilities] = useState([]);
  const [accessibilitiesID, setAccessibilitiesID] = useState([]);
  const [currentAccessibility, setCurrentAccessibility] = useState([]);
  const { token } = useAuthContext();

  async function fetchAccessibility() {
    const accessUrl = `${process.env.REACT_APP_API_HOST}/api/acessibility`;

    const response = await fetch(accessUrl);

    if (response.ok) {
      const data = await response.json();
      setaccessibilities(data.accessibilities);
    }
  }

  async function CurAccessibility() {
    const accessbylocation = `${process.env.REACT_APP_API_HOST}/api/locations/${locationId}/accessibilities`;
    const response = await fetch(accessbylocation);
    if (response.ok) {
      const curr_acc = await response.json();
      setCurrentAccessibility(curr_acc.accessibilities);
    }
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

  async function handleSubmit(event) {
    event.preventDefault();
    for (let access of currentAccessibility) {
      if (!accessibilitiesID.includes(access.id)) {
        const url = `${process.env.REACT_APP_API_HOST}/api/locations/${locationId}/accessibilities/${access.id}`;
        const fetchConfigAcc = {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const locactionAccessibilityResponse = await fetch(url, fetchConfigAcc);
        if (locactionAccessibilityResponse.ok) {
        }
      }
    }
    for (let new_acc of accessibilitiesID) {
      if (!currentAccessibility.includes(new_acc)) {
        const url = `${process.env.REACT_APP_API_HOST}/api/locations/${locationId}/accessibilities/${new_acc}`;
        const fetchConfig = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
        }
      }
    }
  }

  useEffect(() => {
    fetchAccessibility();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    CurAccessibility();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
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
              <label htmlFor={"accessibility"} className="form-check-label">
                {accessibility.name}
              </label>
            </div>
          ))}
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">
          Update
        </button>
      </div>
    </div>
  );
}
export default AccByLocUpdateForm;
