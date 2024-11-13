import SvgIcon from "../../../hooks/SvgIcon.jsx";
import s from "./InProgress.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectAllColumns } from "../../../redux/columns/selectors.js";
import { editCardThunk } from "../../../redux/cards/operations.js";
import { toggleIsVisibleInPro } from "../../../redux/cards/slice.js";

const InProgress = ({ card, columnId }) => {
  const dispatch = useDispatch();
  const columns = useSelector(selectAllColumns);

  const handleClickColumn = (e) => {
    e.preventDefault();
    dispatch(toggleIsVisibleInPro());
    const updateCard = {
      title: card.title,
      description: card.description,
      priority: card.priority,
      dateDeadline: card.dateDeadline,
      columnId: e.currentTarget.id,
    };
    dispatch(editCardThunk({ cardId: card._id, body: updateCard }));
  };

  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        {columns.map((column) => {
          return (
            <div key={column._id}>
              <button
                className={s.column_btnChoice}
                id={column._id}
                onClick={handleClickColumn}
                disabled={column._id === columnId}
              >
                <div className={s.column_box}>
                  <p
                    className={`${s.column_text} 
                    ${column._id === columnId ? s.active : ""}
                    `}
                  >
                    {column.title}
                  </p>
                  <SvgIcon
                    name="icon-arrow-circle-broken-right"
                    width="16"
                    height="16"
                    className={`${s.icon} 
                    ${column._id === columnId ? s.active : ""}
                    `}
                  />
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InProgress;
