import React from "react";

import Logo from "../Logo/Logo";
import { axiosinstance } from "../../../axiosinstance";

const Navigation = ({ setCurrUser, setImgUrl, setShowModal }) => {
  const signout = async () => {
    const { data } = await axiosinstance.post("/signout");

    if (data.status === "success") {
      setCurrUser();
      setImgUrl();
    }
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
        onClick={() => setShowModal((s) => !s)}
      >
        Profile Setting
      </p>
      <p
        className="f4 link dim black underline pa3 pointer mt3"
        onClick={signout}
      >
        Sign Out
      </p>
    </nav>
  );
};

export default Navigation;
