import clsx from "clsx";
import s from "../BackgroundRadioButton/BackgroundRadioButton.module.css";
import { useEffect, useState } from "react";
import SvgIcon from "../../hooks/SvgIcon";

const getResponsiveImageSrc = (src) => {
  if (!src) return "";

  const width = window.innerWidth;
  if (width >= 1024) {
    return src.desktop || "";
  } else if (width >= 768) {
    return src.tablet || "";
  } else {
    return src.mobile || "";
  }
};

export const BackgroundRadioButton = ({ background, field }) => {
  const [imageSrc, setImageSrc] = useState(
    getResponsiveImageSrc(background.src)
  );

  useEffect(() => {
    const handleResize = () => {
      setImageSrc(getResponsiveImageSrc(background.src));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [background.src]);

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
          <SvgIcon
            name="icon-no-bg"
            width="28"
            height="28"
            className={clsx(
              s.iconBackground,
              field.value === String(background.id) && s.activeBackground
            )}
          />
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
