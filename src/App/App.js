import { Route, Routes, BrowserRouter } from "react-router-dom";
import React from "react";
import './App.css';

//Components Import
import Login from '../Pages/Login';
import Admin from '../Pages/Admin';
import Employees from '../Pages/Employees';
import Store from "../Context/AppContext";

function App() {

  return (

    <Store>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="Admin" element={<Admin />} />
          <Route path="Employees" element={<Employees />} />
        </Routes>
      </BrowserRouter>
    </Store>

  );

}

export default App;
