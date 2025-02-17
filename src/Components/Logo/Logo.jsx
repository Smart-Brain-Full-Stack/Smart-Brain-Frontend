import React from "react";
import { Tilt } from "react-tilt";
import Brain from "./Brain.jpg";
const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt  shadow-2 br2"
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner">
          <img src={Brain} alt="Brain " className="br3" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
