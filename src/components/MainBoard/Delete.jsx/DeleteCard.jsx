import { useEffect } from "react";
import { useDispatch } from "react-redux";
import s from "./DeleteCard.module.css";

import { deleteCardThunk } from "../../../redux/cards/operations";
import SvgIcon from "../../../hooks/SvgIcon.jsx";

const DeleteCard = ({ onClose, isOpen, idCard, title }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onSubmit = () => {
    dispatch(deleteCardThunk(idCard));
  };

  if (!isOpen) return null;

  return (
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.container} onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className={s.closeButton}>
          <SvgIcon
            name="icon-plus"
            width="20"
            height="20"
            className={s.svg_close}
          />
        </button>
        <div className={s.container_form}>
          <h2 className={s.title}>
            Are you sure you want to delete <br /> card{" "}
            <span>&quot;{title}&quot;</span>?
          </h2>
          <div className={s.containerButton}>
            <button className={s.button} onClick={onClose}>
              No
            </button>
            <button onClick={onSubmit} className={s.button}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCard;
