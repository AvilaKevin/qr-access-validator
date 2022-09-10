//Library Import
import { Route, Routes, BrowserRouter } from "react-router-dom";
import React, { useEffect } from "react";
// import { collection, query, where, getDocs, doc } from "firebase/firestore"
// import db from '../Firebase/firebaseConfig.js'

//Components Import
import Login from '../Pages/Login';
import Admin from '../Pages/Admin';
import Employees from '../Pages/Employees';

import './App.css';
import Store from "../Context/AppContext";

function App() {

  // useEffect(() => {
  //   const obtenerDatos = async () => {
  //     const datos = await getDocs(collection(db, 'Usuarios'));
  //     datos.forEach((documento) => {
  //       console.log(documento.data());
  //     })
  //     // console.log(datos.docs);
  //   }

  //   obtenerDatos();
  // }, []);

  return (
    <Store>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="Admin" element={<Admin />} />
          <Route path="Employees/:ID" element={<Employees />} />
        </Routes>
      </BrowserRouter>
    </Store>
  );

}

export default App;
