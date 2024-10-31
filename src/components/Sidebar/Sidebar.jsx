import { useSelector } from "react-redux";
import s from "./Sidebar.module.css";
import { selectIsOpenSidebar } from "../../redux/sidebar/selectors";
import { useRef } from "react";

const Sidebar = () => {
  const isOpen = useSelector(selectIsOpenSidebar);
  const sidebarRef = useRef(null);

  return (
    <aside ref={sidebarRef} className={`${s.side} ${isOpen ? s.open : ""}`}>
      <h2>Sidebar</h2>
    </aside>
  );
};

export default Sidebar;
