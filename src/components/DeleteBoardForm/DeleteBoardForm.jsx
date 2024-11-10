import { useDispatch } from "react-redux";
import s from "../DeleteBoardForm/DeleteBoardForm.module.css";
import { deleteBoardThunk } from "../../redux/boards/operations";

export const DeleteBoardForm = ({ onClose, boardId, title }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    await dispatch(deleteBoardThunk(boardId));
    onClose();
  };

  return (
    <div className={s.container} onClick={(e) => e.stopPropagation()}>
      <button type="button" onClick={onClose} className={s.closeButton}>
        <svg width="18" height="18">
          <use href={`/src/images/icons.svg?t=1730829317287#icon-plus`} />
        </svg>
      </button>
      <h2 className={s.title}>
        Are you sure you want to delete board <span>{title}</span> ?
      </h2>
      <div className={s.containerButton}>
        <button className={s.button} onClick={onClose}>
          No
        </button>
        <button className={s.button} onClick={handleDelete}>
          Yes
        </button>
      </div>
    </div>
  );
};
