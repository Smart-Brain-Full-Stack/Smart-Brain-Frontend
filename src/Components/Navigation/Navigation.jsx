import React from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../Logo/Logo";

const Navigation = ({ setCurrUser, setImgUrl }) => {
  const navigate = useNavigate();

  const resetUser = () => {
    setCurrUser();
    setImgUrl();
    navigate("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
      className="mb5"
    >
      <Logo />
      <p
        className="f4 link dim black underline pa3 pointer mt3"
        onClick={resetUser}
      >
        Profile Setting
      </p>
      <p
        className="f4 link dim black underline pa3 pointer mt3"
        onClick={resetUser}
      >
        Sign Out
      </p>
    </nav>
  );
};

export default Navigation;
