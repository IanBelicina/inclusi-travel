import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const { logout } = useToken();
  const navigate = useNavigate();

  async function handleLogout(event) {
    logout();
    navigate("/");
  }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LogoutButton;
