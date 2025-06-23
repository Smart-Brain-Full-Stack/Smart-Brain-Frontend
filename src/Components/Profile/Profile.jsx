import React from "react";
import "./Profile.css";

const Profile = ({ setShowModal }) => {
  return (
    <div className="profile-modal" onClick={() => setShowModal(false)}>
      Profile
    </div>
  );
};

export default Profile;
