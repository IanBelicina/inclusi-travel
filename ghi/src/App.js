import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import Nav from "./Nav.js";

function App() {

  return (

    <BrowserRouter>
    <Nav />
    </BrowserRouter>
  );
}

export default App;
