import React from "react";

const Rank = ({ currUser }) => {
  return (
    <div>
      <div className=" white f3">
        {currUser?.name},your current entry is ...
      </div>
      <div className=" white f1">{currUser?.entries}</div>
      <div className="mt4 white f3">Rank Badge: {currUser?.emoji}</div>
    </div>
  );
};

export default Rank;
