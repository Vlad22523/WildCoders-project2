import clsx from "clsx";
import s from "../BackgroundRadioButton/BackgroundRadioButton.module.css";

export const BackgroundRadioButton = ({ background, field }) => (
  <label>
    <input
      type="radio"
      {...field}
      value={background.id}
      checked={field.value === String(background.id)}
      style={{ display: "none" }}
    />
    {background.isSvg ? (
      <svg
        width="28"
        height="28"
        className={clsx(
          s.iconBackground,
          field.value === String(background.id) && s.activeBackground
        )}
      >
        <use href={background.src} />
      </svg>
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
