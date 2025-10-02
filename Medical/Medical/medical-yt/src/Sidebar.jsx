import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: "220px",
      background: "#9b59b6",
      height: "100vh",
      color: "#fff",
      padding: "20px",
      boxSizing: "border-box"
    }}>
      <h2>Menu</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ margin: "15px 0" }}>
          <NavLink
            to="/dashboard/home"
            style={({ isActive }) => ({
              color: "#fff",
              textDecoration: "none",
              fontWeight: isActive ? "bold" : "normal"
            })}
          >
            Home
          </NavLink>
        </li>
        <li style={{ margin: "15px 0" }}>
          <NavLink
            to="/dashboard/about"
            style={({ isActive }) => ({
              color: "#fff",
              textDecoration: "none",
              fontWeight: isActive ? "bold" : "normal"
            })}
          >
            About
          </NavLink>
        </li>
        <li style={{ margin: "15px 0" }}>
          <NavLink
            to="/dashboard/contact"
            style={({ isActive }) => ({
              color: "#fff",
              textDecoration: "none",
              fontWeight: isActive ? "bold" : "normal"
            })}
          >
            Contact
          </NavLink>
        </li>
        <li style={{ margin: "15px 0" }}>
          <NavLink
            to="/dashboard/data"
            style={({ isActive }) => ({
              color: "#fff",
              textDecoration: "none",
              fontWeight: isActive ? "bold" : "normal"
            })}
          >
            Data
          </NavLink>
        </li>
        <li style={{ margin: "15px 0" }}>
          <NavLink
            to="/dashboard/demo"
            style={({ isActive }) => ({
              color: "#fff",
              textDecoration: "none",
              fontWeight: isActive ? "bold" : "normal"
            })}
          >
            Demo
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
