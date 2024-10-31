import { useSelector } from "react-redux";
import s from "./Sidebar.module.css";
import { selectIsOpenSidebar } from "../../redux/sidebar/selectors";
import { useRef } from "react";
import SvgIcon from "../../hooks/SvgIcon.jsx";

const Sidebar = () => {
  const isOpen = useSelector(selectIsOpenSidebar);
  const sidebarRef = useRef(null);

  return (
    <aside ref={sidebarRef} className={`${s.side} ${isOpen ? s.open : ""}`}>
      <a className={s.logo_link} href="/home">
        <div className={s.logo_container}>
          <SvgIcon
            name="icon-logo"
            width="15"
            height="16"
            className={s.svg_logo}
          />
        </div>
        Task Pro
      </a>
    </aside>
  );
};

export default Sidebar;
