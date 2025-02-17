import React from "react";
import { Link } from "react-router-dom";

const RegisterNav = () => {
  return (
    <nav
      style={{ display: "flex", justifyContent: "flex-end", height: "1rem" }}
    >
      <Link to="/register">
        <p className="f3 link dim black underline pa3 pointer">Register</p>
      </Link>
    </nav>
  );
};

export default RegisterNav;
