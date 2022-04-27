import React from 'react';
import './App.css';
import {HashRouter, Routes, Route} from "react-router-dom";

// Screens
import DashboardScreen from './Screens/DashboardScreen';
import LoginScreen from './Screens/LoginScreen';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/dash" element={<DashboardScreen/>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
