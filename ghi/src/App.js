
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./LoginForm";
import HomePage from "./HomePage";
import SignupForm from "./SignUpForm";



function App() {
  // other stuff, here
    const domain = /https:\/\/[^/]+/;
    



  return (
    <div className="container">
      <BrowserRouter>
        <AuthProvider
          baseUrl={process.env.REACT_APP_API_HOST.replace(domain, "")}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account/signup" element={<SignupForm />} />
            <Route path="/Token" element={<LoginForm />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
