import clsx from "clsx";
import s from "../ IconRadioButton/IconRadioButton.module.css";
import SvgIcon from "../../hooks/SvgIcon.jsx";

export const IconRadioButton = ({ iconId, field, value }) => (
  <label className={s.input}>
    <input
      type="radio"
      {...field}
      value={value}
      checked={field.value === value}
      style={{ display: "none" }}
    />
    <SvgIcon
      name={iconId}
      width="18"
      height="18"
      className={clsx(field.value === value ? s.activeIcon : s.icon)}
    />
  </label>
);
