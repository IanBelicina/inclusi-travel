import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./LoginForm";
import HomePage from "./HomePage";
import SignupForm from "./SignUpForm";
import LocationList from "./ListLocation";
import CreateReview from "./CreateReview";
import ReviewComments from "./ReviewComments";
import CommentForm from "./CommentForm";
import Nav from "./Nav";
import LocationForm from "./LocationForm";
import LocationDetails from "./LocationDetails";
import AccessibilityForm from "./AccessibilityForm";
import LogoutButton from "./Logout";

function App() {
  // other stuff, here
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
            <Route path="/Token" element={<LoginForm />} />
            <Route path="/locations" element={<LocationList />} />
            <Route
              path="/locations/:locationId"
              element={<LocationDetails />}
            />
            <Route path="/review/form" element={<CreateReview />} />
            <Route path="/comments/new" element={<CommentForm />} />
            <Route path="/locations/form" element={<LocationForm />} />
            <Route
              path="/review/:reviewId/details"
              element={<ReviewComments />}
            />
            <Route path="/accessibility/form" element={<AccessibilityForm />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
