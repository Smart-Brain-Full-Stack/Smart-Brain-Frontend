import React from "react";
import { useNavigate } from "react-router-dom";

const Navigation = ({ setCurrUser }) => {
  const navigate = useNavigate();
  const resetUser = () => {
    setCurrUser();
    navigate("/");
  };
  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <p
        className="f3 link dim black underline pa3 pointer"
        onClick={resetUser}
      >
        Sign Out
      </p>
    </nav>
  );
};

export default Navigation;
