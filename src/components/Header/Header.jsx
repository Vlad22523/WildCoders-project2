import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import s from "./Header.module.css";
import { toggleSidebar } from "../../redux/sidebar/slice.js";
import SvgIcon from "../../hooks/SvgIcon.jsx";

const Header = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIconRotated, setIsIconRotated] = useState(false); 

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev);
    setIsIconRotated((prev) => !prev); 
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleModalToggle);
    } else {
      document.removeEventListener("mousedown", handleModalToggle);
    }
    return () => {
      document.removeEventListener("mousedown", handleModalToggle);
    };
  }, [isModalOpen]);

  return (
    <header className={s.header}>
      <button
        className={s.burger_menu}
        onClick={() => dispatch(toggleSidebar())}
      >
        <SvgIcon
          name="icon-menu-01"
          width="24"
          height="24"
          className={s.header_menu}
        />
      </button>
      <div className={s.select_theme} onClick={handleModalToggle}>
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
          <div className={s.modalContent}>
            <p className={s.theme_choise}>Light</p>
            <p className={s.theme_choise}>Dark</p>
            <p className={s.theme_choise}>Violet</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
