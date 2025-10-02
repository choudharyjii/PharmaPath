import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Login from "./Login";
import Dashboard from "./Dashboard";

import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Data from "./Data";
import Demo from "./Demo";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard/home" /> : <Login onLogin={() => setIsLoggedIn(true)} />
          }
        />

        {/* Dashboard Route with nested routes */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        >
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="data" element={<Data />} />
          <Route path="demo" element={<Demo />} />
        </Route>

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
