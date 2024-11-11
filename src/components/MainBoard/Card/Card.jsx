import SvgIcon from "../../../hooks/SvgIcon.jsx";
import EllipsisText from "react-ellipsis-text";
import s from "./Card.module.css";
import { format, isBefore, isSameDay } from "date-fns";

const Card = ({ data }) => {
  const { title, description, priority, dateDeadline } = data;

  const isToday = (date) => {
    return isSameDay(new Date(date), new Date());
  };

  const isPastDate = (date) => {
    return isBefore(new Date(date), new Date());
  };

  const isDeadlineToday = dateDeadline ? isToday(dateDeadline) : false;
  const isDeadlinePast = dateDeadline ? isPastDate(dateDeadline) : false;

  const formattedDeadline = dateDeadline
    ? format(new Date(dateDeadline), "MM/dd/yyyy")
    : "No deadline";

  const priorityClass =
    priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();

  const priorityColors = {
    without: "rgba(var(--text-color-mainboard), 0.3)",
    low: "#8fa1d0",
    medium: "#E09CB5",
    high: "#BEDBB0",
  };

  const priorityColor =
    priorityColors[priority.toLowerCase()] ||
    "rgba(var(--text-color-mainboard), 0.3)";

  return (
    <div
      className={s.taskContainer}
      style={{ "--default-color": priorityColor }}
    >
      <h4 className={s.title}>{title}</h4>
      <p className={s.descr}>
        <EllipsisText text={description} length={90} />
      </p>
      <div className={s.line}></div>
      <div className={s.optionsContainer}>
        <div className={s.optionsWrapper}>
          <div className={s.option}>
            <span className={s.optionLabel}>Priority</span>
            <div className={s.priorityContainer}>
              <p
                className={`${s.priorityValue} ${s[priority]}`}
                style={{ "--default-color": priorityColor }}
              >
                {priorityClass}
              </p>
            </div>
          </div>
          <div className={s.option}>
            <span className={s.optionLabel}>Deadline</span>
            <p className={s.deadlineDate}>{formattedDeadline}</p>
          </div>
        </div>
        <div className={s.btnsWrapper}>
          {(isDeadlineToday || isDeadlinePast) && (
            <div className={s.iconWrapper}>
              <SvgIcon
                name="icon-bell"
                width="16"
                height="16"
                className={`${s.icon} ${
                  isDeadlineToday
                    ? s.iconBell
                    : isDeadlinePast
                    ? s.iconBellLose
                    : ""
                }`}
              />
              <div className={s.tooltip}>
                {isDeadlineToday
                  ? "Deadline is today"
                  : `Deadline has passed ${formattedDeadline}`}
              </div>
            </div>
          )}

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
