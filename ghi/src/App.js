
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./LoginForm";



function App() {
  // other stuff, here
    const domain = /https:\/\/[^/]+/;
    



  return (
    <div className="container">


    <BrowserRouter>
      <AuthProvider baseUrl={process.env.REACT_APP_API_HOST.replace(domain, "")}>
        <Routes>
          <Route path="/Token" element={<LoginForm />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>

    </div>
  );
}

export default App;
