import React, { useState } from "react";
import "./Profile.css";
import { axiosinstance } from "../../../axiosinstance";

const Profile = ({ setShowModal, currUser, setCurrUser }) => {
  const [tempUser, setTempUser] = useState(currUser);

  const formSubmit = async () => {
    const payload = {};

    if (tempUser.name !== currUser.name) payload.name = tempUser.name;
    if (tempUser.age !== currUser.age) payload.age = tempUser.age;

    try {
      const { data } = await axiosinstance.put(
        `/profile/${currUser.id}`,
        payload
      );

      setCurrUser(data.data.user);
      setShowModal(false);
    } catch (error) {
      console.error("Update failed:", error.response?.data || error.message);
    }
  };

  const onFormChange = (event) => {
    switch (event.target.name) {
      case "user-name":
        if (event.target.value !== undefined)
          setTempUser((u) => ({ ...u, name: event.target.value }));
        break;
      case "user-age":
        setTempUser((u) => ({ ...u, age: event.target.value }));
        break;
      default:
        return;
    }
  };

  return (
    <div className="profile-modal">
      <div className="pa4 br3 shadow-4 bg-white w-30 pointer">
        <div>
          <h2 className="normal">{tempUser?.name.toUpperCase()}</h2>
          <h3 className="normal">Images Submitted: {tempUser?.entries}</h3>
          <p>Member since: {new Date(tempUser?.joined).toLocaleDateString()}</p>
        </div>
        <hr className="mt4 mb4" />
        <form className="flex flex-column">
          <label className="f6 b db mb2">Name:</label>
          <input
            type="name"
            name="user-name"
            className="pa3 input-reset ba bg-transparent w-95 mb3"
            placeholder={currUser?.name}
            onChange={onFormChange}
          />
          <label className="f6 b db mb2">Age:</label>
          <input
            type="number"
            name="user-age"
            className="pa3 input-reset ba bg-transparent w-95 mb3 no-spinner"
            placeholder={currUser?.age || "???"}
            onChange={onFormChange}
          />
        </form>
        <div
          className="mt4"
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <button
            onClick={formSubmit}
            className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20 br2"
          >
            Save
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20 br2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
