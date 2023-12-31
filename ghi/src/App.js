import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./LoginForm";
import HomePage from "./HomePage";
import SignupForm from "./SignUpForm";
import LocationList from "./ListLocation";
import Nav from "./Nav";
import LocationForm from "./LocationForm";
import LocationDetails from "./LocationDetails";
import AccessibilityForm from "./AccessibilityForm";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  return (
    <div className="container">
      <BrowserRouter basename={basename}>
        <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
          <Nav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/locations" element={<LocationList />} />
            <Route
              path="/locations/:locationId"
              element={<LocationDetails />}
            />
            <Route path="/locations/form" element={<LocationForm />} />
            <Route path="/accessibility/form" element={<AccessibilityForm />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
