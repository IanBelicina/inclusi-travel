
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import LoginForm from "./LoginForm";

function App() {
  // other stuff, here

  return (
    <BrowserRouter>
      <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
        <Routes>
          <Route path="/Token" element={<LoginForm />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
