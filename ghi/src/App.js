import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./LoginForm";
import HomePage from "./HomePage";
import SignupForm from "./SignUpForm";
import CreateReview from "./CreateReview";


import CommentForm from "./CommentForm";
import Nav from "./Nav";

function App() {
  // other stuff, here
  const domain = /https:\/\/[^/]+/;

  return (
    <div className="container">
      <BrowserRouter>
        <AuthProvider
          baseUrl={process.env.REACT_APP_API_HOST.replace(domain, "")}
        >
          <Nav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account/signup" element={<SignupForm />} />
            <Route path="/Token" element={<LoginForm />} />
            <Route path="/review/form" element={<CreateReview />} />
            <Route path="/comments/new" element={<CommentForm />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
