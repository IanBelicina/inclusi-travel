import React, { useContext } from "react";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";

const HomePage = () => {
  const authContext = useContext(AuthContext);

  if (!authContext.token) {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of our application.</p>
    </div>
  );
};

export default HomePage;
