import { useDispatch } from "react-redux";
import s from "../DeleteBoardForm/DeleteBoardForm.module.css";
import { deleteBoardThunk } from "../../redux/boards/operations.js";
import { useNavigate } from "react-router-dom";
import SvgIcon from "../../hooks/SvgIcon.jsx";

export const DeleteBoardForm = ({ onClose, boardId, title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteBoardThunk(boardId)).then(() => {
      navigate("/home");
    });
    onClose();
  };

  return (
    <div className={s.container} onClick={(e) => e.stopPropagation()}>
      <button type="button" onClick={onClose} className={s.closeButton}>
        <SvgIcon name="icon-plus" width="18" height="18" />
      </button>
      <h2 className={s.title}>
        Are you sure you want to delete board <span>&quot;{title}&quot;</span>?
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
