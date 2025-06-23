import React, { useState } from "react";

const Dropdown = ({ resetUser }) => {
  return (
    <div className="">
      <ul className="list pa0 ba br2 bg-white w5 shadow-1 overflow-hidden ">
        <li
          className="pa2 pointer hover-bg-light-gray "
          onClick={() => console.log("Profile Settings")}
        >
          Profile Settings
        </li>
        <li className="pa2 pointer hover-bg-light-gray " onClick={resetUser}>
          Sign Out
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
