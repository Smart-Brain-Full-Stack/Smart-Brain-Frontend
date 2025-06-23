import React from "react";
import Brain from "./Brain.jpg";
const Logo = () => {
  return (
    <div className="ma4">
      <div className="Tilt-inner">
        <img
          src={Brain}
          alt="Brain "
          className="br3 dim"
          style={{ maxWidth: "10%", display: "block" }}
        />
      </div>
    </div>
  );
};

export default Logo;
