import clsx from "clsx";
import s from "../BackgroundRadioButton/BackgroundRadioButton.module.css";

export const BackgroundRadioButton = ({ background, field }) => (
  <label className={s.input}>
    <input
      type="radio"
      {...field}
      value={background.id}
      checked={field.value === String(background.id)}
      style={{ display: "none" }}
    />
    {background.isSvg ? (
      <div className={s.div_background}>
        <svg
          width="28"
          height="28"
          className={clsx(
            s.iconBackground,
            field.value === String(background.id) && s.activeBackground
          )}
        >
          <use href="/src/images/icons.svg#icon-no-bg" />
        </svg>
      </div>
    ) : (
      <img
        src={background.src}
        alt={background.alt}
        className={clsx(
          s.backgroundImages,
          field.value === String(background.id) && s.activeBackground
        )}
      />
    )}
  </label>
);
