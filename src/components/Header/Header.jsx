import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import s from "./Header.module.css";
import { toggleSidebar } from "../../redux/sidebar/slice.js";
import SvgIcon from "../../hooks/SvgIcon.jsx";

const Header = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIconRotated, setIsIconRotated] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("Light");
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
    setIsIconRotated((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsModalOpen(false);
      setIsIconRotated(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
  };

  return (
    <header className={s.header}>
      <button
        className={s.burger_menu}
        onClick={() => dispatch(toggleSidebar())}
      >
        <SvgIcon
          name="icon-menu-01"
          width="32"
          height="32"
          className={s.header_menu}
        />
      </button>
      <div
        className={s.select_theme}
        onClick={handleModalToggle}
        ref={buttonRef}
      >
        <p className={s.header_theme}>Theme</p>
        <SvgIcon
          name="icon-chevron-down"
          width="16"
          height="16"
          className={`${s.header_down} ${isIconRotated ? s.rotated : ""}`}
        />
      </div>
      <div className={s.select_user}>
        <p className={s.header_user}>user</p>
        <SvgIcon
          name="icon-user"
          width="32"
          height="32"
          className={s.header_avatar}
        />
      </div>

      {/* Модальне вікно */}
      {isModalOpen && (
        <div className={s.modalOverlay}>
          <div className={s.modalContent} ref={modalRef}>
            <p
              className={`${s.theme_choise} ${
                selectedTheme === "Light" ? s.selected : ""
              }`}
              onClick={() => handleThemeSelect("Light")}
            >
              Light
            </p>
            <p
              className={`${s.theme_choise} ${
                selectedTheme === "Dark" ? s.selected : ""
              }`}
              onClick={() => handleThemeSelect("Dark")}
            >
              Dark
            </p>
            <p
              className={`${s.theme_choise} ${
                selectedTheme === "Violet" ? s.selected : ""
              }`}
              onClick={() => handleThemeSelect("Violet")}
            >
              Violet
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
