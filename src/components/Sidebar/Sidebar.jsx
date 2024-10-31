import { useSelector } from "react-redux";
import s from "./Sidebar.module.css";
import { selectIsOpenSidebar } from "../../redux/sidebar/selectors";
import { useRef } from "react";

const Sidebar = () => {
  const isOpen = useSelector(selectIsOpenSidebar);
  const sidebarRef = useRef(null);

  return (
    <aside ref={sidebarRef} className={`${s.side} ${isOpen ? s.open : ""}`}>
      <a className={s.logo_link} href="/home">
        <svg className={s.svg_logo} width="32" height="32">
          <use
            className={s.use}
            width="12"
            height="16"
            href="/src/images/icons.svg#icon-logo"
          ></use>
        </svg>
      </a>
    </aside>
  );
};

export default Sidebar;
