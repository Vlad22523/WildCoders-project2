import { useEffect } from "react";
import s from "./DeleteColumn.module.css";
import SvgIcon from "../../../hooks/SvgIcon.jsx";
import { useDispatch } from "react-redux";
import {
  fetchColumnsThunk,
  fetchDeleteColumn,
} from "../../../redux/columns/operations.js";

export const DeleteColumn = ({ isOpen, onClose, title, id, boardId }) => {
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
    dispatch(fetchDeleteColumn(id)).then(() =>
      dispatch(fetchColumnsThunk(boardId))
    );
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
            Are you sure you want to delete <br /> column {title}?
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
