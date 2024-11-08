import clsx from "clsx";
import s from "../BackgroundRadioButton/BackgroundRadioButton.module.css";

const getResponsiveImageSrc = (src) => {
  const width = window.innerWidth;
  if (width >= 1024) {
    return src.desktop;
  } else if (width >= 768) {
    return src.tablet;
  } else {
    return src.mobile;
  }
};

export const BackgroundRadioButton = ({ background, field }) => {
  const imageSrc = getResponsiveImageSrc(background.src);
  return (
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
          src={imageSrc}
          alt={background.alt}
          className={clsx(
            s.backgroundImages,
            field.value === String(background.id) && s.activeBackground
          )}
        />
      )}
    </label>
  );
};
