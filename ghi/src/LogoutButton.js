import React from "react";
import { Button } from "react-bootstrap";
import useAuth  from "@galvanize-inc/jwtdown-for-react";

function LogoutButton() {
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <Button variant="success" size="lg"  onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
