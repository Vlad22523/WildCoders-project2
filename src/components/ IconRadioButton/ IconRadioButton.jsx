import clsx from "clsx";
import s from "../ IconRadioButton/IconRadioButton.module.css";

export const IconRadioButton = ({ iconId, field, value }) => (
  <label className={s.input}>
    <input
      type="radio"
      {...field}
      value={value}
      checked={field.value === value}
      style={{ display: "none" }}
    />
    <svg
      width="18"
      height="18"
      className={clsx(field.value === value ? s.activeIcon : s.icon)}
    >
      <use href={`/src/images/icons.svg#${iconId}`} />
    </svg>
  </label>
);
