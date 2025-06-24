import React from "react";
import "./Profile.css";

const Profile = ({ setShowModal, currUser }) => {
  console.log(currUser);
  return (
    <div className="profile-modal">
      <div className="pa4 br3 shadow-4 bg-white w-30 pointer">
        <div>
          <h2 className="normal">{currUser?.name.toUpperCase()}</h2>
          <h3 className="normal">Images Submitted: {currUser?.entries}</h3>
          <p>Member since: {new Date(currUser?.joined).toLocaleDateString()}</p>
        </div>
        <hr className="mt4 mb4" />
        <form className="flex flex-column">
          <label className="f6 b db mb2">Name:</label>
          <input
            type="name"
            className="pa3 input-reset ba bg-transparent w-95 mb3"
            placeholder={currUser?.name}
          />
          <label className="f6 b db mb2">Age:</label>
          <input
            type="name"
            className="pa3 input-reset ba bg-transparent w-95 mb3"
            placeholder={currUser?.age || "???"}
          />
        </form>
        <div
          className="mt4"
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <button
            onClick={() => setShowModal(false)}
            className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20 br3"
          >
            Save
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20 br3"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
