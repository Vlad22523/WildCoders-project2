import SvgIcon from "../../../hooks/SvgIcon.jsx";
import EllipsisText from "react-ellipsis-text";
import s from "./Card.module.css";

const Card = ({ data }) => {
  const { title, description, priority, deadline } = data;
  console.log("cards", deadline);

  const priorityClass =
    priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();

  return (
    <div className={s.taskContainer}>
      <h4 className={s.title}>{title}</h4>
      <p className={s.descr}>
        <EllipsisText text={description} length={90} />
      </p>
      <div className={s.line}></div>
      <div className={s.optionsContainer}>
        <div className={s.optionsWrapper}>
          <div className={s.option}>
            <span className={s.optionLabel}>Priority</span>
            <p className={`${s.priorityValue} ${s[priority]}`}>
              {priorityClass}
            </p>
          </div>
          <div className={s.option}>
            <span className={s.optionLabel}>Deadline</span>
            <p className={s.deadlineDate}>
              {deadline instanceof Date
                ? deadline.toLocaleDateString()
                : deadline}
            </p>
          </div>
        </div>
        <div className={s.btnsWrapper}>
          <button className={s.btnOptions} type="button">
            <SvgIcon
              name="icon-arrow-circle-broken-right"
              width="16"
              height="16"
              className={s.icon}
            />
          </button>
          <button className={s.btnOptions} type="button">
            <SvgIcon
              name="icon-pencil"
              width="16"
              height="16"
              className={s.icon}
            />
          </button>
          <button className={s.btnOptions} type="button">
            <SvgIcon
              name="icon-trash"
              width="16"
              height="16"
              className={s.icon}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
