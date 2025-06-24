import { createPortal } from "react-dom";
import Profile from "../Profile/Profile";

const Modal = ({ showModal, setShowModal, currUser, setCurrUser }) => {
  return (
    <>
      {showModal &&
        createPortal(
          <Profile
            setShowModal={setShowModal}
            currUser={currUser}
            setCurrUser={setCurrUser}
          />,
          document.body
        )}
    </>
  );
};

export default Modal;
