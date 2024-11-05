import { useEffect } from "react";
import s from "./Backdrop.module.css";

const Backdrop = ({ onClose }) => {
  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscClose);
    return () => {
      window.removeEventListener("keydown", handleEscClose);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return <div className={s.backdrop} onClick={handleBackdropClick}></div>;
};

export default Backdrop;
