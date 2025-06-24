import { createPortal } from "react-dom";
import Profile from "../Profile/Profile";

const Modal = ({ showModal, setShowModal, currUser }) => {
  return (
    <>
      {showModal &&
        createPortal(
          <Profile setShowModal={setShowModal} currUser={currUser} />,
          document.body
        )}
    </>
  );
};

export default Modal;
