import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import s from "./Header.module.css";
import { toggleSidebar } from "../../redux/sidebar/slice.js";
import SvgIcon from "../../hooks/SvgIcon.jsx";
import { selectUser } from "../../redux/auth/selectors.js";
import { fetchUserThunk, saveThemeThunk } from "../../redux/auth/operations.js";

const Header = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIconRotated, setIsIconRotated] = useState(false);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);
  const user = useSelector(selectUser);

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

  const handleThemeSelect = async (theme) => {
    await dispatch(saveThemeThunk(theme));
    dispatch(fetchUserThunk());
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
        <p className={s.header_user}>{user.name}</p>
        <img width="32" height="32" src={user.photo} alt="avatar" />
      </div>

      {/* Модальне вікно */}
      {isModalOpen && (
        <div className={s.modalOverlay}>
          <div className={s.modalContent} ref={modalRef}>
            <label className={s.theme_choice}>
              <input
                type="radio"
                name="theme"
                value="Light"
                checked={user.theme === "light"}
                onChange={() => handleThemeSelect("light")}
              />
              <p className={s.theme_text}>Light</p>
            </label>
            <label className={s.theme_choice}>
              <input
                type="radio"
                name="theme"
                value="Dark"
                checked={user.theme === "dark"}
                onChange={() => handleThemeSelect("dark")}
              />
              <p className={s.theme_text}>Dark</p>
            </label>
            <label className={s.theme_choice}>
              <input
                type="radio"
                name="theme"
                value="Violet"
                checked={user.theme === "violet"}
                onChange={() => handleThemeSelect("violet")}
              />
              <p className={s.theme_text}>Violet</p>
            </label>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
