import { createPortal } from "react-dom";
import Profile from "../Profile/Profile";

const Modal = ({ showModal, setShowModal }) => {
  return (
    <>
      {showModal &&
        createPortal(<Profile setShowModal={setShowModal} />, document.body)}
    </>
  );
};

export default Modal;
