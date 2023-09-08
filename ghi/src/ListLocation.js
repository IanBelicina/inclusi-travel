import React, { useState, useEffect } from "react";

function LocationList() {
  const [locations, setLocations] = useState([]);
  const [rating, setRating] = useState({});
  const [search, setSearch] = useState("");
  const [stars, setStars] = useState({});

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
  async function Stars() {
    locations.map(async (location) => {
      let starrating = rating[location.id];
      const stars = [];
      let rate = Math.floor(starrating);

      for (let i = 0; i < rate; i++) {
        stars.push(<i key={i} className="bi bi-star-fill"></i>);
      }
      for (let i = rate; i < 5; i++) {
        stars.push(<i key={i} className="bi bi-star "></i>);
      }
      let locID = location.id;
      let starobj = {};
      starobj[locID] = stars;
      setStars((loc) => ({
        ...loc,
        ...starobj,
      }));
    });
  }
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    fetchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    Rating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);
  useEffect(() => {
    Stars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

  return (
    <>
      <div className="bottom-page-padding">
        <div className="title-searchbar-container">
          <div>
            <div className="text-5xl white-text">Locations List</div>
          </div>
          <div>
            <input
              className="searchbar"
              type="search"
              placeholder="Filter by Name"
              onChange={handleSearch}
            ></input>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-4">
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
                  <div key={location.id}>
                    <a
                      className="unlink-text"
                      href={`${process.env.PUBLIC_URL}/locations/${location.id}`}
                    >
                      <div className="location-listing-container">
                        <img
                          src={location.picture}
                          className="location-listing-picture"
                          alt="..."
                        />
                        <div className="location-listing-text">
                          <h5>{location.location_name}</h5>
                          <div>
                            {location.address} {location.city},{location.state}
                          </div>
                          <div>{stars[location.id]}</div>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
export default LocationList;
