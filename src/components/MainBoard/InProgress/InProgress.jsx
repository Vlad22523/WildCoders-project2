import SvgIcon from "../../../hooks/SvgIcon.jsx";
import s from "./InProgress.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectAllColumns } from "../../../redux/columns/selectors.js";
import { editCardThunk } from "../../../redux/cards/operations.js";
import { toggleIsVisibleInPro } from "../../../redux/cards/slice.js";
import clsx from "clsx";

const InProgress = ({ card }) => {
  const dispatch = useDispatch();
  const columns = useSelector(selectAllColumns);

  const handleClickColumn = (e) => {
    e.preventDefault();
    console.log("columnId=", e.currentTarget.id);
    console.log("cardId=", card);
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
      <ul className={s.inProgress_wrap}>
        {columns.map((column) => {
          return (
            <li key={column._id} className={s.inProgress_inner}>
              <button
                className={clsx(s.inProgress_btn, {
                  [s.activeButton]: column._id === card.columnId,
                })}
                id={column._id}
                onClick={handleClickColumn}
              >
                <div className={s.inProgress_box}>
                  <p className={s.inProgress_text}>{column.title}</p>
                  <SvgIcon
                    name="icon-arrow-circle-broken-right"
                    width="16"
                    height="16"
                    className={s.icon}
                  />
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InProgress;
