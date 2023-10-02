import React from 'react';
import './App.css';
import { Route,Routes, BrowserRouter } from "react-router-dom";
import SistemaSolar from './pages/sistema_solar';
import Menu from './pages/menu'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />}></Route>
          <Route path="/sistemaSolar" element={<SistemaSolar/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
