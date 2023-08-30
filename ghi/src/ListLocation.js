import React, { useState, useEffect } from "react";

function LocationList() {
  const [locations, setLocations] = useState([]);
  const [rating, setRating] = useState({});
  const [search, setSearch] = useState("");

  async function fetchLocation() {
    const url = `${process.env.REACT_APP_API_HOST}/api/locations/`;

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations);
    }
  }

  async function Rating() {
    locations.map(async (location) => {
      const url = `${process.env.REACT_APP_API_HOST}/api/locations/${location.id}/average_rating`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        let locID = location.id;
        let ratingObj = {};
        ratingObj[locID] = data;
        setRating((loc) => ({
          ...loc,
          ...ratingObj,
        }));
      }
    });
  }
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    fetchLocation();
  }, []);
  useEffect(() => {
    Rating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);

  return (
    <>
      <div>
        <h1>Locations List</h1>
      </div>
      <input
        className="searchInput"
        type="search"
        placeholder="search"
        onChange={handleSearch}
      ></input>
      <button>Search</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>picture</th>
            <th>updatedon</th>
            <th>average rating</th>
          </tr>
        </thead>
        <tbody>
          {locations
            .filter((location) => {
              return (
                search === "" ||
                location.location_name
                  .toLowerCase()
                  .includes(search.toLowerCase())
              );
            })
            .map((location) => {
              return (
                <tr key={location.id}>
                  <td>
                    <a
                      href={`${process.env.PUBLIC_URL}/locations/${location.id}`}
                    >
                      {location.location_name}
                    </a>
                  </td>
                  <td>{location.address}</td>
                  <td>{location.city}</td>
                  <td>{location.state}</td>
                  <td>
                    <img
                      src={location.picture}
                      alt=""
                      style={{ width: "200px", height: "200px" }}
                    />
                  </td>
                  <td>{location.updated_on}</td>
                  <td>{rating[location.id]}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
export default LocationList;
