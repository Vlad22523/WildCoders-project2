import { useEffect, useState } from "react";
import s from "./Backdrop.module.css";

const Backdrop = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
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

  return (
    <div
      className={`${s.backdrop} ${isVisible ? s.show : ""}`}
      onClick={handleBackdropClick}
    ></div>
  );
};

export default Backdrop;
