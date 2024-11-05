import s from "../DeleteBoardForm/DeleteBoardForm.module.css";

export const DeleteBoardForm = ({ onClose }) => {
  return (
    <div className={s.container} onClick={(e) => e.stopPropagation()}>
      <button type="button" onClick={onClose} className={s.closeButton}>
        <svg width="18" height="18">
          <use href={`/src/images/icons.svg#icon-close`} />
        </svg>
      </button>
      <h2 className={s.title}>Are you sure you want to delete board?</h2>
      <div className={s.containerButton}>
        <button className={s.button} onClick={onClose}>
          No
        </button>
        <button className={s.button}>Yes</button>
      </div>
    </div>
  );
};
