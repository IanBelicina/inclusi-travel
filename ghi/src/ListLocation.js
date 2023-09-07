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
  // console.log(locations)

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


  console.log(stars)
  return (
    <>
      <div>
        <h1>Locations List</h1>
      </div>
      <div className="mb-3">
        <input
          className="searchbar"
          type="search"
          placeholder="Filter by Name"
          onChange={handleSearch}
        ></input>
      </div>
      {locations
        .filter((location) => {
          return (
            search === "" ||
            location.location_name.toLowerCase().includes(search.toLowerCase())
          );
        })
        .map((location) => {
          return (
            <div key={location.id}>
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-2">
                    <img
                      src={location.picture}
                      className="img-fluid rounded-start"
                      style={{ width: "200px", height: "150px" }}
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <a
                        href={`${process.env.PUBLIC_URL}/locations/${location.id}`}
                      >
                        {" "}
                        <h5 className="card-title">{location.location_name}</h5>
                      </a>

                      <p className="card-text">
                        {location.address} {location.city},{location.state}
                      </p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          {stars[location.id]}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
export default LocationList;
